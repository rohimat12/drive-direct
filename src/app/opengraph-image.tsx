import { ImageResponse } from 'next/og';

export const alt = 'DriveDirect — Google Drive Direct Link Generator & Stream Downloader';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #030712 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Glow ambient circle */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: '9999px',
            background: 'rgba(6, 182, 212, 0.25)',
            filter: 'blur(100px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '9999px',
            background: 'rgba(59, 130, 246, 0.25)',
            filter: 'blur(100px)',
          }}
        />

        {/* Logo Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(6, 182, 212, 0.4)',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <span style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-1px' }}>
            Drive<span style={{ color: '#38bdf8' }}>Direct</span>
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 800,
            textAlign: 'center',
            maxWidth: 1000,
            lineHeight: 1.15,
            letterSpacing: '-1px',
            marginBottom: '20px',
          }}
        >
          Google Drive Direct Link Generator &amp; Stream Downloader
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
            marginBottom: '36px',
          }}
        >
          Unduh file tanpa batasan preview, inspect metadata, dan putar media langsung di peramban.
        </div>

        {/* Feature Badges */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: 18,
              color: '#38bdf8',
            }}
          >
            ⚡ 1-Click Direct CDN
          </div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: 18,
              color: '#4ade80',
            }}
          >
            🛡️ Auto Virus Bypass
          </div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: 18,
              color: '#c084fc',
            }}
          >
            📄 HTML5 Canvas PDF
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
