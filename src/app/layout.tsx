import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DriveDirect — Google Drive Direct Link Generator & Stream Downloader',
  description:
    'Konversi link Google Drive menjadi direct download link 1-klik, inspect ukuran file & nama asli, serta putar media langsung di browser tanpa ribet.',
  keywords: [
    'google drive direct link',
    'gdrive direct download',
    'google drive bypass preview',
    'idm link generator',
    'drive direct stream',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
