import Navigation from "@/components/Navigation";
import ParallaxSection from "@/components/ParallaxSection";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SEO from "@/components/SEO";

import heroImg from "@/assets/hero-derawan.jpg";
import archipelagoImg from "@/assets/archipelago.jpg";
import turtleImg from "@/assets/sea-turtle.jpg";
import coralImg from "@/assets/coral-reef.jpg";
import mantaImg from "@/assets/manta-ray.jpg";
import bajauImg from "@/assets/bajau-village.jpg";
import economyImg from "@/assets/sustainable-economy.jpg";

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

        {/* floating decorative numbers */}
        <div className="pointer-events-none absolute right-6 top-1/3 hidden md:block">
          <div className="font-display text-foam/10 text-[12rem] leading-none animate-drift">
            01
          </div>
        </div>
      </ParallaxSection>

      {/* MANIFESTO / URGENCY */}
      <section className="relative bg-gradient-deep py-32 md:py-44">
        <div className="container max-w-5xl">
          <Reveal>
            <p className="mb-8 text-xs uppercase tracking-[0.5em] text-coral">
              I. Manifesto
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-foam">
              Surga ini sedang{" "}
              <span className="italic text-gradient-sunset">terdesak.</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <Reveal delay={200}>
              <p className="text-lg leading-relaxed text-foam/75">
                Sampah plastik, eksploitasi laut, pembangunan yang tak terkendali,
                dan perubahan iklim perlahan mengancam kehidupan yang membuat
                Derawan begitu berharga.
              </p>
            </Reveal>
            <Reveal delay={350}>
              <p className="text-lg leading-relaxed text-foam/75">
                Menjaga Derawan bukan sekadar menjaga tempat wisata. Ini tentang
                menyelamatkan rumah terakhir bagi kehidupan laut Berau.
              </p>
            </Reveal>
          </div>
          <Reveal delay={500}>
            <blockquote className="mt-20 border-l-2 border-coral pl-8 md:pl-12">
              <p className="font-display text-2xl md:text-4xl italic leading-snug text-sand">
                "Derawan harus dijaga hari ini, bukan nanti. Karena ketika laut
                Derawan rusak, Berau kehilangan salah satu jantung kehidupannya."
              </p>
            </blockquote>
          </Reveal>
        </div>
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
                alasan untuk bertindak.
              </span>
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-px bg-foam/10 md:grid-cols-4">
            {[
              { v: 2, suffix: "", label: "Spesies penyu", sub: "Hijau & Sisik" },
              { v: 444, suffix: "", label: "Spesies karang", sub: "Hermatipik" },
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

          <Reveal delay={300}>
            <div className="mt-16 grid gap-10 md:grid-cols-[2fr_1fr] md:items-end">
              <p className="max-w-2xl text-base md:text-lg leading-relaxed text-foam/75">
                Kepulauan Derawan dikenal sebagai lokasi peneluran{" "}
                <span className="text-coral">penyu hijau</span> terbesar di
                Indonesia. Setiap pantai yang rusak, setiap telur yang hilang,
                adalah ancaman langsung bagi masa depan spesies yang dilindungi.
              </p>
              <div className="glass-light p-6">
                <div className="font-display text-4xl text-coral-glow">
                  <Counter value={46.1} decimals={1} suffix=" ton" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-foam/70">
                  sampah / hari di puncak musim
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </ParallaxSection>

      {/* ARCHIPELAGO */}
      <ParallaxSection
        id="archipelago"
        image={archipelagoImg}
        speed={0.35}
        overlayClass="bg-gradient-to-br from-abyss/80 via-deep-sea/60 to-abyss/95"
      >
        <div className="container py-32 md:py-44">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
                  II. Archipelago
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
                    Geopolitik & Ekosistem
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

      {/* MARITIME HERITAGE */}
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
              Maritime Heritage
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl text-foam">
              Kenangan laut yang
              <span className="italic text-gradient-sunset"> tak pernah surut.</span>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-10 text-lg leading-relaxed text-foam/75 max-w-3xl">
              Maratua, Kakaban, dan Sangalaki memperlihatkan bagaimana sejarah
              laut kini bertemu dengan konservasi dan ekowisata. Menjaga Derawan
              berarti menjaga memori maritim Berau—cara hidup, pengetahuan lokal,
              dan hubungan panjang manusia dengan laut.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ECOLOGY */}
      <ParallaxSection
        id="ecology"
        image={coralImg}
        speed={0.3}
        overlayClass="bg-gradient-to-b from-abyss/80 via-deep-sea/55 to-abyss/95"
      >
        <div className="container py-32 md:py-44">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
              III. Ecology & Conservation
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
                latin: "444 spesies karang · 8 spesies lamun",
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
              Mereka yang menjaga,
              <span className="italic text-gradient-ocean"> setiap hari.</span>
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

      {/* LOCAL WISDOM */}
      <ParallaxSection
        id="wisdom"
        image={bajauImg}
        speed={0.35}
        overlayClass="bg-gradient-to-t from-abyss/95 via-deep-sea/55 to-abyss/40"
      >
        <div className="container py-32 md:py-44 flex min-h-screen items-end">
          <div className="max-w-3xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.5em] text-sand">
                IV. Local Wisdom
              </p>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foam">
                Suku
                <span className="block italic text-gradient-sunset">Bajau.</span>
              </h2>
            </Reveal>
            <Reveal delay={350}>
              <p className="mt-10 text-lg md:text-xl leading-relaxed text-foam/85 max-w-2xl">
                Bukan hanya "masyarakat lokal", tetapi{" "}
                <span className="text-sand">pemilik pengetahuan maritim</span>.
                Mereka memahami laut melalui pengalaman langsung—kapan ikan datang,
                kapan cuaca berubah, bagian mana yang rentan.
              </p>
            </Reveal>
            <Reveal delay={500}>
              <div className="mt-12 glass-light p-8 max-w-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-coral mb-3">
                  Mag'jamu
                </p>
                <p className="font-display text-2xl italic text-sand leading-snug">
                  "Tradisi turun-temurun di Kampung Tanjung Batu—pelarungan
                  miniatur kapal ke laut sebagai simbol hubungan manusia
                  dengan laut dan penghormatan kepada leluhur."
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </ParallaxSection>

      {/* SUSTAINABLE ECONOMY */}
      <ParallaxSection
        id="economy"
        image={economyImg}
        speed={0.3}
        overlayClass="bg-gradient-to-b from-abyss/85 via-deep-sea/60 to-abyss"
      >
        <div className="container py-32 md:py-44">
          <div className="grid gap-16 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
                  V. Sustainable Economy
                </p>
              </Reveal>
              <Reveal delay={150}>
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foam leading-[1.02]">
                  Konservasi
                  <span className="italic text-gradient-ocean">
                    {" "}sebagai aset ekonomi.
                  </span>
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={300}>
                <p className="text-lg leading-relaxed text-foam/80">
                  Penyu, terumbu karang, ikan karang, dan pantai bersih adalah
                  alasan utama wisatawan datang. Menjaga alam sama dengan
                  menjaga pendapatan warga.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-24 border-t border-foam/15 pt-16">
            <div className="grid gap-12 md:grid-cols-3">
              {[
                {
                  k: "Berwawasan Lingkungan",
                  v: "Pemanfaatan sumber daya pesisir & laut yang menempatkan ekosistem sebagai prioritas.",
                },
                {
                  k: "Kolaboratif",
                  v: "Pemerintah, lembaga konservasi, pelaku wisata, nelayan, dan masyarakat pesisir bekerja bersama.",
                },
                {
                  k: "Berkelanjutan",
                  v: "Manfaat ekonomi hari ini tidak boleh menghapus warisan untuk generasi berikutnya.",
                },
              ].map((p, i) => (
                <Reveal key={p.k} delay={i * 150}>
                  <div>
                    <div className="text-coral font-display text-3xl mb-4">
                      0{i + 1}
                    </div>
                    <h3 className="font-display text-2xl text-sand mb-3">
                      {p.k}
                    </h3>
                    <p className="text-foam/70 leading-relaxed text-sm">
                      {p.v}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* CTA / FOOTER */}
      <section className="relative bg-gradient-deep py-32 md:py-44">
        <div className="container max-w-4xl text-center">
          <Reveal>
            <p className="mb-8 text-xs uppercase tracking-[0.5em] text-turquoise">
              Act today, not tomorrow
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foam leading-[0.95]">
              Derawan masih bisa
              <span className="block italic text-gradient-sunset">
                diselamatkan.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={350}>
            <p className="mt-10 text-lg md:text-xl text-foam/75 max-w-2xl mx-auto leading-relaxed">
              Setiap penyu yang kembali bertelur, setiap terumbu karang yang
              bertahan, dan setiap sampah yang berhasil dicegah masuk ke laut
              adalah bukti—asal kita bertindak hari ini.
            </p>
          </Reveal>
          <Reveal delay={500}>
            <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#home"
                className="bg-coral text-primary-foreground px-10 py-4 text-xs uppercase tracking-[0.3em] hover:bg-coral-glow transition-all duration-300 shadow-coral"
              >
                Dukung Konservasi
              </a>
              <a
                href="#ecology"
                className="border border-foam/30 text-foam px-10 py-4 text-xs uppercase tracking-[0.3em] hover:border-coral hover:text-coral transition-all duration-300"
              >
                Pelajari Ekosistem
              </a>
            </div>
          </Reveal>
        </div>

        <div className="container max-w-6xl mt-32 pt-10 border-t border-foam/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-[0.25em] text-foam/50">
            <div>Derawan Island · Berau · Kalimantan Timur</div>
            <div>The Last Sanctuary of the Celebes Sea</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
