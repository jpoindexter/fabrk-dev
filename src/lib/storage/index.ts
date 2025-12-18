/**
 * Storage Providers - Unified Interface
 *
 * Supports: Cloudflare R2, AWS S3, Supabase Storage, UploadThing, Vercel Blob
 *
 * Usage:
 *   import { upload, getStorageProvider } from '@/lib/storage'
 */

export type StorageProvider = 'r2' | 's3' | 'supabase' | 'uploadthing' | 'vercel-blob';

export interface UploadOptions {
  file: Buffer | Blob | ReadableStream;
  filename: string;
  contentType?: string;
  bucket?: string;
  path?: string;
  public?: boolean;
}

export interface UploadResult {
  url: string;
  key: string;
  size?: number;
}

export interface StorageProviderClient {
  upload(options: UploadOptions): Promise<UploadResult>;
  delete(key: string, bucket?: string): Promise<void>;
  getUrl(key: string, bucket?: string): Promise<string>;
  list?(prefix?: string, bucket?: string): Promise<string[]>;
}

// Re-export individual providers
export { R2Provider } from './r2';
export { S3Provider } from './s3';
export { SupabaseStorageProvider } from './supabase';
export { UploadThingProvider } from './uploadthing';
export { VercelBlobProvider } from './vercel-blob';

/**
 * Get storage provider based on environment config
 */
export function getStorageProvider(): StorageProviderClient {
  const provider = process.env.STORAGE_PROVIDER as StorageProvider || 'r2';

  switch (provider) {
    case 'r2':
      return new (require('./r2').R2Provider)();
    case 's3':
      return new (require('./s3').S3Provider)();
    case 'supabase':
      return new (require('./supabase').SupabaseStorageProvider)();
    case 'uploadthing':
      return new (require('./uploadthing').UploadThingProvider)();
    case 'vercel-blob':
      return new (require('./vercel-blob').VercelBlobProvider)();
    default:
      throw new Error('Unknown storage provider: ' + provider);
  }
}

/**
 * Upload a file using the configured provider
 */
export async function upload(options: UploadOptions): Promise<UploadResult> {
  const provider = getStorageProvider();
  return provider.upload(options);
}
