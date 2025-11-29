import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Protected Pages - Fabrk Docs",
  description: "Secure pages with authentication. Middleware protection, role-based access, and redirect patterns.",
};

export default function ProtectedPagesTutorialPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x50] TUTORIALS ] PROTECTED_PAGES</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">PROTECTED_PAGES</h1>
        <p className="font-mono text-base text-muted-foreground">&gt; Create pages that require authentication to access</p>
      </div>

      {/* How It Works */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">HOW_PROTECTION_WORKS</h2>
        <p className="font-mono text-base text-muted-foreground">
          Fabrk protects routes via middleware. The following routes automatically redirect
          unauthenticated users to the home page:
        </p>
        <div className="space-y-1 font-mono text-sm text-muted-foreground">
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">/dashboard/*</code></div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">/admin/*</code></div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">/billing/*</code></div>
          <div>└─ <code className="bg-muted px-1 font-mono text-xs">/settings/*</code></div>
        </div>
      </div>

      {/* Creating a Protected Page */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">CREATING_A_PROTECTED_PAGE</h2>
        <p className="font-mono text-base text-muted-foreground">
          Simply create your page under one of the protected directories:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`// src/app/(dashboard)/dashboard/my-feature/page.tsx

import { auth } from "@/lib/auth";

export default async function MyFeaturePage() {
  const session = await auth();

  // Session is guaranteed to exist (middleware handles redirect)
  const user = session!.user;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}`} />
        </div>
      </div>

      {/* Adding New Protected Routes */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">ADDING_NEW_PROTECTED_ROUTES</h2>
        <p className="font-mono text-base text-muted-foreground">
          To protect additional routes, update the middleware at{" "}
          <code className="bg-muted px-1 font-mono text-xs">src/middleware.ts</code>:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// src/middleware.ts

// Find this section and add your routes:
const isOnDashboard = pathnameWithoutLocale.startsWith('/dashboard');
const isOnAdmin = pathnameWithoutLocale.startsWith('/admin');
const isOnBilling = pathnameWithoutLocale.startsWith('/billing');
const isOnSettings = pathnameWithoutLocale.startsWith('/settings');
const isOnMyFeature = pathnameWithoutLocale.startsWith('/my-feature'); // Add this

const isProtectedRoute = isOnDashboard || isOnAdmin || isOnBilling || isOnSettings || isOnMyFeature;`} />
        </div>
      </div>

      {/* Role-Based Access */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">ROLE_BASED_ACCESS_CONTROL</h2>
        <p className="font-mono text-base text-muted-foreground">
          Restrict pages by user role:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`// src/app/(dashboard)/admin/page.tsx

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  // Check for admin role
  if (session?.user?.role !== 'ADMIN' && session?.user?.role !== 'SUPER_ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin-only content */}
    </div>
  );
}`} />
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          Available roles: <code className="bg-muted px-1 font-mono text-xs">USER</code>,{" "}
          <code className="bg-muted px-1 font-mono text-xs">ADMIN</code>,{" "}
          <code className="bg-muted px-1 font-mono text-xs">SUPER_ADMIN</code>
        </p>
      </div>

      {/* Client Component Protection */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">CLIENT_COMPONENT_PROTECTION</h2>
        <p className="font-mono text-base text-muted-foreground">
          For client components, use the session hook:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function ProtectedClientComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <p>Welcome, {session.user?.name}!</p>
    </div>
  );
}`} />
        </div>
      </div>

      {/* Conditional UI */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">CONDITIONAL_UI_BASED_ON_AUTH</h2>
        <p className="font-mono text-base text-muted-foreground">
          Show different content based on authentication state:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export function NavBar() {
  const { data: session } = useSession();

  return (
    <nav>
      <Link href="/">Home</Link>

      {session ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/settings">Settings</Link>
        </>
      ) : (
        <>
          <Link href="/auth/signin">Sign In</Link>
          <Link href="/auth/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}`} />
        </div>
      </div>
    </div>
  );
}
