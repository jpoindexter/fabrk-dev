/**
 * ✅ FABRK COMPONENT
 * Tech Stack Section - Technology stack display
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { TECH_STACK } from "./feature-data";

export function TechStackSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-16 lg:py-20">
      <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs text-muted-foreground">[0x10]</span>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">TECH_STACK</h2>
          <p className="text-sm text-muted-foreground">
            Built with the latest technologies. No legacy code, no outdated dependencies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="border border-border bg-card p-4 text-center"
            >
              <span className="block text-sm font-semibold">{tech.name}</span>
              <span className="text-xs text-muted-foreground">{tech.description}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
