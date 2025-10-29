/**
 * Rate limiting for API middleware
 * Uses centralized cache system (Redis or LRU fallback)
 */

import { cache } from "@/lib/cache";
import { logger } from "@/lib/logger";
import { NextRequest } from "next/server";
import { ApiMiddlewareOptions, RateLimitResult } from "./middleware-types";

/**
 * Handle rate limiting with fixed window algorithm using centralized cache
 */
export async function handleRateLimit(
  request: NextRequest,
  rateLimitConfig: NonNullable<ApiMiddlewareOptions["rateLimit"]>
): Promise<RateLimitResult> {
  // Get client identifier
  const clientId = getClientIdentifier(request);
  const key = `api_rate_limit:${clientId}`;

  const now = Date.now();
  const windowMs = rateLimitConfig.windowMs;
  const maxRequests = rateLimitConfig.requests;

  // Calculate current window
  const window = Math.floor(now / windowMs);
  const windowKey = `${key}:${window}`;

  try {
    // Get current count for this window
    const currentCount = (await cache.get<number>(windowKey)) || 0;
    const newCount = currentCount + 1;

    // Calculate reset time (end of current window)
    const resetTime = new Date((window + 1) * windowMs);
    const remaining = Math.max(0, maxRequests - newCount);

    // Check if limit exceeded
    if (newCount > maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        reset: resetTime,
      };
    }

    // Update count with TTL
    const ttlSeconds = Math.ceil(windowMs / 1000);
    await cache.set(windowKey, newCount, ttlSeconds);

    return {
      allowed: true,
      remaining,
      reset: resetTime,
    };
  } catch (error) {
    // If rate limiting fails, log error and allow request
    // This ensures availability over strict rate limiting
    logger.error("[Rate Limit] Error checking rate limit:", error);
    return {
      allowed: true,
      remaining: maxRequests,
      reset: new Date(now + windowMs),
    };
  }
}

/**
 * Get client identifier for rate limiting
 */
export function getClientIdentifier(request: NextRequest): string {
  // Try API key first
  const apiKey = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (apiKey) {
    return `api_key:${apiKey}`;
  }

  // Fall back to IP address
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0].trim() || realIp || "unknown";

  return `ip:${ip}`;
}
