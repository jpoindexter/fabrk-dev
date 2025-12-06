import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard, DocsLinkCard } from "@/components/docs";
import { Rocket, Globe, Lock, Layers } from "lucide-react";

export const metadata = {
  title: "Deploy to Vercel - Fabrk Docs",
  description: "Deploy your Fabrk app to Vercel with automatic SSL, CDN, and edge functions. Step-by-step guide included.",
};

export default function DeployVercelPage() {
  return (
    <FeatureGuideTemplate
      code="[0x90]"
      category="Deployment"
      title="Deploy_To_Vercel"
      description="Deploy your Fabrk application to Vercel with automatic SSL, CDN, and edge functions."
      overview="Complete Vercel deployment with automatic HTTPS, global CDN, preview deployments for PRs, and environment variable management."
      features={[
        { icon: Lock, title: "Auto HTTPS", description: "SSL with custom domains." },
        { icon: Globe, title: "Global CDN", description: "Static assets worldwide." },
        { icon: Layers, title: "Preview URLs", description: "Every PR gets a URL." },
        { icon: Rocket, title: "Edge Functions", description: "Middleware at the edge." },
      ]}
      setup={[
        {
          title: "Push to GitHub",
          description: "Your code must be in a Git repository",
        },
        {
          title: "Connect to Vercel",
          description: "Go to vercel.com/new and import your repository",
        },
        {
          title: "Configure Environment",
          description: "Add required environment variables",
          code: `# Core (Required)
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-32-character-secret"

# Generate NEXTAUTH_SECRET with:
openssl rand -base64 32`,
          language: "bash",
        },
        {
          title: "Deploy",
          description: "Click deploy and wait ~2 minutes",
        },
      ]}
      usage={[
        {
          title: "One-Click Deploy",
          description: "Fastest way to deploy",
          code: `# Add this button to your README
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/fabrk)

# Or use the Vercel CLI
npm i -g vercel
vercel

# Follow the prompts:
# 1. Link to existing project? No
# 2. Project name? your-app-name
# 3. Directory? ./
# 4. Override settings? No`,
          language: "bash",
        },
        {
          title: "Required Environment Variables",
          description: "Add in Vercel Dashboard → Settings → Environment Variables",
          code: `# Core (Required)
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-32-character-secret"

# Email (Required for auth)
RESEND_API_KEY="re_..."

# Stripe (Required for payments)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# Optional
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
NEXT_PUBLIC_APP_URL="https://your-domain.com"`,
          language: "bash",
        },
        {
          title: "vercel.json Configuration",
          description: "Optional advanced settings",
          code: `// vercel.json
{
  "buildCommand": "prisma generate && next build",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "crons": [
    { "path": "/api/cron/cleanup", "schedule": "0 0 * * *" }
  ]
}`,
          language: "json",
        },
        {
          title: "Custom Domain",
          description: "Connect your custom domain",
          code: `# 1. Go to Project Settings → Domains
# 2. Add your domain (e.g., myapp.com)
# 3. Add DNS records at your registrar:

# For apex domain (myapp.com)
Type: A
Name: @
Value: 76.76.21.21

# For www subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# 4. Wait for DNS propagation (up to 48 hours)
# 5. SSL certificate is automatically provisioned`,
          language: "bash",
        },
        {
          title: "Stripe Webhook Setup",
          description: "Configure production webhooks",
          code: `# 1. Go to Stripe Dashboard → Webhooks
# 2. Click "Add endpoint"
# 3. Enter URL: https://your-domain.com/api/webhooks/stripe
# 4. Select events:
#    - checkout.session.completed
#    - customer.subscription.created
#    - customer.subscription.updated
#    - customer.subscription.deleted
#    - invoice.paid
#    - invoice.payment_failed
# 5. Copy the webhook signing secret
# 6. Add it as STRIPE_WEBHOOK_SECRET in Vercel`,
          language: "bash",
        },
        {
          title: "Preview Deployments",
          description: "Every PR gets a unique preview URL",
          code: `# Preview URL format
https://your-project-git-branch-name-your-team.vercel.app

# Example
https://fabrk-git-feature-auth-acme.vercel.app

# Configure preview environment variables
# Vercel Dashboard → Settings → Environment Variables
# Select "Preview" checkbox

# Use test Stripe keys for previews
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_test_..."`,
          language: "bash",
        },
      ]}
      previous={{ title: "Database", href: "/docs/deployment/database" }}
      next={{ title: "Environment", href: "/docs/deployment/environment" }}
    >
      {/* What You Get */}
      <DocsSection title="What You Get">
        <DocsCard title="FEATURES">
          <div className="space-y-1">
            <div>├─ Automatic HTTPS with custom domains</div>
            <div>├─ Global CDN for static assets</div>
            <div>├─ Edge functions for middleware</div>
            <div>├─ Preview deployments for PRs</div>
            <div>├─ Environment variable management</div>
            <div>└─ Web analytics and monitoring</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Troubleshooting */}
      <DocsSection title="Troubleshooting">
        <DocsCard title="TROUBLESHOOTING">
          <div className="space-y-4">
            <div>
              <p className="mb-4"><strong>Build Fails with Prisma Error:</strong></p>
              <p>Add <code className="bg-muted px-1">prisma generate</code> to build command in package.json</p>
            </div>
            <div>
              <p className="mb-4"><strong>Environment Variables Not Working:</strong></p>
              <p>1. Check correct environment (Prod/Preview/Dev)<br/>2. Client-side vars need NEXT_PUBLIC_ prefix<br/>3. Redeploy after adding variables</p>
            </div>
            <div>
              <p className="mb-4"><strong>Database Connection Timeout:</strong></p>
              <p>Use connection pooling (Supabase Pooler or PgBouncer)</p>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/deployment/environment"
            title="Environment Variables"
            description="Complete environment setup guide"
          />
          <DocsLinkCard
            href="/docs/deployment/database"
            title="Database Setup"
            description="Set up production PostgreSQL"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
