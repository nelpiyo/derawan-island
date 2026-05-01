import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import SEO from "@/components/SEO";
import SiteFooter from "@/components/SiteFooter";
import MemoryGame from "@/components/MemoryGame";

const Play = () => (
  <main className="bg-abyss text-foam min-h-screen">
    <SEO
      title="Play · Derawan Memory Game"
      description="Memory card game seru bertema biota laut Pulau Derawan untuk anak-anak."
    />
    <Navigation />
    <Breadcrumb current="Play" />

    <section className="container max-w-6xl pb-16 pt-12 md:pt-16">
      <Reveal>
        <p className="mb-4 text-xs uppercase tracking-[0.5em] text-turquoise">
          IV · Interactive Games
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
          Temukan pasangan biota laut Pulau Derawan! Balik kartu, ingat letaknya,
          dan cocokkan semua pasangan secepat mungkin. 🐢🐠🪼
        </p>
      </Reveal>
    </section>

    <section className="bg-gradient-deep py-16 md:py-24">
      <div className="container max-w-6xl">
        <MemoryGame />
      </div>
    </section>

    <section className="container max-w-4xl py-20">
      <Reveal>
        <h2 className="font-display text-3xl md:text-4xl text-foam">
          Cara main<span className="italic text-gradient-ocean">.</span>
        </h2>
      </Reveal>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { n: "01", t: "Klik kartu", d: "Balik dua kartu untuk melihat gambarnya." },
          { n: "02", t: "Cari pasangan", d: "Cocokkan dua biota laut yang sama." },
          { n: "03", t: "Selesaikan semua", d: "Kumpulkan 8 pasangan secepat mungkin!" },
        ].map((s, i) => (
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

    <SiteFooter />
  </main>
);

export default Play;
