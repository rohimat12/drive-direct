import { NextRequest, NextResponse } from 'next/server';
import { extractFileId, inspectGoogleDriveFile } from '@/lib/drive';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Silakan masukkan URL atau ID Google Drive yang valid.' },
        { status: 400 }
      );
    }

    const fileId = extractFileId(url);
    if (!fileId) {
      return NextResponse.json(
        {
          error:
            'ID file Google Drive tidak ditemukan. Pastikan format link benar (misal: drive.google.com/file/d/... atau id=...).',
        },
        { status: 400 }
      );
    }

    const fileInfo = await inspectGoogleDriveFile(fileId);

    if (fileInfo.status !== 'ok') {
      return NextResponse.json(
        {
          error: fileInfo.errorMessage || 'Gagal memeriksa file Google Drive.',
          fileInfo,
        },
        { status: fileInfo.status === 'not_found' ? 404 : 403 }
      );
    }

    return NextResponse.json({ success: true, data: fileInfo });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API /api/drive/inspect caught error:', err);
    return NextResponse.json(
      { error: err.message || 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
