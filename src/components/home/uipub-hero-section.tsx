/**
 * ✅ FABRK COMPONENT
 * Hero Section - UI Pub Style
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function UIPubHeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Build production apps at AI speed
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          169 production-ready components with automated quality enforcement. Paste into AI tools and ship. Start fast, stay fast. AI-optimized. Quality-first. Lifetime access.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/components"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-8 py-3 text-base font-medium text-white transition-colors hover:bg-card"
          >
            Enter the Registry
            <ArrowRight className="size-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
