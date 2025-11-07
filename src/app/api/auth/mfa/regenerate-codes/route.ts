/**
 * Regenerate Backup Codes API Route
 * POST /api/auth/mfa/regenerate-codes
 */

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { regenerateBackupCodes } from "@/lib/auth/mfa";

export async function POST() {
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
  } catch (error) {
    console.error("[MFA Regenerate Codes] Error:", error);
    return NextResponse.json(
      { error: "Failed to regenerate backup codes" },
      { status: 500 }
    );
  }
}
