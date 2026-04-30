import Navigation from "@/components/Navigation";
import ParallaxSection from "@/components/ParallaxSection";
import Reveal from "@/components/Reveal";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import SiteFooter from "@/components/SiteFooter";

import bajauImg from "@/assets/bajau-village.jpg";
import economyImg from "@/assets/sustainable-economy.jpg";

const Culture = () => {
  return (
    <main className="bg-abyss text-foam">
      <SEO
        title="Culture & Economy — Derawan Island"
        description="Suku Bajau, kearifan lokal, dan ekonomi berkelanjutan di Kepulauan Derawan."
      />
      <Navigation />
      <Breadcrumb current="Culture & Economy" />

      <section className="container pt-12 pb-20 md:pt-16 md:pb-28 max-w-5xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-sand">
            Culture & Economy
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foam">
            Pengetahuan laut,
            <span className="block italic text-gradient-sunset">
              ekonomi yang menjaga.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-10 text-lg leading-relaxed text-foam/75 max-w-2xl">
            Suku Bajau dan masyarakat pesisir Berau adalah pemilik pengetahuan
            maritim — dan kunci dari ekonomi yang menjaga, bukan menghabiskan.
          </p>
        </Reveal>
      </section>

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

      {/* LOCAL WISDOM */}
      <ParallaxSection
        image={bajauImg}
        speed={0.35}
        overlayClass="bg-gradient-to-t from-abyss/95 via-deep-sea/55 to-abyss/40"
      >
        <div className="container py-32 md:py-44 flex min-h-screen items-end">
          <div className="max-w-3xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.5em] text-sand">
                Local Wisdom
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
        image={economyImg}
        speed={0.3}
        overlayClass="bg-gradient-to-b from-abyss/85 via-deep-sea/60 to-abyss"
      >
        <div className="container py-32 md:py-44">
          <div className="grid gap-16 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
                  Sustainable Economy
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

      <SiteFooter />
    </main>
  );
};

export default Culture;
