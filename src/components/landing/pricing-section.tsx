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
        <h2 className="mb-4 text-center text-4xl font-black text-foreground">
          One Price. Unlimited Projects. Launch Now.
        </h2>

        {/* Pricing Card */}
        <div className="mx-auto mt-16 max-w-lg">
          <div className="rounded-brutal border-4 border-black bg-white p-10 shadow-brutal-xl">
            {/* Plan Name */}
            <div className="mb-6 text-center">
              <span className="inline-block rounded-brutal border-3 border-black bg-secondary px-6 py-2 text-sm font-black uppercase text-secondary-foreground shadow-brutal">
                Lifetime Deal
              </span>
            </div>

            {/* Price */}
            <div className="mb-8 text-center">
              <div className="mb-2 flex items-center justify-center gap-3">
                <span className="text-6xl font-black text-foreground">$99</span>
                <span className="text-2xl font-bold text-foreground line-through">
                  $199
                </span>
              </div>
              <p className="text-lg font-bold text-foreground">
                Pay once, use forever. <span className="bg-primary text-primary-foreground px-2 py-1 inline-block">$0 recurring fees.</span>
              </p>
            </div>

            {/* Features List */}
            <ul className="mb-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-6 w-6 flex-shrink-0 text-accent" strokeWidth={4} />
                  <span className="font-bold text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-brutal border-3 border-black bg-destructive p-4 text-sm font-bold text-destructive-foreground shadow-brutal">
                {error}
              </div>
            )}

            {/* CTA Button */}
            <Button
              size="xl"
              className="w-full text-lg"
              onClick={handleCheckout}
              disabled={isLoading || !priceId}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Buy Now & Ship Faster"
              )}
            </Button>

            {/* Risk Reversal */}
            <p className="mt-6 text-center text-sm font-bold text-foreground">
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
