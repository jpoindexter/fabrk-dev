/**
 * Change Email API Route
 * PATCH /api/user/email
 */

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import { z } from "zod";
import crypto from "crypto";

const emailSchema = z.object({
  newEmail: z.string().email(),
});

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = emailSchema.parse(body);

    // Check if email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.newEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 400 }
      );
    }

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24-hour expiry

    // Update email and create verification token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          email: validatedData.newEmail,
          emailVerified: null, // Reset verification
        },
      }),
      prisma.verificationToken.create({
        data: {
          identifier: validatedData.newEmail,
          token,
          expires: expiresAt,
        },
      }),
    ]);

    // Send verification email to new address
    await sendVerificationEmail(validatedData.newEmail, token);

    return NextResponse.json({
      success: true,
      message:
        "Email updated successfully. Please verify your new email address.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address", details: error.issues },
        { status: 400 }
      );
    }

    console.error("[Email Change] Error:", error);
    return NextResponse.json(
      { error: "Failed to change email" },
      { status: 500 }
    );
  }
}
