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

---

## The Environment Problem

How many times have you deployed, only to discover:

- `STRIPE_SECRET_KEY` was missing
- `DATABASE_URL` had a typo
- `NEXTAUTH_SECRET` was the example value

Runtime crashes from missing config are preventable.

---

## Zod-Based Validation

Fabrk validates all environment variables using Zod:

```typescript
// src/lib/env/index.ts
import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Auth
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),

  // Payments
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),

  // Optional with defaults
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

export const env = envSchema.parse(process.env);
```

---

## Build-Time Validation

If any variable is missing or invalid, the build fails immediately:

```
Error: Environment validation failed

  DATABASE_URL: Required
  STRIPE_SECRET_KEY: Must start with "sk_"
```

No more mystery runtime errors.

---

## Usage Pattern

Always import from `@/lib/env`, never use `process.env` directly:

```typescript
// GOOD - validated and typed
import { env } from '@/lib/env';
const key = env.STRIPE_SECRET_KEY;

// BAD - unvalidated, untyped
const key = process.env.STRIPE_SECRET_KEY;
```

---

## Type Safety

The `env` object is fully typed:

```typescript
// TypeScript knows the exact shape
env.DATABASE_URL      // string
env.NODE_ENV          // 'development' | 'production' | 'test'
env.STRIPE_SECRET_KEY // string (starts with 'sk_')
```

Autocomplete works. Typos are caught.

---

## Server vs Client

Fabrk separates server and client environment variables:

```typescript
// Server-only (default)
const serverEnv = z.object({
  DATABASE_URL: z.string(),
  STRIPE_SECRET_KEY: z.string(),
});

// Client-safe (NEXT_PUBLIC_ prefix)
const clientEnv = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
});
```

Client env vars are validated separately and safe to expose.

---

## Optional Variables

Handle optional config with defaults:

```typescript
const envSchema = z.object({
  // Required
  DATABASE_URL: z.string(),

  // Optional with default
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  // Optional without default
  SENTRY_DSN: z.string().optional(),
});
```

---

## Custom Validators

Add custom validation rules:

```typescript
const envSchema = z.object({
  // Must be a valid PostgreSQL URL
  DATABASE_URL: z.string().refine(
    (url) => url.startsWith('postgresql://'),
    'Must be a PostgreSQL connection string'
  ),

  // Must be exactly 32 characters
  NEXTAUTH_SECRET: z.string().length(32),

  // Must be a valid Stripe key format
  STRIPE_SECRET_KEY: z.string().regex(
    /^sk_(test|live)_[a-zA-Z0-9]+$/,
    'Invalid Stripe secret key format'
  ),
});
```

---

## Development vs Production

Different validation for different environments:

```typescript
const envSchema = z.object({
  DATABASE_URL: z.string(),

  // Only required in production
  SENTRY_DSN: z.string().optional().refine(
    (val) => process.env.NODE_ENV !== 'production' || val,
    'SENTRY_DSN is required in production'
  ),
});
```

---

## Example .env.local

```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"

# Auth
NEXTAUTH_SECRET="your-32-character-secret-here!!"
NEXTAUTH_URL="http://localhost:3000"

# Public
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Payments (optional in development)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

---

## Error Messages

Validation errors are clear and actionable:

```
❌ Environment validation failed:

  DATABASE_URL
    → Required

  NEXTAUTH_SECRET
    → String must contain at least 32 character(s)
    → Received: "short"

  STRIPE_SECRET_KEY
    → Must start with "sk_"
    → Received: "rk_test_..."
```

---

## CI/CD Integration

Catch missing variables in CI:

```yaml
# .github/workflows/deploy.yml
- name: Validate Environment
  run: npm run build
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
    NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
```

Build fails if secrets are missing.

---

## Best Practices

1. **Never use `process.env` directly** - Always use the validated `env` object
2. **Validate early** - Schema is checked at import time
3. **Be specific** - Use `.url()`, `.email()`, `.startsWith()` for precise validation
4. **Document requirements** - Keep `.env.example` updated
5. **Separate concerns** - Server vars vs client vars

---

## Getting Started

1. Define your schema in `src/lib/env/index.ts`
2. Import `env` instead of using `process.env`
3. Run `npm run build` to validate
4. Ship with confidence

Never deploy with missing config again.

