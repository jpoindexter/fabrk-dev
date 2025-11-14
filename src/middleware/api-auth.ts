import { NextRequest, NextResponse } from "next/server";
import { validateApiKey, extractApiKeyFromHeader, type ValidatedApiKey } from "@/lib/api-keys/auth";

/**
 * API Key Authentication Middleware
 * Use in API routes that require API key authentication
 */

/**
 * Authenticate request using API key from Authorization header
 * @param request - Next.js request object
 * @returns Validated API key details or null if invalid
 */
export async function authenticateApiKey(request: NextRequest): Promise<ValidatedApiKey | null> {
  try {
    const authHeader = request.headers.get("Authorization");
    const apiKey = extractApiKeyFromHeader(authHeader);

    if (!apiKey) {
      return null;
    }

    return await validateApiKey(apiKey);
  } catch (error) {
    console.error("Error authenticating API key:", error);
    return null;
  }
}

/**
 * Middleware wrapper to require API key authentication
 * Returns 401 if no valid API key is provided
 * @param handler - Route handler function
 * @returns Wrapped handler with authentication
 */
export function requireApiKey(
  handler: (req: NextRequest, apiKey: ValidatedApiKey, context?: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: any) => {
    const apiKey = await authenticateApiKey(req);

    if (!apiKey) {
      return NextResponse.json(
        { error: "Invalid or missing API key" },
        { status: 401 }
      );
    }

    return handler(req, apiKey, context);
  };
}

/**
 * Middleware wrapper to require specific permission
 * Returns 403 if API key doesn't have required permission
 * @param permission - Required permission (e.g., 'read', 'write', 'admin')
 * @param handler - Route handler function
 * @returns Wrapped handler with permission check
 */
export function requirePermission(
  permission: string,
  handler: (req: NextRequest, apiKey: ValidatedApiKey, context?: any) => Promise<NextResponse>
) {
  return requireApiKey(async (req, apiKey, context) => {
    if (!apiKey.permissions.includes(permission)) {
      return NextResponse.json(
        { error: `Missing required permission: ${permission}` },
        { status: 403 }
      );
    }

    return handler(req, apiKey, context);
  });
}
