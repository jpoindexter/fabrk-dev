/**
 * Utility functions for API middleware
 */

import { NextResponse } from "next/server";
import { addCorsHeaders } from "./middleware-cors";
import { ApiContext, ApiMiddlewareOptions } from "./middleware-types";
import { ApiVersion, addVersionHeaders } from "./versioning";

/**
 * Add common headers to response
 */
export function addCommonHeaders(
  response: NextResponse,
  context: ApiContext,
  options: ApiMiddlewareOptions
): void {
  // Add version headers
  addVersionHeaders(response, context.version);

  // Add rate limit headers
  if (context.rateLimit) {
    response.headers.set("X-Rate-Limit-Remaining", context.rateLimit.remaining.toString());
    response.headers.set("X-Rate-Limit-Reset", context.rateLimit.reset.toISOString());
  }

  // Add CORS headers for actual requests
  addCorsHeaders(response, options.cors);

  // Add common security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
}

/**
 * Create standardized error response
 */
export function createErrorResponse(
  message: string,
  status: number,
  version: ApiVersion
): NextResponse {
  const response = NextResponse.json(
    {
      error: {
        message,
        status,
        timestamp: new Date().toISOString(),
      },
      meta: {
        version,
      },
    },
    { status }
  );

  return addVersionHeaders(response, version);
}
