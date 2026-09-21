# 🚀 DriveDirect — Google Drive Direct Link Generator & Stream Downloader

Aplikasi web modern, interaktif, dan berkecepatan tinggi untuk mengonversi tautan publik Google Drive menjadi **direct download link 1-klik**, mengekstrak metadata file secara instan, serta memutar media (video, audio, gambar, dan dokumen PDF) langsung di dalam peramban tanpa terhalang pratinjau atau pembatasan CORS.

Dibangun menggunakan **Next.js 16 (App Router)**, **TypeScript**, dan **Tailwind CSS v4**.

---

## ✨ Fitur Utama

- **⚡ Direct CDN Storage Links**:
  - Mengonversi format URL Google Drive umum (`/file/d/ID/view`, `?id=ID`, `open?id=ID`, dll.) ke tautan unduhan langsung resmi Google CDN (`drive.usercontent.google.com`).
- **🔍 Metadata Inspector (Bebas Masalah CORS)**:
  - Mengambil nama file asli dari header `Content-Disposition`, ukuran file (`Content-Length` dalam MB/GB), serta MIME type secara *server-side* menggunakan Node.js Route Handler.
- **🛡️ Auto Virus Scan Bypass**:
  - Mendeteksi file berukuran besar (> 100 MB) yang memicu peringatan virus Google Drive dan otomatis mengekstrak token konfirmasi (`confirm=t` & `uuid`).
- **🎬 In-App Video & Audio Streaming**:
  - Didukung endpoint proxy streaming dengan **HTTP Range Requests (`206 Partial Content`)**, memungkinkan fitur *seek/scrubbing* timeline video dan audio HTML5 secara lancar.
- **📄 Dual-Mode PDF & Document Viewer**:
  - **Native PDF Mode (Default)**: Didukung engine Mozilla PDF.js yang merender dokumen PDF langsung ke elemen HTML5 `<canvas>` (bebas dari pemblokiran sandbox plugin browser Chrome/Edge, dilengkapi kontrol Halaman, Zoom, dan Rotasi).
  - **Google Viewer Mode**: Pratinjau interaktif resmi Google Docs Viewer lengkap dengan tombol alih cepat.
- **🖼️ Image Preview with HD Fallback**:
  - Pratinjau gambar JPG, PNG, WEBP, GIF, SVG, dan BMP dengan fallback otomatis ke thumbnail Google Drive beresolusi tinggi.
- **💻 CLI & IDM Command Generator**:
  - Menghasilkan perintah siap salin untuk terminal yang sudah disanitasi dari karakter berbahaya:
    - `cURL` (`curl -L -o "filename" "URL"`)
    - `Wget` (`wget --content-disposition -O "filename" "URL"`)
    - `Aria2 / IDM` (`aria2c -x 16 -s 16 -o "filename" "URL"`)
- **🌐 Siap Terindeks Google (SEO-Ready)**:
  - Dilengkapi peta situs dinamis (`sitemap.xml`), aturan bot (`robots.txt`), dynamic favicon (`icon.png`), Apple Touch Icon (`apple-icon.png`), OpenGraph Social Card (`opengraph-image.png`), serta data terstruktur JSON-LD `WebApplication`.
- **🎨 Desain Futuristik (Glassmorphism Dark Mode)**:
  - Tampilan elegan dengan Tailwind CSS v4, efek *backdrop-blur*, *radial glowing mesh*, dan animasi responsif.
- **🕒 Riwayat Konversi (Local Storage)**:
  - Menyimpan riwayat tautan yang pernah diproses secara lokal pada browser pengguna agar mudah diakses kembali kapan saja.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library UI**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Engine**: [Mozilla PDF.js](https://mozilla.github.io/pdf.js/)
- **Social & Dynamic Assets**: Next.js `ImageResponse` (`next/og`)

---

## 🚀 Memulai (Getting Started)

### Prasyarat
- [Node.js](https://nodejs.org/) v18.17 atau yang lebih baru (Disarankan v20+ atau v24+).
- npm, pnpm, atau yarn.

### Instalasi Dependensi
```bash
npm install
```

### Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka peramban dan akses: **[http://localhost:3000](http://localhost:3000)**

### Membangun Versi Produksi (Production Build)
```bash
npm run build
npm run start
```

---

## 🔍 Optimasi SEO & Indeks Google (SEO Architecture)

Aplikasi ini sudah diprogram secara *native* agar ramah perayap (*crawlers*) Google Search:

| Endpoint / Aset | Fungsi | Keterangan |
| :--- | :--- | :--- |
| **`/sitemap.xml`** | Peta situs XML dinamis | Membantu Google mengindeks seluruh halaman secara berkala |
| **`/robots.txt`** | Aturan perayap mesin pencari | Mengizinkan Googlebot mengindeks halaman utama dan melarang perayapan endpoint API privat |
| **`/icon`** | Favicon dinamis 32x32 | Tampil di tab browser & hasil pencarian mobile Google |
| **`/apple-icon`** | Ikon Apple Touch 180x180 | Ikon beresolusi tinggi saat disimpan ke layar utama ponsel |
| **`/opengraph-image`** | Gambar pratinjau sosial 1200x630 | Kartu visual saat link dibagikan di WhatsApp, Twitter/X, Telegram, LinkedIn, & Facebook |
| **JSON-LD Schema** | Skema `WebApplication` | Memberikan *rich snippets* di halaman hasil pencarian Google |

### 💡 Cara Mendaftarkan ke Google Search Console:
1. Deploy proyek ke Vercel (misal: `https://drive-direct.vercel.app`).
2. Masuk ke [Google Search Console](https://search.google.com/search-console).
3. Tambahkan properti URL Prefix (`https://drive-direct.vercel.app`).
4. Buka menu **Sitemaps** di panel kiri, lalu masukkan: `sitemap.xml` dan klik **Submit**.
5. Buka **URL Inspection**, masukkan URL utama situs Anda, lalu klik **"Request Indexing"** agar segera dirayapi oleh Google.

---

## 📡 Dokumentasi Endpoint API

### 1. `POST /api/drive/inspect`
Memeriksa file Google Drive dan mengembalikan metadata lengkap.

**Request Body:**
```json
{
  "url": "https://drive.google.com/file/d/1oBDNLQeBxpaEpeZ2aKGhskKzLpBeGtRo/view?usp=sharing"
}
```

**Contoh Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "fileId": "1oBDNLQeBxpaEpeZ2aKGhskKzLpBeGtRo",
    "fileName": "360p_GP_09_[Animebatch.id].mp4",
    "fileSizeBytes": 49845172,
    "fileSizeFormatted": "47.54 MB",
    "contentType": "video/mp4",
    "directUrl": "https://drive.usercontent.google.com/download?id=1oBDNLQeBxpaEpeZ2aKGhskKzLpBeGtRo&export=download",
    "streamUrl": "/api/drive/stream?id=1oBDNLQeBxpaEpeZ2aKGhskKzLpBeGtRo",
    "downloadUrl": "/api/drive/stream?id=1oBDNLQeBxpaEpeZ2aKGhskKzLpBeGtRo&download=true",
    "mediaType": "video",
    "canPreview": true,
    "isConfirmRequired": false,
    "status": "ok"
  }
}
```

### 2. `GET /api/drive/stream?id={FILE_ID}&confirm={TOKEN}&inline=true`
Menyajikan streaming file secara aman dengan dukungan Range request untuk pemutar media dan viewer dokumen.

---

## 🚀 Deploy ke Vercel

Aplikasi ini 100% siap langsung dideploy ke [Vercel](https://vercel.com):

1. Hubungkan akun GitHub Anda di Vercel.
2. Klik **Add New Project** dan pilih repositori `rohimat12/drive-direct`.
3. Biarkan framework preset **Next.js**.
4. (Opsional) Tambahkan Environment Variable:
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.vercel.app` (untuk sitemap & canonical domain Anda).
5. Klik **Deploy**!
