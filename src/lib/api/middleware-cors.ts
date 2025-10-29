/**
 * CORS handling for API middleware
 */

import { NextRequest, NextResponse } from "next/server";
import { ApiMiddlewareOptions } from "./middleware-types";

/**
 * Handle CORS preflight requests
 */
export function handleCorsPrelight(
  request: NextRequest,
  corsOptions?: ApiMiddlewareOptions["cors"]
): NextResponse {
  const response = new NextResponse(null, { status: 200 });

  if (corsOptions) {
    // Handle origin
    const origin = request.headers.get("origin");
    if (origin && isAllowedOrigin(origin, corsOptions.origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }

    // Handle methods
    if (corsOptions.methods) {
      response.headers.set("Access-Control-Allow-Methods", corsOptions.methods.join(", "));
    }

    // Handle headers
    if (corsOptions.headers) {
      response.headers.set("Access-Control-Allow-Headers", corsOptions.headers.join(", "));
    }
  } else {
    // Default permissive CORS for development
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-API-Version"
    );
  }

  response.headers.set("Access-Control-Max-Age", "3600");
  return response;
}

/**
 * Check if origin is allowed
 */
export function isAllowedOrigin(
  origin: string,
  allowedOrigin: string | string[] | boolean
): boolean {
  if (allowedOrigin === true) return true;
  if (allowedOrigin === false) return false;
  if (typeof allowedOrigin === "string") return origin === allowedOrigin;
  if (Array.isArray(allowedOrigin)) return allowedOrigin.includes(origin);
  return false;
}

/**
 * Add CORS headers to response
 */
export function addCorsHeaders(
  response: NextResponse,
  corsOptions?: ApiMiddlewareOptions["cors"]
): void {
  if (corsOptions) {
    // This would be set based on the request origin and options
    // Simplified for now
    response.headers.set("Access-Control-Allow-Origin", "*");
  }
}
