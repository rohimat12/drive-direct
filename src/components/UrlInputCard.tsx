'use client';

import React, { useState } from 'react';
import { Link2, Clipboard, X, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { extractFileId } from '@/lib/drive';

interface UrlInputCardProps {
  onInspect: (url: string) => Promise<void>;
  isLoading: boolean;
}

export default function UrlInputCard({ onInspect, isLoading }: UrlInputCardProps) {
  const [inputUrl, setInputUrl] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const sampleUrl = 'https://drive.google.com/file/d/1oBDNLQeBxpaEpeZ2aKGhskKzLpBeGtRo/view?usp=sharing';

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputUrl(text.trim());
        setValidationError(null);
      }
    } catch {
      // Fallback if permission not granted
    }
  };

  const handleClear = () => {
    setInputUrl('');
    setValidationError(null);
  };

  const handleUseSample = () => {
    setInputUrl(sampleUrl);
    setValidationError(null);
    onInspect(sampleUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      setValidationError('Silakan masukkan link atau File ID Google Drive terlebih dahulu.');
      return;
    }

    const fileId = extractFileId(trimmed);
    if (!fileId) {
      setValidationError('Format link Google Drive tidak dikenali. Pastikan menyertakan ID file yang valid.');
      return;
    }

    setValidationError(null);
    onInspect(trimmed);
  };

  const detectedId = inputUrl ? extractFileId(inputUrl) : null;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-panel relative rounded-2xl p-2 sm:p-3 shadow-2xl transition-all focus-within:border-cyan-500/50 focus-within:ring-4 focus-within:ring-cyan-500/10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Input icon and text input */}
            <div className="relative flex-1 flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
                <Link2 className="h-5 w-5 text-cyan-400" />
              </div>
              
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="Tempel link Google Drive di sini (misal: drive.google.com/file/d/...)"
                className="w-full bg-transparent pl-11 pr-20 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
                disabled={isLoading}
              />

              {/* Action buttons inside input: Clear & Paste */}
              <div className="absolute right-2 flex items-center gap-1">
                {inputUrl && (
                  <button
                    type="button"
                    onClick={handleClear}
                    title="Hapus input"
                    className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                {!inputUrl && (
                  <button
                    type="button"
                    onClick={handlePaste}
                    title="Tempel dari Clipboard"
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700/50 transition"
                  >
                    <Clipboard className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Paste</span>
                  </button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !inputUrl.trim()}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Memeriksa...</span>
                </>
              ) : (
                <>
                  <span>Generate Link</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Validation or Detected ID Helper */}
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-2 text-xs">
          {validationError ? (
            <p className="text-rose-400 font-medium">{validationError}</p>
          ) : detectedId ? (
            <p className="text-slate-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
              ID Terdeteksi: <code className="text-cyan-300 font-mono bg-slate-900/80 px-1.5 py-0.5 rounded border border-white/5">{detectedId}</code>
            </p>
          ) : (
            <span className="text-slate-500">Mendukung format /file/d/, /open?id=, /uc?id=, dsb.</span>
          )}

          <button
            type="button"
            onClick={handleUseSample}
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition ml-auto flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3" />
            <span>Coba contoh file video (47 MB)</span>
          </button>
        </div>
      </form>
    </div>
  );
}
