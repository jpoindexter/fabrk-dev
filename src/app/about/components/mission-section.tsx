/**
 * Mission Section
 * Detailed mission statement with terminal-style formatting
 */

"use client";

import { motion } from "framer-motion";

export function MissionSection() {
  return (
    <section className="border-border bg-background border-t px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="border-border bg-card text-muted-foreground mb-4 inline-block border px-4 py-1 text-xs">
              [ [0x02] OUR_MISSION ]
            </span>
            <h2 className="text-2xl font-semibold lg:text-4xl">OUR_MISSION</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="border-border bg-card border p-6 text-left"
          >
            <div className="text-muted-foreground mb-4 text-xs">
              │ &gt; Loading mission parameters...
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Every developer has experienced the frustration of rebuilding the same authentication
              system, payment integration, and UI components for the hundredth time. We created
              Fabrk to solve this problem once and for all.
            </p>
            <p className="text-muted-foreground text-sm">
              Our mission is simple:{" "}
              <span className="text-primary font-semibold">
                help you ship your SaaS product in days, not months
              </span>
              . We handle the boring infrastructure so you can focus on the innovation that makes
              your product unique.
            </p>
            <div className="text-success mt-4 text-xs">└─ Mission parameters loaded [OK]</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
