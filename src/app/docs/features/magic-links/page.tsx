import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Magic Link Auth - Fabrk Docs",
  description: "Passwordless authentication with magic links. Let users sign in with just their email address.",
};

export default function MagicLinksPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x20] FEATURES ] MAGIC_LINKS</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">MAGIC_LINK_AUTH</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Passwordless authentication via email magic links for frictionless sign-in.
        </p>
      </div>

      <section>
        <h2 className="font-mono text-lg font-bold text-primary mb-4">OVERVIEW</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <p className="font-mono text-sm text-muted-foreground mb-4">
              Magic links provide passwordless authentication by sending a unique, time-limited link to the user's email. Features include:
            </p>
            <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
              <li>├─ One-click sign-in from email</li>
              <li>├─ No password to remember or manage</li>
              <li>├─ Automatic email verification</li>
              <li>├─ Time-limited tokens (24 hours default)</li>
              <li>└─ Single-use links for security</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold text-primary mb-4">CONFIGURATION</h2>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground">1</span>
          <h3 className="font-mono text-base font-semibold text-foreground">ENABLE_MAGIC_LINKS</h3>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">Enable the feature in <code className="font-mono bg-muted px-2 py-1">src/config.js</code>:</p>
          </div>
          <CodeBlock language="typescript" code={`export const config = {
  features: {
    magicLinks: true,
    // ...other features
  },
};`} />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground">2</span>
          <h3 className="font-mono text-base font-semibold text-foreground">CONFIGURE_EMAIL</h3>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">Ensure email is configured in <code className="font-mono bg-muted px-2 py-1">.env.local</code>:</p>
          </div>
          <CodeBlock language="typescript" code={`RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="Your App <noreply@yourdomain.com>"
NEXT_PUBLIC_APP_URL="http://localhost:3000"`} />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground">3</span>
          <h3 className="font-mono text-base font-semibold text-foreground">TOKEN_SETTINGS</h3>
        </div>
        <div className="space-y-4">
          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">Configure token expiration:</p>
          </div>
          <CodeBlock language="typescript" code={`export const config = {
  auth: {
    magicLinkExpiry: 24 * 60 * 60 * 1000, // 24 hours in ms
    // ...
  },
};`} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold text-primary mb-4">CODE_EXAMPLES</h2>

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">REQUEST_MAGIC_LINK_API</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">Create the API endpoint at <code className="font-mono bg-muted px-2 py-1">/api/auth/magic-link</code>:</p>
          </div>
          <CodeBlock language="typescript" code={`// src/app/api/auth/magic-link/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendMagicLinkEmail } from "@/lib/email";
import { nanoid } from "nanoid";
import { config } from "@/config";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  // Find or create user
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        emailVerified: null, // Will be verified on click
      },
    });
  }

  // Generate secure token
  const token = nanoid(32);
  const expires = new Date(Date.now() + config.auth.magicLinkExpiry);

  // Store token
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  // Send magic link email
  const magicLink = \`\${config.app.url}/api/auth/verify?token=\${token}&email=\${email}\`;

  await sendMagicLinkEmail({
    to: email,
    magicLink,
    expiresIn: "24 hours",
  });

  return NextResponse.json({
    success: true,
    message: "Magic link sent to your email",
  });
}`} />
        </div>

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">VERIFY_MAGIC_LINK</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">Handle link verification at <code className="font-mono bg-muted px-2 py-1">/api/auth/verify</code>:</p>
          </div>
          <CodeBlock language="bash" code={`// src/app/api/auth/verify/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { encode } from "next-auth/jwt";
import { config } from "@/config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return NextResponse.redirect(
      \`\${config.app.url}/login?error=invalid_link\`
    );
  }

  // Find and validate token
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
      token,
      expires: { gt: new Date() },
    },
  });

  if (!verificationToken) {
    return NextResponse.redirect(
      \`\${config.app.url}/login?error=expired_link\`
    );
  }

  // Delete used token (single-use)
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: email,
        token,
      },
    },
  });

  // Get user and mark email verified
  const user = await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  // Create session token
  const sessionToken = await encode({
    token: {
      sub: user.id,
      email: user.email,
      name: user.name,
    },
    secret: process.env.NEXTAUTH_SECRET!,
  });

  // Set session cookie
  cookies().set("next-auth.session-token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });

  return NextResponse.redirect(\`\${config.app.url}/dashboard\`);
}`} />
        </div>

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">MAGIC_LINK_REQUEST_FORM</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">Client-side form component:</p>
          </div>
          <CodeBlock language="json" code={`"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MagicLinkForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send magic link");
      }

      setSent(true);
    } catch (error) {
      alert("Failed to send magic link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <h3 className="font-mono text-base font-semibold text-foreground mb-2">Check your email</h3>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          We sent a magic link to <strong>{email}</strong>
        </p>
        <p className="font-mono text-sm text-muted-foreground mt-2">
          Click the link in the email to sign in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Magic Link"}
      </Button>
    </form>
  );
}`} />
        </div>

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">MAGIC_LINK_EMAIL_TEMPLATE</h3>
        <div className="space-y-4">
          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">Create the email template:</p>
          </div>
          <CodeBlock language="tsx" code={`// src/emails/MagicLinkEmail.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface MagicLinkEmailProps {
  magicLink: string;
  expiresIn: string;
}

export default function MagicLinkEmail({
  magicLink,
  expiresIn,
}: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your sign-in link</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Sign in to Your App</Heading>
          <Text style={text}>
            Click the button below to sign in. This link expires in {expiresIn}.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={magicLink}>
              Sign In
            </Button>
          </Section>
          <Text style={footer}>
            If you didn't request this email, you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}`} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold text-primary mb-4">COMMON_USE_CASES</h2>

        <div className="grid gap-4">
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">Passwordless Primary Auth</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Use magic links as the primary authentication method. Great for apps where security matters but password fatigue is a concern.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">Secondary Sign-In Option</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Offer alongside password auth with "Forgot password? Sign in with email instead" for users who prefer passwordless.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">Account Recovery</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Use magic links for account recovery when users forget their password, without requiring a separate password reset flow.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">Invite-Based Onboarding</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Send magic link invites to new team members. They click the link to join without setting up credentials first.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold text-primary mb-4">SECURITY_CONSIDERATIONS</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
              <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Single-use tokens:</strong> Delete tokens after verification</li>
              <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Short expiry:</strong> 24 hours or less recommended</li>
              <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Secure generation:</strong> Use cryptographically secure random tokens</li>
              <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Rate limiting:</strong> Prevent abuse by limiting requests per email</li>
              <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>HTTPS only:</strong> Magic links should only work over HTTPS in production</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="font-mono text-lg font-bold text-primary mb-4">BEST_PRACTICES</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
              <li>Show clear confirmation after sending the link</li>
              <li>Include a resend option after 60 seconds</li>
              <li>Tell users to check spam folder</li>
              <li>Use a recognizable sender name and email</li>
              <li>Keep the email template simple and mobile-friendly</li>
              <li>Log magic link requests for security monitoring</li>
              <li>Consider adding device/location info in the email</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
