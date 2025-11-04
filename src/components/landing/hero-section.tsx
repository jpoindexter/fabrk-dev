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
    <section className="relative overflow-hidden bg-background px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Massive Headline */}
          <h1 className="mb-8 text-5xl font-black leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            The Radically Simple{" "}
            <span className="block bg-primary text-primary-foreground px-4 py-2 inline-block -rotate-1 shadow-brutal-lg my-4">
              Next.js Boilerplate.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto mb-12 max-w-3xl text-lg font-bold leading-relaxed text-muted-foreground sm:text-xl">
            Stop wrestling with complex setups. Fabrk gives you authentication,
            payments, and database integration in a clean,{" "}
            <span className="bg-accent text-accent-foreground px-2 py-1 inline-block rotate-1">
              40-file Next.js 15 project
            </span>
            . Ship your SaaS in{" "}
            <span className="bg-secondary text-secondary-foreground px-2 py-1 inline-block -rotate-1">
              days, not weeks
            </span>.
          </p>

          {/* Primary CTA */}
          <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
                "Get Fabrk Now - $149"
              )}
            </Button>
          </div>

          {/* Social Proof */}
          <p className="text-sm font-bold text-muted-foreground">
            Join 100+ developers who ship faster.
          </p>
        </div>

        {/* Code Snippet Mockup */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="relative overflow-hidden rounded-brutal border-4 border-black bg-[#1E1E1E] p-6 shadow-brutal-xl">
            {/* Editor Header */}
            <div className="mb-4 flex items-center gap-2">
              <div className="h-4 w-4 rounded-none border-2 border-black bg-destructive"></div>
              <div className="h-4 w-4 rounded-none border-2 border-black bg-primary"></div>
              <div className="h-4 w-4 rounded-none border-2 border-black bg-accent"></div>
            </div>

            {/* File Structure */}
            <div className="font-mono text-sm font-bold">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-primary">📁</span>
                <span className="text-white">app/</span>
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-primary">📄</span>
                  <span className="text-[#9CDCFE]">layout.tsx</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">📄</span>
                  <span className="text-[#9CDCFE]">page.tsx</span>
                </div>
              </div>
              <div className="mb-2 mt-4 flex items-center gap-2">
                <span className="text-primary">📁</span>
                <span className="text-white">lib/</span>
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-primary">📄</span>
                  <span className="text-[#9CDCFE]">auth.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">📄</span>
                  <span className="text-[#9CDCFE]">stripe.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">📄</span>
                  <span className="text-[#9CDCFE]">prisma.ts</span>
                </div>
              </div>
              <div className="mt-6 border-t-2 border-white/20 pt-4 text-center">
                <span className="bg-primary text-primary-foreground px-3 py-1 inline-block">40 files</span>
                <span className="text-white/70"> • Production ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
