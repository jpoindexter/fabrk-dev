/**
 * Mission Section
 * Detailed mission statement with terminal-style formatting
 */

"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";

export function MissionSection() {
  return (
    <section className="border-t border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center bg-primary/10 border border-border p-4 mb-6"
          >
            <Target className="h-12 w-12 text-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block border border-border bg-card px-4 py-1 text-xs text-muted-foreground mb-4">
              [ [0x02] OUR_MISSION ]
            </span>
            <h2 className="text-2xl font-bold lg:text-3xl">OUR_MISSION</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="border border-border bg-card p-6 text-left"
          >
            <div className="text-xs text-muted-foreground mb-4">
              │ &gt; Loading mission parameters...
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Every developer has experienced the frustration of rebuilding the same
              authentication system, payment integration, and UI components for the
              hundredth time. We created Fabrk to solve this problem once and for all.
            </p>
            <p className="text-sm text-muted-foreground">
              Our mission is simple: <span className="text-primary font-semibold">help you ship your SaaS product in days, not
              months</span>. We handle the boring infrastructure so you can focus on the
              innovation that makes your product unique.
            </p>
            <div className="mt-4 text-xs text-success">
              └─ Mission parameters loaded [OK]
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
