import Navigation from "@/components/Navigation";
import ParallaxSection from "@/components/ParallaxSection";
import Reveal from "@/components/Reveal";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/i18n";

import bajauImg from "@/assets/bajau-village.jpg";
import economyImg from "@/assets/sustainable-economy.jpg";

const Culture = () => {
  const { t } = useI18n();

  const principles = [
    { k: t("culture.econ.p1.k"), v: t("culture.econ.p1.v") },
    { k: t("culture.econ.p2.k"), v: t("culture.econ.p2.v") },
    { k: t("culture.econ.p3.k"), v: t("culture.econ.p3.v") },
  ];

  return (
    <main className="bg-abyss text-foam">
      <SEO title={t("culture.seo.title")} description={t("culture.seo.desc")} />
      <Navigation />
      <Breadcrumb current={t("breadcrumb.culture")} />

      <section className="container pt-12 pb-20 md:pt-16 md:pb-28 max-w-5xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-sand">
            {t("culture.eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foam">
            {t("culture.h1.a")}
            <span className="block italic text-gradient-sunset">{t("culture.h1.b")}</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-10 text-lg leading-relaxed text-foam/75 max-w-2xl">
            {t("culture.intro")}
          </p>
        </Reveal>
      </section>

      <section className="relative bg-deep-sea py-32 md:py-44 overflow-hidden">
        <div
          aria-hidden
          className="absolute -right-32 top-0 font-display text-foam/[0.04] text-[20rem] leading-none select-none"
        >
          1450
        </div>
        <div className="container max-w-5xl relative">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.5em] text-coral">
              {t("culture.heritage.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl text-foam">
              {t("culture.heritage.title.a")}
              <span className="italic text-gradient-sunset">{t("culture.heritage.title.b")}</span>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-10 text-lg leading-relaxed text-foam/75 max-w-3xl">
              {t("culture.heritage.body")}
            </p>
          </Reveal>
        </div>
      </section>

      <ParallaxSection
        image={bajauImg}
        speed={0.35}
        overlayClass="bg-gradient-to-t from-abyss/95 via-deep-sea/55 to-abyss/40"
      >
        <div className="container py-32 md:py-44 flex min-h-screen items-end">
          <div className="max-w-3xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.5em] text-sand">
                {t("culture.wisdom.eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foam">
                {t("culture.wisdom.title.a")}
                <span className="block italic text-gradient-sunset">{t("culture.wisdom.title.b")}</span>
              </h2>
            </Reveal>
            <Reveal delay={350}>
              <p className="mt-10 text-lg md:text-xl leading-relaxed text-foam/85 max-w-2xl">
                {t("culture.wisdom.body")}
              </p>
            </Reveal>
            <Reveal delay={500}>
              <div className="mt-12 glass-light p-8 max-w-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-coral mb-3">
                  {t("culture.wisdom.tradition")}
                </p>
                <p className="font-display text-2xl italic text-sand leading-snug">
                  {t("culture.wisdom.quote")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection
        image={economyImg}
        speed={0.3}
        overlayClass="bg-gradient-to-b from-abyss/85 via-deep-sea/60 to-abyss"
      >
        <div className="container py-32 md:py-44">
          <div className="grid gap-16 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
                  {t("culture.econ.eyebrow")}
                </p>
              </Reveal>
              <Reveal delay={150}>
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foam leading-[1.02]">
                  {t("culture.econ.title.a")}
                  <span className="italic text-gradient-ocean">{t("culture.econ.title.b")}</span>
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={300}>
                <p className="text-lg leading-relaxed text-foam/80">{t("culture.econ.body")}</p>
              </Reveal>
            </div>
          </div>

          <div className="mt-24 border-t border-foam/15 pt-16">
            <div className="grid gap-12 md:grid-cols-3">
              {principles.map((p, i) => (
                <Reveal key={p.k} delay={i * 150}>
                  <div>
                    <div className="text-coral font-display text-3xl mb-4">0{i + 1}</div>
                    <h3 className="font-display text-2xl text-sand mb-3">{p.k}</h3>
                    <p className="text-foam/70 leading-relaxed text-sm">{p.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      <SiteFooter />
    </main>
  );
};

export default Culture;
