import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard, DocsCallout } from "@/components/docs";
import { docsTypography, docsSpacing } from "@/components/docs";
import Link from "next/link";
import { CreditCard, RefreshCw, Clock, Users, Bell, Shield } from "lucide-react";

export const metadata = {
  title: "Stripe Payments - Fabrk Docs",
  description: "Accept payments with Stripe. Set up subscriptions, one-time payments, webhooks, and customer portal integration.",
};

export default function PaymentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x30]"
      category="Features"
      title="Stripe_Payments"
      description="Accept payments and manage subscriptions with Stripe."
      overview="When someone buys your product, Fabrk uses Stripe to handle everything securely. Customer clicks Buy, enters payment info on Stripe's checkout page (you never see their card number), Stripe charges the card and notifies your app via webhook, then your app grants access. The key benefit: You never handle sensitive credit card data. Stripe is PCI compliant and handles all the security complexity."
      features={[
        { icon: CreditCard, title: "One-Time Payments", description: "Sell lifetime access or single products. Customer pays once, gets access forever." },
        { icon: RefreshCw, title: "Subscriptions", description: "Monthly or yearly recurring payments. Automatic billing and renewal." },
        { icon: Clock, title: "Free Trials", description: "Let users try before they buy. Converts to paid at trial end." },
        { icon: Users, title: "Customer Portal", description: "Users manage their own billing - update card, change plan, cancel." },
        { icon: Bell, title: "Webhook Handling", description: "Your app reacts to payment events in real-time." },
        { icon: Shield, title: "Duplicate Protection", description: "Prevents accidental double charges from page refreshes." },
      ]}
      setup={[
        {
          title: "Create Stripe Account",
          description: "Go to stripe.com and create an account. It's free to sign up. You won't pay anything until you process real payments.",
        },
        {
          title: "Get API Keys",
          description: "In the Stripe Dashboard, go to Developers → API keys. Copy your test keys. Test keys start with sk_test_ and pk_test_. Live keys start with sk_live_ and pk_live_.",
        },
        {
          title: "Create Products",
          description: "Go to Products in Stripe Dashboard. Create products for each pricing tier (e.g., Starter, Pro, Enterprise). Each product has a price ID like price_1234567890.",
        },
        {
          title: "Add Keys to App",
          description: "Add these to your .env.local file",
          code: `# Stripe API Keys (test mode)
STRIPE_SECRET_KEY="sk_test_your_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"

# Price IDs from your Stripe products
NEXT_PUBLIC_STRIPE_PRICE_STARTER="price_your_starter_price"
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL="price_your_pro_price"
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE="price_your_enterprise_price"`,
          language: "bash",
        },
        {
          title: "Setup Webhooks",
          description: "Install the Stripe CLI to test webhooks locally. This gives you a webhook secret starting with whsec_.",
          code: `# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to your local app
npm run stripe:listen`,
          language: "bash",
          tip: "Add STRIPE_WEBHOOK_SECRET=\"whsec_your_webhook_secret\" to your .env.local",
        },
      ]}
      usage={[
        {
          title: "Checkout Button Component",
          description: "Add this to any pricing card or button",
          code: `"use client";

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
}`,
          language: "tsx",
        },
        {
          title: "Customer Portal Link",
          description: "Let users manage their own subscription",
          code: `"use client";

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
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Database", href: "/docs/features/database" }}
      next={{ title: "Google OAuth", href: "/docs/features/google-oauth" }}
    >
      {/* Why Stripe Section */}
      <DocsSection title="Why Stripe">
        <DocsCard title="WHY_STRIPE">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className={`uppercase ${docsTypography.h4}`}>For You</h3>
              <ul className={`${docsTypography.body} space-y-1`}>
                <li>• No need to handle credit card security</li>
                <li>• Instant access to payment data/analytics</li>
                <li>• Automatic invoices and receipts</li>
                <li>• Built-in fraud protection</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className={`uppercase ${docsTypography.h4}`}>For Your Customers</h3>
              <ul className={`${docsTypography.body} space-y-1`}>
                <li>• Trusted, familiar checkout experience</li>
                <li>• Apple Pay, Google Pay support</li>
                <li>• Self-serve subscription management</li>
                <li>• Easy refund process</li>
              </ul>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Understanding Webhooks */}
      <DocsSection title="Understanding Webhooks">
        <DocsCallout variant="info" title="Think of webhooks like a doorbell">
          When Stripe processes a payment, it &quot;rings your doorbell&quot; (sends a webhook) to let you know something happened. Your app answers the door and takes appropriate action. Without webhooks, you&apos;d have to constantly ask Stripe &quot;did anyone pay yet?&quot; - which is inefficient and slow. With webhooks, Stripe tells you instantly.
        </DocsCallout>
        <DocsCard title="WEBHOOK_EVENTS">
          <p className={docsTypography.body}>
            Common webhook events: <code className={docsTypography.code}>checkout.session.completed</code> (someone paid),
            <code className={`${docsTypography.code} ml-1`}>customer.subscription.deleted</code> (someone cancelled),
            <code className={`${docsTypography.code} ml-1`}>invoice.payment_failed</code> (payment didn&apos;t go through).
          </p>
        </DocsCard>
      </DocsSection>

      {/* Testing Payments */}
      <DocsSection title="Testing Payments">
        <DocsCard title="TEST_CARDS">
          <p className={docsTypography.body}>
            Always test payments before going live. Stripe provides test card numbers that simulate different scenarios without charging real money.
          </p>
          <h3 className={`uppercase ${docsTypography.h4} mt-4`}>Test Card Numbers</h3>
          <div className="space-y-2 text-sm mt-2">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Successful payment</span>
              <code className={docsTypography.code}>4242 4242 4242 4242</code>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Card declined</span>
              <code className={docsTypography.code}>4000 0000 0000 0002</code>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Requires authentication</span>
              <code className={docsTypography.code}>4000 0025 0000 3155</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Insufficient funds</span>
              <code className={docsTypography.code}>4000 0000 0000 9995</code>
            </div>
          </div>
          <p className={`${docsTypography.caption} mt-4`}>
            Use any future expiration date, any 3-digit CVC, and any billing ZIP code.
          </p>
        </DocsCard>
      </DocsSection>

      {/* Common Questions */}
      <DocsSection title="Common Questions">
        <div className={docsSpacing.sectionItems}>
          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              How much does Stripe charge?
            </summary>
            <div className="border-t border-border p-4 text-sm text-muted-foreground">
              Standard pricing is 2.9% + 30 cents per successful transaction. For example, a $100 payment costs you $3.20. There are no monthly fees.
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              When do I get my money?
            </summary>
            <div className="border-t border-border p-4 text-sm text-muted-foreground">
              By default, Stripe sends payouts to your bank account on a 2-day rolling basis. You can change this to daily or weekly in your Stripe settings.
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              What happens if a payment fails?
            </summary>
            <div className="border-t border-border p-4 text-sm text-muted-foreground">
              Stripe automatically retries failed subscription payments up to 4 times over a few weeks. You&apos;ll receive webhook events to handle access accordingly.
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              How do I handle refunds?
            </summary>
            <div className="border-t border-border p-4 text-sm text-muted-foreground">
              Issue refunds directly from the Stripe Dashboard. Go to the payment, click &quot;Refund&quot;, and enter the amount. Stripe sends a webhook so you can revoke access.
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              Can customers pay in different currencies?
            </summary>
            <div className="border-t border-border p-4 text-sm text-muted-foreground">
              Yes! Stripe supports 135+ currencies. You can create prices in different currencies or let Stripe auto-convert based on the customer&apos;s location.
            </div>
          </details>
        </div>
      </DocsSection>

      {/* Going Live Checklist */}
      <DocsSection title="Going Live Checklist">
        <DocsCard title="GOING_LIVE">
          <p className={`${docsTypography.body} mb-4`}>Before accepting real payments:</p>
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
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/trial">
            <DocsCard title="FREE_TRIALS" className="h-full transition-all hover:border-primary/50">
              <h3 className={`uppercase ${docsTypography.h4}`}>Free Trials</h3>
              <p className={docsTypography.body}>
                Let users try your product before paying with trial periods.
              </p>
            </DocsCard>
          </Link>
          <Link href="/docs/features/emails">
            <DocsCard title="TRANSACTIONAL_EMAILS" className="h-full transition-all hover:border-primary/50">
              <p className={docsTypography.body}>
                Send purchase confirmations and invoices to customers.
              </p>
            </DocsCard>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
