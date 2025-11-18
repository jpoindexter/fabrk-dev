/**
 * Disable MFA API Route
 * POST /api/auth/mfa/disable
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { disableMFA } from "@/lib/auth/mfa";
import { logger } from "@/lib/logger";
import { withCsrfProtection } from "@/lib/security/csrf";

async function disableMFAHandler(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Disable MFA for user
    await disableMFA(session.user.id, session.user.email);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    logger.error("[MFA Disable] Error:", error);
    return NextResponse.json(
      { error: "Failed to disable MFA" },
      { status: 500 }
    );
  }
}

// Apply CSRF protection
export const POST = withCsrfProtection(disableMFAHandler);
