import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export default function PaymentsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline text-sm">
          ← Back to Documentation
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Stripe Payments</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Complete payment integration with Stripe Checkout, subscriptions, one-time payments, and webhook handling.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">
              Fabrk includes a production-ready Stripe integration with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Stripe Checkout for secure payment collection</li>
              <li>Support for both one-time and subscription payments</li>
              <li>Webhook handling with signature verification</li>
              <li>Idempotency protection against duplicate charges</li>
              <li>Customer portal for subscription management</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Configuration</h2>

        <h3 className="text-xl font-medium mb-3">1. Set Stripe Keys</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Add your Stripe keys to <code className="bg-muted px-2 py-1 rounded">.env.local</code>:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`# Stripe API Keys
STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxx"

# Webhook Secret (from Stripe Dashboard → Webhooks)
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxx"

# Price IDs (from Stripe Dashboard → Products)
STRIPE_PRICE_ID_BASIC="price_xxxxxxxxxxxx"
STRIPE_PRICE_ID_PRO="price_xxxxxxxxxxxx"
STRIPE_PRICE_ID_ENTERPRISE="price_xxxxxxxxxxxx"`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">2. Configure Products</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Set up pricing in <code className="bg-muted px-2 py-1 rounded">src/config.js</code>:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`export const config = {
  stripe: {
    mode: "subscription", // or "one-time"
    plans: [
      {
        name: "Basic",
        priceId: process.env.STRIPE_PRICE_ID_BASIC,
        price: 9,
        interval: "month",
        features: ["5 projects", "Basic support", "1GB storage"],
      },
      {
        name: "Pro",
        priceId: process.env.STRIPE_PRICE_ID_PRO,
        price: 29,
        interval: "month",
        features: ["Unlimited projects", "Priority support", "10GB storage"],
        popular: true,
      },
    ],
  },
};`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">3. Set Up Webhooks</h3>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">For local development, forward webhooks:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Forward webhooks to localhost
npm run stripe:listen
# or: stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>

        <h3 className="text-xl font-medium mb-3">Create Checkout Session</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">The checkout API at <code className="bg-muted px-2 py-1 rounded">/api/stripe/checkout</code>:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/app/api/stripe/checkout/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { priceId } = await request.json();

  // Check for existing checkout (idempotency)
  const existing = await prisma.checkoutSession.findFirst({
    where: {
      userId: session.user.id,
      priceId,
      status: "pending",
      expiresAt: { gt: new Date() },
    },
  });

  if (existing) {
    return NextResponse.json({ url: existing.url });
  }

  // Create new Stripe Checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription", // or "payment" for one-time
    success_url: \`\${config.app.url}/billing?success=true\`,
    cancel_url: \`\${config.app.url}/pricing?canceled=true\`,
    metadata: {
      userId: session.user.id,
    },
  });

  // Store for idempotency
  await prisma.checkoutSession.create({
    data: {
      id: checkoutSession.id,
      userId: session.user.id,
      priceId,
      url: checkoutSession.url,
      status: "pending",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Webhook Handler</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Handle Stripe events at <code className="bg-muted px-2 py-1 rounded">/api/webhooks/stripe</code>:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/app/api/webhooks/stripe/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { queueWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.server.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Deduplicate events
  const existing = await prisma.webhookEvent.findUnique({
    where: { eventId: event.id },
  });
  if (existing) {
    return NextResponse.json({ received: true });
  }

  await prisma.webhookEvent.create({
    data: { eventId: event.id, type: event.type },
  });

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata.userId;

      // Create payment record
      await prisma.payment.create({
        data: {
          userId,
          stripeSessionId: session.id,
          stripePriceId: session.line_items?.data[0]?.price?.id,
          amount: session.amount_total,
          currency: session.currency,
          status: "succeeded",
        },
      });

      // Update checkout session status
      await prisma.checkoutSession.update({
        where: { id: session.id },
        data: { status: "completed" },
      });

      // Queue welcome email
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        await queueWelcomeEmail({
          to: user.email,
          name: user.name || "there",
        });
      }
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      // Handle subscription changes
      break;

    case "invoice.payment_failed":
      // Handle failed payments
      break;
  }

  return NextResponse.json({ received: true });
}`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Client-Side Checkout</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Trigger checkout from React components:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PricingCard({ plan }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: plan.priceId }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading}>
      {loading ? "Loading..." : \`Subscribe to \${plan.name}\`}
    </Button>
  );
}`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Customer Portal</h3>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">Allow users to manage subscriptions:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/app/api/stripe/portal/route.ts
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { stripeCustomerId: true },
  });

  if (!user?.stripeCustomerId) {
    return NextResponse.json({ error: "No subscription" }, { status: 400 });
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: \`\${config.app.url}/billing\`,
  });

  return NextResponse.json({ url: portalSession.url });
}`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>

        <div className="grid gap-4">
          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">SaaS Subscriptions</h3>
              <p className="text-muted-foreground">
                Monthly/yearly recurring billing with multiple tiers. Use Stripe's customer portal for plan changes and cancellations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">One-Time Purchases</h3>
              <p className="text-muted-foreground">
                Lifetime deals or single products. Set <code className="bg-muted px-1 rounded">mode: "payment"</code> in checkout session creation.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Free Trials</h3>
              <p className="text-muted-foreground">
                14-day trials with no credit card required. Use <code className="bg-muted px-1 rounded">trial_period_days: 14</code> in subscription creation.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Usage-Based Billing</h3>
              <p className="text-muted-foreground">
                Metered billing based on API calls or storage. Report usage to Stripe and let them calculate invoices.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>Always verify webhook signatures - never trust unverified payloads</li>
              <li>Use idempotency keys to prevent duplicate charges</li>
              <li>Store Stripe customer IDs for repeat purchases</li>
              <li>Handle all webhook event types you care about</li>
              <li>Test with Stripe CLI before deploying</li>
              <li>Use test mode keys during development</li>
              <li>Enable Stripe Radar for fraud protection</li>
              <li>Set up email receipts in Stripe Dashboard</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
