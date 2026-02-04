---
title: 'Getting Started with Fabrk: The Complete Setup Guide'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'getting-started-fabrk'
description: 'A comprehensive guide to setting up Fabrk for your SaaS project. Covers environment setup, database configuration, authentication, payments, and your first deployment.'
publishedAt: '2026-01-29T10:00:00.000Z'
---

This guide walks you through setting up Fabrk from scratch. By the end, you'll have a fully functional SaaS application running locally and ready for deployment.

---

## Prerequisites

Before starting, ensure your development environment meets these requirements:

**Required Software:**
- **Node.js 22+** - Fabrk uses modern JavaScript features that require Node 22. Check your version with `node --version`.
- **PostgreSQL 15+** - Either installed locally or use a cloud provider (Vercel Postgres, Supabase, Neon, or Railway).
- **npm 10+** - Comes with Node.js 22. Check with `npm --version`.
- **Git** - For version control and deployment.

**Optional but Recommended:**
- **VS Code** with the ESLint and Prettier extensions
- **Docker** for local PostgreSQL (if you prefer containers)
- **Vercel CLI** for deployment previews

---

## Step 1: Clone and Initial Setup

Start by cloning the repository and installing dependencies:

```bash
git clone https://github.com/fabrk/fabrk-dev.git my-saas
cd my-saas
npm install
```

This installs all dependencies including:
- Next.js 16 with App Router
- Prisma 7 for database access
- NextAuth v5 for authentication
- Tailwind CSS 4 for styling
- All 62+ UI components

**Tip:** If you see peer dependency warnings, they're usually safe to ignore. Fabrk is tested with specific versions that work together.

---

## Step 2: Database Setup

Fabrk uses PostgreSQL. You have several options:

### Option A: Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create a new database
createdb my_saas_dev

# Your connection string will be:
# postgresql://username:password@localhost:5432/my_saas_dev
```

### Option B: Docker (Recommended for Development)

Create a `docker-compose.yml` in your project root:

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: my_saas_dev
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Then run:

```bash
docker-compose up -d
```

Your connection string: `postgresql://postgres:postgres@localhost:5432/my_saas_dev`

### Option C: Cloud Database (Vercel Postgres)

For production or if you prefer cloud:

1. Go to your Vercel dashboard
2. Navigate to Storage → Create Database → Postgres
3. Copy the connection string from the dashboard

**Important:** Cloud databases require SSL. Add `?sslmode=require` to your connection string.

---

## Step 3: Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Open `.env.local` and configure these essential variables:

```bash
# ===========================================
# DATABASE
# ===========================================
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/my_saas_dev"

# ===========================================
# AUTHENTICATION
# ===========================================
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-32-character-secret-here"

# Must match your development URL exactly
NEXTAUTH_URL="http://localhost:3000"

# ===========================================
# APPLICATION
# ===========================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="My SaaS"
```

**Security Note:** Never commit `.env.local` to version control. It's already in `.gitignore`, but double-check before pushing.

### Understanding Environment Validation

Fabrk validates all environment variables at build time using Zod. If you're missing a required variable, you'll see a clear error message:

```
Error: Environment validation failed

  DATABASE_URL: Required
  NEXTAUTH_SECRET: String must contain at least 32 character(s)
```

This prevents deploying with missing configuration.

---

## Step 4: Initialize the Database

Push the Prisma schema to your database:

```bash
npm run db:push
```

This creates all necessary tables:
- `User` - User accounts
- `Account` - OAuth connections
- `Session` - Active sessions
- `Organization` - Team workspaces
- `OrganizationMember` - Team memberships
- `Subscription` - Payment subscriptions
- And more...

To view your database visually:

```bash
npm run db:studio
```

This opens Prisma Studio at `http://localhost:5555` where you can browse and edit data.

### Optional: Seed Test Data

For development, seed the database with sample data:

```bash
npm run db:seed
```

This creates:
- A test user (test@example.com / password123)
- Sample organizations
- Example subscriptions

---

## Step 5: Start Development

Launch the development server:

```bash
npm run dev
```

Your application is now running at `http://localhost:3000`.

**What you'll see:**
- Landing page with terminal-styled design
- Login/Register pages
- Dashboard (after authentication)
- Settings pages

The dev server includes:
- Hot Module Replacement (HMR) for instant updates
- TypeScript type checking
- ESLint linting
- Automatic port conflict resolution

---

## Project Structure Deep Dive

Understanding the structure helps you navigate and extend Fabrk:

```
my-saas/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Public pages (no auth required)
│   │   │   ├── page.tsx       # Landing page (/)
│   │   │   ├── pricing/       # Pricing page
│   │   │   ├── blog/          # Blog pages
│   │   │   └── layout.tsx     # Public layout (header/footer)
│   │   │
│   │   ├── (platform)/        # Authenticated app
│   │   │   ├── dashboard/     # Main dashboard
│   │   │   ├── settings/      # User settings
│   │   │   └── layout.tsx     # App layout (sidebar)
│   │   │
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   ├── register/      # Registration
│   │   │   └── layout.tsx     # Centered auth layout
│   │   │
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth handlers
│   │   │   ├── stripe/        # Payment webhooks
│   │   │   └── users/         # User API
│   │   │
│   │   ├── globals.css        # Global styles + themes
│   │   └── layout.tsx         # Root layout
│   │
│   ├── components/
│   │   ├── ui/                # 62 UI primitives
│   │   ├── charts/            # 8 chart components
│   │   ├── auth/              # Auth forms
│   │   ├── dashboard/         # Dashboard components
│   │   └── marketing/         # Landing page sections
│   │
│   ├── lib/                   # Business logic
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Database client
│   │   ├── env/               # Environment validation
│   │   └── utils.ts           # Utility functions
│   │
│   ├── design-system/         # Theme tokens
│   │   └── index.ts           # mode object export
│   │
│   └── hooks/                 # Custom React hooks
│
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed script
│
├── public/                    # Static assets
├── docs/                      # Documentation
└── .ai/                       # AI development context
```

### Route Groups Explained

The parentheses in folder names create "route groups":

- `(public)` - Pages without authentication (landing, pricing, blog)
- `(platform)` - Requires authentication (dashboard, settings)
- `(auth)` - Auth flow pages (login, register)

Route groups share layouts without affecting URLs:
- `/(public)/pricing` → `/pricing`
- `/(platform)/dashboard` → `/dashboard`

---

## Adding Your First Feature

Let's add a simple "Projects" feature to understand the patterns:

### 1. Create the Database Model

Add to `prisma/schema.prisma`:

```prisma
model Project {
  id             String   @id @default(cuid())
  name           String
  description    String?
  organizationId String
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id])
}
```

Push the changes:

```bash
npm run db:push
```

### 2. Create the API Route

```typescript
// src/app/api/projects/route.ts
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { organizationId: session.user.organizationId },
    orderBy: { createdAt: 'desc' },
  });

  return Response.json({ projects });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const result = createProjectSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { error: result.error.issues },
      { status: 400 }
    );
  }

  const project = await prisma.project.create({
    data: {
      ...result.data,
      organizationId: session.user.organizationId,
    },
  });

  return Response.json({ project }, { status: 201 });
}
```

### 3. Create the Page

```tsx
// src/app/(platform)/projects/page.tsx
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export default async function ProjectsPage() {
  const session = await auth();
  if (!session) redirect('/login');

  const projects = await prisma.project.findMany({
    where: { organizationId: session.user.organizationId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-mono text-2xl font-semibold">PROJECTS</h1>
        <Button>> NEW PROJECT</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className={cn('border border-border', mode.radius)}>
            <CardHeader>
              <span className="text-muted-foreground font-mono text-xs">
                [ PROJECT ]
              </span>
            </CardHeader>
            <CardContent>
              <h3 className="font-mono font-medium">{project.name}</h3>
              {project.description && (
                <p className="text-muted-foreground text-sm mt-2">
                  {project.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

---

## Common Commands Reference

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Production build
npm run start            # Start production server
npm run type-check       # TypeScript validation

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed test data
npm run db:reset         # Reset and reseed (destructive!)

# Code Quality
npm run lint             # Run ESLint
npm run format           # Run Prettier
npm run design:lint      # Check design system compliance

# Testing
npm test                 # Run unit tests
npm run test:e2e         # Run Playwright tests
npm run test:a11y        # Accessibility tests

# Deployment
npm run build            # Build for production
vercel                   # Deploy to Vercel (requires CLI)
```

---

## Troubleshooting Common Issues

### Port 3000 Already in Use

Fabrk's dev script automatically kills processes on port 3000. If it still fails:

```bash
lsof -i :3000
kill -9 <PID>
```

### Prisma Client Out of Sync

If you see type errors after schema changes:

```bash
npx prisma generate
npm run type-check
```

### Database Connection Failed

Check your `DATABASE_URL`:
- Local: Ensure PostgreSQL is running
- Docker: Ensure container is up (`docker-compose ps`)
- Cloud: Verify SSL mode (`?sslmode=require`)

### Build Fails with Module Errors

Clear the cache and rebuild:

```bash
rm -rf .next node_modules/.cache
npm run build
```

---

## Next Steps

Now that you have Fabrk running:

1. **Configure Authentication** - Add OAuth providers (GitHub, Google) in your `.env.local`
2. **Set Up Payments** - Configure Stripe, Polar, or Lemonsqueezy
3. **Customize the Theme** - Choose from 18 themes or create your own
4. **Explore Components** - Browse the 62+ UI components in `src/components/ui/`
5. **Deploy** - Push to GitHub and deploy on Vercel

Check out the other guides in this blog for detailed walkthroughs of each feature.
