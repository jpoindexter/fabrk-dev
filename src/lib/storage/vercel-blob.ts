/**
 * Vercel Blob Storage Provider
 *
 * Zero config on Vercel, great for Next.js apps
 *
 * Setup:
 *   1. Add blob storage in Vercel dashboard
 *   2. Add BLOB_READ_WRITE_TOKEN to .env
 */

import type { StorageProviderClient, UploadOptions, UploadResult } from './index';

const API_BASE = 'https://blob.vercel-storage.com';

function getConfig() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is required');
  return { token };
}

export class VercelBlobProvider implements StorageProviderClient {
  async upload(options: UploadOptions): Promise<UploadResult> {
    const config = getConfig();
    const pathname = options.path ? options.path + '/' + options.filename : options.filename;

    let body: Buffer | Blob;
    if (Buffer.isBuffer(options.file)) {
      body = options.file;
    } else if (options.file instanceof Blob) {
      body = options.file;
    } else {
      throw new Error('ReadableStream not supported');
    }

    const res = await fetch(API_BASE + '/' + pathname, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + config.token,
        'Content-Type': options.contentType || 'application/octet-stream',
        'x-content-type': options.contentType || 'application/octet-stream',
        'x-cache-control-max-age': '31536000',
      },
      body,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Vercel Blob upload error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      url: data.url,
      key: data.pathname,
      size: Buffer.isBuffer(body) ? body.length : undefined,
    };
  }

  async delete(key: string): Promise<void> {
    const config = getConfig();

    await fetch(API_BASE + '/delete', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + config.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls: [key] }),
    });
  }

  async getUrl(key: string): Promise<string> {
    // Vercel Blob returns full URLs, so key might already be a URL
    if (key.startsWith('https://')) return key;
    return API_BASE + '/' + key;
  }

  async list(prefix?: string): Promise<string[]> {
    const config = getConfig();

    const params = new URLSearchParams();
    if (prefix) params.set('prefix', prefix);
    params.set('limit', '1000');

    const res = await fetch(API_BASE + '?' + params.toString(), {
      headers: { 'Authorization': 'Bearer ' + config.token },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.blobs?.map((b: any) => b.pathname) || [];
  }
}
