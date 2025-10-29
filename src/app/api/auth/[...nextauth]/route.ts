/**
 * @swagger
 * /api/auth/session:
 *   get:
 *     summary: Get current session
 *     description: >
 *       Retrieve the current user session information.
 *       Returns null if no active session exists.
 *     tags:
 *       - Authentication
 *       - NextAuth
 *     responses:
 *       200:
 *         description: Session retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               nullable: true
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                       enum: [USER, ADMIN]
 *                 expires:
 *                   type: string
 *                   format: date-time
 * /api/auth/signin:
 *   get:
 *     summary: Sign in page
 *     description: Returns the NextAuth sign-in page
 *     tags:
 *       - Authentication
 *       - NextAuth
 *     responses:
 *       200:
 *         description: Sign-in page HTML
 *   post:
 *     summary: Sign in with credentials
 *     description: Authenticate user with email and password
 *     tags:
 *       - Authentication
 *       - NextAuth
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
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Authentication successful
 *       401:
 *         description: Invalid credentials
 * /api/auth/signout:
 *   get:
 *     summary: Sign out page
 *     description: Returns the NextAuth sign-out confirmation page
 *     tags:
 *       - Authentication
 *       - NextAuth
 *     responses:
 *       200:
 *         description: Sign-out page HTML
 *   post:
 *     summary: Sign out current session
 *     description: Terminates the current user session
 *     tags:
 *       - Authentication
 *       - NextAuth
 *     responses:
 *       200:
 *         description: Sign-out successful
 * /api/auth/csrf:
 *   get:
 *     summary: Get CSRF token
 *     description: Retrieve CSRF token for form submissions
 *     tags:
 *       - Authentication
 *       - NextAuth
 *     responses:
 *       200:
 *         description: CSRF token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 csrfToken:
 *                   type: string
 * /api/auth/providers:
 *   get:
 *     summary: List authentication providers
 *     description: Get list of configured authentication providers
 *     tags:
 *       - Authentication
 *       - NextAuth
 *     responses:
 *       200:
 *         description: List of providers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * NextAuth.js API Route Handler
 * Handles all authentication endpoints via NextAuth
 */

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
