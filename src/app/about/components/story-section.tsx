/**
 * Story Section
 * Origin story with problem/solution narrative
 */

"use client";

import { motion } from "framer-motion";

const problems = [
  "Over-engineered with 1000+ files you'll never use",
  "Proprietary frameworks that lock you in",
  "Poor documentation and unclear architecture",
  "Bloated with features you don't need",
];

export function StorySection() {
  return (
    <section className="border-t border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-4">
                [ [0x04] ORIGIN_STORY ]
              </span>
              <h2 className="text-2xl font-bold lg:text-3xl mb-4">THE_STORY_BEHIND_FABRK</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted-foreground">
                From frustration to solution
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="border border-border bg-card p-6"
          >
            <div className="text-xs text-muted-foreground mb-4">
              │ &gt; Initializing story sequence...
            </div>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Like many developers, we were tired of rebuilding the same infrastructure for
                every new SaaS project. Authentication, payments, database setup, email
                integration—it's the same story every time.
              </p>

              <p className="text-sm text-muted-foreground">
                We looked at existing solutions, but they all had the same problems:
              </p>

              <div className="space-y-2 pl-4 border-l border-border">
                {problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="text-destructive font-bold">✗</span>
                    <span className="text-muted-foreground">{problem}</span>
                  </motion.div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">
                So we built Fabrk differently. We started with a 1000+ file codebase, then
                ruthlessly cut it down to just the essentials. We removed every line of code
                that didn't serve a clear purpose. We focused on clarity over cleverness.
              </p>

              <p className="text-sm text-muted-foreground">
                The result? A boilerplate with ~160 files that includes everything you need
                and nothing you don't. Clean TypeScript, modern Next.js, industry-standard
                tools, and comprehensive documentation.
              </p>
            </div>
            <div className="mt-4 text-xs text-success">
              └─ Story sequence complete [OK]
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
