import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { CodeBlock } from "@/components/ui/code-block";
import { docsTypography, docsSpacing } from "@/components/docs";

export const metadata = {
  title: "Prisma Database - Fabrk Docs",
  description: "Work with Prisma ORM in Fabrk. Schema design, migrations, queries, and best practices for your SaaS database.",
};

export default function DatabasePage() {
  return (
    <FeatureGuideTemplate
      code="[0x10]"
      category="Features"
      title="Database_Prisma"
      description="Type-safe database access with Prisma ORM, including models, queries, migrations, and best practices for PostgreSQL."
      overview="Fabrk uses Prisma ORM with PostgreSQL for type-safe database operations. The system includes pre-built models for users, organizations, payments, and more. It provides type-safe queries with full TypeScript support, migration management for schema changes, seeding scripts for development data, and connection pooling for production."
      setup={[
        {
          title: "Set Database URL",
          description: "Add your PostgreSQL connection string to .env.local",
          code: `DATABASE_URL="postgresql://user:password@localhost:5432/fabrk?schema=public"

# For production with connection pooling (e.g., Supabase):
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"`,
          language: "bash",
        },
        {
          title: "Initialize Database",
          description: "Push the schema to your database",
          code: `# Push schema changes (development)
npm run db:push

# Generate Prisma Client
npx prisma generate

# Seed with test data
npm run db:seed

# Reset and reseed
npm run db:reset`,
          language: "bash",
        },
        {
          title: "Prisma Studio",
          description: "Browse and edit data with the visual GUI",
          code: `npm run db:studio
# Opens at http://localhost:5555`,
          language: "bash",
        },
      ]}
      usage={[
        {
          title: "Database Client",
          description: "Use the singleton client from src/lib/db/index.ts",
          code: `import { prisma } from "@/lib/db";

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
});`,
          language: "typescript",
        },
        {
          title: "API Route Queries",
          description: "Use Prisma in API routes",
          code: `// src/app/api/v1/users/route.ts
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
}`,
          language: "typescript",
        },
        {
          title: "Transactions",
          description: "Use transactions for atomic operations",
          code: `// Transfer ownership atomically
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
});`,
          language: "typescript",
        },
        {
          title: "Pagination",
          description: "Implement cursor-based pagination",
          code: `const pageSize = 20;

const users = await prisma.user.findMany({
  take: pageSize + 1, // Fetch one extra to check for next page
  cursor: cursor ? { id: cursor } : undefined,
  skip: cursor ? 1 : 0, // Skip the cursor itself
  orderBy: { createdAt: "desc" },
});

const hasNextPage = users.length > pageSize;
const data = hasNextPage ? users.slice(0, -1) : users;
const nextCursor = hasNextPage ? data[data.length - 1].id : null;

return { data, nextCursor, hasNextPage };`,
          language: "typescript",
        },
      ]}
      previous={{ title: "Getting Started", href: "/docs/getting-started" }}
      next={{ title: "Payments", href: "/docs/features/payments" }}
    >
      {/* Core Models Section */}
      <DocsSection title="Core Models">
        <DocsCard>
          <p className={docsTypography.body}>
            Fabrk includes these pre-built models in <code className={docsTypography.code}>prisma/schema.prisma</code>:
          </p>
          <CodeBlock
            language="prisma"
            code={`// Authentication
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
}`}
          />
        </DocsCard>
      </DocsSection>

      {/* Migrations Section */}
      <DocsSection title="Migrations">
        <DocsCard>
          <p className={docsTypography.body}>
            For production, use migrations instead of <code className={docsTypography.code}>db:push</code>:
          </p>
          <CodeBlock
            language="bash"
            code={`# Create a new migration
npm run db:migrate -- --name add_user_preferences

# Apply migrations in production
npx prisma migrate deploy

# Check migration status
npx prisma migrate status`}
          />
        </DocsCard>
      </DocsSection>

      {/* Common Use Cases Section */}
      <DocsSection title="Common Use Cases">
        <div className={docsSpacing.sectionItems}>
          <DocsCard>
            <h3 className={`uppercase ${docsTypography.h4}`}>User Profile Updates</h3>
            <p className={docsTypography.body}>
              Update user data with validation. Use <code className={docsTypography.code}>select</code> to return only needed fields and avoid exposing sensitive data like passwords.
            </p>
          </DocsCard>

          <DocsCard>
            <h3 className={`uppercase ${docsTypography.h4}`}>Soft Deletes</h3>
            <p className={docsTypography.body}>
              Add <code className={docsTypography.code}>deletedAt DateTime?</code> field to models and filter with <code className={docsTypography.code}>where: {"{"} deletedAt: null {"}"}</code> for recoverable deletes.
            </p>
          </DocsCard>

          <DocsCard>
            <h3 className={`uppercase ${docsTypography.h4}`}>Full Text Search</h3>
            <p className={docsTypography.body}>
              Use Prisma&apos;s full-text search with PostgreSQL: <code className={docsTypography.code}>where: {"{"} name: {"{"} search: &quot;query&quot; {"}"} {"}"}</code> for searching user names or content.
            </p>
          </DocsCard>

          <DocsCard>
            <h3 className={`uppercase ${docsTypography.h4}`}>Aggregations</h3>
            <p className={docsTypography.body}>
              Calculate totals with <code className={docsTypography.code}>prisma.payment.aggregate({"{"} _sum: {"{"} amount: true {"}"} {"}"})</code> for dashboards and reports.
            </p>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard>
          <ul className="font-mono text-sm text-muted-foreground space-y-1">
            <li>├─ Always use the singleton client from <code className={docsTypography.code}>@/lib/db</code></li>
            <li>├─ Use <code className={docsTypography.code}>select</code> to fetch only needed fields</li>
            <li>├─ Add indexes for frequently queried fields</li>
            <li>├─ Use transactions for multi-step operations</li>
            <li>├─ Never expose sensitive fields like <code className={docsTypography.code}>password</code> in API responses</li>
            <li>├─ Use migrations in production, <code className={docsTypography.code}>db:push</code> only in development</li>
            <li>└─ Set up connection pooling for production (PgBouncer)</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
