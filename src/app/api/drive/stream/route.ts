import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('id');
  const confirm = searchParams.get('confirm') || '';
  const uuid = searchParams.get('uuid') || '';
  const isInline = searchParams.get('inline') === 'true' || searchParams.has('inline');
  const isDownload = searchParams.get('download') === 'true';

  if (!fileId) {
    return new NextResponse('File ID parameter missing', { status: 400 });
  }

  // Construct target usercontent URL including confirm & uuid if present
  let directUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
  if (confirm) {
    directUrl += `&confirm=${encodeURIComponent(confirm)}`;
  }
  if (uuid) {
    directUrl += `&uuid=${encodeURIComponent(uuid)}`;
  }

  const clientRange = req.headers.get('range');
  const headers: Record<string, string> = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  };

  if (clientRange) {
    headers['Range'] = clientRange;
  }

  try {
    const upstreamRes = await fetch(directUrl, {
      headers,
      redirect: 'follow',
    });

    if (!upstreamRes.ok && upstreamRes.status !== 206) {
      return new NextResponse(`Google Drive returned ${upstreamRes.statusText}`, {
        status: upstreamRes.status,
      });
    }

    const responseHeaders = new Headers();
    const forwardHeaders = [
      'content-type',
      'content-length',
      'content-range',
      'accept-ranges',
      'content-disposition',
    ];

    for (const h of forwardHeaders) {
      const val = upstreamRes.headers.get(h);
      if (val) responseHeaders.set(h, val);
    }

    if (!responseHeaders.has('accept-ranges')) {
      responseHeaders.set('accept-ranges', 'bytes');
    }

    // Extract filename from disposition if available
    const disposition = upstreamRes.headers.get('content-disposition') || '';
    const filenameMatch = disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
    let fileName = filenameMatch ? decodeURIComponent(filenameMatch[1].replace(/["']/g, '')) : `download_${fileId}`;

    // Clean ASCII fallback (keeps spaces intact, avoids %20 in legacy browsers) and UTF-8 encoded parameter per RFC 6266
    const asciiFallback = fileName.replace(/[^\x20-\x7E]/g, '_').replace(/"/g, '\\"');
    const utf8Encoded = encodeURIComponent(fileName);

    // If explicit download requested via proxy
    if (isDownload) {
      // Force attachment disposition so browser triggers file save dialog with exact filename
      responseHeaders.set(
        'content-disposition',
        `attachment; filename="${asciiFallback}"; filename*=UTF-8''${utf8Encoded}`
      );
    } else if (isInline || fileName.match(/\.(pdf|jpe?g|png|webp|gif|svg|mp4|webm|mp3)$/i)) {
      // If inline preview requested or known media extension
      const lower = fileName.toLowerCase();
      if (lower.endsWith('.pdf')) {
        responseHeaders.set('content-type', 'application/pdf');
      } else if (lower.endsWith('.mp4')) {
        responseHeaders.set('content-type', 'video/mp4');
      } else if (lower.endsWith('.webm')) {
        responseHeaders.set('content-type', 'video/webm');
      } else if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
        responseHeaders.set('content-type', 'image/jpeg');
      } else if (lower.endsWith('.png')) {
        responseHeaders.set('content-type', 'image/png');
      } else if (lower.endsWith('.webp')) {
        responseHeaders.set('content-type', 'image/webp');
      } else if (lower.endsWith('.gif')) {
        responseHeaders.set('content-type', 'image/gif');
      } else if (lower.endsWith('.svg')) {
        responseHeaders.set('content-type', 'image/svg+xml');
      } else if (lower.endsWith('.mp3')) {
        responseHeaders.set('content-type', 'audio/mpeg');
      }
      responseHeaders.set('content-disposition', `inline; filename="${asciiFallback}"; filename*=UTF-8''${utf8Encoded}`);
    }

    // Allow iframe embedding within our own application
    responseHeaders.delete('x-frame-options');

    return new NextResponse(upstreamRes.body as any, {
      status: upstreamRes.status,
      headers: responseHeaders,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return new NextResponse(err.message || 'Stream error', { status: 500 });
  }
}
