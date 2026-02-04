---
title: 'Prisma 7: Modern Database Patterns for SaaS'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'prisma-7-database-patterns'
description: 'How Fabrk uses Prisma 7 with PostgreSQL for type-safe database access. Includes multi-tenancy, soft deletes, and common SaaS patterns.'
publishedAt: '2026-01-27T10:00:00.000Z'
---

Prisma 7 provides the type-safe database layer that every SaaS needs. With automatic TypeScript types, visual database browsing, and excellent PostgreSQL support, it eliminates the impedance mismatch between your code and your data. Fabrk includes Prisma 7 pre-configured with production-ready patterns.

---

## Why Prisma for SaaS?

**Type-Safe Queries**
Every query is validated at compile time. TypeScript knows the exact shape of your data, providing autocomplete and catching errors before runtime.

**Automatic Migrations**
Schema changes generate migration files automatically. Deploy with confidence knowing your schema matches your code.

**Visual Database Browser**
Prisma Studio lets you browse, edit, and query data without writing SQL. Perfect for debugging and development.

**Excellent PostgreSQL Support**
Prisma 7 leverages PostgreSQL's advanced features: JSON columns, full-text search, array types, and more.

---

## Database Commands

```bash
# Push schema changes to database (development)
npm run db:push

# Open visual database browser
npm run db:studio

# Seed database with test data
npm run db:seed

# Reset database and reseed (destructive!)
npm run db:reset

# Generate Prisma Client (after schema changes)
npx prisma generate

# Create a migration (for production deployments)
npx prisma migrate dev --name description_of_change

# Apply migrations in production
npx prisma migrate deploy
```

---

## Core Schema Overview

Fabrk includes a complete SaaS schema:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// USER & AUTHENTICATION
// ============================================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String?   // Null for OAuth-only users
  image         String?
  role          Role      @default(USER)
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Auth relations
  accounts Account[]
  sessions Session[]

  // Business relations
  organizations OrganizationMember[]
  subscriptions Subscription[]
  apiKeys       ApiKey[]

  @@index([email])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

// ============================================
// ORGANIZATIONS (MULTI-TENANCY)
// ============================================

model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  members       OrganizationMember[]
  invitations   OrganizationInvitation[]
  subscriptions Subscription[]
  apiKeys       ApiKey[]
  webhooks      Webhook[]

  @@index([slug])
}

model OrganizationMember {
  id             String     @id @default(cuid())
  userId         String
  organizationId String
  role           MemberRole @default(MEMBER)
  createdAt      DateTime   @default(now())

  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@unique([userId, organizationId])
  @@index([organizationId])
}

model OrganizationInvitation {
  id             String     @id @default(cuid())
  email          String
  organizationId String
  role           MemberRole @default(MEMBER)
  token          String     @unique
  expiresAt      DateTime
  createdAt      DateTime   @default(now())

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@index([organizationId])
  @@index([token])
}

// ============================================
// BILLING & SUBSCRIPTIONS
// ============================================

model Subscription {
  id                 String   @id
  userId             String?
  organizationId     String?
  provider           String   // 'stripe', 'polar', 'lemonsqueezy'
  providerCustomerId String
  status             String
  priceId            String
  currentPeriodEnd   DateTime
  cancelAtPeriodEnd  Boolean  @default(false)
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  user         User?         @relation(fields: [userId], references: [id])
  organization Organization? @relation(fields: [organizationId], references: [id])

  @@index([userId])
  @@index([organizationId])
  @@index([provider, providerCustomerId])
}

// ============================================
// DEVELOPER FEATURES
// ============================================

model ApiKey {
  id             String    @id @default(cuid())
  name           String
  keyHash        String    @unique // Never store raw keys
  keyPrefix      String    // First 8 chars for identification
  userId         String
  organizationId String
  scopes         String[]  // Array of permitted scopes
  expiresAt      DateTime?
  lastUsedAt     DateTime?
  createdAt      DateTime  @default(now())

  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@index([keyHash])
  @@index([organizationId])
}

model Webhook {
  id             String   @id @default(cuid())
  url            String
  events         String[] // Array of subscribed events
  secret         String
  organizationId String
  enabled        Boolean  @default(true)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  organization     Organization      @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  deliveryAttempts WebhookDelivery[]

  @@index([organizationId])
}

model WebhookDelivery {
  id         String   @id @default(cuid())
  webhookId  String
  event      String
  payload    Json
  statusCode Int?
  response   String?  @db.Text
  success    Boolean
  attempts   Int      @default(1)
  createdAt  DateTime @default(now())

  webhook Webhook @relation(fields: [webhookId], references: [id], onDelete: Cascade)

  @@index([webhookId])
  @@index([createdAt])
}

// ============================================
// ENUMS
// ============================================

enum Role {
  USER
  ADMIN
  OWNER
}

enum MemberRole {
  OWNER
  ADMIN
  MEMBER
}
```

---

## Type-Safe Queries

Prisma generates TypeScript types from your schema:

```typescript
import { prisma } from '@/lib/prisma';

// TypeScript knows the exact shape of user
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
  include: {
    subscriptions: true,
    organizations: {
      include: { organization: true },
    },
  },
});

// Autocomplete for all fields
user?.name;           // string | null
user?.role;           // 'USER' | 'ADMIN' | 'OWNER'
user?.subscriptions;  // Subscription[]
user?.organizations;  // (OrganizationMember & { organization: Organization })[]
```

---

## Common Query Patterns

### Find or Create (Upsert)

```typescript
// Create user if doesn't exist, update if does
const user = await prisma.user.upsert({
  where: { email: 'user@example.com' },
  update: {
    name: 'Updated Name',
    updatedAt: new Date(),
  },
  create: {
    email: 'user@example.com',
    name: 'New User',
  },
});
```

### Pagination with Total Count

```typescript
async function getUsers(page: number, pageSize: number = 20) {
  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    total,
    pages: Math.ceil(total / pageSize),
    hasMore: page * pageSize < total,
  };
}
```

### Filtering with Complex Conditions

```typescript
// Find active subscriptions expiring in the next 7 days
const expiringSubscriptions = await prisma.subscription.findMany({
  where: {
    status: 'active',
    currentPeriodEnd: {
      gte: new Date(),
      lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    cancelAtPeriodEnd: false,
  },
  include: {
    user: {
      select: { email: true, name: true },
    },
  },
});
```

### Aggregate Queries

```typescript
// Get subscription statistics
const stats = await prisma.subscription.groupBy({
  by: ['status'],
  _count: { id: true },
});

// Result: [{ status: 'active', _count: { id: 150 } }, ...]

// Calculate MRR
const mrr = await prisma.subscription.aggregate({
  where: { status: 'active' },
  _sum: { monthlyAmount: true },
});
```

---

## Multi-Tenancy Pattern

Fabrk implements organization-based multi-tenancy:

### Getting User's Current Organization

```typescript
// src/lib/organization.ts
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function getCurrentOrganization() {
  const session = await auth();
  if (!session?.user) return null;

  const membership = await prisma.organizationMember.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
    orderBy: { createdAt: 'asc' }, // First org joined
  });

  return membership?.organization || null;
}
```

### Scoping Queries to Organization

```typescript
// Always scope data queries to the user's organization
export async function getProjects() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  const org = await getCurrentOrganization();
  if (!org) throw new Error('No organization');

  return prisma.project.findMany({
    where: { organizationId: org.id },
    orderBy: { createdAt: 'desc' },
  });
}
```

### Creating Organization with Owner

```typescript
async function createOrganization(userId: string, name: string) {
  return prisma.organization.create({
    data: {
      name,
      slug: generateSlug(name),
      members: {
        create: {
          userId,
          role: 'OWNER',
        },
      },
    },
    include: {
      members: {
        include: { user: true },
      },
    },
  });
}
```

---

## Soft Deletes Pattern

Track deletions without losing data:

### Schema Setup

```prisma
model Project {
  id             String    @id @default(cuid())
  name           String
  organizationId String
  deletedAt      DateTime? // Null = not deleted
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id])

  @@index([organizationId, deletedAt])
}
```

### Soft Delete Implementation

```typescript
// "Delete" by setting timestamp
async function softDeleteProject(id: string) {
  return prisma.project.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

// Restore a soft-deleted item
async function restoreProject(id: string) {
  return prisma.project.update({
    where: { id },
    data: { deletedAt: null },
  });
}

// Query that excludes deleted items
async function getActiveProjects(orgId: string) {
  return prisma.project.findMany({
    where: {
      organizationId: orgId,
      deletedAt: null, // Only non-deleted
    },
  });
}

// Query including deleted (for admin/audit)
async function getAllProjects(orgId: string, includeDeleted = false) {
  return prisma.project.findMany({
    where: {
      organizationId: orgId,
      ...(includeDeleted ? {} : { deletedAt: null }),
    },
  });
}
```

---

## Transactions

Use transactions for operations that must succeed or fail together:

### Implicit Transactions

```typescript
// Prisma wraps this in a transaction automatically
const user = await prisma.user.create({
  data: {
    email: 'new@example.com',
    organizations: {
      create: {
        organization: {
          create: {
            name: 'New Org',
            slug: 'new-org',
          },
        },
        role: 'OWNER',
      },
    },
  },
});
```

### Explicit Transactions

```typescript
// Multiple operations in a single transaction
const [user, org, subscription] = await prisma.$transaction([
  prisma.user.create({ data: userData }),
  prisma.organization.create({ data: orgData }),
  prisma.subscription.create({ data: subData }),
]);
```

### Interactive Transactions

```typescript
// For complex logic that needs rollback
const result = await prisma.$transaction(async (tx) => {
  // Decrement user's credits
  const user = await tx.user.update({
    where: { id: userId },
    data: { credits: { decrement: cost } },
  });

  // Check if sufficient credits
  if (user.credits < 0) {
    throw new Error('Insufficient credits');
    // Transaction will rollback
  }

  // Create the purchase record
  const purchase = await tx.purchase.create({
    data: {
      userId,
      amount: cost,
      item: itemId,
    },
  });

  return { user, purchase };
});
```

---

## Optimizing Performance

### Select Only Needed Fields

```typescript
// BAD - fetches all columns
const users = await prisma.user.findMany();

// GOOD - fetches only what's needed
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    name: true,
  },
});
```

### Avoid N+1 Queries with Include

```typescript
// BAD - N+1 query problem
const orgs = await prisma.organization.findMany();
for (const org of orgs) {
  const members = await prisma.organizationMember.findMany({
    where: { organizationId: org.id },
  });
}

// GOOD - single query with join
const orgs = await prisma.organization.findMany({
  include: {
    members: {
      include: { user: true },
    },
  },
});
```

### Add Indexes for Frequent Queries

```prisma
model User {
  id    String @id
  email String @unique
  orgId String
  role  Role

  // Index for filtering by org
  @@index([orgId])

  // Composite index for common query pattern
  @@index([orgId, role])
}
```

### Cursor-Based Pagination for Large Datasets

```typescript
async function getLogsWithCursor(cursor?: string, limit = 50) {
  const logs = await prisma.log.findMany({
    take: limit + 1, // Fetch one extra to check if more exist
    ...(cursor && {
      skip: 1, // Skip the cursor item
      cursor: { id: cursor },
    }),
    orderBy: { createdAt: 'desc' },
  });

  const hasMore = logs.length > limit;
  const items = hasMore ? logs.slice(0, -1) : logs;

  return {
    items,
    nextCursor: hasMore ? items[items.length - 1].id : null,
  };
}
```

---

## Database Seeding

Fabrk includes a comprehensive seed script:

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 12);

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Created user:', user.email);

  // Create organization
  const org = await prisma.organization.upsert({
    where: { slug: 'test-org' },
    update: {},
    create: {
      name: 'Test Organization',
      slug: 'test-org',
      members: {
        create: {
          userId: user.id,
          role: 'OWNER',
        },
      },
    },
  });

  console.log('Created organization:', org.slug);

  // Create test subscription
  await prisma.subscription.upsert({
    where: { id: 'test-subscription' },
    update: {},
    create: {
      id: 'test-subscription',
      userId: user.id,
      organizationId: org.id,
      provider: 'stripe',
      providerCustomerId: 'cus_test123',
      status: 'active',
      priceId: 'price_test123',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
```

Run with:

```bash
npm run db:seed
```

---

## Prisma Studio

Visual database browser at `http://localhost:5555`:

```bash
npm run db:studio
```

Features:
- Browse all tables
- View and edit records
- Run ad-hoc queries
- Export data to JSON/CSV
- Visualize relationships

---

## Migrations for Production

### Development Workflow

```bash
# Make schema changes in schema.prisma
# Then create a migration:
npx prisma migrate dev --name add_projects_table

# This creates: prisma/migrations/20240101_add_projects_table/migration.sql
```

### Production Deployment

```bash
# Apply pending migrations (non-interactive)
npx prisma migrate deploy
```

### CI/CD Integration

```yaml
# In your deployment pipeline
steps:
  - name: Install dependencies
    run: npm ci

  - name: Run migrations
    run: npx prisma migrate deploy
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}

  - name: Deploy application
    run: npm run build && npm start
```

---

## Troubleshooting

### "Prisma Client not generated"

```bash
npx prisma generate
```

### "Can't reach database"

Check your `DATABASE_URL`:
- Correct host/port?
- Database exists?
- User has permissions?
- SSL required? Add `?sslmode=require`

### Schema drift (production vs local)

```bash
# Check current state
npx prisma db pull

# Compare with schema
npx prisma migrate diff
```

### Slow queries

1. Add indexes for filtered columns
2. Use `select` instead of fetching all fields
3. Check for N+1 queries with `include`
4. Use cursor pagination for large datasets

---

## Next Steps

1. **Review the schema** - `prisma/schema.prisma`
2. **Run migrations** - `npm run db:push`
3. **Seed test data** - `npm run db:seed`
4. **Open Prisma Studio** - `npm run db:studio`
5. **Start querying** - Import from `@/lib/prisma`

Type-safe database access from day one.
