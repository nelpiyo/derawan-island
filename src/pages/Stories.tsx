import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Reveal from "@/components/Reveal";
import SEO from "@/components/SEO";
import Guestbook from "@/components/Guestbook";
import Breadcrumb from "@/components/Breadcrumb";
import SiteFooter from "@/components/SiteFooter";
import WaveDivider from "@/components/WaveDivider";
import TipsBerkunjung from "@/components/TipsBerkunjung";
import Bokeh from "@/components/Bokeh";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";

const Stories = () => {
  const { t } = useI18n();
  const [storyCount, setStoryCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("experiences")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => {
        if (active && typeof count === "number") setStoryCount(count);
      });
    return () => {
      active = false;
    };
  }, []);

  const stats = [
    { value: "507", label: t("stories.impact.stat.coral") },
    { value: "46.105", label: t("stories.impact.stat.waste") },
    { value: "9", label: t("stories.impact.stat.seagrass") },
    {
      value: storyCount !== null ? `${storyCount}+` : "—",
      label: t("stories.impact.stat.stories"),
    },
  ];

  const scrollToForm = () => {
    document
      .getElementById("guestbook-form")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="bg-abyss text-foam">
      <SEO title={t("stories.seo.title")} description={t("stories.seo.desc")} />
      <Navigation />
      <Breadcrumb current={t("breadcrumb.stories")} />

      <section className="container pt-12 pb-20 md:pt-16 md:pb-28 max-w-5xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
            {t("stories.eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foam">
            {t("stories.h1.a")}
            <span className="block italic text-gradient-ocean">{t("stories.h1.b")}</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-10 text-lg leading-relaxed text-foam/75 max-w-2xl">
            {t("stories.intro")}
          </p>
        </Reveal>
      </section>

      <Guestbook />

      <WaveDivider fill="hsl(var(--abyss))" />

      <TipsBerkunjung />

      <WaveDivider fill="hsl(var(--deep-sea))" />


      <section className="relative bg-gradient-deep py-28 md:py-40 overflow-hidden">
        <Bokeh count={16} />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(64,224,208,0.12),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(13,71,107,0.4),transparent_60%)]" />
        <div className="container max-w-5xl relative">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.5em] text-turquoise mb-6">
              {t("stories.impact.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foam leading-[1.02]">
              {t("stories.impact.title.a")}
              <span className="block italic text-gradient-ocean">
                {t("stories.impact.title.b")}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-foam/75 leading-relaxed">
              {t("stories.impact.body")}
            </p>
          </Reveal>

          <Reveal delay={350}>
            <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-foam/15 bg-foam/[0.04] backdrop-blur-xl p-5 md:p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] hover:border-turquoise/40 transition-colors"
                >
                  <p className="font-display text-3xl md:text-5xl text-turquoise leading-none">
                    {s.value}
                  </p>
                  <p className="mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-foam/70 leading-relaxed">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={500}>
            <p className="mt-14 font-display text-xl md:text-2xl italic text-foam/80 max-w-3xl">
              {t("stories.impact.quote")}
            </p>
          </Reveal>

          <Reveal delay={620}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-turquoise to-deep-sea px-7 py-4 text-xs uppercase tracking-[0.3em] text-foam font-semibold shadow-[0_10px_40px_-5px_rgba(0,180,200,0.6)] hover:shadow-[0_15px_50px_-5px_rgba(0,180,200,0.85)] hover:scale-[1.03] transition-all duration-300 border border-foam/20"
              >
                <Sparkles className="h-4 w-4" />
                {t("stories.impact.cta.primary")}
              </button>
              <Link
                to="/nature"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foam/30 px-7 py-4 text-xs uppercase tracking-[0.3em] text-foam hover:border-turquoise hover:text-turquoise hover:bg-foam/[0.03] transition-all duration-300"
              >
                {t("stories.impact.cta.secondary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Stories;
