/**
 * API Route: Reset Password
 * Resets a user's password using a token
 * Uses standardized error handling - no stack traces exposed
 */

import { NotFoundError, ValidationError, withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";
import { withRateLimit } from "@/lib/rate-limit/middleware";
import { hash } from "bcryptjs";
import { NextRequest } from "next/server";
import { z } from "zod";

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

async function resetPasswordHandler(request: NextRequest) {
  const body = await request.json();
  const { token, password } = resetPasswordSchema.parse(body);

  // Find reset token
  const resetToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!resetToken || !resetToken.identifier.startsWith("reset:")) {
    throw new NotFoundError("Invalid or expired reset token");
  }

  // Check if token is expired
  if (resetToken.expires < new Date()) {
    // Delete expired token
    await prisma.verificationToken.delete({
      where: { token },
    });

    throw new ValidationError("Reset token has expired");
  }

  // Extract email from identifier (remove "reset:" prefix)
  const email = resetToken.identifier.substring(6);

  // Hash new password
  const hashedPassword = await hash(password, 12);

  // Update user password
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  // Delete used token
  await prisma.verificationToken.delete({
    where: { token },
  });

  return successResponse(null, "Password reset successfully");
}

// Apply both error handling and rate limiting (auth: 5 requests per 15 minutes)
export const POST = withRateLimit(withErrorHandler(resetPasswordHandler), "auth");
