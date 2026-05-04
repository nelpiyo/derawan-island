# Rencana: Memperkuat Website untuk Presentasi ke Global Conservation

Tujuan: membuat website siap dipresentasikan ke organisasi konservasi internasional dengan menambah 3 fitur prioritas yang kamu pilih.

---

## 1. Toggle Bahasa Indonesia ↔ English

**Apa yang dibangun**
- Tombol kecil **ID / EN** di pojok kanan navigasi (di samping menu).
- Pilihan bahasa disimpan di browser (localStorage) — tidak hilang saat refresh.
- Menerjemahkan teks utama: navigasi, hero homepage, manifesto, judul tiap halaman (Nature, Culture, Stories, Play), label tombol, footer, dan call-to-action.
- Konten panjang (cerita visitor, komentar) tetap dalam bahasa aslinya — wajar karena itu user-generated.

**Catatan**
- Pakai pendekatan ringan (custom React context + dictionary `id.ts` & `en.ts`), tanpa library berat seperti i18next supaya cepat dan tetap rapi.
- Default tetap Bahasa Indonesia. Saat user dari luar negeri (browser locale `en-*`) buka pertama kali → otomatis EN.

---

## 2. Interactive Map Kepulauan Derawan

**Apa yang dibangun**
Halaman baru `/map` (juga di-embed sebagai section di halaman Nature) dengan peta interaktif Kepulauan Derawan: Pulau Derawan, Maratua, Kakaban, Sangalaki.

**Layer yang bisa di-toggle on/off**
- 🟢 Zona konservasi (KKP3K 285.548 ha)
- 🐢 Lokasi penyu bertelur (Sangalaki, Derawan)
- 🪼 Danau ubur-ubur Kakaban
- 🐟 Spot pari manta (Sangalaki, selat Maratua)
- 🪸 Hotspot terumbu karang
- ⚠️ Titik ancaman (akumulasi sampah, area eksploitasi) — pakai data ilustrasi/perkiraan dari riset publik

**Interaksi**
- Klik pin → popup berisi nama lokasi, deskripsi singkat, foto thumbnail, dan link ke section terkait.
- Legend di sisi kanan dengan checkbox per layer.
- Mobile: legend jadi drawer dari bawah.

**Layout peta**
```text
┌────────────────────────────────────────┐
│   [Peta Kepulauan Derawan]   │ Legend │
│   • pin penyu                │ ☑ Penyu│
│   • pin manta                │ ☑ Manta│
│   • pin karang               │ ☑ Karang│
│   • pin ancaman              │ ☑ Ancaman│
│                              │ ☑ Konservasi│
└────────────────────────────────────────┘
```

---

## 3. Halaman "Partners & Get Involved"

**Apa yang dibangun**
Halaman baru `/partners` dengan 3 section:

**A. Partners & Stakeholders**
- Grid logo/kartu mitra: KKP, BKSDA Kalimantan Timur, Pemkab Berau, komunitas Suku Bajau, akademisi (Unmul, dll), LSM seperti WWF/YKAN.
- Karena ini untuk presentasi GC dan kemungkinan belum semua mitra resmi, kartu akan ditandai sebagai "Mitra strategis" vs "Calon mitra & pendukung" supaya jujur tapi tetap kuat.

**B. Get Involved — 4 jalur kontribusi**
- 🤝 **Partner with us** — untuk organisasi konservasi seperti GC (form kontak / email).
- 💚 **Donate** — placeholder dengan tombol "Coming soon" + form notifikasi.
- 🐢 **Adopt a Turtle** — program simbolik adopsi penyu (placeholder).
- 🙋 **Volunteer & Research** — untuk peneliti, mahasiswa, sukarelawan.

**C. Contact Section**
- Email kontak proyek + form pesan singkat (nama, email, pesan, kategori: Partnership / Donation / Volunteer / Press).
- Pesan masuk disimpan ke database supaya bisa diakses kapan pun.

---

## Detail Teknis

**File baru**
- `src/i18n/index.tsx` — context + hook `useT()`
- `src/i18n/dictionaries/id.ts`, `src/i18n/dictionaries/en.ts`
- `src/components/LanguageToggle.tsx`
- `src/pages/MapPage.tsx`
- `src/components/DerawanMap.tsx` (peta SVG kustom — ringan, tidak butuh API key seperti Mapbox)
- `src/data/mapLocations.ts`
- `src/pages/Partners.tsx`
- `src/data/partners.ts`
- `src/components/ContactForm.tsx`

**File yang diedit**
- `src/App.tsx` — wrap dengan `I18nProvider`, tambah route `/map` dan `/partners`
- `src/components/Navigation.tsx` — tambah link Map & Partners + LanguageToggle, semua label pakai `useT()`
- `src/pages/Index.tsx`, `Nature.tsx`, `Culture.tsx`, `Stories.tsx`, `Play.tsx` — string utama pakai `useT()`
- `src/components/SiteFooter.tsx`, `RoadToDerawan.tsx`, `VisitorCounter.tsx` — pakai `useT()`

**Backend (Lovable Cloud)**
- Tabel `contact_messages` (id, name, email, category, message, created_at) — RLS: siapa pun boleh INSERT, hanya admin boleh SELECT.

**Pendekatan peta**
- SVG illustratif kustom (bukan tile map) — lebih cepat load, tidak butuh API key, dan lebih cocok dengan estetika editorial website.
- Background: ilustrasi laut + outline 4 pulau utama.

---

## Hal yang TIDAK dilakukan dalam plan ini
- Press Kit / download center (kamu pilih nanti saja).
- Halaman About / Tim (kamu skip).
- Dashboard ancaman dengan grafik tren (di-cover ringan oleh layer ancaman di peta).

Setelah kamu setuju, saya akan langsung implementasikan semuanya.