import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Database Setup - Fabrk Docs",
  description: "Set up PostgreSQL for your Fabrk app. Connect to Supabase, PlanetScale, or any Postgres provider with Prisma ORM.",
};

export default function DatabaseSetupPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Database Setup</h1>
        <p className="text-lg text-muted-foreground">
          Set up a production PostgreSQL database with Prisma ORM.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold">Database Providers</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li><strong>Supabase</strong> - Free tier, great DX (recommended)</li>
            <li><strong>Neon</strong> - Serverless PostgreSQL with branching</li>
            <li><strong>Railway</strong> - Simple and affordable</li>
            <li><strong>PlanetScale</strong> - MySQL alternative</li>
            <li><strong>AWS RDS</strong> - Enterprise-grade</li>
          </ul>
        </CardContent>
      </Card>

      {/* Supabase Setup (Recommended) */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Supabase Setup (Recommended)</h2>
        <ol className="list-inside list-decimal space-y-3 text-muted-foreground">
          <li>
            Go to{" "}
            <a href="https://supabase.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              supabase.com
            </a>{" "}
            and create an account
          </li>
          <li>Click "New Project"</li>
          <li>Set a strong database password</li>
          <li>Choose a region close to your users</li>
          <li>Wait for project to be ready (~2 minutes)</li>
        </ol>
        <CodeBlock language="bash" code={`# Get connection string from:
# Project Settings → Database → Connection string

# Direct connection (for migrations)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# Pooler connection (for app - recommended)
DATABASE_URL="postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Add to .env.local
DATABASE_URL="your-connection-string"`} />
      </div>

      {/* Neon Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Neon Setup</h2>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          <li>
            Sign up at{" "}
            <a href="https://neon.tech" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              neon.tech
            </a>
          </li>
          <li>Create a new project</li>
          <li>Copy the connection string</li>
        </ol>
        <CodeBlock language="bash" code={`# Neon connection string
DATABASE_URL="postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require"

# Enable connection pooling
DATABASE_URL="postgresql://[user]:[password]@[endpoint]-pooler.neon.tech/[dbname]?sslmode=require"`} />
      </div>

      {/* Railway Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Railway Setup</h2>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          <li>
            Sign up at{" "}
            <a href="https://railway.app" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              railway.app
            </a>
          </li>
          <li>Create new project → Add PostgreSQL</li>
          <li>Copy DATABASE_URL from Variables tab</li>
        </ol>
        <CodeBlock language="bash" code={`# Railway connection string
DATABASE_URL="postgresql://postgres:[password]@[host].railway.app:5432/railway"`} />
      </div>

      {/* Initialize Database */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Initialize Database</h2>
        <p className="text-muted-foreground">
          After setting DATABASE_URL, run these commands:
        </p>
        <CodeBlock language="bash" code={`# Push schema to database
npm run db:push

# Or create a migration
npm run db:migrate -- --name init

# Seed with test data (optional)
npm run db:seed

# Open Prisma Studio to view data
npm run db:studio`} />
      </div>

      {/* Connection Pooling */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Connection Pooling</h2>
        <p className="text-muted-foreground">
          Essential for serverless deployments (Vercel):
        </p>
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

      {/* Prisma Schema */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Prisma Schema Overview</h2>
        <p className="text-muted-foreground">
          Key models in <code className="rounded bg-muted px-1 py-0.5">prisma/schema.prisma</code>:
        </p>
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

      {/* Database Migrations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Database Migrations</h2>
        <p className="text-muted-foreground">
          Managing schema changes in production:
        </p>
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

      {/* Seeding Data */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Seeding Data</h2>
        <p className="text-muted-foreground">
          Populate database with test data:
        </p>
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

      {/* Backups */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Database Backups</h2>
        <p className="text-muted-foreground">
          Each provider handles backups differently:
        </p>
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

      {/* Performance Tips */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Performance Tips</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>
            <strong>Add indexes</strong> - Index frequently queried columns
            <pre className="mt-1 rounded bg-muted p-2 text-sm">
              <code>@@index([userId, createdAt])</code>
            </pre>
          </li>
          <li>
            <strong>Use select</strong> - Only fetch needed fields
            <pre className="mt-1 rounded bg-muted p-2 text-sm">
              <code>prisma.user.findMany({"{"} select: {"{"} id: true, name: true {"}"} {"}"})</code>
            </pre>
          </li>
          <li>
            <strong>Batch operations</strong> - Use createMany/updateMany
          </li>
          <li>
            <strong>Enable logging</strong> - Debug slow queries
            <pre className="mt-1 rounded bg-muted p-2 text-sm">
              <code>new PrismaClient({"{"} log: ["query"] {"}"})</code>
            </pre>
          </li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/deployment/vercel">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Deploy to Vercel</h3>
                <p className="text-sm text-muted-foreground">
                  Deploy with your database configured
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/security/audit-logging">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Audit Logging</h3>
                <p className="text-sm text-muted-foreground">
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
