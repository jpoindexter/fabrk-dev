/**
 * Cloudflare R2 Storage Provider
 *
 * S3-compatible, zero egress fees
 *
 * Setup:
 *   1. Create R2 bucket at dash.cloudflare.com
 *   2. Add R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET to .env
 *   3. Add R2_ACCOUNT_ID to .env
 */

import crypto from 'crypto';
import type { StorageProviderClient, UploadOptions, UploadResult } from './index';

function getConfig() {
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET;
  const accountId = process.env.R2_ACCOUNT_ID;

  if (!accessKeyId) throw new Error('R2_ACCESS_KEY_ID is required');
  if (!secretAccessKey) throw new Error('R2_SECRET_ACCESS_KEY is required');
  if (!bucket) throw new Error('R2_BUCKET is required');
  if (!accountId) throw new Error('R2_ACCOUNT_ID is required');

  return { accessKeyId, secretAccessKey, bucket, accountId };
}

function sign(key: Buffer, msg: string): Buffer {
  return crypto.createHmac('sha256', key).update(msg).digest();
}

function getSignatureKey(secretKey: string, dateStamp: string, region: string, service: string): Buffer {
  const kDate = sign(Buffer.from('AWS4' + secretKey), dateStamp);
  const kRegion = sign(kDate, region);
  const kService = sign(kRegion, service);
  return sign(kService, 'aws4_request');
}

export class R2Provider implements StorageProviderClient {
  async upload(options: UploadOptions): Promise<UploadResult> {
    const config = getConfig();
    const bucket = options.bucket || config.bucket;
    const key = options.path ? options.path + '/' + options.filename : options.filename;
    const host = config.accountId + '.r2.cloudflarestorage.com';
    const endpoint = 'https://' + host + '/' + bucket + '/' + key;

    // Convert file to buffer
    let body: Buffer;
    if (Buffer.isBuffer(options.file)) {
      body = options.file;
    } else if (options.file instanceof Blob) {
      body = Buffer.from(await options.file.arrayBuffer());
    } else {
      throw new Error('ReadableStream not supported, convert to Buffer first');
    }

    // AWS Signature V4
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.slice(0, 8);
    const region = 'auto';
    const service = 's3';

    const payloadHash = crypto.createHash('sha256').update(body).digest('hex');
    const canonicalHeaders = 'host:' + host + '\nx-amz-content-sha256:' + payloadHash + '\nx-amz-date:' + amzDate + '\n';
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
    const canonicalRequest = 'PUT\n/' + bucket + '/' + key + '\n\n' + canonicalHeaders + '\n' + signedHeaders + '\n' + payloadHash;

    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = dateStamp + '/' + region + '/' + service + '/aws4_request';
    const stringToSign = algorithm + '\n' + amzDate + '\n' + credentialScope + '\n' + crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    const signingKey = getSignatureKey(config.secretAccessKey, dateStamp, region, service);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    const authorizationHeader = algorithm + ' Credential=' + config.accessKeyId + '/' + credentialScope + ', SignedHeaders=' + signedHeaders + ', Signature=' + signature;

    const res = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Authorization': authorizationHeader,
        'x-amz-date': amzDate,
        'x-amz-content-sha256': payloadHash,
        'Content-Type': options.contentType || 'application/octet-stream',
      },
      body,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('R2 upload error: ' + res.status + ' - ' + error);
    }

    return {
      url: endpoint,
      key,
      size: body.length,
    };
  }

  async delete(key: string, bucket?: string): Promise<void> {
    const config = getConfig();
    bucket = bucket || config.bucket;
    
    // Similar signing logic for DELETE request
    const host = config.accountId + '.r2.cloudflarestorage.com';
    const endpoint = 'https://' + host + '/' + bucket + '/' + key;

    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.slice(0, 8);
    const region = 'auto';
    const service = 's3';

    const payloadHash = crypto.createHash('sha256').update('').digest('hex');
    const canonicalHeaders = 'host:' + host + '\nx-amz-content-sha256:' + payloadHash + '\nx-amz-date:' + amzDate + '\n';
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
    const canonicalRequest = 'DELETE\n/' + bucket + '/' + key + '\n\n' + canonicalHeaders + '\n' + signedHeaders + '\n' + payloadHash;

    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = dateStamp + '/' + region + '/' + service + '/aws4_request';
    const stringToSign = algorithm + '\n' + amzDate + '\n' + credentialScope + '\n' + crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    const signingKey = getSignatureKey(config.secretAccessKey, dateStamp, region, service);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    const authorizationHeader = algorithm + ' Credential=' + config.accessKeyId + '/' + credentialScope + ', SignedHeaders=' + signedHeaders + ', Signature=' + signature;

    await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Authorization': authorizationHeader,
        'x-amz-date': amzDate,
        'x-amz-content-sha256': payloadHash,
      },
    });
  }

  async getUrl(key: string, bucket?: string): Promise<string> {
    const config = getConfig();
    bucket = bucket || config.bucket;
    const publicUrl = process.env.R2_PUBLIC_URL;
    
    if (publicUrl) {
      return publicUrl + '/' + key;
    }
    
    return 'https://' + config.accountId + '.r2.cloudflarestorage.com/' + bucket + '/' + key;
  }
}
