/**
 * ✅ FABRK COMPONENT
 * Terminal Window Wrapper
 * Production-ready ✓
 */

import { type ReactNode } from "react";

interface TerminalWindowProps {
  filename: string;
  children: ReactNode;
  borderColor?: string;
}

export function TerminalWindow({ filename, children, borderColor = "border-border" }: TerminalWindowProps) {
  return (
    <div className={`border ${borderColor} bg-card`}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{filename}</span>
      </div>
      {children}
    </div>
  );
}
