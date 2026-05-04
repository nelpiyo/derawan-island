export type PartnerKind = "strategic" | "supporter";

export type Partner = {
  id: string;
  name: string;
  role_id: string;
  role_en: string;
  kind: PartnerKind;
  /** Short letters for the logo placeholder (e.g. KKP, BKSDA) */
  initials: string;
};

export const PARTNERS: Partner[] = [
  {
    id: "kkp",
    name: "Kementerian Kelautan & Perikanan",
    role_id: "Pengelola kawasan konservasi laut nasional",
    role_en: "National marine conservation authority",
    kind: "strategic",
    initials: "KKP",
  },
  {
    id: "bksda-kaltim",
    name: "BKSDA Kalimantan Timur",
    role_id: "Konservasi sumber daya alam wilayah Kaltim",
    role_en: "Natural resources conservation, East Kalimantan",
    kind: "strategic",
    initials: "BKSDA",
  },
  {
    id: "pemkab-berau",
    name: "Pemerintah Kabupaten Berau",
    role_id: "Tata kelola wilayah & kebijakan pesisir",
    role_en: "Regional governance & coastal policy",
    kind: "strategic",
    initials: "BRU",
  },
  {
    id: "bajau",
    name: "Komunitas Suku Bajau",
    role_id: "Pemilik pengetahuan maritim & penjaga laut",
    role_en: "Holders of maritime knowledge & sea guardians",
    kind: "strategic",
    initials: "BAJAU",
  },
  {
    id: "unmul",
    name: "Universitas Mulawarman",
    role_id: "Riset kelautan & pendampingan akademis",
    role_en: "Marine research & academic support",
    kind: "supporter",
    initials: "UNMUL",
  },
  {
    id: "ykan",
    name: "Yayasan Konservasi Alam Nusantara",
    role_id: "Mitra konservasi nasional (calon kemitraan)",
    role_en: "National conservation partner (prospective)",
    kind: "supporter",
    initials: "YKAN",
  },
  {
    id: "wwf",
    name: "WWF Indonesia",
    role_id: "Advokasi & program konservasi laut (calon mitra)",
    role_en: "Marine advocacy & conservation programs (prospective)",
    kind: "supporter",
    initials: "WWF",
  },
  {
    id: "gc",
    name: "Global Conservation",
    role_id: "Calon mitra internasional untuk perlindungan kawasan",
    role_en: "Prospective international partner for area protection",
    kind: "supporter",
    initials: "GC",
  },
];
