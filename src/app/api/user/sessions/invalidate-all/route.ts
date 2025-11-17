/**
 * Session Invalidation API Route
 * POST /api/user/sessions/invalidate-all
 *
 * Invalidates all user sessions by incrementing sessionVersion
 * This forces all active sessions to re-authenticate
 * Useful for security events like password changes or suspicious activity
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withCsrfProtection } from "@/lib/security/csrf";

export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get current user data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        sessionVersion: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get count of active sessions before invalidation
    const activeSessions = await prisma.session.count({
      where: {
        userId: session.user.id,
        expires: {
          gt: new Date(),
        },
      },
    });

    // Increment session version to invalidate all sessions
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        sessionVersion: {
          increment: 1,
        },
      },
      select: {
        sessionVersion: true,
      },
    });

    // Also delete all session records from database for immediate effect
    await prisma.session.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "All sessions invalidated successfully",
      sessionsInvalidated: activeSessions,
      newSessionVersion: updatedUser.sessionVersion,
    });
  } catch (error: unknown) {
    console.error("[Session Invalidation] Error:", error);
    return NextResponse.json(
      { error: "Failed to invalidate sessions" },
      { status: 500 }
    );
  }
});
