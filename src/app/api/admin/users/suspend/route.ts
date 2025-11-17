/**
 * Admin Suspend User API Route
 * POST /api/admin/users/suspend
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withCsrfProtection } from "@/lib/security/csrf";
import { z } from "zod";
import { logger } from "@/lib/logger";

const suspendSchema = z.object({
  userId: z.string(),
});

export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    const session = await auth();

    // Check if user is admin
    if (!session?.user?.id || (session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validatedData = suspendSchema.parse(body);

    // Prevent user from suspending themselves
    if (validatedData.userId === session.user.id) {
      return NextResponse.json(
        { error: "Cannot suspend your own account" },
        { status: 400 }
      );
    }

    // Delete all active sessions to effectively suspend the user
    await prisma.session.deleteMany({
      where: { userId: validatedData.userId },
    });

    return NextResponse.json({
      success: true,
      message: "User suspended successfully. All sessions terminated.",
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    logger.error("[Admin Suspend User] Error:", error);
    return NextResponse.json(
      { error: "Failed to suspend user" },
      { status: 500 }
    );
  }
});
