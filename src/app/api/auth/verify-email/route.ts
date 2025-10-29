/**
 * API Route: Email Verification
 * Verifies a user's email address using a token
 * Uses standardized error handling - no stack traces exposed
 */

import { NotFoundError, ValidationError, withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";
import { withRateLimit } from "@/lib/rate-limit/middleware";
import { NextRequest } from "next/server";

async function verifyEmailHandler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    throw new ValidationError("Token is required");
  }

  // Find verification token
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    throw new NotFoundError("Invalid or expired verification token");
  }

  // Check if token is expired
  if (verificationToken.expires < new Date()) {
    // Delete expired token
    await prisma.verificationToken.delete({
      where: { token },
    });

    throw new ValidationError("Verification token has expired");
  }

  // Update user email verification status
  await prisma.user.update({
    where: { email: verificationToken.identifier },
    data: { emailVerified: new Date() },
  });

  // Delete used token
  await prisma.verificationToken.delete({
    where: { token },
  });

  return successResponse(null, "Email verified successfully");
}

// Apply both error handling and rate limiting (auth: 5 requests per 15 minutes)
export const GET = withRateLimit(withErrorHandler(verifyEmailHandler), "auth");
