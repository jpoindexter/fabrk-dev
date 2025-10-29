/**
 * ✅ FABRK COMPONENT
 * Features Flow Section - Alternating layout like Achromatic
 * Production-ready ✓
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Check, Code2, Copy, Sparkles, Terminal } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const staggerContainer = {
  initial: "initial",
  whileInView: "whileInView",
  viewport: { once: true, margin: "-100px" },
  variants: {
    whileInView: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
};

const checkItem = {
  initial: { opacity: 0, x: -12 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
};

export function FeaturesFlowSection() {
  return (
    <section className="border-t border-border bg-white">
      {/* AI-First Feature */}
      <div className="container mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Text */}
          <motion.div className="flex flex-col justify-center" {...fadeInUp}>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm font-medium text-foreground">
              <Sparkles className="size-4" />
              <span>AI-First</span>
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Copy. Paste. Ship.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every component includes AI-optimized context. Click &quot;Copy Prompt&quot;, paste
              into v0 or Cursor, and get production code instantly.
            </p>
            <ul className="mt-8 space-y-3">
              <li className="flex items-start gap-3 text-foreground">
                <Check className="mt-0.5 size-5 shrink-0 text-foreground" />
                <span>Full component context via llms.txt</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <Check className="mt-0.5 size-5 shrink-0 text-foreground" />
                <span>Works with v0, Bolt, Cursor, Lovable</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <Check className="mt-0.5 size-5 shrink-0 text-foreground" />
                <span>Design tokens and usage examples included</span>
              </li>
            </ul>
          </motion.div>

          {/* Demo */}
          <motion.div className="flex flex-col justify-center" {...fadeInUp}>
            <div className="overflow-hidden rounded-lg border border-border bg-white">
              <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-3">
                <span className="text-sm font-medium text-muted-foreground">button.tsx</span>
                <Button size="sm" variant="ghost" className="h-7 gap-2 text-xs">
                  <Copy className="size-3" />
                  Copy Prompt
                </Button>
              </div>
              <div className="p-6 font-mono text-sm">
                <pre className="text-foreground">
                  <code>{`import { Button } from "@/components/ui/button"

export function MyButton() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  )
}`}</code>
                </pre>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-border bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                → Paste into your AI tool and get instant, production-ready code with full context
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quality Enforcement - Alternating */}
      <div className="border-t border-border bg-muted">
        <div className="container mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Demo First */}
            <motion.div className="order-2 flex flex-col justify-center lg:order-1" {...fadeInUp}>
              <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
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
                    {[
                      "TypeScript check",
                      "Accessibility test",
                      "Design tokens",
                      "Test coverage",
                      "Linting",
                      "Component standards",
                    ].map((check) => (
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

            {/* Text */}
            <motion.div className="order-1 flex flex-col justify-center lg:order-2" {...fadeInUp}>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-sm font-medium text-foreground">
                <Terminal className="size-4" />
                <span>Quality-First</span>
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Quality enforced, not suggested
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                11 automated checks run on every commit. No manual code reviews. No gatekeeping.
                Just production-ready code.
              </p>
              <ul className="mt-8 space-y-3">
                <li className="flex items-start gap-3 text-foreground">
                  <Check className="mt-0.5 size-5 shrink-0 text-foreground" />
                  <span>Pre-commit hooks catch issues before they reach your repo</span>
                </li>
                <li className="flex items-start gap-3 text-foreground">
                  <Check className="mt-0.5 size-5 shrink-0 text-foreground" />
                  <span>85% test coverage across all components</span>
                </li>
                <li className="flex items-start gap-3 text-foreground">
                  <Check className="mt-0.5 size-5 shrink-0 text-foreground" />
                  <span>WCAG 2.1 AA accessibility by default</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Complete System */}
      <div className="border-t border-border bg-white">
        <div className="container mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Text */}
            <motion.div className="flex flex-col justify-center" {...fadeInUp}>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm font-medium text-foreground">
                <Code2 className="size-4" />
                <span>Complete</span>
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Everything you need
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                169 production-ready components. Complete design system. Modern stack. One price.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-semibold text-foreground">169</div>
                  <div className="mt-1 text-sm text-muted-foreground">Components</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-foreground">85%</div>
                  <div className="mt-1 text-sm text-muted-foreground">Test Coverage</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-foreground">100%</div>
                  <div className="mt-1 text-sm text-muted-foreground">Type-Safe</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-foreground">WCAG</div>
                  <div className="mt-1 text-sm text-muted-foreground">2.1 AA</div>
                </div>
              </div>
            </motion.div>

            {/* Demo */}
            <motion.div className="flex flex-col justify-center" {...fadeInUp}>
              <div className="space-y-4">
                {/* Button Demo */}
                <div className="rounded-lg border border-border bg-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Buttons</span>
                    <Badge variant="outline">Interactive</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm">Primary</Button>
                    <Button size="sm" variant="outline">
                      Outline
                    </Button>
                    <Button size="sm" variant="ghost">
                      Ghost
                    </Button>
                  </div>
                </div>

                {/* Input Demo */}
                <div className="rounded-lg border border-border bg-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Forms</span>
                    <Badge variant="outline">Validated</Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Input placeholder="Email address" type="email" />
                    <Button size="sm" className="w-full">
                      Subscribe
                    </Button>
                  </div>
                </div>

                {/* More Components Link */}
                <div className="rounded-lg border border-border bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    + 167 more components ready to use
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
