import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Reveal from "@/components/Reveal";
import { useToast } from "@/hooks/use-toast";
import ExperienceReplies from "@/components/ExperienceReplies";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/i18n";

type Experience = {
  id: string;
  visitor_name: string;
  comment: string;
  photo_url: string | null;
  location: string | null;
  created_at: string;
};

// DISINI BLIND SPOTNYA: Batas karakter dinaikkan ke 2500 agar muat untuk 300 kata
const formSchema = z.object({
  visitor_name: z.string().trim().min(1).max(80),
  comment: z.string().trim().min(1).max(2500),
  location: z.string().trim().max(120).optional().or(z.literal("")),
});

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const TOKENS_STORAGE_KEY = "derawan_review_tokens_v1";

const loadTokens = (): Record<string, string> => {
  try {
    const raw = localStorage.getItem(TOKENS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
};

const saveToken = (id: string, token: string) => {
  const all = loadTokens();
  all[id] = token;
  localStorage.setItem(TOKENS_STORAGE_KEY, JSON.stringify(all));
};

const removeToken = (id: string) => {
  const all = loadTokens();
  delete all[id];
  localStorage.setItem(TOKENS_STORAGE_KEY, JSON.stringify(all));
};

const generateToken = () => {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
};

const sha256Hex = async (text: string) => {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
};

const Guestbook = () => {
  const { t, lang } = useI18n();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [visitorName, setVisitorName] = useState("");
  const [location, setLocation] = useState("");
  const [comment, setComment] = useState("");
  const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set());
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<{ url: string; name: string } | null>(null);

  // Menghitung jumlah kata saat ini
  const currentWordCount = comment.trim().split(/\s+/).filter(Boolean).length;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  useEffect(() => {
    setOwnedIds(new Set(Object.keys(loadTokens())));
  }, []);

  useEffect(() => {
    let active = true;
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) {
        if (active) setIsAdmin(false);
        return;
      }
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (active) setIsAdmin(!error && data?.role === "admin");
    };

    checkAdmin();
    const { data: sub } = supabase.auth.onAuthStateChange(() => checkAdmin());
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from("experiences")
      .select("id, visitor_name, comment, photo_url, location, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      toast({
        title: t("guest.toast.loadfail"),
        description: error.message,
        variant: "destructive",
      });
    } else {
      setItems(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExperiences();
    const channel = supabase
      .channel("experiences-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "experiences" },
        (payload) => {
          const next = payload.new as Experience;
          setItems((prev) =>
            prev.find((p) => p.id === next.id) ? prev : [next, ...prev].slice(0, 50)
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "experiences" },
        (payload) => {
          const removed = payload.old as { id: string };
          setItems((prev) => prev.filter((p) => p.id !== removed.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast({
        title: t("guest.toast.format.title"),
        description: t("guest.toast.format.body"),
        variant: "destructive",
      });
      e.target.value = "";
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      toast({
        title: t("guest.toast.size.title"),
        description: t("guest.toast.size.body"),
        variant: "destructive",
      });
      e.target.value = "";
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setVisitorName("");
    setLocation("");
    setComment("");
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const parsed = formSchema.safeParse({
      visitor_name: visitorName,
      comment,
      location,
    });

    if (!parsed.success) {
      toast({
        title: t("guest.toast.invalid.title"),
        description: parsed.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      let photo_url: string | null = null;
      if (photoFile) {
        const ext = photoFile.name.split(".").pop()?.toLowerCase() ?? "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("experience-photos")
          .upload(path, photoFile, {
            contentType: photoFile.type,
            cacheControl: "3600",
            upsert: false,
          });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("experience-photos").getPublicUrl(path);
        photo_url = pub.publicUrl;
      }

      const token = generateToken();
      const tokenHash = await sha256Hex(token);

      const { data: inserted, error: insErr } = await supabase
        .from("experiences")
        .insert({
          visitor_name: parsed.data.visitor_name,
          comment: parsed.data.comment,
          location: parsed.data.location ? parsed.data.location : null,
          photo_url,
          delete_token: tokenHash,
        })
        .select("id, visitor_name, comment, photo_url, location, created_at")
        .single();

      if (insErr) throw insErr;

      if (inserted) {
        saveToken(inserted.id, token);
        setOwnedIds((prev) => new Set(prev).add(inserted.id));
        setItems((prev) =>
          prev.find((p) => p.id === inserted.id)
            ? prev
            : [inserted as Experience, ...prev].slice(0, 50)
        );
      }

      toast({
        title: t("guest.toast.thanks.title"),
        description: t("guest.toast.thanks.body"),
      });
      resetForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error";
      console.error("Guestbook submit error:", err);
      toast({
        title: t("guest.toast.fail.title"),
        description: message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (exp: Experience) => {
    const tokens = loadTokens();
    const token = tokens[exp.id];
    if (!token && !isAdmin) {
      toast({
        title: t("guest.toast.delete.cant.title"),
        description: t("guest.toast.delete.cant.body"),
        variant: "destructive",
      });
      return;
    }

    if (!confirm(t("guest.confirm.delete"))) return;
    setDeletingId(exp.id);

    try {
      const { data, error } = await supabase.rpc("delete_experience_with_token", {
        _id: exp.id,
        _token: token ?? "admin-delete",
      });

      if (error) throw error;
      if (!data) {
        toast({
          title: t("guest.toast.delete.fail.title"),
          description: t("guest.toast.delete.fail.mismatch"),
          variant: "destructive",
        });
        return;
      }

      removeToken(exp.id);
      setOwnedIds((prev) => {
        const next = new Set(prev);
        next.delete(exp.id);
        return next;
      });
      setItems((prev) => prev.filter((p) => p.id !== exp.id));
      toast({ title: t("guest.toast.delete.ok") });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error";
      toast({
        title: t("guest.toast.delete.fail.title"),
        description: message,
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section id="experiences" className="relative bg-abyss py-32 md:py-44">
      <div className="container max-w-6xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
            {t("guest.eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-display text-5xl md:text-7xl text-foam leading-[0.95] mb-6">
            {t("guest.title.a")}
            <span className="block italic text-gradient-ocean">{t("guest.title.b")}</span>
          </h2>
        </Reveal>
        <Reveal delay={250}>
          <p className="max-w-2xl text-foam/70 text-lg leading-relaxed mb-16">
            {t("guest.subtitle")}
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-start">
          <Reveal delay={350}>
            <form onSubmit={handleSubmit} className="glass border border-foam/10 p-8 space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-foam/60 mb-2">
                  {t("guest.form.name")}
                </label>
                <input
                  name="visitor_name"
                  required
                  maxLength={80}
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder={t("guest.form.name.placeholder")}
                  className="w-full bg-transparent border-b border-foam/20 py-2 text-foam placeholder:text-foam/30 focus:outline-none focus:border-coral transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-foam/60 mb-2">
                  {t("guest.form.location")}
                </label>
                <input
                  name="location"
                  maxLength={120}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t("guest.form.location.placeholder")}
                  className="w-full bg-transparent border-b border-foam/20 py-2 text-foam placeholder:text-foam/30 focus:outline-none focus:border-coral transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-foam/60 mb-2">
                  {t("guest.form.story")}
                </label>
                {/* LOGIKA PEMBATASAN KATA LANGSUNG DIBAWAH INI */}
                <textarea
                  name="comment"
                  required
                  rows={5}
                  value={comment}
                  onChange={(e) => {
                    const text = e.target.value;
                    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
                    if (wordCount <= 300 || text.length < comment.length) {
                      setComment(text);
                    }
                  }}
                  placeholder={t("guest.form.story.placeholder")}
                  className="w-full bg-transparent border border-foam/20 p-3 text-foam placeholder:text-foam/30 focus:outline-none focus:border-coral transition-colors resize-none"
                />
                {/* WORD COUNTER UTK PENGALAMAN USER */}
                <div className="text-[9px] text-right text-foam/40 uppercase tracking-wider mt-1">
                  {currentWordCount} / 300 Kata
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-foam/60 mb-2">
                  {t("guest.form.photo")}
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="block w-full text-xs text-foam/70 file:mr-4 file:border file:border-foam/20 file:bg-transparent file:px-4 file:py-2 file:text-[10px] file:uppercase file:tracking-[0.3em] file:text-foam hover:file:border-coral hover:file:text-coral file:cursor-pointer file:transition-colors"
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt={t("guest.form.photo.preview")}
                    className="mt-4 h-32 w-full object-cover border border-foam/10"
                  />
                )}
              </div>

              {/* TEKS "HANYA ANDA YANG DAPAT MENGHAPUS..." SUDAH DIHAPUS TOTAL DISINI */}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-coral text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-coral-glow transition-all duration-300 shadow-coral disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? t("guest.form.submitting") : t("guest.form.submit")}
              </button>
            </form>
          </Reveal>

          <div className="space-y-6">
            {loading && (
              <p className="text-foam/50 text-sm uppercase tracking-[0.3em]">
                {t("guest.list.loading")}
              </p>
            )}
            {!loading && items.length === 0 && (
              <p className="text-foam/50 text-sm">{t("guest.list.empty")}</p>
            )}
            {items.map((exp, i) => {
              const owned = ownedIds.has(exp.id);
              const canDelete = owned || isAdmin;
              return (
                <Reveal key={exp.id} delay={Math.min(i * 60, 300)}>
                  <article className="border border-foam/10 bg-deep-sea/30 backdrop-blur-sm p-6 md:p-8 hover:border-coral/40 transition-colors">
                    <div className="flex flex-col md:flex-row gap-6">
                      {exp.photo_url && (
                        <button
                          type="button"
                          onClick={() =>
                            setLightboxPhoto({ url: exp.photo_url!, name: exp.visitor_name })
                          }
                          className="group relative w-full md:w-40 h-40 flex-shrink-0 overflow-hidden border border-foam/10 hover:border-coral/60 transition-colors"
                          aria-label={`${t("guest.viewphoto")} — ${exp.visitor_name}`}
                        >
                          <img
                            src={exp.photo_url}
                            alt={exp.visitor_name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-abyss/60 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-[0.3em] text-foam">
                            {t("guest.viewphoto")}
                          </span>
                        </button>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                          <h3 className="font-display text-2xl text-foam">{exp.visitor_name}</h3>
                          {exp.location && (
                            <span className="text-[10px] uppercase tracking-[0.3em] text-turquoise">
                              · {exp.location}
                            </span>
                          )}
                          {canDelete && (
                            <span className="text-[10px] uppercase tracking-[0.3em] text-coral">
                              · {owned ? t("guest.tag.yours") : t("guest.tag.admin")}
                            </span>
                          )}
                        </div>
                        <p className="text-foam/80 leading-relaxed whitespace-pre-wrap break-words">
                          {exp.comment}
                        </p>
                        <div className="mt-4 flex items-center justify-between gap-4">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-foam/40">
                            {formatDate(exp.created_at)}
                          </p>
                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => handleDelete(exp)}
                              disabled={deletingId === exp.id}
                              className="text-[10px] uppercase tracking-[0.3em] text-coral hover:text-coral-glow transition-colors disabled:opacity-50"
                            >
                              {deletingId === exp.id ? t("guest.deleting") : t("guest.delete")}
                            </button>
                          )}
                        </div>
                        <ExperienceReplies experienceId={exp.id} />
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={!!lightboxPhoto} onOpenChange={(o) => !o && setLightboxPhoto(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-abyss border-foam/10 overflow-hidden">
          <DialogTitle className="sr-only">
            {lightboxPhoto ? `${t("guest.lightbox.from")} ${lightboxPhoto.name}` : ""}
          </DialogTitle>
          {lightboxPhoto && (
            <div className="relative w-full max-h-[85vh] flex flex-col">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.name}
                className="w-full h-auto max-h-[80vh] object-contain bg-abyss"
              />
              <p className="px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-foam/60 border-t border-foam/10">
                {t("guest.lightbox.from")} {lightboxPhoto.name}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Guestbook;
