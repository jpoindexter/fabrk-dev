/**
 * Authentication handling for API middleware
 */

import { NextRequest } from "next/server";
import { AuthResult } from "./middleware-types";

/**
 * Handle authentication
 */
export async function handleAuthentication(request: NextRequest): Promise<AuthResult> {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      authenticated: false,
      error: "Missing or invalid authorization header",
    };
  }

  const token = authHeader.substring(7);

  // For now, we'll do a simple token validation
  // In a real app, this would validate JWT tokens or API keys
  if (token === "demo-token") {
    return {
      authenticated: true,
      user: {
        id: "demo-user",
        email: "demo@example.com",
        role: "user",
      },
    };
  }

  return {
    authenticated: false,
    error: "Invalid token",
  };
}
