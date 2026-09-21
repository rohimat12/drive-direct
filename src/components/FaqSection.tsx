'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apa itu Google Drive Direct Link?',
      a: 'Google Drive Direct Link adalah tautan unduhan langsung yang mengarah ke server penyimpanan resmi Google (drive.usercontent.google.com). Tautan ini memungkinkan peramban atau download manager (seperti IDM) mengunduh file secara instan dalam 1-klik tanpa perlu membuka halaman antarmuka pratinjau (preview interface) Google Drive terlebih dahulu.',
    },
    {
      q: 'Mengapa file berukuran besar (> 100 MB) memunculkan peringatan virus di Google?',
      a: 'Google Drive secara otomatis memindai virus untuk file berukuran kecil (< 25–100 MB). Untuk file yang melebihi batas tersebut, sistem Google tidak dapat memindai virus secara langsung dan mewajibkan token konfirmasi pengguna. DriveDirect secara otomatis mengekstrak token konfirmasi tersebut dan menyajikannya ke dalam link unduhan sehingga Anda tidak perlu klik manual berulang kali.',
    },
    {
      q: 'Format tautan Google Drive apa saja yang didukung oleh DriveDirect?',
      a: 'DriveDirect mendukung seluruh format tautan publik Google Drive, termasuk: tautan berbagi biasa (drive.google.com/file/d/FILE_ID/view), tautan folder atau preview, tautan ekspor (drive.google.com/open?id=FILE_ID), tautan uc?id=FILE_ID, hingga hanya memasukkan string File ID (33 karakter alfanumerik) saja.',
    },
    {
      q: 'Apa yang harus dilakukan jika muncul pesan "Download quota is exceeded"?',
      a: 'Pesan "Kuota unduhan terlampaui" terjadi karena file tersebut telah diunduh oleh terlalu banyak orang dalam rentang waktu 24 jam terakhir (kebijakan batas lalu lintas Google). Untuk mengatasinya: masuk ke akun Google Anda sendiri, buka tautan file tersebut, pilih opsi "Buat salinan" (Make a copy) ke Google Drive Anda, lalu gunakan tautan file salinan tersebut di DriveDirect.',
    },
    {
      q: 'Bagaimana cara memastikan file Google Drive dapat diunduh oleh siapa saja?',
      a: 'Pastikan pengaturan berbagi (Share Settings) file di Google Drive diatur ke "Siapa saja yang memiliki link" (Anyone with the link) dengan peran "Pelihat" (Viewer). Jika file masih berstatus "Dibatasi" (Restricted), server kami maupun peramban orang lain tidak akan memiliki izin untuk mengakses atau mengunduhnya.',
    },
    {
      q: 'Apakah DriveDirect menyimpan file atau riwayat unduhan saya di server?',
      a: 'Tidak. DriveDirect tidak pernah menyimpan file unduhan Anda di server kami. Semua lalu lintas unduhan berlangsung secara langsung antara peramban Anda dan CDN resmi Google. Riwayat pencarian yang Anda lihat hanya disimpan secara lokal di peramban Anda sendiri (LocalStorage) dan dapat dihapus kapan saja.',
    },
    {
      q: 'Bagaimana cara menggunakan link hasil DriveDirect di Internet Download Manager (IDM)?',
      a: 'Setelah Anda menekan tombol "Periksa Link", salin tautan dari tombol "Direct Link (CDN Resmi)" atau salin URL Stream. Buka IDM di komputer Anda, klik tombol "Add URL", lalu tempelkan link tersebut. IDM akan langsung mengenali nama file asli dan memulai proses unduhan dengan multithreading penuh.',
    },
    {
      q: 'Bagaimana cara pemutar video dan audio in-app bekerja?',
      a: 'Kami menyediakan proxy internal yang mendukung protokol HTTP Range Requests (Status 206 Partial Content). Fitur ini memungkinkan Anda melakukan seek (menggeser maju-mundur timeline audio/video) dan memutar media langsung dengan lancar tanpa hambatan pembatasan CORS.',
    },
    {
      q: 'Mengapa preview file PDF dapat dibuka tanpa plugin browser?',
      a: 'DriveDirect mengintegrasikan Mozilla PDF.js yang merender halaman PDF secara native ke elemen HTML5 Canvas. Dengan metode ini, dokumen PDF dapat dibaca dengan tajam dan aman di semua perangkat (termasuk smartphone Android & iPhone) tanpa terpengaruh oleh pembatasan iframe pihak ketiga.',
    },
    {
      q: 'Apakah layanan DriveDirect sepenuhnya gratis?',
      a: 'Ya, DriveDirect 100% gratis digunakan kapan saja tanpa perlu mendaftar akun, tanpa biaya langganan, dan tanpa iklan pop-up yang mengganggu.',
    },
  ];

  return (
    <section id="faq" className="pt-10 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Pertanyaan Umum &amp; Solusi</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-sm text-slate-400">
          Jawaban komprehensif atas pertanyaan teknis, panduan penggunaan, dan solusi masalah tautan Google Drive.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="glass-panel rounded-2xl overflow-hidden transition-all duration-200 border border-white/5"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 hover:bg-slate-900/50 transition"
              >
                <span className="text-sm sm:text-base font-semibold text-slate-100">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-cyan-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
