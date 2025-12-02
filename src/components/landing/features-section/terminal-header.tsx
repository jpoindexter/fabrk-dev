/**
 * Terminal Header Component
 * Reusable window header with traffic light buttons
 */
"use client";

import { motion } from "framer-motion";

interface TerminalHeaderProps {
  title: string;
  animated?: boolean;
}

export function TerminalHeader({ title, animated = false }: TerminalHeaderProps) {
  const DotComponent = animated ? motion.div : "div";

  return (
    <div className="border-border flex items-center gap-2 border-b px-4 py-2">
      <div className="flex gap-2">
        <DotComponent
          className="bg-destructive/50 size-2.5 rounded-none"
          {...(animated && {
            animate: { scale: [1, 1.2, 1] },
            transition: { duration: 2, repeat: Infinity },
          })}
        />
        <DotComponent
          className="bg-warning/50 size-2.5 rounded-none"
          {...(animated && {
            animate: { scale: [1, 1.2, 1] },
            transition: { duration: 2, repeat: Infinity, delay: 0.2 },
          })}
        />
        <DotComponent
          className="bg-success/50 size-2.5 rounded-none"
          {...(animated && {
            animate: { scale: [1, 1.2, 1] },
            transition: { duration: 2, repeat: Infinity, delay: 0.4 },
          })}
        />
      </div>
      <span className="text-muted-foreground font-mono text-xs">{title}</span>
    </div>
  );
}
