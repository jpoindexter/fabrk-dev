import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Multi-Factor Authentication - Fabrk Docs",
  description: "Add 2FA to your SaaS with TOTP authenticator apps. Includes QR code setup, backup codes, and security best practices.",
};

export default function MFAPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x20] FEATURES ] MFA</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">MULTI_FACTOR_AUTHENTICATION</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Add an extra layer of security with authenticator apps and backup codes.
        </p>
      </div>

      {/* What is 2FA - Plain English */}
      <Card className="rounded-none">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-mono text-lg font-bold text-primary">WHAT_IS_TWO_FACTOR_AUTHENTICATION</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Two-factor authentication (2FA) adds an extra step to logging in. After entering your
            password, you also need to provide a code from your phone. Even if someone steals
            your password, they can&apos;t access your account without your phone.
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Think of it like a bank vault with two locks - you need both keys to get in. Your
            password is one key, the code from your phone is the other.
          </p>
        </CardContent>
      </Card>

      {/* Why You Need This */}
      <Card className="rounded-none">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-mono text-lg font-bold text-primary">WHY_OFFER_2FA</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-mono font-medium">SECURITY_BENEFITS</h3>
              <ul className="font-mono text-sm text-muted-foreground space-y-1">
                <li>Protects against password theft</li>
                <li>Stops credential stuffing attacks</li>
                <li>Required for many compliance standards</li>
                <li>Builds trust with security-conscious users</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-mono font-medium">BUSINESS_BENEFITS</h3>
              <ul className="font-mono text-sm text-muted-foreground space-y-1">
                <li>Enterprise customers often require it</li>
                <li>Reduces account takeover support tickets</li>
                <li>Differentiates you from competitors</li>
                <li>Shows you take security seriously</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Included */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">WHATS_BUILT_IN</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Fabrk v1.1 includes a complete TOTP (Time-based One-Time Password) implementation:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono font-semibold">QR_CODE_SETUP</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Users scan a QR code with their authenticator app. Works with Google
                Authenticator, Authy, 1Password, and more.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono font-semibold">MANUAL_ENTRY</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Can&apos;t scan? Users can manually enter the secret key into their
                authenticator app.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono font-semibold">6_DIGIT_CODES</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Standard TOTP codes that change every 30 seconds. RFC 6238 compliant.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono font-semibold">10_BACKUP_CODES</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                One-time use codes (XXXX-XXXX format) for account recovery if
                phone is lost.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono font-semibold">ENABLE_DISABLE_TOGGLE</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Users can turn 2FA on or off from security settings with proper
                verification.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono font-semibold">AUDIT_LOGGING</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                All 2FA events (setup, verification, disable) are logged for
                security audits.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works - User Flow */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">HOW_2FA_WORKS</h2>

        <div className="space-y-4">
          <div className="border border-border bg-card p-4">
            <h3 className="font-mono font-semibold mb-2">SETTING_UP_2FA</h3>
            <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
              <li>User goes to Settings → Security</li>
              <li>Clicks &quot;Enable Two-Factor Authentication&quot;</li>
              <li>Scans QR code with authenticator app (or enters secret manually)</li>
              <li>Enters the 6-digit code from their app to verify setup</li>
              <li>Receives 10 backup codes to save somewhere safe</li>
              <li>2FA is now enabled on their account</li>
            </ol>
          </div>

          <div className="border border-border bg-card p-4">
            <h3 className="font-mono font-semibold mb-2">LOGGING_IN_WITH_2FA</h3>
            <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
              <li>User enters email and password as normal</li>
              <li>If 2FA is enabled, they&apos;re asked for a verification code</li>
              <li>User opens authenticator app and enters the current code</li>
              <li>If code is correct, they&apos;re logged in</li>
            </ol>
          </div>

          <div className="border border-border bg-card p-4">
            <h3 className="font-mono font-semibold mb-2">LOST_PHONE_USE_BACKUP_CODE</h3>
            <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
              <li>On the verification screen, click &quot;Use backup code&quot;</li>
              <li>Enter one of the 10 backup codes (format: XXXX-XXXX)</li>
              <li>That code is now used up and won&apos;t work again</li>
              <li>After logging in, set up a new authenticator and generate new backup codes</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">CONFIGURATION</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          2FA is already set up and ready to use. Users enable it from their security settings.
          No additional configuration required.
        </p>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Optionally customize the issuer name (shown in authenticator apps) in{" "}
          <code className="font-mono bg-muted px-1">src/config.js</code>:
        </p>
        <CodeBlock language="javascript" code={`// src/config.js

export const config = {
  auth: {
    // This name appears in authenticator apps like:
    // "YourApp (user@example.com)"
    mfaIssuer: "YourApp",
  },
};`} />
      </div>

      {/* Security Settings UI */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">SECURITY_SETTINGS_PAGE</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Fabrk includes a pre-built security settings component at{" "}
          <code className="font-mono bg-muted px-1">/settings/security</code>:
        </p>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <h3 className="font-mono font-semibold mb-3">WHATS_INCLUDED</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>2FA Status:</strong> Shows whether 2FA is enabled or disabled</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Enable Button:</strong> Opens modal with QR code and setup instructions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Disable Button:</strong> Requires verification before disabling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Backup Codes:</strong> Displayed once after setup (user must save them)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Code Reference */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">CODE_REFERENCE</h2>

        <div className="space-y-2">
          <h3 className="font-mono font-semibold">USING_THE_MFA_LIBRARY</h3>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            The MFA functions are available in <code className="font-mono bg-muted px-1">src/lib/auth/mfa.ts</code>:
          </p>
          <CodeBlock language="typescript" code={`import {
  generateTOTPSecret,
  verifyTOTP,
  generateBackupCodes,
  verifyBackupCode,
  hashBackupCode
} from "@/lib/auth/mfa";

// Generate a new TOTP secret for user setup
const { secret, qrCodeUrl, otpAuthUrl } = await generateTOTPSecret(
  "user@example.com",
  "YourApp" // issuer name
);

// Verify a 6-digit code from authenticator app
const isValid = verifyTOTP(userCode, secret);

// Generate 10 backup codes (XXXX-XXXX format)
const backupCodes = generateBackupCodes(10);

// Hash backup codes before storing in database
const hashedCodes = await Promise.all(
  backupCodes.map(code => hashBackupCode(code))
);

// Verify a backup code (also handles marking it as used)
const { valid, remainingCodes } = await verifyBackupCode(
  submittedCode,
  user.mfaBackupCodes
);`} />
        </div>

        <div className="space-y-2 mt-6">
          <h3 className="font-mono font-semibold">CHECK_IF_USER_HAS_2FA_ENABLED</h3>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            In your API routes:
          </p>
          <CodeBlock language="typescript" code={`// Check if user has 2FA enabled
const user = await prisma.user.findUnique({
  where: { id: session.user.id },
  select: {
    mfaEnabled: true,
    mfaSecret: true,
  },
});

if (user.mfaEnabled) {
  // User has 2FA enabled
  // Require verification before sensitive actions
}

// For sensitive operations, you might want to require
// re-verification even for logged-in users:
export async function deleteAccount(userId: string, mfaCode: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user.mfaEnabled) {
    const isValid = verifyTOTP(mfaCode, decrypt(user.mfaSecret));
    if (!isValid) {
      throw new Error("Invalid 2FA code");
    }
  }

  // Proceed with deletion
}`} />
        </div>
      </div>

      {/* Backup Codes */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">ABOUT_BACKUP_CODES</h2>
        <Card className="bg-muted/50">
          <CardContent className="p-6 space-y-4">
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Backup codes are essential for account recovery. They let users log in even if they
              lose access to their authenticator app (lost phone, new device, etc.).
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-mono font-medium">FORMAT</h3>
                <ul className="font-mono text-sm text-muted-foreground space-y-1">
                  <li>10 codes per user</li>
                  <li>Format: XXXX-XXXX (8 characters)</li>
                  <li>Each code works once only</li>
                  <li>Shown only at setup time</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono font-medium">SECURITY</h3>
                <ul className="font-mono text-sm text-muted-foreground space-y-1">
                  <li>Codes are hashed before storage</li>
                  <li>Timing-safe comparison</li>
                  <li>Used codes are removed</li>
                  <li>Users should store securely</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Questions */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">COMMON_QUESTIONS</h2>
        <div className="space-y-4">
          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              WHICH_AUTHENTICATOR_APPS_WORK
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                Any app that supports TOTP (RFC 6238) works. Popular options include:
              </p>
              <ul className="font-mono text-sm text-muted-foreground space-y-1 mt-2">
                <li>Google Authenticator</li>
                <li>Authy</li>
                <li>1Password</li>
                <li>Microsoft Authenticator</li>
                <li>Bitwarden</li>
              </ul>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              WHAT_IF_USER_LOSES_PHONE
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                They can use one of their 10 backup codes to log in. After logging in, they should:
              </p>
              <ol className="list-inside list-decimal mt-2">
                <li>Disable 2FA</li>
                <li>Set up a new authenticator on their new phone</li>
                <li>Re-enable 2FA (this generates new backup codes)</li>
              </ol>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              WHAT_IF_USER_LOSES_PHONE_AND_BACKUP_CODES
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                This is a worst-case scenario. You have a few options:
              </p>
              <ul className="font-mono text-sm text-muted-foreground space-y-1 mt-2">
                <li>Require identity verification (ID upload, video call)</li>
                <li>Disable 2FA from admin panel after verification</li>
                <li>Implement an account recovery flow with security questions</li>
              </ul>
              <p className="mt-2">
                This is why it&apos;s important to tell users to save their backup codes securely!
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              CAN_I_REQUIRE_2FA_FOR_ALL_USERS
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                2FA is opt-in by default. To require it, you&apos;d add middleware that checks
                if <code className="font-mono bg-muted px-1">user.mfaEnabled</code> is true and
                redirects users to set it up if not. This is common for enterprise/admin users.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              HOW_ARE_SECRETS_STORED
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                TOTP secrets are encrypted before storage using your <code className="font-mono bg-muted px-1">NEXTAUTH_SECRET</code>.
                Backup codes are hashed with SHA-256. Even if your database is compromised,
                attackers can&apos;t use the raw values.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Future Enhancements */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">FUTURE_ENHANCEMENTS</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          The current implementation covers TOTP (authenticator apps). Future versions may include:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono font-semibold">SMS_VERIFICATION</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Text message codes as an alternative (requires Twilio integration).
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono font-semibold">WEBAUTHN_PASSKEYS</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Hardware security keys and biometric authentication (Touch ID, Face ID).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/authentication">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono font-semibold">AUTHENTICATION_BASICS</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Learn about the core authentication system 2FA builds on.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/security/headers">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono font-semibold">SECURITY_HEADERS</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Learn about security headers and CSRF protection.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

    </div>
  );
}
