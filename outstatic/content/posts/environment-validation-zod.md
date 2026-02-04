---
title: 'Environment Validation: Type-Safe Config with Zod'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'environment-validation-zod'
description: 'Never ship with missing environment variables. Fabrk validates all config at build time using Zod schemas.'
publishedAt: '2026-01-28T10:00:00.000Z'
---

**Catch missing env vars at build time, not runtime.**

Environment variables are the configuration backbone of every SaaS application. Database connections, API keys, authentication secrets, payment processor credentials - they all live in environment variables. Yet most applications treat them as an afterthought, accessing them directly via `process.env` without any validation, typing, or error handling.

This approach is a ticking time bomb. How many times have you deployed to production only to discover that `STRIPE_SECRET_KEY` was missing, `DATABASE_URL` had a typo, or `NEXTAUTH_SECRET` was still the placeholder value from the example file?

In this guide, we will explore how Fabrk implements comprehensive environment variable validation using Zod schemas, ensuring your SaaS application never fails due to misconfiguration.

---

## Why Environment Validation Matters for SaaS

SaaS applications are particularly vulnerable to environment variable issues for several reasons:

### 1. Multiple Environments

You are juggling development, staging, and production environments. Each has different configuration values. It is trivially easy to:

- Deploy with development credentials to production
- Forget to set a required variable in a new environment
- Copy-paste the wrong value between environments

### 2. Third-Party Service Dependencies

Modern SaaS applications integrate with numerous external services:

- Payment processors (Stripe, Polar, Lemonsqueezy)
- Email providers (Resend, SendGrid)
- Authentication services (OAuth providers)
- Analytics platforms (PostHog, Segment)
- Error tracking (Sentry)
- File storage (S3, Cloudflare R2)
- Caching (Redis, Upstash)

Each service requires one or more API keys, secrets, or configuration values. A single missing or malformed variable can take down your entire application.

### 3. Security Implications

Invalid environment configuration can lead to:

- Exposing server secrets to the client (forgetting the `NEXT_PUBLIC_` prefix distinction)
- Using test credentials in production
- Leaking sensitive data through misconfigured logging
- Authentication bypasses due to missing secret keys

### 4. Delayed Failure Detection

Without validation, environment issues often manifest as:

- Cryptic runtime errors deep in your application
- Features that silently fail
- Intermittent bugs that are difficult to reproduce
- Production outages at the worst possible time

**The solution is simple: validate early, validate thoroughly, and fail fast.**

---

## The Traditional Approach and Its Problems

Most Next.js applications access environment variables like this:

```typescript
// The dangerous way everyone does it
const stripeKey = process.env.STRIPE_SECRET_KEY;
const dbUrl = process.env.DATABASE_URL;

// Problems:
// 1. No type safety - TypeScript thinks these are string | undefined
// 2. No validation - could be empty, malformed, or wrong format
// 3. No documentation - what variables exist? what format should they be?
// 4. Runtime discovery - you only find problems when code executes
```

This approach has several critical flaws:

**No Type Safety**: TypeScript types `process.env.ANYTHING` as `string | undefined`. You must add null checks everywhere, and the compiler cannot help you catch typos in variable names.

**No Format Validation**: A Stripe secret key should start with `sk_`. A database URL should be a valid PostgreSQL connection string. A NextAuth secret should be at least 32 characters. The traditional approach validates none of this.

**No Relationship Validation**: Some variables come in groups. If you set `GOOGLE_CLIENT_ID`, you must also set `GOOGLE_CLIENT_SECRET`. The traditional approach cannot express these dependencies.

**Late Failure**: You discover problems when the code path that uses the variable executes, which might be days after deployment or only in specific edge cases.

---

## Complete Zod Schema Examples

Zod is a TypeScript-first schema validation library. It lets you define the shape and constraints of your data, then validate values against that schema at runtime while inferring TypeScript types at compile time.

Here is how Fabrk structures environment validation:

### Basic Schema Definition

```typescript
// src/lib/env/schema.ts
import { z } from 'zod';

// Server-side environment variables
export const serverEnvSchema = z.object({
  // Node Environment
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Database - Required
  DATABASE_URL: z
    .string()
    .min(1, 'Database URL is required')
    .refine(
      (url) => url.startsWith('postgres://') || url.startsWith('postgresql://'),
      'Must be a valid PostgreSQL connection string'
    ),
  DATABASE_URL_DIRECT: z.string().optional(),

  // Authentication - Required
  NEXTAUTH_URL: z
    .string()
    .url('Must be a valid URL'),
  NEXTAUTH_SECRET: z
    .string()
    .min(32, 'Must be at least 32 characters for security'),

  // Stripe - Optional but validated when present
  STRIPE_SECRET_KEY: z
    .string()
    .startsWith('sk_', 'Must start with sk_test_ or sk_live_')
    .optional(),
  STRIPE_WEBHOOK_SECRET: z
    .string()
    .startsWith('whsec_', 'Must start with whsec_')
    .optional(),

  // Email - Optional
  RESEND_API_KEY: z
    .string()
    .startsWith('re_', 'Must start with re_')
    .optional(),
  EMAIL_FROM: z
    .string()
    .email('Must be a valid email address')
    .optional()
    .default('noreply@example.com'),

  // AI Services - Optional
  OPENAI_API_KEY: z
    .string()
    .startsWith('sk-', 'Must start with sk-')
    .optional(),
  ANTHROPIC_API_KEY: z
    .string()
    .startsWith('sk-ant-', 'Must start with sk-ant-')
    .optional(),
});

// Client-side environment variables (NEXT_PUBLIC_ prefix)
export const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url('Must be a valid URL')
    .default('http://localhost:3000'),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
    .string()
    .startsWith('pk_', 'Must start with pk_test_ or pk_live_')
    .optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z
    .string()
    .startsWith('phc_', 'Must start with phc_')
    .optional(),
});

// Infer TypeScript types from schemas
export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;
```

### Advanced Validation Patterns

Zod supports sophisticated validation rules that go beyond simple type checking:

```typescript
// Conditional validation - some variables depend on others
const oauthSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
}).refine(
  (data) => {
    // If one is set, both must be set
    const hasId = !!data.GOOGLE_CLIENT_ID;
    const hasSecret = !!data.GOOGLE_CLIENT_SECRET;
    return hasId === hasSecret;
  },
  {
    message: 'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must both be set or both be empty',
    path: ['GOOGLE_CLIENT_ID'],
  }
);

// Group validation - all-or-nothing configuration
const pusherSchema = z.object({
  PUSHER_APP_ID: z.string().optional(),
  PUSHER_SECRET: z.string().optional(),
  NEXT_PUBLIC_PUSHER_KEY: z.string().optional(),
  NEXT_PUBLIC_PUSHER_CLUSTER: z.string().optional(),
}).refine(
  (data) => {
    const vars = [
      data.PUSHER_APP_ID,
      data.PUSHER_SECRET,
      data.NEXT_PUBLIC_PUSHER_KEY,
      data.NEXT_PUBLIC_PUSHER_CLUSTER,
    ];
    const present = vars.filter(Boolean).length;
    return present === 0 || present === 4;
  },
  {
    message: 'All Pusher variables must be set together (or none at all)',
    path: ['PUSHER_APP_ID'],
  }
);

// Environment-specific validation
const sentrySchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
}).refine(
  (data) => {
    // Sentry is required in production
    if (data.NODE_ENV === 'production') {
      return !!data.NEXT_PUBLIC_SENTRY_DSN;
    }
    return true;
  },
  {
    message: 'NEXT_PUBLIC_SENTRY_DSN is required in production',
    path: ['NEXT_PUBLIC_SENTRY_DSN'],
  }
);

// Custom format validation with regex
const stripeKeySchema = z.string().regex(
  /^sk_(test|live)_[a-zA-Z0-9]{24,}$/,
  'Invalid Stripe secret key format. Expected sk_test_... or sk_live_...'
);

// Transform validation - parse and transform values
const portSchema = z
  .string()
  .transform((val) => parseInt(val, 10))
  .refine((val) => val >= 1 && val <= 65535, 'Port must be between 1 and 65535');

// Coercion for numeric values from environment
const concurrencySchema = z.coerce
  .number()
  .min(1)
  .max(100)
  .default(5);
```

---

## Build-Time vs Runtime Validation

Understanding when validation occurs is crucial for designing a robust configuration system.

### Build-Time Validation

Next.js evaluates environment variables during the build process. By importing your validated env module in server components or API routes, validation runs at build time:

```typescript
// This import triggers validation during next build
import { env } from '@/lib/env';

export async function POST(request: Request) {
  // env.STRIPE_SECRET_KEY is guaranteed to exist and be valid
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  // ...
}
```

**Benefits:**
- CI/CD pipeline fails if configuration is invalid
- No invalid builds reach production
- Problems discovered before deployment

**Limitations:**
- Only validates variables available at build time
- Cannot validate runtime-injected variables (some serverless platforms)

### Runtime Validation

For variables that might be injected at runtime or need dynamic validation:

```typescript
// src/lib/env/index.ts
import { validateEnvOrThrow, validateEnvWithWarnings } from './validation';
import { logger } from '@/lib/logger';

// Run validation based on environment
if (process.env.NODE_ENV === 'production') {
  // In production, fail fast if critical env vars are missing
  validateEnvOrThrow();
} else {
  // In development, show warnings but don't block startup for optional features
  validateEnvWithWarnings();
}
```

This pattern provides different behaviors:

**Production**: Strict validation. Any missing or invalid required variable throws an error, preventing the application from starting with bad configuration.

**Development**: Lenient validation. Critical variables (database, auth) still throw, but optional features (analytics, error tracking) only log warnings. This lets developers work without configuring every possible integration.

### The Hybrid Approach

Fabrk uses both build-time and runtime validation:

```typescript
// Validation runs at module import time
// In next build: runs during build
// In next dev: runs when module first imports
// In production: runs at application startup

import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(32),
});

// Parse immediately - throws if invalid
export const env = envSchema.parse(process.env);

// TypeScript now knows env.DATABASE_URL is string (not string | undefined)
```

---

## Server vs Client Environment Variables

Next.js distinguishes between server-side and client-side environment variables using the `NEXT_PUBLIC_` prefix. Understanding this distinction is critical for security.

### Server-Only Variables (No Prefix)

```bash
# These are ONLY available on the server
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_live_..."
NEXTAUTH_SECRET="your-secret-key"
RESEND_API_KEY="re_..."
```

These variables:
- Are available in API routes, server components, and server actions
- Are NOT bundled into client JavaScript
- Should contain sensitive secrets

### Client-Safe Variables (NEXT_PUBLIC_ Prefix)

```bash
# These are available on both server AND client
NEXT_PUBLIC_APP_URL="https://myapp.com"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
```

These variables:
- Are bundled into the client JavaScript bundle
- Are visible to anyone who views your page source
- Should NEVER contain secrets

### Separate Validation Schemas

Fabrk validates server and client variables separately:

```typescript
// src/lib/env/server.ts
import { z } from 'zod';

const serverSchema = z.object({
  // Secrets - never exposed to client
  DATABASE_URL: z.string(),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  NEXTAUTH_SECRET: z.string().min(32),

  // Server-only configuration
  CRON_SECRET: z.string().optional(),
  JOB_WORKER_CONCURRENCY: z.coerce.number().default(5),
});

// Only import this in server code
export const serverEnv = serverSchema.parse(process.env);
```

```typescript
// src/lib/env/client.ts
import { z } from 'zod';

const clientSchema = z.object({
  // Public configuration - safe to expose
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_').optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
});

// Safe to import anywhere
export const clientEnv = clientSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
});
```

### Preventing Secret Leakage

Add validation to catch accidental exposure:

```typescript
// Ensure no secrets accidentally have NEXT_PUBLIC_ prefix
const secretPatterns = [
  /SECRET/i,
  /PASSWORD/i,
  /PRIVATE/i,
  /API_KEY$/i,
  /TOKEN$/i,
];

Object.keys(process.env).forEach((key) => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    const hasSecretPattern = secretPatterns.some((pattern) => pattern.test(key));
    if (hasSecretPattern) {
      console.warn(
        `WARNING: ${key} appears to be a secret but has NEXT_PUBLIC_ prefix. ` +
        `This will be exposed to the client!`
      );
    }
  }
});
```

---

## Error Messages and Debugging

Good error messages are the difference between a 5-minute fix and hours of debugging. Fabrk formats validation errors to be immediately actionable:

### Clear Error Formatting

```typescript
function formatErrors(errors: ValidationError[]): string {
  const errorsByCategory = errors.reduce((acc, error) => {
    if (!acc[error.category]) {
      acc[error.category] = [];
    }
    acc[error.category].push(error);
    return acc;
  }, {} as Record<string, ValidationError[]>);

  const lines: string[] = [
    '',
    '════════════════════════════════════════════════════════════════',
    '  Environment Variable Validation Failed',
    '════════════════════════════════════════════════════════════════',
    '',
  ];

  Object.entries(errorsByCategory).forEach(([category, categoryErrors]) => {
    lines.push(`[${category}]`);
    categoryErrors.forEach((error) => {
      lines.push(`  ✗ ${error.variable}`);
      lines.push(`    ${error.message}`);
      lines.push('');
    });
  });

  lines.push('════════════════════════════════════════════════════════════════');
  lines.push('');
  lines.push('Setup Instructions:');
  lines.push('  1. Copy .env.example to .env.local');
  lines.push('  2. Fill in all required environment variables');
  lines.push('  3. See .env.example for detailed setup instructions');
  lines.push('  4. Run "npm run dev" again');
  lines.push('');
  lines.push('════════════════════════════════════════════════════════════════');

  return lines.join('\n');
}
```

### Example Error Output

When validation fails, developers see:

```
════════════════════════════════════════════════════════════════
  Environment Variable Validation Failed
════════════════════════════════════════════════════════════════

[Database]
  ✗ DATABASE_URL
    Must be a valid PostgreSQL URL (postgres:// or postgresql://)

[Authentication]
  ✗ NEXTAUTH_SECRET
    Must be at least 32 characters for security
    Received: "short-secret"

[Payment]
  ✗ STRIPE_SECRET_KEY
    Must start with sk_test_ or sk_live_
    Received: "rk_test_abc123"

════════════════════════════════════════════════════════════════

Setup Instructions:
  1. Copy .env.example to .env.local
  2. Fill in all required environment variables
  3. See .env.example for detailed setup instructions
  4. Run "npm run dev" again

════════════════════════════════════════════════════════════════
```

### Debugging Tips

**Check what is actually set:**

```typescript
// Log all environment variables (development only!)
if (process.env.NODE_ENV === 'development') {
  console.log('Environment variables:', {
    DATABASE_URL: process.env.DATABASE_URL ? '[SET]' : '[MISSING]',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '[SET]' : '[MISSING]',
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? '[SET]' : '[MISSING]',
  });
}
```

**Validate specific variables:**

```typescript
// Test a single variable
const result = z.string().url().safeParse(process.env.DATABASE_URL);
if (!result.success) {
  console.error('DATABASE_URL validation failed:', result.error.format());
}
```

---

## Integration with Next.js

### App Router Integration

In Next.js App Router, environment validation integrates seamlessly:

```typescript
// src/lib/env/index.ts - validates on import
export const env = envSchema.parse(process.env);

// src/app/api/stripe/webhook/route.ts
import { env } from '@/lib/env';
import Stripe from 'stripe';

// Validation already ran - env.STRIPE_SECRET_KEY is guaranteed valid
const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')!;

  const event = stripe.webhooks.constructEvent(
    await request.text(),
    signature,
    env.STRIPE_WEBHOOK_SECRET // Also guaranteed valid
  );

  // Handle webhook...
}
```

### Middleware Integration

Validate environment before any request processing:

```typescript
// src/middleware.ts
import { env } from '@/lib/env';

export function middleware(request: NextRequest) {
  // If we reach here, env validation passed
  // Safe to use env.NEXTAUTH_URL, etc.
}
```

### next.config.js Integration

You can also validate at config load time:

```javascript
// next.config.js
const { z } = require('zod');

// Validate build-time variables
const buildEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  ANALYZE: z.enum(['true', 'false']).optional(),
});

const buildEnv = buildEnvSchema.parse(process.env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use validated env
  productionBrowserSourceMaps: buildEnv.NODE_ENV === 'development',
};

module.exports = nextConfig;
```

---

## Security Best Practices

### 1. Never Commit Secrets

```bash
# .gitignore
.env
.env.local
.env.*.local
```

### 2. Use Environment-Specific Files

```bash
# Development (committed, no secrets)
.env.development

# Local overrides (not committed, has secrets)
.env.local

# Production (set in deployment platform, never in files)
```

### 3. Validate Key Formats

```typescript
// Ensure keys match expected formats
const envSchema = z.object({
  // Stripe keys have specific prefixes
  STRIPE_SECRET_KEY: z.string().regex(/^sk_(test|live)_[a-zA-Z0-9]+$/),

  // NextAuth secret should be base64
  NEXTAUTH_SECRET: z.string().regex(/^[A-Za-z0-9+/=]{32,}$/),

  // Database URL should be PostgreSQL
  DATABASE_URL: z.string().startsWith('postgresql://'),
});
```

### 4. Audit Environment Access

```typescript
// Create a wrapper that logs access (development only)
function createAuditedEnv<T extends Record<string, unknown>>(env: T): T {
  if (process.env.NODE_ENV !== 'development') {
    return env;
  }

  return new Proxy(env, {
    get(target, prop) {
      console.log(`[ENV ACCESS] ${String(prop)}`);
      return target[prop as keyof T];
    },
  });
}

export const env = createAuditedEnv(envSchema.parse(process.env));
```

### 5. Rotate Secrets Regularly

Implement secret rotation validation:

```typescript
// Warn if secrets appear to be old (based on format changes)
const CURRENT_SECRET_VERSION = 2;

const secretVersionSchema = z.object({
  INTERNAL_SECRET_VERSION: z.coerce.number().default(1),
}).refine(
  (data) => data.INTERNAL_SECRET_VERSION >= CURRENT_SECRET_VERSION,
  `Secrets may be outdated. Current version: ${CURRENT_SECRET_VERSION}. ` +
  'Please regenerate secrets and update INTERNAL_SECRET_VERSION.'
);
```

---

## Handling Optional vs Required Variables

Different environment variables have different requirements. Fabrk categorizes them:

### Required Variables

Must be present for the application to function:

```typescript
const requiredSchema = z.object({
  // Core infrastructure
  DATABASE_URL: z.string().min(1, 'Database URL is required'),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
});
```

### Conditionally Required Variables

Required in certain environments or when other features are enabled:

```typescript
const conditionalSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),

  // Required in production only
  SENTRY_DSN: z.string().url().optional(),
}).refine(
  (data) => {
    if (data.NODE_ENV === 'production') {
      return !!data.SENTRY_DSN;
    }
    return true;
  },
  { message: 'SENTRY_DSN is required in production', path: ['SENTRY_DSN'] }
);
```

### Optional with Defaults

Provide sensible defaults for optional configuration:

```typescript
const optionalWithDefaultsSchema = z.object({
  // Default to localhost in development
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),

  // Default log level
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  // Default worker configuration
  JOB_WORKER_CONCURRENCY: z.coerce.number().min(1).max(100).default(5),
  JOB_WORKER_INTERVAL: z.coerce.number().min(100).default(1000),
});
```

### Truly Optional Variables

Features that are nice to have but not required:

```typescript
const optionalSchema = z.object({
  // Analytics - app works without it
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),

  // AI features - gracefully degraded without it
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
});
```

### Feature Flag Pattern

Fabrk exposes feature availability based on environment configuration:

```typescript
// src/lib/env/index.ts
export const env = envSchema.parse(process.env);

// Derived feature flags
export const features = {
  googleOAuth: !!env.GOOGLE_CLIENT_ID && !!env.GOOGLE_CLIENT_SECRET,
  pusher: !!env.NEXT_PUBLIC_PUSHER_KEY,
  algolia: !!env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  redis: !!env.UPSTASH_REDIS_REST_URL,
  s3: !!env.S3_BUCKET_NAME,
  sentry: !!env.NEXT_PUBLIC_SENTRY_DSN,
  openai: !!env.OPENAI_API_KEY,
  anthropic: !!env.ANTHROPIC_API_KEY,
  posthog: !!env.NEXT_PUBLIC_POSTHOG_KEY,
} as const;

// Usage in components
if (features.openai) {
  // Render AI features
}
```

---

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install dependencies
        run: npm ci

      - name: Build (validates environment)
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
          NEXTAUTH_URL: ${{ secrets.NEXTAUTH_URL }}
          STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
          STRIPE_WEBHOOK_SECRET: ${{ secrets.STRIPE_WEBHOOK_SECRET }}
          NEXT_PUBLIC_APP_URL: ${{ vars.NEXT_PUBLIC_APP_URL }}
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: ${{ vars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY }}
```

### Vercel

Vercel validates environment variables at build time. Set them in your project settings:

1. Go to Project Settings > Environment Variables
2. Add required variables for Production, Preview, and Development
3. Use different values per environment (test vs live Stripe keys)

### Pre-deployment Validation Script

```typescript
// scripts/validate-env.ts
import { validateEnvOrThrow } from '../src/lib/env/validation';

console.log('Validating environment variables...');

try {
  validateEnvOrThrow();
  console.log('Environment validation passed!');
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
```

```json
{
  "scripts": {
    "validate:env": "tsx scripts/validate-env.ts",
    "predeploy": "npm run validate:env && npm run build"
  }
}
```

---

## Development Workflow

### Feature Summary on Startup

Fabrk logs which optional features are enabled when starting the dev server:

```typescript
// Log feature summary in development
if (process.env.NODE_ENV === 'development') {
  const summary = getFeatureSummary();

  if (summary.enabled.length > 0) {
    console.log('\n✅ Optional features enabled:');
    summary.enabled.forEach((feature) => console.log(`   - ${feature}`));
  }

  if (summary.disabled.length > 0) {
    console.log('\n⚪ Optional features disabled:');
    summary.disabled.forEach((feature) => console.log(`   - ${feature}`));
  }
}
```

Example output:

```
✅ Optional features enabled:
   - Google OAuth
   - Real-Time (Pusher)
   - Error Tracking (Sentry)

⚪ Optional features disabled:
   - Analytics (PostHog)
   - Search (Algolia)
   - Cache (Redis)
   - File Storage (S3)
   - AI (OpenAI)
   - AI (Anthropic)
```

This immediately tells developers which features are available in their environment.

---

## Example .env.local Template

```bash
# ===========================================
# REQUIRED - Application will not start without these
# ===========================================

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Payment (at least one required)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# ===========================================
# PUBLIC - Exposed to browser (safe to share)
# ===========================================

NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# ===========================================
# OPTIONAL - Features work without these
# ===========================================

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email (transactional)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_..."

# Error Tracking
NEXT_PUBLIC_SENTRY_DSN="https://..."

# Real-Time
PUSHER_APP_ID=""
PUSHER_SECRET=""
NEXT_PUBLIC_PUSHER_KEY=""
NEXT_PUBLIC_PUSHER_CLUSTER=""

# AI Services
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."

# Cache
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# File Storage
S3_ENDPOINT=""
S3_ACCESS_KEY_ID=""
S3_SECRET_ACCESS_KEY=""
S3_BUCKET_NAME=""
```

---

## Key Takeaways

1. **Never use `process.env` directly** - Always access through a validated `env` object
2. **Validate at import time** - Catch problems as early as possible
3. **Use Zod for type inference** - Get compile-time types from runtime validation
4. **Separate server and client variables** - Prevent accidental secret exposure
5. **Provide actionable error messages** - Include setup instructions in errors
6. **Categorize by importance** - Required vs optional vs conditional
7. **Log feature availability** - Help developers understand their environment
8. **Integrate with CI/CD** - Fail builds with invalid configuration

Environment validation is not glamorous work, but it is essential. A few hours spent building a robust validation system will save you countless hours of debugging mysterious production failures.

With Fabrk's environment validation approach, you will never deploy with missing config again.

