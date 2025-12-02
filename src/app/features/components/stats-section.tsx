/**
 * ✅ FABRK COMPONENT
 * Stats Section - Component library statistics
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { COMPONENT_STATS } from "./feature-data";

export function StatsSection() {
  return (
    <section className="border-b border-border bg-muted/30 py-12">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-6 text-xs text-muted-foreground">
          [ [0x02] STATS ]────────────────────────
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {COMPONENT_STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="text-center border border-border bg-card p-4"
              >
                <div className="inline-flex items-center justify-center bg-primary/10 p-2 mb-4">
                  <Icon className="size-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <span className="text-xs text-muted-foreground">{stat.label.toUpperCase().replace(/ /g, '_')}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
