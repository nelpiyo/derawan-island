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
import { Leaf, Users, BookOpen, ChevronDown } from "lucide-react";

import heroImg from "@/assets/hero-derawan.jpg";
import coralImg from "@/assets/Coral.webp";
import bajauImg from "@/assets/pemandangan-udara-derawan.webp";
import turtleImg from "@/assets/turtles derawan.webp";

const Index = () => {
  const { t, lang } = useI18n();

  const sections = [
    {
      to: "/nature",
      eyebrow: t("home.dir.nature.eyebrow"),
      title: t("home.dir.nature.title"),
      italic: t("home.dir.nature.italic"),
      body: t("home.dir.nature.body"),
      image: coralImg,
      icon: Leaf,
      overlay: "from-deep-sea/80 via-deep-sea/25 to-transparent",
      accent: "text-turquoise",
    },
    {
      to: "/culture",
      eyebrow: t("home.dir.culture.eyebrow"),
      title: t("home.dir.culture.title"),
      italic: t("home.dir.culture.italic"),
      body: t("home.dir.culture.body"),
      image: bajauImg,
      icon: Users,
      overlay: "from-orange-950/80 via-orange-900/25 to-transparent",
      accent: "text-amber-300",
    },
    {
      to: "/stories",
      eyebrow: t("home.dir.stories.eyebrow"),
      title: t("home.dir.stories.title"),
      italic: t("home.dir.stories.italic"),
      body: t("home.dir.stories.body"),
      image: turtleImg,
      icon: BookOpen,
      overlay: "from-teal-950/80 via-teal-900/25 to-transparent",
      accent: "text-emerald-300",
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
        overlayClass="bg-gradient-to-b from-abyss/30 via-deep-sea/40 to-abyss"
      >
        {/* Extra refined bottom gradient for legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-abyss via-abyss/70 to-transparent"
        />
        <Bokeh count={22} />

        <div className="container relative flex min-h-screen flex-col justify-end pb-32 pt-40">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.6em] text-turquoise">
              {t("home.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="font-display text-[14vw] leading-[0.9] md:text-[9rem] lg:text-[11rem] text-foam drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
              Derawan
              <span className="block italic text-gradient-ocean">Island</span>
            </h1>
          </Reveal>
          <Reveal delay={350}>
            <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-xl text-base md:text-lg text-foam/85 leading-relaxed">
                {t("home.intro")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={500}>
            <a
              href="#manifesto"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("manifesto")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group mt-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-turquoise hover:text-foam transition-colors"
            >
              <span>{lang === "en" ? "Scroll to explore" : "Geser untuk menjelajah"}</span>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </a>
          </Reveal>
        </div>


        <div className="pointer-events-none absolute right-6 top-1/3 hidden md:block">
          <div className="font-display text-foam/10 text-[12rem] leading-none animate-drift">
          </div>
        </div>
      </ParallaxSection>

      {/* Wave divider into manifesto */}
      <div className="relative -mt-20 z-10">
        <WaveDivider fill="hsl(var(--abyss))" />
      </div>

      {/* MANIFESTO */}
      <section id="manifesto" className="relative bg-gradient-deep py-32 md:py-44">
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

      <WaveDivider fill="hsl(var(--abyss))" />

      {/* ROAD TO DERAWAN */}
      <RoadToDerawan />

      <WaveDivider fill="hsl(var(--abyss))" />

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
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.to} delay={i * 150}>
                  <Link
                    to={s.to}
                    className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-foam/10 hover:border-foam/30 transition-all duration-500 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] hover:-translate-y-1"
                  >
                    <img
                      src={s.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-[1200ms] group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${s.overlay}`} />
                    <div className="relative flex h-full flex-col p-8 md:p-10">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-foam/20 bg-abyss/30 backdrop-blur-sm">
                        <Icon className="h-5 w-5 text-foam" strokeWidth={1.5} />
                      </span>
                      <div className="mt-auto">
                        <p className={`text-xs uppercase tracking-[0.3em] ${s.accent} mb-4`}>
                          {s.eyebrow}
                        </p>
                        <h3 className="font-display text-3xl md:text-4xl text-foam leading-tight">
                          {s.title}
                          <span className="block italic text-gradient-sunset">
                            {s.italic}
                          </span>
                        </h3>
                        <p className="mt-5 text-sm text-foam/80 leading-relaxed">
                          {s.body}
                        </p>
                        <div className={`mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] ${s.accent}`}>
                          {t("home.directory.readmore")}
                          <span
                            aria-hidden
                            className={`inline-block h-px w-8 bg-current transition-all duration-500 group-hover:w-16`}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      <SiteFooter />
    </main>
  );
};

export default Index;
