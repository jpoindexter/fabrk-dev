/**
 * Simple Email Service - ShipFast Style
 * No queue, no retry, no complexity - just send emails
 */

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.EMAIL_FROM || "noreply@yourdomain.com";
const APP_NAME = "Fabrk";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

/**
 * Send welcome email after purchase
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
