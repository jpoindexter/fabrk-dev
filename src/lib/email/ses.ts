/**
 * AWS SES Email Provider
 *
 * Cheapest at scale, requires more setup
 *
 * Setup:
 *   1. Create AWS account
 *   2. Add AWS_SES_ACCESS_KEY, AWS_SES_SECRET_KEY, AWS_SES_REGION to .env
 *   3. Verify your domain in SES console
 */

import type { EmailProviderClient, EmailOptions, EmailResult } from './index';
import crypto from 'crypto';

function getConfig() {
  const accessKey = process.env.AWS_SES_ACCESS_KEY;
  const secretKey = process.env.AWS_SES_SECRET_KEY;
  const region = process.env.AWS_SES_REGION || 'us-east-1';

  if (!accessKey) throw new Error('AWS_SES_ACCESS_KEY is required');
  if (!secretKey) throw new Error('AWS_SES_SECRET_KEY is required');

  return { accessKey, secretKey, region };
}

function sign(key: Buffer, msg: string): Buffer {
  return crypto.createHmac('sha256', key).update(msg).digest();
}

function getSignatureKey(secretKey: string, dateStamp: string, region: string, service: string): Buffer {
  const kDate = sign(Buffer.from('AWS4' + secretKey), dateStamp);
  const kRegion = sign(kDate, region);
  const kService = sign(kRegion, service);
  const kSigning = sign(kService, 'aws4_request');
  return kSigning;
}

export class SESProvider implements EmailProviderClient {
  async send(options: EmailOptions): Promise<EmailResult> {
    const config = getConfig();
    const toArray = Array.isArray(options.to) ? options.to : [options.to];

    // Build the SES API request
    const params = new URLSearchParams();
    params.append('Action', 'SendEmail');
    params.append('Version', '2010-12-01');
    params.append('Source', options.from || 'noreply@yourdomain.com');
    
    toArray.forEach((email, idx) => {
      params.append('Destination.ToAddresses.member.' + (idx + 1), email);
    });

    options.cc?.forEach((email, idx) => {
      params.append('Destination.CcAddresses.member.' + (idx + 1), email);
    });

    options.bcc?.forEach((email, idx) => {
      params.append('Destination.BccAddresses.member.' + (idx + 1), email);
    });

    params.append('Message.Subject.Data', options.subject);
    params.append('Message.Subject.Charset', 'UTF-8');

    if (options.html) {
      params.append('Message.Body.Html.Data', options.html);
      params.append('Message.Body.Html.Charset', 'UTF-8');
    }

    if (options.text) {
      params.append('Message.Body.Text.Data', options.text);
      params.append('Message.Body.Text.Charset', 'UTF-8');
    }

    if (options.replyTo) {
      params.append('ReplyToAddresses.member.1', options.replyTo);
    }

    // Sign the request (AWS Signature Version 4)
    const host = 'email.' + config.region + '.amazonaws.com';
    const endpoint = 'https://' + host;
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.slice(0, 8);
    const body = params.toString();

    const canonicalHeaders = 'content-type:application/x-www-form-urlencoded\nhost:' + host + '\nx-amz-date:' + amzDate + '\n';
    const signedHeaders = 'content-type;host;x-amz-date';
    const payloadHash = crypto.createHash('sha256').update(body).digest('hex');
    const canonicalRequest = 'POST\n/\n\n' + canonicalHeaders + '\n' + signedHeaders + '\n' + payloadHash;
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = dateStamp + '/' + config.region + '/ses/aws4_request';
    const stringToSign = algorithm + '\n' + amzDate + '\n' + credentialScope + '\n' + crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    const signingKey = getSignatureKey(config.secretKey, dateStamp, config.region, 'ses');
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    const authorizationHeader = algorithm + ' Credential=' + config.accessKey + '/' + credentialScope + ', SignedHeaders=' + signedHeaders + ', Signature=' + signature;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Amz-Date': amzDate,
        'Authorization': authorizationHeader,
      },
      body,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error('SES error: ' + res.status + ' - ' + error);
    }

    const text = await res.text();
    const messageIdMatch = text.match(/<MessageId>(.+?)<\/MessageId>/);

    return {
      id: messageIdMatch?.[1] || '',
      success: true,
    };
  }
}
