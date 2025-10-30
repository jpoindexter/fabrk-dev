"use client"

import { Button } from "@/components/ui/button"

export function HeroSection7() {
  return (
    <section className="bg-background py-24 lg:py-32 xl:py-40" aria-labelledby="hero-heading">
      <div className="container px-6 flex flex-col items-center gap-12 mx-auto max-w-7xl">
        {/* Hero Content - Bold Makerkit-style */}
        <div className="flex flex-col items-center text-center gap-8 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Production-ready Next.js 15 SaaS Kit
          </div>

          <h1
            id="hero-heading"
            className="text-foreground text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]"
          >
            Ship your SaaS{" "}
            <span className="refined-gradient-text">so fast</span>
            <br />
            it feels like cheating
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl max-w-3xl font-light leading-relaxed">
            Stop wasting weeks on boilerplate. Get authentication, payments, database, emails, and everything else you need to launch your SaaS in days, not months.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="text-base px-8 py-6 rounded-full smooth-transition hover:scale-105 refined-gradient text-white border-0">
              Get Fabrk
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 py-6 rounded-full smooth-transition hover:scale-105"
            >
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
