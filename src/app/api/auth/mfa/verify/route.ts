/**
 * Verify MFA Device API Route
 * POST /api/auth/mfa/verify
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { verifyMFADevice } from "@/lib/auth/mfa";
import { logger } from "@/lib/logger";
import { withCsrfProtection } from "@/lib/security/csrf";

async function verifyMFAHandler(req: NextRequest) {
  try {
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
