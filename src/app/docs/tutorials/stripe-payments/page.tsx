import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Subscription Guide - Fabrk Docs",
  description: "Build a complete subscription system with Stripe. Checkout, billing portal, plan upgrades, and webhook handling.",
};

export default function StripePaymentsTutorialPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x30] TUTORIALS ] STRIPE_PAYMENTS</span>
        </div>
        <h1 className="font-mono text-3xl font-bold tracking-tight">STRIPE_PAYMENTS</h1>
        <p className="font-mono text-sm text-muted-foreground">
          &gt; Set up one-time payments and subscriptions with Stripe.
        </p>
      </div>

      {/* Setup */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground font-mono">1</span>
          <h2 className="font-mono text-xl font-semibold">CONFIGURE_STRIPE</h2>
        </div>
        <p className="text-muted-foreground">
          Add your Stripe API keys to <code className="bg-muted px-1 py-0.5 font-mono">.env.local</code>:
        </p>
        <CodeBlock language="bash" code={`# Get from https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."`} />
      </div>

      {/* Create Product */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground font-mono">2</span>
          <h2 className="font-mono text-xl font-semibold">CREATE_A_PRODUCT</h2>
        </div>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
          <li>
            Go to{" "}
            <a
              href="https://dashboard.stripe.com/test/products"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stripe Dashboard → Products
            </a>
          </li>
          <li>Click &quot;Add product&quot;</li>
          <li>Enter name, description, and price</li>
          <li>Choose &quot;One time&quot; or &quot;Recurring&quot;</li>
          <li>Copy the Price ID</li>
        </ol>
        <CodeBlock language="bash" code={`# .env.local
NEXT_PUBLIC_STRIPE_PRICE_FABRK="price_your_price_id"`} />
      </div>

      {/* Checkout Button */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground font-mono">3</span>
          <h2 className="font-mono text-xl font-semibold">CREATE_CHECKOUT_BUTTON</h2>
        </div>
        <p className="text-muted-foreground">
          Use the checkout API to create a payment session:
        </p>
        <CodeBlock language="tsx" code={`"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_FABRK,
        }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading}>
      {loading ? "Loading..." : "Buy Now"}
    </Button>
  );
}`} />
      </div>

      {/* Webhooks */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground font-mono">4</span>
          <h2 className="font-mono text-xl font-semibold">SET_UP_WEBHOOKS</h2>
        </div>
        <p className="text-muted-foreground">
          Webhooks handle payment confirmations. For local development:
        </p>
        <CodeBlock language="bash" code={`# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe`} />
        <p className="text-muted-foreground">
          For production, add your webhook endpoint in the Stripe Dashboard:
        </p>
        <CodeBlock language="text" code={`https://yourdomain.com/api/webhooks/stripe`} />
      </div>

      {/* Webhook Events */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground font-mono">5</span>
          <h2 className="font-mono text-xl font-semibold">HANDLE_WEBHOOK_EVENTS</h2>
        </div>
        <p className="text-muted-foreground">
          The webhook handler is at{" "}
          <code className="bg-muted px-1 py-0.5 font-mono">src/app/api/webhooks/stripe/route.ts</code>.
          Key events handled:
        </p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li><code className="bg-muted px-1 py-0.5 font-mono">checkout.session.completed</code> - Payment successful</li>
          <li><code className="bg-muted px-1 py-0.5 font-mono">customer.subscription.created</code> - New subscription</li>
          <li><code className="bg-muted px-1 py-0.5 font-mono">customer.subscription.updated</code> - Subscription changed</li>
          <li><code className="bg-muted px-1 py-0.5 font-mono">customer.subscription.deleted</code> - Subscription cancelled</li>
          <li><code className="bg-muted px-1 py-0.5 font-mono">invoice.payment_failed</code> - Payment failed</li>
        </ul>
      </div>

      {/* Coupons */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground font-mono">6</span>
          <h2 className="font-mono text-xl font-semibold">PROMOTION_CODES</h2>
        </div>
        <p className="text-muted-foreground">
          Configure promotion codes in <code className="bg-muted px-1 py-0.5 font-mono">src/config.js</code>:
        </p>
        <CodeBlock language="javascript" code={`// src/config.js
stripe: {
  coupons: {
    earlyAdopter: {
      enabled: true,
      code: "EARLY500",
      promotionCodeId: process.env.STRIPE_COUPON_EARLY_ADOPTER,
      discountAmount: 100,
      // ...
    },
  },
}`} />
      </div>

      {/* Test Cards */}
      <div className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">TEST_CARDS</h2>
        <p className="text-muted-foreground">
          Use these test cards in development:
        </p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li><code className="bg-muted px-1 py-0.5 font-mono">4242 4242 4242 4242</code> - Successful payment</li>
          <li><code className="bg-muted px-1 py-0.5 font-mono">4000 0000 0000 0002</code> - Declined</li>
          <li><code className="bg-muted px-1 py-0.5 font-mono">4000 0000 0000 3220</code> - Requires 3D Secure</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/payments">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-mono font-semibold">PAYMENTS_FEATURE_GUIDE</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced payment features and configuration
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/webhooks">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-mono font-semibold">WEBHOOKS_SETUP</h3>
                <p className="text-sm text-muted-foreground">
                  Handle all webhook events
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
