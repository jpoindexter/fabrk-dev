"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeroVideoProps {
  headline?: string;
  subheadline?: string;
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  trustBadges?: string[];
  videoSrc?: string;
  videoPoster?: string;
  overlayOpacity?: number;
}

export function HeroVideo({
  headline = "The Anti-Bloat Next.js Boilerplate",
  subheadline = "161 files. Not 1000. Ship your SaaS in hours, not weeks.",
  ctaPrimary = { text: "Get Fabrk", href: "#pricing" },
  ctaSecondary = { text: "View Demo", href: "#demo" },
  trustBadges = ["TypeScript Strict", "PostgreSQL", "Next.js 15", "80+ Components"],
  videoSrc,
  videoPoster,
  overlayOpacity = 0.6,
}: HeroVideoProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* Video Background or Animated Gradient */}
      <div className="absolute inset-0 z-0">
        {videoSrc ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={videoPoster}
              className="h-full w-full object-cover"
              onLoadedData={() => setVideoLoaded(true)}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            {/* Dark overlay for readability */}
            <div
              className="absolute inset-0 bg-foreground/60"
              data-overlay-opacity={overlayOpacity}
            ></div>
          </>
        ) : (
          /* Animated gradient fallback */
          <div className="h-full w-full animate-gradient-shift bg-gradient-to-br from-primary via-primary/80 to-primary">
            <div
              className="absolute inset-0 bg-foreground/50"
            ></div>
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 px-6 py-32 sm:py-40 lg:py-48">
        <div className="mx-auto max-w-4xl text-center">
          {/* Early Access Badge */}
          <div className="mb-8">
            <span className="inline-block border-2 border-foreground/30 bg-foreground/10 px-4 py-2 text-sm text-foreground backdrop-blur-sm font-mono">
              [ EARLY_ACCESS ] JOIN_FIRST_100_CUSTOMERS
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl font-mono">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-foreground/90 sm:text-xl font-mono">
            &gt; {subheadline}
          </p>

          {/* CTAs */}
          <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="rounded-none h-14 bg-card px-8 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:scale-105 font-mono"
              asChild
            >
              <Link href={ctaPrimary.href}>&gt; EXECUTE: {ctaPrimary.text.toUpperCase().replace(/ /g, '_')}</Link>
            </Button>
            <Button
              size="lg"
              className="rounded-none h-14 border-2 border-foreground bg-transparent px-8 text-sm font-semibold text-foreground transition-all hover:bg-card hover:text-foreground font-mono"
              asChild
            >
              <Link href={ctaSecondary.href}>&gt; VIEW: {ctaSecondary.text.toUpperCase().replace(/ /g, '_')}</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mb-8 flex flex-wrap justify-center gap-3 font-mono">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="border-2 border-foreground/30 bg-foreground/10 px-3 py-1 text-xs text-foreground backdrop-blur-sm"
              >
                [{badge.toUpperCase().replace(/ /g, '_')}]
              </span>
            ))}
          </div>

          {/* Final Sale Notice */}
          <p className="text-xs text-foreground/80 font-mono">
            ALL_SALES_FINAL • LIFETIME_V1.X_UPDATES
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <svg
            className="h-6 w-6 text-foreground/60"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

    </section>
  );
}
