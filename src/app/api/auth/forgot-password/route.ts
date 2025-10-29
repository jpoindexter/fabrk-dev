/**
 * API Route: Forgot Password
 * Sends a password reset email to the user
 * Uses standardized error handling - no stack traces exposed
 */

import { withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { emailService } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { withRateLimit } from "@/lib/rate-limit/middleware";
import { randomBytes } from "crypto";
import { NextRequest } from "next/server";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

async function forgotPasswordHandler(request: NextRequest) {
  const body = await request.json();
  const { email } = forgotPasswordSchema.parse(body);

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Always return success (security best practice - don't reveal if user exists)
  if (!user) {
    return successResponse(null, "If an account exists, a password reset link has been sent");
  }

  // Delete any existing password reset tokens for this email
  await prisma.verificationToken.deleteMany({
    where: {
      identifier: `reset:${email}`,
    },
  });

  // Generate reset token
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Store token with "reset:" prefix to differentiate from email verification
  await prisma.verificationToken.create({
    data: {
      identifier: `reset:${email}`,
      token,
      expires,
    },
  });

  // Send password reset email
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;
  await emailService.sendTemplate("password-reset", email, {
    resetLink,
    name: user.name || email.split("@")[0],
  });

  return successResponse(null, "If an account exists, a password reset link has been sent");
}

// Apply both error handling and rate limiting (password reset: 3 requests per hour)
export const POST = withRateLimit(withErrorHandler(forgotPasswordHandler), "passwordReset");
