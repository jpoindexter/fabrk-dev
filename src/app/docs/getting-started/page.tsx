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
          Get your Fabrk boilerplate up and running in under 5 minutes.
        </p>
      </div>

      {/* Welcome */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-3 text-xl font-semibold text-foreground">Welcome to Fabrk!</h2>
          <p className="text-muted-foreground">
            Fabrk is a production-ready Next.js 15 SaaS boilerplate with authentication,
            payments, database, emails, and 87 pre-built components. Follow this guide to
            get started, then check out the{" "}
            <Link href="/docs/tutorials/ship-in-5-minutes" className="text-primary hover:underline">
              Ship in 5 Minutes
            </Link>{" "}
            tutorial to launch your first feature.
          </p>
        </CardContent>
      </Card>

      {/* Requirements */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Requirements</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>Node.js 18.17 or later</li>
          <li>PostgreSQL database (we recommend <a href="https://neon.tech" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Neon</a> for free serverless PostgreSQL)</li>
          <li>A code editor (VS Code recommended)</li>
        </ul>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <p className="text-muted-foreground">
          After purchasing Fabrk, you'll receive access to the private GitHub repository.
          Clone it and install dependencies:
        </p>
        <CodeBlock
          language="bash"
          code={`# Clone the repository
git clone https://github.com/jpoindexter/fabrk-boilerplate.git my-saas-app

# Navigate to the project
cd my-saas-app

# Install dependencies
npm install

# Remove the original git remote
git remote remove origin`}
        />
      </div>

      {/* Environment Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Environment Setup</h2>
        <p className="text-muted-foreground">
          Copy the example environment file and configure your variables:
        </p>
        <CodeBlock
          language="bash"
          code={`# Copy environment example
cp .env.example .env.local

# Generate a secure secret for NextAuth
openssl rand -base64 32`}
        />
        <p className="text-muted-foreground">
          Open <code className="rounded bg-muted px-1 py-0.5">.env.local</code> and configure
          these essential variables:
        </p>
        <CodeBlock
          language="bash"
          code={`# Database (get from Neon or your PostgreSQL provider)
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"

# Stripe (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (get from https://resend.com)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"`}
        />
      </div>

      {/* Database Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Database Setup</h2>
        <p className="text-muted-foreground">
          Push the Prisma schema to your database:
        </p>
        <CodeBlock
          language="bash"
          code={`# Push schema to database
npm run db:push

# (Optional) Seed with test data
npm run db:seed

# (Optional) Open Prisma Studio to view data
npm run db:studio`}
        />
      </div>

      {/* Run Dev Server */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Run Development Server</h2>
        <p className="text-muted-foreground">
          Start the development server:
        </p>
        <CodeBlock language="bash" code="npm run dev" />
        <p className="text-muted-foreground">
          Open{" "}
          <a
            href="http://localhost:3000"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://localhost:3000
          </a>{" "}
          in your browser. You should see the Fabrk landing page!
        </p>
      </div>

      {/* Project Structure */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Project Structure</h2>
        <p className="text-muted-foreground">
          Here's an overview of the key directories:
        </p>
        <CodeBlock
          language="bash"
          code={`src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/           # Internationalized routes
│   ├── (dashboard)/        # Protected dashboard pages
│   ├── api/                # API routes
│   └── ...
├── components/
│   ├── ui/                 # 25 Radix UI primitives
│   ├── landing/            # Landing page sections
│   └── dashboard/          # Dashboard components
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   ├── stripe.ts           # Stripe utilities
│   ├── email.ts            # Email sending
│   └── prisma.ts           # Database client
├── emails/                 # React Email templates
└── prisma/                 # Database schema`}
        />
      </div>

      {/* Configuration */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Configuration</h2>
        <p className="text-muted-foreground">
          The main configuration file is{" "}
          <code className="rounded bg-muted px-1 py-0.5">src/config.js</code>. This is your
          single source of truth for:
        </p>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>App name, description, and URLs</li>
          <li>Authentication providers (Google OAuth, credentials)</li>
          <li>Stripe price IDs and payment settings</li>
          <li>Email configuration</li>
          <li>Feature flags (blog, analytics, CMS, etc.)</li>
          <li>Product pricing</li>
        </ul>
        <p className="text-muted-foreground">
          Update this file first when customizing your app.
        </p>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/ship-in-5-minutes">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Ship in 5 Minutes</h3>
                <p className="text-sm text-muted-foreground">
                  Follow the tutorial to launch your first feature
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/authentication">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Set up Google OAuth and email authentication
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/features/payments">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Configure Stripe for one-time and subscription payments
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/deployment/vercel">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Deployment</h3>
                <p className="text-sm text-muted-foreground">
                  Deploy to Vercel in one click
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Support */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="mb-2 font-semibold text-foreground">Need Help?</h3>
          <p className="text-sm text-muted-foreground">
            Join our Discord community or email{" "}
            <a href="mailto:support@fabrk.dev" className="text-primary hover:underline">
              support@fabrk.dev
            </a>{" "}
            for assistance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
