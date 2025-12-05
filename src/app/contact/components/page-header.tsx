/**
 * Page Header Component
 * Header section for the contact page
 */

import { motion } from "framer-motion";

export function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <span className="inline-block border border-border bg-card px-4 py-1 text-xs text-muted-foreground mb-4">
        [ [0x00] CONTACT ] COMMUNICATION_INTERFACE
      </span>
      <h1 className="text-2xl font-semibold lg:text-4xl mb-2">CONTACT_US</h1>
      <p className="text-sm text-muted-foreground">
        Send us a message and we'll respond within 24 hours
      </p>
    </motion.div>
  );
}
