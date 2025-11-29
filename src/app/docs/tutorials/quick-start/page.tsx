import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Quick Start Guide - Fabrk Docs",
  description: "Launch your MVP in minutes. Assemble a production-ready landing page with authentication, payments, and core SaaS features.",
};

export default function QuickStartPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x00] TUTORIALS ] QUICK_START</span>
        </div>
        <h1 className="font-mono text-3xl font-bold tracking-tight">QUICK_START_LAUNCH_MVP</h1>
        <p className="font-mono text-sm text-muted-foreground">
          &gt; Assemble a production-ready landing page and core features in minutes.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            This guide assumes you have completed the{" "}
            <Link href="/docs/getting-started" className="text-primary hover:underline">
              Getting Started
            </Link>{" "}
            setup and have your local development server running.
          </p>
        </CardContent>
      </Card>

      {/* Step 1 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">1</span>
          <h2 className="font-mono text-xl font-semibold">ASSEMBLE_LANDING_PAGE</h2>
        </div>
        <div>
          <p className="text-muted-foreground">
            Fabrk uses a component-driven architecture. Instead of building from scratch,
            compose your landing page using our pre-built, accessible sections.
          </p>
          <p className="text-muted-foreground">
            Update <code className="bg-muted px-1 py-0.5 font-mono">src/app/page.tsx</code>:
          </p>
        </div>
        <CodeBlock language="typescript" code={`import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
}`} />
        <div className="border border-border bg-card p-4">
          <p className="font-mono text-sm text-foreground">
            <strong>&gt; NOTE:</strong> These components are fully responsive, accessible (ARIA compliant),
            and optimized for Core Web Vitals out of the box.
          </p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">2</span>
          <h2 className="font-mono text-xl font-semibold">CUSTOMIZE_CONTENT_BRANDING</h2>
        </div>
        <p className="text-muted-foreground">
          Navigate to <code className="bg-muted px-1 py-0.5 font-mono">src/components/landing/</code> to customize each section.
          The components are built with Tailwind CSS, making them easy to style.
        </p>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li><code className="bg-muted px-1 py-0.5 font-mono">hero-section.tsx</code>: Update the H1, subheadline, and CTA.</li>
          <li><code className="bg-muted px-1 py-0.5 font-mono">features-section.tsx</code>: Highlight your product's unique value proposition.</li>
          <li><code className="bg-muted px-1 py-0.5 font-mono">pricing-section.tsx</code>: Define your pricing tiers (linked to Stripe).</li>
        </ul>
      </div>

      {/* Step 3 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">3</span>
          <h2 className="font-mono text-xl font-semibold">CONFIGURE_APP_METADATA</h2>
        </div>
        <div>
          <p className="text-muted-foreground">
            Fabrk centralizes configuration to avoid hardcoded values scattered across the codebase.
            Open <code className="bg-muted px-1 py-0.5 font-mono">src/config.js</code>:
          </p>
        </div>
        <CodeBlock language="javascript" code={`const config = {
  app: {
    name: "Acme Corp",
    description: "The enterprise solution for...",
    url: process.env.NEXT_PUBLIC_APP_URL,
    author: "Acme Team",
    supportEmail: "support@acme.com",
  },
  // ...
};`} />
      </div>

      {/* Step 4 (Optional) */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">4</span>
          <h2 className="font-mono text-xl font-semibold">ENABLE_LEAD_CAPTURE</h2>
        </div>
        <div>
          <p className="text-muted-foreground">
            If you are launching a "Coming Soon" page, swap the primary CTA for the Waitlist component.
            This saves emails directly to your database.
          </p>
        </div>
        <CodeBlock language="typescript" code={`// In hero-section.tsx
import { WaitlistForm } from "@/components/waitlist-form";

// Replace Button with:
<WaitlistForm />`} />
      </div>

      {/* Step 5 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">5</span>
          <h2 className="font-mono text-xl font-semibold">PRODUCTION_DEPLOYMENT</h2>
        </div>
        <div>
          <p className="text-muted-foreground">
            Fabrk is optimized for Vercel. Deploying is as simple as pushing your code.
          </p>
        </div>
        <CodeBlock language="bash" code={`git add .
git commit -m "Initial MVP release"
git push origin main`} />
        <p className="text-muted-foreground">
          Once connected to Vercel, your site will be live with automatic SSL, edge caching, and CI/CD.
        </p>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/authentication">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Setup Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Configure Google OAuth and secure sessions
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/features/payments">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Configure Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Connect Stripe for subscriptions
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
