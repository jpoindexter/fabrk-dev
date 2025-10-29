/**
 * ✅ FABRK COMPONENT
 * AI Workflow Demo Section - Shows AI integration workflow
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Copy, Sparkles } from "lucide-react";

const workflowSteps = [
  {
    number: "1",
    title: "Browse component in Fabrk",
    description: "Find the perfect component for your needs",
  },
  {
    number: "2",
    title: "Click \"Copy Prompt\"",
    description: "Get AI-optimized context with llms.txt",
  },
  {
    number: "3",
    title: "Paste into v0/Bolt/Cursor",
    description: "Your AI tool understands instantly",
  },
  {
    number: "4",
    title: "Get production-ready code",
    description: "Fully typed, tested, and accessible",
  },
];

const aiTools = [
  { name: "v0", logo: "v0" },
  { name: "Bolt", logo: "⚡" },
  { name: "Cursor", logo: "▲" },
  { name: "Lovable", logo: "♥" },
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
};

const stepItem = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export function AIWorkflowSection() {
  return (
    <section className="border-t border-border bg-white py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-foreground">
            <Sparkles className="size-4" />
            <span>Built for AI-assisted development</span>
          </div>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            AI workflow in action
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Copy component context directly into your favorite AI tools. They understand everything via llms.txt.
          </p>
        </motion.div>

        {/* Workflow Steps - simpler */}
        <motion.div
          className="mx-auto mt-16 max-w-4xl"
          {...staggerContainer}
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                variants={stepItem}
              >
                {index < workflowSteps.length - 1 && (
                  <div className="absolute left-full top-6 hidden w-full items-center justify-center lg:flex">
                    <ArrowRight className="size-5 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-base font-semibold text-foreground">
                    {step.number}
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Tools - cleaner */}
        <motion.div
          className="mx-auto mt-16 max-w-2xl text-center"
          {...fadeInUp}
        >
          <p className="text-sm font-medium text-muted-foreground">
            Works with
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {aiTools.map((tool) => (
              <div
                key={tool.name}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-foreground"
              >
                <span>{tool.logo}</span>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
