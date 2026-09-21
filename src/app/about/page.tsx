import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { HardDriveDownload, ShieldCheck, Zap, Heart, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Mengenal lebih dekat DriveDirect, misi kami, dan teknologi di balik generator direct download Google Drive.',
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
            <Heart className="h-3.5 w-3.5" />
            <span>Mengenal DriveDirect</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Tentang <span className="text-cyan-400">DriveDirect</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            DriveDirect adalah platform utilitas web gratis yang dirancang untuk menyederhanakan alur pengunduhan file dari penyimpanan cloud Google Drive.
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              <span>Misi Kami</span>
            </h2>
            <p>
              Sering kali saat kita ingin mengunduh file dari Google Drive, kita harus melewati halaman antarmuka pratinjau yang berat, iklan pengalihan dari situs pihak ketiga yang mencurigakan, atau tombol unduh yang berulang kali meminta konfirmasi.
            </p>
            <p>
              Misi kami sederhana: menghadirkan alat bantu yang **bersih, aman, cepat, dan transparan**. Tanpa tipu daya tombol unduh palsu, tanpa iklan pop-up yang mengganggu, dan dengan tetap mematuhi protokol resmi server Google.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span>Keunggulan &amp; Nilai Layanan</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300">
                  <strong>Langsung ke CDN Resmi:</strong> Kami tidak pernah menyimpan atau memodifikasi file Anda. Semua file diunduh langsung dari server CDN resmi Google.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300">
                  <strong>Privasi Terjaga:</strong> Tidak memerlukan pendaftaran akun, login, atau pengisian data pribadi apa pun.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300">
                  <strong>Dukungan Media Lengkap:</strong> Dilengkapi pemutar media in-app untuk video, audio, gambar, dan dokumen PDF (HTML5 Canvas).
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300">
                  <strong>Ramah Developer:</strong> Menyediakan generator baris perintah otomatis untuk terminal cURL, Wget, dan download manager.
                </p>
              </div>
            </div>
          </section>

          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="text-lg font-bold text-white">Disclaimer Kepemilikan</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              DriveDirect adalah proyek independen dan tidak berafiliasi, disponsori, atau didukung secara resmi oleh Google LLC atau Alphabet Inc. Merek dagang Google Drive adalah milik sah dari Google LLC. Semua file yang diakses melalui layanan ini tunduk pada hak cipta pemilik file masing-masing dan ketentuan layanan Google Drive.
            </p>
          </section>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition shadow-lg shadow-cyan-600/20"
          >
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/contact"
            className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition"
          >
            Punya pertanyaan? Hubungi Kami
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
