/* 💡 EMAIL TIP: Get your Resend API key from https://resend.com/api-keys
 * Update FROM_EMAIL below with your verified domain (e.g., hello@yourdomain.com).
 * In development, emails are logged to console instead of being sent.
 * Queue functions (queueEmail, etc.) store emails in DB for background processing.
 */

/**
 * Email Service with Queue Support
 * - Direct sending for immediate emails (auth)
 * - Queue support for background sending (purchases, notifications)
 */

import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { env } from "@/lib/env";

const resend = env.server.RESEND_API_KEY ? new Resend(env.server.RESEND_API_KEY) : null;

const FROM_EMAIL = env.server.EMAIL_FROM || "noreply@yourdomain.com";
const APP_NAME = "Fabrk";
const APP_URL = env.client.NEXT_PUBLIC_APP_URL;

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
 * Queues a welcome email for background sending (typically after purchase)
 * Includes license key and magic login link if provided
 *
 * @param params - Welcome email parameters
 * @param params.to - Recipient email address
 * @param params.name - User's name for personalization
 * @param params.licenseKey - Optional license key to include
 * @param params.magicLink - Optional magic login link
 * @param params.purchaseId - Optional purchase ID for tracking
 * @param params.userId - Optional user ID for tracking
 * @returns Promise with success status and emailQueueId
 *
 * @example
 * ```typescript
 * await queueWelcomeEmail({
 *   to: "user@example.com",
 *   name: "John Doe",
 *   licenseKey: "LICENSE-123-ABC",
 *   purchaseId: "purchase_456"
 * });
 * ```
 */
export async function queueWelcomeEmail(params: {
  to: string;
  name: string;
  licenseKey?: string;
  magicLink?: string;
  purchaseId?: string;
  userId?: string;
  githubRepoUrl?: string | null;
  githubUsername?: string | null;
}) {
  const { to, name, licenseKey, magicLink, purchaseId, userId, githubRepoUrl, githubUsername } = params;

  const githubSection = githubRepoUrl ? `
    <div style="margin: 24px 0; padding: 20px; background-color: #f6f8fa; border-radius: 8px; border: 1px solid #e1e4e8;">
      <h2 style="margin-top: 0; color: #24292f;">Access Your Repository</h2>
      ${githubUsername ? `<p><strong>GitHub Username:</strong> ${githubUsername}</p>` : ""}
      <p><strong>Repository:</strong> <a href="${githubRepoUrl}" style="color: #0969da;">${githubRepoUrl}</a></p>
      <p><strong>Clone Command:</strong></p>
      <pre style="background-color: #161b22; color: #f0f6fc; padding: 12px; border-radius: 6px; overflow-x: auto;"><code>git clone ${githubRepoUrl}</code></pre>
      <p><strong>Access Level:</strong> Read-only (pull) - you can clone and view the code, but cannot push changes.</p>
      <p style="margin-top: 16px; padding: 12px; background-color: #fff8c5; border-radius: 6px; border-left: 4px solid #d4a72c;">
        <strong>Important:</strong> Check your GitHub email for the collaboration invitation. You must accept it to access the repository.
      </p>
      <p><strong>Setup Guide:</strong> <a href="${APP_URL}/docs/getting-started" style="color: #0969da;">${APP_URL}/docs/getting-started</a></p>
    </div>
  ` : "";

  const html = `
    <h1>Welcome ${name}!</h1>
    <p>Thanks for your purchase. We're excited to have you on board!</p>
    ${licenseKey ? `<p><strong>Your License Key:</strong> <code>${licenseKey}</code></p>` : ""}
    ${magicLink ? `<p><strong>Quick Access:</strong> <a href="${magicLink}">Login to your dashboard</a></p>` : ""}
    <p>Get started: <a href="${APP_URL}/dashboard">${APP_URL}/dashboard</a></p>
    ${githubSection}
    <p>Need help? Just reply to this email or contact us at support@fabrk.dev</p>
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
      githubRepoUrl,
      githubUsername,
    },
  });
}

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

/**
 * Queues a payment confirmation email
 * @param params - Confirmation email parameters
 * @returns Promise with success status and emailQueueId
 */
export async function queueConfirmationEmail(params: {
  to: string;
  name: string;
  amount: number;
  productName: string;
  receiptUrl: string;
  userId?: string;
  purchaseId?: string;
}) {
  const { to, name, amount, productName, receiptUrl, userId, purchaseId } = params;

  const html = `
    <h2>Payment Confirmation</h2>
    <p>Hi ${name},</p>
    <p>Thanks for your purchase of <strong>${productName}</strong>.</p>
    <p>Amount: $${(amount / 100).toFixed(2)}</p>
    <p>You can view your receipt here:</p>
    <a href="${receiptUrl}">View Receipt</a>
  `;

  return queueEmail({
    type: "INVOICE",
    to,
    subject: `Receipt for ${productName}`,
    html,
    userId,
    purchaseId,
    metadata: { amount, productName, receiptUrl },
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

/**
 * Queues a GitHub access failed notification email
 * Sent when GitHub repository access grant fails after purchase
 *
 * @param params - GitHub access failed email parameters
 * @param params.to - Recipient email address
 * @param params.name - Customer's name for personalization
 * @param params.githubUsername - The GitHub username they provided
 * @param params.errorMessage - What went wrong (user not found, rate limited, etc.)
 * @param params.magicLink - Optional magic link to access dashboard
 * @param params.userId - Optional user ID for tracking
 * @returns Promise with success status and emailQueueId
 *
 * @example
 * ```typescript
 * await queueGitHubAccessFailedEmail({
 *   to: "user@example.com",
 *   name: "John Doe",
 *   githubUsername: "johndoe123",
 *   errorMessage: "GitHub user not found",
 *   magicLink: "https://app.fabrk.dev/magic-signin?token=..."
 * });
 * ```
 */
export async function queueGitHubAccessFailedEmail(params: {
  to: string;
  name: string;
  githubUsername: string;
  errorMessage: string;
  magicLink?: string;
  userId?: string;
}) {
  const { to, name, githubUsername, errorMessage, magicLink, userId } = params;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 2px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #6366f1; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
          .error-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 4px; }
          .info-box { background: #f3f4f6; border-left: 4px solid #6366f1; padding: 16px; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Action Required</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Complete Your Fabrk Setup</p>
          </div>
          <div class="content">
            <p style="font-size: 16px; margin-top: 0;">
              Hi ${name},
            </p>

            <p>
              Thank you for your purchase! Your payment was successful and your license key is active.
            </p>

            <p>
              However, we couldn't grant you access to the private GitHub repository. Here's what happened:
            </p>

            <div class="error-box">
              <strong>GitHub Username:</strong> <code>${githubUsername}</code><br>
              <strong>Error:</strong> ${errorMessage}
            </div>

            <h3 style="margin-bottom: 12px;">Next Steps</h3>
            <ol style="padding-left: 20px;">
              <li>Verify your GitHub username is correct (it's case-sensitive)</li>
              <li>Make sure your GitHub account is public or that you can receive repository invitations</li>
              <li>Contact our support team with the correct username</li>
            </ol>

            <div class="info-box">
              <strong>Need Help?</strong>
              <p style="margin: 8px 0 0 0;">
                Email: <a href="mailto:support@fabrk.dev" style="color: #6366f1;">support@fabrk.dev</a><br>
                Discord: <a href="https://discord.gg/fabrk" style="color: #6366f1;">discord.gg/fabrk</a>
              </p>
            </div>

            ${magicLink ? `
            <p style="margin-top: 24px;">
              In the meantime, you can still access your dashboard and download the boilerplate:
            </p>
            <div style="text-align: center;">
              <a href="${magicLink}" class="button">Access Dashboard</a>
            </div>
            ` : ''}

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              We'll resolve this quickly once you contact us with the correct information.
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

  return queueEmail({
    type: "NOTIFICATION",
    to,
    subject: "Action Required: Complete Your Fabrk Setup",
    html,
    userId,
    metadata: {
      name,
      githubUsername,
      errorMessage,
      magicLink,
    },
  });
}
