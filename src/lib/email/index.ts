/**
 * Email Providers - Unified Interface
 *
 * Supports: Resend, Postmark, SendGrid, AWS SES, Mailgun
 *
 * Usage:
 *   import { sendEmail, getEmailProvider } from '@/lib/email'
 */

export type EmailProvider = 'resend' | 'postmark' | 'sendgrid' | 'ses' | 'mailgun';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

export interface EmailResult {
  id: string;
  success: boolean;
}

export interface EmailProviderClient {
  send(options: EmailOptions): Promise<EmailResult>;
  sendBatch?(emails: EmailOptions[]): Promise<EmailResult[]>;
}

// Re-export individual providers
export { ResendProvider } from './resend';
export { PostmarkProvider } from './postmark';
export { SendGridProvider } from './sendgrid';
export { SESProvider } from './ses';
export { MailgunProvider } from './mailgun';

/**
 * Get email provider based on environment config
 */
export function getEmailProvider(): EmailProviderClient {
  const provider = process.env.EMAIL_PROVIDER as EmailProvider || 'resend';

  switch (provider) {
    case 'resend':
      return new (require('./resend').ResendProvider)();
    case 'postmark':
      return new (require('./postmark').PostmarkProvider)();
    case 'sendgrid':
      return new (require('./sendgrid').SendGridProvider)();
    case 'ses':
      return new (require('./ses').SESProvider)();
    case 'mailgun':
      return new (require('./mailgun').MailgunProvider)();
    default:
      throw new Error(\`Unknown email provider: \${provider}\`);
  }
}

/**
 * Send an email using the configured provider
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const provider = getEmailProvider();
  return provider.send(options);
}
