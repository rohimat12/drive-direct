export interface DriveFileInfo {
  fileId: string;
  fileName: string;
  fileSizeBytes: number | null;
  fileSizeFormatted: string;
  contentType: string;
  directUrl: string;
  streamUrl: string;
  mediaType: 'video' | 'audio' | 'image' | 'pdf' | 'archive' | 'code' | 'document' | 'other';
  canPreview: boolean;
  isConfirmRequired: boolean;
  confirmUrl?: string;
  status: 'ok' | 'quota_exceeded' | 'access_denied' | 'not_found' | 'error';
  errorMessage?: string;
}

export function extractFileId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // If it's already a clean ID
  if (/^[a-zA-Z0-9_-]{20,50}$/.test(trimmed)) {
    return trimmed;
  }

  // https://drive.google.com/file/d/FILE_ID/view...
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch) return fileDMatch[1];

  // ?id=FILE_ID or &id=FILE_ID
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch) return idParamMatch[1];

  // https://drive.google.com/open?id=FILE_ID
  const openMatch = trimmed.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) return openMatch[1];

  return null;
}

export function formatBytes(bytes: number | null): string {
  if (!bytes || bytes <= 0) return 'Ukuran tidak diketahui';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  let val = bytes;
  while (val >= 1024 && i < units.length - 1) {
    val /= 1024;
    i++;
  }
  return `${val.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
}

export function detectMediaType(contentType: string, fileName: string): DriveFileInfo['mediaType'] {
  const mime = contentType.toLowerCase();
  const ext = fileName.split('.').pop()?.toLowerCase() || '';

  if (mime.startsWith('video/') || ['mp4', 'mkv', 'webm', 'mov', 'avi', 'm4v'].includes(ext)) {
    return 'video';
  }
  if (mime.startsWith('audio/') || ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac'].includes(ext)) {
    return 'audio';
  }
  if (mime.startsWith('image/') || ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp'].includes(ext)) {
    return 'image';
  }
  if (mime === 'application/pdf' || ext === 'pdf') {
    return 'pdf';
  }
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'iso'].includes(ext) || mime.includes('zip') || mime.includes('compressed')) {
    return 'archive';
  }
  if (['js', 'ts', 'jsx', 'tsx', 'py', 'json', 'html', 'css', 'go', 'rs', 'c', 'cpp', 'java'].includes(ext)) {
    return 'code';
  }
  if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'md'].includes(ext) || mime.includes('word') || mime.includes('sheet')) {
    return 'document';
  }
  return 'other';
}

export async function inspectGoogleDriveFile(fileId: string): Promise<DriveFileInfo> {
  const directCdnUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
  const initialUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  const defaultDirectUrl = directCdnUrl;
  const streamUrl = `/api/drive/stream?id=${fileId}`;

  try {
    const res = await fetch(initialUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'manual',
    });

    let targetUrl = initialUrl;
    let finalRes: Response;
    let cookieHeader = '';

    // Collect set-cookies if any
    const cookies = res.headers.getSetCookie ? res.headers.getSetCookie() : [];
    cookieHeader = cookies.map((c) => c.split(';')[0]).join('; ');

    if (res.status >= 300 && res.status < 400) {
      targetUrl = res.headers.get('location') || directCdnUrl;
      finalRes = await fetch(targetUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        redirect: 'follow',
      });
    } else {
      finalRes = res;
    }

    const contentType = finalRes.headers.get('content-type') || 'application/octet-stream';
    const disposition = finalRes.headers.get('content-disposition') || '';
    const contentLengthStr = finalRes.headers.get('content-length');
    const fileSizeBytes = contentLengthStr ? parseInt(contentLengthStr, 10) : null;

    // Check if it returned an HTML page (meaning virus warning or error page)
    if (contentType.includes('text/html')) {
      const htmlText = await finalRes.text();

      // Check quota exceeded
      if (
        htmlText.includes('download quota') ||
        htmlText.includes('Download quota is exceeded') ||
        htmlText.includes('Too many users have viewed or downloaded')
      ) {
        return {
          fileId,
          fileName: `file_${fileId}`,
          fileSizeBytes: null,
          fileSizeFormatted: 'Limit Tercapai',
          contentType: 'text/html',
          directUrl: defaultDirectUrl,
          streamUrl,
          mediaType: 'other',
          canPreview: false,
          isConfirmRequired: false,
          status: 'quota_exceeded',
          errorMessage: 'Kuota unduhan file telah terlampaui (Google Drive traffic quota exceeded). Silakan coba lagi nanti atau buat salinan file ke Drive Anda.',
        };
      }

      // Check Access Denied / Sign In Required
      if (
        htmlText.includes('You need access') ||
        htmlText.includes('Sign in to continue') ||
        htmlText.includes('Ask for access')
      ) {
        return {
          fileId,
          fileName: `file_${fileId}`,
          fileSizeBytes: null,
          fileSizeFormatted: 'Perlu Akses',
          contentType: 'text/html',
          directUrl: defaultDirectUrl,
          streamUrl,
          mediaType: 'other',
          canPreview: false,
          isConfirmRequired: false,
          status: 'access_denied',
          errorMessage: 'File ini bersifat privat / tidak dibagikan untuk publik. Pemilik file harus mengubah izin ke "Anyone with the link".',
        };
      }

      // Check 404 / File Not Found
      if (
        htmlText.includes("File not found") ||
        htmlText.includes("We're sorry, but the requested URL was not found") ||
        finalRes.status === 404
      ) {
        return {
          fileId,
          fileName: `file_${fileId}`,
          fileSizeBytes: null,
          fileSizeFormatted: 'Tidak Ditemukan',
          contentType: 'text/html',
          directUrl: defaultDirectUrl,
          streamUrl,
          mediaType: 'other',
          canPreview: false,
          isConfirmRequired: false,
          status: 'not_found',
          errorMessage: 'File tidak ditemukan di Google Drive atau telah dihapus oleh pemiliknya.',
        };
      }

      // Check Virus Warning (Large file warning)
      const isVirusWarning =
        htmlText.includes("Google Drive can't scan this file for viruses") ||
        htmlText.includes("download_warning") ||
        htmlText.includes("confirm=");

      if (isVirusWarning) {
        // Extract confirm token or form action
        let confirmUrl = defaultDirectUrl;
        const confirmTokenMatch = htmlText.match(/name="confirm"\s+value="([^"]+)"/) || htmlText.match(/confirm=([0-9a-zA-Z_-]+)/);
        const uuidMatch = htmlText.match(/name="uuid"\s+value="([^"]+)"/);

        if (confirmTokenMatch) {
          const confirmToken = confirmTokenMatch[1];
          confirmUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=${confirmToken}${uuidMatch ? `&uuid=${uuidMatch[1]}` : ''}`;
        } else {
          confirmUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
        }

        // Try to parse filename from title or span
        let extractedName = `large_file_${fileId}`;
        const titleMatch = htmlText.match(/<title>(.*?) - Google Drive<\/title>/i) || htmlText.match(/class="uc-name-size"[^>]*><a[^>]*>(.*?)<\/a>/i);
        if (titleMatch && titleMatch[1]) {
          extractedName = titleMatch[1].trim();
        }

        const mediaType = detectMediaType('', extractedName);

        return {
          fileId,
          fileName: extractedName,
          fileSizeBytes: null,
          fileSizeFormatted: '> 100 MB (File Besar)',
          contentType: 'application/octet-stream',
          directUrl: confirmUrl,
          streamUrl,
          mediaType,
          canPreview: ['video', 'audio', 'image', 'pdf'].includes(mediaType),
          isConfirmRequired: true,
          confirmUrl,
          status: 'ok',
        };
      }
    }

    // Direct download file stream detected!
    let fileName = `download_${fileId}`;
    const filenameMatch = disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
    if (filenameMatch && filenameMatch[1]) {
      fileName = decodeURIComponent(filenameMatch[1].replace(/["']/g, ''));
    }

    let resolvedContentType = contentType;
    if (fileName.toLowerCase().endsWith('.pdf') && resolvedContentType.includes('octet-stream')) {
      resolvedContentType = 'application/pdf';
    } else if (fileName.toLowerCase().endsWith('.mp4') && resolvedContentType.includes('octet-stream')) {
      resolvedContentType = 'video/mp4';
    }

    const mediaType = detectMediaType(resolvedContentType, fileName);

    return {
      fileId,
      fileName,
      fileSizeBytes,
      fileSizeFormatted: formatBytes(fileSizeBytes),
      contentType: resolvedContentType,
      directUrl: targetUrl.startsWith('http') ? targetUrl : defaultDirectUrl,
      streamUrl,
      mediaType,
      canPreview: ['video', 'audio', 'image', 'pdf'].includes(mediaType),
      isConfirmRequired: false,
      status: 'ok',
    };
  } catch (err: unknown) {
    const error = err as Error;
    return {
      fileId,
      fileName: `file_${fileId}`,
      fileSizeBytes: null,
      fileSizeFormatted: 'Error',
      contentType: 'unknown',
      directUrl: defaultDirectUrl,
      streamUrl,
      mediaType: 'other',
      canPreview: false,
      isConfirmRequired: false,
      status: 'error',
      errorMessage: error.message || 'Gagal menghubungi server Google Drive.',
    };
  }
}
