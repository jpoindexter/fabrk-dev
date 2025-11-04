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
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm font-medium text-foreground">
              <Sparkles className="size-4" />
              <span>AI-First</span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Copy. Paste. Build.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Click &quot;Copy Prompt&quot; on any component. Paste into v0, Bolt, or Cursor. Get
              production-ready code instantly.
            </p>
          </div>

          <div className="mt-12 rounded-lg border border-border bg-background p-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-mono text-sm text-muted-foreground">Button Component</span>
              <Button size="sm" variant="outline" className="gap-2">
                <Copy className="size-4" />
                Copy Prompt
              </Button>
            </div>
            <div className="mt-4 font-mono text-sm text-muted-foreground">
              <p>→ Paste into your AI tool</p>
              <p className="mt-2 text-primary">✓ Full component context via llms.txt</p>
              <p className="mt-1 text-primary">✓ Design tokens included</p>
              <p className="mt-1 text-primary">✓ Usage examples attached</p>
            </div>
          </div>
        </motion.div>

        {/* Quality-First */}
        <motion.div className="mx-auto mt-32 max-w-4xl" {...fadeInUp}>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm font-medium text-foreground">
              <Terminal className="size-4" />
              <span>Quality-First</span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Quality enforced automatically
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              11 quality checks run on every commit. No manual gatekeeping.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-lg border border-border bg-background">
            <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
              <div className="size-3 rounded-full bg-destructive/100" />
              <div className="size-3 rounded-full bg-accent/100" />
              <div className="size-3 rounded-full bg-primary/100" />
              <span className="ml-2 text-xs font-medium text-muted-foreground">Terminal</span>
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
                    <span className="text-foreground">✓ {check}</span>
                    <span className="text-primary">passed</span>
                  </motion.div>
                ))}
                <motion.div
                  className="mt-4 flex items-center gap-2 border-t border-border pt-4"
                  variants={checkItem}
                >
                  <Check className="size-5 text-primary" />
                  <span className="font-medium text-primary">[6/11 checks shown]</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Complete System */}
        <motion.div className="mx-auto mt-32 max-w-4xl" {...fadeInUp}>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm font-medium text-foreground">
              <span>Complete</span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              More than a component library. A complete design system.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-6">
              <div className="text-4xl font-semibold text-foreground">169</div>
              <div className="mt-2 text-sm font-medium text-foreground">Components</div>
              <p className="mt-2 text-sm text-muted-foreground">
                More than shadcn (50+) and UI Pub (~100)
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-6">
              <div className="text-4xl font-semibold text-foreground">85%</div>
              <div className="mt-2 text-sm font-medium text-foreground">Test Coverage</div>
              <p className="mt-2 text-sm text-muted-foreground">1,664 tests. Production-ready.</p>
            </div>

            <div className="rounded-lg border border-border bg-background p-6">
              <div className="text-4xl font-semibold text-foreground">100%</div>
              <div className="mt-2 text-sm font-medium text-foreground">Type-Safe</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Strict TypeScript. Full IntelliSense.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-6">
              <div className="text-4xl font-semibold text-foreground">WCAG</div>
              <div className="mt-2 text-sm font-medium text-foreground">2.1 AA</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Accessibility built-in, not bolted-on.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
