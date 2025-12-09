import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Settings, Key, Shield, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Environment Variables - Fabrk Docs',
  description:
    'Configure all environment variables for Fabrk. Database, Stripe, auth providers, email, and optional integrations.',
};

export default function EnvironmentVariablesPage() {
  return (
    <FeatureGuideTemplate
      code="[0x10]"
      category="Deployment"
      title="Environment_Variables"
      description="Complete guide to configuring all environment variables for development and production."
      overview="All variables validated at startup with Zod. Client-side variables use NEXT_PUBLIC_ prefix. Different values for dev/preview/production."
      features={[
        {
          icon: Settings,
          title: 'Zod Validation',
          description: 'Type-safe at startup.',
        },
        {
          icon: Key,
          title: 'Secrets',
          description: 'Never commit .env.local.',
        },
        {
          icon: Shield,
          title: 'Env-Specific',
          description: 'Dev/preview/production.',
        },
        {
          icon: CheckCircle,
          title: 'Required',
          description: 'Database, auth, Stripe.',
        },
      ]}
      setup={[
        {
          title: 'Copy Example',
          description: 'Start with the example environment file',
          code: `cp .env.example .env.local`,
          language: 'bash',
        },
        {
          title: 'Generate Secret',
          description: 'Create a secure NEXTAUTH_SECRET',
          code: `openssl rand -base64 32`,
          language: 'bash',
        },
        {
          title: 'Configure Database',
          description: 'Set your PostgreSQL connection string',
          code: `DATABASE_URL="postgresql://user:password@host:5432/database"`,
          language: 'bash',
        },
        {
          title: 'Add Services',
          description: 'Configure Stripe, email, and OAuth providers',
        },
      ]}
      usage={[
        {
          title: 'Required Variables',
          description: 'These must be set for the app to run',
          code: `# .env.local

# Database - PostgreSQL connection string
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth - Authentication
NEXTAUTH_URL="http://localhost:3000"  # Your app URL
NEXTAUTH_SECRET="your-32-character-secret-here"

# App URL (used for links in emails, etc.)
NEXT_PUBLIC_APP_URL="http://localhost:3000"`,
          language: 'bash',
        },
        {
          title: 'Authentication',
          description: 'Configure OAuth providers',
          code: `# Google OAuth (optional - enables Google login)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Setup:
# 1. Go to https://console.cloud.google.com/apis/credentials
# 2. Create OAuth 2.0 Client ID
# 3. Add redirect URI:
#    - Dev: http://localhost:3000/api/auth/callback/google
#    - Prod: https://your-domain.com/api/auth/callback/google`,
          language: 'bash',
        },
        {
          title: 'Email (Resend)',
          description: 'Configure email sending',
          code: `# Resend API Key
RESEND_API_KEY="re_..."

# From address (must be from verified domain)
EMAIL_FROM="noreply@your-domain.com"

# Setup:
# 1. Sign up at https://resend.com
# 2. Verify your domain
# 3. Create API key
# 4. Add DNS records for domain verification`,
          language: 'bash',
        },
        {
          title: 'Stripe Payments',
          description: 'Configure payment processing',
          code: `# Stripe API Keys
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
# stripe listen --forward-to localhost:3000/api/webhooks/stripe`,
          language: 'bash',
        },
        {
          title: 'Analytics (Optional)',
          description: 'Track user behavior and metrics',
          code: `# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Setup:
# 1. Sign up at https://posthog.com
# 2. Create project
# 3. Copy API key from Project Settings

# Google Analytics (alternative)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..."`,
          language: 'bash',
        },
        {
          title: 'Environment Validation',
          description: 'All variables validated at startup in src/lib/env.ts',
          code: `// src/lib/env.ts
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
const appUrl = env.client.NEXT_PUBLIC_APP_URL;`,
          language: 'typescript',
        },
        {
          title: 'Environment-Specific Configuration',
          description: 'Use different values for different environments',
          code: `# Development (.env.local)
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
DATABASE_URL="postgresql://...production-db..."`,
          language: 'bash',
        },
        {
          title: 'Complete Example',
          description: 'Full development environment setup',
          code: `# .env.local - Complete Development Setup

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
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"`,
          language: 'bash',
        },
      ]}
      previous={{ title: 'Vercel', href: '/docs/deployment/vercel' }}
      next={{ title: 'Database', href: '/docs/deployment/database' }}
    >
      {/* Key Points */}
      <DocsSection title="Key Points">
        <DocsCard title="KEY_POINTS">
          <div className="space-y-1">
            <div>├─ All variables are validated at startup with Zod</div>
            <div>├─ Client-side variables must start with NEXT_PUBLIC_</div>
            <div>├─ Never commit .env.local to version control</div>
            <div>└─ Use different values for dev/preview/production</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Security Best Practices */}
      <DocsSection title="Security Best Practices">
        <DocsCard title="SECURITY">
          <div className="space-y-1">
            <div>├─ Never commit secrets - Add .env.local to .gitignore</div>
            <div>
              ├─ Rotate secrets regularly - Especially after team changes
            </div>
            <div>
              ├─ Use separate keys - Different keys for dev/staging/prod
            </div>
            <div>
              ├─ Limit access - Use least-privilege API keys when possible
            </div>
            <div>
              └─ Monitor usage - Check Stripe/Resend dashboards for anomalies
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/deployment/database"
            title="Database Setup"
            description="Set up production PostgreSQL"
          />
          <DocsLinkCard
            href="/docs/deployment/vercel"
            title="Deploy to Vercel"
            description="Deploy your configured app"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
