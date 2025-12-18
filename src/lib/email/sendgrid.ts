/**
 * SendGrid Email Provider
 *
 * High volume, marketing + transactional
 *
 * Setup:
 *   1. Create account at sendgrid.com
 *   2. Add SENDGRID_API_KEY to .env
 *   3. Verify your domain
 */

import type { EmailProviderClient, EmailOptions, EmailResult } from './index';

const API_BASE = 'https://api.sendgrid.com/v3';

function getConfig() {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) throw new Error('SENDGRID_API_KEY is required');
  return { apiKey };
}

export class SendGridProvider implements EmailProviderClient {
  async send(options: EmailOptions): Promise<EmailResult> {
    const config = getConfig();
    const toArray = Array.isArray(options.to) ? options.to : [options.to];

    const res = await fetch(`${API_BASE}/mail/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: toArray.map((email) => ({ email })),
            cc: options.cc?.map((email) => ({ email })),
            bcc: options.bcc?.map((email) => ({ email })),
          },
        ],
        from: { email: options.from || 'noreply@yourdomain.com' },
        reply_to: options.replyTo ? { email: options.replyTo } : undefined,
        subject: options.subject,
        content: [
          options.text ? { type: 'text/plain', value: options.text } : null,
          options.html ? { type: 'text/html', value: options.html } : null,
        ].filter(Boolean),
        attachments: options.attachments?.map((a) => ({
          content: typeof a.content === 'string' ? Buffer.from(a.content).toString('base64') : a.content.toString('base64'),
          filename: a.filename,
          type: a.contentType || 'application/octet-stream',
        })),
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`SendGrid error: ${res.status} - ${error}`);
    }

    // SendGrid returns message ID in headers
    const messageId = res.headers.get('x-message-id') || '';
    return {
      id: messageId,
      success: true,
    };
  }
}
