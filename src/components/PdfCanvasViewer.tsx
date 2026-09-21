'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Loader2,
  AlertCircle,
  Maximize2,
} from 'lucide-react';

interface PdfCanvasViewerProps {
  url: string;
  fileName?: string;
}

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export default function PdfCanvasViewer({ url, fileName }: PdfCanvasViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load PDF.js library
  const loadPdfJs = useCallback((): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        resolve(window.pdfjsLib);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.async = true;
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('PDF.js failed to load'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load PDF.js script from CDN'));
      document.head.appendChild(script);
    });
  }, []);

  // Fetch and parse document
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    loadPdfJs()
      .then((pdfjs) => {
        const loadingTask = pdfjs.getDocument({
          url,
          withCredentials: false,
        });

        return loadingTask.promise;
      })
      .then((doc: any) => {
        if (!isCancelled) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setPageNum(1);
          setLoading(false);
        }
      })
      .catch((err: any) => {
        if (!isCancelled) {
          console.error('PDF load error:', err);
          setError(err.message || 'Gagal memuat file PDF.');
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [url, loadPdfJs]);

  // Render current page to canvas
  const renderPage = useCallback(
    async (num: number, currentScale: number, currentRotation: number) => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const page = await pdfDoc.getPage(num);
        const viewport = page.getViewport({ scale: currentScale, rotation: currentRotation });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        // Support high-DPI displays
        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

        const renderContext = {
          canvasContext: context,
          transform,
          viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;
        await renderTask.promise;
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Error rendering page:', err);
        }
      }
    },
    [pdfDoc]
  );

  useEffect(() => {
    if (pdfDoc) {
      renderPage(pageNum, scale, rotation);
    }
  }, [pdfDoc, pageNum, scale, rotation, renderPage]);

  const changePage = (offset: number) => {
    setPageNum((prev) => Math.min(Math.max(prev + offset, 1), numPages));
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const rotate = () => setRotation((prev) => (prev + 90) % 360);

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 overflow-hidden select-none">
      {/* PDF Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-slate-900/90 px-4 py-2 text-xs text-slate-300 shrink-0">
        {/* Page navigation */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => changePage(-1)}
            disabled={pageNum <= 1 || loading}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-950 border border-white/5">
            {pageNum} / {numPages || 1}
          </span>

          <button
            type="button"
            onClick={() => changePage(1)}
            disabled={pageNum >= numPages || loading}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
            title="Halaman Selanjutnya"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Zoom & Rotation controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={zoomOut}
            disabled={loading}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition"
            title="Perkecil"
          >
            <ZoomOut className="h-4 w-4" />
          </button>

          <span className="font-mono text-xs text-slate-400 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            type="button"
            onClick={zoomIn}
            disabled={loading}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition"
            title="Perbesar"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <div className="h-3.5 w-px bg-white/10 mx-1" />

          <button
            type="button"
            onClick={rotate}
            disabled={loading}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition"
            title="Putar Dokumen"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded hover:bg-slate-800 transition text-cyan-400"
            title="Buka PDF di Tab Baru"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Canvas Viewport Area */}
      <div className="relative flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950/80">
        {loading && (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            <span className="text-xs">Memuat dokumen PDF...</span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-3 p-6 text-center max-w-md">
            <AlertCircle className="h-10 w-10 text-rose-400" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-rose-300">Gagal Merender PDF</p>
              <p className="text-xs text-slate-400 leading-relaxed">{error}</p>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 transition"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Buka Langsung di Tab Baru</span>
            </a>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className={`shadow-2xl rounded-sm transition-opacity duration-200 ${
            loading || error ? 'hidden' : 'block'
          }`}
        />
      </div>
    </div>
  );
}
