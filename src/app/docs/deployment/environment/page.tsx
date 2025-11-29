import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Environment Variables - Fabrk Docs",
  description: "Configure all environment variables for Fabrk. Database, Stripe, auth providers, email, and optional integrations.",
};

export default function EnvironmentVariablesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x10] DEPLOYMENT ] ENVIRONMENT</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">ENVIRONMENT_VARIABLES</h1>
        <p className="font-mono text-sm text-muted-foreground">
          &gt; Complete guide to configuring all environment variables for development and production.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-4">
          <h3 className="mb-2 font-mono text-xs font-semibold">Key Points</h3>
          <ul className="space-y-1 font-mono text-sm text-muted-foreground">
            <li>├─ All variables are validated at startup with Zod</li>
            <li>├─ Client-side variables must start with NEXT_PUBLIC_</li>
            <li>├─ Never commit .env.local to version control</li>
            <li>└─ Use different values for dev/preview/production</li>
          </ul>
        </CardContent>
      </Card>

      {/* Required Variables */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">REQUIRED_VARIABLES</h2>
        <p className="font-mono text-sm text-muted-foreground">
          These must be set for the app to run:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# .env.local

# Database - PostgreSQL connection string
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth - Authentication
NEXTAUTH_URL="http://localhost:3000"  # Your app URL
NEXTAUTH_SECRET="your-32-character-secret-here"

# Generate a secure secret:
# openssl rand -base64 32

# App URL (used for links in emails, etc.)
NEXT_PUBLIC_APP_URL="http://localhost:3000"`} />
        </div>
      </div>

      {/* Authentication Variables */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">AUTHENTICATION</h2>
        <p className="font-mono text-sm text-muted-foreground">Configure OAuth providers:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Google OAuth (optional - enables Google login)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Setup:
# 1. Go to https://console.cloud.google.com/apis/credentials
# 2. Create OAuth 2.0 Client ID
# 3. Add redirect URI:
#    - Dev: http://localhost:3000/api/auth/callback/google
#    - Prod: https://your-domain.com/api/auth/callback/google`} />
        </div>
      </div>

      {/* Email Variables */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">EMAIL_RESEND</h2>
        <p className="font-mono text-sm text-muted-foreground">Configure email sending:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Resend API Key
RESEND_API_KEY="re_..."

# From address (must be from verified domain)
EMAIL_FROM="noreply@your-domain.com"

# Setup:
# 1. Sign up at https://resend.com
# 2. Verify your domain
# 3. Create API key
# 4. Add DNS records for domain verification`} />
        </div>
      </div>

      {/* Stripe Variables */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">STRIPE_PAYMENTS</h2>
        <p className="font-mono text-sm text-muted-foreground">Configure payment processing:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Stripe API Keys
STRIPE_SECRET_KEY="sk_test_..."           # Server-side
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."  # Client-side

# Stripe Webhook Secret
STRIPE_WEBHOOK_SECRET="whsec_..."

# Price IDs (create in Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PRICE_STARTER="price_..."
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL="price_..."
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE="price_..."

# Development vs Production:
# - Test mode: sk_test_..., pk_test_...
# - Live mode: sk_live_..., pk_live_...

# Test webhook locally:
# stripe listen --forward-to localhost:3000/api/webhooks/stripe`} />
        </div>
      </div>

      {/* Analytics Variables */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">ANALYTICS_OPTIONAL</h2>
        <p className="font-mono text-sm text-muted-foreground">Track user behavior and metrics:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Setup:
# 1. Sign up at https://posthog.com
# 2. Create project
# 3. Copy API key from Project Settings

# Google Analytics (alternative)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..."`} />
        </div>
      </div>

      {/* Search Variables */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">SEARCH_ALGOLIA_OPTIONAL</h2>
        <p className="font-mono text-sm text-muted-foreground">Add search functionality:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Algolia Search
NEXT_PUBLIC_ALGOLIA_APP_ID="your-app-id"
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY="your-search-key"
ALGOLIA_ADMIN_KEY="your-admin-key"  # Server-side only

# Setup:
# 1. Sign up at https://algolia.com
# 2. Create application
# 3. Get API keys from API Keys section`} />
        </div>
      </div>

      {/* CMS Variables */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">CMS_SANITY_OPTIONAL</h2>
        <p className="font-mono text-sm text-muted-foreground">Manage content with headless CMS:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="sk..."  # Server-side only

# Setup:
# 1. Create project at https://sanity.io/manage
# 2. Install Sanity CLI: npm install -g @sanity/cli
# 3. Initialize: sanity init`} />
        </div>
      </div>

      {/* Real-time Variables */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">REALTIME_PUSHER_OPTIONAL</h2>
        <p className="font-mono text-sm text-muted-foreground">Enable real-time features:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Pusher Real-time
PUSHER_APP_ID="your-app-id"
PUSHER_SECRET="your-secret"
NEXT_PUBLIC_PUSHER_KEY="your-key"
NEXT_PUBLIC_PUSHER_CLUSTER="us2"

# Setup:
# 1. Sign up at https://pusher.com
# 2. Create a Channels app
# 3. Get credentials from App Keys`} />
        </div>
      </div>

      {/* Environment-Specific Configuration */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">ENVIRONMENT_SPECIFIC_CONFIGURATION</h2>
        <p className="font-mono text-sm text-muted-foreground">
          Use different values for different environments:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Development (.env.local)
NODE_ENV="development"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
DATABASE_URL="postgresql://localhost:5432/fabrk_dev"

# Preview (Vercel Preview Environment)
NODE_ENV="production"
NEXTAUTH_URL="https://preview.your-domain.vercel.app"
STRIPE_SECRET_KEY="sk_test_..."  # Still use test keys
DATABASE_URL="postgresql://...preview-db..."

# Production (Vercel Production Environment)
NODE_ENV="production"
NEXTAUTH_URL="https://your-domain.com"
STRIPE_SECRET_KEY="sk_live_..."  # Live keys!
DATABASE_URL="postgresql://...production-db..."`} />
        </div>
      </div>

      {/* Validation */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">ENVIRONMENT_VALIDATION</h2>
        <p className="font-mono text-sm text-muted-foreground">
          All variables are validated at startup in <code className="bg-muted px-1 font-mono text-xs">src/lib/env.ts</code>:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// src/lib/env.ts

import { z } from "zod";

const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_").optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_").optional(),
});

// Validates at startup - fails loudly if invalid
export const env = {
  server: serverSchema.parse(process.env),
  client: clientSchema.parse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  }),
};

// Usage in code:
import { env } from "@/lib/env";

const dbUrl = env.server.DATABASE_URL;  // Type-safe!
const appUrl = env.client.NEXT_PUBLIC_APP_URL;`} />
        </div>
      </div>

      {/* Security Best Practices */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">SECURITY_BEST_PRACTICES</h2>
        <ul className="space-y-1 font-mono text-sm text-muted-foreground">
          <li>├─ Never commit secrets - Add .env.local to .gitignore</li>
          <li>├─ Rotate secrets regularly - Especially after team changes</li>
          <li>├─ Use separate keys - Different keys for dev/staging/prod</li>
          <li>├─ Limit access - Use least-privilege API keys when possible</li>
          <li>└─ Monitor usage - Check Stripe/Resend dashboards for anomalies</li>
        </ul>
      </div>

      {/* Complete Example */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">COMPLETE_EXAMPLE</h2>
        <p className="font-mono text-sm text-muted-foreground">Full development environment setup:</p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# .env.local - Complete Development Setup

# Core
NODE_ENV="development"
DATABASE_URL="postgresql://postgres:password@localhost:5432/fabrk"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-32-character-development-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email
RESEND_API_KEY="re_test_..."
EMAIL_FROM="dev@your-domain.com"

# Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PRICE_STARTER="price_..."
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL="price_..."

# Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Real-time (optional)
PUSHER_APP_ID="..."
PUSHER_SECRET="..."
NEXT_PUBLIC_PUSHER_KEY="..."
NEXT_PUBLIC_PUSHER_CLUSTER="us2"`} />
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/deployment/database">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-mono text-xs font-semibold">Database Setup</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Set up production PostgreSQL
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/deployment/vercel">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-mono text-xs font-semibold">Deploy to Vercel</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Deploy your configured app
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
