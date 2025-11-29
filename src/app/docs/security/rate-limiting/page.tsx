import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Rate Limiting - Fabrk Docs",
  description: "Protect your API from abuse with rate limiting. Redis-backed limits per user, IP, or endpoint.",
};

export default function RateLimitingPage() {
  return (
    <div className="space-y-16">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x80] SECURITY ] RATE_LIMITING</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">RATE_LIMITING</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Protect your API endpoints from abuse with configurable rate limiting middleware.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h3 className="mb-2 font-mono font-semibold">WHAT'S_INCLUDED</h3>
          <ul className="font-mono text-sm text-muted-foreground space-y-1">
            <li>Token bucket algorithm for smooth rate limiting</li>
            <li>Configurable limits per endpoint</li>
            <li>IP-based and user-based rate limiting</li>
            <li>Redis support for distributed systems</li>
            <li>Customizable response headers</li>
            <li>Bypass rules for trusted IPs</li>
          </ul>
        </CardContent>
      </Card>

      {/* Basic Setup */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">BASIC_SETUP</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Add rate limiting to any API route using the rate limiter middleware:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/lib/rate-limit.ts

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a rate limiter with 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

// Alternative: In-memory rate limiting for development
import { LRUCache } from "lru-cache";

const tokenCache = new LRUCache<string, number>({
  max: 500,
  ttl: 60_000, // 1 minute
});

export function rateLimit(ip: string, limit: number = 10) {
  const tokenCount = tokenCache.get(ip) || 0;

  if (tokenCount >= limit) {
    return { success: false, remaining: 0 };
  }

  tokenCache.set(ip, tokenCount + 1);
  return { success: true, remaining: limit - tokenCount - 1 };
}`} />
      </div>

      {/* API Route Integration */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">API_ROUTE_INTEGRATION</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Apply rate limiting to your API routes:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/app/api/your-route/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Get client IP
  const ip = request.ip ??
    request.headers.get("x-forwarded-for") ??
    "127.0.0.1";

  // Check rate limit
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
          "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // Process request normally
  return NextResponse.json({ success: true });
}`} />
      </div>

      {/* Different Limits per Endpoint */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">CUSTOM_LIMITS_PER_ENDPOINT</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Configure different rate limits for different endpoints:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/lib/rate-limit.ts

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// Strict limit for auth endpoints
export const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 per minute
  prefix: "ratelimit:auth",
});

// Standard API limit
export const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "60 s"), // 60 per minute
  prefix: "ratelimit:api",
});

// Generous limit for read operations
export const readLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"), // 100 per minute
  prefix: "ratelimit:read",
});

// Strict limit for write operations
export const writeLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "60 s"), // 20 per minute
  prefix: "ratelimit:write",
});`} />
      </div>

      {/* User-Based Rate Limiting */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">USER_BASED_RATE_LIMITING</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Rate limit by user ID instead of IP for authenticated endpoints:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/app/api/protected-route/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ratelimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Rate limit by user ID (more fair than IP)
  const { success, remaining } = await ratelimit.limit(
    \`user:\${session.user.id}\`
  );

  if (!success) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  // Process request
  return NextResponse.json({
    success: true,
    remaining
  });
}`} />
      </div>

      {/* Environment Variables */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">ENVIRONMENT_VARIABLES</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Configure Upstash Redis for production rate limiting:
          </p>
        </div>
        <CodeBlock language="bash" code={`# .env.local

# Upstash Redis (get from https://upstash.com)
UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"`} />
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/security/csrf">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono font-semibold">CSRF_PROTECTION</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Protect forms from cross-site request forgery
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/security/bot-protection">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono font-semibold">BOT_PROTECTION</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Add bot detection to your endpoints
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
