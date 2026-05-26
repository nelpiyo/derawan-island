import Reveal from "@/components/Reveal";
import { Play } from "lucide-react";
import { useI18n } from "@/i18n";

const RoadToDerawan = () => {
  const { t } = useI18n();

  return (
    <section className="relative bg-abyss py-32 md:py-44 overflow-hidden">
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-turquoise/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-coral/10 blur-3xl pointer-events-none" />
      <div className="container max-w-6xl relative">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          <div>
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
                {t("road.eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foam leading-[0.95]">
                {t("road.title.a")}
                <span className="block italic text-gradient-ocean">
                  {t("road.title.b")}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-8 text-lg text-foam/75 leading-relaxed max-w-md">
                {t("road.body")}
              </p>
            </Reveal>
          </div>

          <Reveal delay={250}>
            <a 
              href="https://youtu.be/s23KoRdDjb8?si=aNFRA9_zYxX3l7Ho" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Tonton dokumenter Pulau Derawan di YouTube" 
              className="relative group block"
            >
              <div className="relative aspect-video w-full overflow-hidden border border-foam/15 bg-abyss shadow-2xl group-hover:border-coral/60 transition-colors duration-500 rounded-2xl">
                
                {/* BACKGROUND THUMBNAIL YOUTUBE */}
                <img 
                  src="https://img.youtube.com/vi/s23KoRdDjb8/maxresdefault.jpg" 
                  alt="Thumbnail Road to Derawan" 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500" 
                />
                <div className="absolute inset-0 bg-abyss/30 group-hover:bg-abyss/10 transition-colors duration-500" />

                {/* KONTEN TENGAH (TOMBOL PLAY & TEKS) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
                  <div className="relative">
                    <span className="absolute inset-0 rounded-full bg-coral/30 animate-ping" />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-coral/90 flex items-center justify-center shadow-coral group-hover:scale-110 transition-transform duration-500">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground fill-primary-foreground ml-1" />
                    </div>
                  </div>
                  
                  {/* GANTI TEKS DI BAWAH INI SESUAI MAUMU */}
                  <p className="font-display text-2xl md:text-3xl text-white drop-shadow-md">
                    SAKSIKAN_VIDEO
                  </p>
                  
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/90 drop-shadow-md">
                    KLIK UNTUK MENONTON
                  </p>
                </div>

                {/* LABEL ATAS */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-abyss/90 to-transparent">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/90">
                    YOUTUBE · DERAWAN STORIES
                  </span>
                  
                  {/* GANTI TEKS DI BAWAH INI SESUAI MAUMU */}
                  <span className="text-[9px] uppercase tracking-[0.3em] text-coral font-bold">
                    TULIS_KATEGORI_BARU_DI_SINI
                  </span>
                  
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
