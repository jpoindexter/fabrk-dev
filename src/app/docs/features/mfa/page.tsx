import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export default function MFAPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Two-Factor Authentication</h1>
        <p className="text-lg text-muted-foreground">
          Add an extra layer of security with authenticator apps and backup codes.
        </p>
      </div>

      {/* What is 2FA - Plain English */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">What is Two-Factor Authentication?</h2>
          <p className="text-muted-foreground">
            Two-factor authentication (2FA) adds an extra step to logging in. After entering your
            password, you also need to provide a code from your phone. Even if someone steals
            your password, they can&apos;t access your account without your phone.
          </p>
          <p className="text-muted-foreground">
            Think of it like a bank vault with two locks - you need both keys to get in. Your
            password is one key, the code from your phone is the other.
          </p>
        </CardContent>
      </Card>

      {/* Why You Need This */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Why Offer 2FA?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Security Benefits</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Protects against password theft</li>
                <li>Stops credential stuffing attacks</li>
                <li>Required for many compliance standards</li>
                <li>Builds trust with security-conscious users</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Business Benefits</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
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
        <h2 className="text-2xl font-semibold">What&apos;s Built-In</h2>
        <p className="text-muted-foreground">
          Fabrk v1.1 includes a complete TOTP (Time-based One-Time Password) implementation:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">QR Code Setup</h3>
              <p className="text-sm text-muted-foreground">
                Users scan a QR code with their authenticator app. Works with Google
                Authenticator, Authy, 1Password, and more.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Manual Entry</h3>
              <p className="text-sm text-muted-foreground">
                Can&apos;t scan? Users can manually enter the secret key into their
                authenticator app.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">6-Digit Codes</h3>
              <p className="text-sm text-muted-foreground">
                Standard TOTP codes that change every 30 seconds. RFC 6238 compliant.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">10 Backup Codes</h3>
              <p className="text-sm text-muted-foreground">
                One-time use codes (XXXX-XXXX format) for account recovery if
                phone is lost.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Enable/Disable Toggle</h3>
              <p className="text-sm text-muted-foreground">
                Users can turn 2FA on or off from security settings with proper
                verification.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Audit Logging</h3>
              <p className="text-sm text-muted-foreground">
                All 2FA events (setup, verification, disable) are logged for
                security audits.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works - User Flow */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">How 2FA Works</h2>

        <div className="space-y-3">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Setting Up 2FA</h3>
            <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
              <li>User goes to Settings → Security</li>
              <li>Clicks &quot;Enable Two-Factor Authentication&quot;</li>
              <li>Scans QR code with authenticator app (or enters secret manually)</li>
              <li>Enters the 6-digit code from their app to verify setup</li>
              <li>Receives 10 backup codes to save somewhere safe</li>
              <li>2FA is now enabled on their account</li>
            </ol>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Logging In with 2FA</h3>
            <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
              <li>User enters email and password as normal</li>
              <li>If 2FA is enabled, they&apos;re asked for a verification code</li>
              <li>User opens authenticator app and enters the current code</li>
              <li>If code is correct, they&apos;re logged in</li>
            </ol>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Lost Phone? Use Backup Code</h3>
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
        <h2 className="text-2xl font-semibold">Configuration</h2>
        <p className="text-muted-foreground">
          2FA is already set up and ready to use. Users enable it from their security settings.
          No additional configuration required.
        </p>
        <p className="text-muted-foreground">
          Optionally customize the issuer name (shown in authenticator apps) in{" "}
          <code className="rounded bg-muted px-1">src/config.js</code>:
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
        <h2 className="text-2xl font-semibold">Security Settings Page</h2>
        <p className="text-muted-foreground">
          Fabrk includes a pre-built security settings component at{" "}
          <code className="rounded bg-muted px-1">/settings/security</code>:
        </p>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">What&apos;s Included</h3>
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
        <h2 className="text-2xl font-semibold">Code Reference</h2>

        <div className="space-y-2">
          <h3 className="font-semibold">Using the MFA Library</h3>
          <p className="text-sm text-muted-foreground">
            The MFA functions are available in <code className="rounded bg-muted px-1">src/lib/auth/mfa.ts</code>:
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
          <h3 className="font-semibold">Check if User Has 2FA Enabled</h3>
          <p className="text-sm text-muted-foreground">
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
        <h2 className="text-2xl font-semibold">About Backup Codes</h2>
        <Card className="bg-muted/50">
          <CardContent className="p-6 space-y-4">
            <p className="text-muted-foreground">
              Backup codes are essential for account recovery. They let users log in even if they
              lose access to their authenticator app (lost phone, new device, etc.).
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium">Format</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>10 codes per user</li>
                  <li>Format: XXXX-XXXX (8 characters)</li>
                  <li>Each code works once only</li>
                  <li>Shown only at setup time</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Security</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
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
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-3">
          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              Which authenticator apps work?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                Any app that supports TOTP (RFC 6238) works. Popular options include:
              </p>
              <ul className="list-inside list-disc mt-2">
                <li>Google Authenticator</li>
                <li>Authy</li>
                <li>1Password</li>
                <li>Microsoft Authenticator</li>
                <li>Bitwarden</li>
              </ul>
            </div>
          </details>

          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              What if a user loses their phone?
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

          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              What if a user loses their phone AND backup codes?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                This is a worst-case scenario. You have a few options:
              </p>
              <ul className="list-inside list-disc mt-2">
                <li>Require identity verification (ID upload, video call)</li>
                <li>Disable 2FA from admin panel after verification</li>
                <li>Implement an account recovery flow with security questions</li>
              </ul>
              <p className="mt-2">
                This is why it&apos;s important to tell users to save their backup codes securely!
              </p>
            </div>
          </details>

          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              Can I require 2FA for all users?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                2FA is opt-in by default. To require it, you&apos;d add middleware that checks
                if <code className="rounded bg-muted px-1">user.mfaEnabled</code> is true and
                redirects users to set it up if not. This is common for enterprise/admin users.
              </p>
            </div>
          </details>

          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              How are secrets stored?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                TOTP secrets are encrypted before storage using your <code className="rounded bg-muted px-1">NEXTAUTH_SECRET</code>.
                Backup codes are hashed with SHA-256. Even if your database is compromised,
                attackers can&apos;t use the raw values.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Future Enhancements */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Future Enhancements</h2>
        <p className="text-muted-foreground">
          The current implementation covers TOTP (authenticator apps). Future versions may include:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">SMS Verification</h3>
              <p className="text-sm text-muted-foreground">
                Text message codes as an alternative (requires Twilio integration).
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">WebAuthn / Passkeys</h3>
              <p className="text-sm text-muted-foreground">
                Hardware security keys and biometric authentication (Touch ID, Face ID).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/authentication">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Authentication Basics</h3>
                <p className="text-sm text-muted-foreground">
                  Learn about the core authentication system 2FA builds on.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/security/overview">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Security Overview</h3>
                <p className="text-sm text-muted-foreground">
                  Learn about other security features in Fabrk.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Back to docs link */}
      <div className="pt-4">
        <Link href="/docs" className="text-primary hover:underline">
          ← Back to Documentation
        </Link>
      </div>
    </div>
  );
}
