import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Protected Pages - Fabrk Docs",
  description: "Secure pages with authentication. Middleware protection, role-based access, and redirect patterns.",
};

export default function ProtectedPagesTutorialPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Protected Pages</h1>
        <p className="text-lg text-muted-foreground">
          Create pages that require authentication to access.
        </p>
      </div>

      {/* How It Works */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">How Protection Works</h2>
        <p className="text-muted-foreground">
          Fabrk protects routes via middleware. The following routes automatically redirect
          unauthenticated users to the home page:
        </p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li><code className="rounded bg-muted px-1 py-0.5">/dashboard/*</code></li>
          <li><code className="rounded bg-muted px-1 py-0.5">/admin/*</code></li>
          <li><code className="rounded bg-muted px-1 py-0.5">/billing/*</code></li>
          <li><code className="rounded bg-muted px-1 py-0.5">/settings/*</code></li>
        </ul>
      </div>

      {/* Creating a Protected Page */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Creating a Protected Page</h2>
        <p className="text-muted-foreground">
          Simply create your page under one of the protected directories:
        </p>
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

      {/* Adding New Protected Routes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Adding New Protected Routes</h2>
        <p className="text-muted-foreground">
          To protect additional routes, update the middleware at{" "}
          <code className="rounded bg-muted px-1 py-0.5">src/middleware.ts</code>:
        </p>
        <CodeBlock language="typescript" code={`// src/middleware.ts

// Find this section and add your routes:
const isOnDashboard = pathnameWithoutLocale.startsWith('/dashboard');
const isOnAdmin = pathnameWithoutLocale.startsWith('/admin');
const isOnBilling = pathnameWithoutLocale.startsWith('/billing');
const isOnSettings = pathnameWithoutLocale.startsWith('/settings');
const isOnMyFeature = pathnameWithoutLocale.startsWith('/my-feature'); // Add this

const isProtectedRoute = isOnDashboard || isOnAdmin || isOnBilling || isOnSettings || isOnMyFeature;`} />
      </div>

      {/* Role-Based Access */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Role-Based Access Control</h2>
        <p className="text-muted-foreground">
          Restrict pages by user role:
        </p>
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
        <p className="text-sm text-muted-foreground">
          Available roles: <code className="rounded bg-muted px-1 py-0.5">USER</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5">ADMIN</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5">SUPER_ADMIN</code>
        </p>
      </div>

      {/* Client Component Protection */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Client Component Protection</h2>
        <p className="text-muted-foreground">
          For client components, use the session hook:
        </p>
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

      {/* Conditional UI */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Conditional UI Based on Auth</h2>
        <p className="text-muted-foreground">
          Show different content based on authentication state:
        </p>
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
  );
}
