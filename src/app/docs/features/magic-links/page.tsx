import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export default function MagicLinksPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline text-sm">
          ← Back to Documentation
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Magic Link Authentication</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Passwordless authentication via email magic links for frictionless sign-in.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">
              Magic links provide passwordless authentication by sending a unique, time-limited link to the user's email. Features include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>One-click sign-in from email</li>
              <li>No password to remember or manage</li>
              <li>Automatic email verification</li>
              <li>Time-limited tokens (24 hours default)</li>
              <li>Single-use links for security</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Configuration</h2>

        <h3 className="text-xl font-medium mb-3">1. Enable Magic Links</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Enable the feature in <code className="bg-muted px-2 py-1 rounded">src/config.js</code>:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`export const config = {
  features: {
    magicLinks: true,
    // ...other features
  },
};`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">2. Configure Email</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Ensure email is configured in <code className="bg-muted px-2 py-1 rounded">.env.local</code>:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="Your App <noreply@yourdomain.com>"
NEXT_PUBLIC_APP_URL="http://localhost:3000"`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">3. Token Settings</h3>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">Configure token expiration:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`export const config = {
  auth: {
    magicLinkExpiry: 24 * 60 * 60 * 1000, // 24 hours in ms
    // ...
  },
};`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>

        <h3 className="text-xl font-medium mb-3">Request Magic Link API</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Create the API endpoint at <code className="bg-muted px-2 py-1 rounded">/api/auth/magic-link</code>:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/app/api/auth/magic-link/route.ts
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
}`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Verify Magic Link</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Handle link verification at <code className="bg-muted px-2 py-1 rounded">/api/auth/verify</code>:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/app/api/auth/verify/route.ts
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
}`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Magic Link Request Form</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Client-side form component:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"use client";

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
        <h3 className="text-lg font-semibold mb-2">Check your email</h3>
        <p className="text-muted-foreground">
          We sent a magic link to <strong>{email}</strong>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
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
}`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Magic Link Email Template</h3>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">Create the email template:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/emails/MagicLinkEmail.tsx
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
              <h3 className="font-semibold mb-2">Passwordless Primary Auth</h3>
              <p className="text-muted-foreground">
                Use magic links as the primary authentication method. Great for apps where security matters but password fatigue is a concern.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Secondary Sign-In Option</h3>
              <p className="text-muted-foreground">
                Offer alongside password auth with "Forgot password? Sign in with email instead" for users who prefer passwordless.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Account Recovery</h3>
              <p className="text-muted-foreground">
                Use magic links for account recovery when users forget their password, without requiring a separate password reset flow.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Invite-Based Onboarding</h3>
              <p className="text-muted-foreground">
                Send magic link invites to new team members. They click the link to join without setting up credentials first.
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
              <li><strong>Single-use tokens:</strong> Delete tokens after verification</li>
              <li><strong>Short expiry:</strong> 24 hours or less recommended</li>
              <li><strong>Secure generation:</strong> Use cryptographically secure random tokens</li>
              <li><strong>Rate limiting:</strong> Prevent abuse by limiting requests per email</li>
              <li><strong>HTTPS only:</strong> Magic links should only work over HTTPS in production</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <ul className="list-disc pl-6 space-y-2">
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
