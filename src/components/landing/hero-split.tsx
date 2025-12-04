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
    <section className="bg-background relative overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content Side */}
          <div className={`${contentOrder} flex flex-col justify-center`}>
            {/* Early Access Badge */}
            <div className="mb-6">
              <span className="border-border bg-card text-muted-foreground inline-block border px-4 py-1 font-mono text-xs">
                [ EARLY_ACCESS ] JOIN_FIRST_100_LAUNCH_CUSTOMERS
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-foreground mb-6 font-mono text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl md:text-5xl">
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="text-muted-foreground mb-8 font-mono text-sm leading-relaxed sm:text-base">
              {subheadline}
            </p>

            {/* CTAs */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-none px-6 font-mono text-xs font-semibold transition-all"
                asChild
              >
                <Link href={ctaPrimary.href}>{ctaPrimary.text}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background h-12 rounded-none border-2 px-6 font-mono text-xs font-semibold transition-all"
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
                  className="border-border bg-card text-muted-foreground border px-2 py-1 font-mono text-xs"
                >
                  [{badge}]
                </span>
              ))}
            </div>

            {/* Final Sale Notice */}
            <p className="text-muted-foreground mt-6 font-mono text-xs">
              {"// All sales final • Lifetime v1.x updates"}
            </p>
          </div>

          {/* Image/Visual Side */}
          <div className={`${imageOrder} relative`}>
            <div className="border-foreground bg-muted relative border-2 shadow">
              {/* Dashboard Mockup */}
              <div className="aspect-4/3 p-6">
                <div className="border-border/20 bg-card h-full w-full border-2 p-4">
                  {/* Header */}
                  <div className="border-foreground/10 mb-4 flex items-center justify-between border-b-2 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="border-foreground bg-primary h-8 w-8 rounded-none border-2"></div>
                      <div>
                        <div className="bg-foreground/20 h-3 w-24"></div>
                        <div className="bg-foreground/10 mt-1 h-2 w-16"></div>
                      </div>
                    </div>
                    <div className="border-foreground bg-muted h-8 w-8 border-2"></div>
                  </div>

                  {/* Stats Cards */}
                  <div className="mb-4 grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-foreground bg-card border p-2">
                        <div className="bg-foreground/10 mb-2 h-2 w-12"></div>
                        <div className="bg-primary/20 h-4 w-8"></div>
                      </div>
                    ))}
                  </div>

                  {/* Data Table Preview */}
                  <div className="border-foreground bg-card border-2">
                    <div className="border-foreground/10 border-b-2 p-2">
                      <div className="bg-foreground/20 h-3 w-20"></div>
                    </div>
                    <div className="space-y-2 p-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex gap-2">
                          <div className="bg-foreground/5 h-3 w-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* File Count Badge */}
              <div className="border-foreground bg-primary absolute -right-4 -bottom-4 rounded-none border-2 px-6 py-4">
                <p className="text-primary-foreground font-mono text-xs font-bold">[161_FILES]</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="bg-primary/10 absolute top-8 -left-8 -z-10 h-32 w-32 rounded-none"></div>
            <div className="bg-accent/10 absolute -right-8 -bottom-8 -z-10 h-24 w-24 rounded-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
