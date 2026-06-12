import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ParallaxSection from "@/components/ParallaxSection";
import Reveal from "@/components/Reveal";
import SEO from "@/components/SEO";
import SiteFooter from "@/components/SiteFooter";
import RoadToDerawan from "@/components/RoadToDerawan";
import WaveDivider from "@/components/WaveDivider";
import Bokeh from "@/components/Bokeh";
import { useI18n } from "@/i18n";

import heroImg from "@/assets/hero-derawan.jpg";
import coralImg from "@/assets/Coral.webp";
import bajauImg from "@/assets/pemandangan-udara-derawan.webp";
import turtleImg from "@/assets/turtles derawan.webp";

const Index = () => {
  const { t } = useI18n();

  const sections = [
    {
      to: "/nature",
      eyebrow: t("home.dir.nature.eyebrow"),
      title: t("home.dir.nature.title"),
      italic: t("home.dir.nature.italic"),
      body: t("home.dir.nature.body"),
      image: coralImg,
    },
    {
      to: "/culture",
      eyebrow: t("home.dir.culture.eyebrow"),
      title: t("home.dir.culture.title"),
      italic: t("home.dir.culture.italic"),
      body: t("home.dir.culture.body"),
      image: bajauImg,
    },
    {
      to: "/stories",
      eyebrow: t("home.dir.stories.eyebrow"),
      title: t("home.dir.stories.title"),
      italic: t("home.dir.stories.italic"),
      body: t("home.dir.stories.body"),
      image: turtleImg,
    },
  ];

  return (
    <main className="bg-abyss text-foam">
      <SEO />
      <Navigation />

      {/* HERO */}
      <ParallaxSection
        id="home"
        image={heroImg}
        speed={0.35}
        height="min-h-screen"
        overlayClass="bg-gradient-to-b from-abyss/40 via-deep-sea/30 to-abyss/90"
      >
        <div className="container flex min-h-screen flex-col justify-end pb-24 pt-40">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.6em] text-turquoise">
              {t("home.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="font-display text-[14vw] leading-[0.9] md:text-[9rem] lg:text-[11rem] text-foam">
              Derawan
              <span className="block italic text-gradient-ocean">Island</span>
            </h1>
          </Reveal>
          <Reveal delay={350}>
            <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-xl text-base md:text-lg text-foam/80 leading-relaxed">
                {t("home.intro")}
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-coral" />
                <span className="text-xs uppercase tracking-[0.3em] text-foam/60">
                  {t("nav.scroll")}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="pointer-events-none absolute right-6 top-1/3 hidden md:block">
          <div className="font-display text-foam/10 text-[12rem] leading-none animate-drift">
            01
          </div>
        </div>
      </ParallaxSection>

      {/* MANIFESTO */}
      <section className="relative bg-gradient-deep py-32 md:py-44">
        <div className="container max-w-5xl">
          <Reveal>
            <p className="mb-8 text-xs uppercase tracking-[0.5em] text-coral">
              {t("home.manifesto.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-foam">
              {t("home.manifesto.title.a")}{" "}
              <span className="italic text-gradient-sunset">{t("home.manifesto.title.b")}</span>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-12 text-lg leading-relaxed text-foam/75 max-w-3xl">
              {t("home.manifesto.body")}
            </p>
          </Reveal>
          <Reveal delay={500}>
            <blockquote className="mt-16 border-l-2 border-coral pl-8 md:pl-12 max-w-4xl">
              <p className="font-display text-2xl md:text-4xl italic leading-snug text-sand">
                {t("home.manifesto.quote")}
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ROAD TO DERAWAN */}
      <RoadToDerawan />

      {/* DIRECTORY */}
      <section className="relative bg-abyss py-32 md:py-44">
        <div className="container">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
              {t("home.directory.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foam max-w-3xl">
              {t("home.directory.title.a")}
              <span className="italic text-gradient-ocean">
                {t("home.directory.title.b")}
              </span>
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {sections.map((s, i) => (
              <Reveal key={s.to} delay={i * 150}>
                <Link
                  to={s.to}
                  className="group relative block aspect-[3/4] overflow-hidden border border-foam/10 hover:border-coral/50 transition-colors duration-500"
                >
                  <img
                    src={s.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/60 to-abyss/10" />
                  <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
                    <p className="text-xs uppercase tracking-[0.3em] text-turquoise mb-4">
                      {s.eyebrow}
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl text-foam leading-tight">
                      {s.title}
                      <span className="block italic text-gradient-sunset">
                        {s.italic}
                      </span>
                    </h3>
                    <p className="mt-5 text-sm text-foam/70 leading-relaxed">
                      {s.body}
                    </p>
                    <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-coral">
                      {t("home.directory.readmore")}
                      <span
                        aria-hidden
                        className="inline-block h-px w-8 bg-coral transition-all duration-500 group-hover:w-16"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Index;
