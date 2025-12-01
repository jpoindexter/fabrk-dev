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
    <section className="border-b border-border bg-background py-20 lg:py-28">
      <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              [ [0x00] FEATURES ] COMPLETE_SAAS_TOOLKIT
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="mb-2 text-sm text-muted-foreground">
              FABRK_FEATURES:
            </h1>
            <h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-4xl">
              EVERY_FEATURE_YOU_NEED<br className="hidden sm:block" /> <span className="text-primary">ALREADY_BUILT</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-border bg-card p-4 mx-auto max-w-2xl"
          >
            <div className="mb-2 text-xs text-muted-foreground">
              [ [0x01] STATUS ]────────────────────────
            </div>
            <p className="text-sm text-muted-foreground">
              Stop rebuilding the same features for every project. Fabrk includes authentication,
              payments, database, real-time, multi-tenancy, admin dashboard, and more - all
              production-tested and ready to deploy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="rounded-none text-xs">
              <Link href="/#pricing">
                &gt; EXECUTE: GET_FABRK
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-none text-xs">
              <Link href="/docs">
                &gt; VIEW: DOCUMENTATION
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
