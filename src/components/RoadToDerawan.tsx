import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n";
import boatImg from "@/assets/boat-derawan.jpg";

const RoadToDerawan = () => {
  const { t, lang } = useI18n();

  return (
    <section className="relative bg-gradient-to-b from-abyss via-deep-sea to-abyss py-32 md:py-44 overflow-hidden">
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-turquoise/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-coral/10 blur-3xl pointer-events-none" />
      <div className="container max-w-6xl relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT — Title + CTA */}
          <div>
            <Reveal>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foam leading-[0.95]">
                {t("road.title.a")}
                <span className="block italic text-gradient-ocean">
                  {t("road.title.b")}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-8 text-lg text-foam/80 leading-relaxed max-w-md font-light">
                {t("road.body")}
              </p>
            </Reveal>
            <Reveal delay={400}>
              <a
                href="https://youtu.be/s23KoRdDjb8?si=aNFRA9_zYxX3l7Ho"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-turquoise to-deep-sea px-8 py-4 text-xs uppercase tracking-[0.3em] text-foam font-semibold shadow-[0_10px_40px_-10px_rgba(0,180,200,0.6)] hover:shadow-[0_15px_50px_-5px_rgba(0,180,200,0.9)] hover:scale-[1.03] transition-all duration-300 border border-foam/20"
              >
                {lang === "en" ? "Follow the journey" : "Ikuti perjalanan"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          {/* RIGHT — Boat photo */}
          <Reveal delay={300}>
            <a
              href="https://youtu.be/s23KoRdDjb8?si=aNFRA9_zYxX3l7Ho"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tonton dokumenter Pulau Derawan"
              className="relative group block"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-foam/15 shadow-2xl group-hover:border-turquoise/50 transition-colors duration-500">
                <img
                  src={boatImg}
                  alt="Perahu kayu tradisional berlayar di laut Derawan saat senja"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-abyss/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-turquoise mb-2">
                    YouTube · PKM Derawan HI Unmul
                  </p>
                  <p className="font-display text-xl md:text-2xl text-foam italic">
                    {lang === "en" ? "A documentary expedition" : "Ekspedisi dokumenter"}
                  </p>
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default RoadToDerawan;
