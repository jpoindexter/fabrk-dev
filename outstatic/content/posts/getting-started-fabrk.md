---
title: 'Getting Started with Fabrk: From Clone to Launch'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'getting-started-fabrk'
description: 'A step-by-step guide to launching your SaaS with Fabrk. From cloning the repository to deploying on Vercel in under 30 minutes.'
publishedAt: '2026-01-29T10:00:00.000Z'
---

**From zero to deployed SaaS. Here's how.**

---

## Prerequisites

Before starting, ensure you have:

- Node.js 22+
- PostgreSQL 15+ (or use Vercel Postgres)
- npm 10+
- Git

---

## Step 1: Clone and Install

```bash
git clone https://github.com/fabrk/fabrk-dev.git my-saas
cd my-saas
npm install
```

---

## Step 2: Run the Setup Wizard

Fabrk includes an interactive setup wizard:

```bash
npm run setup
```

The wizard walks you through:

1. **Database** - Configure PostgreSQL connection
2. **Authentication** - Set up NextAuth providers
3. **Payments** - Choose Stripe, Polar, or Lemonsqueezy
4. **Email** - Configure Resend for transactional email
5. **Theme** - Choose from 18 terminal themes

Preview changes without modifying files:

```bash
npm run setup -- --dry-run
```

---

## Step 3: Configure Environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

Required variables:

```bash
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Generate a secure secret:

```bash
openssl rand -base64 32
```

---

## Step 4: Initialize Database

Push the Prisma schema to your database:

```bash
npm run db:push
```

Optionally seed with test data:

```bash
npm run db:seed
```

---

## Step 5: Start Development

```bash
npm run dev
```

Your SaaS is now running at `http://localhost:3000`.

---

## Project Structure

```
src/
├── app/
│   ├── (public)/      # Landing, pricing, blog
│   ├── (platform)/    # Dashboard, settings
│   ├── (auth)/        # Login, register
│   └── api/           # API routes
├── components/
│   ├── ui/            # 62 UI primitives
│   ├── charts/        # 8 chart components
│   └── [feature]/     # Feature components
├── lib/               # Business logic
└── config/            # Configuration
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/config/index.ts` | Central configuration |
| `src/lib/auth.ts` | Authentication setup |
| `src/lib/env/index.ts` | Environment validation |
| `src/design-system/index.ts` | Theme tokens |
| `prisma/schema.prisma` | Database schema |

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run type-check   # TypeScript validation

# Database
npm run db:push      # Push schema changes
npm run db:studio    # Visual database editor
npm run db:reset     # Reset and reseed

# Testing
npm test             # Unit tests
npm run test:e2e     # End-to-end tests
```

---

## Adding Features

### New Page

Create a file in `src/app/`:

```tsx
// src/app/(public)/features/page.tsx
export default function FeaturesPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="font-mono text-4xl">FEATURES</h1>
    </div>
  );
}
```

### New API Route

Create a route handler:

```tsx
// src/app/api/example/route.ts
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return Response.json({ data: 'Hello!' });
}
```

### New Component

Create in the appropriate directory:

```tsx
// src/components/dashboard/stats-card.tsx
import { Card } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function StatsCard({ title, value }) {
  return (
    <Card className={cn('p-4', mode.radius)}>
      <span className="text-muted-foreground font-mono text-xs">
        [ {title} ]
      </span>
      <p className="font-mono text-2xl">{value}</p>
    </Card>
  );
}
```

---

## Deploying to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Required Vercel environment variables:

```bash
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
NEXT_PUBLIC_APP_URL
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev` auto-kills it |
| Prisma out of sync | Run `npm run db:push` |
| TypeScript errors | Run `npx prisma generate` |
| Build fails | Run `rm -rf .next && npm run build` |

---

## Next Steps

1. Customize your theme in `src/app/globals.css`
2. Add your OAuth credentials for GitHub/Google auth
3. Configure your payment provider
4. Build your features using the 62+ components
5. Deploy to Vercel

---

## Resources

- `docs/` - Full documentation
- `.ai/CONTEXT.md` - AI-native design context
- `CLAUDE.md` - AI development instructions

Welcome to Fabrk. Ship fast.

