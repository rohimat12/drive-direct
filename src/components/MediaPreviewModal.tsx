'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  Download,
  ExternalLink,
  Volume2,
  Film,
  Image as ImageIcon,
  FileText,
  Maximize2,
} from 'lucide-react';
import { DriveFileInfo } from '@/lib/drive';
import PdfCanvasViewer from './PdfCanvasViewer';

interface MediaPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileInfo: DriveFileInfo | null;
}

export default function MediaPreviewModal({ isOpen, onClose, fileInfo }: MediaPreviewModalProps) {
  // Default to native HTML5 canvas PDF viewer for 100% reliable rendering
  const [pdfMode, setPdfMode] = useState<'native' | 'google'>('native');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !fileInfo) return null;

  const googlePreviewUrl = `https://drive.google.com/file/d/${fileInfo.fileId}/preview`;
  // Preserve any confirm and uuid parameters from streamUrl for large PDFs
  const nativePdfUrl = `${fileInfo.streamUrl}${fileInfo.streamUrl.includes('?') ? '&' : '?'}inline=true`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-slate-950/40">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
              {fileInfo.mediaType === 'video' ? (
                <Film className="h-5 w-5" />
              ) : fileInfo.mediaType === 'audio' ? (
                <Volume2 className="h-5 w-5" />
              ) : fileInfo.mediaType === 'image' ? (
                <ImageIcon className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
            </div>
            <div className="overflow-hidden">
              <h3 className="truncate text-sm sm:text-base font-semibold text-white">
                {fileInfo.fileName}
              </h3>
              <p className="text-xs text-slate-400">
                {fileInfo.fileSizeFormatted} • {fileInfo.contentType}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {fileInfo.mediaType === 'pdf' && (
              <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-white/5 text-xs mr-2">
                <button
                  type="button"
                  onClick={() => setPdfMode('native')}
                  className={`px-2.5 py-1 rounded-md transition ${
                    pdfMode === 'native'
                      ? 'bg-cyan-500 text-white font-medium shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Native PDF
                </button>
                <button
                  type="button"
                  onClick={() => setPdfMode('google')}
                  className={`px-2.5 py-1 rounded-md transition ${
                    pdfMode === 'google'
                      ? 'bg-cyan-500 text-white font-medium shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Google Viewer
                </button>
              </div>
            )}

            <a
              href={fileInfo.mediaType === 'pdf' ? nativePdfUrl : fileInfo.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Buka di tab baru"
              className="hidden sm:flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
            >
              <Maximize2 className="h-3.5 w-3.5 text-cyan-400" />
              <span>Buka Tab Baru</span>
            </a>

            <a
              href={fileInfo.downloadUrl}
              download={fileInfo.fileName}
              className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-cyan-500 transition shadow-md shadow-cyan-600/20"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </a>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition ml-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Media Player Area */}
        <div className="relative flex-1 min-h-[420px] max-h-[75vh] flex items-center justify-center bg-black/70 p-1 sm:p-3 overflow-hidden">
          {fileInfo.mediaType === 'video' && (
            <video
              controls
              autoPlay
              playsInline
              className="max-h-[70vh] w-full rounded-lg shadow-lg"
              src={fileInfo.streamUrl}
            >
              Browser Anda tidak mendukung pemutar video HTML5.
            </video>
          )}

          {fileInfo.mediaType === 'audio' && (
            <div className="flex w-full max-w-lg flex-col items-center justify-center gap-6 py-12">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 ring-8 ring-cyan-500/10">
                <Volume2 className="h-12 w-12" />
              </div>
              <audio controls autoPlay className="w-full" src={fileInfo.streamUrl}>
                Browser Anda tidak mendukung pemutar audio HTML5.
              </audio>
            </div>
          )}

          {fileInfo.mediaType === 'image' && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={fileInfo.directUrl}
              alt={fileInfo.fileName}
              className="max-h-[70vh] max-w-full rounded-lg object-contain"
            />
          )}

          {fileInfo.mediaType === 'pdf' && (
            <div className="relative h-[72vh] w-full rounded-lg overflow-hidden bg-slate-950 border border-white/5">
              {pdfMode === 'google' ? (
                <iframe
                  src={googlePreviewUrl}
                  className="h-full w-full border-0"
                  title={fileInfo.fileName}
                  allow="autoplay"
                />
              ) : (
                <PdfCanvasViewer
                  url={nativePdfUrl}
                  fileName={fileInfo.fileName}
                />
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-slate-950/60 px-5 py-3 text-xs text-slate-400">
          <span>
            {fileInfo.mediaType === 'pdf'
              ? 'Pratinjau interaktif PDF didukung oleh Google Docs Viewer & Native PDF Stream.'
              : 'Streaming langsung melalui proxy berkecepatan tinggi tanpa hambatan CORS.'}
          </span>
          <a
            href={fileInfo.directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition"
          >
            <span>Buka link direct CDN</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
