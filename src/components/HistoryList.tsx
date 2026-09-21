'use client';

import React from 'react';
import { History, Trash2, ArrowUpRight, Film, FileText, Music, Archive, File } from 'lucide-react';
import { DriveFileInfo } from '@/lib/drive';

interface HistoryListProps {
  history: DriveFileInfo[];
  onSelect: (item: DriveFileInfo) => void;
  onClear: () => void;
}

export default function HistoryList({ history, onSelect, onClear }: HistoryListProps) {
  if (!history || history.length === 0) return null;

  const getSmallIcon = (mediaType: DriveFileInfo['mediaType']) => {
    switch (mediaType) {
      case 'video':
        return <Film className="h-4 w-4 text-cyan-400" />;
      case 'audio':
        return <Music className="h-4 w-4 text-purple-400" />;
      case 'archive':
        return <Archive className="h-4 w-4 text-amber-400" />;
      case 'document':
      case 'pdf':
        return <FileText className="h-4 w-4 text-blue-400" />;
      default:
        return <File className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <History className="h-4 w-4 text-cyan-400" />
          <span>Riwayat Konversi ({history.length})</span>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-400 transition"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Hapus Semua</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {history.map((item) => (
          <div
            key={item.fileId}
            onClick={() => onSelect(item)}
            className="glass-panel glass-panel-hover flex items-center justify-between p-3.5 rounded-2xl cursor-pointer group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-white/5">
                {getSmallIcon(item.mediaType)}
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition">
                  {item.fileName}
                </p>
                <p className="text-[11px] text-slate-500">
                  {item.fileSizeFormatted}
                </p>
              </div>
            </div>

            <div className="p-1 rounded-lg text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
