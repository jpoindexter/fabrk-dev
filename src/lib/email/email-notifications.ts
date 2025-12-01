/**
 * Notification Email Functions
 * GitHub access failed and other notifications
 */

import { APP_NAME, APP_URL } from "./email-core";
import { queueEmail } from "./email-queue";

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
