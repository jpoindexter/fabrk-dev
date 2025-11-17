/**
 * Change Password API Route
 * PATCH /api/user/password
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withCsrfProtection } from "@/lib/security/csrf";
import { hash, compare } from "bcryptjs";
import { z } from "zod";
import { logger } from "@/lib/logger";

const passwordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export const PATCH = withCsrfProtection(async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = passwordSchema.parse(body);

    // Get user with current password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    if (!user?.password) {
      return NextResponse.json(
        { error: "Password not set. Use OAuth sign in instead." },
        { status: 400 }
      );
    }

    // Verify current password
    const isValid = await compare(
      validatedData.currentPassword,
      user.password
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hash(validatedData.newPassword, 12);

    // Update password and increment sessionVersion to invalidate all other sessions
    // This ensures that changing password logs out all devices except the current one
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        password: hashedPassword,
        sessionVersion: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully. All other sessions have been logged out for security.",
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    logger.error("[Password Change] Error:", error);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
});
