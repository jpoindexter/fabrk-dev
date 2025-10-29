/**
 * API Response Utilities
 * Standardized response formats for all API endpoints
 * Never exposes stack traces or sensitive information
 */

import { NextResponse } from "next/server";

/**
 * Standard success response format
 */
export function successResponse<T>(
  data: T,
  message?: string,
  statusCode: number = 200
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      ...(message && { message }),
      data,
    },
    { status: statusCode }
  );
}

/**
 * Standard error response format
 * NEVER includes stack traces in production
 */
export function errorResponse(
  message: string,
  statusCode: number = 500,
  details?: Record<string, unknown>
): NextResponse {
  const response: {
    success: false;
    error: string;
    details?: Record<string, unknown>;
  } = {
    success: false,
    error: message,
  };

  // Only include details if provided and not in production
  if (details && process.env.NODE_ENV !== "production") {
    response.details = details;
  }

  return NextResponse.json(response, { status: statusCode });
}

/**
 * Validation error response (400)
 */
export function validationError(
  message: string = "Validation failed",
  details?: Record<string, unknown>
): NextResponse {
  return errorResponse(message, 400, details);
}

/**
 * Unauthorized error response (401)
 */
export function unauthorizedError(message: string = "Unauthorized"): NextResponse {
  return errorResponse(message, 401);
}

/**
 * Forbidden error response (403)
 */
export function forbiddenError(message: string = "Forbidden"): NextResponse {
  return errorResponse(message, 403);
}

/**
 * Not found error response (404)
 */
export function notFoundError(message: string = "Resource not found"): NextResponse {
  return errorResponse(message, 404);
}

/**
 * Internal server error response (500)
 * NEVER exposes internal error details in production
 */
export function internalServerError(
  message: string = "An unexpected error occurred"
): NextResponse {
  return errorResponse(message, 500);
}
