/**
 * API Route: Resend Email Verification
 * Sends a new verification email to the user
 * Uses standardized error handling - no stack traces exposed
 */

import { ValidationError, withErrorHandler } from "@/lib/api/error-handler";
import { successResponse } from "@/lib/api/response";
import { emailService } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { withRateLimit } from "@/lib/rate-limit/middleware";
import { withCsrfProtection } from "@/lib/security/csrf";
import { env } from "@/lib/env";
import { randomBytes, createHash } from "crypto";
import { NextRequest } from "next/server";
import { z } from "zod";

const resendVerificationSchema = z.object({
  email: z.string().email("Invalid email address"),
});

async function resendVerificationHandler(request: NextRequest) {
  const body = await request.json();
  const { email } = resendVerificationSchema.parse(body);

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // Don't reveal if user exists (security best practice)
    return successResponse(null, "If an account exists, a verification email has been sent");
  }

  // Check if already verified
  if (user.emailVerified) {
    throw new ValidationError("Email is already verified");
  }

  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  // Generate new token (this is sent in the email)
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Hash token before storing (security: tokens are hashed in DB)
  const hashedToken = createHash("sha256").update(token).digest("hex");

  // Store hashed token
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires,
    },
  });

  // Send verification email
  const verificationLink = `${env.server.NEXTAUTH_URL}/verify-email/${token}`;
  await emailService.sendTemplate("email-verification", email, {
    verificationLink,
    name: user.name || email.split("@")[0],
  });

  return successResponse(null, "Verification email sent successfully");
}

// Apply CSRF protection, error handling, and rate limiting (auth: 5 requests per 15 minutes to prevent spam)
export const POST = withRateLimit(withCsrfProtection(withErrorHandler(resendVerificationHandler)), "auth");
