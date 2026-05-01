// Lightweight Web Audio API sound effects — no asset files needed.
let ctx: AudioContext | null = null;
let muted = false;

const getCtx = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

export const setMuted = (m: boolean) => {
  muted = m;
};
export const isMuted = () => muted;

const tone = (freq: number, duration: number, type: OscillatorType = "sine", gain = 0.15, delay = 0) => {
  const ac = getCtx();
  if (!ac || muted) return;
  const start = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(g).connect(ac.destination);
  osc.start(start);
  osc.stop(start + duration + 0.05);
};

export const playFlip = () => tone(420, 0.08, "triangle", 0.08);
export const playMatch = () => {
  tone(660, 0.12, "sine", 0.12);
  tone(880, 0.16, "sine", 0.12, 0.08);
  tone(1320, 0.2, "sine", 0.1, 0.16);
};
export const playMiss = () => tone(180, 0.18, "sawtooth", 0.06);
export const playWin = () => {
  const notes = [523, 659, 784, 1047, 1319];
  notes.forEach((n, i) => tone(n, 0.25, "triangle", 0.12, i * 0.12));
};
export const playClick = () => tone(520, 0.05, "square", 0.06);
