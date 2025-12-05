/**
 * Window Controls Component
 * Centralized macOS-style window control dots
 *
 * To toggle between square/round controls, change the mode in visual-mode.ts
 * Radius is controlled by mode.radius for dynamic switching.
 */

import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

// TOGGLE: Change rounded-none to rounded-full for circular stoplights
// Now uses mode.radius for dynamic switching
const dotBase = mode.radius;

interface WindowControlsProps {
  className?: string;
  /** Size variant - defaults to "sm" (size-2) */
  size?: "xs" | "sm" | "md" | "lg";
  /** Enable pulsing animation */
  animated?: boolean;
}

const sizeClasses = {
  xs: "size-1.5",
  sm: "size-2",
  md: "size-3",
  lg: "size-4",
};

export function WindowControls({ className, size = "sm", animated = false }: WindowControlsProps) {
  const dotSize = sizeClasses[size];
  const animationClass = animated ? "animate-pulse" : "";

  return (
    <div className={cn("flex gap-2", className)}>
      <div
        className={cn(dotBase, dotSize, "bg-destructive/50", animationClass)}
        style={animated ? { animationDelay: "0ms" } : undefined}
      />
      <div
        className={cn(dotBase, dotSize, "bg-warning/50", animationClass)}
        style={animated ? { animationDelay: "200ms" } : undefined}
      />
      <div
        className={cn(dotBase, dotSize, "bg-success/50", animationClass)}
        style={animated ? { animationDelay: "400ms" } : undefined}
      />
    </div>
  );
}

/**
 * Window Header Component
 * Complete header with control dots and optional filename
 */
interface WindowHeaderProps {
  filename?: string;
  className?: string;
  children?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  animated?: boolean;
}

export function WindowHeader({
  filename,
  className,
  children,
  size = "sm",
  animated = false,
}: WindowHeaderProps) {
  return (
    <div className={cn("border-border flex items-center gap-2 border-b px-4 py-2", className)}>
      <WindowControls size={size} animated={animated} />
      {filename && (
        <span className={cn("text-muted-foreground text-xs", mode.font)}>{filename}</span>
      )}
      {children}
    </div>
  );
}
