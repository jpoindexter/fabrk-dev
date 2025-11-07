/**
 * User Profile API Route
 * PATCH /api/user/profile
 */

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  website: z.string().url().max(200).optional().or(z.literal("")),
  twitter: z.string().max(50).optional(),
  github: z.string().max(50).optional(),
});

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = profileSchema.parse(body);

    // Update user profile
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: validatedData.name,
        // Store additional fields in user metadata (you may want to add these columns to User model)
        // For now, we'll just update the name field
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("[Profile Update] Error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
