import Navigation from "@/components/Navigation";
import Reveal from "@/components/Reveal";
import SEO from "@/components/SEO";
import Guestbook from "@/components/Guestbook";
import Breadcrumb from "@/components/Breadcrumb";
import SiteFooter from "@/components/SiteFooter";

const Stories = () => {
  return (
    <main className="bg-abyss text-foam">
      <SEO
        title="Stories — Derawan Island"
        description="Cerita pengunjung Pulau Derawan dan ajakan untuk bertindak hari ini."
      />
      <Navigation />
      <Breadcrumb current="Stories" />

      <section className="container pt-12 pb-20 md:pt-16 md:pb-28 max-w-5xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
            Visitor Stories
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foam">
            Suara dari
            <span className="block italic text-gradient-ocean">
              mereka yang pernah ke sini.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-10 text-lg leading-relaxed text-foam/75 max-w-2xl">
            Cerita, foto, dan kenangan dari pengunjung — bukti bahwa Derawan
            menyentuh siapa pun yang datang.
          </p>
        </Reveal>
      </section>

      <Guestbook />

      <RoadToDerawan />

      {/* Bridge into CTA — gives context, no abrupt jump */}
      <section className="relative bg-gradient-to-b from-abyss via-deep-sea to-abyss py-24 md:py-32 border-t border-foam/5">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.5em] text-coral/80 mb-8">
              · Mengapa cerita ini penting
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-foam/90 leading-snug italic">
              "Setiap cerita yang Anda baca di atas, setiap foto yang dibagikan,
              dan setiap video yang akan kami unggah—semuanya menuju ke satu
              kesimpulan yang sama."
            </p>
          </Reveal>
          <Reveal delay={350}>
            <div className="mt-12 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-coral/40" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-foam/50">
                Scroll untuk panggilan bertindak
              </span>
              <span className="h-px w-12 bg-coral/40" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
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
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Stories;
