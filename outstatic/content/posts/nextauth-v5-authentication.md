---
title: 'NextAuth v5: Modern Authentication for Next.js 16'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'nextauth-v5-authentication'
description: 'How Fabrk implements NextAuth v5 with JWT sessions, OAuth providers, and role-based access control. Production-ready authentication out of the box.'
publishedAt: '2026-02-01T10:00:00.000Z'
---

**Production-ready authentication with NextAuth v5 and Next.js 16.**

---

## Why NextAuth v5?

NextAuth v5 (now called Auth.js) brings major improvements:

- **Edge-compatible** - Works with middleware
- **Type-safe** - Full TypeScript support
- **Simpler API** - Cleaner configuration
- **Better security** - Improved CSRF protection

Fabrk includes NextAuth v5 pre-configured and ready to use.

---

## Pre-Built Auth Components

Fabrk includes ready-to-use authentication components:

```tsx
import { SignInForm } from '@/components/auth/sign-in-form';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { SocialAuthButtons } from '@/components/auth/social-auth';
```

All components follow the terminal design system and support all 18 themes.

---

## Configuration

Authentication is configured in `src/lib/auth.ts`:

```typescript
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      // Email/password authentication
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});
```

---

## Protected Routes

Protect API routes with a simple pattern:

```typescript
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // User is authenticated
  return Response.json({ data: session.user });
}
```

---

## Protected Pages

Use middleware for page protection:

```typescript
// middleware.ts
import { auth } from '@/lib/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtected = req.nextUrl.pathname.startsWith('/dashboard');

  if (isProtected && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.url));
  }
});

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

---

## Role-Based Access Control

Fabrk includes RBAC out of the box:

```typescript
// Check user role
const session = await auth();

if (session?.user.role !== 'admin') {
  return Response.json(
    { error: 'Forbidden' },
    { status: 403 }
  );
}
```

Available roles: `user`, `admin`, `owner`

---

## OAuth Providers

Fabrk supports multiple OAuth providers:

- GitHub
- Google
- Discord
- Twitter/X
- LinkedIn

Add credentials to `.env.local`:

```bash
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

---

## Email/Password Auth

For traditional authentication:

```typescript
Credentials({
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: async (credentials) => {
    const user = await verifyCredentials(
      credentials.email,
      credentials.password
    );
    return user;
  },
}),
```

Passwords are hashed with bcrypt automatically.

---

## Session Management

JWT sessions are used by default:

- No database queries for session validation
- Works at the edge
- Stateless and scalable

Session data is available everywhere:

```tsx
// Server Component
import { auth } from '@/lib/auth';
const session = await auth();

// Client Component
import { useSession } from 'next-auth/react';
const { data: session } = useSession();
```

---

## Security Features

Fabrk's auth implementation includes:

- CSRF protection
- Secure HTTP-only cookies
- JWT encryption
- Rate limiting (via middleware)
- Password hashing with bcrypt

---

## Getting Started

1. Configure OAuth apps in provider dashboards
2. Add credentials to `.env.local`
3. Run `npm run db:push` to create user tables
4. Start using `<SignInForm />` and `<SignUpForm />`

Authentication is ready in minutes, not days.

