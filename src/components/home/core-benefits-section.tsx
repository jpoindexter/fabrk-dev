/**
 * ✅ FABRK COMPONENT
 * Core Benefits Section - Three main value propositions
 * Production-ready ✓
 */

"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Copy, Sparkles, Terminal } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const staggerContainer = {
  initial: "initial",
  whileInView: "whileInView",
  viewport: { once: true, margin: "-100px" },
  variants: {
    whileInView: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },
};

const checkItem = {
  initial: { opacity: 0, x: -12 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
};

const qualityChecks = [
  "TypeScript check",
  "Accessibility test",
  "Design tokens",
  "Test coverage",
  "Linting",
  "Component standards",
];

export function CoreBenefitsSection() {
  return (
    <section className="border-t border-border bg-background py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* AI-First */}
        <motion.div className="mx-auto max-w-4xl" {...fadeInUp}>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 border border-border bg-card px-3 py-1">
              <Sparkles className="size-4 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground">[ AI_FIRST ]</span>
            </div>
            <h2 className="mt-4 font-mono text-2xl font-bold sm:text-3xl">
              COPY_PASTE_BUILD
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-mono text-sm text-muted-foreground">
              &gt; Click &quot;Copy Prompt&quot; on any component. Paste into v0, Bolt, or Cursor. Get
              production-ready code instantly.
            </p>
          </div>

          <div className="mt-12 border border-border bg-card p-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-mono text-sm text-muted-foreground">BUTTON_COMPONENT</span>
              <Button size="sm" variant="outline" className="gap-2 rounded-none font-mono text-xs">
                <Copy className="size-4" />
                &gt; COPY_PROMPT
              </Button>
            </div>
            <div className="mt-4 font-mono text-sm text-muted-foreground">
              <p>&gt; Paste into your AI tool</p>
              <p className="mt-2 text-primary">✓ FULL_COMPONENT_CONTEXT via llms.txt</p>
              <p className="mt-1 text-primary">✓ DESIGN_TOKENS included</p>
              <p className="mt-1 text-primary">✓ USAGE_EXAMPLES attached</p>
            </div>
          </div>
        </motion.div>

        {/* Quality-First */}
        <motion.div className="mx-auto mt-32 max-w-4xl" {...fadeInUp}>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 border border-border bg-card px-3 py-1">
              <Terminal className="size-4 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground">[ QUALITY_FIRST ]</span>
            </div>
            <h2 className="mt-4 font-mono text-2xl font-bold sm:text-3xl">
              QUALITY_ENFORCED_AUTOMATICALLY
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-mono text-sm text-muted-foreground">
              &gt; 11 quality checks run on every commit. No manual gatekeeping.
            </p>
          </div>

          <div className="mt-12 overflow-hidden border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
              <div className="size-3 bg-destructive/100" />
              <div className="size-3 bg-accent/100" />
              <div className="size-3 bg-primary/100" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">TERMINAL</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="mb-4 text-muted-foreground">
                $ git commit -m &quot;add button&quot;
              </div>
              <motion.div className="space-y-2" {...staggerContainer}>
                {qualityChecks.map((check) => (
                  <motion.div
                    key={check}
                    className="flex items-center justify-between"
                    variants={checkItem}
                  >
                    <span className="text-foreground">✓ {check.toUpperCase().replace(/ /g, '_')}</span>
                    <span className="text-primary">PASSED</span>
                  </motion.div>
                ))}
                <motion.div
                  className="mt-4 flex items-center gap-2 border-t border-border pt-4"
                  variants={checkItem}
                >
                  <Check className="size-5 text-primary" />
                  <span className="font-medium text-primary">[6/11 CHECKS_SHOWN]</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Complete System */}
        <motion.div className="mx-auto mt-32 max-w-4xl" {...fadeInUp}>
          <div className="text-center">
            <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">[ COMPLETE ]</span>
            </div>
            <h2 className="mt-4 font-mono text-2xl font-bold sm:text-3xl">
              EVERYTHING_YOU_NEED_NOTHING_YOU_DONT
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-mono text-sm text-muted-foreground">
              &gt; More than a component library. A complete design system.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="border border-border bg-card p-6">
              <div className="font-mono text-4xl font-bold text-foreground">169</div>
              <div className="mt-2 font-mono text-sm font-semibold text-foreground">COMPONENTS</div>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                More than shadcn (50+) and UI Pub (~100)
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="font-mono text-4xl font-bold text-foreground">85%</div>
              <div className="mt-2 font-mono text-sm font-semibold text-foreground">TEST_COVERAGE</div>
              <p className="mt-2 font-mono text-xs text-muted-foreground">130+ tests. Production-ready.</p>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="font-mono text-4xl font-bold text-foreground">100%</div>
              <div className="mt-2 font-mono text-sm font-semibold text-foreground">TYPE_SAFE</div>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                Strict TypeScript. Full IntelliSense.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <div className="font-mono text-4xl font-bold text-foreground">WCAG</div>
              <div className="mt-2 font-mono text-sm font-semibold text-foreground">2.1_AA</div>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                Accessibility built-in, not bolted-on.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
