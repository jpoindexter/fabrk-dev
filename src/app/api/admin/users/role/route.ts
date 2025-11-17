/**
 * Admin Update User Role API Route
 * PATCH /api/admin/users/role
 */

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const roleSchema = z.object({
  userId: z.string(),
  role: z.enum(["USER", "ADMIN"]),
});

export async function PATCH(req: Request) {
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
    const validatedData = roleSchema.parse(body);

    // Prevent user from changing their own role
    if (validatedData.userId === session.user.id) {
      return NextResponse.json(
        { error: "Cannot change your own role" },
        { status: 400 }
      );
    }

    // Update user role
    await prisma.user.update({
      where: { id: validatedData.userId },
      data: { role: validatedData.role },
    });

    return NextResponse.json({
      success: true,
      message: "User role updated successfully",
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    console.error("[Admin Role Update] Error:", error);
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  }
}
