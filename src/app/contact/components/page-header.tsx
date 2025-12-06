/**
 * Page Header Component
 * Header section for the contact page
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

export function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <span
        className={cn(
          "border-border bg-card text-muted-foreground mb-4 inline-block border px-4 py-1 text-xs",
          mode.font,
          mode.radius
        )}
      >
        [ [0x00] CONTACT ] COMMUNICATION_INTERFACE
      </span>
      <h1 className={cn("mb-2 text-4xl font-semibold tracking-tight", mode.font)}>CONTACT_US</h1>
      <p className={cn("text-muted-foreground text-xs", mode.font)}>
        Send us a message and we'll respond within 24 hours
      </p>
    </motion.div>
  );
}
