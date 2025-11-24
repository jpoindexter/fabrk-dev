import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export default function CSRFProtectionPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">CSRF Protection</h1>
        <p className="text-lg text-muted-foreground">
          Protect your forms and API endpoints from cross-site request forgery attacks.
        </p>
      </div>

      <Card className="bg-zinc-950">
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold">What's Included</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>Automatic CSRF protection for NextAuth routes</li>
            <li>Double-submit cookie pattern</li>
            <li>Per-session token generation</li>
            <li>Custom form protection utilities</li>
            <li>SameSite cookie configuration</li>
            <li>Origin validation middleware</li>
          </ul>
        </CardContent>
      </Card>

      {/* Built-in Protection */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Built-in Protection</h2>
        <p className="text-muted-foreground">
          NextAuth v5 automatically protects all authentication routes with CSRF tokens.
          No additional configuration is needed for login, logout, and registration forms.
        </p>
        <CodeBlock language="typescript" code={`// CSRF protection is automatic for NextAuth routes:
// - /api/auth/signin
// - /api/auth/signout
// - /api/auth/callback/*
// - /api/auth/session

// The middleware in src/middleware.ts handles validation`} />
      </div>

      {/* Getting CSRF Token */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Getting CSRF Token</h2>
        <p className="text-muted-foreground">
          Retrieve the CSRF token for custom forms:
        </p>
        <CodeBlock language="tsx" code={`"use client";

import { getCsrfToken } from "next-auth/react";
import { useEffect, useState } from "react";

export function SecureForm() {
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    getCsrfToken().then((token) => {
      if (token) setCsrfToken(token);
    });
  }, []);

  return (
    <form action="/api/your-endpoint" method="POST">
      <input
        type="hidden"
        name="csrfToken"
        value={csrfToken}
      />
      <input type="text" name="data" />
      <button type="submit">Submit</button>
    </form>
  );
}`} />
      </div>

      {/* Server-Side Validation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Server-Side Validation</h2>
        <p className="text-muted-foreground">
          Validate CSRF tokens in your API routes:
        </p>
        <CodeBlock language="typescript" code={`// src/lib/csrf.ts

import { cookies } from "next/headers";
import { createHash } from "crypto";

export async function validateCsrfToken(token: string): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value;

  if (!sessionToken || !token) {
    return false;
  }

  // Validate token matches session
  const expectedToken = createHash("sha256")
    .update(\`\${sessionToken}csrf\`)
    .digest("hex");

  return token === expectedToken;
}

// Usage in API route
// src/app/api/secure-action/route.ts

import { NextRequest, NextResponse } from "next/server";
import { validateCsrfToken } from "@/lib/csrf";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const isValid = await validateCsrfToken(body.csrfToken);

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid CSRF token" },
      { status: 403 }
    );
  }

  // Process secure action
  return NextResponse.json({ success: true });
}`} />
      </div>

      {/* Origin Validation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Origin Validation</h2>
        <p className="text-muted-foreground">
          Add origin validation as an additional security layer:
        </p>
        <CodeBlock language="typescript" code={`// src/lib/security.ts

import { NextRequest, NextResponse } from "next/server";

export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    "http://localhost:3000",
  ].filter(Boolean);

  // Check origin header
  if (origin && !allowedOrigins.includes(origin)) {
    return false;
  }

  // Check referer header as fallback
  if (!origin && referer) {
    const refererUrl = new URL(referer);
    if (!allowedOrigins.includes(refererUrl.origin)) {
      return false;
    }
  }

  return true;
}

// Usage in API route
export async function POST(request: NextRequest) {
  if (!validateOrigin(request)) {
    return NextResponse.json(
      { error: "Invalid request origin" },
      { status: 403 }
    );
  }

  // Process request
}`} />
      </div>

      {/* SameSite Cookie Configuration */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">SameSite Cookie Configuration</h2>
        <p className="text-muted-foreground">
          Configure secure cookie settings in NextAuth:
        </p>
        <CodeBlock language="typescript" code={`// src/lib/auth.ts

import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // ... other config

  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});`} />
      </div>

      {/* Fetch Requests with CSRF */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Fetch Requests with CSRF</h2>
        <p className="text-muted-foreground">
          Include CSRF tokens in fetch requests:
        </p>
        <CodeBlock language="tsx" code={`"use client";

import { getCsrfToken } from "next-auth/react";

async function secureApiCall(data: unknown) {
  const csrfToken = await getCsrfToken();

  const response = await fetch("/api/secure-action", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken || "",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

// Custom hook for secure API calls
import { useState, useCallback } from "react";

export function useSecureApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(async (url: string, data: unknown) => {
    setLoading(true);
    setError(null);

    try {
      const csrfToken = await getCsrfToken();

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken || "",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { call, loading, error };
}`} />
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/security/headers">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Security Headers</h3>
                <p className="text-sm text-muted-foreground">
                  Configure HSTS, CSP, and other headers
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/security/validation">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Schema Validation</h3>
                <p className="text-sm text-muted-foreground">
                  Validate all inputs with Zod schemas
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
