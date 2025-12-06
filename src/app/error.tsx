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
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mx-auto max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-destructive/10 rounded-none p-6">
            <AlertTriangle className="text-destructive h-16 w-16" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-foreground mb-4 text-4xl font-semibold">Something Went Wrong</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          We're sorry, but something unexpected happened. This error has been logged and we're
          looking into it.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="border-destructive/40 bg-destructive/10 mb-8 rounded-none border p-4 text-left">
            <p className="text-destructive mb-2 text-sm font-semibold">
              Error Details (Development Only):
            </p>
            <p className="text-destructive font-mono text-xs wrap-break-word">{error.message}</p>
            {error.digest && (
              <p className="text-destructive mt-2 text-xs">Error ID: {error.digest}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="h-12 px-8">
            <RefreshCw className="mr-2 h-4 w-4" />
            &gt; TRY_AGAIN
          </Button>
          <Button asChild variant="outline" className="h-12 border px-8">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              &gt; BACK_TO_HOME
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="border-border/60 mt-12 border-t pt-8">
          <p className="text-muted-foreground mb-2 text-sm">
            If this problem persists, please contact support:
          </p>
          <a
            href="mailto:support@fabrk.dev"
            className="text-primary text-sm font-semibold hover:underline"
          >
            support@fabrk.dev
          </a>
          {error.digest && (
            <p className="text-muted-foreground mt-2 text-xs">Error ID: {error.digest}</p>
          )}
        </div>
      </div>
    </div>
  );
}
