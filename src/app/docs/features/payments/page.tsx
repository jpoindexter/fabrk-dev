import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Payments</h1>
        <p className="text-lg text-muted-foreground">
          Accept payments and manage subscriptions with Stripe.
        </p>
      </div>

      {/* What Are Payments - Plain English */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">How Payments Work in Your SaaS</h2>
          <p className="text-muted-foreground">
            When someone buys your product, several things happen behind the scenes. Fabrk uses
            Stripe to handle all of this securely:
          </p>
          <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
            <li><strong>Customer clicks &quot;Buy&quot;</strong> - They&apos;re sent to a Stripe checkout page</li>
            <li><strong>They enter payment info</strong> - Stripe handles this (you never see their card number)</li>
            <li><strong>Stripe charges the card</strong> - Money goes to your Stripe account</li>
            <li><strong>Stripe tells your app</strong> - Via a &quot;webhook&quot; notification</li>
            <li><strong>Your app grants access</strong> - User can now use premium features</li>
          </ol>
          <p className="text-muted-foreground">
            The key benefit: You never handle sensitive credit card data. Stripe is PCI compliant
            and handles all the security complexity.
          </p>
        </CardContent>
      </Card>

      {/* Why You Need This */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Why Stripe?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">For You</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>No need to handle credit card security</li>
                <li>Instant access to payment data/analytics</li>
                <li>Automatic invoices and receipts</li>
                <li>Built-in fraud protection</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">For Your Customers</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Trusted, familiar checkout experience</li>
                <li>Apple Pay, Google Pay support</li>
                <li>Self-serve subscription management</li>
                <li>Easy refund process</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Included */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">What&apos;s Built-In</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">One-Time Payments</h3>
              <p className="text-sm text-muted-foreground">
                Sell lifetime access or single products. Customer pays once, gets access forever.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Subscriptions</h3>
              <p className="text-sm text-muted-foreground">
                Monthly or yearly recurring payments. Automatic billing and renewal.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Free Trials</h3>
              <p className="text-sm text-muted-foreground">
                Let users try before they buy. Converts to paid at trial end.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Customer Portal</h3>
              <p className="text-sm text-muted-foreground">
                Users manage their own billing - update card, change plan, cancel.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Webhook Handling</h3>
              <p className="text-sm text-muted-foreground">
                Your app reacts to payment events in real-time.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">Duplicate Protection</h3>
              <p className="text-sm text-muted-foreground">
                Prevents accidental double charges from page refreshes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Understanding Webhooks */}
      <Card className="bg-muted/50">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Understanding Webhooks</h2>
          <p className="text-muted-foreground">
            <strong>Think of webhooks like a doorbell.</strong> When Stripe processes a payment,
            it &quot;rings your doorbell&quot; (sends a webhook) to let you know something happened.
            Your app answers the door and takes appropriate action.
          </p>
          <p className="text-muted-foreground">
            Without webhooks, you&apos;d have to constantly ask Stripe &quot;did anyone pay yet?&quot; -
            which is inefficient and slow. With webhooks, Stripe tells you instantly.
          </p>
          <p className="text-sm text-muted-foreground">
            Common webhook events: <code className="rounded bg-background px-1">checkout.session.completed</code> (someone paid),
            <code className="rounded bg-background px-1 ml-1">customer.subscription.deleted</code> (someone cancelled),
            <code className="rounded bg-background px-1 ml-1">invoice.payment_failed</code> (payment didn&apos;t go through).
          </p>
        </CardContent>
      </Card>

      {/* Quick Setup */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">Quick Setup</h2>
          <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            10 minutes
          </span>
        </div>
        <p className="text-muted-foreground">
          Get Stripe working in your app with these steps:
        </p>

        {/* Step 1 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              1
            </span>
            <h3 className="font-semibold">Create a Stripe Account</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Go to <a href="https://dashboard.stripe.com/register" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">stripe.com</a> and
            create an account. It&apos;s free to sign up. You won&apos;t pay anything until you process real payments.
          </p>
        </div>

        {/* Step 2 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              2
            </span>
            <h3 className="font-semibold">Get Your API Keys</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            In the Stripe Dashboard, go to &quot;Developers&quot; → &quot;API keys&quot;. Copy your test keys (we&apos;ll use live keys later).
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            <strong>Important:</strong> Test keys start with <code className="rounded bg-muted px-1">sk_test_</code> and <code className="rounded bg-muted px-1">pk_test_</code>.
            Live keys start with <code className="rounded bg-muted px-1">sk_live_</code> and <code className="rounded bg-muted px-1">pk_live_</code>.
          </p>
        </div>

        {/* Step 3 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              3
            </span>
            <h3 className="font-semibold">Create Products in Stripe</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Go to &quot;Products&quot; in Stripe Dashboard. Create products for each pricing tier (e.g., Starter, Pro, Enterprise).
            Each product has a &quot;price ID&quot; that looks like <code className="rounded bg-muted px-1">price_1234567890</code>.
          </p>
        </div>

        {/* Step 4 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              4
            </span>
            <h3 className="font-semibold">Add Keys to Your App</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Add these to your <code className="rounded bg-muted px-1">.env.local</code> file:
          </p>
          <CodeBlock language="bash" code={`# Stripe API Keys (test mode)
STRIPE_SECRET_KEY="sk_test_your_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"

# Price IDs from your Stripe products
NEXT_PUBLIC_STRIPE_PRICE_STARTER="price_your_starter_price"
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL="price_your_pro_price"
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE="price_your_enterprise_price"`} />
        </div>

        {/* Step 5 */}
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              5
            </span>
            <h3 className="font-semibold">Set Up Webhooks (Local Testing)</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Install the Stripe CLI to test webhooks locally:
          </p>
          <CodeBlock language="bash" code={`# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to your local app
npm run stripe:listen`} />
          <p className="text-sm text-muted-foreground mt-2">
            This gives you a webhook secret starting with <code className="rounded bg-muted px-1">whsec_</code>.
            Add it to your <code className="rounded bg-muted px-1">.env.local</code>:
          </p>
          <CodeBlock language="bash" code={`STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"`} />
        </div>
      </div>

      {/* Testing Payments */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Testing Payments</h2>
        <p className="text-muted-foreground">
          Always test payments before going live. Stripe provides test card numbers that simulate
          different scenarios without charging real money.
        </p>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Test Card Numbers</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Successful payment</span>
                <code className="rounded bg-muted px-2">4242 4242 4242 4242</code>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Card declined</span>
                <code className="rounded bg-muted px-2">4000 0000 0000 0002</code>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Requires authentication</span>
                <code className="rounded bg-muted px-2">4000 0025 0000 3155</code>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Insufficient funds</span>
                <code className="rounded bg-muted px-2">4000 0000 0000 9995</code>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Use any future expiration date, any 3-digit CVC, and any billing ZIP code.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Code Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Code Reference</h2>
        <p className="text-muted-foreground">
          Here&apos;s how to trigger checkout from your code:
        </p>

        <div className="space-y-2">
          <h3 className="font-semibold">Checkout Button Component</h3>
          <p className="text-sm text-muted-foreground">
            Add this to any pricing card or button:
          </p>
          <CodeBlock language="tsx" code={`"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CheckoutButton({ priceId, planName }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Call your checkout API
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const { url, error } = await response.json();

      if (error) {
        alert(error);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading}>
      {loading ? "Loading..." : \`Get \${planName}\`}
    </Button>
  );
}`} />
        </div>

        <div className="space-y-2 mt-6">
          <h3 className="font-semibold">Customer Portal Link</h3>
          <p className="text-sm text-muted-foreground">
            Let users manage their own subscription:
          </p>
          <CodeBlock language="tsx" code={`"use client";

import { Button } from "@/components/ui/button";

export function ManageBillingButton() {
  const handlePortal = async () => {
    const response = await fetch("/api/stripe/portal", {
      method: "POST",
    });

    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <Button variant="outline" onClick={handlePortal}>
      Manage Billing
    </Button>
  );
}`} />
        </div>
      </div>

      {/* Common Questions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-3">
          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              How much does Stripe charge?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                Standard pricing is 2.9% + 30 cents per successful transaction. For example,
                a $100 payment costs you $3.20. There are no monthly fees.
              </p>
            </div>
          </details>

          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              When do I get my money?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                By default, Stripe sends payouts to your bank account on a 2-day rolling basis.
                You can change this to daily or weekly in your Stripe settings.
              </p>
            </div>
          </details>

          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              What happens if a payment fails?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                Stripe automatically retries failed subscription payments up to 4 times over
                a few weeks. You&apos;ll receive webhook events to handle access accordingly.
              </p>
            </div>
          </details>

          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              How do I handle refunds?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                Issue refunds directly from the Stripe Dashboard. Go to the payment, click
                &quot;Refund&quot;, and enter the amount. Stripe sends a webhook so you can revoke access.
              </p>
            </div>
          </details>

          <details className="rounded-lg border">
            <summary className="cursor-pointer p-4 font-medium">
              Can customers pay in different currencies?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                Yes! Stripe supports 135+ currencies. You can create prices in different currencies
                or let Stripe auto-convert based on the customer&apos;s location.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Going Live */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Going Live Checklist</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4">
              Before accepting real payments:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <input type="checkbox" className="rounded" readOnly />
                <span>Switch to live API keys (sk_live_, pk_live_)</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="rounded" readOnly />
                <span>Create webhook endpoint in Stripe Dashboard (not CLI)</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="rounded" readOnly />
                <span>Add production webhook secret to your hosting provider</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="rounded" readOnly />
                <span>Test a real $1 transaction and refund it</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="rounded" readOnly />
                <span>Enable Stripe Radar for fraud protection</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="rounded" readOnly />
                <span>Set up email receipts in Stripe settings</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/trial">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Free Trials</h3>
                <p className="text-sm text-muted-foreground">
                  Let users try your product before paying with trial periods.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/features/emails">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Transactional Emails</h3>
                <p className="text-sm text-muted-foreground">
                  Send purchase confirmations and invoices to customers.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Back to docs link */}
      <div className="pt-4">
        <Link href="/docs" className="text-primary hover:underline">
          ← Back to Documentation
        </Link>
      </div>
    </div>
  );
}
