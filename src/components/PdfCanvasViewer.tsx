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
}

interface PdfViewport {
  width: number;
  height: number;
}

interface PdfRenderTask {
  promise: Promise<void>;
  cancel: () => void;
}

interface PdfPage {
  getViewport: (options: { scale: number; rotation: number }) => PdfViewport;
  render: (renderContext: {
    canvasContext: CanvasRenderingContext2D;
    transform?: number[];
    viewport: PdfViewport;
  }) => PdfRenderTask;
}

interface PdfDocument {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPage>;
}

interface PdfJsLib {
  GlobalWorkerOptions: {
    workerSrc: string;
  };
  getDocument: (options: { url: string; withCredentials?: boolean }) => {
    promise: Promise<PdfDocument>;
  };
}

declare global {
  interface Window {
    pdfjsLib?: PdfJsLib;
  }
}

export default function PdfCanvasViewer({ url }: PdfCanvasViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<PdfRenderTask | null>(null);

  const [pdfDoc, setPdfDoc] = useState<PdfDocument | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load PDF.js library
  const loadPdfJs = useCallback((): Promise<PdfJsLib> => {
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

    // Asynchronously update status to avoid synchronous cascading renders
    const timer = setTimeout(() => {
      if (!isCancelled) {
        setLoading(true);
        setError(null);
      }
    }, 0);

    loadPdfJs()
      .then((pdfjs) => {
        const loadingTask = pdfjs.getDocument({
          url,
          withCredentials: false,
        });

        return loadingTask.promise;
      })
      .then((doc: PdfDocument) => {
        if (!isCancelled) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setPageNum(1);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!isCancelled) {
          const errorObj = err as Error;
          console.error('PDF load error:', err);
          setError(errorObj.message || 'Gagal memuat file PDF.');
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
      clearTimeout(timer);
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
      } catch (err: unknown) {
        const errorObj = err as Error;
        if (errorObj?.name !== 'RenderingCancelledException') {
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
        {/* Pagination */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNum <= 1 || loading}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="font-mono text-[11px] px-1">
            {loading ? '...' : `${pageNum} / ${numPages || 1}`}
          </span>

          <button
            onClick={() => changePage(1)}
            disabled={pageNum >= numPages || loading}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition"
            title="Halaman Selanjutnya"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Zoom & Rotation */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5 || loading}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition"
            title="Perkecil (-)"
          >
            <ZoomOut className="h-4 w-4" />
          </button>

          <span className="font-mono text-[11px] w-12 text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={scale >= 3.0 || loading}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition"
            title="Perbesar (+)"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1" />

          <button
            onClick={rotate}
            disabled={loading}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition"
            title="Putar 90 Derajat"
          >
            <RotateCw className="h-4 w-4" />
          </button>

          <button
            onClick={() => {
              setScale(1.2);
              setRotation(0);
            }}
            disabled={loading}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition"
            title="Reset Tampilan"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center relative bg-slate-950/80">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950/90 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            <p className="text-xs text-slate-400 font-medium">Memuat dan merender PDF via HTML5 Canvas...</p>
          </div>
        )}

        {error && (
          <div className="max-w-md p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-300 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-semibold">Gagal Menampilkan PDF Native</p>
              <p className="text-slate-400">{error}</p>
              <p className="text-[11px] text-cyan-400 pt-1">
                Tip: Gunakan tombol &quot;Mode Google Viewer&quot; di atas untuk membuka via antarmuka standar.
              </p>
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className={`shadow-2xl rounded-sm transition-opacity duration-200 ${
            loading || error ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
}
