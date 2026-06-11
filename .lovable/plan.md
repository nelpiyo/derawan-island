## Goal

Gabungkan dua section kosong di akhir halaman `/stories` ("Mengapa cerita ini penting" + "Act today, not tomorrow") menjadi **satu section** yang menampilkan angka dampak nyata dan 2 tombol aksi konkret.

## Struktur baru section

```text
┌─────────────────────────────────────────────────────┐
│  · MENGAPA CERITA INI PENTING                       │
│                                                     │
│  Setiap cerita adalah bukti                         │
│  Derawan masih bisa diselamatkan.                   │
│                                                     │
│   ┌──────┐   ┌────────┐   ┌────────┐   ┌────────┐  │
│   │ 507  │   │ 46.105 │   │   9    │   │  N+    │  │
│   │spesi │   │  kg    │   │spesies │   │ cerita │  │
│   │karang│   │sampah  │   │ lamun  │   │terkump.│  │
│   └──────┘   └────────┘   └────────┘   └────────┘  │
│                                                     │
│  Quote pendek (1 baris, italic)                     │
│                                                     │
│   [ Bagikan Ceritamu ]  [ Lihat Ekosistem → ]      │
└─────────────────────────────────────────────────────┘
```

## Konten

- **Eyebrow**: "· Mengapa cerita ini penting"
- **Headline**: "Setiap cerita adalah bukti" + italic "Derawan masih bisa diselamatkan."
- **Sub**: "Setiap penyu yang kembali bertelur, setiap terumbu yang bertahan, dan setiap sampah yang dicegah masuk ke laut — semuanya berawal dari kepedulian seperti milikmu."
- **4 kartu angka** (glassmorphism, sejalan dengan redesign Guestbook):
  1. `507` — spesies karang
  2. `46.105 kg` — sampah terangkat (2024)
  3. `9` — spesies lamun
  4. `{items.length}+` — cerita pengunjung terkumpul (live dari Supabase)
- **Quote kecil**: "Surga ini tidak hilang sekaligus, tapi sedikit demi sedikit." (selaras dgn manifesto)
- **2 tombol aksi**:
  - Primary (gradient turquoise→deep-sea): **Bagikan Ceritamu** → smooth-scroll ke `#guestbook-form`
  - Secondary (outline foam): **Lihat Ekosistem & Ancaman →** → `Link to="/nature"`

## Perubahan teknis

- `src/pages/Stories.tsx`: hapus 2 section lama (`stories.bridge.*` + `stories.cta.*`), ganti dengan 1 section baru. Ambil jumlah cerita dengan `supabase.from("experiences").select("*", { count: "exact", head: true })` di `useEffect`, fallback "100+" kalau gagal.
- `src/i18n/dictionaries/id.ts` & `en.ts`: ganti key lama `stories.bridge.*` / `stories.cta.*` jadi key baru `stories.impact.*` (eyebrow, title.a, title.b, body, stat labels, quote, cta.primary, cta.secondary).
- Visual: konsisten dengan glassmorphism Guestbook — `rounded-2xl border border-foam/15 bg-foam/[0.04] backdrop-blur-xl`, angka pakai `font-display` besar warna `text-turquoise`.
- Tidak ada perubahan DB / schema.

## Hasil

Section akhir Stories berhenti menjadi quote menggantung, dan jadi titik berangkat ke aksi nyata (bagikan cerita atau pelajari ekosistem).