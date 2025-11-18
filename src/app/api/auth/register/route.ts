/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with email and password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: SecurePass123!
 *                 description: User's password (min 8 characters)
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 example: John Doe
 *                 description: User's display name (optional)
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: User with this email already exists
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: Invalid input
 *                     details:
 *                       type: array
 *                       items:
 *                         type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *     x-codeSamples:
 *       - lang: curl
 *         source: |
 *           curl -X POST https://fabrk.dev/api/auth/register \
 *             -H "Content-Type: application/json" \
 *             -d '{
 *               "email": "user@example.com",
 *               "password": "SecurePass123!",
 *               "name": "John Doe"
 *             }'
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/auth/register', {
 *             method: 'POST',
 *             headers: { 'Content-Type': 'application/json' },
 *             body: JSON.stringify({
 *               email: 'user@example.com',
 *               password: 'SecurePass123!',
 *               name: 'John Doe'
 *             })
 *           });
 *           const data = await response.json();
 *       - lang: Python
 *         source: |
 *           import requests
 *
 *           response = requests.post(
 *               'https://fabrk.dev/api/auth/register',
 *               json={
 *                   'email': 'user@example.com',
 *                   'password': 'SecurePass123!',
 *                   'name': 'John Doe'
 *               }
 *           )
 *           data = response.json()
 *
 * @ai-context Registration endpoint for creating new users
 * @ai-purpose Handle user signup with email/password
 * @ai-can-modify Add validation, email verification
 */

import { emailService } from "@/lib/email";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { withRateLimit } from "@/lib/rate-limit/middleware";
import { withCsrfProtection } from "@/lib/security/csrf";
import { trackUserSignup } from "@/lib/analytics/events";
import { hash } from "bcryptjs";
import { randomBytes, createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

// Validation schema
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
});

async function registerHandler(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validatedData = registerSchema.parse(body);
    const { email, password, name } = validatedData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split("@")[0],
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    // Generate verification token (this is sent in the email)
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Hash token before storing (security: tokens are hashed in DB)
    const hashedToken = createHash("sha256").update(token).digest("hex");

    // Store hashed verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: hashedToken,
        expires,
      },
    });

    // Send verification email
    const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email/${token}`;
    await emailService.sendTemplate("email-verification", email, {
      verificationLink,
      name: user.name || email.split("@")[0],
    });

    // Track signup in analytics
    await trackUserSignup(user.id, email, {
      name: user.name,
      provider: 'credentials',
    });

    return NextResponse.json(
      {
        message: "User created successfully. Please check your email to verify your account.",
        user,
        emailSent: true,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    logger.error("Registration error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.issues }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// Apply CSRF protection and rate limiting: 5 requests per 15 minutes for auth endpoints
export const POST = withRateLimit(withCsrfProtection(registerHandler), "auth");
