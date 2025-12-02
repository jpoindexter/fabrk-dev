/**
 * Terminal Stoplights Component
 * Centralized macOS-style window control dots
 *
 * The shape (square vs round) is controlled by a single CSS class in globals.css:
 * `.terminal-dot { @apply size-2 rounded-none; }`
 *
 * To make all stoplights round, change `rounded-none` to `rounded-full`
 */

import { cn } from "@/lib/utils";

interface TerminalStoplightsProps {
  className?: string;
  /** Size variant - defaults to "sm" (size-2) */
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "size-2",
  md: "size-3",
  lg: "size-4",
};

export function TerminalStoplights({
  className,
  size = "sm",
}: TerminalStoplightsProps) {
  const dotSize = sizeClasses[size];

  return (
    <div className={cn("terminal-stoplights", className)}>
      <div className={cn("terminal-dot bg-destructive/50", dotSize)} />
      <div className={cn("terminal-dot bg-warning/50", dotSize)} />
      <div className={cn("terminal-dot bg-success/50", dotSize)} />
    </div>
  );
}

/**
 * Terminal Header Component
 * Complete header with stoplights and optional filename
 */
interface TerminalHeaderProps {
  filename?: string;
  className?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function TerminalHeader({
  filename,
  className,
  children,
  size = "sm",
}: TerminalHeaderProps) {
  return (
    <div className={cn("terminal-header", className)}>
      <TerminalStoplights size={size} />
      {filename && (
        <span className="font-mono text-xs text-muted-foreground">
          {filename}
        </span>
      )}
      {children}
    </div>
  );
}
