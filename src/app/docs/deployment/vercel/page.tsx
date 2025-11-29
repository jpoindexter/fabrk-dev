import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Deploy to Vercel - Fabrk Docs",
  description: "Deploy your Fabrk app to Vercel with automatic SSL, CDN, and edge functions. Step-by-step guide included.",
};

export default function DeployVercelPage() {
  return (
    <div className="space-y-16">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x90] DEPLOYMENT ] VERCEL</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">DEPLOY_TO_VERCEL</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">&gt; Deploy your Fabrk application to Vercel with automatic SSL, CDN, and edge functions.</p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h3 className="font-mono mb-2 text-xs font-semibold">WHAT_YOU_WILL_GET</h3>
          <ul className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <li>├─ Automatic HTTPS with custom domains</li>
            <li>├─ Global CDN for static assets</li>
            <li>├─ Edge functions for middleware</li>
            <li>├─ Preview deployments for PRs</li>
            <li>├─ Environment variable management</li>
            <li>└─ Web analytics and monitoring</li>
          </ul>
        </CardContent>
      </Card>

      {/* One-Click Deploy */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold text-primary">ONE_CLICK_DEPLOY</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          The fastest way to deploy - click and configure:
        </p>
        <div className="[&>div]:rounded-none">
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
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold text-primary">STEP_BY_STEP_DEPLOYMENT</h2>
        <ol className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
          <li>1. Push to GitHub - Your code must be in a Git repository</li>
          <li>2. Connect to Vercel - Go to vercel.com/new</li>
          <li>3. Import repository - Select your GitHub repo</li>
          <li>4. Configure project - Set environment variables</li>
          <li>5. Deploy - Click deploy and wait ~2 minutes</li>
        </ol>
      </div>

      {/* Required Environment Variables */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold text-primary">REQUIRED_ENVIRONMENT_VARIABLES</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Add these in Vercel Dashboard → Settings → Environment Variables:
        </p>
        <div className="[&>div]:rounded-none">
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
        </div>
        <p className="font-mono text-sm text-muted-foreground">
          Tip: Set different values for Preview and Production environments.
        </p>
      </div>

      {/* vercel.json Configuration */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold text-primary">VERCEL_JSON_CONFIGURATION</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Optional configuration for advanced settings:
        </p>
        <div className="[&>div]:rounded-none">
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
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold text-primary">CUSTOM_DOMAIN</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Connect your custom domain:
        </p>
        <ol className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
          <li>1. Go to Project Settings → Domains</li>
          <li>2. Add your domain (e.g., myapp.com)</li>
          <li>3. Add DNS records at your registrar:</li>
        </ol>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# For apex domain (myapp.com)
Type: A
Name: @
Value: 76.76.21.21

# For www subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com`} />
        </div>
        <ol className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed" start={4}>
          <li>4. Wait for DNS propagation (up to 48 hours)</li>
          <li>5. SSL certificate is automatically provisioned</li>
        </ol>
      </div>

      {/* Stripe Webhook Setup */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold text-primary">STRIPE_WEBHOOK_SETUP</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Configure Stripe webhooks for production:
        </p>
        <ol className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
          <li>1. Go to Stripe Dashboard → Webhooks</li>
          <li>2. Click "Add endpoint"</li>
          <li>3. Enter URL: <code className="bg-muted px-1 font-mono">https://your-domain.com/api/webhooks/stripe</code></li>
          <li>4. Select events:</li>
        </ol>
        <ul className="ml-4 space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
          <li>├─ checkout.session.completed</li>
          <li>├─ customer.subscription.created</li>
          <li>├─ customer.subscription.updated</li>
          <li>├─ customer.subscription.deleted</li>
          <li>├─ invoice.paid</li>
          <li>└─ invoice.payment_failed</li>
        </ul>
        <ol className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed" start={5}>
          <li>5. Copy the webhook signing secret</li>
          <li>6. Add it as <code className="bg-muted px-1 font-mono">STRIPE_WEBHOOK_SECRET</code> in Vercel</li>
        </ol>
      </div>

      {/* Preview Deployments */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold text-primary">PREVIEW_DEPLOYMENTS</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Every PR gets a unique preview URL:
        </p>
        <div className="[&>div]:rounded-none">
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
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold text-primary">TROUBLESHOOTING</h2>

        <div className="space-y-2">
          <h3 className="font-mono text-base font-semibold">BUILD_FAILS_WITH_PRISMA_ERROR</h3>
          <p className="font-mono text-sm text-muted-foreground">
            Add <code className="bg-muted px-1 font-mono">prisma generate</code> to build command:
          </p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="json" code={`// package.json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}`} />
          </div>
        </div>

        <Card className="rounded-none">
          <CardContent className="p-6">
            <h3 className="font-mono mb-2 text-xs font-semibold">ENVIRONMENT_VARIABLES_NOT_WORKING</h3>
            <p className="font-mono text-sm text-muted-foreground">
              1. Check variable is set for correct environment (Production/Preview/Development)
              <br />
              2. Client-side variables must start with <code className="bg-muted px-1 font-mono">NEXT_PUBLIC_</code>
              <br />
              3. Redeploy after adding variables
            </p>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <h3 className="font-mono text-base font-semibold">DATABASE_CONNECTION_TIMEOUT</h3>
          <p className="font-mono text-sm text-muted-foreground">
            Use connection pooling (like Supabase Pooler or PgBouncer):
          </p>
          <div className="[&>div]:rounded-none">
            <CodeBlock language="bash" code={`DATABASE_URL="postgresql://...?pgbouncer=true&connection_limit=1"`} />
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold text-primary">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/deployment/environment">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-base font-semibold">ENVIRONMENT_VARIABLES</h3>
                <p className="font-mono text-sm text-muted-foreground">
                  Complete environment setup guide
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/deployment/database">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-base font-semibold">DATABASE_SETUP</h3>
                <p className="font-mono text-sm text-muted-foreground">
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
