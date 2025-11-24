import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export default function MFAPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline text-sm">
          ← Back to Documentation
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Multi-Factor Authentication</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Secure your application with TOTP authenticator apps, SMS verification, and WebAuthn hardware keys.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">
              Fabrk supports multiple MFA methods for enhanced security:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>TOTP:</strong> Time-based one-time passwords (Google Authenticator, Authy)</li>
              <li><strong>SMS:</strong> Text message verification codes</li>
              <li><strong>WebAuthn:</strong> Hardware security keys (YubiKey, Touch ID, Face ID)</li>
              <li>Backup codes for account recovery</li>
              <li>Per-user MFA enforcement options</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Configuration</h2>

        <h3 className="text-xl font-medium mb-3">1. Enable MFA Feature</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Enable in <code className="bg-muted px-2 py-1 rounded">src/config.js</code>:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`export const config = {
  features: {
    mfa: true,
    mfaMethods: ["totp", "sms", "webauthn"], // Enable specific methods
  },
  auth: {
    mfaIssuer: "Your App Name", // Shown in authenticator apps
  },
};`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">2. Install Dependencies</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`# For TOTP
npm install otplib qrcode

# For WebAuthn
npm install @simplewebauthn/server @simplewebauthn/browser

# For SMS (using Twilio)
npm install twilio`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">3. Environment Variables</h3>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">For SMS verification (optional):</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`# Twilio for SMS
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="xxxxxxxxxxxx"
TWILIO_PHONE_NUMBER="+1234567890"`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Database Schema</h2>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">Add MFA fields to your Prisma schema:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// prisma/schema.prisma
model User {
  id                String    @id @default(cuid())
  // ... existing fields

  // MFA fields
  mfaEnabled        Boolean   @default(false)
  mfaSecret         String?   // Encrypted TOTP secret
  mfaBackupCodes    String[]  // Hashed backup codes
  mfaVerifiedAt     DateTime?

  // WebAuthn credentials
  webauthnCredentials WebAuthnCredential[]

  // Phone for SMS
  phone             String?
  phoneVerified     Boolean   @default(false)
}

model WebAuthnCredential {
  id              String   @id @default(cuid())
  userId          String
  credentialId    String   @unique
  publicKey       String
  counter         Int
  deviceType      String
  backedUp        Boolean
  transports      String[]
  createdAt       DateTime @default(now())

  user            User     @relation(fields: [userId], references: [id])
}`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>

        <h3 className="text-xl font-medium mb-3">TOTP Setup</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Generate and verify TOTP codes:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/lib/mfa/totp.ts
import { authenticator } from "otplib";
import QRCode from "qrcode";
import { config } from "@/config";

export async function generateTOTPSecret(email: string) {
  const secret = authenticator.generateSecret();

  const otpauth = authenticator.keyuri(
    email,
    config.auth.mfaIssuer,
    secret
  );

  const qrCode = await QRCode.toDataURL(otpauth);

  return { secret, qrCode, otpauth };
}

export function verifyTOTP(token: string, secret: string): boolean {
  return authenticator.verify({ token, secret });
}

// API endpoint: POST /api/auth/mfa/totp/setup
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { secret, qrCode } = await generateTOTPSecret(session.user.email);

  // Store secret temporarily (verify before enabling)
  await prisma.user.update({
    where: { id: session.user.id },
    data: { mfaSecret: encrypt(secret) }, // Encrypt before storing!
  });

  return NextResponse.json({ qrCode, secret });
}

// API endpoint: POST /api/auth/mfa/totp/verify
export async function verifySetup(request: Request) {
  const session = await auth();
  const { code } = await request.json();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  const secret = decrypt(user.mfaSecret);
  const isValid = verifyTOTP(code, secret);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  // Generate backup codes
  const backupCodes = generateBackupCodes();

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      mfaEnabled: true,
      mfaVerifiedAt: new Date(),
      mfaBackupCodes: backupCodes.map(hash),
    },
  });

  return NextResponse.json({
    success: true,
    backupCodes, // Show once, user must save them
  });
}`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">WebAuthn Registration</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Register hardware security keys:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/lib/mfa/webauthn.ts
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";

const rpName = "Your App";
const rpID = "yourdomain.com";
const origin = "https://yourdomain.com";

export async function getRegistrationOptions(user: User) {
  const userCredentials = await prisma.webauthnCredential.findMany({
    where: { userId: user.id },
  });

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userID: user.id,
    userName: user.email,
    userDisplayName: user.name || user.email,
    excludeCredentials: userCredentials.map((cred) => ({
      id: Buffer.from(cred.credentialId, "base64"),
      type: "public-key",
      transports: cred.transports,
    })),
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
    },
  });

  // Store challenge for verification
  await prisma.user.update({
    where: { id: user.id },
    data: { currentChallenge: options.challenge },
  });

  return options;
}

export async function verifyRegistration(user: User, response: any) {
  const verification = await verifyRegistrationResponse({
    response,
    expectedChallenge: user.currentChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
  });

  if (verification.verified && verification.registrationInfo) {
    const { credentialID, credentialPublicKey, counter } =
      verification.registrationInfo;

    await prisma.webauthnCredential.create({
      data: {
        userId: user.id,
        credentialId: Buffer.from(credentialID).toString("base64"),
        publicKey: Buffer.from(credentialPublicKey).toString("base64"),
        counter,
        deviceType: verification.registrationInfo.credentialDeviceType,
        backedUp: verification.registrationInfo.credentialBackedUp,
        transports: response.response.transports || [],
      },
    });
  }

  return verification;
}`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">MFA Challenge During Login</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Require MFA after password verification:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/lib/auth.ts - in signIn callback
callbacks: {
  async signIn({ user, account, credentials }) {
    // Check if MFA is enabled for this user
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { mfaEnabled: true },
    });

    if (dbUser?.mfaEnabled) {
      // Set flag to require MFA verification
      // The session will be created but marked as requiring MFA
      return "/auth/mfa-challenge";
    }

    return true;
  },
},

// MFA Challenge page verifies the second factor
// POST /api/auth/mfa/verify
export async function verifyMFA(request: Request) {
  const { code, method } = await request.json();
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  let isValid = false;

  switch (method) {
    case "totp":
      const secret = decrypt(user.mfaSecret);
      isValid = verifyTOTP(code, secret);
      break;

    case "backup":
      isValid = await verifyBackupCode(user.id, code);
      break;

    case "webauthn":
      isValid = await verifyWebAuthn(user.id, code);
      break;
  }

  if (!isValid) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  // Mark session as MFA verified
  // Redirect to dashboard
  return NextResponse.json({
    success: true,
    redirect: "/dashboard"
  });
}`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Backup Codes</h3>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">Generate and verify backup codes:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/lib/mfa/backup-codes.ts
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";

export function generateBackupCodes(count = 10): string[] {
  return Array.from({ length: count }, () =>
    nanoid(8).toUpperCase()
  );
}

export async function verifyBackupCode(
  userId: string,
  code: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { mfaBackupCodes: true },
  });

  for (let i = 0; i < user.mfaBackupCodes.length; i++) {
    const isMatch = await bcrypt.compare(code, user.mfaBackupCodes[i]);

    if (isMatch) {
      // Remove used backup code
      const updatedCodes = [...user.mfaBackupCodes];
      updatedCodes.splice(i, 1);

      await prisma.user.update({
        where: { id: userId },
        data: { mfaBackupCodes: updatedCodes },
      });

      return true;
    }
  }

  return false;
}`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>

        <div className="grid gap-4">
          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">TOTP for All Users</h3>
              <p className="text-muted-foreground">
                Require authenticator app (Google Authenticator, Authy) for all users. Most secure and doesn't require SMS costs.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">SMS for Accessibility</h3>
              <p className="text-muted-foreground">
                Offer SMS as an alternative for users who can't use authenticator apps. Less secure but more accessible.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">WebAuthn for Enterprise</h3>
              <p className="text-muted-foreground">
                Support hardware security keys for enterprise customers with strict security requirements (SOC 2, HIPAA).
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Admin-Only MFA</h3>
              <p className="text-muted-foreground">
                Require MFA only for admin users or users with elevated permissions to protect sensitive operations.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Security Considerations</h2>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Encrypt secrets:</strong> Always encrypt TOTP secrets at rest</li>
              <li><strong>Rate limit:</strong> Prevent brute force on MFA codes</li>
              <li><strong>Backup codes:</strong> Always provide backup codes for account recovery</li>
              <li><strong>Session management:</strong> Clear sessions when MFA is enabled/disabled</li>
              <li><strong>Audit logging:</strong> Log all MFA setup and verification attempts</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>Offer multiple MFA methods for user preference</li>
              <li>Make MFA setup simple with clear instructions</li>
              <li>Show QR code AND manual entry key for TOTP</li>
              <li>Allow users to register multiple WebAuthn devices</li>
              <li>Provide clear recovery options (backup codes)</li>
              <li>Send email notification when MFA is changed</li>
              <li>Consider "remember this device" for trusted devices</li>
              <li>Allow MFA bypass for specific scenarios (with audit)</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
