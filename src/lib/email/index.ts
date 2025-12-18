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
  error?: string;
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
      throw new Error(`Unknown email provider: ${provider}`);
  }
}

/**
 * Send an email using the configured provider
 * Supports both options object and positional arguments for backwards compatibility
 */
export async function sendEmail(
  toOrOptions: string | string[] | EmailOptions,
  subject?: string,
  html?: string
): Promise<EmailResult> {
  const provider = getEmailProvider();

  // Support both object and positional arguments
  if (typeof toOrOptions === 'object' && !Array.isArray(toOrOptions) && 'subject' in toOrOptions) {
    return provider.send(toOrOptions as EmailOptions);
  }

  // Positional arguments: sendEmail(to, subject, html)
  return provider.send({
    to: toOrOptions as string | string[],
    subject: subject || '',
    html: html,
    from: DEFAULT_FROM,
  });
}

// ============================================================================
// Convenience Email Functions
// ============================================================================

const DEFAULT_FROM = process.env.EMAIL_FROM || 'noreply@example.com';
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'App';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Send a welcome email to a new user
 * Supports positional args: sendWelcomeEmail(to, name, licenseKey?, downloadUrl?)
 */
export async function sendWelcomeEmail(
  to: string,
  name: string,
  licenseKey?: string,
  downloadUrl?: string
): Promise<EmailResult> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to ${APP_NAME}</title>
    </head>
    <body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1>Welcome to ${APP_NAME}, ${name}!</h1>
      <p>Thank you for signing up. We're excited to have you on board.</p>
      ${licenseKey ? `
        <div style="background: #f4f4f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <strong>Your License Key:</strong>
          <code style="display: block; margin-top: 8px;">${licenseKey}</code>
        </div>
      ` : ''}
      ${downloadUrl ? `
        <p><a href="${downloadUrl}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; display: inline-block;">Download Now</a></p>
      ` : ''}
      <p><a href="${APP_URL}">Get Started</a></p>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    from: DEFAULT_FROM,
    subject: `Welcome to ${APP_NAME}!`,
    html,
  });
}

/**
 * Send a verification email
 * Supports positional args: sendVerificationEmail(to, token, name?)
 */
export async function sendVerificationEmail(
  to: string,
  token: string,
  name?: string
): Promise<EmailResult> {
  const verifyUrl = `${APP_URL}/verify-email?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Verify Your Email</title>
    </head>
    <body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1>Verify Your Email</h1>
      ${name ? `<p>Hi ${name},</p>` : ''}
      <p>Please click the button below to verify your email address:</p>
      <p>
        <a href="${verifyUrl}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; display: inline-block;">
          Verify Email
        </a>
      </p>
      <p style="color: #666; font-size: 14px;">
        Or copy this link: ${verifyUrl}
      </p>
      <p style="color: #666; font-size: 14px;">
        This link expires in 24 hours.
      </p>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    from: DEFAULT_FROM,
    subject: `Verify your email for ${APP_NAME}`,
    html,
  });
}

/**
 * Send an organization invite email
 * Supports: sendOrganizationInvite(email, options)
 */
export async function sendOrganizationInvite(
  to: string,
  options: {
    inviterName: string;
    organizationName: string;
    role?: string;
    token: string;
    expiresAt?: Date;
  }
): Promise<EmailResult> {
  const inviteUrl = `${APP_URL}/accept-invite?token=${options.token}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>You're Invited</title>
    </head>
    <body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1>You're Invited!</h1>
      <p>
        <strong>${options.inviterName}</strong> has invited you to join
        <strong>${options.organizationName}</strong>${options.role ? ` as a ${options.role}` : ''}.
      </p>
      <p>
        <a href="${inviteUrl}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; display: inline-block;">
          Accept Invitation
        </a>
      </p>
      <p style="color: #666; font-size: 14px;">
        This invitation expires in 7 days.
      </p>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    from: DEFAULT_FROM,
    subject: `Join ${options.organizationName} on ${APP_NAME}`,
    html,
  });
}
