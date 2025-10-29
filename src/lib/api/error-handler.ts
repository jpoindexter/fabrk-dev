/**
 * API Error Handler Middleware
 * Wraps API routes to handle errors gracefully
 * NEVER exposes stack traces or internal error details in production
 */

import { logger } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  errorResponse,
  forbiddenError,
  internalServerError,
  unauthorizedError,
  validationError,
} from "./response";

/**
 * Custom error types for better error handling
 */
export class AuthenticationError extends Error {
  constructor(message: string = "Authentication required") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = "Insufficient permissions") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class ValidationError extends Error {
  details?: Record<string, unknown>;

  constructor(message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}

export class NotFoundError extends Error {
  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

/**
 * Wraps an API route handler with error handling
 * Catches all errors and returns appropriate responses
 */
export function withErrorHandler(
  handler: (req: NextRequest, ...args: unknown[]) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: unknown[]): Promise<NextResponse> => {
    try {
      return await handler(req, ...args);
    } catch (error) {
      // Log error server-side with full details
      logger.error("API Error:", {
        error,
        path: req.nextUrl.pathname,
        method: req.method,
      });

      // Handle Zod validation errors
      if (error instanceof ZodError) {
        return validationError("Invalid request data", {
          issues: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      // Handle custom authentication errors
      if (error instanceof AuthenticationError) {
        return unauthorizedError(error.message);
      }

      // Handle custom authorization errors
      if (error instanceof AuthorizationError) {
        return forbiddenError(error.message);
      }

      // Handle custom validation errors
      if (error instanceof ValidationError) {
        return validationError(error.message, error.details);
      }

      // Handle custom not found errors
      if (error instanceof NotFoundError) {
        return errorResponse(error.message, 404);
      }

      // Handle generic errors
      // NEVER expose internal error details or stack traces in production
      if (error instanceof Error) {
        const message =
          process.env.NODE_ENV === "production" ? "An unexpected error occurred" : error.message;

        return internalServerError(message);
      }

      // Fallback for unknown error types
      return internalServerError();
    }
  };
}

/**
 * Helper to validate request body with Zod schema
 * Throws ValidationError if invalid
 */
export async function validateRequestBody<T>(
  req: NextRequest,
  schema: { parse: (data: unknown) => T }
): Promise<T> {
  try {
    const body = await req.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      throw error; // Will be caught by withErrorHandler
    }
    throw new ValidationError("Invalid JSON in request body");
  }
}
