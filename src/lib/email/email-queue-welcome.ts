/**
 * Queued Welcome Email Functions
 * Background-processed welcome and confirmation emails
 */

import { APP_NAME, APP_URL } from "./email-core";
import { queueEmail } from "./email-queue";

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
