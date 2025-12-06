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
    <section className="border-border bg-muted/30 border-b py-12">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {COMPONENT_STATS.map((stat, index) => {
            const Icon = stat.icon;
            const hexId = (index + 2).toString(16).toUpperCase().padStart(2, "0");
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group border-border bg-card hover:border-primary/50 border transition-colors"
              >
                {/* Terminal Header */}
                <div className="border-border flex items-center justify-between border-b px-3 py-1.5">
                  <span className="text-muted-foreground text-[10px]">[ [0x{hexId}] ]</span>
                  <Icon className="text-muted-foreground group-hover:text-primary size-3.5 transition-colors" />
                </div>
                {/* Content */}
                <div className="p-4 text-center">
                  <div className="text-foreground text-2xl font-semibold">{stat.value}</div>
                  <span className="text-muted-foreground text-xs">
                    {stat.label.toUpperCase().replace(/ /g, "_")}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
