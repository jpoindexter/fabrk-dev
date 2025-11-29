"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroSplitProps {
  headline?: string;
  subheadline?: string;
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  trustBadges?: string[];
  imagePosition?: "left" | "right";
}

export function HeroSplit({
  headline = "THE_ANTI_BLOAT_NEXTJS_BOILERPLATE",
  subheadline = "> 161_FILES_NOT_1000 // Ship your SaaS in hours, not weeks",
  ctaPrimary = { text: "> GET_FABRK", href: "#pricing" },
  ctaSecondary = { text: "> VIEW_DOCS", href: "/docs" },
  trustBadges = ["TYPESCRIPT_STRICT", "POSTGRESQL_PRISMA", "NEXTJS_15", "80_PLUS_COMPONENTS"],
  imagePosition = "right",
}: HeroSplitProps) {
  const contentOrder = imagePosition === "left" ? "lg:order-2" : "lg:order-1";
  const imageOrder = imagePosition === "left" ? "lg:order-1" : "lg:order-2";

  return (
    <section className="relative overflow-hidden bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Side */}
          <div className={`${contentOrder} flex flex-col justify-center`}>
            {/* Early Access Badge */}
            <div className="mb-6">
              <span className="inline-block border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
                [ EARLY_ACCESS ] JOIN_FIRST_100_LAUNCH_CUSTOMERS
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 font-mono text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="mb-8 font-mono text-sm leading-relaxed text-muted-foreground sm:text-base">
              {subheadline}
            </p>

            {/* CTAs */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="rounded-none h-12 bg-primary px-6 font-mono text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                asChild
              >
                <Link href={ctaPrimary.href}>{ctaPrimary.text}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-none h-12 border-2 border-foreground px-6 font-mono text-xs font-semibold text-foreground transition-all hover:bg-foreground hover:text-background"
                asChild
              >
                <Link href={ctaSecondary.href}>{ctaSecondary.text}</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="border border-border bg-card px-2 py-1 font-mono text-xs text-muted-foreground"
                >
                  [{badge}]
                </span>
              ))}
            </div>

            {/* Final Sale Notice */}
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              // All sales final • Lifetime v1.x updates
            </p>
          </div>

          {/* Image/Visual Side */}
          <div className={`${imageOrder} relative`}>
            <div className="relative border-2 border-foreground bg-muted shadow">
              {/* Dashboard Mockup */}
              <div className="aspect-4/3 p-6">
                <div className="h-full w-full border-2 border-border/20 bg-card p-4">
                  {/* Header */}
                  <div className="mb-4 flex items-center justify-between border-b-2 border-foreground/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full border-2 border-foreground bg-primary"></div>
                      <div>
                        <div className="h-3 w-24 bg-foreground/20"></div>
                        <div className="mt-1 h-2 w-16 bg-foreground/10"></div>
                      </div>
                    </div>
                    <div className="h-8 w-8 border-2 border-foreground bg-muted"></div>
                  </div>

                  {/* Stats Cards */}
                  <div className="mb-4 grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="border border-foreground bg-card p-3 shadow-sm"
                      >
                        <div className="mb-2 h-2 w-12 bg-foreground/10"></div>
                        <div className="h-4 w-8 bg-primary/20"></div>
                      </div>
                    ))}
                  </div>

                  {/* Data Table Preview */}
                  <div className="border-2 border-foreground bg-card">
                    <div className="border-b-2 border-foreground/10 p-2">
                      <div className="h-3 w-20 bg-foreground/20"></div>
                    </div>
                    <div className="space-y-2 p-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex gap-2">
                          <div className="h-3 w-full bg-foreground/5"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* File Count Badge */}
              <div className="absolute -bottom-4 -right-4 rounded-full border-2 border-foreground bg-primary px-6 py-3 shadow-sm">
                <p className="text-sm font-bold text-primary-foreground">161 Files</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -left-8 top-8 -z-10 h-32 w-32 rounded-full bg-primary/10"></div>
            <div className="absolute -bottom-8 -right-8 -z-10 h-24 w-24 rounded-full bg-accent/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
