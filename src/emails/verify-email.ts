/**
 * Email Verification Template
 * Simple, clean design for email client compatibility
 */

export interface VerifyEmailProps {
  name: string;
  verificationUrl: string;
}

export function generateVerifyEmailHTML({
  name,
  verificationUrl,
}: VerifyEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
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

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; color: #171717; font-size: 24px; font-weight: 600;">
                Verify Your Email Address
              </h2>
              <p style="margin: 0 0 24px 0; color: #525252; font-size: 16px; line-height: 1.5;">
                Hi ${name}, please verify your email address to complete your registration.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 32px 0;">
                    <a href="${verificationUrl}" style="display: inline-block; background-color: #007AFF; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 6px; font-size: 16px; font-weight: 600;">Verify Email Address</a>
                  </td>
                </tr>
              </table>

              <!-- Alternative Link -->
              <p style="margin: 0 0 24px 0; color: #737373; font-size: 14px; line-height: 1.5;">
                Or copy and paste this link into your browser:<br/>
                <a href="${verificationUrl}" style="color: #007AFF; word-break: break-all;">${verificationUrl}</a>
              </p>

              <!-- Expiry Notice -->
              <div style="background-color: #FFF3CD; border: 1px solid #FFC107; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  <strong>⏱️ This link expires in 24 hours.</strong>
                </p>
              </div>

              <!-- Security Notice -->
              <p style="margin: 0; color: #737373; font-size: 13px; line-height: 1.5;">
                If you didn't create an account with Fabrk, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #fafafa; text-align: center;">
              <p style="margin: 0; color: #737373; font-size: 13px; line-height: 1.5;">
                © 2025 Fabrk. All rights reserved.
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

export function generateVerifyEmailText({
  name,
  verificationUrl,
}: VerifyEmailProps): string {
  return `
Verify Your Email Address

Hi ${name}, please verify your email address to complete your registration.

Click here to verify: ${verificationUrl}

⏱️ This link expires in 24 hours.

If you didn't create an account with Fabrk, you can safely ignore this email.

© 2025 Fabrk. All rights reserved.
  `.trim();
}
