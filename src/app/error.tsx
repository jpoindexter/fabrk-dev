"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error("Application error:", error);
  }, [error]);

  return (
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
          Something Went Wrong
        </h1>
        <p className="mb-8 text-lg text-[#666666]">
          We're sorry, but something unexpected happened. This error has been logged and we're
          looking into it.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 rounded-lg border-2 border-red-200 bg-red-50 p-4 text-left">
            <p className="mb-2 text-sm font-semibold text-red-900">
              Error Details (Development Only):
            </p>
            <p className="text-xs text-red-800 font-mono break-words">
              {error.message}
            </p>
            {error.digest && (
              <p className="mt-2 text-xs text-red-700">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={reset}
            className="h-12 bg-[#007AFF] px-8 text-white hover:bg-[#0066CC]"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 border-2 border-black px-8"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-12 border-t border-black/10 pt-8">
          <p className="mb-2 text-sm text-[#666666]">
            If this problem persists, please contact support:
          </p>
          <a
            href="mailto:support@fabrk.dev"
            className="text-sm font-semibold text-[#007AFF] hover:underline"
          >
            support@fabrk.dev
          </a>
          {error.digest && (
            <p className="mt-2 text-xs text-[#999999]">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
