/**
 * Simple Rate Limiting Middleware
 * Uses in-memory storage for development
 * For production, consider using Redis (Upstash) for distributed rate limiting
 *
 * ⚠️ WARNING: This in-memory implementation is NOT suitable for production!
 *
 * Issues with in-memory storage in production:
 * 1. Does not work across multiple server instances (load balancers)
 * 2. Resets on server restart, losing all rate limit data
 * 3. No persistence - limits are ephemeral
 * 4. Cannot be shared between edge functions or serverless instances
 *
 * For production, use:
 * - Upstash Redis (serverless-friendly)
 * - Vercel KV (built-in rate limiting)
 * - Redis Cloud
 * - Any distributed cache solution
 */

import { NextRequest, NextResponse } from "next/server";

// ⚠️ WARNING: In-memory store NOT suitable for production (see above)
// Use Redis/Upstash for production deployments
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// Emit production warning once
if (process.env.NODE_ENV === "production") {
  console.warn(
    "⚠️ WARNING: In-memory rate limiting detected in production. " +
    "This will not work correctly with multiple server instances. " +
    "Please use Redis (Upstash) or Vercel KV for production rate limiting."
  );
}

// Rate limit configurations by route type
const RATE_LIMITS = {
  auth: { requests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
  payment: { requests: 10, windowMs: 60 * 1000 }, // 10 requests per minute
  api: { requests: 100, windowMs: 60 * 1000 }, // 100 requests per minute
} as const;

type RateLimitType = keyof typeof RATE_LIMITS;

/**
 * Get client identifier from request
 */
function getClientId(req: NextRequest): string {
  // Try to get IP from headers (works with proxies/load balancers)
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  // Fallback to connection IP (may not work in serverless)
  return "unknown";
}

/**
 * Check if request should be rate limited
 */
function checkRateLimit(
  clientId: string,
  type: RateLimitType
): { allowed: boolean; remaining: number; resetAt: number } {
  const config = RATE_LIMITS[type];
  const now = Date.now();
  const key = `${type}:${clientId}`;

  // Get or create rate limit entry
  let entry = rateLimitStore.get(key);

  // Reset if window has passed
  if (!entry || now > entry.resetAt) {
    entry = {
      count: 0,
      resetAt: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);
  }

  // Check if limit exceeded
  const allowed = entry.count < config.requests;

  if (allowed) {
    entry.count++;
  }

  return {
    allowed,
    remaining: Math.max(0, config.requests - entry.count),
    resetAt: entry.resetAt,
  };
}

/**
 * Clean up expired entries periodically
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
}

/**
 * Rate limiting middleware wrapper
 */
export function withRateLimit<T extends unknown[]>(
  handler: (req: NextRequest, ...args: T) => Promise<NextResponse>,
  type: RateLimitType = "api"
) {
  return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
    const clientId = getClientId(req);
    const { allowed, remaining, resetAt } = checkRateLimit(clientId, type);

    if (!allowed) {
      const resetIn = Math.ceil((resetAt - Date.now()) / 1000);

      return NextResponse.json(
        {
          error: "Too many requests",
          message: `Rate limit exceeded. Try again in ${resetIn} seconds.`,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": String(RATE_LIMITS[type].requests),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
            "Retry-After": String(resetIn),
          },
        }
      );
    }

    // Call the handler with all arguments
    const response = await handler(req, ...args);

    // Add rate limit headers to response
    response.headers.set("X-RateLimit-Limit", String(RATE_LIMITS[type].requests));
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    response.headers.set("X-RateLimit-Reset", String(Math.ceil(resetAt / 1000)));

    return response;
  };
}
