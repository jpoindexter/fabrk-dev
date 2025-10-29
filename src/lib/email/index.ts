/**
 * Email Service Module
 * Handles sending emails through Resend
 */

import { logger } from "@/lib/logger";
import { Resend } from "resend";

export interface EmailOptions {
  to: string | string[];
  from?: string;
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

export class EmailService {
  private defaultFrom: string;
  private resend: Resend | null;

  constructor() {
    this.defaultFrom = process.env.EMAIL_FROM || "noreply@fabrk.com";
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      logger.warn("RESEND_API_KEY not configured - email functionality disabled");
      this.resend = null;
    } else {
      this.resend = new Resend(apiKey);
    }
  }

  async send(
    options: EmailOptions
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // If Resend is not configured, simulate sending
      if (!this.resend) {
        const messageId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        logger.info("Email simulation (no API key):", {
          to: options.to,
          subject: options.subject,
        });
        return {
          success: true,
          messageId,
        };
      }

      // Send with Resend
      const emailData = {
        to: Array.isArray(options.to) ? options.to : [options.to],
        from: options.from || this.defaultFrom,
        subject: options.subject,
        html: options.html || options.text || "",
        text: options.text,
        cc: options.cc ? (Array.isArray(options.cc) ? options.cc : [options.cc]) : undefined,
        bcc: options.bcc ? (Array.isArray(options.bcc) ? options.bcc : [options.bcc]) : undefined,
        reply_to: options.replyTo,
      };

      const response = await this.resend.emails.send(emailData);

      if (response.error) {
        logger.error("Resend API error:", response.error);
        return {
          success: false,
          error: response.error.message,
        };
      }

      logger.info("Email sent successfully:", {
        id: response.data?.id,
        to: options.to,
        subject: options.subject,
      });

      return {
        success: true,
        messageId: response.data?.id,
      };
    } catch (error) {
      logger.error("Failed to send email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async sendTemplate(
    templateName: string,
    to: string | string[],
    variables: Record<string, unknown>
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    // In production, this would use a template engine
    const html = this.renderTemplate(templateName, variables);

    return this.send({
      to,
      subject: this.getTemplateSubject(templateName, variables),
      html,
    });
  }

  private renderTemplate(templateName: string, variables: Record<string, unknown>): string {
    // Simple template rendering - in production, use a proper template engine
    const templates: Record<string, string> = {
      welcome: `
        <h1>Welcome to Fabrk, {{name}}!</h1>
        <p>We're excited to have you on board.</p>
        <p>Get started by exploring your dashboard.</p>
      `,
      "password-reset": `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="{{resetLink}}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
      `,
      "magic-link": `
        <h1>Your Magic Link</h1>
        <p>Click the link below to sign in:</p>
        <a href="{{magicLink}}">Sign In</a>
        <p>This link will expire in 15 minutes.</p>
      `,
      "organization-invitation": `
        <h1>You're invited to join {{organizationName}}!</h1>
        <p>{{inviterName}} has invited you to join their organization on Fabrk.</p>
        <p>Click the link below to accept this invitation:</p>
        <a href="{{invitationLink}}" style="background-color: hsl(var(--primary)); color: hsl(var(--primary)); padding: 10px 20px; text-decoration: none; border-radius: 0.5rem; display: inline-block;">Accept Invitation</a>
        <p>This invitation will expire in 7 days.</p>
        <p>If you don't have a Fabrk account yet, you'll be prompted to create one.</p>
      `,
      "mfa-backup-code-used": `
        <h1>Security Alert: Backup Code Used</h1>
        <p>A backup code was used to access your Fabrk account.</p>
        <p><strong>Time:</strong> {{timestamp}}</p>
        <p><strong>Location:</strong> {{location}}</p>
        <p>If this wasn't you, please secure your account immediately by changing your password and reviewing your MFA settings.</p>
        <p><a href="{{dashboardLink}}">Review Account Security</a></p>
      `,
      "mfa-status-changed": `
        <h1>MFA Status Changed</h1>
        <p>Your multi-factor authentication (MFA) settings have been {{action}}.</p>
        <p><strong>Method:</strong> {{method}}</p>
        <p><strong>Time:</strong> {{timestamp}}</p>
        <p>If you didn't make this change, please contact support immediately.</p>
        <p><a href="{{dashboardLink}}">View Security Settings</a></p>
      `,
      "security-alert": `
        <h1>Security Alert</h1>
        <p>We detected unusual activity on your Fabrk account.</p>
        <p><strong>Event:</strong> {{event}}</p>
        <p><strong>Time:</strong> {{timestamp}}</p>
        <p><strong>Location:</strong> {{location}}</p>
        <p>If this activity wasn't authorized by you, please secure your account immediately.</p>
        <p><a href="{{dashboardLink}}">Review Account Activity</a></p>
      `,
      "email-verification": `
        <h1>Verify Your Email Address</h1>
        <p>Welcome to Fabrk! Please verify your email address to complete your registration.</p>
        <p>Click the link below to verify your account:</p>
        <a href="{{verificationLink}}" style="background-color: hsl(var(--primary)); color: hsl(var(--primary)); padding: 10px 20px; text-decoration: none; border-radius: 0.5rem; display: inline-block;">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create this account, you can safely ignore this email.</p>
      `,
      "purchase-confirmation": `
        <h1>Thank You for Your Purchase!</h1>
        <p>Welcome to Fabrk! Your {{tier}} license has been activated.</p>

        <h2>Your License Key</h2>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 16px; margin: 20px 0;">
          {{licenseKey}}
        </div>

        <h2>What's Included</h2>
        <ul>
          <li>280+ production-ready components</li>
          <li>Complete design token system</li>
          <li>Full TypeScript support</li>
          <li>Dark mode included</li>
          <li>Comprehensive documentation</li>
          <li>Lifetime updates</li>
        </ul>

        <h2>Get Started</h2>
        <p>Visit your dashboard to download your component library:</p>
        <a href="{{dashboardLink}}" style="background-color: hsl(var(--primary)); color: white; padding: 12px 24px; text-decoration: none; border-radius: 0.5rem; display: inline-block; margin: 10px 0;">Go to Dashboard</a>

        <h2>Need Help?</h2>
        <p>Check out our documentation or reach out to support:</p>
        <ul>
          <li><a href="https://fabrk.com/docs">Documentation</a></li>
          <li><a href="https://fabrk.com/support">Support</a></li>
        </ul>

        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
          Order ID: {{orderId}}<br>
          Date: {{date}}<br>
          Amount: {{amount}}
        </p>
      `,
    };

    let html = templates[templateName] || "<p>{{content}}</p>";

    // Replace variables
    Object.entries(variables).forEach(([key, value]) => {
      html = html.replace(new RegExp(`{{${key}}}`, "g"), String(value));
    });

    return html;
  }

  private getTemplateSubject(templateName: string, variables: Record<string, unknown>): string {
    const subjects: Record<string, string> = {
      welcome: "Welcome to Fabrk!",
      "password-reset": "Reset Your Password",
      "magic-link": "Your Sign-In Link",
      "organization-invitation": "You're invited to join {{organizationName}}!",
      "mfa-backup-code-used": "Security Alert: Backup Code Used",
      "mfa-status-changed": "MFA Settings Changed",
      "security-alert": "Security Alert",
      "email-verification": "Verify Your Email Address",
      "purchase-confirmation": "Your Fabrk License Key & Getting Started",
    };

    let subject = subjects[templateName] || "Fabrk Notification";

    // Replace variables in subject
    Object.entries(variables).forEach(([key, value]) => {
      subject = subject.replace(new RegExp(`{{${key}}}`, "g"), String(value));
    });

    return subject;
  }

  async sendBatch(
    emails: EmailOptions[]
  ): Promise<Array<{ success: boolean; messageId?: string; error?: string }>> {
    return Promise.all(emails.map((email) => this.send(email)));
  }
}

export const emailService = new EmailService();

export default emailService;
