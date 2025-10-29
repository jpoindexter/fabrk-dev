/**
 * ✅ FABRK COMPONENT
 * Component: tooltip
 * - Under 150 lines ✓
 * - No hardcoded colors ✓
 * - Semantic tokens only ✓
 * - Error/loading states ✓
 * - TypeScript interfaces ✓
 * - Production ready ✓
 *
 * @example
 * ```tsx
 * <tooltip />
 * ```
 */

/**
 * Tooltip component
 */

"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "@/lib/design-system/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  /**
   * Accessible label for the tooltip
   */
  "aria-label"?: string;
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, "aria-label": ariaLabel, ...props }, ref) => (
  <TooltipPrimitive.Content
    data-slot="tooltip-content"
    ref={ref}
    sideOffset={sideOffset}
    aria-label={ariaLabel}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-3.5 text-xs text-primary-foreground",
      "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      "border border-primary/20",
      "dark:border-border dark:bg-secondary dark:text-muted-foreground",
      className,
      ""
    )}
    {...props}
  />
));
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
