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
    <section className="relative overflow-hidden bg-background px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Massive Headline */}
          <h1 className="mb-6 text-5xl font-black leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            The Radically Simple{" "}
            <span className="block bg-primary text-primary-foreground px-4 py-2 inline-block -rotate-1 shadow-brutal-lg my-4 border-4 border-black">
              Next.js Boilerplate.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto mb-10 max-w-3xl text-lg font-bold leading-relaxed text-foreground sm:text-xl">
            Stop wrestling with complex setups. Fabrk gives you authentication,
            payments, and database integration in a clean,{" "}
            <span className="bg-accent text-accent-foreground px-2 py-1 inline-block rotate-1 border-3 border-black shadow-brutal">
              40-file Next.js 15 project
            </span>
            . Ship your SaaS in{" "}
            <span className="bg-secondary text-secondary-foreground px-2 py-1 inline-block -rotate-1 border-3 border-black shadow-brutal">
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

          {/* Social Proof */}
          <p className="text-sm font-bold text-foreground">
            Join 100+ developers who ship faster.
          </p>
        </div>

        {/* File Explorer Mockup */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="relative overflow-hidden rounded-brutal border-4 border-black bg-muted p-6 shadow-brutal-xl">
            {/* Window Controls */}
            <div className="mb-6 flex items-center gap-2">
              <div className="h-4 w-4 rounded-none border-2 border-black bg-destructive"></div>
              <div className="h-4 w-4 rounded-none border-2 border-black bg-primary"></div>
              <div className="h-4 w-4 rounded-none border-2 border-black bg-accent"></div>
            </div>

            {/* File Structure */}
            <div className="font-mono text-base font-bold">
              <div className="mb-3 flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-primary">
                  <path d="M0 2 L6 2 L8 4 L16 4 L16 14 L0 14 Z" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="2"/>
                </svg>
                <span className="text-foreground">app/</span>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-accent">
                    <rect x="2" y="2" width="12" height="12" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <line x1="5" y1="6" x2="11" y2="6" stroke="hsl(var(--border))" strokeWidth="1"/>
                    <line x1="5" y1="9" x2="11" y2="9" stroke="hsl(var(--border))" strokeWidth="1"/>
                  </svg>
                  <span className="text-foreground">layout.tsx</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-accent">
                    <rect x="2" y="2" width="12" height="12" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <line x1="5" y1="6" x2="11" y2="6" stroke="hsl(var(--border))" strokeWidth="1"/>
                    <line x1="5" y1="9" x2="11" y2="9" stroke="hsl(var(--border))" strokeWidth="1"/>
                  </svg>
                  <span className="text-foreground">page.tsx</span>
                </div>
              </div>
              <div className="mb-3 mt-6 flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-primary">
                  <path d="M0 2 L6 2 L8 4 L16 4 L16 14 L0 14 Z" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="2"/>
                </svg>
                <span className="text-foreground">lib/</span>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-accent">
                    <rect x="2" y="2" width="12" height="12" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <line x1="5" y1="6" x2="11" y2="6" stroke="hsl(var(--border))" strokeWidth="1"/>
                    <line x1="5" y1="9" x2="11" y2="9" stroke="hsl(var(--border))" strokeWidth="1"/>
                  </svg>
                  <span className="text-foreground">auth.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-accent">
                    <rect x="2" y="2" width="12" height="12" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <line x1="5" y1="6" x2="11" y2="6" stroke="hsl(var(--border))" strokeWidth="1"/>
                    <line x1="5" y1="9" x2="11" y2="9" stroke="hsl(var(--border))" strokeWidth="1"/>
                  </svg>
                  <span className="text-foreground">stripe.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-accent">
                    <rect x="2" y="2" width="12" height="12" fill="currentColor" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <line x1="5" y1="6" x2="11" y2="6" stroke="hsl(var(--border))" strokeWidth="1"/>
                    <line x1="5" y1="9" x2="11" y2="9" stroke="hsl(var(--border))" strokeWidth="1"/>
                  </svg>
                  <span className="text-foreground">prisma.ts</span>
                </div>
              </div>
              <div className="mt-6 border-t-4 border-black pt-6 text-center">
                <span className="bg-primary text-primary-foreground px-3 py-1 inline-block rounded-brutal border-3 border-black shadow-brutal font-bold">40 files</span>
                <span className="text-foreground"> • Production ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
