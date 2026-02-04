---
title: 'NextAuth v5: Modern Authentication for Next.js 16'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'nextauth-v5-authentication'
description: 'How Fabrk implements NextAuth v5 with JWT sessions, OAuth providers, and role-based access control. Production-ready authentication out of the box.'
publishedAt: '2026-02-01T10:00:00.000Z'
---

Authentication is the foundation of every SaaS application. Fabrk includes NextAuth v5 (now Auth.js) pre-configured with JWT sessions, multiple OAuth providers, email/password authentication, and role-based access control.

---

## Why NextAuth v5?

NextAuth v5 represents a complete rewrite of the most popular authentication library for Next.js:

**Edge Compatibility**
- Works seamlessly with Next.js middleware
- Session validation at the edge for faster responses
- No cold start penalties for authentication checks

**Type Safety**
- Full TypeScript support out of the box
- Typed session objects with custom fields
- Autocomplete for all configuration options

**Simplified API**
- Single `auth()` function replaces `getServerSession()`
- Cleaner provider configuration
- Built-in support for App Router

**Security Improvements**
- Enhanced CSRF protection
- Automatic token rotation
- Secure defaults for all settings

---

## Pre-Built Authentication Components

Fabrk includes production-ready authentication components that follow the terminal design system:

```tsx
// Sign-in form with email/password
import { SignInForm } from '@/components/auth/sign-in-form';

// Registration form
import { SignUpForm } from '@/components/auth/sign-up-form';

// OAuth provider buttons (GitHub, Google, etc.)
import { SocialAuthButtons } from '@/components/auth/social-auth';

// Visual divider between OAuth and email forms
import { SocialAuthDivider } from '@/components/auth/social-auth';

// Error message display
import { AuthErrorMessage } from '@/components/auth/social-auth';
```

### Using the Sign-In Form

```tsx
// src/app/(auth)/login/page.tsx
import { SignInForm } from '@/components/auth/sign-in-form';
import { SocialAuthButtons } from '@/components/auth/social-auth';
import { SocialAuthDivider } from '@/components/auth/social-auth';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className={cn('w-full max-w-md border border-border', mode.radius)}>
        <CardHeader>
          <div className="border-b border-border pb-2">
            <span className="font-mono text-xs text-muted-foreground">
              [ AUTHENTICATION ]
            </span>
          </div>
          <h1 className="font-mono text-xl font-semibold mt-4">
            SIGN IN
          </h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <SocialAuthButtons />
          <SocialAuthDivider />
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Core Configuration

Authentication is configured in `src/lib/auth.ts`. Here's the complete configuration with explanations:

```typescript
// src/lib/auth.ts
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Use Prisma for storing accounts and sessions metadata
  adapter: PrismaAdapter(prisma),

  // JWT sessions for stateless, edge-compatible auth
  session: { strategy: 'jwt' },

  // Custom pages for auth flows
  pages: {
    signIn: '/login',
    signUp: '/register',
    error: '/login', // Redirect errors to login page
  },

  providers: [
    // GitHub OAuth
    GitHub({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),

    // Google OAuth
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    // Email/Password credentials
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    // Add custom fields to JWT token
    jwt({ token, user, trigger, session }) {
      // Initial sign in - add user data to token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.organizationId = user.organizationId;
      }

      // Handle session updates (e.g., after org switch)
      if (trigger === 'update' && session) {
        token.organizationId = session.organizationId;
      }

      return token;
    },

    // Expose token data in session
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.organizationId = token.organizationId as string;
      }
      return session;
    },

    // Control which users can sign in
    signIn({ user, account }) {
      // Allow all OAuth sign-ins
      if (account?.provider !== 'credentials') {
        return true;
      }

      // For credentials, user is already verified in authorize()
      return !!user;
    },
  },
});
```

---

## Setting Up OAuth Providers

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: Your App Name
   - **Homepage URL**: `http://localhost:3000` (development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and generate a Client Secret

Add to `.env.local`:

```bash
GITHUB_CLIENT_ID=Ov23li...
GITHUB_CLIENT_SECRET=abc123...
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to APIs & Services → Credentials
4. Click "Create Credentials" → "OAuth client ID"
5. Configure the OAuth consent screen if prompted
6. Choose "Web application" as application type
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
8. Copy the Client ID and Client Secret

Add to `.env.local`:

```bash
GOOGLE_CLIENT_ID=123456789.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...
```

### Adding Discord OAuth

```typescript
// src/lib/auth.ts
import Discord from 'next-auth/providers/discord';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // ... existing providers
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
});
```

Add to `.env.local`:

```bash
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
```

---

## Protecting API Routes

Use the `auth()` function to protect API routes:

```typescript
// src/app/api/projects/route.ts
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// GET /api/projects - List user's projects
export async function GET() {
  const session = await auth();

  // Check authentication
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const projects = await prisma.project.findMany({
    where: { organizationId: session.user.organizationId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ projects });
}

// POST /api/projects - Create a new project
const createProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { name, description } = createProjectSchema.parse(body);

    const project = await prisma.project.create({
      data: {
        name,
        description,
        organizationId: session.user.organizationId,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: 400 }
      );
    }
    throw error;
  }
}
```

---

## Middleware Protection

Use middleware for protecting entire route groups:

```typescript
// middleware.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Define protected routes
  const protectedPaths = ['/dashboard', '/settings', '/billing', '/admin'];
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Redirect unauthenticated users to login
  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin-only routes
  if (pathname.startsWith('/admin') && req.auth?.user?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirect authenticated users away from auth pages
  const authPaths = ['/login', '/register'];
  if (authPaths.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/billing/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
};
```

---

## Role-Based Access Control

Fabrk includes a complete RBAC system with three default roles:

### Role Definitions

```prisma
// prisma/schema.prisma
enum Role {
  USER    // Default role, basic access
  ADMIN   // Administrative access
  OWNER   // Full access, can manage billing
}

model User {
  id    String @id @default(cuid())
  email String @unique
  role  Role   @default(USER)
  // ...
}
```

### Checking Roles in API Routes

```typescript
// src/app/api/admin/users/route.ts
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();

  // Must be authenticated
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Must be admin or owner
  if (!['admin', 'owner'].includes(session.user.role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return Response.json({ users });
}
```

### Role-Based UI Components

```tsx
// src/components/auth/role-gate.tsx
'use client';

import { useSession } from 'next-auth/react';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
}

export function RoleGate({ children, allowedRoles, fallback }: RoleGateProps) {
  const { data: session } = useSession();

  if (!session?.user) {
    return fallback || null;
  }

  if (!allowedRoles.includes(session.user.role)) {
    return fallback || null;
  }

  return <>{children}</>;
}

// Usage
<RoleGate allowedRoles={['admin', 'owner']}>
  <AdminPanel />
</RoleGate>
```

---

## Session Management

### Server Components

```tsx
// src/app/(platform)/dashboard/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <h1 className="font-mono text-2xl">
        WELCOME, {session.user.name?.toUpperCase()}
      </h1>
      <p className="text-muted-foreground">
        Role: {session.user.role}
      </p>
    </div>
  );
}
```

### Client Components

```tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function UserMenu() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-sm">
        {session.user.email}
      </span>
      <Button
        variant="outline"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        > SIGN OUT
      </Button>
    </div>
  );
}
```

### Updating Session Data

```tsx
'use client';

import { useSession } from 'next-auth/react';

export function OrganizationSwitcher() {
  const { update } = useSession();

  const switchOrganization = async (orgId: string) => {
    // Update the session with new organization
    await update({ organizationId: orgId });
  };

  return (
    // Organization switcher UI
  );
}
```

---

## Email/Password Registration

### Registration Flow

```typescript
// src/app/api/auth/register/route.ts
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = registerSchema.parse(body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Create default organization for user
    const org = await prisma.organization.create({
      data: {
        name: `${name}'s Workspace`,
        slug: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        members: {
          create: {
            userId: user.id,
            role: 'OWNER',
          },
        },
      },
    });

    return Response.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.issues }, { status: 400 });
    }
    console.error('Registration error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Security Best Practices

### 1. Environment Variables

Never expose secrets to the client:

```bash
# Server-only (no NEXT_PUBLIC_ prefix)
NEXTAUTH_SECRET=your-32-character-secret-here
GITHUB_CLIENT_SECRET=...

# Safe for client
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 2. CSRF Protection

NextAuth v5 includes automatic CSRF protection. The token is verified on all state-changing requests.

### 3. Rate Limiting

Add rate limiting to auth endpoints:

```typescript
// src/middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requests per minute
});

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    const ip = request.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return Response.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }
  }
  // ... rest of middleware
}
```

### 4. Password Requirements

Enforce strong passwords:

```typescript
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain uppercase letter')
  .regex(/[a-z]/, 'Password must contain lowercase letter')
  .regex(/[0-9]/, 'Password must contain a number');
```

---

## Troubleshooting

### "NEXTAUTH_SECRET is not set"

Generate a secret and add to `.env.local`:

```bash
openssl rand -base64 32
```

### OAuth Callback Errors

Verify your callback URLs match exactly:
- Development: `http://localhost:3000/api/auth/callback/[provider]`
- Production: `https://yourdomain.com/api/auth/callback/[provider]`

### Session Not Persisting

Check that:
1. `NEXTAUTH_URL` matches your actual URL
2. Cookies are not being blocked
3. You're using the same domain for API and frontend

### "Unable to verify CSRF token"

Clear browser cookies and try again. This often happens after changing `NEXTAUTH_SECRET`.

---

## Next Steps

1. **Configure OAuth providers** - Add your provider credentials to `.env.local`
2. **Customize user schema** - Add fields to the User model in Prisma
3. **Set up email verification** - Use Resend for verification emails
4. **Add 2FA** - Implement TOTP-based two-factor authentication
5. **Audit logging** - Track authentication events for security

Authentication is the foundation. Build on it with confidence.
