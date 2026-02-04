---
title: 'Prisma 7: Modern Database Patterns for SaaS'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'prisma-7-database-patterns'
description: 'How Fabrk uses Prisma 7 with PostgreSQL for type-safe database access. Includes multi-tenancy, soft deletes, and common SaaS patterns.'
publishedAt: '2026-01-27T10:00:00.000Z'
---

**Type-safe database access with Prisma 7.**

---

## Why Prisma?

Prisma provides:

- Type-safe queries with autocomplete
- Automatic migrations
- Visual database browser (Prisma Studio)
- Excellent PostgreSQL support

Fabrk uses Prisma 7, the latest version with improved performance.

---

## Schema Overview

Fabrk includes a complete SaaS schema:

```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  accounts      Account[]
  sessions      Session[]
  organizations OrganizationMember[]
  subscriptions Subscription[]
}

model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())

  members   OrganizationMember[]
}

model Subscription {
  id                 String   @id @default(cuid())
  userId             String
  provider           String
  providerCustomerId String
  status             String
  priceId            String
  currentPeriodEnd   DateTime

  user User @relation(fields: [userId], references: [id])
}
```

---

## Database Commands

```bash
# Push schema changes (development)
npm run db:push

# Open visual database browser
npm run db:studio

# Seed test data
npm run db:seed

# Reset database (destructive)
npm run db:reset
```

---

## Type-Safe Queries

Prisma generates types from your schema:

```typescript
import { prisma } from '@/lib/prisma';

// Fully typed - TypeScript knows the shape
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
  include: { subscriptions: true },
});

// user.subscriptions is typed as Subscription[]
```

---

## Common Patterns

### Find or Create

```typescript
const user = await prisma.user.upsert({
  where: { email: 'user@example.com' },
  update: { name: 'Updated Name' },
  create: {
    email: 'user@example.com',
    name: 'New User',
  },
});
```

### Pagination

```typescript
const users = await prisma.user.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { createdAt: 'desc' },
});

const total = await prisma.user.count();
```

### Transactions

```typescript
const [user, org] = await prisma.$transaction([
  prisma.user.create({ data: userData }),
  prisma.organization.create({ data: orgData }),
]);
```

---

## Multi-Tenancy

Fabrk supports organization-based multi-tenancy:

```typescript
// Get user's organization
const membership = await prisma.organizationMember.findFirst({
  where: {
    userId: session.user.id,
    role: { in: ['OWNER', 'ADMIN', 'MEMBER'] },
  },
  include: { organization: true },
});

// Scope queries to organization
const projects = await prisma.project.findMany({
  where: { organizationId: membership.organization.id },
});
```

---

## Soft Deletes

Track deletions without losing data:

```prisma
model Project {
  id        String    @id @default(cuid())
  name      String
  deletedAt DateTime?  // Soft delete marker

  @@index([deletedAt])
}
```

```typescript
// "Delete" by setting timestamp
await prisma.project.update({
  where: { id },
  data: { deletedAt: new Date() },
});

// Query excludes deleted
const projects = await prisma.project.findMany({
  where: { deletedAt: null },
});
```

---

## Enums

Use enums for type-safe status fields:

```prisma
enum Role {
  USER
  ADMIN
  OWNER
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  PAST_DUE
  TRIALING
}
```

```typescript
// TypeScript enforces valid values
await prisma.user.update({
  where: { id },
  data: { role: 'ADMIN' }, // Must be Role enum value
});
```

---

## Indexes

Add indexes for query performance:

```prisma
model User {
  id    String @id
  email String @unique
  orgId String

  @@index([orgId])        // Single column
  @@index([orgId, email]) // Composite
}
```

---

## Relations

Define clear relationships:

```prisma
model Organization {
  id      String @id
  members OrganizationMember[]
}

model OrganizationMember {
  id             String       @id
  userId         String
  organizationId String
  role           MemberRole

  user         User         @relation(fields: [userId], references: [id])
  organization Organization @relation(fields: [organizationId], references: [id])

  @@unique([userId, organizationId])
}
```

---

## Seeding

Fabrk includes a seed script:

```typescript
// prisma/seed.ts
import { prisma } from '@/lib/prisma';

async function main() {
  // Create test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      role: 'ADMIN',
    },
  });

  // Create organization
  await prisma.organization.create({
    data: {
      name: 'Test Org',
      slug: 'test-org',
      members: {
        create: {
          userId: user.id,
          role: 'OWNER',
        },
      },
    },
  });
}

main();
```

Run with `npm run db:seed`.

---

## Prisma Studio

Visual database browser:

```bash
npm run db:studio
```

Opens at `http://localhost:5555`:

- Browse all tables
- Edit records directly
- Run ad-hoc queries
- Export data

---

## Performance Tips

1. **Use `select`** - Only fetch needed fields
2. **Use `include` sparingly** - N+1 queries add up
3. **Add indexes** - For frequently filtered columns
4. **Use `findMany` with `take`** - Limit result sets
5. **Use transactions** - For related operations

---

## Getting Started

1. Update `DATABASE_URL` in `.env.local`
2. Run `npm run db:push` to create tables
3. Run `npm run db:seed` for test data
4. Import `prisma` from `@/lib/prisma`
5. Write type-safe queries

Database access, simplified.

