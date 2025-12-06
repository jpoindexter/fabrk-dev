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
          <div className="mb-4">
            <span className="border-border bg-card text-muted-foreground inline-block border px-4 py-1 text-xs">
              [ [0x10] TECH_STACK ]
            </span>
          </div>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">TECH_STACK</h2>
          <p className="text-muted-foreground text-sm">
            Built with the latest technologies. No legacy code, no outdated dependencies.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {TECH_STACK.map((tech, index) => {
            const hexId = (index + 10).toString(16).toUpperCase();
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group border-border bg-card hover:border-primary/50 flex h-full flex-col border transition-colors"
              >
                {/* Terminal Header */}
                <div className="border-border flex items-center justify-between border-b px-4 py-2">
                  <span className="text-muted-foreground text-xs">[ [0x{hexId}] STACK ]</span>
                  <Icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                </div>
                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="text-foreground mb-3 text-xs font-semibold">
                    {tech.name.toUpperCase().replace(/ /g, "_").replace(/\./g, "")}
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">DESC: </span>
                    <span className="text-foreground">{tech.description}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
