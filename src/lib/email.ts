/**
 * Email Service with Queue Support
 * - Direct sending for immediate emails (auth)
 * - Queue support for background sending (purchases, notifications)
 */

import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.EMAIL_FROM || "noreply@yourdomain.com";
const APP_NAME = "Fabrk";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

/**
 * Generic email sending function
 * @param to - Recipient email address
 * @param subject - Email subject line
 * @param html - HTML content of the email
 * @returns Promise with success status
 */
export async function sendEmail(to: string, subject: string, html: string) {
  if (!resend) {
    logger.debug("📧 [DEV] Email to:", to, "Subject:", subject);
    return { success: true };
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error: unknown) {
    logger.error("Failed to send email:", error);
    return { success: false, error };
  }
}

/**
 * Send welcome email after purchase
 * @param to - Recipient email address
 * @param name - User's name for personalization
 * @param licenseKey - Optional license key to include in email
 * @returns Promise with success status and optional error
 * @example
 * await sendWelcomeEmail("user@example.com", "John Doe", "abc123")
 */
export async function sendWelcomeEmail(to: string, name: string, licenseKey?: string) {
  if (!resend) {
    logger.debug("📧 [DEV] Welcome email to:", to);
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
        ${licenseKey ? `<p><strong>Your License Key:</strong> ${licenseKey}</p>` : ""}
        <p>Get started: <a href="${APP_URL}/dashboard">${APP_URL}/dashboard</a></p>
        <p>Questions? Just reply to this email.</p>
      `,
    });
    return { success: true };
  } catch (error: unknown) {
    logger.error("Failed to send welcome email:", error);
    return { success: false, error };
  }
}

/**
 * Send email verification link
 * @param to - Recipient email address
 * @param token - Verification token (24-hour expiry)
 * @returns Promise with success status and optional error
 * @example
 * await sendVerificationEmail("user@example.com", "abc123token")
 */
export async function sendVerificationEmail(to: string, token: string) {
  if (!resend) {
    logger.debug("📧 [DEV] Verification email to:", to, "- Token:", token);
    return { success: true };
  }

  const verifyUrl = `${APP_URL}/verify-email?token=${token}`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Verify your email",
      html: `
        <h2>Verify your email address</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
        <p>This link expires in 24 hours.</p>
      `,
    });
    return { success: true };
  } catch (error: unknown) {
    logger.error("Failed to send verification email:", error);
    return { success: false, error };
  }
}

/**
 * Send password reset email
 * @param to - Recipient email address
 * @param token - Reset token (1-hour expiry)
 * @returns Promise with success status and optional error
 * @example
 * await sendResetEmail("user@example.com", "reset123token")
 */
export async function sendResetEmail(to: string, token: string) {
  if (!resend) {
    logger.debug("📧 [DEV] Reset email to:", to, "- Token:", token);
    return { success: true };
  }

  const resetUrl = `${APP_URL}/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Reset your password",
      html: `
        <h2>Reset your password</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, ignore this email.</p>
      `,
    });
    return { success: true };
  } catch (error: unknown) {
    logger.error("Failed to send reset email:", error);
    return { success: false, error };
  }
}

/**
 * Email Service Object (for compatibility)
 */
export const emailService = {
  sendWelcomeEmail,
  sendVerificationEmail,
  sendResetEmail,

  /**
   * Send template-based email
   */
  async sendTemplate(
    template: "email-verification" | "password-reset" | "welcome",
    to: string,
    data: { verificationLink?: string; resetLink?: string; name?: string; licenseKey?: string }
  ) {
    switch (template) {
      case "email-verification":
        if (!data.verificationLink) throw new Error("verificationLink required");
        const token = data.verificationLink.split("/").pop() || "";
        return sendVerificationEmail(to, token);

      case "password-reset":
        if (!data.resetLink) throw new Error("resetLink required");
        const resetToken = data.resetLink.split("/").pop() || "";
        return sendResetEmail(to, resetToken);

      case "welcome":
        return sendWelcomeEmail(to, data.name || "User", data.licenseKey);

      default:
        throw new Error(`Unknown template: ${template}`);
    }
  },
};

// ===========================
// EMAIL QUEUE FUNCTIONS
// ===========================

/**
 * Queue an email for background sending (requires EmailQueue model)
 * @param params - Email queue parameters
 * @param params.type - Email type for categorization
 * @param params.to - Recipient email address
 * @param params.subject - Email subject line
 * @param params.html - HTML email body
 * @param params.userId - Optional user ID for tracking
 * @param params.purchaseId - Optional purchase ID for tracking
 * @param params.metadata - Optional metadata object
 * @param params.maxAttempts - Max retry attempts (default: 3)
 * @returns Promise with success status and emailQueueId
 * @example
 * await queueEmail({
 *   type: "NOTIFICATION",
 *   to: "user@example.com",
 *   subject: "New feature available",
 *   html: "<p>Check out our new feature!</p>"
 * })
 */
export async function queueEmail(params: {
  type: "WELCOME" | "VERIFICATION" | "RESET" | "INVOICE" | "NOTIFICATION";
  to: string;
  subject: string;
  html: string;
  userId?: string;
  purchaseId?: string;
  metadata?: Record<string, any>;
  maxAttempts?: number;
}) {
  try {
    const emailQueue = await prisma.emailQueue.create({
      data: {
        type: params.type,
        to: params.to,
        subject: params.subject,
        html: params.html,
        userId: params.userId,
        purchaseId: params.purchaseId,
        metadata: params.metadata,
        maxAttempts: params.maxAttempts || 3,
        status: "PENDING",
      },
    });

    return { success: true, emailQueueId: emailQueue.id };
  } catch (error: unknown) {
    logger.error("Failed to queue email:", error);
    return { success: false, error };
  }
}

/**
 * Queue welcome email (for purchases)
 */
export async function queueWelcomeEmail(params: {
  to: string;
  name: string;
  licenseKey?: string;
  magicLink?: string;
  purchaseId?: string;
  userId?: string;
}) {
  const { to, name, licenseKey, magicLink, purchaseId, userId } = params;

  const html = `
    <h1>Welcome ${name}!</h1>
    <p>Thanks for your purchase. We're excited to have you on board!</p>
    ${licenseKey ? `<p><strong>Your License Key:</strong> <code>${licenseKey}</code></p>` : ""}
    ${magicLink ? `<p><strong>Quick Access:</strong> <a href="${magicLink}">Login to your dashboard</a></p>` : ""}
    <p>Get started: <a href="${APP_URL}/dashboard">${APP_URL}/dashboard</a></p>
    <p>Need help? Just reply to this email.</p>
    <br>
    <p style="color: #666; font-size: 14px;">
      Save your license key in a safe place. You'll need it to access the product.
    </p>
  `;

  return queueEmail({
    type: "WELCOME",
    to,
    subject: `Welcome to ${APP_NAME}! Here's your license key`,
    html,
    userId,
    purchaseId,
    metadata: {
      name,
      licenseKey,
      magicLink,
    },
  });
}

/**
 * Queue verification email
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
 * Queue password reset email
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

/**
 * Send organization invitation email
 * @param to - Recipient email address
 * @param params - Invitation parameters
 * @returns Promise with success status
 */
export async function sendOrganizationInvite(
  to: string,
  params: {
    organizationName: string;
    inviterName: string;
    role: string;
    token: string;
    expiresAt: Date;
  }
) {
  if (!resend) {
    logger.debug("📧 [DEV] Organization invite to:", to, "- Org:", params.organizationName);
    return { success: true };
  }

  const inviteUrl = `${APP_URL}/accept-invite?token=${params.token}`;
  const expiryDate = params.expiresAt.toLocaleDateString();

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 2px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #6366f1; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
          .button:hover { background: #4f46e5; }
          .info-box { background: #f3f4f6; border-left: 4px solid #6366f1; padding: 16px; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          .badge { display: inline-block; background: #e0e7ff; color: #4338ca; padding: 4px 12px; border-radius: 4px; font-size: 14px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">You're Invited!</h1>
          </div>
          <div class="content">
            <p style="font-size: 16px; margin-top: 0;">
              <strong>${params.inviterName}</strong> has invited you to join <strong>${params.organizationName}</strong> on ${APP_NAME}.
            </p>

            <div class="info-box">
              <strong>Your Role:</strong> <span class="badge">${params.role}</span>
              <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 14px;">
                ${params.role === "OWNER" ? "Full control over the organization" : ""}
                ${params.role === "ADMIN" ? "Manage members, settings, and billing" : ""}
                ${params.role === "MEMBER" ? "Standard access to organization resources" : ""}
                ${params.role === "GUEST" ? "Limited read-only access" : ""}
              </p>
            </div>

            <div style="text-align: center;">
              <a href="${inviteUrl}" class="button">Accept Invitation</a>
            </div>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              <strong>Note:</strong> This invitation expires on ${expiryDate}. If you don't have an account, you'll be prompted to create one.
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

            <p style="color: #6b7280; font-size: 14px;">
              If you weren't expecting this invitation, you can safely ignore this email.
            </p>
          </div>
          <div class="footer">
            <p>${APP_NAME} - Building better together</p>
            <p style="margin-top: 10px;">
              <a href="${APP_URL}" style="color: #6366f1; text-decoration: none;">Visit Dashboard</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `You've been invited to join ${params.organizationName}`,
      html,
    });
    return { success: true };
  } catch (error: unknown) {
    logger.error("Failed to send organization invite:", error);
    return { success: false, error };
  }
}
