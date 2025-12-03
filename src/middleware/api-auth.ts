import { NextRequest, NextResponse } from "next/server";
import { validateApiKey, extractApiKeyFromHeader, type ValidatedApiKey } from "@/lib/api-keys/auth";
import { getCorsHeaders, handleCorsPreFlight } from "@/lib/security/cors";

/**
 * API Key Authentication Middleware
 * Use in API routes that require API key authentication
 *
 * For /api/v1/* routes, CORS headers are automatically added.
 */

/**
 * Route context type for Next.js 15 App Router
 * Params are now async in Next.js 15
 */
export type RouteContext = {
  params: Promise<Record<string, string | string[]>>;
};

/**
 * Check if request is to a v1 API route (requires CORS)
 */
function isV1Route(request: NextRequest): boolean {
  return request.nextUrl.pathname.startsWith("/api/v1/");
}

/**
 * Add CORS headers to response if it's a v1 route
 */
function addCorsHeadersIfNeeded(request: NextRequest, response: NextResponse): NextResponse {
  if (isV1Route(request)) {
    const corsHeaders = getCorsHeaders(request);
    corsHeaders.forEach((value, key) => {
      response.headers.set(key, value);
    });
  }
  return response;
}

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
  } catch {
    return null;
  }
}

/**
 * Middleware wrapper to require API key authentication
 * Returns 401 if no valid API key is provided
 * For /api/v1/* routes, handles CORS preflight and adds CORS headers
 * @param handler - Route handler function
 * @returns Wrapped handler with authentication
 */
export function requireApiKey(
  handler: (
    req: NextRequest,
    apiKey: ValidatedApiKey,
    context?: RouteContext
  ) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: RouteContext) => {
    // Handle CORS preflight for v1 routes
    if (req.method === "OPTIONS" && isV1Route(req)) {
      return handleCorsPreFlight(req);
    }

    const apiKey = await authenticateApiKey(req);

    if (!apiKey) {
      const response = NextResponse.json({ error: "Invalid or missing API key" }, { status: 401 });
      return addCorsHeadersIfNeeded(req, response);
    }

    const response = await handler(req, apiKey, context);
    return addCorsHeadersIfNeeded(req, response);
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
  handler: (
    req: NextRequest,
    apiKey: ValidatedApiKey,
    context?: RouteContext
  ) => Promise<NextResponse>
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
