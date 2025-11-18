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
import { withCsrfProtection } from "@/lib/security/csrf";
import { env } from "@/lib/env";
import { createHash, randomBytes } from "crypto";
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

  // Generate reset token (this is sent in the email)
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Hash token before storing (security: tokens are hashed in DB)
  const hashedToken = createHash("sha256").update(token).digest("hex");

  // Store hashed token with "reset:" prefix to differentiate from email verification
  await prisma.verificationToken.create({
    data: {
      identifier: `reset:${email}`,
      token: hashedToken,
      expires,
    },
  });

  // Send password reset email with plain token
  const resetLink = `${env.server.NEXTAUTH_URL}/reset-password/${token}`;
  await emailService.sendTemplate("password-reset", email, {
    resetLink,
    name: user.name || email.split("@")[0],
  });

  return successResponse(null, "If an account exists, a password reset link has been sent");
}

// Apply CSRF protection, error handling, and rate limiting (password reset: 5 requests per 15 minutes)
export const POST = withRateLimit(withCsrfProtection(withErrorHandler(forgotPasswordHandler)), "auth");
