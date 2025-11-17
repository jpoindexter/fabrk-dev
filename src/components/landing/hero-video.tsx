"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import config from "@/config";

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
  ctaPrimary = { text: `Get Fabrk Now - ${config.pricing.product.display.current}`, href: "#pricing" },
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
              className="absolute inset-0 bg-black opacity-60"
              data-overlay-opacity={overlayOpacity}
            ></div>
          </>
        ) : (
          /* Animated gradient fallback */
          <div className="h-full w-full animate-gradient-shift bg-gradient-to-br from-primary via-primary/80 to-primary">
            <div
              className="absolute inset-0 bg-black opacity-50"
            ></div>
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 px-6 py-32 sm:py-40 lg:py-48">
        <div className="mx-auto max-w-4xl text-center">
          {/* Early Access Badge */}
          <div className="mb-8">
            <div className="inline-block rounded-full border-2 border-white/30 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <p className="text-sm font-semibold text-white">
                Early Access - Join First 100 Launch Customers
              </p>
            </div>
          </div>

          {/* Headline */}
          <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-14 bg-white px-8 text-lg font-semibold text-black shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-105"
              asChild
            >
              <Link href={ctaPrimary.href}>{ctaPrimary.text}</Link>
            </Button>
            <Button
              size="lg"
              className="h-14 border-2 border-white bg-transparent px-8 text-lg font-semibold text-white transition-all hover:bg-white hover:text-black"
              asChild
            >
              <Link href={ctaSecondary.href}>{ctaSecondary.text}</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="rounded-md border-2 border-white/30 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm"
              >
                {badge}
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <p className="text-sm text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            30-day money-back guarantee • Lifetime updates
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <svg
            className="h-6 w-6 text-white/60"
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

      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
      `}</style>
    </section>
  );
}
