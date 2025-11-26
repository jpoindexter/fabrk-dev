import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function StripePaymentsTutorialPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Stripe Payments</h1>
        <p className="text-lg text-muted-foreground">
          Set up one-time payments and subscriptions with Stripe.
        </p>
      </div>

      {/* Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Configure Stripe</h2>
        <p className="text-muted-foreground">
          Add your Stripe API keys to <code className="rounded bg-muted px-1 py-0.5">.env.local</code>:
        </p>
        <Card>
          <CardContent className="p-4">
            <pre className="overflow-x-auto text-sm text-foreground">
              <code>{`# Get from https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Create Product */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Create a Product</h2>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
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
          <li>Click "Add product"</li>
          <li>Enter name, description, and price</li>
          <li>Choose "One time" or "Recurring"</li>
          <li>Copy the Price ID</li>
        </ol>
        <Card>
          <CardContent className="p-4">
            <pre className="overflow-x-auto text-sm text-foreground">
              <code>{`# .env.local
NEXT_PUBLIC_STRIPE_PRICE_FABRK="price_your_price_id"`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Checkout Button */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Create Checkout Button</h2>
        <p className="text-muted-foreground">
          Use the checkout API to create a payment session:
        </p>
        <Card>
          <CardContent className="p-4">
            <pre className="overflow-x-auto text-sm text-foreground">
              <code>{`"use client";

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
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Webhooks */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Set Up Webhooks</h2>
        <p className="text-muted-foreground">
          Webhooks handle payment confirmations. For local development:
        </p>
        <Card>
          <CardContent className="p-4">
            <pre className="overflow-x-auto text-sm text-foreground">
              <code>{`# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe`}</code>
            </pre>
          </CardContent>
        </Card>
        <p className="text-muted-foreground">
          For production, add your webhook endpoint in the Stripe Dashboard:
        </p>
        <Card>
          <CardContent className="p-4">
            <pre className="overflow-x-auto text-sm text-foreground">
              <code>https://yourdomain.com/api/webhooks/stripe</code>
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Webhook Events */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Handle Webhook Events</h2>
        <p className="text-muted-foreground">
          The webhook handler is at{" "}
          <code className="rounded bg-muted px-1 py-0.5">src/app/api/webhooks/stripe/route.ts</code>.
          Key events handled:
        </p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li><code className="rounded bg-muted px-1 py-0.5">checkout.session.completed</code> - Payment successful</li>
          <li><code className="rounded bg-muted px-1 py-0.5">customer.subscription.created</code> - New subscription</li>
          <li><code className="rounded bg-muted px-1 py-0.5">customer.subscription.updated</code> - Subscription changed</li>
          <li><code className="rounded bg-muted px-1 py-0.5">customer.subscription.deleted</code> - Subscription cancelled</li>
          <li><code className="rounded bg-muted px-1 py-0.5">invoice.payment_failed</code> - Payment failed</li>
        </ul>
      </div>

      {/* Coupons */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Promotion Codes</h2>
        <p className="text-muted-foreground">
          Configure promotion codes in <code className="rounded bg-muted px-1 py-0.5">src/config.js</code>:
        </p>
        <Card>
          <CardContent className="p-4">
            <pre className="overflow-x-auto text-sm text-foreground">
              <code>{`// src/config.js
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
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Test Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Test Cards</h2>
        <p className="text-muted-foreground">
          Use these test cards in development:
        </p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li><code className="rounded bg-muted px-1 py-0.5">4242 4242 4242 4242</code> - Successful payment</li>
          <li><code className="rounded bg-muted px-1 py-0.5">4000 0000 0000 0002</code> - Declined</li>
          <li><code className="rounded bg-muted px-1 py-0.5">4000 0000 0000 3220</code> - Requires 3D Secure</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/payments">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Payments Feature Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced payment features and configuration
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/webhooks">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Webhooks Setup</h3>
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
