Handover Plan Document untuk Presentasi ke Global Conservation

Saya akan membuat dokumen handover plan profesional (format DOCX) yang mencakup empat pilar utama sesuai permintaan. Dokumen ini dirancang untuk dipresentasikan langsung ke calon mitra utama (Global Conservation) besok.

---- STRUKTUR DOKUMEN ----

1. COVER & EXECUTIVE SUMMARY
   - Judul: "Handover Plan — Website Derawan Island"
   - Tanggal, versi, dan kontak
   - Ringkasan eksekutif 1 paragraf tentang status website

2. WEBSITE YANG SUDAH JADI (Current Deliverables)
   - Daftar lengkap 10 halaman/route yang aktif:
     • Home (Hero + Manifesto + Directory Nature/Culture/Stories)
     • Nature (Ekosistem, statistik, penjaga konservasi)
     • Culture (Warisan Bajau, ekonomi berkelanjutan)
     • Stories (Guestbook pengunjung, Tips berkunjung, Impact metrics)
     • Play (Memory Match game + storytelling laut)
     • Explore (Panduan lokal: restoran, resort, klinik, posyandu)
     • Visitors (Stats & counter)
     • Auth (/auth — hidden login)
     • Admin (/admin — moderasi komentar)
     • Reset Password
   - Dual-language: Indonesia & Inggris (switcher di navbar)
   - Responsive: laptop, tablet, mobile
   - Tech stack: React + Vite + Tailwind + TypeScript + Supabase backend

3. HANDOVER & SERAH TERIMA AKSES
   - Lovable Project: link project, cara invite member GC
   - Published URL: https://derawan-island.lovable.app
   - Preview URL: cara akses preview
   - Supabase Backend: database + auth + storage
   - Aset folder: lokasi gambar/video di src/assets
   - Link video YouTube: https://youtu.be/s23KoRdDjb8
   - Link eksternal Derawan Heroes: https://derawan-island-adventure-pi.vercel.app/
   - Domain & publish settings

4. DOKUMENTASI PANDUAN PENGELOLAAN
   a. Fitur Website (deskripsi tiap fitur dari sisi user & admin)
   b. Cara Update Teks/Gambar:
      - Edit file di src/i18n/dictionaries/id.ts dan en.ts
      - Ganti gambar di src/assets/ (format webp/png/jpg)
      - Build otomatis, publish via Lovable
   c. Cara Update Data Explore:
      - File: src/pages/Explore.tsx
      - Struktur data Service array (id, category, name, desc, owner, phone, hours, price, menu, gallery)
      - Menambah/menghapus kartu layanan lokal
   d. Catatan Fitur Stories (Guestbook):
      - Pengunjung bisa submit foto + cerita (max 300 kata)
      - Real-time update via Supabase
      - Auto-delete token per submission (bisa hapus sendiri)
      - Admin moderation di /admin
   e. Sistem Admin:
      - Role-based access (user_roles table)
      - Login via /auth (hidden dari navbar publik)
      - Hapus komentar tidak pantas
      - Reset password via email

5. REKOMENDASI PENGEMBANGAN KE DEPAN
   - Short-term (1-3 bulan):
     • Tambah data layanan lokal di Explore
     • Integrasi booking/pesan langsung via WhatsApp
     • SEO optimization (blog, artikel konservasi)
   - Long-term (6-12 bulan):
     • CMS sederhana untuk update konten tanpa coding
     • Multi-bahasa tambahan (Mandarin, dll)
     • Analytics dashboard untuk pengunjung
     • Integrasi payment gateway untuk donasi konservasi

6. SUPPORT AWAL (1-2 Minggu)
   - Scope: revisi teks kecil, fix link/tombol error, penjelasan cara edit
   - Bukan scope: redesign besar, fitur baru kompleks, perubahan database struktur
   - Kontak & cara komunikasi
   - Estimasi response time

---- FORMAT OUTPUT ----
- File: DOCX profesional (Arial, heading hierarchy, spacing konsisten)
- Tabel untuk daftar fitur dan akses
- Bullet points untuk panduan step-by-step
- Total estimasi: 8-12 halaman
- Simpan ke: /mnt/documents/Handover_Plan_Derawan_Island.docx