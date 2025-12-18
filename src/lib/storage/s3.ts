/**
 * AWS S3 Storage Provider
 *
 * Industry standard, global CDN
 *
 * Setup:
 *   1. Create S3 bucket at s3.console.aws.amazon.com
 *   2. Add AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET to .env
 *   3. Add AWS_S3_REGION to .env
 */

import crypto from 'crypto';
import type { StorageProviderClient, UploadOptions, UploadResult } from './index';

function getConfig() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const bucket = process.env.AWS_S3_BUCKET;
  const region = process.env.AWS_S3_REGION || 'us-east-1';

  if (!accessKeyId) throw new Error('AWS_ACCESS_KEY_ID is required');
  if (!secretAccessKey) throw new Error('AWS_SECRET_ACCESS_KEY is required');
  if (!bucket) throw new Error('AWS_S3_BUCKET is required');

  return { accessKeyId, secretAccessKey, bucket, region };
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

export class S3Provider implements StorageProviderClient {
  async upload(options: UploadOptions): Promise<UploadResult> {
    const config = getConfig();
    const bucket = options.bucket || config.bucket;
    const key = options.path ? options.path + '/' + options.filename : options.filename;
    const host = bucket + '.s3.' + config.region + '.amazonaws.com';
    const endpoint = 'https://' + host + '/' + key;

    let body: Buffer;
    if (Buffer.isBuffer(options.file)) {
      body = options.file;
    } else if (options.file instanceof Blob) {
      body = Buffer.from(await options.file.arrayBuffer());
    } else {
      throw new Error('ReadableStream not supported');
    }

    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.slice(0, 8);

    const payloadHash = crypto.createHash('sha256').update(body).digest('hex');
    const canonicalHeaders = 'host:' + host + '\nx-amz-content-sha256:' + payloadHash + '\nx-amz-date:' + amzDate + '\n';
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
    const canonicalRequest = 'PUT\n/' + key + '\n\n' + canonicalHeaders + '\n' + signedHeaders + '\n' + payloadHash;

    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = dateStamp + '/' + config.region + '/s3/aws4_request';
    const stringToSign = algorithm + '\n' + amzDate + '\n' + credentialScope + '\n' + crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    const signingKey = getSignatureKey(config.secretAccessKey, dateStamp, config.region, 's3');
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
      // Convert Buffer to Uint8Array for fetch compatibility
      body: new Uint8Array(body),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('S3 upload error: ' + res.status + ' - ' + error);
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
    const host = bucket + '.s3.' + config.region + '.amazonaws.com';
    const endpoint = 'https://' + host + '/' + key;

    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.slice(0, 8);

    const payloadHash = crypto.createHash('sha256').update('').digest('hex');
    const canonicalHeaders = 'host:' + host + '\nx-amz-content-sha256:' + payloadHash + '\nx-amz-date:' + amzDate + '\n';
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
    const canonicalRequest = 'DELETE\n/' + key + '\n\n' + canonicalHeaders + '\n' + signedHeaders + '\n' + payloadHash;

    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = dateStamp + '/' + config.region + '/s3/aws4_request';
    const stringToSign = algorithm + '\n' + amzDate + '\n' + credentialScope + '\n' + crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    const signingKey = getSignatureKey(config.secretAccessKey, dateStamp, config.region, 's3');
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
    return 'https://' + bucket + '.s3.' + config.region + '.amazonaws.com/' + key;
  }
}
