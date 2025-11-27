/**
 * 2FA Verify API Route
 * POST /api/user/2fa/verify
 *
 * Verifies the TOTP code and activates 2FA for the user
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { verifyMFADevice } from "@/lib/auth/mfa";
import { withCsrfProtection } from "@/lib/security/csrf";
import { logger } from "@/lib/logger";

export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { token } = await req.json();

    if (!token || typeof token !== "string" || token.length !== 6) {
      return NextResponse.json(
        { error: "Invalid token format. Please enter a 6-digit code." },
        { status: 400 }
      );
    }

    // Verify the token against the unverified MFA device
    const isValid = await verifyMFADevice(
      session.user.id,
      session.user.email,
      token
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid verification code. Please try again." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Two-factor authentication has been enabled successfully.",
    });
  } catch (error: unknown) {
    logger.error("[2FA Verify] Error:", error);
    return NextResponse.json(
      { error: "Failed to verify 2FA code" },
      { status: 500 }
    );
  }
});
