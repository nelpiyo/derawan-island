import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import SEO from "@/components/SEO";
import SiteFooter from "@/components/SiteFooter";
import MemoryGame from "@/components/MemoryGame";
import { useI18n } from "@/i18n";

const Play = () => {
  const { t } = useI18n();

  const steps = [
    { n: "01", t: t("play.how.s1.t"), d: t("play.how.s1.d") },
    { n: "02", t: t("play.how.s2.t"), d: t("play.how.s2.d") },
    { n: "03", t: t("play.how.s3.t"), d: t("play.how.s3.d") },
  ];

  return (
    <main className="bg-abyss text-foam min-h-screen">
      <SEO title={t("play.seo.title")} description={t("play.seo.desc")} />
      <Navigation />
      <Breadcrumb current={t("breadcrumb.play")} />

      <section className="container max-w-6xl pb-12 pt-12 md:pt-16">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-turquoise">
            {t("play.eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foam leading-[0.95]">
            Derawan
            <span className="block italic text-gradient-sunset">Memory Match</span>
          </h1>
        </Reveal>
        <Reveal delay={250}>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-foam/75 leading-relaxed">
            {t("play.intro")}
          </p>
        </Reveal>
      </section>

      <section className="bg-gradient-deep py-16 md:py-20">
        <div className="container max-w-4xl">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-coral">
              {t("play.story.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display text-3xl md:text-5xl text-foam leading-tight">
              {t("play.story.title")}
              <span className="italic text-gradient-ocean">…</span>
            </h2>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-8 space-y-5 text-base md:text-lg text-foam/80 leading-relaxed">
              <p>
                {t("play.story.p1.a")}{" "}
                <span className="text-sand italic">{t("play.story.p1.b")}</span>{" "}
                {t("play.story.p1.c")}{" "}
                <span className="text-turquoise">{t("play.story.p1.manta")}</span>{" "}
                {t("play.story.p1.d")}{" "}
                <span className="text-turquoise">{t("play.story.p1.jelly")}</span>{" "}
                {t("play.story.p1.e")}{" "}
                <span className="text-turquoise">{t("play.story.p1.clown")}</span>{" "}
                {t("play.story.p1.f")}
              </p>
              <p>{t("play.story.p2")}</p>
              <p className="font-display text-xl md:text-2xl italic text-coral">
                {t("play.story.p3")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container max-w-4xl pt-16 pb-8">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-foam">
            {t("play.how.title")}<span className="italic text-gradient-ocean">.</span>
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="border-l-2 border-coral/40 pl-5 py-2">
                <div className="font-display text-3xl text-coral">{s.n}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-foam">{s.t}</div>
                <p className="mt-2 text-sm text-foam/70 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="game" className="bg-abyss py-16 md:py-24">
        <div className="container max-w-6xl">
          <MemoryGame />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Play;
