/**
 * ✅ FABRK COMPONENT
 * Tech Stack - UI Pub Style (full stack)
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const technologies = [
  "React",
  "TypeScript",
  "Radix UI",
  "Tailwind",
  "CVA",
  "Zod",
  "Motion",
  "GSAP",
  "AI SDK",
  "Recharts",
  "React Flow",
  "Conform",
  "React Aria",
  "Base UI",
];

export function UIPubTechStack() {
  return (
    <section className="border-t border-border bg-white py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div className="text-center" {...fadeInUp}>
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Built with the best tools
          </p>

          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-6">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              >
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
