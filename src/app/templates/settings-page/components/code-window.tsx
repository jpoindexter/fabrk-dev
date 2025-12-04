/**
 * ✅ FABRK COMPONENT
 * Terminal Window Wrapper
 * Production-ready ✓
 */

import { type ReactNode } from "react";
import { StyledCardHeader } from "@/components/ui/card";

interface CodeWindowProps {
  filename: string;
  children: ReactNode;
  borderColor?: string;
}

export function CodeWindow({ filename, children, borderColor = "border-border" }: CodeWindowProps) {
  return (
    <div className={`border ${borderColor} bg-card`}>
      <StyledCardHeader code="0x00" title={filename.replace(/\.[^/.]+$/, "").toUpperCase()} />
      {children}
    </div>
  );
}
