/**
 * TerminalPreviewWrapper - Forces terminal style on all UI components within docs previews
 * Overrides rounded corners, adds monospace fonts, and applies terminal aesthetic
 */

"use client";

import { cn } from "@/lib/utils";

interface TerminalPreviewWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function TerminalPreviewWrapper({ children, className }: TerminalPreviewWrapperProps) {
  return (
    <div className={cn("terminal-preview", className)}>
      {children}
    </div>
  );
}
