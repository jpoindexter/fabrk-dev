'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('w-full', className)}
      suppressHydrationWarning
      {...props}
    />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'border-border inline-flex h-auto items-center justify-start gap-1 border-b p-0',
        mode.color.bg.base,
        mode.color.text.primary,
        'rounded-none', // Force sharp corners for terminal aesthetic
        mode.font,
        className
      )}
      suppressHydrationWarning
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'relative inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        // Simple underline style - no borders, just spacing
        'bg-transparent',
        // Default state - muted text
        mode.color.text.muted,
        // Hover state - darker text
        'hover:text-foreground',
        // Active state - primary text with bottom border indicator
        'data-[state=active]:text-primary data-[state=active]:font-semibold',
        // Active bottom border indicator
        'after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-transparent',
        'data-[state=active]:after:bg-primary',
        mode.state.focus.ring,
        'rounded-none', // Force sharp corners for terminal aesthetic
        mode.font,
        className
      )}
      suppressHydrationWarning
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        'mt-4 focus-visible:ring-2 focus-visible:outline-none',
        mode.state.focus.ring,
        className
      )}
      suppressHydrationWarning
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
