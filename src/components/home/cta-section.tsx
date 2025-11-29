/**
 * ✅ FABRK COMPONENT
 * CTA Section - Simple final conversion push
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="border-t border-border bg-background py-24 lg:py-32">
      <div className="container mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x80] CTA ]</span>
        </div>
        <motion.h2
          className="font-mono text-2xl font-bold sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          START_BUILDING_TODAY
        </motion.h2>
        <motion.p
          className="mx-auto mt-6 max-w-2xl font-mono text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          &gt; Join developers building next-gen products with Fabrk. Early supporter pricing ends soon.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 bg-foreground px-8 py-3 font-mono text-sm font-medium text-background transition-colors hover:bg-card"
          >
            &gt; GET_EARLY_ACCESS
            <ArrowRight className="size-5" />
          </a>
        </motion.div>

        <motion.p
          className="mt-8 font-mono text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          // ONE_TIME_PAYMENT • LIFETIME_UPDATES • NO_SUBSCRIPTIONS
        </motion.p>
      </div>
    </section>
  );
}
