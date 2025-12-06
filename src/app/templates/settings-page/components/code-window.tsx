/**
 * ✅ FABRK COMPONENT
 * Terminal Window Wrapper
 * Production-ready ✓
 */

import { type ReactNode } from "react";
import { TerminalCard, TerminalCardHeader } from "@/components/ui/card";

interface CodeWindowProps {
  filename: string;
  children: ReactNode;
  borderColor?: string;
}

export function CodeWindow({ filename, children, borderColor = "border-border" }: CodeWindowProps) {
  return (
    <TerminalCard className={borderColor !== "border-border" ? borderColor : ""}>
      <TerminalCardHeader code="0x00" title={filename.replace(/\.[^/.]+$/, "").toUpperCase()} />
      {children}
    </TerminalCard>
  );
}
