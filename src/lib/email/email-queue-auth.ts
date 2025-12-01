/**
 * Queued Authentication Email Functions
 * Background-processed verification and reset emails
 */

import { APP_URL } from "./email-core";
import { queueEmail } from "./email-queue";

/**
 * Queues an email verification email for background sending
 * Generates verification URL with token (24-hour expiry)
 *
 * @param params - Verification email parameters
 * @param params.to - Recipient email address
 * @param params.token - Verification token
 * @param params.userId - Optional user ID for tracking
 * @returns Promise with success status and emailQueueId
 *
 * @example
 * ```typescript
 * await queueVerificationEmail({
 *   to: "user@example.com",
 *   token: "verify_token_abc123",
 *   userId: "user_123"
 * });
 * ```
 */
export async function queueVerificationEmail(params: {
  to: string;
  token: string;
  userId?: string;
}) {
  const { to, token, userId } = params;
  const verifyUrl = `${APP_URL}/verify-email?token=${token}`;

  const html = `
    <h2>Verify your email address</h2>
    <p>Click the link below to verify your email:</p>
    <a href="${verifyUrl}">${verifyUrl}</a>
    <p>This link expires in 24 hours.</p>
  `;

  return queueEmail({
    type: "VERIFICATION",
    to,
    subject: "Verify your email",
    html,
    userId,
    metadata: { token },
  });
}

/**
 * Queues a password reset email for background sending
 * Generates reset URL with token (1-hour expiry)
 *
 * @param params - Reset email parameters
 * @param params.to - Recipient email address
 * @param params.token - Password reset token
 * @param params.userId - Optional user ID for tracking
 * @returns Promise with success status and emailQueueId
 *
 * @example
 * ```typescript
 * await queueResetEmail({
 *   to: "user@example.com",
 *   token: "reset_token_xyz789",
 *   userId: "user_123"
 * });
 * ```
 */
export async function queueResetEmail(params: {
  to: string;
  token: string;
  userId?: string;
}) {
  const { to, token, userId } = params;
  const resetUrl = `${APP_URL}/reset-password?token=${token}`;

  const html = `
    <h2>Reset your password</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>This link expires in 1 hour.</p>
    <p>If you didn't request this, ignore this email.</p>
  `;

  return queueEmail({
    type: "RESET",
    to,
    subject: "Reset your password",
    html,
    userId,
    metadata: { token },
  });
}
