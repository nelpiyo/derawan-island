import { useEffect, useRef, useState } from "react";
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

  const fetchExperiences = async () => {
    setLoading(true);
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
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      toast({ title: "Ukuran terlalu besar", description: "Maksimal 5MB.", variant: "destructive" });
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const resetForm = (form: HTMLFormElement) => {
    form.reset();
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const parsed = formSchema.safeParse({
      visitor_name: String(fd.get("visitor_name") ?? ""),
      comment: String(fd.get("comment") ?? ""),
      location: String(fd.get("location") ?? ""),
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

      const { error: insErr } = await supabase.from("experiences").insert({
        visitor_name: parsed.data.visitor_name,
        comment: parsed.data.comment,
        location: parsed.data.location ? parsed.data.location : null,
        photo_url,
      });

      if (insErr) throw insErr;

      toast({ title: "Terima kasih!", description: "Cerita Anda telah dibagikan." });
      resetForm(form);
      fetchExperiences();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
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
          <p className="max-w-2xl text-foam/70 text-lg leading-relaxed mb-16">
            Bagikan momen Anda di Derawan—foto bawah laut, perjumpaan dengan penyu,
            atau senja di dermaga kayu. Setiap cerita memperkuat suara konservasi.
          </p>
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
              <Reveal key={exp.id} delay={i * 60}>
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
                      <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-foam/40">
                        {formatDate(exp.created_at)}
                      </p>
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
