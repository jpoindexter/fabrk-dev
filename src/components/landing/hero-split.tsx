"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import config from "@/config";

interface HeroSplitProps {
  headline?: string;
  subheadline?: string;
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  trustBadges?: string[];
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
}

export function HeroSplit({
  headline = "The Anti-Bloat Next.js Boilerplate",
  subheadline = "161 files. Not 1000. Ship your SaaS in hours, not weeks.",
  ctaPrimary = { text: `Get Fabrk Now - ${config.pricing.product.display.current}`, href: "#pricing" },
  ctaSecondary = { text: "View Docs", href: "/docs" },
  trustBadges = ["TypeScript Strict", "PostgreSQL + Prisma", "Next.js 15", "80+ Components"],
  image = "/dashboard-preview.png",
  imageAlt = "Fabrk Dashboard Preview",
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
              <Badge variant="default" size="lg">
                Early Access - Join First 100 Launch Customers
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="mb-8 text-lg leading-relaxed text-foreground sm:text-xl">
              {subheadline}
            </p>

            {/* CTAs */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-14 bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
                asChild
              >
                <Link href={ctaPrimary.href}>{ctaPrimary.text}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-2 border-black px-8 text-lg font-semibold text-foreground transition-all hover:bg-foreground hover:text-background"
                asChild
              >
                <Link href={ctaSecondary.href}>{ctaSecondary.text}</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge) => (
                <Badge
                  key={badge}
                  variant="outline"
                  size="md"
                  className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Final Sale Notice */}
            <p className="mt-6 text-sm text-muted-foreground">
              All sales final • Lifetime v1.x updates
            </p>
          </div>

          {/* Image/Visual Side */}
          <div className={`${imageOrder} relative`}>
            <div className="relative rounded-lg border-4 border-black bg-muted shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {/* Dashboard Mockup */}
              <div className="aspect-4/3 p-6">
                <div className="h-full w-full rounded border-2 border-black/10 bg-white p-4">
                  {/* Header */}
                  <div className="mb-4 flex items-center justify-between border-b-2 border-black/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full border-2 border-black bg-primary"></div>
                      <div>
                        <div className="h-3 w-24 rounded bg-black/20"></div>
                        <div className="mt-1 h-2 w-16 rounded bg-black/10"></div>
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded border-2 border-black bg-muted"></div>
                  </div>

                  {/* Stats Cards */}
                  <div className="mb-4 grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded border-2 border-black bg-white p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <div className="mb-2 h-2 w-12 rounded bg-black/10"></div>
                        <div className="h-4 w-8 rounded bg-primary/20"></div>
                      </div>
                    ))}
                  </div>

                  {/* Data Table Preview */}
                  <div className="rounded border-2 border-black bg-card">
                    <div className="border-b-2 border-black/10 p-2">
                      <div className="h-3 w-20 rounded bg-black/20"></div>
                    </div>
                    <div className="space-y-2 p-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex gap-2">
                          <div className="h-3 w-full rounded bg-black/5"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* File Count Badge */}
              <div className="absolute -bottom-4 -right-4 rounded-full border-4 border-black bg-primary px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
