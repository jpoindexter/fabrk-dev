/**
 * ✅ FABRK COMPONENT
 * Features Section - UI Pub Style
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { Code2, Package, Sparkles, Zap } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const features = [
  {
    icon: Package,
    title: "Inspired by shadcn/ui",
    description: "Drop-in replacement for shadcn/ui. Use the same CLI, same workflow. Built on the same foundation you already love.",
  },
  {
    icon: Sparkles,
    title: "Beautiful UI Kits",
    description: "Hand-crafted UI Kits with modern aesthetics. Pure, Minimal, Soft, Human, Paper, Plastic, Air, Terminal—8+ styles ready to use.",
  },
  {
    icon: Code2,
    title: "Code Ownership",
    description: "No hidden dependencies. No vendor lock-in. Components live in your repo. You own the code, forever.",
  },
  {
    icon: Zap,
    title: "Animated with Motion",
    description: "Every interactive component uses Motion library. Supports exit animations and reduced motion settings by default.",
  },
];

export function UIPubFeaturesSection() {
  return (
    <section className="border-t border-border bg-muted py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div className="mx-auto max-w-2xl text-center" {...fadeInUp}>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything you need to ship
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Production-ready components, blocks, and UI kits. Built for AI workflows.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2"
          {...fadeInUp}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-lg border border-border bg-white p-8"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-foreground">
                  <Icon className="size-6 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
