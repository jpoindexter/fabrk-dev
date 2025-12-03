# NextAuth.js v5 (Auth.js) Documentation

This document explains the decision to use NextAuth.js v5 (Auth.js) and provides guidance for working with it.

## Why v5 Beta?

Fabrk uses **NextAuth.js v5** (also known as Auth.js) instead of the stable v4.x. Here's why:

### Key Benefits of v5

1. **Native App Router Support**
   - Built specifically for Next.js 13+ App Router
   - Server Components compatibility
   - Edge Runtime support

2. **Simplified Configuration**
   - Single `auth.ts` configuration file
   - No need for separate API route handlers
   - Cleaner middleware integration

3. **Improved TypeScript Support**
   - Better type inference
   - Stricter typing for callbacks
   - Module augmentation for session types

4. **Enhanced Security**
   - CSRF protection improvements
   - Better token handling
   - Secure cookie defaults

### Current Status

- **Version**: `5.0.0-beta.29` (as of last update)
- **Stability**: Production-ready for most use cases
- **Breaking Changes**: Expected minimal before stable release

## Configuration Reference

### Main Configuration (`src/lib/auth.ts`)

```typescript
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      // ... credentials config
    }),
  ],
});
```

### Middleware Integration (`src/middleware.ts`)

```typescript
export { auth as middleware } from '@/lib/auth';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### Getting Session in Server Components

```typescript
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return <div>Hello {session.user.name}</div>;
}
```

### Getting Session in API Routes

```typescript
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ user: session.user });
}
```

### Client-Side Session Access

```typescript
'use client';

import { useSession } from 'next-auth/react';

export function ProfileButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <LoginButton />;

  return <div>{session.user?.name}</div>;
}
```

## Migration from v4 to v5

If you're migrating from v4, here are the key changes:

### Breaking Changes

1. **Import Changes**
   ```typescript
   // v4
   import { getServerSession } from 'next-auth/next';
   import { authOptions } from '@/lib/auth';
   const session = await getServerSession(authOptions);

   // v5
   import { auth } from '@/lib/auth';
   const session = await auth();
   ```

2. **API Route Handlers**
   ```typescript
   // v4 - pages/api/auth/[...nextauth].ts
   export default NextAuth(authOptions);

   // v5 - app/api/auth/[...nextauth]/route.ts
   export { GET, POST } from '@/lib/auth';
   ```

3. **Session Callback Types**
   ```typescript
   // v5 has stricter types
   callbacks: {
     session: ({ session, token }) => {
       // Must return the full session object
       return {
         ...session,
         user: {
           ...session.user,
           id: token.sub!,
         },
       };
     },
   },
   ```

### When to Migrate

- **New Projects**: Use v5 directly
- **Existing v4 Projects**: Wait for stable v5 release unless you need specific v5 features

## Upgrading

When v5 stable is released:

1. Check the [Auth.js Migration Guide](https://authjs.dev/getting-started/migrating-to-v5)
2. Update package: `npm install next-auth@latest`
3. Test all authentication flows
4. Update any deprecated APIs

## Monitoring for Stable Release

Track the stable release:
- [Auth.js GitHub Releases](https://github.com/nextauthjs/next-auth/releases)
- [Auth.js Blog](https://authjs.dev/blog)

## Known Issues and Workarounds

### Issue: Session not updating immediately after sign in
**Workaround**: Use `update()` from `useSession()` hook

### Issue: Edge runtime compatibility
**Workaround**: Use JWT strategy (default in v5) instead of database sessions

### Issue: Type errors in callbacks
**Workaround**: Ensure module augmentation is properly set up in `types/next-auth.d.ts`

## Security Considerations

1. **AUTH_SECRET**: Must be at least 32 characters. Generate with:
   ```bash
   openssl rand -base64 32
   ```

2. **CSRF Protection**: Enabled by default in v5

3. **Secure Cookies**: Automatic in production (HTTPS)

4. **Session Strategy**: JWT by default (stateless, Edge-compatible)

## Related Documentation

- [Auth.js Documentation](https://authjs.dev)
- [NextAuth.js GitHub](https://github.com/nextauthjs/next-auth)
- [Secret Rotation Guide](./SECRET-ROTATION.md)
