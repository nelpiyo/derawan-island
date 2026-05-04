export type MapLayerKey =
  | "conservation"
  | "turtle"
  | "manta"
  | "coral"
  | "jellyfish"
  | "threat";

export type MapLocation = {
  id: string;
  name: string;
  /** SVG viewBox is 0 0 1000 700 — coords are in that space */
  x: number;
  y: number;
  layer: MapLayerKey;
  emoji: string;
  description_id: string;
  description_en: string;
};

/** Illustrative outlines for the four key islands within the 1000x700 viewBox */
export const ISLAND_SHAPES = [
  {
    id: "derawan",
    label: "Pulau Derawan",
    /** organic blob, hand-drawn feel */
    d: "M310,360 Q300,330 330,315 Q370,300 405,320 Q435,338 432,372 Q428,402 395,418 Q360,432 330,420 Q302,408 310,360 Z",
    labelX: 370,
    labelY: 380,
  },
  {
    id: "maratua",
    label: "Maratua",
    d: "M620,170 Q665,150 720,165 Q775,182 800,225 Q815,265 790,305 Q760,340 715,335 Q680,330 670,295 Q655,260 640,235 Q615,205 620,170 Z",
    labelX: 720,
    labelY: 245,
  },
  {
    id: "kakaban",
    label: "Kakaban",
    d: "M555,395 Q585,380 615,395 Q635,415 625,445 Q608,470 575,470 Q548,468 540,440 Q535,415 555,395 Z",
    labelX: 580,
    labelY: 432,
  },
  {
    id: "sangalaki",
    label: "Sangalaki",
    d: "M460,520 Q485,510 510,520 Q525,535 518,555 Q505,572 482,572 Q462,570 455,552 Q450,535 460,520 Z",
    labelX: 484,
    labelY: 545,
  },
] as const;

/** Approximate conservation zone outline (illustrative envelope around the islands) */
export const CONSERVATION_PATH =
  "M220,220 Q420,160 720,140 Q860,180 880,330 Q890,470 760,560 Q580,640 400,620 Q230,600 180,460 Q160,330 220,220 Z";

export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: "derawan-village",
    name: "Pulau Derawan (Desa)",
    x: 372,
    y: 372,
    layer: "coral",
    emoji: "🪸",
    description_id: "Pusat ekowisata. Terumbu karang dangkal, dermaga utama, dan komunitas Bajau.",
    description_en: "Ecotourism hub. Shallow coral reefs, main pier, and Bajau community.",
  },
  {
    id: "derawan-turtle",
    name: "Pantai Bertelur Derawan",
    x: 348,
    y: 408,
    layer: "turtle",
    emoji: "🐢",
    description_id: "Salah satu lokasi penyu hijau bertelur sepanjang tahun.",
    description_en: "Year-round nesting site for the green sea turtle.",
  },
  {
    id: "sangalaki-turtle",
    name: "Sangalaki — Sanctuary Penyu",
    x: 484,
    y: 540,
    layer: "turtle",
    emoji: "🐢",
    description_id: "Pulau peneluran penyu hijau terpenting di Indonesia bagian timur.",
    description_en: "One of Indonesia's most important green turtle nesting islands.",
  },
  {
    id: "sangalaki-manta",
    name: "Sangalaki — Manta Point",
    x: 520,
    y: 568,
    layer: "manta",
    emoji: "🐟",
    description_id: "Habitat pari manta sepanjang tahun, terutama saat musim plankton.",
    description_en: "Year-round manta ray habitat, peaking during plankton season.",
  },
  {
    id: "kakaban-jellyfish",
    name: "Danau Kakaban",
    x: 580,
    y: 432,
    layer: "jellyfish",
    emoji: "🪼",
    description_id: "Salah satu dari hanya dua danau ubur-ubur tanpa sengat di dunia.",
    description_en: "One of only two stingless jellyfish lakes in the world.",
  },
  {
    id: "maratua-manta",
    name: "Selat Maratua",
    x: 660,
    y: 280,
    layer: "manta",
    emoji: "🐟",
    description_id: "Jalur migrasi pari manta dan hiu karang di kedalaman selat.",
    description_en: "Migration corridor for manta rays and reef sharks.",
  },
  {
    id: "maratua-coral",
    name: "Maratua Reef Wall",
    x: 760,
    y: 250,
    layer: "coral",
    emoji: "🪸",
    description_id: "Tebing karang vertikal yang ikonik untuk diving.",
    description_en: "Iconic vertical reef wall, world-class for diving.",
  },
  {
    id: "threat-tanjungbatu",
    name: "Akumulasi Sampah · Tanjung Batu",
    x: 180,
    y: 320,
    layer: "threat",
    emoji: "⚠️",
    description_id: "Titik masuk sampah daratan ke perairan Derawan via arus.",
    description_en: "Entry point for land-based waste into Derawan waters via currents.",
  },
  {
    id: "threat-derawan-coast",
    name: "Tekanan Pesisir · Derawan",
    x: 405,
    y: 345,
    layer: "threat",
    emoji: "⚠️",
    description_id: "Tekanan turis & sampah plastik di sekitar dermaga utama.",
    description_en: "Tourist & plastic waste pressure around the main pier.",
  },
];
