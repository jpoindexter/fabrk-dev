import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Prisma Database - Fabrk Docs",
  description: "Work with Prisma ORM in Fabrk. Schema design, migrations, queries, and best practices for your SaaS database.",
};

export default function DatabasePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Database with Prisma</h1>
        <p className="text-lg text-muted-foreground">
          Type-safe database access with Prisma ORM, including models, queries, migrations, and best practices for PostgreSQL.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Fabrk uses Prisma ORM with PostgreSQL for type-safe database operations. The system includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pre-built models for users, organizations, payments, and more</li>
              <li>Type-safe queries with full TypeScript support</li>
              <li>Migration management for schema changes</li>
              <li>Seeding scripts for development data</li>
              <li>Connection pooling for production</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Configuration</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">1. Set Database URL</h3>
          <div>
            <p className="text-muted-foreground">Add your PostgreSQL connection string to <code className="bg-muted px-2 py-1 rounded">.env.local</code>:</p>
          </div>
          <CodeBlock language="bash" code={`DATABASE_URL="postgresql://user:password@localhost:5432/fabrk?schema=public"

# For production with connection pooling (e.g., Supabase):
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"`} />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">2. Initialize Database</h3>
          <div>
            <p className="text-muted-foreground">Push the schema to your database:</p>
          </div>
          <CodeBlock language="bash" code={`# Push schema changes (development)
npm run db:push

# Generate Prisma Client
npx prisma generate

# Seed with test data
npm run db:seed

# Reset and reseed
npm run db:reset`} />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">3. Prisma Studio</h3>
          <div>
            <p className="text-muted-foreground">Browse and edit data with the visual GUI:</p>
          </div>
          <CodeBlock language="bash" code={`npm run db:studio
# Opens at http://localhost:5555`} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Core Models</h2>
        <div>
          <p className="text-muted-foreground">Fabrk includes these pre-built models in <code className="bg-muted px-2 py-1 rounded">prisma/schema.prisma</code>:</p>
        </div>
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
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Code Examples</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Database Client</h3>
          <div>
            <p className="text-muted-foreground">Use the singleton client from <code className="bg-muted px-2 py-1 rounded">src/lib/db/index.ts</code>:</p>
          </div>
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

        <div className="space-y-4">
          <h3 className="text-xl font-medium">API Route Queries</h3>
          <div>
            <p className="text-muted-foreground">Use Prisma in API routes:</p>
          </div>
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

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Transactions</h3>
          <div>
            <p className="text-muted-foreground">Use transactions for atomic operations:</p>
          </div>
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

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Pagination</h3>
          <div>
            <p className="text-muted-foreground">Implement cursor-based pagination:</p>
          </div>
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
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Migrations</h2>
        <div>
          <p className="text-muted-foreground">For production, use migrations instead of <code className="bg-muted px-2 py-1 rounded">db:push</code>:</p>
        </div>
        <CodeBlock language="bash" code={`# Create a new migration
npm run db:migrate -- --name add_user_preferences

# Apply migrations in production
npx prisma migrate deploy

# Check migration status
npx prisma migrate status`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Use Cases</h2>
        <div className="grid gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">User Profile Updates</h3>
              <p className="text-muted-foreground">
                Update user data with validation. Use <code className="bg-muted px-1 rounded">select</code> to return only needed fields and avoid exposing sensitive data like passwords.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Soft Deletes</h3>
              <p className="text-muted-foreground">
                Add <code className="bg-muted px-1 rounded">deletedAt DateTime?</code> field to models and filter with <code className="bg-muted px-1 rounded">where: {'{'} deletedAt: null {'}'}</code> for recoverable deletes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Full-Text Search</h3>
              <p className="text-muted-foreground">
                Use Prisma's full-text search with PostgreSQL: <code className="bg-muted px-1 rounded">where: {'{'} name: {'{'} search: "query" {'}'} {'}'}</code> for searching user names or content.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Aggregations</h3>
              <p className="text-muted-foreground">
                Calculate totals with <code className="bg-muted px-1 rounded">prisma.payment.aggregate({'{'} _sum: {'{'} amount: true {'}'} {'}'})</code> for dashboards and reports.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>Always use the singleton client from <code className="bg-muted px-1 rounded">@/lib/db</code></li>
              <li>Use <code className="bg-muted px-1 rounded">select</code> to fetch only needed fields</li>
              <li>Add indexes for frequently queried fields</li>
              <li>Use transactions for multi-step operations</li>
              <li>Never expose sensitive fields like <code className="bg-muted px-1 rounded">password</code> in API responses</li>
              <li>Use migrations in production, <code className="bg-muted px-1 rounded">db:push</code> only in development</li>
              <li>Set up connection pooling for production (PgBouncer)</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <div className="pt-4">
        <Link href="/docs" className="text-primary hover:underline">
          &larr; Back to Documentation
        </Link>
      </div>
    </div>
  );
}
