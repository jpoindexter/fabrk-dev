"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Massive Headline */}
          <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            The Radically Simple{" "}
            <span className="block">Next.js Boilerplate.</span>
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Stop wrestling with complex setups. Fabrk gives you authentication,
            payments, and database integration in a clean,{" "}
            <span className="font-bold text-foreground">
              161-file Next.js 15 project
            </span>
            . Ship your SaaS in{" "}
            <span className="font-bold text-foreground">hours, not weeks</span>.
          </p>

          {/* Primary CTA */}
          <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="xl" asChild>
              <Link href="#pricing">Get Fabrk Now - $79</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <div className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1.5">
              <p className="text-sm font-semibold text-primary">
                Early Access - Join First 100 Launch Customers
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              30-day money-back guarantee • Lifetime updates
            </p>
          </div>

          {/* Placeholder for logos */}
          <div className="mt-6 flex items-center justify-center gap-8 opacity-40 grayscale">
            {/* Add logo placeholders here */}
          </div>
        </div>

        {/* Code Snippet Mockup */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="relative overflow-hidden rounded-lg border-3 border-border bg-card p-6 shadow-brutal">
            {/* Editor Header */}
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive"></div>
              <div className="h-3 w-3 rounded-full bg-warning"></div>
              <div className="h-3 w-3 rounded-full bg-success"></div>
            </div>

            {/* File Structure */}
            <div className="font-mono text-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-primary">📁</span>
                <span className="text-foreground">app/</span>
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-primary">📄</span>
                  <span className="text-info">layout.tsx</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">📄</span>
                  <span className="text-info">page.tsx</span>
                </div>
              </div>
              <div className="mb-2 mt-4 flex items-center gap-2">
                <span className="text-primary">📁</span>
                <span className="text-foreground">lib/</span>
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-primary">📄</span>
                  <span className="text-info">auth.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">📄</span>
                  <span className="text-info">stripe.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">📄</span>
                  <span className="text-info">prisma.ts</span>
                </div>
              </div>
              <div className="mt-6 border-t border-border pt-4 text-center">
                <span className="text-primary">161 files</span>
                <span className="text-muted-foreground"> • Not 1000 • Production ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
