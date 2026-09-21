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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://drive-direct-xi.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DriveDirect — Google Drive Direct Link Generator & Stream Downloader',
    template: '%s | DriveDirect',
  },
  description:
    'Konversi link Google Drive menjadi direct download link 1-klik, bypass batas preview, inspect nama & ukuran file asli, serta putar video dan dokumen PDF langsung di browser.',
  applicationName: 'DriveDirect',
  authors: [{ name: 'DriveDirect Team' }],
  generator: 'Next.js 16',
  keywords: [
    'google drive direct link',
    'gdrive direct download',
    'google drive bypass preview',
    'idm link generator',
    'drive direct stream',
    'google drive pdf viewer',
    'google drive video player',
    'direct link generator',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DriveDirect — Google Drive Direct Link Generator & Stream Downloader',
    description:
      'Konversi link Google Drive menjadi direct download link 1-klik, bypass batas preview, inspect nama & ukuran file asli, serta putar video dan dokumen PDF langsung di browser.',
    url: siteUrl,
    siteName: 'DriveDirect',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DriveDirect — Google Drive Direct Link Generator & Stream Downloader',
    description:
      'Unduh file Google Drive tanpa batasan preview, inspect ukuran file & nama asli, dan putar media langsung di peramban.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'DriveDirect',
  url: siteUrl,
  description:
    'Aplikasi web untuk mengonversi link Google Drive publik menjadi direct download link 1-klik dengan pemutar media dan PDF viewer in-app.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    '1-Click Google Drive Direct CDN Download',
    'Automatic Large File Virus Scan Bypass',
    'In-App Video & Audio Streaming with Range Seeking',
    'HTML5 Canvas PDF Document Viewer',
    'cURL, Wget, and Aria2/IDM Command Generator',
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
