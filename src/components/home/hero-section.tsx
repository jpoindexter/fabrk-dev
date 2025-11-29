/**
 * ✅ FABRK COMPONENT
 * Hero Section Component - UI Pub inspired minimal design with motion
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import config from "@/config";
import { Button } from "@/components/ui/button";

const metrics = [
  { label: "Components", value: "100+" },
  { label: "Test Coverage", value: "85%" },
  { label: "Quality Grade", value: "A" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 1,
    ease: [0.16, 1, 0.3, 1],
  },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto flex flex-1 flex-col justify-center px-6 py-32 sm:px-8 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* h1 rendered immediately for optimal LCP - no animation */}
          <h1 className="text-balance font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            BUILD_PRODUCTION_APPS_AT_AI_SPEED
          </h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-balance font-mono text-sm text-muted-foreground sm:text-base"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            &gt; 100+ components. Automated quality. One price.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              asChild
              variant="primaryCta"
              size="xl"
              className="rounded-none font-mono"
            >
              <Link href="/pricing">
                &gt; GET_FABRK - {config.pricing.fabrk.display.current}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="rounded-none font-mono"
            >
              <Link href="/demo">&gt; VIEW_DEMO</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="xl"
              className="rounded-none font-mono"
            >
              <Link href="/components">&gt; BROWSE_COMPONENTS</Link>
            </Button>
          </motion.div>

          {/* Trust badges - inline style */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">87</span>
              <span>COMPONENTS</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">85%</span>
              <span>TEST_COVERAGE</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">WCAG_2.1_AA</span>
              <span>ACCESSIBLE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
