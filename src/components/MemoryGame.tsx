import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Trophy, Timer, Sparkles } from "lucide-react";

type Creature = {
  id: string;
  emoji: string;
  name: string;
  fact: string;
};

const CREATURES: Creature[] = [
  { id: "turtle", emoji: "🐢", name: "Penyu Hijau", fact: "Bertelur di pasir Pulau Sangalaki!" },
  { id: "manta", emoji: "🐟", name: "Pari Manta", fact: "Bisa selebar 7 meter, lho!" },
  { id: "jellyfish", emoji: "🪼", name: "Ubur-ubur", fact: "Di Danau Kakaban, mereka tak menyengat." },
  { id: "clownfish", emoji: "🐠", name: "Ikan Badut", fact: "Tinggal di rumah anemon laut." },
  { id: "dolphin", emoji: "🐬", name: "Lumba-lumba", fact: "Sering berenang di sekitar Derawan." },
  { id: "octopus", emoji: "🐙", name: "Gurita", fact: "Punya 9 otak — satu di tiap lengan!" },
  { id: "shark", emoji: "🦈", name: "Hiu Karang", fact: "Penjaga terumbu yang ramah." },
  { id: "shell", emoji: "🐚", name: "Kerang", fact: "Rumah mungil dari laut dalam." },
];

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

const buildDeck = (): CardState[] =>
  shuffle(
    CREATURES.flatMap((c, i) => [
      { uid: i * 2, creature: c, flipped: false, matched: false },
      { uid: i * 2 + 1, creature: c, flipped: false, matched: false },
    ]),
  );

const MemoryGame = () => {
  const [deck, setDeck] = useState<CardState[]>(() => buildDeck());
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [lastMatch, setLastMatch] = useState<Creature | null>(null);

  const allMatched = useMemo(() => deck.every((c) => c.matched), [deck]);

  useEffect(() => {
    if (!running || allMatched) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running, allMatched]);

  useEffect(() => {
    if (picked.length !== 2) return;
    const [a, b] = picked;
    const cardA = deck.find((c) => c.uid === a)!;
    const cardB = deck.find((c) => c.uid === b)!;
    setMoves((m) => m + 1);

    if (cardA.creature.id === cardB.creature.id) {
      setLastMatch(cardA.creature);
      setTimeout(() => {
        setDeck((d) => d.map((c) => (c.uid === a || c.uid === b ? { ...c, matched: true } : c)));
        setPicked([]);
      }, 600);
    } else {
      setTimeout(() => {
        setDeck((d) => d.map((c) => (c.uid === a || c.uid === b ? { ...c, flipped: false } : c)));
        setPicked([]);
      }, 900);
    }
  }, [picked, deck]);

  const flip = (uid: number) => {
    if (!running) setRunning(true);
    if (picked.length === 2) return;
    const card = deck.find((c) => c.uid === uid);
    if (!card || card.flipped || card.matched) return;
    setDeck((d) => d.map((c) => (c.uid === uid ? { ...c, flipped: true } : c)));
    setPicked((p) => [...p, uid]);
  };

  const reset = () => {
    setDeck(buildDeck());
    setPicked([]);
    setMoves(0);
    setSeconds(0);
    setRunning(false);
    setLastMatch(null);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="w-full">
      {/* HUD */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
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
            {deck.filter((c) => c.matched).length / 2}/{CREATURES.length}
          </div>
        </div>
        <button
          onClick={reset}
          className="group inline-flex items-center gap-2 rounded-full border border-coral/40 bg-coral/10 px-5 py-2.5 text-xs uppercase tracking-[0.3em] text-coral hover:bg-coral hover:text-primary-foreground transition-all"
        >
          <RotateCcw className="h-3.5 w-3.5 transition-transform group-hover:-rotate-180 duration-500" />
          Restart
        </button>
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
              <span className="ml-3 text-foam/70">{lastMatch.fact}</span>
            </span>
          </div>
        )}
      </div>

      {/* Win banner */}
      {allMatched && (
        <div className="mb-8 animate-fade-in rounded-lg border border-coral/40 bg-gradient-sunset/10 p-8 text-center">
          <div className="text-5xl mb-3">🎉🐢🪸</div>
          <h3 className="font-display text-3xl md:text-4xl text-foam">
            Hebat! Kamu menyelamatkan semua biota laut Derawan!
          </h3>
          <p className="mt-3 text-foam/75">
            Selesai dalam <span className="text-coral">{moves} moves</span> &{" "}
            <span className="text-turquoise">{mm}:{ss}</span>.
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-full bg-coral px-8 py-3 text-xs uppercase tracking-[0.3em] text-primary-foreground hover:bg-coral-glow transition-colors"
          >
            Main Lagi
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-8">
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
                  className={`absolute inset-0 rounded-xl border flex flex-col items-center justify-center gap-2 p-2 transition-colors ${
                    card.matched
                      ? "border-coral/60 bg-coral/15 shadow-coral"
                      : "border-foam/20 bg-card"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <span className={`text-4xl sm:text-5xl ${card.matched ? "animate-drift" : ""}`}>
                    {card.creature.emoji}
                  </span>
                  <span className="text-[0.6rem] sm:text-xs uppercase tracking-[0.15em] text-foam/80 text-center leading-tight">
                    {card.creature.name}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
