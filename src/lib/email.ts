/**
 * Email Service with Queue Support
 * - Direct sending for immediate emails (auth)
 * - Queue support for background sending (purchases, notifications)
 */

import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

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
    console.log("📧 [DEV] Email to:", to, "Subject:", subject);
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
  } catch (error) {
    console.error("Failed to send email:", error);
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
    console.log("📧 [DEV] Welcome email to:", to);
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
  } catch (error) {
    console.error("Failed to send welcome email:", error);
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
    console.log("📧 [DEV] Verification email to:", to, "- Token:", token);
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
  } catch (error) {
    console.error("Failed to send verification email:", error);
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
    console.log("📧 [DEV] Reset email to:", to, "- Token:", token);
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
  } catch (error) {
    console.error("Failed to send reset email:", error);
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
  } catch (error) {
    console.error("Failed to queue email:", error);
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
