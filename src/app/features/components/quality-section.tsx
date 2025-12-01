/**
 * ✅ FABRK COMPONENT
 * Quality Section - Production quality highlights
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { TestTube, Terminal, BookOpen } from "lucide-react";

export function QualitySection() {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs text-muted-foreground">[0x20]</span>
          <h2 className="text-2xl font-bold tracking-tight mb-4">PRODUCTION_QUALITY</h2>
          <p className="text-sm text-muted-foreground">
            Not just boilerplate. Enterprise-grade code with comprehensive testing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-border bg-card p-6"
          >
            <TestTube className="size-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">130+_TESTS</h3>
            <span className="block text-xs text-muted-foreground">
              Vitest unit tests and Playwright E2E tests. Every critical flow tested.
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border border-border bg-card p-6"
          >
            <Terminal className="size-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">TYPESCRIPT_STRICT</h3>
            <span className="block text-xs text-muted-foreground">
              100% TypeScript with strict mode. No any types. Full type safety.
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-border bg-card p-6"
          >
            <BookOpen className="size-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">400KB_DOCS</h3>
            <span className="block text-xs text-muted-foreground">
              24 comprehensive guides covering every feature. No guesswork.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
