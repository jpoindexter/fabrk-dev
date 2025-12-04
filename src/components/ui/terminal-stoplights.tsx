/**
 * Terminal Stoplights Component
 * Centralized macOS-style window control dots
 *
 * To toggle between square/round stoplights, change `rounded-none` to `rounded-full`
 * in the dotBase constant below.
 */

import { cn } from "@/lib/utils";
import { mode } from "@/lib/design-system";

// TOGGLE: Change rounded-none to rounded-full for circular stoplights
// Now uses mode.radius for dynamic switching
const dotBase = mode.radius;

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

export function TerminalStoplights({ className, size = "sm" }: TerminalStoplightsProps) {
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
    <div className={cn("border-border flex items-center gap-2 border-b px-4 py-2", className)}>
      <TerminalStoplights size={size} />
      {filename && (
        <span className={cn("text-muted-foreground text-xs", mode.font)}>{filename}</span>
      )}
      {children}
    </div>
  );
}
