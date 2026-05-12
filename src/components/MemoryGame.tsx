import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RotateCcw, Trophy, Timer, Sparkles, Volume2, VolumeX, X, ArrowRight } from "lucide-react";
import { CREATURES, type Creature } from "@/data/creatures";
import { playFlip, playMatch, playMiss, playWin, playClick, setMuted, isMuted } from "@/lib/sounds";
import { useI18n } from "@/i18n";

type Level = "easy" | "medium" | "hard";

const LEVEL_CONFIG: Record<Level, { pairs: number; cols: string; label: string }> = {
  easy: { pairs: 6, cols: "grid-cols-3 sm:grid-cols-4", label: "Easy" },
  medium: { pairs: 9, cols: "grid-cols-3 sm:grid-cols-6", label: "Medium" },
  hard: { pairs: 12, cols: "grid-cols-4 sm:grid-cols-6 lg:grid-cols-8", label: "Hard" },
};

type CardState = {
  uid: number;
  creature: Creature;
  flipped: boolean;
  matched: boolean;
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildDeck = (level: Level): { deck: CardState[]; pool: Creature[] } => {
  const pool = shuffle(CREATURES).slice(0, LEVEL_CONFIG[level].pairs);
  const deck = shuffle(
    pool.flatMap((c, i) => [
      { uid: i * 2, creature: c, flipped: false, matched: false },
      { uid: i * 2 + 1, creature: c, flipped: false, matched: false },
    ]),
  );
  return { deck, pool };
};

const MemoryGame = () => {
  const [level, setLevel] = useState<Level>("easy");
  const [{ deck, pool }, setGame] = useState(() => buildDeck("easy"));
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [lastMatch, setLastMatch] = useState<Creature | null>(null);
  const [muted, setMutedState] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const winTriggered = useRef(false);

  const allMatched = useMemo(() => deck.every((c) => c.matched), [deck]);

  useEffect(() => {
    if (!running || allMatched) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running, allMatched]);

  useEffect(() => {
    if (allMatched && !winTriggered.current && running) {
      winTriggered.current = true;
      playWin();
      setTimeout(() => setShowWin(true), 600);
    }
  }, [allMatched, running]);

  useEffect(() => {
    if (picked.length !== 2) return;
    const [a, b] = picked;
    const cardA = deck.find((c) => c.uid === a)!;
    const cardB = deck.find((c) => c.uid === b)!;
    setMoves((m) => m + 1);

    if (cardA.creature.id === cardB.creature.id) {
      playMatch();
      setLastMatch(cardA.creature);
      setTimeout(() => {
        setGame((g) => ({
          ...g,
          deck: g.deck.map((c) => (c.uid === a || c.uid === b ? { ...c, matched: true } : c)),
        }));
        setPicked([]);
      }, 600);
    } else {
      playMiss();
      setTimeout(() => {
        setGame((g) => ({
          ...g,
          deck: g.deck.map((c) => (c.uid === a || c.uid === b ? { ...c, flipped: false } : c)),
        }));
        setPicked([]);
      }, 900);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked]);

  const flip = (uid: number) => {
    if (!running) setRunning(true);
    if (picked.length === 2) return;
    const card = deck.find((c) => c.uid === uid);
    if (!card || card.flipped || card.matched) return;
    playFlip();
    setGame((g) => ({
      ...g,
      deck: g.deck.map((c) => (c.uid === uid ? { ...c, flipped: true } : c)),
    }));
    setPicked((p) => [...p, uid]);
  };

  const reset = (newLevel?: Level) => {
    playClick();
    const lvl = newLevel ?? level;
    setLevel(lvl);
    setGame(buildDeck(lvl));
    setPicked([]);
    setMoves(0);
    setSeconds(0);
    setRunning(false);
    setLastMatch(null);
    setShowWin(false);
    winTriggered.current = false;
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="w-full">
      {/* LEVEL SELECTOR */}
      <div className="mb-8">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-foam/50">Pilih Level</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {(Object.keys(LEVEL_CONFIG) as Level[]).map((l) => {
            const active = level === l;
            return (
              <button
                key={l}
                onClick={() => reset(l)}
                className={`group relative overflow-hidden rounded-lg border p-4 text-left transition-all ${
                  active
                    ? "border-coral bg-coral/10 shadow-coral"
                    : "border-foam/15 bg-card hover:border-turquoise/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-display text-2xl ${active ? "text-coral" : "text-foam"}`}
                  >
                    {LEVEL_CONFIG[l].label}
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-foam/50">
                    {LEVEL_CONFIG[l].pairs}×2
                  </span>
                </div>
                <p className="mt-1 text-xs text-foam/60">{LEVEL_CONFIG[l].desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* HUD */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="glass-light flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-foam/80">
            <Timer className="h-3.5 w-3.5 text-turquoise" />
            {mm}:{ss}
          </div>
          <div className="glass-light flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-foam/80">
            <Sparkles className="h-3.5 w-3.5 text-coral" />
            {moves} moves
          </div>
          <div className="glass-light flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-foam/80">
            <Trophy className="h-3.5 w-3.5 text-sand" />
            {deck.filter((c) => c.matched).length / 2}/{pool.length}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="glass-light flex items-center justify-center rounded-full p-2.5 text-foam/70 hover:text-coral transition-colors"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => reset()}
            className="group inline-flex items-center gap-2 rounded-full border border-coral/40 bg-coral/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-coral hover:bg-coral hover:text-primary-foreground transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5 transition-transform group-hover:-rotate-180 duration-500" />
            Restart
          </button>
        </div>
      </div>

      {/* Last match toast */}
      <div className="mb-6 min-h-[3.5rem]">
        {lastMatch && (
          <div
            key={lastMatch.id}
            className="glass-light animate-scale-in inline-flex items-center gap-3 rounded-full px-5 py-3"
          >
            <span className="text-2xl">{lastMatch.emoji}</span>
            <span className="text-sm">
              <span className="font-display text-lg italic text-sand">{lastMatch.name}</span>
              <span className="ml-3 text-foam/70 hidden sm:inline">{lastMatch.fact}</span>
            </span>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className={`grid gap-3 sm:gap-4 ${LEVEL_CONFIG[level].cols}`}>
        {deck.map((card) => {
          const showFace = card.flipped || card.matched;
          return (
            <button
              key={card.uid}
              onClick={() => flip(card.uid)}
              disabled={card.matched}
              className="group relative aspect-[3/4] w-full"
              style={{ perspective: "1000px" }}
              aria-label={showFace ? card.creature.name : "Hidden card"}
            >
              <div
                className="relative h-full w-full transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: showFace ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Back */}
                <div
                  className="absolute inset-0 rounded-xl border border-turquoise/30 bg-gradient-lagoon shadow-glow flex items-center justify-center overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-deep-sea/40 to-abyss/60" />
                  <span className="relative font-display text-5xl text-foam/40 italic">D</span>
                  <span className="absolute bottom-2 text-[0.55rem] uppercase tracking-[0.3em] text-foam/40">
                    Derawan
                  </span>
                </div>
                {/* Face */}
                <div
                  className={`absolute inset-0 overflow-hidden rounded-xl border transition-colors ${
                    card.matched ? "border-coral/70 shadow-coral" : "border-foam/20"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <img
                    src={card.creature.image}
                    alt={card.creature.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    width={768}
                    height={768}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2 text-center">
                    <span className="text-[0.6rem] sm:text-xs uppercase tracking-[0.15em] text-foam">
                      {card.creature.name}
                    </span>
                  </div>
                  {card.matched && (
                    <div className="absolute right-2 top-2 rounded-full bg-coral/90 px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.2em] text-primary-foreground">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* WIN MODAL */}
      {showWin && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-abyss/85 backdrop-blur-md p-4 sm:p-8 animate-fade-in"
          onClick={() => setShowWin(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl border border-foam/15 bg-gradient-deep shadow-deep my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowWin(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full bg-foam/10 p-2 text-foam/70 hover:bg-coral hover:text-primary-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="border-b border-foam/10 px-6 py-10 sm:px-12 sm:py-14 text-center">
              <div className="mb-4 text-5xl">🎉🐢🪸</div>
              <p className="text-xs uppercase tracking-[0.5em] text-turquoise">
                Misi Selesai · {LEVEL_CONFIG[level].label}
              </p>
              <h3 className="mt-4 font-display text-3xl sm:text-5xl text-foam leading-tight">
                Hebat! Kamu menyelamatkan
                <span className="block italic text-gradient-sunset">semua biota laut Derawan.</span>
              </h3>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-foam/70">
                <span>
                  <span className="font-display text-2xl text-coral">{moves}</span> moves
                </span>
                <span className="text-foam/30">·</span>
                <span>
                  <span className="font-display text-2xl text-turquoise">
                    {mm}:{ss}
                  </span>{" "}
                  waktu
                </span>
                <span className="text-foam/30">·</span>
                <span>
                  <span className="font-display text-2xl text-sand">{pool.length}</span> spesies
                </span>
              </div>
            </div>

            {/* Gallery */}
            <div className="px-6 py-10 sm:px-12">
              <p className="mb-6 text-xs uppercase tracking-[0.4em] text-coral">
                Kenalan Lebih Dekat
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pool.map((c) => (
                  <article
                    key={c.id}
                    className="group overflow-hidden rounded-xl border border-foam/10 bg-card transition-colors hover:border-turquoise/40"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        width={768}
                        height={768}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-abyss/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="font-display text-2xl text-foam leading-tight">{c.name}</h4>
                        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-turquoise italic">
                          {c.latin}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-foam/80 leading-relaxed">
                        <span className="text-coral mr-1">★</span> {c.fact}
                      </p>
                      <p className="mt-3 text-[0.65rem] uppercase tracking-[0.25em] text-foam/50">
                        Habitat · {c.habitat}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="border-t border-foam/10 px-6 py-10 sm:px-12 sm:py-12 text-center bg-gradient-to-b from-transparent to-coral/5">
              <p className="text-xs uppercase tracking-[0.4em] text-coral mb-4">Saatnya Beraksi</p>
              <h4 className="font-display text-2xl sm:text-4xl text-foam max-w-2xl mx-auto leading-tight">
                Biota laut ini nyata. Mereka butuh{" "}
                <span className="italic text-gradient-sunset">kita</span> untuk tetap ada.
              </h4>
              <p className="mt-4 text-sm sm:text-base text-foam/70 max-w-xl mx-auto">
                Pelajari lebih lanjut tentang ekosistem Derawan & cara kamu bisa ikut menjaga
                rumah mereka.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/nature"
                  onClick={() => setShowWin(false)}
                  className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-xs uppercase tracking-[0.3em] text-primary-foreground hover:bg-coral-glow transition-colors"
                >
                  Jelajahi Ekosistem
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/stories"
                  onClick={() => setShowWin(false)}
                  className="inline-flex items-center gap-2 rounded-full border border-foam/30 px-6 py-3 text-xs uppercase tracking-[0.3em] text-foam hover:border-turquoise hover:text-turquoise transition-colors"
                >
                  Tinggalkan Cerita
                </Link>
                <button
                  onClick={() => reset()}
                  className="inline-flex items-center gap-2 rounded-full border border-foam/20 px-6 py-3 text-xs uppercase tracking-[0.3em] text-foam/70 hover:text-coral hover:border-coral transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Main Lagi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
