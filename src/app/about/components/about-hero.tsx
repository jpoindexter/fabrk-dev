/**
 * About Hero Section
 * Company origin story and mission statement banner
 */

"use client";

import { motion } from "framer-motion";
import {
  TerminalBadge,
  TerminalCard,
  TerminalCardHeader,
  TerminalCardContent,
} from "@/components/ui/card";

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
          <TerminalBadge code="0x00" label="ABOUT" meta="FABRK_ORIGIN_STORY" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-muted-foreground mb-2 text-sm">FABRK_ABOUT:</h1>
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
          className="mx-auto max-w-2xl text-left"
        >
          <TerminalCard size="auto">
            <TerminalCardHeader code="0x01" title="MISSION_STATEMENT" />
            <TerminalCardContent padding="md">
              <p className="text-muted-foreground text-sm">
                We're on a mission to eliminate the repetitive work that slows down every SaaS
                project, so you can focus on building features that matter.
              </p>
            </TerminalCardContent>
          </TerminalCard>
        </motion.div>
      </div>
    </section>
  );
}
