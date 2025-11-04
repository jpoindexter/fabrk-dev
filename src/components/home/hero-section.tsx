/**
 * ✅ FABRK COMPONENT
 * Hero Section Component - UI Pub inspired minimal design with motion
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const metrics = [
  { label: "Components", value: "169" },
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
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Build production apps at AI speed.
          </h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            169 components. Automated quality. One price.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-card"
            >
              Buy Now - $299
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/components"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Browse Components
            </Link>
          </motion.div>

          {/* Trust badges - inline style */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">169</span>
              <span>Components</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">85%</span>
              <span>Test Coverage</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">WCAG 2.1 AA</span>
              <span>Accessible</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
