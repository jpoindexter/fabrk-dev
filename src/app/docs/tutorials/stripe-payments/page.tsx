import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard, DocsLinkCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { CreditCard, Webhook, Gift, TestTube } from "lucide-react";

export const metadata = {
  title: "Subscription Guide - Fabrk Docs",
  description: "Build a complete subscription system with Stripe. Checkout, billing portal, plan upgrades, and webhook handling.",
};

export default function StripePaymentsTutorialPage() {
  return (
    <FeatureGuideTemplate
      code="[0x30]"
      category="Tutorials"
      title="Stripe_Payments"
      description="Set up one-time payments and subscriptions with Stripe."
      overview="This guide walks you through setting up Stripe payments including checkout, webhooks, and promotion codes."
      features={[
        { icon: CreditCard, title: "Checkout", description: "Create payment sessions with Stripe Checkout." },
        { icon: Webhook, title: "Webhooks", description: "Handle payment confirmations and events." },
        { icon: Gift, title: "Coupons", description: "Configure promotion codes and discounts." },
        { icon: TestTube, title: "Testing", description: "Test cards for development." },
      ]}
      setup={[
        {
          title: "Configure Stripe",
          description: "Add your Stripe API keys to .env.local",
          code: `# Get from https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."`,
          language: "bash",
        },
        {
          title: "Create a Product",
          description: "Go to Stripe Dashboard → Products → Add product. Copy the Price ID.",
          code: `# .env.local
NEXT_PUBLIC_STRIPE_PRICE_FABRK="price_your_price_id"`,
          language: "bash",
        },
      ]}
      usage={[
        {
          title: "Create Checkout Button",
          description: "Use the checkout API to create a payment session",
          code: `"use client";

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
    } catch (_) {
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
}`,
          language: "tsx",
        },
        {
          title: "Set Up Webhooks (Local)",
          description: "Forward webhooks to localhost for development",
          code: `# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe`,
          language: "bash",
        },
        {
          title: "Production Webhook URL",
          description: "Add your webhook endpoint in the Stripe Dashboard",
          code: `https://yourdomain.com/api/webhooks/stripe`,
          language: "text",
        },
        {
          title: "Promotion Codes",
          description: "Configure promotion codes in src/config.js",
          code: `// src/config.js
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
}`,
          language: "javascript",
        },
      ]}
      previous={{ title: "Email Templates", href: "/docs/tutorials/email-templates" }}
      next={{ title: "Webhooks", href: "/docs/tutorials/webhooks" }}
    >
      {/* Webhook Events */}
      <DocsSection title="Webhook Events">
        <DocsCard title="WEBHOOK_EVENTS">
          <p className={docsTypography.body}>
            The webhook handler is at <code className="bg-muted px-1 font-mono text-xs">src/app/api/webhooks/stripe/route.ts</code>.
            Key events handled:
          </p>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed mt-2">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">checkout.session.completed</code> - Payment successful</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">customer.subscription.created</code> - New subscription</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">customer.subscription.updated</code> - Subscription changed</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">customer.subscription.deleted</code> - Subscription cancelled</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">invoice.payment_failed</code> - Payment failed</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Test Cards */}
      <DocsSection title="Test Cards">
        <DocsCard title="TEST_CARDS">
          <p className={docsTypography.body}>Use these test cards in development:</p>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed mt-2">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">4242 4242 4242 4242</code> - Successful payment</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">4000 0000 0000 0002</code> - Declined</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">4000 0000 0000 3220</code> - Requires 3D Secure</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/features/payments"
            title="Payments Feature Guide"
            description="Advanced payment features and configuration"
          />
          <DocsLinkCard
            href="/docs/tutorials/webhooks"
            title="Webhooks Setup"
            description="Handle all webhook events"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
