/**
 * API Middleware
 * Handles common API concerns like versioning, rate limiting, authentication
 */

import { logger } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { handleAuthentication } from "./middleware-auth";
import { handleCorsPrelight } from "./middleware-cors";
import { handleCsrfProtection } from "./middleware-csrf";
import { handleRateLimit } from "./middleware-rate-limit";
import {
  ApiContext,
  ApiHandler,
  ApiMiddlewareOptions,
  VersionedHandlers,
} from "./middleware-types";
import { addCommonHeaders, createErrorResponse } from "./middleware-utils";
import { getApiVersion, validateApiVersion } from "./versioning";

// Re-export types for external use
export type {
  ApiContext,
  ApiHandler,
  ApiMiddlewareOptions,
  VersionedHandlers,
} from "./middleware-types";

/**
 * Main API middleware function
 */
export async function apiMiddleware(
  request: NextRequest,
  handler: ApiHandler,
  options: ApiMiddlewareOptions = {}
): Promise<NextResponse> {
  try {
    // 1. Handle CORS preflight
    if (request.method === "OPTIONS") {
      return handleCorsPrelight(request, options.cors);
    }

    // 2. Extract and validate API version
    const version = getApiVersion(request);
    if (!validateApiVersion(version)) {
      return createErrorResponse("Invalid or unsupported API version", 400, version);
    }

    // 3. Initialize context
    const context: ApiContext = {
      version,
    };

    // 4. Handle CSRF protection (enabled by default, can be disabled)
    if (options.csrf !== false) {
      const csrfResult = await handleCsrfProtection(request);
      if (!csrfResult.valid) {
        return createErrorResponse(csrfResult.error || "CSRF validation failed", 403, version);
      }
    }

    // 5. Handle rate limiting (if enabled)
    if (options.rateLimit) {
      const rateLimitResult = await handleRateLimit(request, options.rateLimit);
      if (!rateLimitResult.allowed) {
        const response = createErrorResponse("Rate limit exceeded", 429, version);
        response.headers.set("X-Rate-Limit-Remaining", "0");
        response.headers.set("X-Rate-Limit-Reset", rateLimitResult.reset.toISOString());
        return response;
      }
      context.rateLimit = {
        remaining: rateLimitResult.remaining,
        reset: rateLimitResult.reset,
      };
    }

    // 6. Handle authentication (if required)
    if (options.requireAuth) {
      const authResult = await handleAuthentication(request);
      if (!authResult.authenticated) {
        return createErrorResponse("Authentication required", 401, version);
      }
      context.user = authResult.user;
    }

    // 7. Call the handler
    const response = await handler(request, context);

    // 8. Add common headers
    addCommonHeaders(response, context, options);

    return response;
  } catch (error: unknown) {
    logger.error("[API Middleware] Error:", error);
    return createErrorResponse("Internal server error", 500, getApiVersion(request));
  }
}

/**
 * Utility function to wrap API routes with middleware
 */
export function withApiMiddleware(handler: ApiHandler, options: ApiMiddlewareOptions = {}) {
  return async (request: NextRequest) => {
    return apiMiddleware(request, handler, options);
  };
}

/**
 * Create a versioned API route handler
 */
export function createVersionedHandler(handlers: VersionedHandlers) {
  return async (request: NextRequest, context: ApiContext) => {
    const handler = handlers[context.version];

    if (!handler) {
      return createErrorResponse(
        `API version ${context.version} not supported for this endpoint`,
        404,
        context.version
      );
    }

    return handler(request, context);
  };
}
