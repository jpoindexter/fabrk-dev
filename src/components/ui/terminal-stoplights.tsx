/**
 * Terminal Stoplights Component
 * Centralized macOS-style window control dots
 *
 * To toggle between square/round stoplights, change `rounded-none` to `rounded-full`
 * in the dotBase constant below.
 */

import { cn } from "@/lib/utils";

// TOGGLE: Change rounded-none to rounded-full for circular stoplights
const dotBase = "rounded-none";

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
    <div className={cn("flex gap-2", className)}>
      <div className={cn(dotBase, dotSize, "bg-destructive/50")} />
      <div className={cn(dotBase, dotSize, "bg-warning/50")} />
      <div className={cn(dotBase, dotSize, "bg-success/50")} />
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
    <div
      className={cn(
        "flex items-center gap-2 border-b border-border px-4 py-2",
        className
      )}
    >
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
