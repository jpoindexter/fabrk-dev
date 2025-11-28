import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Deploy to Vercel - Fabrk Docs",
  description: "Deploy your Fabrk app to Vercel with automatic SSL, CDN, and edge functions. Step-by-step guide included.",
};

export default function DeployVercelPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Deploy to Vercel</h1>
        <p className="text-lg text-muted-foreground">
          Deploy your Fabrk application to Vercel with automatic SSL, CDN, and edge functions.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold">What You'll Get</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>Automatic HTTPS with custom domains</li>
            <li>Global CDN for static assets</li>
            <li>Edge functions for middleware</li>
            <li>Preview deployments for PRs</li>
            <li>Environment variable management</li>
            <li>Web analytics and monitoring</li>
          </ul>
        </CardContent>
      </Card>

      {/* One-Click Deploy */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">One-Click Deploy</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            The fastest way to deploy - click and configure:
          </p>
          <CodeBlock language="bash" code={`# Add this button to your README

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/fabrk)

# Or use the Vercel CLI
npm i -g vercel
vercel

# Follow the prompts:
# 1. Link to existing project? No
# 2. Project name? your-app-name
# 3. Directory? ./
# 4. Override settings? No`} />
        </div>
      </div>

      {/* Step-by-Step Deployment */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Step-by-Step Deployment</h2>
        <ol className="list-inside list-decimal space-y-3 text-muted-foreground">
          <li>
            <strong>Push to GitHub</strong> - Your code must be in a Git repository
          </li>
          <li>
            <strong>Connect to Vercel</strong> - Go to{" "}
            <a href="https://vercel.com/new" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              vercel.com/new
            </a>
          </li>
          <li>
            <strong>Import repository</strong> - Select your GitHub repo
          </li>
          <li>
            <strong>Configure project</strong> - Set environment variables
          </li>
          <li>
            <strong>Deploy</strong> - Click deploy and wait ~2 minutes
          </li>
        </ol>
      </div>

      {/* Required Environment Variables */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Required Environment Variables</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Add these in Vercel Dashboard → Settings → Environment Variables:
          </p>
          <CodeBlock language="bash" code={`# Core (Required)
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-32-character-secret"

# Generate NEXTAUTH_SECRET with:
openssl rand -base64 32

# Email (Required for auth)
RESEND_API_KEY="re_..."

# Stripe (Required for payments)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# Optional
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
NEXT_PUBLIC_APP_URL="https://your-domain.com"`} />
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Set different values for Preview and Production environments.
          </p>
        </div>
      </div>

      {/* vercel.json Configuration */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">vercel.json Configuration</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Optional configuration for advanced settings:
          </p>
          <CodeBlock language="json" code={`// vercel.json

{
  "buildCommand": "prisma generate && next build",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 0 * * *"
    }
  ]
}`} />
        </div>
      </div>

      {/* Custom Domain */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Domain</h2>
        <p className="text-muted-foreground">
          Connect your custom domain:
        </p>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          <li>Go to Project Settings → Domains</li>
          <li>Add your domain (e.g., myapp.com)</li>
          <li>
            Add DNS records at your registrar:
            <div className="mt-2">
              <CodeBlock language="bash" code={`# For apex domain (myapp.com)
Type: A
Name: @
Value: 76.76.21.21

# For www subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com`} />
            </div>
          </li>
          <li>Wait for DNS propagation (up to 48 hours)</li>
          <li>SSL certificate is automatically provisioned</li>
        </ol>
      </div>

      {/* Stripe Webhook Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Stripe Webhook Setup</h2>
        <p className="text-muted-foreground">
          Configure Stripe webhooks for production:
        </p>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          <li>
            Go to{" "}
            <a href="https://dashboard.stripe.com/webhooks" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Stripe Dashboard → Webhooks
            </a>
          </li>
          <li>Click "Add endpoint"</li>
          <li>
            Enter URL: <code className="rounded bg-muted px-1 py-0.5">https://your-domain.com/api/webhooks/stripe</code>
          </li>
          <li>
            Select events:
            <ul className="ml-4 mt-1 list-inside list-disc">
              <li>checkout.session.completed</li>
              <li>customer.subscription.created</li>
              <li>customer.subscription.updated</li>
              <li>customer.subscription.deleted</li>
              <li>invoice.paid</li>
              <li>invoice.payment_failed</li>
            </ul>
          </li>
          <li>Copy the webhook signing secret</li>
          <li>Add it as <code className="rounded bg-muted px-1 py-0.5">STRIPE_WEBHOOK_SECRET</code> in Vercel</li>
        </ol>
      </div>

      {/* Preview Deployments */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Preview Deployments</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Every PR gets a unique preview URL:
          </p>
          <CodeBlock language="bash" code={`# Preview URL format
https://your-project-git-branch-name-your-team.vercel.app

# Example
https://fabrk-git-feature-auth-acme.vercel.app

# Configure preview environment variables
# Vercel Dashboard → Settings → Environment Variables
# Select "Preview" checkbox

# Use test Stripe keys for previews
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_test_..."`} />
        </div>
      </div>

      {/* Deployment Troubleshooting */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Troubleshooting</h2>
        <div className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Build fails with Prisma error</h3>
              <p className="text-sm text-muted-foreground">
                Add <code className="rounded bg-muted px-1 py-0.5">prisma generate</code> to build command:
              </p>
            </div>
            <CodeBlock language="json" code={`// package.json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}`} />
          </div>

          <Card>
            <CardContent className="p-4">
              <h3 className="mb-2 font-semibold">Environment variables not working</h3>
              <p className="text-sm text-muted-foreground">
                1. Check variable is set for correct environment (Production/Preview/Development)
                <br />
                2. Client-side variables must start with <code className="rounded bg-muted px-1 py-0.5">NEXT_PUBLIC_</code>
                <br />
                3. Redeploy after adding variables
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Database connection timeout</h3>
              <p className="text-sm text-muted-foreground">
                Use connection pooling (like Supabase Pooler or PgBouncer):
              </p>
            </div>
            <CodeBlock language="bash" code={`DATABASE_URL="postgresql://...?pgbouncer=true&connection_limit=1"`} />
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/deployment/environment">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Environment Variables</h3>
                <p className="text-sm text-muted-foreground">
                  Complete environment setup guide
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/deployment/database">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Database Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Set up production PostgreSQL
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
