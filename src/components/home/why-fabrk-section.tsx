/**
 * ✅ FABRK COMPONENT
 * Why Fabrk Section - 3 simple differentiation points
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const comparisons = [
  {
    title: "vs shadcn/ui",
    points: [
      "169 components (vs 50+)",
      "Automated quality enforcement",
      "85% test coverage included",
      "AI-optimized workflows built-in",
    ],
  },
  {
    title: "vs UI Pub",
    points: [
      "Same component count",
      "Better testing (85% vs none)",
      "Lower price ($299 vs $349)",
      "Open-source roadmap",
    ],
  },
  {
    title: "vs Building Yourself",
    points: [
      "Save 200+ hours",
      "No setup or configuration",
      "Production-ready day one",
      "Lifetime updates included",
    ],
  },
];

export function WhyFabrkSection() {
  return (
    <section className="border-t border-border bg-white py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div className="text-center" {...fadeInUp}>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Why Fabrk?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            More components. Better quality. Lower price.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3"
          {...fadeInUp}
        >
          {comparisons.map((comparison) => (
            <div
              key={comparison.title}
              className="rounded-lg border border-border bg-muted p-6"
            >
              <h3 className="font-semibold text-foreground">{comparison.title}</h3>
              <ul className="mt-4 space-y-3">
                {comparison.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
