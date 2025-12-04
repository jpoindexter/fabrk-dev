/**
 * ✅ FABRK COMPONENT
 * Terminal Window Wrapper
 * Production-ready ✓
 */

import { type ReactNode } from "react";
import { StyledCardHeader } from "@/components/ui/card";

interface TerminalWindowProps {
  filename: string;
  children: ReactNode;
  borderColor?: string;
}

export function TerminalWindow({
  filename,
  children,
  borderColor = "border-border",
}: TerminalWindowProps) {
  return (
    <div className={`border ${borderColor} bg-card`}>
      <StyledCardHeader code="0x00" title={filename.replace(/\.[^/.]+$/, "").toUpperCase()} />
      {children}
    </div>
  );
}
