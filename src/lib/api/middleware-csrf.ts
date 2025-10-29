/**
 * CSRF Protection Middleware
 * Integrates existing CSRF protection into API middleware system
 */

import { csrf } from "@/lib/security/csrf";
import { NextRequest } from "next/server";

export interface CsrfResult {
  valid: boolean;
  error?: string;
}

/**
 * Handle CSRF protection for API routes
 * Skips GET/HEAD/OPTIONS requests
 * Validates CSRF token for state-changing requests
 */
export async function handleCsrfProtection(request: NextRequest): Promise<CsrfResult> {
  // Skip CSRF for safe methods
  const safeMethods = ["GET", "HEAD", "OPTIONS"];
  if (safeMethods.includes(request.method)) {
    return { valid: true };
  }

  // Skip CSRF for webhooks (they use signature verification)
  const isWebhook =
    request.nextUrl.pathname.includes("/webhook") ||
    request.nextUrl.pathname.includes("/webhooks");
  if (isWebhook) {
    return { valid: true };
  }

  // Verify CSRF token
  const isValid = csrf.verifyRequest({
    headers: request.headers,
  });

  if (!isValid) {
    return {
      valid: false,
      error: "Invalid or missing CSRF token",
    };
  }

  return { valid: true };
}
