import Navigation from "@/components/Navigation";
import ParallaxSection from "@/components/ParallaxSection";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/i18n";

import archipelagoImg from "@/assets/archipelago.jpg";
import turtleImg from "@/assets/sea-turtle.jpg";
import coralImg from "@/assets/coral-reef.jpg";
import mantaImg from "@/assets/manta-ray.jpg";

const Nature = () => {
  const { t } = useI18n();

  const stats = [
    { v: 2, suffix: "", label: t("nature.stat.turtle.label"), sub: t("nature.stat.turtle.sub") },
    { v: 507, suffix: "", label: t("nature.stat.coral.label"), sub: t("nature.stat.coral.sub") },
    { v: 872, suffix: "", label: t("nature.stat.fish.label"), sub: t("nature.stat.fish.sub") },
    { v: 285548.95, suffix: " ha", label: t("nature.stat.cons.label"), sub: t("nature.stat.cons.sub"), dec: 0 },
  ];

  const ecoCards = [
    {
      title: t("nature.eco.card1.title"),
      latin: "Chelonia mydas · Eretmochelys imbricata",
      body: t("nature.eco.card1.body"),
    },
    {
      title: t("nature.eco.card2.title"),
      latin: t("nature.eco.card2.latin"),
      body: t("nature.eco.card2.body"),
    },
    {
      title: t("nature.eco.card3.title"),
      latin: "Napoleon · Bumphead · Whitetip Reef Shark",
      body: t("nature.eco.card3.body"),
    },
  ];

  const guardians = [
    { name: "YLBKD", full: t("nature.guard.ylbkd.full"), role: t("nature.guard.ylbkd.role") },
    { name: "WWF Indonesia", full: t("nature.guard.wwf.full"), role: t("nature.guard.wwf.role") },
    { name: t("nature.guard.gov.name"), full: t("nature.guard.gov.full"), role: t("nature.guard.gov.role") },
  ];

  return (
    <main className="bg-abyss text-foam">
      <SEO title={t("nature.seo.title")} description={t("nature.seo.desc")} />
      <Navigation />
      <Breadcrumb current={t("breadcrumb.nature")} />

      <section className="container pt-12 pb-20 md:pt-16 md:pb-28 max-w-5xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
            {t("nature.eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foam">
            {t("nature.h1.a")}
            <span className="block italic text-gradient-ocean">{t("nature.h1.b")}</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-10 text-lg leading-relaxed text-foam/75 max-w-2xl">
            {t("nature.intro")}
          </p>
        </Reveal>
      </section>

      <ParallaxSection
        image={turtleImg}
        speed={0.3}
        height="min-h-screen"
        overlayClass="bg-gradient-to-b from-abyss/85 via-deep-sea/70 to-abyss/90"
      >
        <div className="container py-32 md:py-40">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
              {t("nature.impact.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foam max-w-3xl">
              {t("nature.impact.title.a")}
              <span className="block italic text-gradient-ocean">{t("nature.impact.title.b")}</span>
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-px bg-foam/10 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="glass h-full p-8 md:p-10">
                  <div className="text-5xl md:text-6xl text-gradient-sunset font-display">
                    <Counter value={s.v} suffix={s.suffix} decimals={s.dec ?? 0} />
                  </div>
                  <div className="mt-6 text-sm uppercase tracking-[0.2em] text-foam">{s.label}</div>
                  <div className="mt-2 text-xs text-foam/50">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection
        image={archipelagoImg}
        speed={0.35}
        overlayClass="bg-gradient-to-br from-abyss/80 via-deep-sea/60 to-abyss/95"
      >
        <div className="container py-32 md:py-44">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
                  {t("nature.archi.eyebrow")}
                </p>
              </Reveal>
              <Reveal delay={150}>
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1] text-foam">
                  {t("nature.archi.title.a")}
                  <span className="block italic text-gradient-ocean">{t("nature.archi.title.b")}</span>
                </h2>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-10 flex items-baseline gap-6">
                  <div className="font-display text-7xl text-coral-glow">
                    <Counter value={76} suffix="%" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] text-foam/70 whitespace-pre-line">
                    {t("nature.archi.coral.caption")}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-7 md:pl-12 space-y-10">
              <Reveal delay={200}>
                <div>
                  <h3 className="font-display text-2xl text-sand mb-4">
                    {t("nature.archi.geo.title")}
                  </h3>
                  <p className="text-foam/75 leading-relaxed">{t("nature.archi.geo.body")}</p>
                </div>
              </Reveal>

              <Reveal delay={350}>
                <div>
                  <h3 className="font-display text-2xl text-sand mb-4">
                    {t("nature.archi.gov.title")}
                  </h3>
                  <p className="text-foam/75 leading-relaxed">{t("nature.archi.gov.body")}</p>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-foam/10">
                  {["Kepmen KP 87/2016", "Pergub Kaltim 60/2019", "Permen KP 31/2020"].map((r) => (
                    <div key={r} className="text-xs uppercase tracking-[0.15em] text-foam/60">
                      {r}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection
        image={coralImg}
        speed={0.3}
        overlayClass="bg-gradient-to-b from-abyss/80 via-deep-sea/55 to-abyss/95"
      >
        <div className="container py-32 md:py-44">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
              {t("nature.eco.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foam max-w-4xl">
              {t("nature.eco.title.a")}
              <span className="italic text-gradient-ocean">{t("nature.eco.title.b")}</span>
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {ecoCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 150}>
                <article className="glass h-full p-8 md:p-10 hover:border-coral/40 transition-colors duration-500">
                  <div className="font-display text-3xl text-coral-glow mb-2">0{i + 1}</div>
                  <h3 className="font-display text-3xl text-sand mb-2">{c.title}</h3>
                  <p className="text-xs uppercase tracking-[0.15em] text-turquoise mb-6 italic">
                    {c.latin}
                  </p>
                  <p className="text-foam/75 leading-relaxed text-sm">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection
        image={mantaImg}
        speed={0.35}
        height="min-h-[90vh]"
        overlayClass="bg-gradient-to-r from-abyss/95 via-deep-sea/70 to-abyss/40"
      >
        <div className="container py-32 md:py-40">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.5em] text-coral">
                {t("nature.threat.eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="font-display text-4xl md:text-6xl text-foam">
                <span className="italic text-gradient-sunset">46.105 kg</span>{" "}
                {t("nature.threat.title.b")}
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-8 text-lg leading-relaxed text-foam/80">
                {t("nature.threat.body")}
              </p>
            </Reveal>
            <Reveal delay={450}>
              <div className="mt-10 flex items-center gap-6">
                <div className="h-px w-12 bg-coral" />
                <p className="text-sm uppercase tracking-[0.25em] text-foam/60">
                  {t("nature.threat.source")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </ParallaxSection>

      <section className="relative bg-deep-sea py-32 md:py-44">
        <div className="container max-w-6xl">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
              {t("nature.guard.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl text-foam max-w-3xl">
              {t("nature.guard.title.a")}
              <span className="italic text-gradient-ocean">{t("nature.guard.title.b")}</span>
            </h2>
          </Reveal>

          <div className="mt-20 space-y-px bg-foam/10">
            {guardians.map((g, i) => (
              <Reveal key={g.name} delay={i * 100}>
                <div className="bg-deep-sea grid gap-6 p-8 md:grid-cols-[auto_1fr_2fr] md:items-center md:gap-12 md:p-10 hover:bg-card transition-colors duration-500">
                  <div className="font-display text-5xl text-coral-glow w-16">0{i + 1}</div>
                  <div>
                    <div className="font-display text-2xl text-sand">{g.name}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-turquoise mt-2">
                      {g.full}
                    </div>
                  </div>
                  <p className="text-foam/75 leading-relaxed">{g.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Nature;
