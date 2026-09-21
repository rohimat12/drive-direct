import React from 'react';
import { Copy, Link2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowToUseSection() {
  const steps = [
    {
      number: '01',
      title: 'Salin Tautan Berbagi',
      desc: 'Buka file di Google Drive, klik tombol "Bagikan" (Share), dan pastikan izin diatur ke "Siapa saja yang memiliki link" (Anyone with the link).',
      icon: <Link2 className="h-6 w-6 text-cyan-400" />,
    },
    {
      number: '02',
      title: 'Tempel di DriveDirect',
      desc: 'Tempelkan URL Google Drive ke kotak input di atas. Sistem kami otomatis mengenali ID file secara instan dari berbagai format tautan.',
      icon: <Copy className="h-6 w-6 text-blue-400" />,
    },
    {
      number: '03',
      title: 'Generate & Unduh 1-Klik',
      desc: 'Dapatkan link langsung CDN resmi Google tanpa halaman preview, putar video/audio in-app, atau salin perintah cURL/Wget/IDM.',
      icon: <Sparkles className="h-6 w-6 text-purple-400" />,
    },
  ];

  return (
    <section id="cara-pakai" className="pt-8 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Cara Menggunakan <span className="text-cyan-400">DriveDirect</span>
        </h2>
        <p className="text-sm text-slate-400">
          Hanya dalam 3 langkah mudah untuk mengonversi link Google Drive menjadi direct download berkecepatan penuh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-white/10 shadow-inner">
                  {step.icon}
                </div>
                <span className="font-mono text-2xl font-black text-slate-700 select-none">
                  {step.number}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-medium text-cyan-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Cepat &amp; Bebas Iklan Pop-up</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
