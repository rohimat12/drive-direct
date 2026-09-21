'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import UrlInputCard from '@/components/UrlInputCard';
import FileResultCard from '@/components/FileResultCard';
import MediaPreviewModal from '@/components/MediaPreviewModal';
import HistoryList from '@/components/HistoryList';
import HowToUseSection from '@/components/HowToUseSection';
import FeaturesExplanationSection from '@/components/FeaturesExplanationSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import { DriveFileInfo } from '@/lib/drive';
import { AlertCircle, Zap, ShieldCheck, Cpu, HardDrive, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'drive_direct_history_v1';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState<DriveFileInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<DriveFileInfo | null>(null);
  const [history, setHistory] = useState<DriveFileInfo[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  }, []);

  const saveToHistory = (item: DriveFileInfo) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.fileId !== item.fileId);
      const updated = [item, ...filtered].slice(0, 9); // keep last 9
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save history:', e);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  const abortControllerRef = React.useRef<AbortController | null>(null);

  const handleInspect = async (url: string) => {
    // Abort previous in-flight request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setErrorMsg(null);
    setCurrentFile(null);

    try {
      const res = await fetch('/api/drive/inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Gagal memproses link Google Drive.');
        return;
      }

      setCurrentFile(data.data);
      saveToHistory(data.data);
    } catch (err: unknown) {
      const error = err as Error;
      if (error.name === 'AbortError') {
        return; // Ignore aborted requests
      }
      setErrorMsg(error.message || 'Terjadi kesalahan jaringan.');
    } finally {
      if (abortControllerRef.current === controller) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background ambient glowing gradients */}
      <div className="glow-cyan -top-40 -left-40 h-[500px] w-[500px] bg-cyan-600" />
      <div className="glow-cyan top-1/4 -right-40 h-[600px] w-[600px] bg-blue-700" />
      <div className="glow-cyan bottom-10 left-1/3 h-[500px] w-[500px] bg-indigo-600/40" />

      {/* Grid Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <Navbar />

      <main className="relative z-10 flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-5xl mx-auto w-full space-y-10">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            <span>Google Drive Direct Link Generator 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Download File GDrive{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Tanpa Halaman Preview
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Konversi link Google Drive menjadi link download langsung 1-klik, bypass batasan tampilan preview, ekstrak nama &amp; ukuran file asli, serta putar video in-app.
          </p>
        </div>

        {/* Input Card */}
        <div className="max-w-3xl mx-auto w-full">
          <UrlInputCard onInspect={handleInspect} isLoading={isLoading} />
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="max-w-3xl mx-auto w-full">
            <div className="flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-300 backdrop-blur-md">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-rose-200">Gagal Memproses File</p>
                <p className="text-rose-300/90 leading-relaxed">{errorMsg}</p>
              </div>
            </div>
          </div>
        )}

        {/* File Result Card */}
        {currentFile && (
          <div className="max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <FileResultCard
              fileInfo={currentFile}
              onOpenPreview={(f) => setPreviewFile(f)}
            />
          </div>
        )}

        {/* History List */}
        {history.length > 0 && (
          <div className="max-w-4xl mx-auto w-full pt-4">
            <HistoryList
              history={history}
              onSelect={(item) => setCurrentFile(item)}
              onClear={handleClearHistory}
            />
          </div>
        )}

        {/* Feature Highlights Grid */}
        <div className="pt-12 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-2xl p-6 space-y-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <HardDrive className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Direct CDN Google</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mengarah langsung ke endpoint penyimpanan resmi (<code className="text-cyan-300">drive.usercontent.google.com</code>) untuk kecepatan download maksimal.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6 space-y-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white text-base">CORS Safe &amp; Stream</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ditenagai server-side Node.js proxy yang mendukung HTTP Range request sehingga Anda dapat memutar dan seek video/audio langsung di browser.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6 space-y-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Downloader Snippets</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Menyediakan perintah otomatis untuk terminal (cURL, Wget, Aria2c) atau langsung ditempel ke Internet Download Manager (IDM).
              </p>
            </div>
          </div>
        </div>

        {/* Cara Menggunakan Section */}
        <HowToUseSection />

        {/* Panduan Mendalam & Edukasi Fitur (AdSense High-Value Content) */}
        <FeaturesExplanationSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Media Preview Modal */}
      <MediaPreviewModal
        isOpen={Boolean(previewFile)}
        onClose={() => setPreviewFile(null)}
        fileInfo={previewFile}
      />
    </div>
  );
}
