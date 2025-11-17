"use client";

import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useCheckout } from "@/hooks/use-checkout";

export function PricingSection() {
  const { createCheckoutSession, isLoading, error } = useCheckout();

  // Use the Starter tier price from environment
  const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "";

  const features = [
    "Next.js 15 Boilerplate",
    "Lifetime Updates",
    "Unlimited Projects",
    "Access to Private Discord",
    "Full Source Code",
  ];

  const handleCheckout = () => {
    if (priceId) {
      createCheckoutSession(priceId);
    } else {
      console.error("No price ID configured");
    }
  };

  return (
    <section
      id="pricing"
      className="scroll-mt-16 bg-background px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-2 text-center text-3xl font-semibold text-foreground">
          One Price. Unlimited Projects. Launch Now.
        </h2>
        <p className="mb-16 text-center text-lg text-muted-foreground">
          No subscriptions, no recurring fees. Pay once, use forever.
        </p>

        {/* Pricing Card */}
        <div className="mx-auto mt-16 max-w-lg">
          <div className="rounded-lg border border-border bg-card p-10 shadow-md">
            {/* Plan Name */}
            <div className="mb-6 text-center">
              <span className="inline-block rounded-md bg-secondary/10 border border-secondary/20 px-6 py-2 text-sm font-medium uppercase text-secondary">
                Lifetime Deal
              </span>
            </div>

            {/* Price */}
            <div className="mb-8 text-center">
              <div className="mb-2 flex items-center justify-center gap-3">
                <span className="text-5xl font-semibold text-foreground">$199</span>
                <span className="text-xl font-medium text-muted-foreground line-through">
                  $599
                </span>
              </div>
              <p className="text-base font-normal text-muted-foreground">
                Pay once, use forever. <span className="font-medium text-foreground">$0 recurring fees.</span>
              </p>
            </div>

            {/* Features List */}
            <ul className="mb-8 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} />
                  <span className="font-normal text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm font-medium text-destructive">
                {error}
              </div>
            )}

            {/* CTA Button */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleCheckout}
              disabled={isLoading || !priceId}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Buy Now & Ship Faster"
              )}
            </Button>

            {/* Final Sale Notice */}
            <p className="mt-6 text-center text-sm font-normal text-muted-foreground">
              All sales are final. Digital product - no refunds after download.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
