/**
 * Rate Limiting Middleware
 * Simple in-memory rate limiting for API routes
 * For production, use Redis-based rate limiting (Upstash)
 */

import { NextRequest, NextResponse } from "next/server";

// In-memory store for rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configurations
const RATE_LIMITS = {
  auth: { requests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
  payment: { requests: 10, windowMs: 60 * 1000 }, // 10 requests per minute
  api: { requests: 100, windowMs: 60 * 1000 }, // 100 requests per minute
};

/**
 * Rate limiting middleware wrapper
 * @param handler - The API route handler function
 * @param limitType - Type of rate limit to apply ('auth' | 'payment' | 'api')
 */
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  limitType: keyof typeof RATE_LIMITS = "api"
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    // Get client identifier (IP address or user ID)
    const identifier = getClientIdentifier(req);
    const limit = RATE_LIMITS[limitType];

    // Check rate limit
    const rateLimitResult = checkRateLimit(identifier, limit.requests, limit.windowMs);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests",
          message: `Rate limit exceeded. Try again in ${Math.ceil(rateLimitResult.retryAfter / 1000)} seconds.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(rateLimitResult.retryAfter / 1000).toString(),
            "X-RateLimit-Limit": limit.requests.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(
              Date.now() + rateLimitResult.retryAfter
            ).toISOString(),
          },
        }
      );
    }

    // Add rate limit headers to response
    const response = await handler(req);
    response.headers.set("X-RateLimit-Limit", limit.requests.toString());
    response.headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString());
    response.headers.set(
      "X-RateLimit-Reset",
      new Date(Date.now() + limit.windowMs).toISOString()
    );

    return response;
  };
}

/**
 * Get client identifier from request
 */
function getClientIdentifier(req: NextRequest): string {
  // Try to get IP from various headers
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0].trim() || realIp || "unknown";

  return ip;
}

/**
 * Check if request is within rate limit
 */
function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; retryAfter: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // If no record or window expired, create new record
  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });

    return {
      allowed: true,
      remaining: maxRequests - 1,
      retryAfter: 0,
    };
  }

  // Increment count
  record.count++;

  // Check if limit exceeded
  if (record.count > maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: record.resetTime - now,
    };
  }

  return {
    allowed: true,
    remaining: maxRequests - record.count,
    retryAfter: 0,
  };
}

/**
 * Clean up old entries periodically
 * Call this from a background job or cron
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Clean up every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}
