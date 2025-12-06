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
    <section className="border-border bg-background border-t py-16 lg:py-20">
      <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4">
            <span className="border-border bg-card text-muted-foreground inline-block border px-4 py-1 text-xs">
              [ [0x20] PRODUCTION_QUALITY ]
            </span>
          </div>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">PRODUCTION_QUALITY</h2>
          <p className="text-muted-foreground text-sm">
            Not just boilerplate. Enterprise-grade code with comprehensive testing.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: TestTube,
              id: "0x21",
              title: "130+_TESTS",
              desc: "Vitest unit tests and Playwright E2E tests. Every critical flow tested.",
            },
            {
              icon: Terminal,
              id: "0x22",
              title: "TYPESCRIPT_STRICT",
              desc: "100% TypeScript with strict mode. No any types. Full type safety.",
            },
            {
              icon: BookOpen,
              id: "0x23",
              title: "400KB_DOCS",
              desc: "24 comprehensive guides covering every feature. No guesswork.",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border-border bg-card hover:border-primary/50 border transition-colors"
              >
                {/* Terminal Header */}
                <div className="border-border flex items-center justify-between border-b px-4 py-2">
                  <span className="text-muted-foreground text-xs">[ [{item.id}] QUALITY ]</span>
                  <Icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                </div>
                {/* Content */}
                <div className="p-4">
                  <div className="text-foreground mb-3 text-xs font-semibold">{item.title}</div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">DESC: </span>
                    <span className="text-foreground">{item.desc}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
