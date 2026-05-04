import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = ["partnership", "donation", "volunteer", "press", "other"] as const;
type Category = (typeof CATEGORIES)[number];

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  category: z.enum(CATEGORIES),
  message: z.string().trim().min(5).max(2000),
});

const ContactForm = () => {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<Category>("partnership");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email, category, message });
    if (!parsed.success) {
      toast({
        title: t("partners.contact.error"),
        description: parsed.error.errors[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      category: parsed.data.category,
      message: parsed.data.message,
    });
    setSubmitting(false);

    if (error) {
      toast({ title: t("partners.contact.error"), variant: "destructive" });
      return;
    }
    setDone(true);
    setName("");
    setEmail("");
    setMessage("");
    setCategory("partnership");
    toast({ title: t("partners.contact.success") });
  };

  const inputCls =
    "w-full bg-foam/5 border border-foam/15 px-4 py-3 text-foam placeholder:text-foam/40 focus:outline-none focus:border-coral/70 transition-colors text-sm";

  if (done) {
    return (
      <div className="border border-foam/15 p-10 text-center bg-foam/[0.03]">
        <p className="text-coral text-xs uppercase tracking-[0.4em] mb-4">✓</p>
        <p className="font-display text-2xl text-foam">{t("partners.contact.success")}</p>
        <button
          onClick={() => setDone(false)}
          className="mt-6 text-xs uppercase tracking-[0.3em] text-foam/60 hover:text-coral transition-colors"
        >
          ↻
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.3em] text-foam/60">
            {t("partners.contact.name")}
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
            className={`${inputCls} mt-2`}
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.3em] text-foam/60">
            {t("partners.contact.email")}
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
            required
            className={`${inputCls} mt-2`}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-[10px] uppercase tracking-[0.3em] text-foam/60">
          {t("partners.contact.category")}
        </span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className={`${inputCls} mt-2 appearance-none cursor-pointer`}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-deep-sea">
              {t(`partners.contact.cat.${c}` as const)}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-[10px] uppercase tracking-[0.3em] text-foam/60">
          {t("partners.contact.message")}
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={2000}
          required
          rows={5}
          className={`${inputCls} mt-2 resize-none`}
        />
        <span className="block text-right text-[10px] text-foam/40 mt-1">
          {message.length}/2000
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex items-center justify-center gap-3 bg-coral text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-coral-glow transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? t("partners.contact.sending") : t("partners.contact.send")}
        <span aria-hidden>→</span>
      </button>
    </form>
  );
};

export default ContactForm;
