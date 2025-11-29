import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Google OAuth Setup - Fabrk Docs",
  description: "Enable Google Sign-In for your SaaS. Step-by-step guide to configure Google OAuth with NextAuth v5.",
};

export default function GoogleOAuthPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline text-sm">
          ← Back to Documentation
        </Link>
      </div>

      <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
        <span className="font-mono text-xs text-muted-foreground">[ [0x20] FEATURES ] GOOGLE_OAUTH</span>
      </div>
      <h1 className="font-mono text-3xl font-bold tracking-tight mb-4">GOOGLE_OAUTH_SETUP</h1>
      <p className="font-mono text-sm text-muted-foreground mb-8">
        &gt; Enable one-click Google sign-in for your users with OAuth 2.0 integration.
      </p>

      <section className="mb-12">
        <h2 className="font-mono text-xl font-semibold mb-4">OVERVIEW</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Fabrk supports Google OAuth through NextAuth v5 with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>One-click sign-in with Google accounts</li>
              <li>Automatic account linking for existing email users</li>
              <li>Profile photo and name sync from Google</li>
              <li>Conditional enabling based on environment variables</li>
              <li>Secure token handling with JWT sessions</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-xl font-semibold mb-4">CONFIGURATION</h2>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground">1</span>
          <h3 className="font-mono text-xl font-medium">CREATE_GOOGLE_CLOUD_PROJECT</h3>
        </div>
        <ol className="list-decimal pl-6 space-y-3 mb-6 text-muted-foreground">
          <li>Go to <a href="https://console.cloud.google.com" className="text-primary hover:underline">Google Cloud Console</a></li>
          <li>Create a new project or select existing one</li>
          <li>Navigate to APIs & Services → OAuth consent screen</li>
          <li>
            Configure the consent screen:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>User type: External</li>
              <li>App name: Your app name</li>
              <li>Support email: Your email</li>
              <li>Authorized domains: yourdomain.com</li>
            </ul>
          </li>
          <li>Add scopes: <code className="font-mono bg-muted px-1">email</code>, <code className="font-mono bg-muted px-1">profile</code>, <code className="font-mono bg-muted px-1">openid</code></li>
        </ol>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground">2</span>
          <h3 className="font-mono text-xl font-medium">CREATE_OAUTH_CREDENTIALS</h3>
        </div>
        <ol className="list-decimal pl-6 space-y-3 mb-6 text-muted-foreground">
          <li>Go to APIs & Services → Credentials</li>
          <li>Click Create Credentials → OAuth client ID</li>
          <li>Application type: Web application</li>
          <li>
            Add Authorized JavaScript origins:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><code className="font-mono bg-muted px-1">http://localhost:3000</code> (development)</li>
              <li><code className="font-mono bg-muted px-1">https://yourdomain.com</code> (production)</li>
            </ul>
          </li>
          <li>
            Add Authorized redirect URIs:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><code className="font-mono bg-muted px-1">http://localhost:3000/api/auth/callback/google</code></li>
              <li><code className="font-mono bg-muted px-1">https://yourdomain.com/api/auth/callback/google</code></li>
            </ul>
          </li>
          <li>Copy the Client ID and Client Secret</li>
        </ol>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground">3</span>
          <h3 className="font-mono text-xl font-medium">SET_ENVIRONMENT_VARIABLES</h3>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground">Add to <code className="font-mono bg-muted px-2 py-1">.env.local</code>:</p>
          </div>
          <CodeBlock language="typescript" code={`GOOGLE_CLIENT_ID="xxxxxxxxxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxx"`} />
          <p className="mt-4 text-muted-foreground">
            Google OAuth is automatically enabled when these variables are set.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-xl font-semibold mb-4">CODE_EXAMPLES</h2>

        <h3 className="font-mono text-xl font-medium mb-3">AUTH_CONFIGURATION</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-muted-foreground">Google provider is configured in <code className="font-mono bg-muted px-2 py-1">src/lib/auth.ts</code>:</p>
          </div>
          <CodeBlock language="typescript" code={`// src/lib/auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { env } from "@/lib/env";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // Only include Google if credentials are set
    ...(env.server.GOOGLE_CLIENT_ID && env.server.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: env.server.GOOGLE_CLIENT_ID,
            clientSecret: env.server.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    // ... other providers
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Check if user exists with this email
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          // Link Google account to existing user
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: account.providerAccountId,
              },
            },
            update: {},
            create: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
            },
          });
        }
      }
      return true;
    },
  },
});`} />
        </div>

        <h3 className="font-mono text-xl font-medium mb-3">SIGN_IN_BUTTON</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-muted-foreground">Add Google sign-in to your login page:</p>
          </div>
          <CodeBlock language="tsx" code={`"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function GoogleSignInButton() {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      Continue with Google
    </Button>
  );
}`} />
        </div>

        <h3 className="font-mono text-xl font-medium mb-3">CONDITIONAL_RENDERING</h3>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground">Show Google button only when configured:</p>
          </div>
          <CodeBlock language="tsx" code={`import { config } from "@/config";

export function LoginForm() {
  return (
    <div>
      {/* Email/password form */}
      <form>...</form>

      {config.features.googleAuth && (
        <>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleSignInButton />
        </>
      )}
    </div>
  );
}`} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-xl font-semibold mb-4">COMMON_USE_CASES</h2>

        <div className="grid gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Frictionless Onboarding</h3>
              <p className="text-muted-foreground">
                Reduce signup friction with one-click Google sign-in. Users can start using your app in seconds without creating a password.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Account Linking</h3>
              <p className="text-muted-foreground">
                Allow existing email/password users to link their Google account for faster future logins while keeping their existing data.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">G Suite Organizations</h3>
              <p className="text-muted-foreground">
                Perfect for B2B SaaS targeting companies using Google Workspace. Users sign in with their work Google accounts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Profile Sync</h3>
              <p className="text-muted-foreground">
                Automatically sync user profile photo and name from Google, reducing setup steps and improving UX.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-xl font-semibold mb-4">TROUBLESHOOTING</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Error: redirect_uri_mismatch</h4>
                <p className="text-muted-foreground text-sm">
                  The callback URL doesn't match what's configured in Google Cloud Console. Ensure your redirect URI exactly matches, including protocol (http vs https).
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Error: access_denied</h4>
                <p className="text-muted-foreground text-sm">
                  User denied access or app is in testing mode with unverified users. Add test users in OAuth consent screen or publish the app.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Button not appearing</h4>
                <p className="text-muted-foreground text-sm">
                  Check that <code className="font-mono bg-muted px-1">GOOGLE_CLIENT_ID</code> and <code className="font-mono bg-muted px-1">GOOGLE_CLIENT_SECRET</code> are set. Restart the dev server after adding env vars.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="font-mono text-xl font-semibold mb-4">BEST_PRACTICES</h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>Always offer email/password as an alternative to OAuth</li>
              <li>Handle account linking for users who sign up with email first</li>
              <li>Request minimal scopes (email, profile, openid)</li>
              <li>Store refresh tokens securely if you need offline access</li>
              <li>Publish your app for production (removes 100 user limit)</li>
              <li>Add your privacy policy and terms links to consent screen</li>
              <li>Test with multiple Google accounts during development</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
