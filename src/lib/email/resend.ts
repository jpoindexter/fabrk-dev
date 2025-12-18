/**
 * Resend Email Provider
 *
 * Modern, developer-friendly, React email templates
 *
 * Setup:
 *   1. Create account at resend.com
 *   2. Add RESEND_API_KEY to .env
 *   3. Verify your domain
 */

import { Resend } from 'resend';
import type { EmailProviderClient, EmailOptions, EmailResult } from './index';

function getConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is required');
  return { apiKey };
}

export class ResendProvider implements EmailProviderClient {
  private client: Resend;

  constructor() {
    const config = getConfig();
    this.client = new Resend(config.apiKey);
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    // Build email params with required html/text content
    const { data, error } = await this.client.emails.send({
      from: options.from || 'noreply@yourdomain.com',
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html || options.text || '',
      text: options.text,
      replyTo: options.replyTo,
      cc: options.cc,
      bcc: options.bcc,
      attachments: options.attachments?.map((a) => ({
        filename: a.filename,
        content: typeof a.content === 'string' ? Buffer.from(a.content) : a.content,
      })),
    });

    if (error) {
      throw new Error(`Resend error: ${error.message}`);
    }

    return {
      id: data?.id || '',
      success: true,
    };
  }

  async sendBatch(emails: EmailOptions[]): Promise<EmailResult[]> {
    const results = await Promise.all(emails.map((e) => this.send(e)));
    return results;
  }
}
