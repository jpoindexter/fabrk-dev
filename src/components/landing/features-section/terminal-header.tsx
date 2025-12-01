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
    <div className="flex items-center gap-2 border-b border-border px-4 py-2">
      <div className="flex gap-1.5">
        <DotComponent
          className="size-2.5 rounded-full bg-destructive/50"
          {...(animated && {
            animate: { scale: [1, 1.2, 1] },
            transition: { duration: 2, repeat: Infinity }
          })}
        />
        <DotComponent
          className="size-2.5 rounded-full bg-warning/50"
          {...(animated && {
            animate: { scale: [1, 1.2, 1] },
            transition: { duration: 2, repeat: Infinity, delay: 0.2 }
          })}
        />
        <DotComponent
          className="size-2.5 rounded-full bg-success/50"
          {...(animated && {
            animate: { scale: [1, 1.2, 1] },
            transition: { duration: 2, repeat: Infinity, delay: 0.4 }
          })}
        />
      </div>
      <span className="font-mono text-xs text-muted-foreground">{title}</span>
    </div>
  );
}
