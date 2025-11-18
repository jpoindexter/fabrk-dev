/**
 * Verify MFA Device API Route
 * POST /api/auth/mfa/verify
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { verifyMFADevice } from "@/lib/auth/mfa";
import { logger } from "@/lib/logger";
import { withCsrfProtection } from "@/lib/security/csrf";
import { checkRateLimit, getClientIdentifier, RateLimiters } from "@/lib/security/rate-limit";

async function verifyMFAHandler(req: NextRequest) {
  try {
    // Apply strict rate limiting to prevent brute force attacks on MFA codes
    const identifier = getClientIdentifier(req);
    const rateLimit = await checkRateLimit(identifier, RateLimiters.auth);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Too many verification attempts",
          message: "You have exceeded the rate limit. Please try again later.",
          retryAfter: Math.ceil((rateLimit.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimit.limit.toString(),
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            "X-RateLimit-Reset": rateLimit.reset.toString(),
            "Retry-After": Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const session = await auth();

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { token } = await req.json();

    if (!token || token.length !== 6) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 400 }
      );
    }

    // Verify device
    const verified = await verifyMFADevice(
      session.user.id,
      session.user.email,
      token
    );

    if (!verified) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    logger.error("[MFA Verify] Error:", error);
    return NextResponse.json(
      { error: "Failed to verify MFA" },
      { status: 500 }
    );
  }
}

// Apply CSRF protection
export const POST = withCsrfProtection(verifyMFAHandler);
