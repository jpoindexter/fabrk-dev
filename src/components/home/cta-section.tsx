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
        <motion.h2
          className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Start building today
        </motion.h2>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Join developers building next-gen products with Fabrk. Early supporter pricing ends soon.
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
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-8 py-3 text-base font-medium text-background transition-colors hover:bg-card"
          >
            Get Early Access
            <ArrowRight className="size-5" />
          </a>
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          One-time payment • Lifetime updates • No subscriptions
        </motion.p>
      </div>
    </section>
  );
}
