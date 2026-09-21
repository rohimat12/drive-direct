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
  - Mendeteksi file berukuran besar (> 100 MB) yang memicu peringatan virus Google Drive dan otomatis mengekstrak token konfirmasi (`confirm=t`).
- **🎬 In-App Video & Audio Streaming**:
  - Didukung endpoint proxy streaming dengan **HTTP Range Requests (`206 Partial Content`)**, memungkinkan fitur *seek/scrubbing* timeline video dan audio HTML5 secara lancar.
- **📄 Dual-Mode PDF & Document Viewer**:
  - **Native PDF Mode**: Didukung engine Mozilla PDF.js yang merender dokumen PDF langsung ke elemen HTML5 `<canvas>` (bebas dari pemblokiran sandbox plugin browser Chrome/Edge, dilengkapi kontrol Halaman, Zoom, dan Rotasi).
  - **Google Viewer Mode**: Pratinjau interaktif resmi Google Docs Viewer.
- **💻 CLI & IDM Command Generator**:
  - Menghasilkan perintah siap salin untuk terminal:
    - `cURL` (`curl -L -o "filename" "URL"`)
    - `Wget` (`wget --content-disposition "URL"`)
    - `Aria2 / IDM` (`aria2c -x 16 -s 16 "URL"`)
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
    "mediaType": "video",
    "canPreview": true,
    "isConfirmRequired": false,
    "status": "ok"
  }
}
```

### 2. `GET /api/drive/stream?id={FILE_ID}&inline=true`
Menyajikan streaming file secara aman dengan dukungan Range request untuk pemutar media dan viewer dokumen.

---

## 📂 Struktur Direktori Proyek

```text
drive-direct/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── drive/
│   │   │       ├── inspect/route.ts  # Endpoint analisis file & direct resolver
│   │   │       └── stream/route.ts   # Endpoint streaming proxy (Range HTTP support)
│   │   ├── globals.css               # Styling Tailwind CSS v4 & glassmorphism
│   │   ├── layout.tsx                # Root layout & SEO metadata
│   │   └── page.tsx                  # Halaman utama aplikasi
│   ├── components/
│   │   ├── Navbar.tsx                # Komponen header & status bar
│   │   ├── UrlInputCard.tsx          # Form input URL, paste button & live validator
│   │   ├── FileResultCard.tsx        # Card hasil file, tombol aksi & CLI snippets
│   │   ├── MediaPreviewModal.tsx     # Modal pemutar media & dokumen
│   │   ├── PdfCanvasViewer.tsx       # Renderer dokumen PDF native via HTML5 Canvas
│   │   └── HistoryList.tsx           # Komponen riwayat tautan (localStorage)
│   └── lib/
│       └── drive.ts                  # Helper ekstraksi ID & parser Google Drive
├── package.json
└── README.md
```

---

## 📝 Catatan Penggunaan

- File Google Drive harus memiliki izin berbagi **"Anyone with the link" (Siapa saja yang memiliki link)**.
- Jika file melebihi batas kuota harian Google (*Traffic Quota Exceeded*), aplikasi akan memberikan notifikasi status limit secara informatif.
