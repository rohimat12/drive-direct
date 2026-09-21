import React from 'react';
import Link from 'next/link';
import { HardDriveDownload, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
            <HardDriveDownload className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Drive<span className="text-cyan-400">Direct</span>
              </span>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Direct Link &amp; Stream Downloader
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
          <Link href="/#cara-pakai" className="hover:text-cyan-400 transition-colors">
            Cara Penggunaan
          </Link>
          <Link href="/#fitur" className="hover:text-cyan-400 transition-colors">
            Fitur &amp; Edukasi
          </Link>
          <Link href="/#faq" className="hover:text-cyan-400 transition-colors">
            Tanya Jawab (FAQ)
          </Link>
          <Link href="/about" className="hover:text-cyan-400 transition-colors">
            Tentang Kami
          </Link>
          <Link href="/contact" className="hover:text-cyan-400 transition-colors">
            Kontak
          </Link>
        </nav>

        {/* Status / Quick badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>API Online</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
            <span>Tanpa Iklan Pop-up</span>
          </div>
        </div>
      </div>
    </header>
  );
}
