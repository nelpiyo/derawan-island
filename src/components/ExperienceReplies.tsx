import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Reply = {
  id: string;
  experience_id: string;
  visitor_name: string;
  comment: string;
  created_at: string;
};

const replySchema = z.object({
  visitor_name: z.string().trim().min(1, "Nama wajib diisi").max(80),
  comment: z.string().trim().min(1, "Balasan wajib diisi").max(500),
});

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

interface Props {
  experienceId: string;
}

const ExperienceReplies = ({ experienceId }: Props) => {
  const { toast } = useToast();
  const [replies, setReplies] = useState<Reply[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data, error } = await supabase
        .from("experience_replies")
        .select("id, experience_id, visitor_name, comment, created_at")
        .eq("experience_id", experienceId)
        .order("created_at", { ascending: true });
      if (!error && active) setReplies(data ?? []);
    };
    load();

    const channel = supabase
      .channel(`replies-${experienceId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "experience_replies",
          filter: `experience_id=eq.${experienceId}`,
        },
        (payload) => {
          const next = payload.new as Reply;
          setReplies((prev) =>
            prev.find((p) => p.id === next.id) ? prev : [...prev, next]
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "experience_replies",
          filter: `experience_id=eq.${experienceId}`,
        },
        (payload) => {
          const removed = payload.old as { id: string };
          setReplies((prev) => prev.filter((p) => p.id !== removed.id));
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [experienceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const parsed = replySchema.safeParse({ visitor_name: name, comment });
    if (!parsed.success) {
      toast({
        title: "Periksa isian",
        description: parsed.error.issues[0]?.message ?? "Input tidak valid",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("experience_replies").insert({
      experience_id: experienceId,
      visitor_name: parsed.data.visitor_name,
      comment: parsed.data.comment,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Gagal mengirim balasan",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setName("");
    setComment("");
    toast({ title: "Balasan terkirim" });
  };

  return (
    <div className="mt-6 pt-6 border-t border-foam/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-[10px] uppercase tracking-[0.3em] text-turquoise hover:text-coral transition-colors"
      >
        {replies.length > 0
          ? `· ${replies.length} komentar ${open ? "▲" : "▼"}`
          : `· Komentar ${open ? "▲" : "▼"}`}
      </button>

      {open && (
        <div className="mt-5 space-y-4">
          {replies.map((r) => (
            <div
              key={r.id}
              className="border-l-2 border-coral/40 pl-4 py-1"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <span className="font-display text-base text-foam">
                  {r.visitor_name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-foam/40">
                  {formatDate(r.created_at)}
                </span>
              </div>
              <p className="text-sm text-foam/80 leading-relaxed whitespace-pre-wrap break-words">
                {r.comment}
              </p>
            </div>
          ))}

          <form
            onSubmit={handleSubmit}
            className="space-y-3 pt-2"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda"
              maxLength={80}
              required
              className="w-full bg-transparent border-b border-foam/20 py-2 text-sm text-foam placeholder:text-foam/30 focus:outline-none focus:border-coral transition-colors"
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tulis balasan atau pertanyaan..."
              maxLength={500}
              rows={2}
              required
              className="w-full bg-transparent border border-foam/20 p-3 text-sm text-foam placeholder:text-foam/30 focus:outline-none focus:border-coral transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-coral/90 text-primary-foreground px-6 py-2 text-[10px] uppercase tracking-[0.3em] hover:bg-coral transition-all disabled:opacity-50"
            >
              {submitting ? "Mengirim..." : "Kirim Balasan"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExperienceReplies;
