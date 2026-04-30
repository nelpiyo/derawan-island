import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ParallaxSection from "@/components/ParallaxSection";
import Reveal from "@/components/Reveal";
import SEO from "@/components/SEO";
import SiteFooter from "@/components/SiteFooter";

import heroImg from "@/assets/hero-derawan.jpg";
import coralImg from "@/assets/coral-reef.jpg";
import bajauImg from "@/assets/bajau-village.jpg";
import turtleImg from "@/assets/sea-turtle.jpg";

const sections = [
  {
    to: "/nature",
    eyebrow: "I · Nature & Ecology",
    title: "Coral Triangle",
    italic: "yang rapuh.",
    body: "Penyu, pari manta, 444 spesies karang, dan ancaman 46 ton sampah per hari.",
    image: coralImg,
  },
  {
    to: "/culture",
    eyebrow: "II · Culture & Economy",
    title: "Suku Bajau",
    italic: "& ekonomi yang menjaga.",
    body: "Pengetahuan maritim, tradisi Mag'jamu, dan konservasi sebagai aset ekonomi.",
    image: bajauImg,
  },
  {
    to: "/stories",
    eyebrow: "III · Visitor Stories",
    title: "Cerita mereka",
    italic: "yang pernah ke sini.",
    body: "Suara, foto, dan kenangan dari pengunjung Pulau Derawan.",
    image: turtleImg,
  },
];

const Index = () => {
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
              The Last Sanctuary of the Celebes Sea
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
                Bukan sekadar pulau indah di Kabupaten Berau. Ia adalah rumah bagi
                penyu, pari manta, terumbu karang, dan kehidupan laut yang menjadi
                kebanggaan Kalimantan Timur.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-coral" />
                <span className="text-xs uppercase tracking-[0.3em] text-foam/60">
                  Scroll
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
              Manifesto
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-foam">
              Surga ini sedang{" "}
              <span className="italic text-gradient-sunset">terdesak.</span>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-12 text-lg leading-relaxed text-foam/75 max-w-3xl">
              Sampah plastik, eksploitasi laut, dan perubahan iklim mengancam
              kehidupan yang membuat Derawan begitu berharga. Menjaga Derawan
              berarti menyelamatkan rumah terakhir bagi kehidupan laut Berau.
            </p>
          </Reveal>
          <Reveal delay={500}>
            <blockquote className="mt-16 border-l-2 border-coral pl-8 md:pl-12 max-w-4xl">
              <p className="font-display text-2xl md:text-4xl italic leading-snug text-sand">
                "Derawan harus dijaga hari ini, bukan nanti."
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* DIRECTORY — 3 PAGES */}
      <section className="relative bg-abyss py-32 md:py-44">
        <div className="container">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
              Explore
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foam max-w-3xl">
              Tiga jalan masuk
              <span className="italic text-gradient-ocean"> ke Derawan.</span>
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
                      Read more
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
