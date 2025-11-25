import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export default function GettingStartedPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Getting Started</h1>
        <p className="text-lg text-muted-foreground">
          Initialize your enterprise-grade SaaS application with Fabrk.
        </p>
      </div>

      {/* Welcome */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-3 text-xl font-semibold text-foreground">Welcome to Fabrk</h2>
          <p className="text-muted-foreground">
            Fabrk is a production-ready Next.js 15 boilerplate designed for scalability and performance.
            Unlike simple starter kits, Fabrk provides a robust architecture with authentication,
            payments, database management, and email infrastructure pre-configured for enterprise use.
          </p>
          <div className="mt-4">
            <Link href="/docs/tutorials/quick-start" className="text-primary hover:underline font-medium">
              Jump to Quick Start Guide →
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Architecture Overview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Architecture Overview</h2>
        <p className="text-muted-foreground">
          Fabrk connects best-in-class infrastructure to give you a solid foundation.
        </p>
        <div className="my-6 overflow-hidden rounded-lg border bg-card p-6">
          <pre className="mermaid">
            {`graph TD
    User[User] --> CDN[Edge Network (Vercel)]
    CDN --> App[Next.js App Router]
    
    subgraph Infrastructure
        App --> Auth[NextAuth.js]
        App --> DB[(PostgreSQL)]
        App --> Email[Resend]
        App --> Payments[Stripe]
    end
    
    subgraph External
        Auth --> Google[Google OAuth]
        Payments --> Webhooks[Stripe Webhooks]
    end`}
          </pre>
          <p className="mt-4 text-sm text-muted-foreground text-center">
            High-level architecture of a Fabrk application
          </p>
        </div>
      </div>

      {/* Requirements */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">System Requirements</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>Node.js 18.17 or later (LTS recommended)</li>
          <li>PostgreSQL database (Neon, Supabase, or self-hosted)</li>
          <li>Git for version control</li>
        </ul>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <p className="text-muted-foreground">
          Clone the private repository to your local machine:
        </p>
        <CodeBlock
          language="bash"
          code={`# Clone the repository
git clone https://github.com/jpoindexter/fabrk-boilerplate.git my-saas-app

# Navigate to the project
cd my-saas-app

# Install dependencies
npm install

# Remove the original git remote to start fresh
git remote remove origin`}
        />
      </div>

      {/* Environment Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Environment Configuration</h2>
        <p className="text-muted-foreground">
          Set up your local environment variables:
        </p>
        <CodeBlock
          language="bash"
          code={`# Copy environment example
cp .env.example .env.local

# Generate a secure secret for NextAuth
openssl rand -base64 32`}
        />
        <p className="text-muted-foreground">
          Configure <code className="rounded bg-muted px-1 py-0.5">.env.local</code> with your credentials:
        </p>
        <CodeBlock
          language="bash"
          code={`# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"

# Stripe (Test Mode)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Resend)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"`}
        />
      </div>

      {/* Database Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Database Initialization</h2>
        <p className="text-muted-foreground">
          Synchronize your Prisma schema with the database:
        </p>
        <CodeBlock
          language="bash"
          code={`# Push schema to database
npm run db:push

# (Optional) Seed with initial data
npm run db:seed`}
        />
      </div>

      {/* Run Dev Server */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Start Development</h2>
        <p className="text-muted-foreground">
          Launch the local development server:
        </p>
        <CodeBlock language="bash" code="npm run dev" />
        <p className="text-muted-foreground">
          Access your application at{" "}
          <a
            href="http://localhost:3000"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://localhost:3000
          </a>
          .
        </p>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/quick-start">
            <Card className="h-full shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Quick Start Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Launch your MVP features in minutes
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/architecture">
            <Card className="h-full shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Understand the core system design
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
