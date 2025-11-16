"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCheckout } from "@/hooks/use-checkout";

export function HeroSection() {
  const { createCheckoutSession, isLoading } = useCheckout();
  const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "";

  const handleCheckout = () => {
    if (priceId) {
      createCheckoutSession(priceId);
    }
  };
  return (
    <section className="relative overflow-hidden bg-background px-6 py-24">
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
                "Get Fabrk Now - $99"
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

        {/* File Explorer Mockup */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-md">
            {/* Window Controls */}
            <div className="mb-6 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive"></div>
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div className="h-3 w-3 rounded-full bg-accent"></div>
            </div>

            {/* File Structure */}
            <div className="font-mono text-sm font-normal">
              <div className="mb-3 flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="shrink-0 text-primary">
                  <path d="M0 2 L6 2 L8 4 L16 4 L16 14 L0 14 Z" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="2"/>
                </svg>
                <span className="text-foreground">app/</span>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-accent">
                    <rect x="2" y="2" width="12" height="12" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <line x1="5" y1="6" x2="11" y2="6" stroke="hsl(var(--border))" strokeWidth="1"/>
                    <line x1="5" y1="9" x2="11" y2="9" stroke="hsl(var(--border))" strokeWidth="1"/>
                  </svg>
                  <span className="text-foreground">layout.tsx</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-accent">
                    <rect x="2" y="2" width="12" height="12" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <line x1="5" y1="6" x2="11" y2="6" stroke="hsl(var(--border))" strokeWidth="1"/>
                    <line x1="5" y1="9" x2="11" y2="9" stroke="hsl(var(--border))" strokeWidth="1"/>
                  </svg>
                  <span className="text-foreground">page.tsx</span>
                </div>
              </div>
              <div className="mb-3 mt-6 flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="shrink-0 text-primary">
                  <path d="M0 2 L6 2 L8 4 L16 4 L16 14 L0 14 Z" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="2"/>
                </svg>
                <span className="text-foreground">lib/</span>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-accent">
                    <rect x="2" y="2" width="12" height="12" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <line x1="5" y1="6" x2="11" y2="6" stroke="hsl(var(--border))" strokeWidth="1"/>
                    <line x1="5" y1="9" x2="11" y2="9" stroke="hsl(var(--border))" strokeWidth="1"/>
                  </svg>
                  <span className="text-foreground">auth.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-accent">
                    <rect x="2" y="2" width="12" height="12" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <line x1="5" y1="6" x2="11" y2="6" stroke="hsl(var(--border))" strokeWidth="1"/>
                    <line x1="5" y1="9" x2="11" y2="9" stroke="hsl(var(--border))" strokeWidth="1"/>
                  </svg>
                  <span className="text-foreground">stripe.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-accent">
                    <rect x="2" y="2" width="12" height="12" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <line x1="5" y1="6" x2="11" y2="6" stroke="hsl(var(--border))" strokeWidth="1"/>
                    <line x1="5" y1="9" x2="11" y2="9" stroke="hsl(var(--border))" strokeWidth="1"/>
                  </svg>
                  <span className="text-foreground">prisma.ts</span>
                </div>
              </div>
              <div className="mt-6 border-t border-border pt-6 text-center">
                <span className="bg-primary/10 text-primary px-3 py-1 inline-block rounded-md border border-primary/20 font-medium">100 Components</span>
                <span className="text-muted-foreground"> • Production ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
