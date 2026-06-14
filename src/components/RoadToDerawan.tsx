import Reveal from "@/components/Reveal";
import { ArrowRight, Play } from "lucide-react";
import { useI18n } from "@/i18n";

const YOUTUBE_ID = "s23KoRdDjb8";
const YOUTUBE_URL = `https://youtu.be/${YOUTUBE_ID}?si=wTCqhQYqCM3qBdxO`;
const YOUTUBE_THUMB = `https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;
const YOUTUBE_THUMB_FALLBACK = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;

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
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-turquoise to-deep-sea px-8 py-4 text-xs uppercase tracking-[0.3em] text-foam font-semibold shadow-[0_10px_40px_-10px_rgba(0,180,200,0.6)] hover:shadow-[0_15px_50px_-5px_rgba(0,180,200,0.9)] hover:scale-[1.03] transition-all duration-300 border border-foam/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
              >
                {lang === "en" ? "Follow the journey" : "Ikuti perjalanan"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          {/* RIGHT — YouTube video preview */}
          <Reveal delay={300}>
            <div className="space-y-3">
              {/* Mobile-only caption (above video) */}
              <p className="md:hidden text-[10px] uppercase tracking-[0.4em] text-turquoise">
                YouTube · PKM Derawan HI Unmul
              </p>

              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === "en" ? "Watch Road to Pulau Derawan documentary on YouTube" : "Tonton dokumenter Road to Pulau Derawan di YouTube"}
                className="relative group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-foam/15 shadow-2xl group-hover:border-turquoise/60 group-hover:shadow-[0_20px_60px_-10px_rgba(0,180,200,0.45)] transition-all duration-500">
                  <img
                    src={YOUTUBE_THUMB}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src !== YOUTUBE_THUMB_FALLBACK) img.src = YOUTUBE_THUMB_FALLBACK;
                    }}
                    alt="Road to Pulau Derawan — YouTube documentary thumbnail"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-abyss/10 to-transparent pointer-events-none" />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="relative flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-full bg-coral/90 group-hover:bg-coral text-foam shadow-[0_10px_40px_-5px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-all duration-300">
                      <span className="absolute inset-0 rounded-full bg-coral/40 animate-ping opacity-0 group-hover:opacity-100" />
                      <Play className="h-6 w-6 md:h-10 md:w-10 ml-1 fill-current" strokeWidth={0} />
                    </span>
                  </div>

                  {/* Caption inside thumbnail — desktop only */}
                  <div className="hidden md:block absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-turquoise mb-2">
                      YouTube · PKM Derawan HI Unmul
                    </p>
                    <p className="font-display text-xl md:text-2xl text-foam italic">
                      {lang === "en" ? "A documentary expedition" : "Ekspedisi dokumenter"}
                    </p>
                  </div>
                </div>
              </a>

              {/* Mobile-only title (below video) */}
              <p className="md:hidden font-display text-lg italic text-foam/90">
                {lang === "en" ? "A documentary expedition" : "Ekspedisi dokumenter"}
              </p>
            </div>
          </Reveal>


        </div>
      </div>
    </section>
  );
};

export default RoadToDerawan;
