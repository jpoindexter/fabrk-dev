---
title: 'Security Features: Building Secure SaaS from Day One'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'security-features-saas'
description: 'Fabrk includes security best practices out of the box: CSRF protection, rate limiting, input validation, and more.'
publishedAt: '2026-01-24T10:00:00.000Z'
---

**Security isn't an afterthought. It's built in.**

---

## Security by Default

Every SaaS needs security. But implementing it properly is complex.

Fabrk includes production-ready security features:

- Authentication with NextAuth v5
- CSRF protection
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection
- Secure headers

---

## Authentication Security

NextAuth v5 provides enterprise-grade auth:

```typescript
// JWT sessions (stateless, scalable)
session: { strategy: 'jwt' }

// Secure HTTP-only cookies
cookies: {
  sessionToken: {
    options: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
}
```

---

## CSRF Protection

Cross-Site Request Forgery protection is automatic:

```typescript
// NextAuth handles CSRF tokens
import { auth } from '@/lib/auth';

// All mutations verify CSRF token
export async function POST(request: Request) {
  const session = await auth();
  // CSRF already verified by NextAuth
}
```

---

## Rate Limiting

Prevent abuse with rate limiting:

```typescript
// middleware.ts
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function middleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for');

  try {
    await limiter.check(10, ip); // 10 requests per minute
  } catch {
    return new Response('Too Many Requests', { status: 429 });
  }
}
```

---

## Input Validation

Validate all inputs with Zod:

```typescript
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(8).max(128),
});

export async function POST(request: Request) {
  const body = await request.json();

  const result = createUserSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: result.error.issues },
      { status: 400 }
    );
  }

  // result.data is typed and validated
  const { email, name, password } = result.data;
}
```

---

## SQL Injection Prevention

Prisma prevents SQL injection by design:

```typescript
// SAFE - Prisma parameterizes queries
const user = await prisma.user.findFirst({
  where: { email: userInput },
});

// NEVER do this (raw queries are dangerous)
// await prisma.$queryRaw`SELECT * FROM users WHERE email = ${userInput}`;
```

---

## XSS Protection

Prevent Cross-Site Scripting:

```tsx
// React automatically escapes
<p>{userContent}</p> // Safe - escaped

// DANGEROUS - avoid unless necessary
<div dangerouslySetInnerHTML={{ __html: userContent }} />
```

For markdown content, sanitize first:

```typescript
import DOMPurify from 'dompurify';

const sanitizedHtml = DOMPurify.sanitize(markdownHtml);
```

---

## Secure Headers

Security headers are configured in `next.config.ts`:

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];
```

---

## Environment Variables

Never expose secrets:

```typescript
// Server-only (never sent to client)
const secret = env.STRIPE_SECRET_KEY;

// Client-safe (NEXT_PUBLIC_ prefix)
const publishable = env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
```

Zod validation ensures correct usage:

```typescript
const serverEnv = z.object({
  DATABASE_URL: z.string(), // Server only
});

const clientEnv = z.object({
  NEXT_PUBLIC_APP_URL: z.string(), // Safe for client
});
```

---

## Password Security

Passwords are hashed with bcrypt:

```typescript
import bcrypt from 'bcryptjs';

// Hash on registration
const hashedPassword = await bcrypt.hash(password, 12);

// Verify on login
const isValid = await bcrypt.compare(password, hashedPassword);
```

Never store plaintext passwords.

---

## API Route Protection

Protect routes consistently:

```typescript
import { auth } from '@/lib/auth';

export async function GET(request: Request) {
  // 1. Authenticate
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Authorize (role check)
  if (session.user.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 3. Validate input
  const { searchParams } = new URL(request.url);
  const id = z.string().cuid().parse(searchParams.get('id'));

  // 4. Process request
  const data = await prisma.resource.findUnique({
    where: { id, userId: session.user.id }, // Scope to user
  });

  return Response.json({ data });
}
```

---

## Webhook Security

Verify webhook signatures:

```typescript
import Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );

    // Signature verified, process event
  } catch (error) {
    return Response.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }
}
```

---

## Security Scanning

Run security checks before deploy:

```bash
# Vulnerability scan
npm run ai:security

# Full pre-deploy check
npm run ai:pre-deploy
```

---

## Checklist

Before going to production:

- [ ] All routes authenticated
- [ ] Role-based access control
- [ ] Input validation on all endpoints
- [ ] Rate limiting configured
- [ ] Security headers enabled
- [ ] Environment variables validated
- [ ] Webhook signatures verified
- [ ] No hardcoded secrets
- [ ] HTTPS enforced
- [ ] Dependencies updated

---

## Best Practices

1. **Trust nothing** - Validate all input
2. **Least privilege** - Only grant needed access
3. **Defense in depth** - Multiple security layers
4. **Fail securely** - Return generic errors to users
5. **Log security events** - For audit trails

Security from day one. Not bolted on later.

