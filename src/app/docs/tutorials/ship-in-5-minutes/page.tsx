import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export default function ShipIn5MinutesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Ship in 5 Minutes</h1>
        <p className="text-lg text-muted-foreground">
          Launch your first feature with Fabrk in under 5 minutes.
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
        <h2 className="text-2xl font-semibold">1. Update Your App Name</h2>
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

      {/* Step 2 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Configure Stripe</h2>
        <p className="text-muted-foreground">
          Set up your payment product in Stripe and update the price ID:
        </p>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          <li>Go to <a href="https://dashboard.stripe.com/test/products" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Stripe Dashboard → Products</a></li>
          <li>Create a new product with your price</li>
          <li>Copy the Price ID (starts with <code className="rounded bg-muted px-1 py-0.5">price_</code>)</li>
          <li>Update <code className="rounded bg-muted px-1 py-0.5">.env.local</code>:</li>
        </ol>
        <CodeBlock language="bash" code={`NEXT_PUBLIC_STRIPE_PRICE_FABRK="price_your_price_id_here"`} />
      </div>

      {/* Step 3 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Set Up Stripe Webhooks</h2>
        <p className="text-muted-foreground">
          For local development, use the Stripe CLI to forward webhooks:
        </p>
        <CodeBlock language="bash" code={`# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe`} />
        <p className="text-muted-foreground">
          Copy the webhook signing secret and add to <code className="rounded bg-muted px-1 py-0.5">.env.local</code>:
        </p>
        <CodeBlock language="bash" code={`STRIPE_WEBHOOK_SECRET="whsec_your_secret_here"`} />
      </div>

      {/* Step 4 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Test the Purchase Flow</h2>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          <li>Go to <a href="http://localhost:3000" className="text-primary hover:underline" target="_blank">localhost:3000</a></li>
          <li>Click "Get Started" or your CTA button</li>
          <li>Use Stripe test card: <code className="rounded bg-muted px-1 py-0.5">4242 4242 4242 4242</code></li>
          <li>Complete checkout</li>
          <li>You should be redirected to the success page!</li>
        </ol>
      </div>

      {/* Step 5 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Customize the Landing Page</h2>
        <p className="text-muted-foreground">
          Edit the landing page sections in <code className="rounded bg-muted px-1 py-0.5">src/app/page.tsx</code>:
        </p>
        <CodeBlock language="typescript" code={`// Update hero text, features, pricing, testimonials
// Each section is a separate component in src/components/landing/

import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
// ...`} />
      </div>

      {/* You're Done */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">You're Ready to Ship!</h3>
          <p className="text-muted-foreground">
            Your SaaS is now configured with payments. Next, deploy to Vercel to go live.
          </p>
          <div className="mt-4">
            <Link
              href="/docs/deployment/vercel"
              className="text-primary hover:underline"
            >
              Deploy to Vercel →
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/authentication">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">User Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Set up Google OAuth and email/password auth
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/features/emails">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Email Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Customize transactional emails with Resend
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
