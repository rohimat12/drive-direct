'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MessageSquare, Send, CheckCircle2, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Front-end confirmation
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
            <Mail className="h-3.5 w-3.5" />
            <span>Pusat Bantuan &amp; Kontak</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Hubungi Kami
          </h1>
          <p className="text-sm text-slate-400">
            Punya pertanyaan, kritik, saran fitur, atau laporan masalah teknis? Kami siap mendengar dan membantu Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info Side */}
          <div className="space-y-4 md:col-span-1">
            <div className="glass-panel rounded-2xl p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white text-sm">Email Dukungan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kirim pesan langsung ke tim pengembang kami untuk pertanyaan umum atau kerja sama:
              </p>
              <a
                href="mailto:support@drive-direct.vercel.app"
                className="text-xs font-mono text-cyan-400 hover:underline block break-all"
              >
                support@drive-direct.vercel.app
              </a>
            </div>

            <div className="glass-panel rounded-2xl p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white text-sm">GitHub Issue Tracker</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Untuk pelaporan bug atau perbaikan kode open-source:
              </p>
              <a
                href="https://github.com/rohimat12/drive-direct/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-cyan-400 hover:underline block"
              >
                github.com/rohimat12/drive-direct
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 md:col-span-2">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Pesan Anda Berhasil Terkirim!</h3>
                <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                  Terima kasih atas pesan dan masukan Anda. Tim kami akan meninjau dan merespons pertanyaan Anda secepat mungkin.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
                >
                  Kirim Pesan Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-cyan-400" />
                  <span>Kirim Pesan Langsung</span>
                </h2>

                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-slate-300">
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama Anda"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-slate-300">
                    Alamat Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-slate-300">
                    Isi Pesan / Pertanyaan
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pertanyaan, saran, atau kendala Anda di sini..."
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Kirim Pesan Sekarang</span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-white/10 rounded-xl transition"
          >
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
