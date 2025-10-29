/**
 * ✅ FABRK COMPONENT
 * Quality Enforcement Demo Section - Shows automated quality checks
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const qualityChecks = [
  { name: "TypeScript check", status: "passed" },
  { name: "Accessibility test", status: "passed" },
  { name: "Design tokens", status: "passed" },
  { name: "Test coverage", status: "passed" },
  { name: "Linting", status: "passed" },
  { name: "Component standards", status: "passed" },
  { name: "Mobile responsiveness", status: "passed" },
  { name: "Performance budget", status: "passed" },
  { name: "Bundle size", status: "passed" },
  { name: "Security scan", status: "passed" },
  { name: "Documentation", status: "passed" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-150px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

const staggerContainer = {
  initial: "initial",
  whileInView: "whileInView",
  viewport: { once: true, margin: "-150px" },
  variants: {
    whileInView: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  },
};

const checkItem = {
  initial: { opacity: 0, x: -12 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

export function QualityDemoSection() {
  return (
    <section className="border-t border-border bg-muted py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Quality enforcement in action
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every commit. Every component. Quality enforced automatically.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-3xl">
          {/* Terminal-style demo - cleaner */}
          <motion.div
            className="overflow-hidden rounded-lg border border-border bg-white shadow-sm"
            {...fadeInUp}
          >
            <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
              <div className="size-3 rounded-full bg-destructive/100" />
              <div className="size-3 rounded-full bg-accent/100" />
              <div className="size-3 rounded-full bg-primary/100" />
              <span className="ml-2 text-xs font-medium text-muted-foreground">Terminal</span>
            </div>

            <div className="p-6 font-mono text-sm">
              <div className="mb-4 text-muted-foreground">$ git commit -m &quot;add button&quot;</div>

              <motion.div className="space-y-2" {...staggerContainer}>
                {qualityChecks.map((check) => (
                  <motion.div
                    key={check.name}
                    className="flex items-center justify-between"
                    variants={checkItem}
                  >
                    <span className="text-foreground">
                      ✓ {check.name}
                    </span>
                    <span className="text-primary">{check.status}</span>
                  </motion.div>
                ))}

                <motion.div
                  className="mt-6 flex items-center gap-2 border-t border-border pt-4"
                  variants={checkItem}
                >
                  <div className="flex size-6 items-center justify-center rounded-full border border-primary bg-primary/10">
                    <Check className="size-4 text-primary" />
                  </div>
                  <span className="font-medium text-primary">
                    [11/11 checks passed]
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            className="mt-8 text-center text-sm text-muted-foreground"
            {...fadeInUp}
          >
            Pre-commit hooks ensure quality standards are met before code reaches your repository.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
