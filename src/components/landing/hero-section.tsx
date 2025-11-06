"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Massive Headline */}
          <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-8xl">
            The Radically Simple{" "}
            <span className="block">Next.js Boilerplate.</span>
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-[#333333] sm:text-xl">
            Stop wrestling with complex setups. Fabrk gives you authentication,
            payments, and database integration in a clean,{" "}
            <span className="font-bold text-black">
              161-file Next.js 15 project
            </span>
            . Ship your SaaS in{" "}
            <span className="font-bold text-black">hours, not weeks</span>.
          </p>

          {/* Primary CTA */}
          <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-14 bg-[#007AFF] px-8 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#0066CC] hover:shadow-xl"
              asChild
            >
              <Link href="#pricing">Get Fabrk Now - $79</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <div className="mb-2 inline-block rounded-full bg-[#007AFF]/10 px-4 py-1.5">
              <p className="text-sm font-semibold text-[#007AFF]">
                Early Access - Join First 100 Launch Customers
              </p>
            </div>
            <p className="text-xs text-[#666666]">
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
          <div className="relative overflow-hidden rounded-lg border border-black/10 bg-[#1E1E1E] p-6 shadow-2xl">
            {/* Editor Header */}
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#FF5F56]"></div>
              <div className="h-3 w-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="h-3 w-3 rounded-full bg-[#27C93F]"></div>
            </div>

            {/* File Structure */}
            <div className="font-mono text-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-[#007AFF]">📁</span>
                <span className="text-white">app/</span>
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#007AFF]">📄</span>
                  <span className="text-[#9CDCFE]">layout.tsx</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#007AFF]">📄</span>
                  <span className="text-[#9CDCFE]">page.tsx</span>
                </div>
              </div>
              <div className="mb-2 mt-4 flex items-center gap-2">
                <span className="text-[#007AFF]">📁</span>
                <span className="text-white">lib/</span>
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#007AFF]">📄</span>
                  <span className="text-[#9CDCFE]">auth.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#007AFF]">📄</span>
                  <span className="text-[#9CDCFE]">stripe.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#007AFF]">📄</span>
                  <span className="text-[#9CDCFE]">prisma.ts</span>
                </div>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4 text-center">
                <span className="text-[#007AFF]">161 files</span>
                <span className="text-white/50"> • Not 1000 • Production ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
