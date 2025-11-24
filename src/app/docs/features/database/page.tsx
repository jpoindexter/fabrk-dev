import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export default function DatabasePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline text-sm">
          ← Back to Documentation
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Database with Prisma</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Type-safe database access with Prisma ORM, including models, queries, migrations, and best practices for PostgreSQL.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
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

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Configuration</h2>

        <h3 className="text-xl font-medium mb-3">1. Set Database URL</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Add your PostgreSQL connection string to <code className="bg-muted px-2 py-1 rounded">.env.local</code>:</p>
            <CodeBlock language="bash" code={`DATABASE_URL="postgresql://user:password@localhost:5432/fabrk?schema=public"

# For production with connection pooling (e.g., Supabase):
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"`} />
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">2. Initialize Database</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Push the schema to your database:</p>
            <CodeBlock language="bash" code={`# Push schema changes (development)
npm run db:push

# Generate Prisma Client
npx prisma generate

# Seed with test data
npm run db:seed

# Reset and reseed
npm run db:reset`} />
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">3. Prisma Studio</h3>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Browse and edit data with the visual GUI:</p>
            <CodeBlock language="bash" code={`npm run db:studio
# Opens at http://localhost:5555`} />
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Core Models</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Fabrk includes these pre-built models in <code className="bg-muted px-2 py-1 rounded">prisma/schema.prisma</code>:</p>
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
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>

        <h3 className="text-xl font-medium mb-3">Database Client</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Use the singleton client from <code className="bg-muted px-2 py-1 rounded">src/lib/db/index.ts</code>:</p>
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
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">API Route Queries</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Use Prisma in API routes:</p>
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
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Transactions</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Use transactions for atomic operations:</p>
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
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Pagination</h3>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Implement cursor-based pagination:</p>
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
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Migrations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">For production, use migrations instead of <code className="bg-muted px-2 py-1 rounded">db:push</code>:</p>
            <CodeBlock language="bash" code={`# Create a new migration
npm run db:migrate -- --name add_user_preferences

# Apply migrations in production
npx prisma migrate deploy

# Check migration status
npx prisma migrate status`} />
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>

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

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
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
    </div>
  );
}
