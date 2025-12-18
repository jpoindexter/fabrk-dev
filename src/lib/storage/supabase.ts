/**
 * Supabase Storage Provider
 *
 * Integrated with Supabase, easy auth integration
 *
 * Setup:
 *   1. Create bucket in Supabase dashboard
 *   2. Add SUPABASE_URL, SUPABASE_ANON_KEY to .env
 */

import type { StorageProviderClient, UploadOptions, UploadResult } from './index';

function getConfig() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url) throw new Error('SUPABASE_URL is required');
  if (!anonKey) throw new Error('SUPABASE_ANON_KEY is required');

  return { url, anonKey };
}

export class SupabaseStorageProvider implements StorageProviderClient {
  async upload(options: UploadOptions): Promise<UploadResult> {
    const config = getConfig();
    const bucket = options.bucket || 'uploads';
    const key = options.path ? options.path + '/' + options.filename : options.filename;

    let body: Buffer | Blob;
    if (Buffer.isBuffer(options.file)) {
      body = options.file;
    } else if (options.file instanceof Blob) {
      body = options.file;
    } else {
      throw new Error('ReadableStream not supported');
    }

    const res = await fetch(
      config.url + '/storage/v1/object/' + bucket + '/' + key,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + config.anonKey,
          'apikey': config.anonKey,
          'Content-Type': options.contentType || 'application/octet-stream',
          'x-upsert': 'true',
        },
        body,
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Supabase upload error: ' + res.status + ' - ' + error);
    }

    const publicUrl = config.url + '/storage/v1/object/public/' + bucket + '/' + key;

    return {
      url: publicUrl,
      key,
      size: Buffer.isBuffer(body) ? body.length : undefined,
    };
  }

  async delete(key: string, bucket?: string): Promise<void> {
    const config = getConfig();
    bucket = bucket || 'uploads';

    await fetch(
      config.url + '/storage/v1/object/' + bucket + '/' + key,
      {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + config.anonKey,
          'apikey': config.anonKey,
        },
      }
    );
  }

  async getUrl(key: string, bucket?: string): Promise<string> {
    const config = getConfig();
    bucket = bucket || 'uploads';
    return config.url + '/storage/v1/object/public/' + bucket + '/' + key;
  }

  async list(prefix?: string, bucket?: string): Promise<string[]> {
    const config = getConfig();
    bucket = bucket || 'uploads';

    const res = await fetch(
      config.url + '/storage/v1/object/list/' + bucket,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + config.anonKey,
          'apikey': config.anonKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prefix: prefix || '',
          limit: 1000,
        }),
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.map((item: any) => item.name);
  }
}
