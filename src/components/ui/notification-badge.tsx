/**
 * ✅ FABRK COMPONENT
 * Notification Badge component for displaying counts on elements.
 *
 * @example
 * ```tsx
 * <NotificationBadge count={5}>
 *   <Button>Notifications</Button>
 * </NotificationBadge>
 * ```
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface NotificationBadgeProps {
  count?: number;
  max?: number;
  showZero?: boolean;
  dot?: boolean;
  variant?: "primary" | "destructive" | "success" | "warning";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  offset?: { x: number; y: number };
  children: React.ReactNode;
  className?: string;
}

const NotificationBadge = React.forwardRef<
  HTMLDivElement,
  NotificationBadgeProps
>(
  (
    {
      count = 0,
      max = 99,
      showZero = false,
      dot = false,
      variant = "primary",
      position = "top-right",
      size = "md",
      pulse = false,
      offset = { x: 0, y: 0 },
      children,
      className,
    },
    ref
  ) => {
    const displayCount = count > max ? `${max}+` : count.toString();
    const shouldShow = count > 0 || showZero;

    // Variant styles
    const variantStyles = {
      primary: "bg-primary text-primary-foreground border-primary",
      destructive:
        "bg-destructive text-destructive-foreground border-destructive",
      success: "bg-accent text-accent-foreground border-accent",
      warning: "bg-[oklch(75%_0.15_60)] text-foreground border-[oklch(75%_0.15_60)]",
    };

    // Position styles
    const positionStyles = {
      "top-right": "top-0 right-0 -translate-y-1/2 translate-x-1/2",
      "top-left": "top-0 left-0 -translate-y-1/2 -translate-x-1/2",
      "bottom-right": "bottom-0 right-0 translate-y-1/2 translate-x-1/2",
      "bottom-left": "bottom-0 left-0 translate-y-1/2 -translate-x-1/2",
    };

    // Size styles
    const sizeStyles = {
      sm: dot ? "h-2 w-2" : "h-4 w-4 text-[8px] min-w-4",
      md: dot ? "h-2.5 w-2.5" : "h-5 w-5 text-[10px] min-w-5",
      lg: dot ? "h-3 w-3" : "h-6 w-6 text-[11px] min-w-6",
    };

    // Custom offset transform
    const customOffset =
      offset.x !== 0 || offset.y !== 0
        ? { transform: `translate(${offset.x}px, ${offset.y}px)` }
        : {};

    return (
      <div ref={ref} className="relative inline-flex">
        {children}
        {shouldShow && (
          <span
            className={cn(
              "absolute z-50 flex items-center justify-center border-brutal font-bold shadow-brutal-sm transition-all duration-150",
              dot ? "rounded-full" : "rounded-full",
              variantStyles[variant],
              positionStyles[position],
              sizeStyles[size],
              pulse && "animate-pulse",
              className
            )}
            style={customOffset}
            aria-live="polite"
            aria-atomic="true"
          >
            {!dot && (
              <span className="px-1 leading-none">{displayCount}</span>
            )}
          </span>
        )}
      </div>
    );
  }
);

NotificationBadge.displayName = "NotificationBadge";

export { NotificationBadge };
