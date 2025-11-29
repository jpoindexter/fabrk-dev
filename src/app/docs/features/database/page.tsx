import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Prisma Database - Fabrk Docs",
  description: "Work with Prisma ORM in Fabrk. Schema design, migrations, queries, and best practices for your SaaS database.",
};

export default function DatabasePage() {
  return (
    <div className="space-y-16">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x10] FEATURES ] DATABASE</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">DATABASE_PRISMA</h1>
        <p className="font-mono text-sm text-muted-foreground">
          &gt; Type-safe database access with Prisma ORM, including models, queries, migrations, and best practices for PostgreSQL.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">OVERVIEW</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <p className="font-mono text-sm text-muted-foreground mb-3">
              Fabrk uses Prisma ORM with PostgreSQL for type-safe database operations. The system includes:
            </p>
            <ul className="font-mono text-sm text-muted-foreground space-y-1">
              <li>├─ Pre-built models for users, organizations, payments, and more</li>
              <li>├─ Type-safe queries with full TypeScript support</li>
              <li>├─ Migration management for schema changes</li>
              <li>├─ Seeding scripts for development data</li>
              <li>└─ Connection pooling for production</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">CONFIGURATION</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">1</span>
            <h3 className="font-mono text-base font-semibold">SET_DATABASE_URL</h3>
          </div>
          <p className="font-mono text-sm text-muted-foreground">Add your PostgreSQL connection string to <code className="bg-muted px-1 font-mono text-xs">.env.local</code>:</p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="bash" code={`DATABASE_URL="postgresql://user:password@localhost:5432/fabrk?schema=public"

# For production with connection pooling (e.g., Supabase):
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"`} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">2</span>
            <h3 className="font-mono text-base font-semibold">INITIALIZE_DATABASE</h3>
          </div>
          <p className="font-mono text-sm text-muted-foreground">Push the schema to your database:</p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="bash" code={`# Push schema changes (development)
npm run db:push

# Generate Prisma Client
npx prisma generate

# Seed with test data
npm run db:seed

# Reset and reseed
npm run db:reset`} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">3</span>
            <h3 className="font-mono text-base font-semibold">PRISMA_STUDIO</h3>
          </div>
          <p className="font-mono text-sm text-muted-foreground">Browse and edit data with the visual GUI:</p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="bash" code={`npm run db:studio
# Opens at http://localhost:5555`} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">CORE_MODELS</h2>
        <p className="font-mono text-sm text-muted-foreground">Fabrk includes these pre-built models in <code className="bg-muted px-1 font-mono text-xs">prisma/schema.prisma</code>:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="prisma" code={`// Authentication
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  password      String?
  image         String?
  role          Role      @default(USER)
  sessionVersion Int      @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  payments      Payment[]
  organizations OrganizationMember[]
}

// Payments
model Payment {
  id              String   @id @default(cuid())
  userId          String
  stripeSessionId String   @unique
  stripePriceId   String
  amount          Int
  currency        String
  status          String
  createdAt       DateTime @default(now())

  user            User     @relation(fields: [userId], references: [id])
}

// Multi-tenancy
model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  members   OrganizationMember[]
  invites   OrganizationInvite[]
}

model OrganizationMember {
  id             String       @id @default(cuid())
  userId         String
  organizationId String
  role           OrgRole      @default(MEMBER)
  joinedAt       DateTime     @default(now())

  user           User         @relation(fields: [userId], references: [id])
  organization   Organization @relation(fields: [organizationId], references: [id])

  @@unique([userId, organizationId])
}`} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">CODE_EXAMPLES</h2>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">DATABASE_CLIENT</h3>
          <p className="font-mono text-sm text-muted-foreground">Use the singleton client from <code className="bg-muted px-1 font-mono text-xs">src/lib/db/index.ts</code>:</p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="typescript" code={`import { prisma } from "@/lib/db";

// Find user by email
const user = await prisma.user.findUnique({
  where: { email: "user@example.com" },
  include: { organizations: true },
});

// Create with relations
const newUser = await prisma.user.create({
  data: {
    email: "new@example.com",
    name: "New User",
    organizations: {
      create: {
        organization: {
          create: {
            name: "My Team",
            slug: "my-team",
          },
        },
        role: "OWNER",
      },
    },
  },
});`} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">API_ROUTE_QUERIES</h3>
          <p className="font-mono text-sm text-muted-foreground">Use Prisma in API routes:</p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="typescript" code={`// src/app/api/v1/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
    },
  });

  return NextResponse.json(user);
}`} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">TRANSACTIONS</h3>
          <p className="font-mono text-sm text-muted-foreground">Use transactions for atomic operations:</p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="typescript" code={`// Transfer ownership atomically
const result = await prisma.$transaction(async (tx) => {
  // Remove current owner
  await tx.organizationMember.update({
    where: { id: currentOwnerId },
    data: { role: "MEMBER" },
  });

  // Set new owner
  const newOwner = await tx.organizationMember.update({
    where: { id: newOwnerId },
    data: { role: "OWNER" },
  });

  // Log the change
  await tx.auditLog.create({
    data: {
      action: "OWNERSHIP_TRANSFERRED",
      organizationId: orgId,
      userId: session.user.id,
    },
  });

  return newOwner;
});`} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">PAGINATION</h3>
          <p className="font-mono text-sm text-muted-foreground">Implement cursor-based pagination:</p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="typescript" code={`const pageSize = 20;

const users = await prisma.user.findMany({
  take: pageSize + 1, // Fetch one extra to check for next page
  cursor: cursor ? { id: cursor } : undefined,
  skip: cursor ? 1 : 0, // Skip the cursor itself
  orderBy: { createdAt: "desc" },
});

const hasNextPage = users.length > pageSize;
const data = hasNextPage ? users.slice(0, -1) : users;
const nextCursor = hasNextPage ? data[data.length - 1].id : null;

return { data, nextCursor, hasNextPage };`} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">MIGRATIONS</h2>
        <p className="font-mono text-sm text-muted-foreground">For production, use migrations instead of <code className="bg-muted px-1 font-mono text-xs">db:push</code>:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Create a new migration
npm run db:migrate -- --name add_user_preferences

# Apply migrations in production
npx prisma migrate deploy

# Check migration status
npx prisma migrate status`} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">COMMON_USE_CASES</h2>
        <div className="grid gap-3">
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold mb-2">USER_PROFILE_UPDATES</h3>
              <p className="font-mono text-sm text-muted-foreground">
                Update user data with validation. Use <code className="bg-muted px-1 font-mono">select</code> to return only needed fields and avoid exposing sensitive data like passwords.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold mb-2">SOFT_DELETES</h3>
              <p className="font-mono text-sm text-muted-foreground">
                Add <code className="bg-muted px-1 font-mono">deletedAt DateTime?</code> field to models and filter with <code className="bg-muted px-1 font-mono">where: {'{'} deletedAt: null {'}'}</code> for recoverable deletes.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold mb-2">FULL_TEXT_SEARCH</h3>
              <p className="font-mono text-sm text-muted-foreground">
                Use Prisma&apos;s full-text search with PostgreSQL: <code className="bg-muted px-1 font-mono">where: {'{'} name: {'{'} search: &quot;query&quot; {'}'} {'}'}</code> for searching user names or content.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold mb-2">AGGREGATIONS</h3>
              <p className="font-mono text-sm text-muted-foreground">
                Calculate totals with <code className="bg-muted px-1 font-mono">prisma.payment.aggregate({'{'} _sum: {'{'} amount: true {'}'} {'}'})</code> for dashboards and reports.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">BEST_PRACTICES</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <ul className="font-mono text-sm text-muted-foreground space-y-1">
              <li>├─ Always use the singleton client from <code className="bg-muted px-1 font-mono">@/lib/db</code></li>
              <li>├─ Use <code className="bg-muted px-1 font-mono">select</code> to fetch only needed fields</li>
              <li>├─ Add indexes for frequently queried fields</li>
              <li>├─ Use transactions for multi-step operations</li>
              <li>├─ Never expose sensitive fields like <code className="bg-muted px-1 font-mono">password</code> in API responses</li>
              <li>├─ Use migrations in production, <code className="bg-muted px-1 font-mono">db:push</code> only in development</li>
              <li>└─ Set up connection pooling for production (PgBouncer)</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <div className="pt-4">
        <Link href="/docs" className="font-mono text-xs text-primary hover:underline">
          &larr; Back to Documentation
        </Link>
      </div>
    </div>
  );
}
