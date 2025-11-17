"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";

/**
 * Global Error Handler
 * Catches errors in the root layout
 * Must be a client component
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console and error tracking service
    console.error("Global application error:", error);

    // Send to error tracking service
    // To enable Sentry:
    // 1. Install: npm install @sentry/nextjs
    // 2. Configure: npx @sentry/wizard@latest -i nextjs
    // 3. Uncomment the code below
    // if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_SENTRY_DSN) {
    //   Sentry.captureException(error);
    // }
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
          <div className="mx-auto max-w-2xl text-center">
            {/* Error Icon */}
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-destructive/10 p-6">
                <AlertTriangle className="h-16 w-16 text-destructive" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              Critical Application Error
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              We apologize, but a critical error has occurred. Our team has been notified
              and is working to resolve the issue.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === "development" && (
              <div className="mb-8 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-left">
                <p className="mb-2 text-sm font-semibold text-destructive">
                  Error Details (Development Only):
                </p>
                <p className="font-mono text-xs text-destructive break-words">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="mt-2 text-xs text-destructive">
                    Error ID: {error.digest}
                  </p>
                )}
                {error.stack && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-xs font-semibold text-red-900">
                      Stack Trace
                    </summary>
                    <pre className="mt-2 overflow-auto text-xs text-red-800">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button onClick={reset} className="h-12 px-8">
                Try Again
              </Button>
              <Button
                onClick={() => window.location.href = "/"}
                variant="outline"
                className="h-12 border px-8"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>

            {/* Support Info */}
            <div className="mt-12 border-t border-border/60 pt-8">
              <p className="mb-2 text-sm text-muted-foreground">
                If this problem persists, please contact support:
              </p>
              <a
                href="mailto:support@fabrk.dev"
                className="text-sm font-semibold text-primary hover:underline"
              >
                support@fabrk.dev
              </a>
              {error.digest && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
