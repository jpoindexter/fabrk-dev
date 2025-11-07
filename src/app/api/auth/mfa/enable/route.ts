/**
 * Enable MFA API Route
 * POST /api/auth/mfa/enable
 */

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { enableMFA } from "@/lib/auth/mfa";

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Enable MFA for user
    const result = await enableMFA(
      session.user.id,
      session.user.email,
      "Authenticator App"
    );

    return NextResponse.json({
      qrCodeUri: result.qrCodeUri,
      backupCodes: result.backupCodes,
    });
  } catch (error) {
    console.error("[MFA Enable] Error:", error);
    return NextResponse.json(
      { error: "Failed to enable MFA" },
      { status: 500 }
    );
  }
}
