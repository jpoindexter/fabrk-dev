"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCheckout } from "@/hooks/use-checkout";
import config from "@/config";

export function HeroSection() {
  const { createCheckoutSession, isLoading } = useCheckout();
  const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "";

  const handleCheckout = () => {
    if (priceId) {
      createCheckoutSession(priceId);
    }
  };
  return (
    <section className="relative overflow-hidden bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Massive Headline */}
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Ship Your SaaS in 48 Hours, Not 4 Weeks
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto mb-12 max-w-2xl text-lg font-normal leading-relaxed text-muted-foreground sm:text-xl">
            Stop wrestling with complex setups. Fabrk gives you{" "}
            <span className="font-medium text-foreground">
              100 production-ready components
            </span>
            , authentication, payments, and everything you need. Ship your SaaS in{" "}
            <span className="font-medium text-foreground">
              days, not weeks
            </span>.
          </p>

          {/* Primary CTA */}
          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="xl"
              className="text-lg"
              onClick={handleCheckout}
              disabled={isLoading || !priceId}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                `Get Fabrk Now - ${config.pricing.product.display.current}`
              )}
            </Button>
          </div>

          {/* Social Proof with Avatars */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Avatar Stack */}
            <div className="flex -space-x-2">
              <div className="h-10 w-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-primary-foreground font-medium text-xs shadow-sm">
                JD
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-background bg-accent flex items-center justify-center text-accent-foreground font-medium text-xs shadow-sm">
                SK
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-secondary-foreground font-medium text-xs shadow-sm">
                AM
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-background bg-primary/80 flex items-center justify-center text-primary-foreground font-medium text-xs shadow-sm">
                TC
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-muted-foreground font-medium text-xs shadow-sm">
                +95
              </div>
            </div>

            {/* Text */}
            <p className="text-sm font-medium text-muted-foreground">
              Join 100+ developers who ship faster.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
