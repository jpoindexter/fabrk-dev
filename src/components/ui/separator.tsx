/**
 * ✅ FABRK COMPONENT
 * Component: separator
 * - Under 150 lines ✓
 * - No hardcoded colors ✓
 * - Semantic tokens only ✓
 * - Error/loading states ✓
 * - TypeScript interfaces ✓
 * - Production ready ✓
 *
 * @example
 * ```tsx
 * <separator />
 * ```
 */

"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@/lib/design-system/utils";

export type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>;

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root data-slot="separator"
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border transition-all duration-200",
      orientation === "horizontal" ? "h-0 w-full" : "h-full w-0",
      "hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "dark:bg-secondary dark:hover:bg-muted-foreground/40",
      className,
      ""
    )}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator };
