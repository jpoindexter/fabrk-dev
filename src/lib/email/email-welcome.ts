/**
 * Welcome Email Functions
 * Post-purchase welcome emails
 */

import { logger } from '@/lib/logger';
import { resend, FROM_EMAIL, APP_NAME, APP_URL } from './email-core';

/**
 * Send welcome email after purchase
 * @param to - Recipient email address
 * @param name - User's name for personalization
 * @param licenseKey - Optional license key to include in email
 * @returns Promise with success status and optional error
 * @example
 * await sendWelcomeEmail("user@example.com", "John Doe", "abc123")
 */
export async function sendWelcomeEmail(
  to: string,
  name: string,
  licenseKey?: string
) {
  if (!resend) {
    logger.debug('📧 [DEV] Welcome email to:', to);
    return { success: true };
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Welcome to ${APP_NAME}!`,
      html: `
        <h1>Welcome ${name}!</h1>
        <p>Thanks for your purchase. We're excited to have you on board!</p>
        ${licenseKey ? `<p><strong>Your License Key:</strong> ${licenseKey}</p>` : ''}
        <p>Get started: <a href="${APP_URL}/dashboard">${APP_URL}/dashboard</a></p>
        <p>Questions? Just reply to this email.</p>
      `,
    });
    return { success: true };
  } catch (error: unknown) {
    logger.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}
