import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export default function AuthenticationTutorialPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">User Authentication</h1>
        <p className="text-lg text-muted-foreground">
          Set up user authentication with NextAuth v5, Google OAuth, and email/password.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold">What's Included</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>Email/password authentication with bcrypt</li>
            <li>Google OAuth (optional)</li>
            <li>Email verification flow</li>
            <li>Password reset with secure tokens</li>
            <li>JWT sessions (30-day expiration)</li>
            <li>Session versioning for instant logout</li>
          </ul>
        </CardContent>
      </Card>

      {/* Basic Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Setup</h2>
        <p className="text-muted-foreground">
          Authentication is already configured in <code className="rounded bg-muted px-1 py-0.5">src/lib/auth.ts</code>.
          You just need to set your environment variables:
        </p>
        <CodeBlock language="bash" code={`# .env.local

# Required for all auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-32-character-secret-here"

# Generate a secret with:
openssl rand -base64 32`} />
      </div>

      {/* Google OAuth */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Google OAuth Setup</h2>
        <ol className="list-inside list-decimal space-y-3 text-muted-foreground">
          <li>
            Go to{" "}
            <a
              href="https://console.cloud.google.com/apis/credentials"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Cloud Console → Credentials
            </a>
          </li>
          <li>Create a new OAuth 2.0 Client ID</li>
          <li>
            Add authorized redirect URI:
            <code className="ml-2 rounded bg-muted px-1 py-0.5">
              http://localhost:3000/api/auth/callback/google
            </code>
          </li>
          <li>Copy Client ID and Client Secret</li>
        </ol>
        <CodeBlock language="bash" code={`# .env.local

GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"`} />
        <p className="text-sm text-muted-foreground">
          Google OAuth is automatically enabled when these variables are set.
        </p>
      </div>

      {/* Protecting Routes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Protecting Routes</h2>
        <p className="text-muted-foreground">
          Routes are protected via middleware in <code className="rounded bg-muted px-1 py-0.5">src/middleware.ts</code>.
          These routes require authentication:
        </p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li><code className="rounded bg-muted px-1 py-0.5">/dashboard/*</code></li>
          <li><code className="rounded bg-muted px-1 py-0.5">/admin/*</code></li>
          <li><code className="rounded bg-muted px-1 py-0.5">/billing/*</code></li>
          <li><code className="rounded bg-muted px-1 py-0.5">/settings/*</code></li>
        </ul>
      </div>

      {/* API Route Protection */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Route Protection</h2>
        <p className="text-muted-foreground">
          Protect API routes by checking the session:
        </p>
        <CodeBlock language="typescript" code={`// src/app/api/your-route/route.ts

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // User is authenticated
  const userId = session.user.id;

  return NextResponse.json({ userId });
}`} />
      </div>

      {/* Client-Side Auth */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Client-Side Authentication</h2>
        <p className="text-muted-foreground">
          Use the session in client components:
        </p>
        <CodeBlock language="tsx" code={`"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn()}>Sign in</button>
  );
}`} />
      </div>

      {/* Email Verification */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Email Verification</h2>
        <p className="text-muted-foreground">
          Email verification is enabled by default. When a user registers:
        </p>
        <ol className="list-inside list-decimal space-y-1 text-muted-foreground">
          <li>A verification token is generated</li>
          <li>An email is sent with a verification link</li>
          <li>User clicks link to verify their email</li>
          <li>User can now access protected features</li>
        </ol>
        <p className="mt-4 text-sm text-muted-foreground">
          To disable email verification, set{" "}
          <code className="rounded bg-muted px-1 py-0.5">emailVerification: false</code> in{" "}
          <code className="rounded bg-muted px-1 py-0.5">src/config.js</code>.
        </p>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/mfa">
            <Card className="h-full shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Multi-Factor Auth</h3>
                <p className="text-sm text-muted-foreground">
                  Add TOTP, SMS, or WebAuthn 2FA
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/protected-pages">
            <Card className="h-full shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Protected Pages</h3>
                <p className="text-sm text-muted-foreground">
                  Create pages that require authentication
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
