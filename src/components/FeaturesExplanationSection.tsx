import React from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Film, 
  FileCheck2, 
  Zap, 
  Check, 
  X, 
  HelpCircle,
  Sparkles,
  Server,
  Layers,
  FileCode2
} from 'lucide-react';

export default function FeaturesExplanationSection() {
  return (
    <section id="fitur" className="pt-12 space-y-12 border-t border-white/5">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Panduan Teknis &amp; Edukasi Fitur</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Mengapa Menggunakan <span className="text-cyan-400">DriveDirect</span>?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Pelajari bagaimana arsitektur tautan langsung Google Drive bekerja, cara mengatasi kendala kuota unduhan, serta pemanfaatan fitur media streaming canggih tanpa aplikasi pihak ketiga.
        </p>
      </div>

      {/* Deep-dive 4 Feature Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Article 1: Virus Scan Warning Bypass */}
        <div className="glass-panel rounded-2xl p-6 sm:p-7 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Bypass Otomatis Konfirmasi Virus File Besar (&gt; 100 MB)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Google Drive menerapkan batas pemindaian antivirus otomatis untuk file berukuran besar. File di atas 100 MB biasanya dialihkan ke laman peringatan: <em>&quot;Google Drive cannot scan this file for viruses&quot;</em> yang mewajibkan pengguna mengeklik tombol konfirmasi manual.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Solusi DriveDirect:</strong> Server kami secara dinamis melakukan inspeksi handshake HTTP, mengekstrak token <code>confirm</code> dan kode session <code>uuid</code> unik yang dikeluarkan Google, lalu merangkainya ke dalam tautan langsung satu klik.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-cyan-400 font-mono">
            <span>drive.usercontent.google.com/download?confirm=t&amp;uuid=...</span>
          </div>
        </div>

        {/* Article 2: Streaming Video/Audio HTTP Range */}
        <div className="glass-panel rounded-2xl p-6 sm:p-7 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Film className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Streaming Video &amp; Audio Lancar (HTTP 206 Partial Content)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tautan unduhan standar Google Drive menyajikan header <code>Content-Disposition: attachment</code> yang memaksa browser untuk mendownload file secara utuh dan memblokir pemutaran instan karena batasan CORS (Cross-Origin Resource Sharing).
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Solusi DriveDirect:</strong> Layanan kami menyediakan server streaming proxy internal dengan dukungan penuh <code>Range Requests</code>. Anda dapat memutar video 4K/1080p, mendengarkan podcast MP3/WAV, serta menggeser durasi (seeking) secara instan tanpa menunggu seluruh file selesai terunduh.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-blue-400 font-mono">
            <span>Status 206 Partial Content • Seeking Realtime</span>
          </div>
        </div>

        {/* Article 3: Panduan Bypass Limit Kuota 24 Jam Google */}
        <div className="glass-panel rounded-2xl p-6 sm:p-7 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Cara Mengatasi &quot;Download Quota Exceeded&quot; (Limit Kuota)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Google Drive membatasi bandwidth pengunduhan harian untuk setiap file publik. Jika file tersebut viral atau diunduh oleh ribuan orang sekaligus, Google akan memblokir unduhan sementara selama 24 jam dengan pesan kuota terlampaui.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-white/5">
              <p className="font-semibold text-amber-300">Trik Bypass Resmi (Make a Copy):</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Buka link file di Google Drive sambil login ke akun Google Anda.</li>
                <li>Klik ikon <strong>&quot;Tambahkan pintasan ke Drive&quot;</strong> atau buat salinan file (<em>Make a Copy</em>).</li>
                <li>Buka file salinan baru di Google Drive Anda sendiri.</li>
                <li>Ubah hak akses menjadi publik lalu gunakan tautan baru tersebut di DriveDirect.</li>
              </ol>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-amber-400">
            <span>Tips 100% Legal &amp; Aman Sesuai Regulasi Google</span>
          </div>
        </div>

        {/* Article 4: Snippets Terminal untuk Sysadmin & Developer */}
        <div className="glass-panel rounded-2xl p-6 sm:p-7 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Generator Perintah Otomatis: cURL, Wget, &amp; Aria2c
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mengunduh file dari Google Drive di server headless Linux / VPS biasanya sangat menyulitkan karena membutuhkan penanganan cookie sesi dan redirect header yang rumit.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Solusi DriveDirect:</strong> Setiap link yang Anda inspect langsung menghasilkan baris perintah siap salin untuk <code>curl -L</code>, <code>wget --content-disposition</code>, atau <code>aria2c -x 16</code> (multi-connection 16 stream) dengan nama file yang sudah disanitasi dari karakter berbahaya.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
            <span>curl -L &quot;streamUrl&quot; -o filename.ext</span>
          </div>
        </div>
      </div>

      {/* Comparison Table Section */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-cyan-400" />
            <span>Tabel Perbandingan: DriveDirect vs Metode Lain</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Lihat perbedaan nyata antara pengunduhan standar Google Drive, website downloader lain, dan DriveDirect.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-300">
                <th className="py-3 px-3 sm:px-4 font-semibold">Fitur / Kriteria</th>
                <th className="py-3 px-3 sm:px-4 font-semibold text-cyan-400 bg-cyan-950/20 rounded-t-lg">DriveDirect</th>
                <th className="py-3 px-3 sm:px-4 font-semibold text-slate-400">Google Drive Web Default</th>
                <th className="py-3 px-3 sm:px-4 font-semibold text-slate-400">Downloader Pihak Ketiga Lain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-3 px-3 sm:px-4 font-medium">Bypass Halaman Pratinjau</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-400 bg-cyan-950/20 font-semibold flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Ya (1-Klik Langsung)
                </td>
                <td className="py-3 px-3 sm:px-4 text-slate-400">Harus buka UI preview</td>
                <td className="py-3 px-3 sm:px-4 text-slate-400">Tergantung</td>
              </tr>
              <tr>
                <td className="py-3 px-3 sm:px-4 font-medium">Iklan Pop-up &amp; Pengalihan (Shortlink)</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-400 bg-cyan-950/20 font-semibold flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> 0% Bebas Iklan Pop-up
                </td>
                <td className="py-3 px-3 sm:px-4 text-emerald-400 flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Tanpa Iklan
                </td>
                <td className="py-3 px-3 sm:px-4 text-rose-400 flex items-center gap-1.5">
                  <X className="h-4 w-4" /> Penuh iklan jebakan / popunder
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 sm:px-4 font-medium">Bypass Virus Scan File &gt; 100MB</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-400 bg-cyan-950/20 font-semibold flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Otomatis (Ekstrak Token)
                </td>
                <td className="py-3 px-3 sm:px-4 text-amber-400">Harus klik &quot;Download anyway&quot;</td>
                <td className="py-3 px-3 sm:px-4 text-rose-400 flex items-center gap-1.5">
                  <X className="h-4 w-4" /> Sering gagal / link kedaluwarsa
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 sm:px-4 font-medium">Player Video / Audio In-App</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-400 bg-cyan-950/20 font-semibold flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Ya (HTTP 206 Partial Content)
                </td>
                <td className="py-3 px-3 sm:px-4 text-amber-400">Tergantung codec browser</td>
                <td className="py-3 px-3 sm:px-4 text-rose-400 flex items-center gap-1.5">
                  <X className="h-4 w-4" /> Tidak ada
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 sm:px-4 font-medium">Snippets cURL, Wget, Aria2c</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-400 bg-cyan-950/20 font-semibold flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Disediakan Otomatis
                </td>
                <td className="py-3 px-3 sm:px-4 text-rose-400 flex items-center gap-1.5">
                  <X className="h-4 w-4" /> Tidak tersedia
                </td>
                <td className="py-3 px-3 sm:px-4 text-rose-400 flex items-center gap-1.5">
                  <X className="h-4 w-4" /> Tidak tersedia
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 sm:px-4 font-medium">Keamanan &amp; Privasi File</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-400 bg-cyan-950/20 font-semibold flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Serverless, Tidak Ada Cache File
                </td>
                <td className="py-3 px-3 sm:px-4 text-emerald-400 flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Server Resmi Google
                </td>
                <td className="py-3 px-3 sm:px-4 text-rose-400 flex items-center gap-1.5">
                  <X className="h-4 w-4" /> Resiko re-upload / file logging
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
