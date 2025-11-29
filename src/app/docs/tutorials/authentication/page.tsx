import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Authentication Guide - Fabrk Docs",
  description: "Add user authentication to your SaaS with NextAuth v5. Supports Google OAuth, magic links, credentials, and session management.",
};

export default function AuthenticationTutorialPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x20] TUTORIALS ] AUTHENTICATION</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">USER_AUTHENTICATION</h1>
        <p className="font-mono text-base text-muted-foreground">
          &gt; Let users create accounts, log in, and securely access your app.
        </p>
      </div>

      {/* What is Authentication - Plain English */}
      <Card className="rounded-none">
        <CardContent className="p-4 space-y-3">
          <h2 className="font-mono text-lg font-bold text-foreground">WHAT_IS_AUTHENTICATION?</h2>
          <p className="font-mono text-base text-muted-foreground">
            Authentication is how your app knows who someone is. When a user creates an account
            and logs in, your app gives them a &quot;pass&quot; (called a session) that proves their identity.
            This pass gets checked every time they access protected areas of your app.
          </p>
          <p className="font-mono text-base text-muted-foreground">
            Think of it like a hotel key card - you check in once (log in), get your key card (session),
            and use it to access your room (protected pages) without re-checking in every time.
          </p>
        </CardContent>
      </Card>

      {/* Why You Need This */}
      <Card className="rounded-none">
        <CardContent className="p-4 space-y-3">
          <h2 className="font-mono text-lg font-bold text-foreground">WHY_YOU_NEED_THIS</h2>
          <div className="space-y-1 font-mono text-sm text-muted-foreground">
            <div>├─ <strong>Personalization:</strong> Save user preferences, data, and history</div>
            <div>├─ <strong>Security:</strong> Keep private data private and prevent unauthorized access</div>
            <div>├─ <strong>Billing:</strong> Know who to charge for premium features</div>
            <div>└─ <strong>Communication:</strong> Send emails to specific users</div>
          </div>
        </CardContent>
      </Card>

      {/* What's Included */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">WHATS_ALREADY_BUILT</h2>
        <p className="font-mono text-base text-muted-foreground">
          Fabrk includes a complete authentication system. You don&apos;t need to build any of this:
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-none">
            <CardContent className="p-4">
              <h3 className="font-mono text-xs font-semibold">Email/Password</h3>
              <p className="font-mono text-xs text-muted-foreground">
                Traditional signup with encrypted passwords. Industry-standard bcrypt hashing.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-4">
              <h3 className="font-mono text-xs font-semibold">Google Login</h3>
              <p className="font-mono text-xs text-muted-foreground">
                One-click signup with Google accounts. No passwords to remember.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-4">
              <h3 className="font-mono text-xs font-semibold">Email Verification</h3>
              <p className="font-mono text-xs text-muted-foreground">
                Confirm users own their email address before full access.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-4">
              <h3 className="font-mono text-xs font-semibold">Password Reset</h3>
              <p className="font-mono text-xs text-muted-foreground">
                Secure &quot;forgot password&quot; flow with expiring tokens.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-4">
              <h3 className="font-mono text-xs font-semibold">Two-Factor Auth</h3>
              <p className="font-mono text-xs text-muted-foreground">
                Optional 2FA with authenticator apps for extra security.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-4">
              <h3 className="font-mono text-xs font-semibold">Protected Routes</h3>
              <p className="font-mono text-xs text-muted-foreground">
                Automatically block unauthenticated users from private pages.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Setup */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="font-mono text-lg font-bold">QUICK_SETUP</h2>
          <span className="border border-primary bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
            [2_MIN]
          </span>
        </div>
        <div>
          <p className="font-mono text-base text-muted-foreground">
            Authentication works out of the box. Just set these two environment variables:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# .env.local

# Where your app runs
NEXTAUTH_URL="http://localhost:3000"

# A random secret for encrypting sessions (generate one below)
NEXTAUTH_SECRET="your-32-character-secret"`} />
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          Generate a secret by running: <code className="bg-muted px-1 font-mono text-xs">openssl rand -base64 32</code>
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          That&apos;s it! Users can now sign up and log in with email/password. Google login requires
          additional setup below.
        </p>
      </div>

      {/* How Authentication Works - For learners */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">HOW_IT_WORKS</h2>
        <p className="font-mono text-base text-muted-foreground">
          Here&apos;s what happens when a user interacts with your app:
        </p>
        <div className="space-y-2">
          <div className="border border-border bg-card p-4">
            <h3 className="font-mono text-xs font-semibold mb-2">WHEN_USER_SIGNS_UP</h3>
            <div className="space-y-1 font-mono text-sm text-muted-foreground">
              <div>├─ User enters email and password on the signup form</div>
              <div>├─ Password is encrypted (never stored as plain text)</div>
              <div>├─ Account is created in your database</div>
              <div>├─ Verification email is sent (if enabled)</div>
              <div>└─ User clicks the verification link to confirm their email</div>
            </div>
          </div>
          <div className="border border-border bg-card p-4">
            <h3 className="font-mono text-xs font-semibold mb-2">WHEN_USER_LOGS_IN</h3>
            <div className="space-y-1 font-mono text-sm text-muted-foreground">
              <div>├─ User enters email and password</div>
              <div>├─ System checks if the password matches</div>
              <div>├─ If correct, a session token is created</div>
              <div>├─ Token is stored in a secure cookie in their browser</div>
              <div>└─ User is redirected to the dashboard</div>
            </div>
          </div>
          <div className="border border-border bg-card p-4">
            <h3 className="font-mono text-xs font-semibold mb-2">ON_EVERY_PAGE_VISIT</h3>
            <div className="space-y-1 font-mono text-sm text-muted-foreground">
              <div>├─ Browser automatically sends the session cookie</div>
              <div>├─ Server verifies the token is valid</div>
              <div>└─ If valid, user sees the page. If not, redirected to login</div>
            </div>
          </div>
        </div>
      </div>

      {/* Google OAuth - Step by Step */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">ADD_GOOGLE_LOGIN</h2>
        <p className="font-mono text-base text-muted-foreground">
          Let users sign in with their Google account. This is convenient for users and often
          increases signup rates.
        </p>

        {/* Analogy */}
        <Card className="rounded-none bg-muted">
          <CardContent className="p-4">
            <p className="font-mono text-xs text-muted-foreground">
              <strong>How Google login works:</strong> Think of it like a valet service. Instead
              of giving your app your password (car keys), you let Google (the valet) verify
              who you are and vouch for you. Google tells your app &quot;yes, this person is who
              they say they are&quot; without ever sharing the user&apos;s Google password.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4 mt-3">
          {/* Step 1 */}
          <div className="space-y-2 border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">
                1
              </span>
              <h3 className="font-mono text-xs font-semibold">CREATE_GOOGLE_CLOUD_PROJECT</h3>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              Go to the{" "}
              <a
                href="https://console.cloud.google.com/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Cloud Console
              </a>{" "}
              and create a new project (or use an existing one). The project name can be anything -
              it&apos;s just for your organization.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-2 border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">
                2
              </span>
              <h3 className="font-mono text-xs font-semibold">CONFIGURE_OAUTH_CONSENT</h3>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              Go to &quot;APIs &amp; Services&quot; → &quot;OAuth consent screen&quot;. This is the screen users see
              when signing in with Google. Choose &quot;External&quot; (for public apps), then fill in:
            </p>
            <div className="space-y-1 font-mono text-sm text-muted-foreground mt-2">
              <div>├─ <strong>App name:</strong> Your SaaS name</div>
              <div>├─ <strong>User support email:</strong> Your email</div>
              <div>└─ <strong>Developer contact:</strong> Your email</div>
            </div>
            <p className="font-mono text-xs text-muted-foreground mt-2">
              Skip the scopes page (defaults are fine) and save.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">
                3
              </span>
              <h3 className="font-mono text-xs font-semibold">CREATE_OAUTH_CREDENTIALS</h3>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              Go to &quot;APIs &amp; Services&quot; → &quot;Credentials&quot; → &quot;Create Credentials&quot; → &quot;OAuth client ID&quot;.
            </p>
            <div className="space-y-1 font-mono text-sm text-muted-foreground mt-2">
              <div>├─ <strong>Application type:</strong> Web application</div>
              <div>├─ <strong>Name:</strong> Anything (e.g., &quot;My SaaS Web Client&quot;)</div>
              <div>└─ <strong>Authorized redirect URIs:</strong></div>
            </div>
            <div className="space-y-3">
              <div className="[&>div]:rounded-none">
                <CodeBlock language="text" code={`http://localhost:3000/api/auth/callback/google`} />
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  For production, add your real domain too:
                </p>
              </div>
              <div className="[&>div]:rounded-none">
                <CodeBlock language="text" code={`https://yourdomain.com/api/auth/callback/google`} />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center bg-primary font-mono text-xs font-bold text-primary-foreground">
                4
              </span>
              <h3 className="font-mono text-xs font-semibold">ADD_CREDENTIALS_TO_APP</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-mono text-base text-muted-foreground">
                  Copy the Client ID and Client Secret from Google, then add them to your{" "}
                  <code className="bg-muted px-1 font-mono text-xs">.env.local</code> file:
                </p>
              </div>
              <div className="[&>div]:rounded-none">
                <CodeBlock language="bash" code={`# .env.local

GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"`} />
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                Google login is now enabled! The &quot;Sign in with Google&quot; button will appear automatically
                on your login page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Protecting Pages */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">PROTECTED_PAGES</h2>
        <p className="font-mono text-base text-muted-foreground">
          Some pages should only be visible to logged-in users. Fabrk automatically protects
          these routes:
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="border border-border bg-card p-4">
            <code className="font-mono text-xs">/dashboard/*</code>
            <p className="font-mono text-xs text-muted-foreground">Main user dashboard</p>
          </div>
          <div className="border border-border bg-card p-4">
            <code className="font-mono text-xs">/settings/*</code>
            <p className="font-mono text-xs text-muted-foreground">User settings pages</p>
          </div>
          <div className="border border-border bg-card p-4">
            <code className="font-mono text-xs">/billing/*</code>
            <p className="font-mono text-xs text-muted-foreground">Payment and subscription pages</p>
          </div>
          <div className="border border-border bg-card p-4">
            <code className="font-mono text-xs">/admin/*</code>
            <p className="font-mono text-xs text-muted-foreground">Admin-only pages</p>
          </div>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          If someone tries to visit these pages without being logged in, they&apos;re automatically
          sent to the login page.
        </p>
      </div>

      {/* Code Examples - For developers */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">CODE_REFERENCE</h2>
        <p className="font-mono text-base text-muted-foreground">
          Here&apos;s how to use authentication in your own code:
        </p>

        {/* Check if user is logged in - API routes */}
        <div className="space-y-3">
          <div>
            <h3 className="font-mono text-xs font-semibold">IN_API_ROUTES</h3>
            <p className="font-mono text-base text-muted-foreground">
              Check if the user is logged in and get their info:
            </p>
          </div>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="typescript" code={`// src/app/api/your-route/route.ts

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  // Get the current user's session
  const session = await auth();

  // Check if they're logged in
  if (!session?.user) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 }
    );
  }

  // User is logged in - you can access their info
  const userId = session.user.id;
  const userEmail = session.user.email;

  return NextResponse.json({
    message: "Hello!",
    userId
  });
}`} />
          </div>
        </div>

        {/* Client-side auth */}
        <div className="space-y-3 mt-4">
          <div>
            <h3 className="font-mono text-xs font-semibold">IN_REACT_COMPONENTS</h3>
            <p className="font-mono text-base text-muted-foreground">
              Show different content based on login status:
            </p>
          </div>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="tsx" code={`"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function UserStatus() {
  // Get session data and loading state
  const { data: session, status } = useSession();

  // Show loading while checking auth
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // User is logged in
  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.email}!</p>
        <button onClick={() => signOut()}>
          Log out
        </button>
      </div>
    );
  }

  // User is not logged in
  return (
    <button onClick={() => signIn()}>
      Log in
    </button>
  );
}`} />
          </div>
        </div>

        {/* Server component */}
        <div className="space-y-3 mt-4">
          <div>
            <h3 className="font-mono text-xs font-semibold">IN_SERVER_COMPONENTS</h3>
            <p className="font-mono text-base text-muted-foreground">
              Check auth status in Next.js Server Components:
            </p>
          </div>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="tsx" code={`// No "use client" - this runs on the server

import { auth } from "@/lib/auth";

export default async function PrivatePage() {
  const session = await auth();

  if (!session) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}!</h1>
      <p>This is your private dashboard.</p>
    </div>
  );
}`} />
          </div>
        </div>
      </div>

      {/* Email Verification */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">EMAIL_VERIFICATION</h2>
        <p className="font-mono text-base text-muted-foreground">
          By default, Fabrk requires users to verify their email address. This ensures you can
          contact users and prevents fake signups.
        </p>
        <div className="border border-border bg-card p-4">
          <h3 className="font-mono text-xs font-semibold mb-2">HOW_IT_WORKS</h3>
          <div className="space-y-1 font-mono text-sm text-muted-foreground">
            <div>├─ User signs up with their email</div>
            <div>├─ They receive an email with a special link</div>
            <div>├─ Clicking the link verifies their email</div>
            <div>└─ They can now fully use your app</div>
          </div>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          <strong>Want to disable verification?</strong> In{" "}
          <code className="bg-muted px-1 font-mono text-xs">src/config.js</code>, set{" "}
          <code className="bg-muted px-1 font-mono text-xs">emailVerification: false</code>. Not recommended
          for production apps.
        </p>
      </div>

      {/* Common Questions */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">COMMON_QUESTIONS</h2>
        <div className="space-y-2">
          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono text-xs font-medium">
              [FAQ] SESSION_DURATION?
            </summary>
            <div className="border-t p-4 font-mono text-xs text-muted-foreground">
              <p>
                Sessions last 30 days by default. After 30 days, users need to log in again.
                You can change this in <code className="bg-muted px-1 font-mono text-xs">src/lib/auth.ts</code>.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono text-xs font-medium">
              [FAQ] FORCE_USER_LOGOUT?
            </summary>
            <div className="border-t p-4 font-mono text-xs text-muted-foreground">
              <p>
                Increment the user&apos;s <code className="bg-muted px-1 font-mono text-xs">sessionVersion</code> in
                the database. This instantly invalidates all their sessions. Useful for security
                actions like password changes.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono text-xs font-medium">
              [FAQ] PASSWORD_SECURITY?
            </summary>
            <div className="border-t p-4 font-mono text-xs text-muted-foreground">
              <p>
                Yes. Passwords are hashed using bcrypt with 12 rounds. Even if your database
                is compromised, attackers can&apos;t see the original passwords.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono text-xs font-medium">
              [FAQ] ADD_OTHER_OAUTH_PROVIDERS?
            </summary>
            <div className="border-t p-4 font-mono text-xs text-muted-foreground">
              <p>
                Yes! NextAuth supports 50+ providers. Add them in{" "}
                <code className="bg-muted px-1 font-mono text-xs">src/lib/auth.ts</code>. See the{" "}
                <a href="https://authjs.dev/reference/core/providers" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  NextAuth providers documentation
                </a>.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/mfa">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-mono text-xs font-semibold">Two-Factor Authentication</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Add extra security with authenticator apps like Google Authenticator.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/features/payments">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-mono text-xs font-semibold">Set Up Payments</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Accept payments from your authenticated users.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Back to docs link */}
      <div className="pt-4">
        <Link href="/docs" className="font-mono text-xs text-primary hover:underline">
          ← Back to Documentation
        </Link>
      </div>
    </div>
  );
}
