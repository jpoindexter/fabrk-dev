/**
 * UploadThing Storage Provider
 *
 * Simple, type-safe file uploads for Next.js
 *
 * Setup:
 *   1. Create account at uploadthing.com
 *   2. Add UPLOADTHING_SECRET to .env
 */

import type { StorageProviderClient, UploadOptions, UploadResult } from './index';

const API_BASE = 'https://uploadthing.com/api';

function getConfig() {
  const secret = process.env.UPLOADTHING_SECRET;
  if (!secret) throw new Error('UPLOADTHING_SECRET is required');
  return { secret };
}

export class UploadThingProvider implements StorageProviderClient {
  async upload(options: UploadOptions): Promise<UploadResult> {
    const config = getConfig();

    let fileBuffer: Buffer;
    if (Buffer.isBuffer(options.file)) {
      fileBuffer = options.file;
    } else if (options.file instanceof Blob) {
      fileBuffer = Buffer.from(await options.file.arrayBuffer());
    } else {
      throw new Error('ReadableStream not supported');
    }

    // Request presigned URL
    const presignRes = await fetch(API_BASE + '/uploadFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-uploadthing-api-key': config.secret,
      },
      body: JSON.stringify({
        files: [{
          name: options.filename,
          size: fileBuffer.length,
          type: options.contentType || 'application/octet-stream',
        }],
        acl: options.public ? 'public-read' : undefined,
      }),
    });

    if (!presignRes.ok) {
      const error = await presignRes.text();
      throw new Error('UploadThing presign error: ' + presignRes.status + ' - ' + error);
    }

    const presignData = await presignRes.json();
    const uploadUrl = presignData.data?.[0]?.url;
    const fields = presignData.data?.[0]?.fields || {};
    const fileKey = presignData.data?.[0]?.key;

    if (!uploadUrl) {
      throw new Error('No upload URL returned');
    }

    // Upload file using presigned URL
    const formData = new FormData();
    Object.entries(fields).forEach(([k, v]) => formData.append(k, v as string));
    // Convert Buffer to Uint8Array for Blob compatibility
    formData.append('file', new Blob([new Uint8Array(fileBuffer)]));

    const uploadRes = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!uploadRes.ok) {
      const error = await uploadRes.text();
      throw new Error('UploadThing upload error: ' + uploadRes.status + ' - ' + error);
    }

    return {
      url: 'https://utfs.io/f/' + fileKey,
      key: fileKey,
      size: fileBuffer.length,
    };
  }

  async delete(key: string): Promise<void> {
    const config = getConfig();

    await fetch(API_BASE + '/deleteFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-uploadthing-api-key': config.secret,
      },
      body: JSON.stringify({ fileKey: key }),
    });
  }

  async getUrl(key: string): Promise<string> {
    return 'https://utfs.io/f/' + key;
  }
}
