/**
 * Disable MFA API Route
 * POST /api/auth/mfa/disable
 */

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { disableMFA } from "@/lib/auth/mfa";

export async function POST() {
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
    console.error("[MFA Disable] Error:", error);
    return NextResponse.json(
      { error: "Failed to disable MFA" },
      { status: 500 }
    );
  }
}
