/**
 * Regenerate Backup Codes API Route
 * POST /api/auth/mfa/regenerate-codes
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { regenerateBackupCodes } from "@/lib/auth/mfa";
import { logger } from "@/lib/logger";
import { withCsrfProtection } from "@/lib/security/csrf";

async function regenerateBackupCodesHandler(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Regenerate backup codes
    const backupCodes = await regenerateBackupCodes(
      session.user.id,
      session.user.email
    );

    return NextResponse.json({ backupCodes });
  } catch (error: unknown) {
    logger.error("[MFA Regenerate Codes] Error:", error);
    return NextResponse.json(
      { error: "Failed to regenerate backup codes" },
      { status: 500 }
    );
  }
}

// Apply CSRF protection
export const POST = withCsrfProtection(regenerateBackupCodesHandler);
