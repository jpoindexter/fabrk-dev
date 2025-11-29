import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Database Setup - Fabrk Docs",
  description: "Set up PostgreSQL for your Fabrk app. Connect to Supabase, PlanetScale, or any Postgres provider with Prisma ORM.",
};

export default function DatabaseSetupPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x10] DEPLOYMENT ] DATABASE</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">DATABASE_SETUP</h1>
        <p className="font-mono text-sm text-muted-foreground">
          &gt; Set up a production PostgreSQL database with Prisma ORM.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-4">
          <h3 className="mb-2 font-mono text-xs font-semibold">Database Providers</h3>
          <ul className="space-y-1 font-mono text-xs text-muted-foreground">
            <li>├─ Supabase - Free tier, great DX (recommended)</li>
            <li>├─ Neon - Serverless PostgreSQL with branching</li>
            <li>├─ Railway - Simple and affordable</li>
            <li>├─ PlanetScale - MySQL alternative</li>
            <li>└─ AWS RDS - Enterprise-grade</li>
          </ul>
        </CardContent>
      </Card>

      {/* Supabase Setup (Recommended) */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">SUPABASE_SETUP (Recommended)</h2>
        <ol className="space-y-1 font-mono text-xs text-muted-foreground">
          <li>1. Go to supabase.com and create an account</li>
          <li>2. Click "New Project"</li>
          <li>3. Set a strong database password</li>
          <li>4. Choose a region close to your users</li>
          <li>5. Wait for project to be ready (~2 minutes)</li>
        </ol>
        <p className="font-mono text-sm text-muted-foreground">Get your connection string and add it to .env.local:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Get connection string from:
# Project Settings → Database → Connection string

# Direct connection (for migrations)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# Pooler connection (for app - recommended)
DATABASE_URL="postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Add to .env.local
DATABASE_URL="your-connection-string"`} />
        </div>
      </div>

      {/* Neon Setup */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">NEON_SETUP</h2>
        <ol className="space-y-1 font-mono text-xs text-muted-foreground">
          <li>1. Sign up at neon.tech</li>
          <li>2. Create a new project</li>
          <li>3. Copy the connection string</li>
        </ol>
        <p className="font-mono text-sm text-muted-foreground">Connection string examples:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Neon connection string
DATABASE_URL="postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require"

# Enable connection pooling
DATABASE_URL="postgresql://[user]:[password]@[endpoint]-pooler.neon.tech/[dbname]?sslmode=require"`} />
        </div>
      </div>

      {/* Railway Setup */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">RAILWAY_SETUP</h2>
        <ol className="space-y-1 font-mono text-xs text-muted-foreground">
          <li>1. Sign up at railway.app</li>
          <li>2. Create new project → Add PostgreSQL</li>
          <li>3. Copy DATABASE_URL from Variables tab</li>
        </ol>
        <p className="font-mono text-sm text-muted-foreground">Connection string format:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Railway connection string
DATABASE_URL="postgresql://postgres:[password]@[host].railway.app:5432/railway"`} />
        </div>
      </div>

      {/* Initialize Database */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">INITIALIZE_DATABASE</h2>
        <p className="font-mono text-sm text-muted-foreground">
          After setting DATABASE_URL, run these commands:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Push schema to database
npm run db:push

# Or create a migration
npm run db:migrate -- --name init

# Seed with test data (optional)
npm run db:seed

# Open Prisma Studio to view data
npm run db:studio`} />
        </div>
      </div>

      {/* Connection Pooling */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">CONNECTION_POOLING</h2>
        <p className="font-mono text-sm text-muted-foreground">
          Essential for serverless deployments (Vercel):
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Why pooling matters:
# - Serverless functions create new connections per request
# - PostgreSQL has connection limits (~100 by default)
# - Without pooling, you'll hit limits under load

# Supabase - Use Supavisor (built-in pooler)
DATABASE_URL="postgresql://...pooler.supabase.com:6543/postgres?pgbouncer=true"

# Neon - Use their pooler endpoint
DATABASE_URL="postgresql://...endpoint-pooler.neon.tech/dbname"

# Self-hosted PgBouncer
DATABASE_URL="postgresql://...?pgbouncer=true&connection_limit=1"

# Prisma configuration for pooling
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // For Supabase pooling
  directUrl = env("DIRECT_URL")
}`} />
        </div>
      </div>

      {/* Prisma Schema */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">PRISMA_SCHEMA_OVERVIEW</h2>
        <p className="font-mono text-sm text-muted-foreground">
          Key models in <code className="bg-muted px-1 font-mono text-xs">prisma/schema.prisma</code>:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="prisma" code={`// Core authentication
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  emailVerified DateTime?
  password      String?   // For credentials auth
  role          Role      @default(USER)
  sessionVersion Int      @default(1) // Incremented to invalidate all sessions

  // Stripe integration
  customerId       String?   @unique
  subscriptionTier String?
  trialEndsAt      DateTime?

  accounts        Account[]
  sessions        Session[]
  payments        Payment[]
  organizations   OrganizationMember[]
}

// Payments
model Payment {
  id              String   @id @default(cuid())
  userId          String
  stripeId        String   @unique // payment_intent or session id
  amount          Int      // cents
  status          String   // succeeded, failed, pending
  productId       String?
  createdAt       DateTime @default(now())

  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// Multi-tenancy
model Organization {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  plan        String    @default("FREE")
  members     OrganizationMember[]
}

// Feature flags
model FeatureFlag {
  id          String    @id @default(cuid())
  name        String    @unique
  enabled     Boolean   @default(false)
  rolloutPercentage Int @default(0)
}`} />
        </div>
      </div>

      {/* Database Migrations */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">DATABASE_MIGRATIONS</h2>
        <p className="font-mono text-sm text-muted-foreground">
          Managing schema changes in production:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Development - Quick iterations
npm run db:push  # Pushes schema changes directly

# Production - Use migrations
npm run db:migrate -- --name add_audit_logs

# This creates:
# prisma/migrations/[timestamp]_add_audit_logs/migration.sql

# Deploy migration to production
npx prisma migrate deploy

# View migration history
npx prisma migrate status

# Reset database (DANGER - deletes all data)
npm run db:reset`} />
        </div>
      </div>

      {/* Seeding Data */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">SEEDING_DATA</h2>
        <p className="font-mono text-sm text-muted-foreground">
          Populate database with test data:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create test user
  const hashedPassword = await bcrypt.hash("password123", 12);

  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      hashedPassword,
      emailVerified: new Date(),
    },
  });

  // Create test organization
  await prisma.organization.upsert({
    where: { slug: "test-org" },
    update: {},
    create: {
      name: "Test Organization",
      slug: "test-org",
      members: {
        create: {
          userId: user.id,
          role: "OWNER",
        },
      },
    },
  });

  console.log("Seed complete");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

# Run seeding
npm run db:seed`} />
        </div>
      </div>

      {/* Backups */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">DATABASE_BACKUPS</h2>
        <p className="font-mono text-sm text-muted-foreground">
          Each provider handles backups differently:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Supabase
# - Automatic daily backups (Pro plan)
# - Point-in-time recovery (Pro plan)
# - Download backups from Dashboard

# Neon
# - Automatic backups with branching
# - Create branches for testing migrations

# Manual backup with pg_dump
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
pg_dump $DATABASE_URL | gzip > "backup-$DATE.sql.gz"
# Upload to S3, etc.`} />
        </div>
      </div>

      {/* Performance Tips */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">PERFORMANCE_TIPS</h2>
        <ul className="space-y-1 font-mono text-xs text-muted-foreground">
          <li>├─ Add indexes - Index frequently queried columns: <code className="bg-muted px-1">@@index([userId, createdAt])</code></li>
          <li>├─ Use select - Only fetch needed fields: <code className="bg-muted px-1">prisma.user.findMany({'{'} select: {'{'} id: true, name: true {'}'} {'}'})</code></li>
          <li>├─ Batch operations - Use createMany/updateMany for multiple records</li>
          <li>└─ Enable logging - Debug slow queries: <code className="bg-muted px-1">new PrismaClient({'{'} log: ["query"] {'}'})</code></li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/deployment/vercel">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-mono text-xs font-semibold">Deploy to Vercel</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Deploy with your database configured
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/security/audit-logging">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-mono text-xs font-semibold">Audit Logging</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Track database operations
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
