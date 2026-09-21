import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('id');
  const confirm = searchParams.get('confirm') || '';
  const isInline = searchParams.get('inline') === 'true' || searchParams.has('inline');

  if (!fileId) {
    return new NextResponse('File ID parameter missing', { status: 400 });
  }

  const directUrl = confirm
    ? `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=${confirm}`
    : `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;

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

    // Default to accept-ranges
    if (!responseHeaders.has('accept-ranges')) {
      responseHeaders.set('accept-ranges', 'bytes');
    }

    // Extract filename from disposition if available
    const disposition = upstreamRes.headers.get('content-disposition') || '';
    const filenameMatch = disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
    const fileName = filenameMatch ? decodeURIComponent(filenameMatch[1].replace(/["']/g, '')) : '';

    // If inline viewing or PDF requested
    if (isInline || fileName.toLowerCase().endsWith('.pdf')) {
      if (fileName.toLowerCase().endsWith('.pdf')) {
        responseHeaders.set('content-type', 'application/pdf');
        responseHeaders.set('content-disposition', `inline; filename="${fileName}"`);
      } else if (fileName.toLowerCase().endsWith('.mp4')) {
        responseHeaders.set('content-type', 'video/mp4');
        responseHeaders.set('content-disposition', `inline; filename="${fileName}"`);
      } else {
        responseHeaders.set('content-disposition', `inline; filename="${fileName}"`);
      }
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
