'use client';

import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Play,
  Terminal,
  ExternalLink,
  Film,
  Volume2,
  FileArchive,
  FileCode,
  FileText,
  File,
  Sparkles,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { DriveFileInfo } from '@/lib/drive';

interface FileResultCardProps {
  fileInfo: DriveFileInfo;
  onOpenPreview: (fileInfo: DriveFileInfo) => void;
}

export default function FileResultCard({ fileInfo, onOpenPreview }: FileResultCardProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedAria, setCopiedAria] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'curl' | 'aria' | 'idm'>('link');

  const copyToClipboard = async (text: string, type: 'link' | 'curl' | 'aria') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'link') {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else if (type === 'curl') {
        setCopiedCurl(true);
        setTimeout(() => setCopiedCurl(false), 2000);
      } else if (type === 'aria') {
        setCopiedAria(true);
        setTimeout(() => setCopiedAria(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getMediaIcon = () => {
    switch (fileInfo.mediaType) {
      case 'video':
        return <Film className="h-8 w-8 text-cyan-400" />;
      case 'audio':
        return <Volume2 className="h-8 w-8 text-purple-400" />;
      case 'archive':
        return <FileArchive className="h-8 w-8 text-amber-400" />;
      case 'code':
        return <FileCode className="h-8 w-8 text-emerald-400" />;
      case 'document':
      case 'pdf':
        return <FileText className="h-8 w-8 text-blue-400" />;
      default:
        return <File className="h-8 w-8 text-slate-400" />;
    }
  };

  const curlCommand = `curl -L -o "${fileInfo.fileName}" "${fileInfo.directUrl}"`;
  const wgetCommand = `wget --content-disposition -O "${fileInfo.fileName}" "${fileInfo.directUrl}"`;
  const ariaCommand = `aria2c -x 16 -s 16 -o "${fileInfo.fileName}" "${fileInfo.directUrl}"`;

  return (
    <div className="glass-panel glass-panel-hover relative overflow-hidden rounded-3xl p-6 sm:p-8">
      {/* Decorative top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600" />

      {/* Main File Information Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div className="flex items-start gap-4">
          {/* File Icon Card */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-900 border border-white/10 shadow-inner">
            {getMediaIcon()}
          </div>

          {/* Title and Badges */}
          <div className="space-y-1.5">
            <h2 className="text-lg sm:text-xl font-bold text-white break-all leading-snug">
              {fileInfo.fileName}
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              {/* File size badge */}
              <span className="inline-flex items-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">
                {fileInfo.fileSizeFormatted}
              </span>

              {/* Media Type badge */}
              <span className="inline-flex items-center rounded-lg bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-300 border border-white/5 uppercase">
                {fileInfo.mediaType}
              </span>

              {/* Direct status */}
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Siap Unduh Langsung
              </span>

              {fileInfo.isConfirmRequired && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                  <AlertTriangle className="h-3 w-3" />
                  Auto Virus Bypass
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
          {/* Direct Download Button */}
          <a
            href={fileInfo.directUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={fileInfo.fileName}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40 transition-all text-sm"
          >
            <Download className="h-4 w-4" />
            <span>Download Langsung</span>
          </a>

          {/* Preview Button (If playable / viewable) */}
          {fileInfo.canPreview && (
            <button
              type="button"
              onClick={() => onOpenPreview(fileInfo)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/90 px-5 py-3.5 font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all text-sm shadow-sm"
            >
              {['video', 'audio'].includes(fileInfo.mediaType) ? (
                <>
                  <Play className="h-4 w-4 text-cyan-400 fill-cyan-400" />
                  <span>Putar Media</span>
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 text-cyan-400" />
                  <span>{fileInfo.mediaType === 'pdf' ? 'Lihat Dokumen' : 'Pratinjau'}</span>
                </>
              )}
            </button>
          )}

          {/* Copy Direct Link Button */}
          <button
            type="button"
            onClick={() => copyToClipboard(fileInfo.directUrl, 'link')}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/90 px-4 py-3.5 font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all text-sm"
            title="Salin Direct Link"
          >
            {copiedLink ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline">Salin Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Developer & Downloader Tools Tabs */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span>DOWNLOAD COMMANDS &amp; DIRECT URL:</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/5 text-xs">
            <button
              onClick={() => setActiveTab('link')}
              className={`px-2.5 py-1 rounded-lg transition ${
                activeTab === 'link'
                  ? 'bg-cyan-500 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Direct URL
            </button>
            <button
              onClick={() => setActiveTab('curl')}
              className={`px-2.5 py-1 rounded-lg transition ${
                activeTab === 'curl'
                  ? 'bg-cyan-500 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              cURL
            </button>
            <button
              onClick={() => setActiveTab('aria')}
              className={`px-2.5 py-1 rounded-lg transition ${
                activeTab === 'aria'
                  ? 'bg-cyan-500 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Aria2 / IDM
            </button>
          </div>
        </div>

        {/* Code / Link Box */}
        <div className="relative rounded-2xl border border-white/10 bg-slate-950 p-4 font-mono text-xs">
          {activeTab === 'link' && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-cyan-300 break-all select-all font-mono">
                {fileInfo.directUrl}
              </span>
              <button
                onClick={() => copyToClipboard(fileInfo.directUrl, 'link')}
                className="shrink-0 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              >
                {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          )}

          {activeTab === 'curl' && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-emerald-300 break-all select-all font-mono">
                {curlCommand}
              </span>
              <button
                onClick={() => copyToClipboard(curlCommand, 'curl')}
                className="shrink-0 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              >
                {copiedCurl ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          )}

          {activeTab === 'aria' && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-purple-300 break-all select-all font-mono">
                {ariaCommand}
              </span>
              <button
                onClick={() => copyToClipboard(ariaCommand, 'aria')}
                className="shrink-0 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              >
                {copiedAria ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
