/**
 * ✅ FABRK COMPONENT
 * Welcome Email Template - Simple HTML
 * Production-ready ✓
 */

export interface WelcomeEmailProps {
  name: string;
  licenseKey: string;
  downloadUrl: string;
}

export function generateWelcomeEmailHTML({
  name,
  licenseKey,
  downloadUrl,
}: WelcomeEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Fabrk!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px; text-align: center; background-color: #000000;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Fabrk</h1>
            </td>
          </tr>

          <!-- Welcome Section -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; color: #171717; font-size: 24px; font-weight: 600;">
                Welcome to Fabrk, ${name}! 🚀
              </h2>
              <p style="margin: 0 0 24px 0; color: #525252; font-size: 16px; line-height: 1.5;">
                Thank you for purchasing Fabrk! You've just gained access to the most AI-optimized SaaS boilerplate that will help you ship production-ready applications 55.8% faster.
              </p>

              <!-- License Section -->
              <div style="background-color: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <p style="margin: 0 0 8px 0; color: #737373; font-size: 14px; font-weight: 600;">Your License Key:</p>
                <p style="margin: 0; color: #171717; font-size: 18px; font-family: 'Courier New', Courier, monospace; font-weight: 600; word-break: break-all;">${licenseKey}</p>
              </div>

              <!-- Download Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 32px 0;">
                    <a href="${downloadUrl}" style="display: inline-block; background-color: #171717; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 600;">Download Fabrk Now</a>
                  </td>
                </tr>
              </table>

              <!-- Quick Start Guide -->
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
              <h3 style="margin: 0 0 16px 0; color: #171717; font-size: 20px; font-weight: 600;">Quick Start Guide</h3>
              <ol style="margin: 0; padding-left: 20px; color: #525252; font-size: 15px; line-height: 1.8;">
                <li style="margin-bottom: 12px;"><strong>Download & Extract:</strong> Click the button above to download your Fabrk package and extract it to your development folder.</li>
                <li style="margin-bottom: 12px;"><strong>Install Dependencies:</strong> Run <code style="background-color: #fafafa; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', Courier, monospace; font-size: 14px;">npm install</code> in your terminal.</li>
                <li style="margin-bottom: 12px;"><strong>Configure Environment:</strong> Copy <code style="background-color: #fafafa; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', Courier, monospace; font-size: 14px;">.env.example</code> to <code style="background-color: #fafafa; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', Courier, monospace; font-size: 14px;">.env.local</code> and add your API keys.</li>
                <li style="margin-bottom: 12px;"><strong>Start Building:</strong> Run <code style="background-color: #fafafa; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', Courier, monospace; font-size: 14px;">npm run dev</code> and start building your SaaS.</li>
              </ol>

              <!-- What's Included -->
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
              <h3 style="margin: 0 0 16px 0; color: #171717; font-size: 20px; font-weight: 600;">What's Included</h3>
              <ul style="margin: 0; padding-left: 20px; color: #525252; font-size: 15px; line-height: 1.8;">
                <li>✅ 106+ Production-Ready Components</li>
                <li>✅ Complete Authentication System</li>
                <li>✅ Stripe Payments Integration</li>
                <li>✅ Vertical Slice Architecture</li>
                <li>✅ AI-Optimized File Structure</li>
                <li>✅ TypeScript + Next.js 15</li>
                <li>✅ Dark Mode Support</li>
                <li>✅ Email System with Templates</li>
              </ul>

              <!-- Resources -->
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
              <h3 style="margin: 0 0 16px 0; color: #171717; font-size: 20px; font-weight: 600;">Resources & Support</h3>
              <p style="margin: 0 0 16px 0; color: #525252; font-size: 15px; line-height: 1.5;">
                <a href="https://fabrk.ai/docs" style="color: #171717; text-decoration: none; font-weight: 600;">📚 Documentation</a> •
                <a href="https://fabrk.ai/components" style="color: #171717; text-decoration: none; font-weight: 600;">🎨 Component Showcase</a> •
                <a href="https://github.com/fabrk/fabrk" style="color: #171717; text-decoration: none; font-weight: 600;">💻 GitHub Repository</a>
              </p>
              <p style="margin: 0; color: #525252; font-size: 15px; line-height: 1.5;">
                Need help? Reply to this email or visit our <a href="https://fabrk.ai/support" style="color: #171717;">support center</a>. We're here to help you succeed!
              </p>

              <!-- Important Notice -->
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
              <p style="margin: 0 0 12px 0; color: #525252; font-size: 14px; line-height: 1.5;"><strong>Important:</strong> Keep your license key safe. You'll need it to:</p>
              <ul style="margin: 0 0 24px 0; padding-left: 20px; color: #525252; font-size: 14px; line-height: 1.8;">
                <li>Download future updates</li>
                <li>Access premium components</li>
                <li>Get priority support</li>
              </ul>
              <p style="margin: 0; color: #525252; font-size: 15px; line-height: 1.5;">
                Happy building! 🎉<br/>
                The Fabrk Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #fafafa; text-align: center;">
              <p style="margin: 0; color: #737373; font-size: 13px; line-height: 1.5;">
                © 2025 Fabrk. All rights reserved.<br/>
                This license is for a single developer. Please purchase additional licenses for team members.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateWelcomeEmailText({
  name,
  licenseKey,
  downloadUrl,
}: WelcomeEmailProps): string {
  return `
Welcome to Fabrk, ${name}!

Thank you for purchasing Fabrk! You've just gained access to the most AI-optimized SaaS boilerplate that will help you ship production-ready applications 55.8% faster.

Your License Key: ${licenseKey}

Download your copy here: ${downloadUrl}

QUICK START GUIDE

1. Download & Extract: Click the link above to download your Fabrk package and extract it to your development folder.
2. Install Dependencies: Run "npm install" in your terminal.
3. Configure Environment: Copy .env.example to .env.local and add your API keys.
4. Start Building: Run "npm run dev" and start building your SaaS.

WHAT'S INCLUDED

✅ 106+ Production-Ready Components
✅ Complete Authentication System
✅ Stripe Payments Integration
✅ Vertical Slice Architecture
✅ AI-Optimized File Structure
✅ TypeScript + Next.js 15
✅ Dark Mode Support
✅ Email System with Templates

RESOURCES & SUPPORT

📚 Documentation: https://fabrk.ai/docs
🎨 Component Showcase: https://fabrk.ai/components
💻 GitHub Repository: https://github.com/fabrk/fabrk

Need help? Reply to this email or visit our support center at https://fabrk.ai/support

IMPORTANT: Keep your license key safe. You'll need it to:
• Download future updates
• Access premium components
• Get priority support

Happy building! 🎉
The Fabrk Team

© 2025 Fabrk. All rights reserved.
This license is for a single developer. Please purchase additional licenses for team members.
  `.trim();
}
