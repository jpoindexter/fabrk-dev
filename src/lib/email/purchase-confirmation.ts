/**
 * ✅ FABRK EMAIL SERVICE
 * Purchase confirmation email with magic link
 */

import { emailService } from "./index";
import { logger } from "@/lib/logger";

interface PurchaseConfirmationData {
  email: string;
  name: string;
  licenseKey: string;
  tier: string;
  magicLinkToken: string;
  receiptUrl?: string;
}

export async function sendPurchaseConfirmationEmail(
  data: PurchaseConfirmationData
): Promise<{ success: boolean; error?: string }> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const magicLink = `${baseUrl}/auth/magic?token=${data.magicLinkToken}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Purchase Confirmation - Fabrk</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #111827; font-size: 32px; font-weight: 700; margin: 0 0 8px 0;">
        🎉 Thank You for Your Purchase!
      </h1>
      <p style="color: #6b7280; font-size: 16px; margin: 0;">
        Welcome to Fabrk ${data.tier.charAt(0).toUpperCase() + data.tier.slice(1)}
      </p>
    </div>

    <!-- Main Card -->
    <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 24px;">

      <!-- Success Message -->
      <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin-bottom: 32px; border-radius: 4px;">
        <p style="color: #166534; margin: 0; font-weight: 500;">
          ✓ Your payment has been processed successfully
        </p>
      </div>

      <!-- License Key -->
      <div style="margin-bottom: 32px;">
        <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 12px 0;">
          Your License Key
        </h2>
        <div style="background: #f9fafb; border: 2px dashed #e5e7eb; padding: 16px; border-radius: 8px; text-align: center;">
          <code style="color: #111827; font-size: 16px; font-weight: 600; letter-spacing: 0.5px;">
            ${data.licenseKey}
          </code>
        </div>
        <p style="color: #6b7280; font-size: 14px; margin: 8px 0 0 0;">
          Save this license key in a secure place. You'll need it to activate your purchase.
        </p>
      </div>

      <!-- Access Dashboard Button -->
      <div style="text-align: center; margin: 32px 0;">
        <a href="${magicLink}" style="display: inline-block; background: #111827; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
          Access Your Dashboard →
        </a>
        <p style="color: #6b7280; font-size: 14px; margin: 16px 0 0 0;">
          This link will automatically sign you in and is valid for 7 days
        </p>
      </div>

      <!-- What's Next -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
        <h3 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">
          What's Next?
        </h3>
        <ol style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">Click the button above to access your dashboard</li>
          <li style="margin-bottom: 8px;">Download your components and source code</li>
          <li style="margin-bottom: 8px;">Check out the documentation and getting started guide</li>
          <li style="margin-bottom: 8px;">Join our Discord community for support</li>
        </ol>
      </div>

      ${
        data.receiptUrl
          ? `
      <!-- Receipt Link -->
      <div style="text-align: center; margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <a href="${data.receiptUrl}" style="color: #6b7280; text-decoration: underline; font-size: 14px;">
          View Receipt
        </a>
      </div>
      `
          : ""
      }
    </div>

    <!-- Support -->
    <div style="text-align: center; color: #9ca3af; font-size: 14px;">
      <p style="margin: 0 0 8px 0;">
        Need help? Contact us at <a href="mailto:support@fabrk.co" style="color: #6b7280; text-decoration: underline;">support@fabrk.co</a>
      </p>
      <p style="margin: 0;">
        © ${new Date().getFullYear()} Fabrk. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
    `;

    const result = await emailService.send({
      to: data.email,
      subject: `🎉 Welcome to Fabrk ${data.tier.charAt(0).toUpperCase() + data.tier.slice(1)} - Your Purchase is Complete!`,
      html,
    });

    if (result.success) {
      logger.info("Purchase confirmation email sent", {
        email: data.email,
        messageId: result.messageId,
      });
    } else {
      logger.error("Failed to send purchase confirmation email", {
        email: data.email,
        error: result.error,
      });
    }

    return result;
  } catch (error) {
    logger.error("Error sending purchase confirmation email", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
