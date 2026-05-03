import Reveal from "@/components/Reveal";
import { Play, Clapperboard } from "lucide-react";

const RoadToDerawan = () => {
  return (
    <section className="relative bg-abyss py-32 md:py-44 overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-turquoise/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-coral/10 blur-3xl pointer-events-none" />

      <div className="container max-w-6xl relative">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          {/* Copy */}
          <div>
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
                Coming soon · Mini documentary
              </p>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foam leading-[0.95]">
                Road to
                <span className="block italic text-gradient-ocean">
                  Pulau Derawan.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-8 text-lg text-foam/75 leading-relaxed max-w-md">
                Sebuah perjalanan visual—dari dermaga Tanjung Batu, menyusuri
                laut biru, hingga bertemu penyu hijau di kedalaman Derawan.
                Video lengkapnya akan segera tayang di kanal YouTube kami.
              </p>
            </Reveal>
            <Reveal delay={450}>
              <div className="mt-10 flex items-center gap-3 text-foam/60">
                <Clapperboard className="w-4 h-4 text-coral" />
                <span className="text-[10px] uppercase tracking-[0.3em]">
                  Sedang diproduksi · klik placeholder untuk YouTube
                </span>
              </div>
            </Reveal>
          </div>

          {/* Video placeholder — clickable, opens YouTube */}
          <Reveal delay={250}>
            <a
              href="https://www.youtube.com/results?search_query=pulau+derawan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tonton playlist Pulau Derawan di YouTube"
              className="relative group block"
            >
              <div className="relative aspect-video w-full overflow-hidden border border-foam/15 bg-gradient-to-br from-deep-sea via-abyss to-deep-sea shadow-2xl group-hover:border-coral/60 transition-colors duration-500">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 40%, hsl(var(--turquoise) / 0.25), transparent 50%), radial-gradient(circle at 70% 70%, hsl(var(--coral) / 0.2), transparent 50%)",
                  }}
                />

                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 800 450"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,300 Q200,250 400,290 T800,280 L800,450 L0,450 Z"
                    fill="hsl(var(--turquoise))"
                  />
                  <path
                    d="M0,340 Q200,300 400,330 T800,320 L800,450 L0,450 Z"
                    fill="hsl(var(--coral))"
                    opacity="0.5"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
                  <div className="relative">
                    <span className="absolute inset-0 rounded-full bg-coral/30 animate-ping" />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-coral/90 flex items-center justify-center shadow-coral group-hover:scale-110 transition-transform duration-500">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground fill-primary-foreground ml-1" />
                    </div>
                  </div>
                  <p className="font-display text-2xl md:text-3xl text-foam">
                    Video segera hadir
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-foam/60">
                    · Klik untuk buka YouTube
                  </p>
                </div>

                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-abyss/80 to-transparent">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-foam/70">
                    YouTube · Derawan Stories
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-coral/80">
                    ● Preview
                  </span>
                </div>
              </div>

              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-foam/40 text-center group-hover:text-coral/70 transition-colors">
                · Placeholder · video lengkap akan tertanam di sini saat rilis
              </p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default RoadToDerawan;
