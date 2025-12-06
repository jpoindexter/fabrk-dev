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
    <section className="border-border bg-background border-t py-16 lg:py-20">
      <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-muted-foreground text-xs">[0x10]</span>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">TECH_STACK</h2>
          <p className="text-muted-foreground text-sm">
            Built with the latest technologies. No legacy code, no outdated dependencies.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {TECH_STACK.map((tech, index) => {
            const hexId = (index + 10).toString(16).toUpperCase();
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group border-border bg-card hover:border-primary/50 border transition-colors"
              >
                {/* Terminal Header */}
                <div className="border-border border-b px-3 py-1.5">
                  <span className="text-muted-foreground text-[10px]">[ [0x{hexId}] ]</span>
                </div>
                {/* Content */}
                <div className="p-4 text-center">
                  <span className="text-foreground block text-sm font-semibold">
                    {tech.name.toUpperCase().replace(/ /g, "_").replace(/\./g, "")}
                  </span>
                  <span className="text-muted-foreground text-xs">{tech.description}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
