"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { logger } from "@/lib/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for debugging and monitoring
    logger.error("Application error", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="mx-auto max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-none bg-destructive/10 p-6">
            <AlertTriangle className="h-16 w-16 text-destructive" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="mb-4 text-4xl font-semibold text-foreground">
          Something Went Wrong
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          We're sorry, but something unexpected happened. This error has been logged and we're
          looking into it.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 rounded-none border border-destructive/40 bg-destructive/10 p-4 text-left">
            <p className="mb-2 text-sm font-semibold text-destructive">
              Error Details (Development Only):
            </p>
            <p className="font-mono text-xs text-destructive wrap-break-word">
              {error.message}
            </p>
            {error.digest && (
              <p className="mt-2 text-xs text-destructive">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="h-12 px-8">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 border px-8"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
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
  );
}
