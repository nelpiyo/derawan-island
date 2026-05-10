import Navigation from "@/components/Navigation";
import ParallaxSection from "@/components/ParallaxSection";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import SiteFooter from "@/components/SiteFooter";

import archipelagoImg from "@/assets/archipelago.jpg";
import turtleImg from "@/assets/sea-turtle.jpg";
import coralImg from "@/assets/coral-reef.jpg";
import mantaImg from "@/assets/manta-ray.jpg";

const Nature = () => {
  return (
    <main className="bg-abyss text-foam">
      <SEO
        title="Nature & Ecology — Derawan Island"
        description="Coral Triangle, penyu, karang, dan ancaman terhadap ekosistem laut Kepulauan Derawan."
      />
      <Navigation />
      <Breadcrumb current="Nature & Ecology" />

      {/* PAGE INTRO */}
      <section className="container pt-12 pb-20 md:pt-16 md:pb-28 max-w-5xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
            Nature & Ecology
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foam">
            Jaringan kehidupan
            <span className="block italic text-gradient-ocean">
              di jantung Coral Triangle.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-10 text-lg leading-relaxed text-foam/75 max-w-2xl">
            Di sini, setiap makhluk punya peran, setiap ekosistem saling
            terhubung. Penyu, pari manta, ribuan ikan karang, dan hamparan
            mangrove semuanya hidup dalam satu kesatuan yang saling bergantung
            dalam satu keseimbangan yang rapuh. Ketika satu bagian terganggu,
            dampaknya dirasakan oleh semua.
          </p>
        </Reveal>
      </section>

      {/* IMPACT TRACKER */}
      <ParallaxSection
        image={turtleImg}
        speed={0.3}
        height="min-h-screen"
        overlayClass="bg-gradient-to-b from-abyss/85 via-deep-sea/70 to-abyss/90"
      >
        <div className="container py-32 md:py-40">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
              Impact Tracker
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foam max-w-3xl">
              Angka yang menjadi
              <span className="block italic text-gradient-ocean">
                alasan untuk terus menjaga.
              </span>
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-px bg-foam/10 md:grid-cols-4">
            {[
              { v: 2, suffix: "", label: "Spesies penyu", sub: "Hijau & Sisik" },
              { v: 507, suffix: "", label: "Spesies karang", sub: "Hermatipik" },
              { v: 872, suffix: "", label: "Ikan karang", sub: "Tercatat" },
              { v: 285548.95, suffix: " ha", label: "Konservasi", sub: "KKP3K", dec: 0 },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="glass h-full p-8 md:p-10">
                  <div className="text-5xl md:text-6xl text-gradient-sunset font-display">
                    <Counter value={s.v} suffix={s.suffix} decimals={s.dec ?? 0} />
                  </div>
                  <div className="mt-6 text-sm uppercase tracking-[0.2em] text-foam">
                    {s.label}
                  </div>
                  <div className="mt-2 text-xs text-foam/50">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ARCHIPELAGO */}
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
                  Archipelago
                </p>
              </Reveal>
              <Reveal delay={150}>
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1] text-foam">
                  Di jantung
                  <span className="block italic text-gradient-ocean">
                    Coral Triangle.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-10 flex items-baseline gap-6">
                  <div className="font-display text-7xl text-coral-glow">
                    <Counter value={76} suffix="%" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] text-foam/70">
                    spesies karang dunia<br />ada di kawasan ini
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-7 md:pl-12 space-y-10">
              <Reveal delay={200}>
                <div>
                  <h3 className="font-display text-2xl text-sand mb-4">
                    Posisi Geografis
                  </h3>
                  <p className="text-foam/75 leading-relaxed">
                    Kepulauan Derawan terletak di pesisir timur Kabupaten Berau.
                    Sebagai bagian dari <em className="text-turquoise not-italic">Coral Triangle</em>,
                    Derawan menjadi rumah bagi penyu hijau, pari manta, hiu paus,
                    ribuan spesies ikan karang, dan hamparan mangrove penyangga
                    pantai Berau.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={350}>
                <div>
                  <h3 className="font-display text-2xl text-sand mb-4">
                    Marine Governance
                  </h3>
                  <p className="text-foam/75 leading-relaxed">
                    Ditetapkan melalui <span className="text-foam">Kepmen KP No. 87/2016</span>{" "}
                    sebagai Kawasan Konservasi Pesisir & Pulau-Pulau Kecil seluas
                    285.548,95 hektare, dengan rencana pengelolaan jangka panjang
                    2019–2039 (Pergub Kaltim No. 60/2019).
                  </p>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-foam/10">
                  {[
                    "Kepmen KP 87/2016",
                    "Pergub Kaltim 60/2019",
                    "Permen KP 31/2020",
                  ].map((r) => (
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

      {/* ECOLOGY */}
      <ParallaxSection
        image={coralImg}
        speed={0.3}
        overlayClass="bg-gradient-to-b from-abyss/80 via-deep-sea/55 to-abyss/95"
      >
        <div className="container py-32 md:py-44">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
              Ecology & Conservation
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foam max-w-4xl">
              Sebuah jaringan kehidupan
              <span className="italic text-gradient-ocean"> yang saling terhubung.</span>
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Penyu",
                latin: "Chelonia mydas · Eretmochelys imbricata",
                body: "Lokasi peneluran penyu hijau terbesar di Indonesia. Setiap pantai dan setiap telur adalah bagian dari masa depan spesies dilindungi ini.",
              },
              {
                title: "Karang & Lamun",
                latin: "507 spesies karang · 9 spesies lamun",
                body: "Karang menyediakan tempat berlindung; lamun menjadi area makan penyu dan pembesaran ikan muda. Keduanya menahan sedimen dan menjernihkan air.",
              },
              {
                title: "Ikan Dilindungi",
                latin: "Napoleon · Bumphead · Whitetip Reef Shark",
                body: "Spesies penting yang bergerak lintas pulau menunjukkan bahwa perairan Derawan adalah bagian dari jejaring habitat laut yang lebih luas.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 150}>
                <article className="glass h-full p-8 md:p-10 hover:border-coral/40 transition-colors duration-500">
                  <div className="font-display text-3xl text-coral-glow mb-2">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-3xl text-sand mb-2">
                    {c.title}
                  </h3>
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

      {/* THREATS */}
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
                Ancaman
              </p>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="font-display text-4xl md:text-6xl text-foam">
                <span className="italic text-gradient-sunset">46.105 kg</span>{" "}
                sampah, setiap hari.
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-8 text-lg leading-relaxed text-foam/80">
                Pada puncak musim liburan, aktivitas wisata menghasilkan sampah
                non-rumah tangga sebesar itu di Pulau Derawan—sebuah pulau
                kurang dari 45 hektare. Plastik menutup karang, melukai biota,
                termakan penyu, dan berubah menjadi mikroplastik.
              </p>
            </Reveal>
            <Reveal delay={450}>
              <div className="mt-10 flex items-center gap-6">
                <div className="h-px w-12 bg-coral" />
                <p className="text-sm uppercase tracking-[0.25em] text-foam/60">
                  Sumber: WWF Indonesia · Plastic Smart Cities
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </ParallaxSection>

      {/* GUARDIANS */}
      <section className="relative bg-deep-sea py-32 md:py-44">
        <div className="container max-w-6xl">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
              Guardians of Derawan
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl text-foam max-w-3xl">
              Kolaborasi yang tumbuh
              <span className="italic text-gradient-ocean"> demi keberlanjutan.</span>
            </h2>
          </Reveal>

          <div className="mt-20 space-y-px bg-foam/10">
            {[
              {
                name: "YLBKD",
                full: "Yayasan Laut Biru Kepulauan Derawan",
                role: "Mitra resmi Global Conservation; patroli laut, pemantauan Marine Monitor (M2), pemberdayaan masyarakat pesisir.",
              },
              {
                name: "WWF Indonesia",
                full: "Plastic Smart Cities · TPS3R Derawan",
                role: "Mengurangi tekanan sampah di darat sebelum mencapai laut—melindungi penyu, karang, dan kualitas perairan.",
              },
              {
                name: "Pemprov Kaltim",
                full: "Dinas Kelautan & Perikanan · UPTD/BLUD",
                role: "Kerangka kelembagaan & pendanaan jangka panjang. Kerja sama dengan YKAN & YLBKD untuk periode 2025–2030.",
              },
            ].map((g, i) => (
              <Reveal key={g.name} delay={i * 100}>
                <div className="bg-deep-sea grid gap-6 p-8 md:grid-cols-[auto_1fr_2fr] md:items-center md:gap-12 md:p-10 hover:bg-card transition-colors duration-500">
                  <div className="font-display text-5xl text-coral-glow w-16">
                    0{i + 1}
                  </div>
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
