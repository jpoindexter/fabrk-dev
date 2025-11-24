import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export default function ShipIn5MinutesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Ship in 5 Minutes</h1>
        <p className="text-lg text-muted-foreground">
          Launch a startup landing page with email collection in under 5 minutes.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            This tutorial assumes you've completed the{" "}
            <Link href="/docs/getting-started" className="text-primary hover:underline">
              Getting Started
            </Link>{" "}
            guide and have your dev server running.
          </p>
        </CardContent>
      </Card>

      {/* Step 1 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Build Your Landing Page</h2>
        <p className="text-muted-foreground">
          Replace the contents of <code className="rounded bg-muted px-1 py-0.5">src/app/page.tsx</code> with
          our pre-built components:
        </p>
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
        <p className="text-muted-foreground">
          That's it! You now have a complete landing page with hero, features, pricing, and FAQ sections.
        </p>
      </div>

      {/* Step 2 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Customize Your Copy</h2>
        <p className="text-muted-foreground">
          Edit each component to match your business. Each section is in{" "}
          <code className="rounded bg-muted px-1 py-0.5">src/components/landing/</code>:
        </p>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li><code className="rounded bg-muted px-1 py-0.5">hero-section.tsx</code> - Main headline and CTA</li>
          <li><code className="rounded bg-muted px-1 py-0.5">features-section.tsx</code> - Feature list with icons</li>
          <li><code className="rounded bg-muted px-1 py-0.5">pricing-section.tsx</code> - Pricing tiers</li>
          <li><code className="rounded bg-muted px-1 py-0.5">faq-section.tsx</code> - Common questions</li>
        </ul>
        <p className="text-muted-foreground">
          Tip: Focus on the problem you solve and the benefits, not features.
        </p>
      </div>

      {/* Step 3 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Update App Info</h2>
        <p className="text-muted-foreground">
          Open <code className="rounded bg-muted px-1 py-0.5">src/config.js</code> and update
          your app information:
        </p>
        <CodeBlock language="javascript" code={`const config = {
  app: {
    name: "Your SaaS Name",
    description: "Your app description",
    url: process.env.NEXT_PUBLIC_APP_URL,
    author: "Your Name",
    supportEmail: "support@yourdomain.com",
  },
  // ...
};`} />
      </div>

      {/* Step 4 (Optional) */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Add Email Collection (Optional)</h2>
        <p className="text-muted-foreground">
          Want to collect emails before your product launches? Add the waitlist component to your hero:
        </p>
        <CodeBlock language="typescript" code={`// In hero-section.tsx, add email collection
import { WaitlistForm } from "@/components/waitlist-form";

// Replace the CTA button with:
<WaitlistForm />

// Or keep both:
<div className="flex flex-col gap-4 sm:flex-row">
  <WaitlistForm />
  <Button variant="outline">Learn More</Button>
</div>`} />
        <p className="text-muted-foreground">
          Emails are stored in your database. Set up the database following the{" "}
          <Link href="/docs/getting-started" className="text-primary hover:underline">
            Getting Started
          </Link>{" "}
          guide.
        </p>
      </div>

      {/* Step 5 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Deploy</h2>
        <p className="text-muted-foreground">
          Push to GitHub and deploy to Vercel in one click:
        </p>
        <CodeBlock language="bash" code={`git add .
git commit -m "Initial landing page"
git push origin main`} />
        <p className="text-muted-foreground">
          Then connect your repo at{" "}
          <a href="https://vercel.com/new" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            vercel.com/new
          </a>{" "}
          and deploy.
        </p>
      </div>

      {/* You're Done */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">You're Live!</h3>
          <p className="text-muted-foreground">
            Your landing page is deployed and ready to collect leads or customers.
          </p>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/authentication">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Add Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Set up Google OAuth and email/password login
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/features/payments">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Add Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Configure Stripe for one-time or subscription payments
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
