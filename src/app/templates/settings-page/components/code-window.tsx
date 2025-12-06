/**
 * ✅ FABRK COMPONENT
 * Terminal Window Wrapper
 * Production-ready ✓
 */

import { type ReactNode } from "react";
import { StyledCard, StyledCardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CodeWindowProps {
  filename: string;
  children: ReactNode;
  borderColor?: string;
}

export function CodeWindow({ filename, children, borderColor = "border-border" }: CodeWindowProps) {
  return (
    <StyledCard className={cn(borderColor !== "border-border" && borderColor)}>
      <StyledCardHeader code="0x00" title={filename.replace(/\.[^/.]+$/, "").toUpperCase()} />
      {children}
    </StyledCard>
  );
}
