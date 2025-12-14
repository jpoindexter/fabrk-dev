/**
 * ✅ FABRK COMPONENT
 * Prisma Integration Guide
 * Complete guide for connecting templates to database
 */
'use client';

import Link from 'next/link';
import { Database, AlertTriangle } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';

export default function PrismaIntegrationPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      <section className="space-y-4">
        <div className="border-border inline-block border px-4 py-1">
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
            [INTEGRATION]: PRISMA_ORM
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div className={cn('bg-primary/10 p-4', mode.radius)}>
            <Database className="text-primary h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h1 className={cn(mode.font, 'text-3xl font-semibold tracking-tight')}>
              Prisma Integration
            </h1>
            <p className={cn(mode.font, 'text-muted-foreground text-base')}>
              Replace mock data with real database queries using Prisma ORM and PostgreSQL.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardHeader code="0x00" title="OVERVIEW" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>
              Fabrk templates use mock data by default. This guide shows how to replace mocks with
              real database queries using Prisma.
            </p>
            <div className="bg-muted/30 border-border border p-4">
              <p className="text-primary mb-2 font-medium">[WHAT YOU'LL INTEGRATE]:</p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                <li>Prisma Client for type-safe database access</li>
                <li>Schema design for template data models</li>
                <li>CRUD operations in templates</li>
                <li>Database migrations and seeding</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x01" title="STEP 1: VERIFY SETUP" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <CodeBlock
              code={`# Check Prisma is installed
npm list @prisma/client

# Verify schema exists
cat prisma/schema.prisma

# Run initial migration
npx prisma db push`}
              language="bash"
              maxHeight="150px"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x02" title="STEP 2: DEFINE MODELS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>
              Add models to <code className="bg-muted px-1">prisma/schema.prisma</code>:
            </p>
            <CodeBlock
              code={`// Example: Analytics Dashboard data
model Metric {
  id          String   @id @default(cuid())
  userId      String
  name        String
  value       Float
  change      Float
  icon        String
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}

model Activity {
  id          String   @id @default(cuid())
  userId      String
  type        String
  description String
  timestamp   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}`}
              language="prisma"
              maxHeight="300px"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x03" title="STEP 3: REPLACE MOCK DATA" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p className="font-medium">Before (Mock Data):</p>
            <CodeBlock
              code={`// Mock data in component
const metrics = [
  { name: "Revenue", value: 45231, change: 12.5 },
  { name: "Users", value: 2350, change: 8.1 },
];`}
              language="typescript"
              maxHeight="120px"
            />

            <p className="font-medium">After (Prisma):</p>
            <CodeBlock
              code={`import { prisma } from "@/lib/db";

export default async function AnalyticsPage() {
  const session = await auth();

  // Fetch real data from database
  const metrics = await prisma.metric.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  return <MetricCards metrics={metrics} />;
}`}
              language="tsx"
              maxHeight="250px"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x04" title="COMMON QUERIES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <div className="border-border border-l-primary border-l-2 pl-4">
              <p className="font-medium">Fetch user-specific data:</p>
              <CodeBlock
                code={`const data = await prisma.item.findMany({
  where: { userId: session.user.id },
});`}
                language="typescript"
                maxHeight="100px"
              />
            </div>

            <div className="border-border border-l-primary border-l-2 pl-4">
              <p className="font-medium">Create new record:</p>
              <CodeBlock
                code={`await prisma.item.create({
  data: {
    name: "New Item",
    userId: session.user.id,
  },
});`}
                language="typescript"
                maxHeight="120px"
              />
            </div>

            <div className="border-border border-l-primary border-l-2 pl-4">
              <p className="font-medium">Update with validation:</p>
              <CodeBlock
                code={`await prisma.item.update({
  where: {
    id: itemId,
    userId: session.user.id, // Ensure ownership
  },
  data: { name: newName },
});`}
                language="typescript"
                maxHeight="140px"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x05" title="TROUBLESHOOTING" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <div className="border-border border p-4">
              <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4" />
                [ERROR]: PrismaClient is not configured
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Fix:</span> Run{' '}
                <code className="bg-muted px-1">npx prisma generate</code>
              </p>
            </div>

            <div className="border-border border p-4">
              <p className="text-destructive mb-2 flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4" />
                [ERROR]: Too many database connections
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Fix:</span> Use the Prisma singleton pattern in{' '}
                <code className="bg-muted px-1">lib/db.ts</code>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x06" title="NEXT STEPS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
              <li>
                <Link
                  href="/library/docs/integration/polar"
                  className="text-primary hover:underline"
                >
                  Add Polar.sh
                </Link>{' '}
                for payments and subscriptions
              </li>
              <li>
                <Link
                  href="/library/docs/integration/resend"
                  className="text-primary hover:underline"
                >
                  Integrate Resend
                </Link>{' '}
                for transactional emails
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
