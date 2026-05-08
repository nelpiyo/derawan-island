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
      description="Memory card game seru bertema biota laut Pulau Derawan untuk anak-anak. 3 level, sound effect, & cerita edukasi."
    />
    <Navigation />
    <Breadcrumb current="Play" />

    {/* HERO */}
    <section className="container max-w-6xl pb-12 pt-12 md:pt-16">
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
          Balik kartu, ingat letaknya, dan cocokkan pasangan biota laut Derawan
          secepat mungkin! 🐢🐠🪼
        </p>
      </Reveal>
    </section>

    {/* EDUCATIONAL STORY */}
    <section className="bg-gradient-deep py-16 md:py-20">
      <div className="container max-w-4xl">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-coral">
            Sebelum Mulai · Cerita Singkat
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-display text-3xl md:text-5xl text-foam leading-tight">
            Di sebuah pulau kecil di tengah Laut Sulawesi
            <span className="italic text-gradient-ocean">…</span>
          </h2>
        </Reveal>
        <Reveal delay={250}>
          <div className="mt-8 space-y-5 text-base md:text-lg text-foam/80 leading-relaxed">
            <p>
              Hiduplah <span className="text-sand italic">Penyu Hijau</span> tua bernama Mbah Pe.
              Setiap malam, ia bercerita pada cucunya tentang teman-temannya di laut Derawan —
              <span className="text-turquoise"> Pari Manta</span> raksasa yang lembut,{" "}
              <span className="text-turquoise">Ubur-ubur emas</span> di Danau Kakaban yang
              tak menyengat, dan <span className="text-turquoise">Ikan Badut</span> kecil
              yang lucu di rumah anemonnya.
            </p>
            <p>
              Tapi suatu hari, Mbah Pe sedih. Sampah plastik mulai datang. Beberapa temannya
              hilang. "Aku butuh bantuanmu," katanya pada cucunya. "Ingatlah wajah-wajah mereka
              baik-baik. Karena yang kita ingat, akan kita jaga."
            </p>
            <p className="font-display text-xl md:text-2xl italic text-coral">
              Sekarang giliranmu. Hafalkan biota laut Derawan dengan memainkan kartu di bawah
              ini. Setiap pasangan yang kamu temukan, adalah teman baru yang kamu kenal. 💙
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* HOW TO PLAY */}
    <section className="container max-w-4xl pt-16 pb-8">
      <Reveal>
        <h2 className="font-display text-3xl md:text-4xl text-foam">
          Cara main<span className="italic text-gradient-ocean">.</span>
        </h2>
      </Reveal>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { n: "01", t: "Pilih Level", d: "Easy 6 pasang, Medium 9, Hard 12. Pilih sesuai kemampuanmu!" },
          { n: "02", t: "Balik & Cocokkan", d: "Klik dua kartu untuk membalik & cari pasangannya." },
          { n: "03", t: "Selesaikan Semua", d: "Cocokkan semua pasangan untuk membuka galeri biota laut!" },
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

    {/* GAME */}
    <section id="game" className="bg-abyss py-16 md:py-24">
      <div className="container max-w-6xl">
        <MemoryGame />
      </div>
    </section>

    <SiteFooter />
  </main>
);

export default Play;
