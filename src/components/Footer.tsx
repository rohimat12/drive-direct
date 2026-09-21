import React from 'react';
import Link from 'next/link';
import { HardDriveDownload, Shield, FileText, HelpCircle, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-slate-950/90 pt-12 pb-8 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-md">
                <HardDriveDownload className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Drive<span className="text-cyan-400">Direct</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Utilitas web modern untuk mengonversi tautan Google Drive publik menjadi direct download link instan, inspect metadata, dan pemutar media in-app.
            </p>
          </div>

          {/* Navigasi Utama */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigasi
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/#cara-pakai" className="hover:text-cyan-400 transition">
                  Cara Penggunaan
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-cyan-400 transition">
                  Tanya Jawab (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Legalitas (AdSense Mandatory) */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Kebijakan &amp; Hukum
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Kebijakan Privasi</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Syarat &amp; Ketentuan</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Informasi & Dukungan */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Tentang Kami
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition">
                  Tentang DriveDirect
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Hubungi Kami</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/rohimat12/drive-direct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition flex items-center gap-1"
                >
                  <span>Source Code GitHub</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} DriveDirect. Seluruh hak cipta dilindungi. Google Drive adalah merek dagang terdaftar milik Google LLC. DriveDirect tidak berafiliasi secara resmi dengan Google LLC.
          </p>
          <p>Ditenagai Next.js 16 &amp; Tailwind CSS v4.</p>
        </div>
      </div>
    </footer>
  );
}
