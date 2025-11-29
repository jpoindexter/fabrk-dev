import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "API Keys - Fabrk Documentation",
  description: "Learn how to implement secure API key generation, hashing, and rate limiting for your API.",
};

export default function ApiKeysPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Documentation
        </Link>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x70] FEATURES ] API_KEYS</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">API_KEYS</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Secure API key generation with SHA-256 hashing, timing-safe comparison, and rate limiting.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold text-primary mb-4">OVERVIEW</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            The API keys system provides secure programmatic access to your application&apos;s API.
            Keys are generated with cryptographic randomness, stored as hashes, and validated
            using timing-safe comparison to prevent timing attacks.
          </p>
          <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>256-bit keys:</strong> Cryptographically secure random generation</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>SHA-256 hashing:</strong> Only hashes stored in database</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Timing-safe validation:</strong> Prevents timing attacks</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Rate limiting:</strong> Protect against abuse</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Scoped permissions:</strong> Fine-grained access control</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">DATABASE_SCHEMA</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            API key model in Prisma schema:
          </p>
        </div>
        <CodeBlock language="prisma" code={`// prisma/schema.prisma
model ApiKey {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  name        String    // User-friendly name
  keyHash     String    @unique // SHA-256 hash
  keyPrefix   String    // First 8 chars for identification (e.g., "fk_live_")

  scopes      String[]  // ["read:users", "write:data"]

  lastUsedAt  DateTime?
  expiresAt   DateTime?
  revokedAt   DateTime?

  createdAt   DateTime  @default(now())

  @@index([keyHash])
  @@index([userId])
}`} />
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">KEY_GENERATION</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Securely generate and hash API keys:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/lib/api-keys.ts
import crypto from "crypto";
import { prisma } from "@/lib/db";

interface CreateApiKeyInput {
  userId: string;
  name: string;
  scopes: string[];
  expiresAt?: Date;
}

export async function createApiKey(input: CreateApiKeyInput) {
  // Generate 256-bit random key
  const rawKey = crypto.randomBytes(32).toString("base64url");

  // Create key with prefix for easy identification
  const prefix = "fk_live_";
  const fullKey = prefix + rawKey;

  // Hash the key for storage
  const keyHash = crypto
    .createHash("sha256")
    .update(fullKey)
    .digest("hex");

  // Store in database
  const apiKey = await prisma.apiKey.create({
    data: {
      userId: input.userId,
      name: input.name,
      keyHash,
      keyPrefix: prefix,
      scopes: input.scopes,
      expiresAt: input.expiresAt,
    },
  });

  // Return the full key ONCE (never stored or retrievable)
  return {
    id: apiKey.id,
    key: fullKey, // Show to user once
    name: apiKey.name,
    scopes: apiKey.scopes,
    createdAt: apiKey.createdAt,
  };
}

// Available scopes
export const API_SCOPES = [
  "read:profile",
  "write:profile",
  "read:organizations",
  "write:organizations",
  "read:billing",
  "manage:billing",
  "admin",
] as const;`} />
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">KEY_VALIDATION</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Validate API keys with timing-safe comparison:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/lib/api-keys.ts
import crypto from "crypto";

export async function validateApiKey(key: string) {
  // Hash the provided key
  const keyHash = crypto
    .createHash("sha256")
    .update(key)
    .digest("hex");

  // Find key by hash
  const apiKey = await prisma.apiKey.findUnique({
    where: { keyHash },
    include: { user: true },
  });

  if (!apiKey) {
    return { valid: false, error: "Invalid API key" };
  }

  // Check if revoked
  if (apiKey.revokedAt) {
    return { valid: false, error: "API key has been revoked" };
  }

  // Check expiration
  if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
    return { valid: false, error: "API key has expired" };
  }

  // Update last used timestamp
  await prisma.apiKey.update({
    where: { id: apiKey.id },
    data: { lastUsedAt: new Date() },
  });

  return {
    valid: true,
    userId: apiKey.userId,
    scopes: apiKey.scopes,
    user: apiKey.user,
  };
}

// Middleware for API routes
export async function withApiKey(
  req: Request,
  requiredScopes: string[] = []
) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Missing API key", status: 401 };
  }

  const key = authHeader.slice(7);
  const result = await validateApiKey(key);

  if (!result.valid) {
    return { error: result.error, status: 401 };
  }

  // Check scopes
  if (requiredScopes.length > 0) {
    const hasScope = requiredScopes.every(
      (scope) => result.scopes.includes(scope) || result.scopes.includes("admin")
    );

    if (!hasScope) {
      return { error: "Insufficient permissions", status: 403 };
    }
  }

  return { user: result.user, scopes: result.scopes };
}`} />
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">USING_API_KEYS_IN_ROUTES</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Protect your API routes with API key authentication:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/app/api/v1/data/route.ts
import { withApiKey } from "@/lib/api-keys";

export async function GET(req: Request) {
  // Validate API key with required scopes
  const auth = await withApiKey(req, ["read:data"]);

  if ("error" in auth) {
    return Response.json(
      { error: auth.error },
      { status: auth.status }
    );
  }

  // auth.user is available
  const data = await prisma.data.findMany({
    where: { userId: auth.user.id },
  });

  return Response.json({ data });
}

export async function POST(req: Request) {
  // Require write scope
  const auth = await withApiKey(req, ["write:data"]);

  if ("error" in auth) {
    return Response.json(
      { error: auth.error },
      { status: auth.status }
    );
  }

  const body = await req.json();

  const data = await prisma.data.create({
    data: {
      ...body,
      userId: auth.user.id,
    },
  });

  return Response.json({ data });
}`} />
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary mb-4">RATE_LIMITING</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Implement rate limiting per API key:
          </p>
        </div>
        <CodeBlock language="bash" code={`// src/lib/rate-limit.ts
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  default: { maxRequests: 100, windowMs: 60000 },    // 100/min
  premium: { maxRequests: 1000, windowMs: 60000 },   // 1000/min
  enterprise: { maxRequests: 10000, windowMs: 60000 }, // 10000/min
};

export async function checkRateLimit(
  identifier: string,
  tier: string = "default"
) {
  const config = RATE_LIMITS[tier] || RATE_LIMITS.default;
  const key = \`rate_limit:\${identifier}\`;

  const current = await redis.incr(key);

  if (current === 1) {
    await redis.pexpire(key, config.windowMs);
  }

  const remaining = Math.max(0, config.maxRequests - current);
  const reset = await redis.pttl(key);

  return {
    allowed: current <= config.maxRequests,
    remaining,
    reset: Date.now() + reset,
    limit: config.maxRequests,
  };
}

// Usage in API route
export async function GET(req: Request) {
  const auth = await withApiKey(req);
  if ("error" in auth) {
    return Response.json({ error: auth.error }, { status: auth.status });
  }

  const rateLimit = await checkRateLimit(auth.user.id, auth.user.plan);

  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Rate limit exceeded" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": rateLimit.limit.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": rateLimit.reset.toString(),
          "Retry-After": Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // Process request...
}`} />
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold text-primary mb-4">SECURITY_BEST_PRACTICES</h2>
          <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Never log full keys:</strong> Only log the prefix for debugging</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Show key once:</strong> Display the full key only at creation time</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Use HTTPS only:</strong> Never transmit keys over HTTP</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Implement expiration:</strong> Set reasonable expiration dates</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Allow revocation:</strong> Users should be able to revoke keys instantly</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Track usage:</strong> Log last used timestamps and access patterns</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Scope permissions:</strong> Follow principle of least privilege</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Rate limit aggressively:</strong> Protect against brute force and abuse</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
