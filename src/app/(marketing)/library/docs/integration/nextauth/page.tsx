/**
 * ✅ FABRK COMPONENT
 * NextAuth Integration Guide
 * Complete guide for adding authentication to library templates
 */
'use client';

import Link from 'next/link';
import { Lock, AlertTriangle } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { LibraryBreadcrumb } from '@/components/library';

export default function NextAuthIntegrationPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      {/* Breadcrumb Navigation */}
      <LibraryBreadcrumb
        items={[
          { label: 'Library', href: '/library' },
          { label: 'Docs', href: '/library/docs' },
          { label: 'NextAuth Integration' },
        ]}
      />

      {/* Header */}
      <section className="space-y-4">
        <div className="border-border inline-block border px-4 py-1">
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
            [INTEGRATION]: NEXTAUTH_V5
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div className={cn('bg-primary/10 p-4', mode.radius)}>
            <Lock className="text-primary h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h1 className={cn(mode.font, 'text-3xl font-semibold tracking-tight')}>
              NextAuth v5 Integration
            </h1>
            <p className={cn(mode.font, 'text-muted-foreground text-sm')}>
              Add authentication to library templates with NextAuth v5, session management, and
              protected routes.
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="border-border border-l-primary flex items-center gap-6 border-l-2 pl-4">
          <div>
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>Time: </span>
            <span className={cn(mode.font, 'text-primary text-xs font-medium')}>~15 minutes</span>
          </div>
          <div>
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>Level: </span>
            <span className={cn(mode.font, 'text-primary text-xs font-medium')}>Intermediate</span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <Card>
        <CardHeader code="0x00" title="OVERVIEW" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>
              Fabrk uses <span className="font-medium">NextAuth v5</span> (Auth.js) for
              authentication. All templates assume authenticated users and need session data for
              features like user profiles, protected routes, and personalized content.
            </p>

            <div className="bg-muted/30 border-border border p-4">
              <p className="text-primary mb-2 font-medium">[WHAT YOU'LL INTEGRATE]:</p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                <li>Session management and JWT tokens (30-day expiry)</li>
                <li>Protected route middleware</li>
                <li>User object access in templates</li>
                <li>Server-side and client-side authentication</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prerequisites */}
      <Card>
        <CardHeader code="0x01" title="PREREQUISITES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Fabrk already includes NextAuth v5. Verify your setup:</p>

            <CodeBlock
              code={`# Check NextAuth is installed
npm list next-auth

# Should show: next-auth@5.0.0-beta.x

# Verify config files exist
ls -la src/lib/auth.ts
ls -la src/app/api/auth/[...nextauth]/route.ts`}
              language="bash"
              maxHeight="150px"
            />

            <div className="border-border border-l-primary space-y-2 border-l-2 pl-4">
              <p className="font-medium">⚠️ Already Setup?</p>
              <p className="text-muted-foreground">
                If you're using Fabrk boilerplate, NextAuth is already configured in{' '}
                <code className="bg-muted px-1">src/lib/auth.ts</code>. Skip to Step 2.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Configuration */}
      <Card>
        <CardHeader code="0x02" title="STEP 1: ENVIRONMENT VARIABLES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>
              Add required environment variables to{' '}
              <code className="bg-muted px-1">.env.local</code>:
            </p>

            <CodeBlock
              code={`# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-32-character-secret-here"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"`}
              language="bash"
              maxHeight="200px"
            />

            <div className="bg-muted/30 border-border border p-4">
              <p className="text-primary mb-2 font-medium">[GENERATE SECRET]:</p>
              <CodeBlock
                code={`# Generate secure random secret
openssl rand -base64 32`}
                language="bash"
                maxHeight="80px"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Access Session */}
      <Card>
        <CardHeader code="0x03" title="STEP 2: ACCESS SESSION IN TEMPLATES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p className="font-medium">Server Components (Recommended):</p>

            <CodeBlock
              code={`import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}`}
              language="tsx"
              maxHeight="300px"
            />

            <p className="font-medium">Client Components:</p>

            <CodeBlock
              code={`"use client";

import { useSession } from "next-auth/react";

export default function ProfileCard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <h2>{session.user.name}</h2>
      <p>{session.user.email}</p>
    </div>
  );
}`}
              language="tsx"
              maxHeight="350px"
            />
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Protect Routes */}
      <Card>
        <CardHeader code="0x04" title="STEP 3: PROTECT ROUTES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Use middleware to protect entire route groups:</p>

            <CodeBlock
              code={`// middleware.ts (root level)
export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",  // Protect all dashboard routes
    "/settings/:path*",   // Protect settings
    "/api/user/:path*",   // Protect user API routes
  ],
};`}
              language="typescript"
              maxHeight="200px"
            />

            <p>Or protect individual pages:</p>

            <CodeBlock
              code={`// app/(dashboard)/analytics/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  // Render protected content
  return <AnalyticsDashboard user={session.user} />;
}`}
              language="tsx"
              maxHeight="250px"
            />
          </div>
        </CardContent>
      </Card>

      {/* Step 4: Template Integration */}
      <Card>
        <CardHeader code="0x05" title="STEP 4: UPDATE TEMPLATES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Most templates need 3 changes to work with authentication:</p>

            <div className="space-y-4">
              <div className="border-border border p-4">
                <p className="text-primary mb-2 font-medium">1. Add session check at top:</p>
                <CodeBlock
                  code={`export default async function TemplatePage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/sign-in");

  // Rest of template code...
}`}
                  language="tsx"
                  maxHeight="150px"
                />
              </div>

              <div className="border-border border p-4">
                <p className="text-primary mb-2 font-medium">2. Pass user data to components:</p>
                <CodeBlock
                  code={`<UserProfile
  name={session.user.name}
  email={session.user.email}
  image={session.user.image}
/>`}
                  language="tsx"
                  maxHeight="120px"
                />
              </div>

              <div className="border-border border p-4">
                <p className="text-primary mb-2 font-medium">3. Update API routes:</p>
                <CodeBlock
                  code={`// app/api/user/route.ts
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ user: session.user });
}`}
                  language="tsx"
                  maxHeight="200px"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Integration */}
      <Card>
        <CardHeader code="0x06" title="EXAMPLE: SETTINGS PAGE" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Complete example of integrating authentication into the Settings Page template:</p>

            <CodeBlock
              code={`import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/settings-form";

export default async function SettingsPage() {
  // 1. Check authentication
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  // 2. Fetch user-specific data
  const userSettings = await getUserSettings(session.user.id);

  // 3. Render template with user data
  return (
    <div className="container mx-auto max-w-4xl space-y-6 px-6 py-8">
      <header>
        <h1>Settings</h1>
        <p>Manage your account settings, {session.user.name}</p>
      </header>

      <SettingsForm
        initialData={userSettings}
        userId={session.user.id}
      />
    </div>
  );
}`}
              language="tsx"
              maxHeight="400px"
            />
          </div>
        </CardContent>
      </Card>

      {/* Common Patterns */}
      <Card>
        <CardHeader code="0x07" title="COMMON PATTERNS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <div className="space-y-4">
              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">User Avatar Display:</p>
                <CodeBlock
                  code={`<Avatar>
  <AvatarImage src={session.user.image ?? undefined} />
  <AvatarFallback>
    {session.user.name?.charAt(0).toUpperCase()}
  </AvatarFallback>
</Avatar>`}
                  language="tsx"
                  maxHeight="150px"
                />
              </div>

              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">Sign Out Button:</p>
                <CodeBlock
                  code={`import { signOut } from "@/lib/auth";

<form action={async () => {
  "use server";
  await signOut();
}}>
  <button type="submit">> SIGN OUT</button>
</form>`}
                  language="tsx"
                  maxHeight="180px"
                />
              </div>

              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">Role-Based Access:</p>
                <CodeBlock
                  code={`const session = await auth();
if (session?.user?.role !== "ADMIN") {
  redirect("/dashboard");
}

// Render admin-only template
return <AdminPanel />;`}
                  language="tsx"
                  maxHeight="150px"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader code="0x08" title="TROUBLESHOOTING" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <div className="border-border border p-4">
              <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4" />
                [ERROR]: Session is null
              </p>
              <p className="text-muted-foreground mb-2">
                <span className="font-medium">Cause:</span> User not authenticated or session
                expired.
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Fix:</span> Redirect to sign-in page. Verify{' '}
                <code className="bg-muted px-1">NEXTAUTH_SECRET</code> is set.
              </p>
            </div>

            <div className="border-border border p-4">
              <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4" />
                [ERROR]: useSession is not a function
              </p>
              <p className="text-muted-foreground mb-2">
                <span className="font-medium">Cause:</span> Missing SessionProvider wrapper.
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Fix:</span> Wrap app in{' '}
                <code className="bg-muted px-1">{'<SessionProvider>'}</code> in root layout.
              </p>
            </div>

            <div className="border-border border p-4">
              <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4" />
                [ERROR]: Middleware redirect loop
              </p>
              <p className="text-muted-foreground mb-2">
                <span className="font-medium">Cause:</span> Sign-in page is protected by middleware.
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Fix:</span> Exclude auth routes from middleware
                matcher.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader code="0x09" title="NEXT STEPS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Now that authentication is integrated:</p>

            <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
              <li>
                <Link
                  href="/library/docs/integration/prisma"
                  className="text-primary hover:underline"
                >
                  Connect Prisma
                </Link>{' '}
                to store user data in database
              </li>
              <li>
                <Link
                  href="/library/docs/integration/polar"
                  className="text-primary hover:underline"
                >
                  Add Polar.sh
                </Link>{' '}
                for user subscriptions and payments
              </li>
              <li>
                <Link href="/library/docs/customization" className="text-primary hover:underline">
                  Customize templates
                </Link>{' '}
                to match your brand
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
