/**
 * Admin Delete User API Route
 * DELETE /api/admin/users/delete
 */

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const deleteSchema = z.object({
  userId: z.string(),
});

export async function DELETE(req: Request) {
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
    const validatedData = deleteSchema.parse(body);

    // Prevent user from deleting themselves
    if (validatedData.userId === session.user.id) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Delete user and all related data (cascade)
    await prisma.user.delete({
      where: { id: validatedData.userId },
    });

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    console.error("[Admin Delete User] Error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
