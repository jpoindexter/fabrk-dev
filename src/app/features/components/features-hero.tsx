/**
 * ✅ FABRK COMPONENT
 * Features Hero - Hero section for features page
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturesHero() {
  return (
    <section className="border-border bg-background border-b py-20 lg:py-24">
      <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="border-border bg-card text-muted-foreground inline-block border px-4 py-1 text-xs">
              [ [0x00] FEATURES ] COMPLETE_SAAS_TOOLKIT
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-muted-foreground mb-2 text-sm">FABRK_FEATURES:</h1>
            <h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-4xl">
              EVERY_FEATURE_YOU_NEED
              <br className="hidden sm:block" /> <span className="text-primary">ALREADY_BUILT</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-border bg-card mx-auto max-w-2xl border p-4"
          >
            <div className="text-muted-foreground mb-2 text-xs">
              [ [0x01] STATUS ]────────────────────────
            </div>
            <p className="text-muted-foreground text-sm">
              Stop rebuilding the same features for every project. Fabrk includes authentication,
              payments, database, real-time, multi-tenancy, admin dashboard, and more - all
              production-tested and ready to deploy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="rounded-none text-xs">
              <Link href="/#pricing">
                &gt; EXECUTE: GET_FABRK
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-none text-xs">
              <Link href="/docs">&gt; VIEW: DOCUMENTATION</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
