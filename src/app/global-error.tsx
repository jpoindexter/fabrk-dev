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
    // Log error to console and potentially to error tracking service
    console.error("Global application error:", error);

    // TODO: Send to error tracking service (e.g., Sentry)
    // if (typeof window !== "undefined") {
    //   Sentry.captureException(error);
    // }
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
          <div className="mx-auto max-w-2xl text-center">
            {/* Error Icon */}
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-red-100 p-6">
                <AlertTriangle className="h-16 w-16 text-red-600" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="mb-4 text-4xl font-bold text-black">
              Critical Application Error
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              We apologize, but a critical error has occurred. Our team has been notified
              and is working to resolve the issue.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === "development" && (
              <div className="mb-8 rounded-lg border-2 border-red-200 bg-red-50 p-4 text-left">
                <p className="mb-2 text-sm font-semibold text-red-900">
                  Error Details (Development Only):
                </p>
                <p className="font-mono text-xs text-red-800 break-words">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="mt-2 text-xs text-red-700">
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
              <Button
                onClick={reset}
                className="h-12 bg-blue-600 px-8 text-white hover:bg-blue-700"
              >
                Try Again
              </Button>
              <Button
                onClick={() => window.location.href = "/"}
                variant="outline"
                className="h-12 border-2 border-black px-8"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>

            {/* Support Info */}
            <div className="mt-12 border-t border-gray-200 pt-8">
              <p className="mb-2 text-sm text-gray-600">
                If this problem persists, please contact support:
              </p>
              <a
                href="mailto:support@fabrk.dev"
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                support@fabrk.dev
              </a>
              {error.digest && (
                <p className="mt-2 text-xs text-gray-500">
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
