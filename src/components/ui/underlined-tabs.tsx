"use client";

/**
 * ✅ FABRK COMPONENT
 * Tab component with animated underline indicator.
 *
 * @example
 * ```tsx
 * <underlined-tabs />
 * ```
 */

import { cn } from "@/lib/design-system/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

const UnderlinedTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ ...props }, ref) => <TabsPrimitive.Root data-slot="underlined-tabs" ref={ref} {...props} />);
UnderlinedTabs.displayName = "UnderlinedTabs";

const UnderlinedTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    data-slot="underlined-tabs-list"
    ref={ref}
    className={cn(
      "inline-flex items-center justify-start border-b text-muted-foreground",
      className
    )}
    {...props}
  />
));
UnderlinedTabsList.displayName = "UnderlinedTabsList";

const UnderlinedTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    data-slot="underlined-tabs-trigger"
    ref={ref}
    className={cn(
      "relative inline-flex items-center justify-center whitespace-nowrap px-3 pb-4 pt-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:text-foreground",
      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:scale-x-0 after:bg-primary after:transition-transform",
      "data-[state=active]:after:scale-x-100",
      "hover:text-foreground/80",
      className
    )}
    {...props}
  />
));
UnderlinedTabsTrigger.displayName = "UnderlinedTabsTrigger";

const UnderlinedTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    data-slot="underlined-tabs-content"
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
UnderlinedTabsContent.displayName = "UnderlinedTabsContent";

export { UnderlinedTabs, UnderlinedTabsContent, UnderlinedTabsList, UnderlinedTabsTrigger };
