/**
 * Rate Limiting Middleware
 * Wrapper for applying rate limits to API routes
 */

import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIdentifier, RateLimiters } from "@/lib/security/rate-limit";

type RateLimitPreset = keyof typeof RateLimiters;

/**
 * Rate limit middleware wrapper for API routes
 *
 * @example
 * export const POST = withRateLimit(handler, "auth");
 * export const POST = withRateLimit(handler, { interval: 60000, maxRequests: 10 });
 */
export function withRateLimit<T extends any[]>(
  handler: (req: NextRequest, ...args: T) => Promise<NextResponse>,
  config: RateLimitPreset | { interval: number; maxRequests: number } = "api"
) {
  return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
    // Resolve config
    const rateLimitConfig = typeof config === "string" ? RateLimiters[config] : config;

    // Get client identifier
    const identifier = getClientIdentifier(req);

    // Check rate limit
    const result = await checkRateLimit(identifier, rateLimitConfig);

    // Add rate limit headers to response
    const addRateLimitHeaders = (response: NextResponse) => {
      response.headers.set("X-RateLimit-Limit", result.limit.toString());
      response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
      response.headers.set("X-RateLimit-Reset", result.reset.toString());
      return response;
    };

    // If rate limit exceeded, return 429
    if (!result.success) {
      const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);

      const response = NextResponse.json(
        {
          error: "Too many requests",
          message: "You have exceeded the rate limit. Please try again later.",
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString(),
          },
        }
      );

      return addRateLimitHeaders(response);
    }

    // Call the actual handler
    const response = await handler(req, ...args);

    // Add rate limit headers to successful response
    return addRateLimitHeaders(response);
  };
}

/**
 * Check rate limit without blocking (for custom handling)
 */
export async function checkRateLimitStatus(
  req: NextRequest,
  config: RateLimitPreset | { interval: number; maxRequests: number } = "api"
) {
  const rateLimitConfig = typeof config === "string" ? RateLimiters[config] : config;
  const identifier = getClientIdentifier(req);
  return checkRateLimit(identifier, rateLimitConfig);
}
