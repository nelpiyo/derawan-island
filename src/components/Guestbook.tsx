import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Reveal from "@/components/Reveal";
import { useToast } from "@/hooks/use-toast";

type Experience = {
  id: string;
  visitor_name: string;
  comment: string;
  photo_url: string | null;
  location: string | null;
  created_at: string;
};

const formSchema = z.object({
  visitor_name: z
    .string()
    .trim()
    .min(1, "Nama wajib diisi")
    .max(80, "Nama maksimal 80 karakter"),
  comment: z
    .string()
    .trim()
    .min(1, "Cerita wajib diisi")
    .max(1000, "Cerita maksimal 1000 karakter"),
  location: z
    .string()
    .trim()
    .max(120, "Lokasi maksimal 120 karakter")
    .optional()
    .or(z.literal("")),
});

const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const Guestbook = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Controlled form state (avoids relying on DOM after async/await)
  const [visitorName, setVisitorName] = useState("");
  const [location, setLocation] = useState("");
  const [comment, setComment] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const checkAdmin = async (userId: string | undefined) => {
      if (!userId) {
        setIsAdmin(false);
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAdmin(session?.user?.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      checkAdmin(session?.user?.id);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleDelete = async (exp: Experience) => {
    if (!confirm(`Hapus cerita dari ${exp.visitor_name}?`)) return;
    setDeletingId(exp.id);
    try {
      // Try to delete photo from storage if present
      if (exp.photo_url) {
        const marker = "/experience-photos/";
        const idx = exp.photo_url.indexOf(marker);
        if (idx !== -1) {
          const path = exp.photo_url.slice(idx + marker.length);
          await supabase.storage.from("experience-photos").remove([path]);
        }
      }
      const { error } = await supabase.from("experiences").delete().eq("id", exp.id);
      if (error) throw error;
      setItems((prev) => prev.filter((p) => p.id !== exp.id));
      toast({ title: "Cerita dihapus" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      toast({ title: "Gagal menghapus", description: message, variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) {
      toast({ title: "Gagal memuat cerita", description: error.message, variant: "destructive" });
    } else {
      setItems(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExperiences();

    // Realtime: new stories appear instantly for everyone
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
      toast({ title: "Format tidak didukung", description: "Gunakan JPG, PNG, atau WEBP.", variant: "destructive" });
      e.target.value = "";
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      toast({ title: "Ukuran terlalu besar", description: "Maksimal 5MB.", variant: "destructive" });
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
        title: "Periksa isian Anda",
        description: parsed.error.issues[0]?.message ?? "Input tidak valid",
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
        const { data: pub } = supabase.storage
          .from("experience-photos")
          .getPublicUrl(path);
        photo_url = pub.publicUrl;
      }

      const { data: inserted, error: insErr } = await supabase
        .from("experiences")
        .insert({
          visitor_name: parsed.data.visitor_name,
          comment: parsed.data.comment,
          location: parsed.data.location ? parsed.data.location : null,
          photo_url,
        })
        .select()
        .single();

      if (insErr) throw insErr;

      // Optimistic update so the user sees their story immediately
      if (inserted) {
        setItems((prev) =>
          prev.find((p) => p.id === inserted.id)
            ? prev
            : [inserted as Experience, ...prev].slice(0, 50)
        );
      }

      toast({ title: "Terima kasih!", description: "Cerita Anda telah dibagikan." });
      resetForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      console.error("Guestbook submit error:", err);
      toast({ title: "Gagal mengirim", description: message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="experiences" className="relative bg-abyss py-32 md:py-44">
      <div className="container max-w-6xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
            Visitor Logbook
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-display text-5xl md:text-7xl text-foam leading-[0.95] mb-6">
            Cerita dari
            <span className="block italic text-gradient-ocean">para penjelajah.</span>
          </h2>
        </Reveal>
        <Reveal delay={250}>
          <p className="max-w-2xl text-foam/70 text-lg leading-relaxed mb-6">
            Bagikan momen Anda di Derawan—foto bawah laut, perjumpaan dengan penyu,
            atau senja di dermaga kayu. Setiap cerita memperkuat suara konservasi.
          </p>
          <div className="mb-16">
            {isAdmin ? (
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  toast({ title: "Keluar dari mode admin" });
                }}
                className="text-[10px] uppercase tracking-[0.3em] text-coral hover:text-coral-glow transition-colors"
              >
                ✕ Keluar admin
              </button>
            ) : (
              <Link
                to="/auth"
                className="text-[10px] uppercase tracking-[0.3em] text-foam/40 hover:text-coral transition-colors"
              >
                · Admin
              </Link>
            )}
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-start">
          {/* FORM */}
          <Reveal delay={350}>
            <form
              onSubmit={handleSubmit}
              className="glass border border-foam/10 p-8 space-y-5"
            >
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-foam/60 mb-2">
                  Nama
                </label>
                <input
                  name="visitor_name"
                  required
                  maxLength={80}
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full bg-transparent border-b border-foam/20 py-2 text-foam placeholder:text-foam/30 focus:outline-none focus:border-coral transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-foam/60 mb-2">
                  Lokasi (opsional)
                </label>
                <input
                  name="location"
                  maxLength={120}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="mis. Pulau Kakaban"
                  className="w-full bg-transparent border-b border-foam/20 py-2 text-foam placeholder:text-foam/30 focus:outline-none focus:border-coral transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-foam/60 mb-2">
                  Cerita Anda
                </label>
                <textarea
                  name="comment"
                  required
                  maxLength={1000}
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Bagikan pengalaman tak terlupakan Anda..."
                  className="w-full bg-transparent border border-foam/20 p-3 text-foam placeholder:text-foam/30 focus:outline-none focus:border-coral transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-foam/60 mb-2">
                  Foto (opsional · maks 5MB)
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
                    alt="Pratinjau foto"
                    className="mt-4 h-32 w-full object-cover border border-foam/10"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-coral text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-coral-glow transition-all duration-300 shadow-coral disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Mengirim..." : "Bagikan Cerita"}
              </button>
            </form>
          </Reveal>

          {/* LIST */}
          <div className="space-y-6">
            {loading && (
              <p className="text-foam/50 text-sm uppercase tracking-[0.3em]">
                Memuat cerita...
              </p>
            )}
            {!loading && items.length === 0 && (
              <p className="text-foam/50 text-sm">
                Belum ada cerita. Jadilah yang pertama berbagi pengalaman Anda di Derawan.
              </p>
            )}
            {items.map((exp, i) => (
              <Reveal key={exp.id} delay={Math.min(i * 60, 300)}>
                <article className="border border-foam/10 bg-deep-sea/30 backdrop-blur-sm p-6 md:p-8 hover:border-coral/40 transition-colors">
                  <div className="flex flex-col md:flex-row gap-6">
                    {exp.photo_url && (
                      <img
                        src={exp.photo_url}
                        alt={`Foto dari ${exp.visitor_name}`}
                        loading="lazy"
                        className="w-full md:w-40 h-40 object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                        <h3 className="font-display text-2xl text-foam">
                          {exp.visitor_name}
                        </h3>
                        {exp.location && (
                          <span className="text-[10px] uppercase tracking-[0.3em] text-turquoise">
                            · {exp.location}
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
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => handleDelete(exp)}
                            disabled={deletingId === exp.id}
                            className="text-[10px] uppercase tracking-[0.3em] text-coral hover:text-coral-glow transition-colors disabled:opacity-50"
                          >
                            {deletingId === exp.id ? "Menghapus..." : "Hapus"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
