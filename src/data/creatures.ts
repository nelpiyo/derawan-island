import turtle from "@/assets/creatures/turtle.jpg";
import manta from "@/assets/creatures/manta.jpg";
import jellyfish from "@/assets/creatures/jellyfish.jpg";
import clownfish from "@/assets/creatures/clownfish.jpg";
import dolphin from "@/assets/creatures/dolphin.jpg";
import octopus from "@/assets/creatures/octopus.jpg";
import shark from "@/assets/creatures/shark.jpg";
import shell from "@/assets/creatures/shell.jpg";
import seahorse from "@/assets/creatures/seahorse.jpg";
import starfish from "@/assets/creatures/starfish.jpg";
import coral from "@/assets/creatures/coral.jpg";
import dugong from "@/assets/creatures/dugong.jpg";

export type Creature = {
  id: string;
  emoji: string;
  name: string;
  latin: string;
  image: string;
  fact: string;
  habitat: string;
};

export const CREATURES: Creature[] = [
  {
    id: "turtle",
    emoji: "🐢",
    name: "Penyu Hijau",
    latin: "Chelonia mydas",
    image: turtle,
    fact: "Penyu betina kembali ke pantai tempat ia menetas untuk bertelur — bahkan setelah berkelana ribuan kilometer!",
    habitat: "Pantai pasir Sangalaki & perairan dangkal Derawan",
  },
  {
    id: "manta",
    emoji: "🐟",
    name: "Pari Manta",
    latin: "Mobula alfredi",
    image: manta,
    fact: "Lebar sayapnya bisa mencapai 7 meter, tapi mereka hanya makan plankton kecil!",
    habitat: "Selat Maratua & sekitar Sangalaki",
  },
  {
    id: "jellyfish",
    emoji: "🪼",
    name: "Ubur-ubur Tanpa Sengat",
    latin: "Mastigias papua",
    image: jellyfish,
    fact: "Di Danau Kakaban mereka kehilangan kemampuan menyengat karena tidak punya predator!",
    habitat: "Danau Kakaban (salah satu dari 2 di dunia)",
  },
  {
    id: "clownfish",
    emoji: "🐠",
    name: "Ikan Badut",
    latin: "Amphiprion ocellaris",
    image: clownfish,
    fact: "Mereka kebal terhadap sengatan anemon laut dan hidup berdua sebagai sahabat sejati.",
    habitat: "Terumbu karang dangkal Derawan",
  },
  {
    id: "dolphin",
    emoji: "🐬",
    name: "Lumba-lumba",
    latin: "Stenella longirostris",
    image: dolphin,
    fact: "Lumba-lumba spinner bisa berputar di udara hingga 7 kali dalam satu lompatan!",
    habitat: "Perairan terbuka sekitar Maratua",
  },
  {
    id: "octopus",
    emoji: "🐙",
    name: "Gurita",
    latin: "Octopus cyanea",
    image: octopus,
    fact: "Gurita punya 9 otak — satu pusat dan delapan kecil di tiap lengannya!",
    habitat: "Celah karang Derawan",
  },
  {
    id: "shark",
    emoji: "🦈",
    name: "Hiu Karang",
    latin: "Carcharhinus melanopterus",
    image: shark,
    fact: "Hiu karang sirip hitam adalah penjaga ekosistem — tanpa mereka, terumbu jadi tidak sehat.",
    habitat: "Tepian terumbu Derawan & Kakaban",
  },
  {
    id: "shell",
    emoji: "🐚",
    name: "Kerang Laut",
    latin: "Mollusca",
    image: shell,
    fact: "Kerang membentuk cangkangnya selapis demi selapis — seperti pohon yang tumbuh!",
    habitat: "Pasir pantai Derawan",
  },
  {
    id: "seahorse",
    emoji: "🐴",
    name: "Kuda Laut",
    latin: "Hippocampus",
    image: seahorse,
    fact: "Pada kuda laut, justru sang ayah yang mengandung dan melahirkan bayi-bayinya!",
    habitat: "Padang lamun & karang lunak",
  },
  {
    id: "starfish",
    emoji: "⭐",
    name: "Bintang Laut",
    latin: "Asteroidea",
    image: starfish,
    fact: "Bintang laut bisa menumbuhkan kembali lengannya yang putus. Super hero laut!",
    habitat: "Dasar pasir & terumbu dangkal",
  },
  {
    id: "coral",
    emoji: "🪸",
    name: "Terumbu Karang",
    latin: "Anthozoa",
    image: coral,
    fact: "Karang adalah hewan, bukan tanaman! Derawan punya lebih dari 444 spesies karang.",
    habitat: "Seluruh perairan Kepulauan Derawan",
  },
  {
    id: "dugong",
    emoji: "🦭",
    name: "Dugong",
    latin: "Dugong dugon",
    image: dugong,
    fact: "Dugong adalah 'sapi laut' yang merumput di padang lamun — kerabat jauh gajah!",
    habitat: "Padang lamun perairan dangkal",
  },
];
