---
title: 'Route Groups: Organizing Your Next.js App'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'route-groups-app-architecture'
description: 'How Fabrk uses Next.js route groups to organize public pages, authenticated app, auth flows, and API routes.'
publishedAt: '2026-01-14T10:00:00.000Z'
---

**Clean architecture through route organization.**

---

## Route Groups

Next.js route groups organize pages without affecting URLs:

```
src/app/
├── (public)/        # Public pages (no auth required)
├── (platform)/      # Authenticated app
├── (auth)/          # Auth pages
└── api/             # API routes
```

The parentheses create groups without adding URL segments.

---

## Public Routes

`(public)/` contains marketing and public pages:

```
src/app/(public)/
├── page.tsx         # Landing page (/)
├── pricing/
│   └── page.tsx     # Pricing (/pricing)
├── blog/
│   ├── page.tsx     # Blog list (/blog)
│   └── [slug]/
│       └── page.tsx # Blog post (/blog/slug)
├── features/
│   └── page.tsx     # Features (/features)
└── layout.tsx       # Public layout (header, footer)
```

---

## Platform Routes

`(platform)/` contains the authenticated application:

```
src/app/(platform)/
├── dashboard/
│   └── page.tsx     # Dashboard (/dashboard)
├── settings/
│   ├── page.tsx     # Settings (/settings)
│   ├── profile/
│   │   └── page.tsx # Profile (/settings/profile)
│   ├── billing/
│   │   └── page.tsx # Billing (/settings/billing)
│   └── team/
│       └── page.tsx # Team (/settings/team)
├── projects/
│   ├── page.tsx     # Projects list (/projects)
│   └── [id]/
│       └── page.tsx # Project detail (/projects/123)
└── layout.tsx       # App layout (sidebar, nav)
```

---

## Auth Routes

`(auth)/` contains authentication pages:

```
src/app/(auth)/
├── login/
│   └── page.tsx     # Login (/login)
├── register/
│   └── page.tsx     # Register (/register)
├── forgot-password/
│   └── page.tsx     # Forgot password
├── reset-password/
│   └── page.tsx     # Reset password
└── layout.tsx       # Auth layout (centered card)
```

---

## API Routes

`api/` contains all backend endpoints:

```
src/app/api/
├── auth/
│   └── [...nextauth]/
│       └── route.ts # NextAuth handler
├── stripe/
│   ├── checkout/
│   │   └── route.ts # Stripe checkout
│   └── webhook/
│       └── route.ts # Stripe webhooks
├── users/
│   └── route.ts     # User CRUD
└── projects/
    └── route.ts     # Project CRUD
```

---

## Route Group Layouts

Each group has its own layout:

### Public Layout

```tsx
// (public)/layout.tsx
export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

### Platform Layout

```tsx
// (platform)/layout.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function PlatformLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

### Auth Layout

```tsx
// (auth)/layout.tsx
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
```

---

## Benefits

### 1. Separation of Concerns

Each route group has a clear purpose:
- `(public)` - Anyone can access
- `(platform)` - Must be logged in
- `(auth)` - Login/register flows

### 2. Different Layouts

Each group can have unique:
- Navigation
- Styling
- Loading states
- Error handling

### 3. Clean URLs

Groups don't appear in URLs:
- `/dashboard` not `/(platform)/dashboard`
- `/blog` not `/(public)/blog`

### 4. Middleware Targeting

Apply middleware to specific groups:

```typescript
// middleware.ts
export const config = {
  matcher: [
    // Only protect platform routes
    '/(platform)/:path*',
  ],
};
```

---

## Shared Components

Components shared across groups live in `src/components/`:

```
src/components/
├── ui/              # UI primitives (all groups)
├── marketing/       # (public) specific
├── dashboard/       # (platform) specific
└── auth/            # (auth) specific
```

---

## Nested Layouts

Layouts can be nested:

```
(platform)/
├── layout.tsx       # Main app layout
├── settings/
│   ├── layout.tsx   # Settings layout (tabs)
│   ├── page.tsx     # General settings
│   ├── profile/
│   │   └── page.tsx
│   └── billing/
│       └── page.tsx
```

The settings pages get both the platform layout AND the settings layout.

---

## Loading States

Each group can have loading UI:

```tsx
// (platform)/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <Spinner />
    </div>
  );
}
```

---

## Error Handling

Each group can have error boundaries:

```tsx
// (platform)/error.tsx
'use client';

export default function Error({ error, reset }) {
  return (
    <Card className="p-6 text-center">
      <h2 className="text-destructive">Something went wrong</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <Button onClick={reset}>> TRY AGAIN</Button>
    </Card>
  );
}
```

---

## Not Found Pages

Custom 404 per group:

```tsx
// (platform)/not-found.tsx
export default function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-4xl">404</h1>
      <p>Page not found in dashboard</p>
      <Link href="/dashboard">> BACK TO DASHBOARD</Link>
    </div>
  );
}
```

---

## Parallel Routes

For complex layouts with multiple views:

```
(platform)/
└── dashboard/
    ├── page.tsx         # Main content
    ├── @sidebar/
    │   └── page.tsx     # Sidebar content
    └── @modal/
        └── page.tsx     # Modal content
```

---

## Intercepting Routes

For modal patterns:

```
(platform)/
├── projects/
│   └── page.tsx         # Projects list
├── (..)projects/[id]/
│   └── page.tsx         # Project modal
```

Clicking a project shows a modal. Direct URL shows full page.

---

## Best Practices

1. **Use route groups** - Organize by access level
2. **Keep layouts minimal** - Only shared UI
3. **Colocate components** - Near where they're used
4. **Use middleware wisely** - Protect entire groups
5. **Document structure** - Especially for teams

Clean architecture through routes.

