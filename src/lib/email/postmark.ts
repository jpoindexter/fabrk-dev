/**
 * Postmark Email Provider
 *
 * Best deliverability, transactional focus
 *
 * Setup:
 *   1. Create account at postmarkapp.com
 *   2. Add POSTMARK_API_KEY to .env
 *   3. Verify your domain
 */

import type { EmailProviderClient, EmailOptions, EmailResult } from './index';

const API_BASE = 'https://api.postmarkapp.com';

function getConfig() {
  const apiKey = process.env.POSTMARK_API_KEY;
  if (!apiKey) throw new Error('POSTMARK_API_KEY is required');
  return { apiKey };
}

export class PostmarkProvider implements EmailProviderClient {
  async send(options: EmailOptions): Promise<EmailResult> {
    const config = getConfig();

    const res = await fetch(`${API_BASE}/email`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': config.apiKey,
      },
      body: JSON.stringify({
        From: options.from || 'noreply@yourdomain.com',
        To: Array.isArray(options.to) ? options.to.join(',') : options.to,
        Subject: options.subject,
        HtmlBody: options.html,
        TextBody: options.text,
        ReplyTo: options.replyTo,
        Cc: options.cc?.join(','),
        Bcc: options.bcc?.join(','),
        Attachments: options.attachments?.map((a) => ({
          Name: a.filename,
          Content: typeof a.content === 'string' ? a.content : a.content.toString('base64'),
          ContentType: a.contentType || 'application/octet-stream',
        })),
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Postmark error: ${res.status} - ${error}`);
    }

    const data = await res.json();
    return {
      id: data.MessageID,
      success: true,
    };
  }

  async sendBatch(emails: EmailOptions[]): Promise<EmailResult[]> {
    const config = getConfig();

    const res = await fetch(`${API_BASE}/email/batch`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': config.apiKey,
      },
      body: JSON.stringify(
        emails.map((options) => ({
          From: options.from || 'noreply@yourdomain.com',
          To: Array.isArray(options.to) ? options.to.join(',') : options.to,
          Subject: options.subject,
          HtmlBody: options.html,
          TextBody: options.text,
        }))
      ),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Postmark batch error: ${res.status} - ${error}`);
    }

    const data = await res.json();
    return data.map((d: any) => ({
      id: d.MessageID,
      success: d.ErrorCode === 0,
    }));
  }
}
