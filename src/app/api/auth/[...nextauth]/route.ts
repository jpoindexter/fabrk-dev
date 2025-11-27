/**
 * NextAuth.js API Route Handler
 * Handles all authentication requests: /api/auth/*
 *
 * This catch-all route handles:
 * - /api/auth/session - Get current session
 * - /api/auth/signin - Sign in page/action
 * - /api/auth/signout - Sign out action
 * - /api/auth/callback/* - OAuth callbacks
 * - /api/auth/csrf - CSRF token
 */

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
