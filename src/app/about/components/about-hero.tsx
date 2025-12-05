/**
 * About Hero Section
 * Company origin story and mission statement banner
 */

"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block border border-border bg-card px-4 py-1 text-xs text-muted-foreground">
            [ [0x00] ABOUT ] FABRK_ORIGIN_STORY
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="mb-2 text-sm text-muted-foreground">
            FABRK_ABOUT:
          </h1>
          <h2 className="mb-6 text-4xl font-semibold tracking-tight">
            BUILT_BY_DEVELOPERS
            <br />
            <span className="text-primary">FOR_DEVELOPERS</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border border-border bg-card p-4 mx-auto max-w-2xl"
        >
          <div className="mb-2 text-xs text-muted-foreground">
            [ [0x01] MISSION_STATEMENT ]────────────────────
          </div>
          <p className="text-sm text-muted-foreground">
            We're on a mission to eliminate the repetitive work that slows down every
            SaaS project, so you can focus on building features that matter.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
