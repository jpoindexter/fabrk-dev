import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Subscription Guide - Fabrk Docs",
  description: "Build a complete subscription system with Stripe. Checkout, billing portal, plan upgrades, and webhook handling.",
};

export default function StripePaymentsTutorialPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x30] TUTORIALS ] STRIPE_PAYMENTS</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">STRIPE_PAYMENTS</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Set up one-time payments and subscriptions with Stripe.
        </p>
      </div>

      {/* Setup */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground font-mono">1</span>
          <h2 className="font-mono text-lg font-bold">CONFIGURE_STRIPE</h2>
        </div>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Add your Stripe API keys to <code className="bg-muted px-1 font-mono text-xs">.env.local</code>:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Get from https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."`} />
        </div>
      </div>

      {/* Create Product */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground font-mono">2</span>
          <h2 className="font-mono text-lg font-bold">CREATE_A_PRODUCT</h2>
        </div>
        <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
          <div>├─ Go to{" "}
            <a
              href="https://dashboard.stripe.com/test/products"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stripe Dashboard → Products
            </a>
          </div>
          <div>├─ Click &quot;Add product&quot;</div>
          <div>├─ Enter name, description, and price</div>
          <div>├─ Choose &quot;One time&quot; or &quot;Recurring&quot;</div>
          <div>└─ Copy the Price ID</div>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# .env.local
NEXT_PUBLIC_STRIPE_PRICE_FABRK="price_your_price_id"`} />
        </div>
      </div>

      {/* Checkout Button */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground font-mono">3</span>
          <h2 className="font-mono text-lg font-bold">CREATE_CHECKOUT_BUTTON</h2>
        </div>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Use the checkout API to create a payment session:
        </p>
        <div className="[&>div]:rounded-none">
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
      </div>

      {/* Webhooks */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground font-mono">4</span>
          <h2 className="font-mono text-lg font-bold">SET_UP_WEBHOOKS</h2>
        </div>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Webhooks handle payment confirmations. For local development:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe`} />
        </div>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          For production, add your webhook endpoint in the Stripe Dashboard:
        </p>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="text" code={`https://yourdomain.com/api/webhooks/stripe`} />
        </div>
      </div>

      {/* Webhook Events */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground font-mono">5</span>
          <h2 className="font-mono text-lg font-bold">HANDLE_WEBHOOK_EVENTS</h2>
        </div>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          The webhook handler is at{" "}
          <code className="bg-muted px-1 font-mono text-xs">src/app/api/webhooks/stripe/route.ts</code>.
          Key events handled:
        </p>
        <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">checkout.session.completed</code> - Payment successful</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">customer.subscription.created</code> - New subscription</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">customer.subscription.updated</code> - Subscription changed</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">customer.subscription.deleted</code> - Subscription cancelled</div>
          <div>└─ <code className="bg-muted px-1 font-mono text-xs">invoice.payment_failed</code> - Payment failed</div>
        </div>
      </div>

      {/* Coupons */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground font-mono">6</span>
          <h2 className="font-mono text-lg font-bold">PROMOTION_CODES</h2>
        </div>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Configure promotion codes in <code className="bg-muted px-1 font-mono text-xs">src/config.js</code>:
        </p>
        <div className="[&>div]:rounded-none">
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
      </div>

      {/* Test Cards */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">TEST_CARDS</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Use these test cards in development:
        </p>
        <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">4242 4242 4242 4242</code> - Successful payment</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">4000 0000 0000 0002</code> - Declined</div>
          <div>└─ <code className="bg-muted px-1 font-mono text-xs">4000 0000 0000 3220</code> - Requires 3D Secure</div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/payments">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-xs font-semibold">PAYMENTS_FEATURE_GUIDE</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Advanced payment features and configuration
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/webhooks">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-xs font-semibold">WEBHOOKS_SETUP</h3>
                <p className="font-mono text-xs text-muted-foreground">
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
