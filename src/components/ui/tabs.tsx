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
        'bg-background text-foreground inline-flex h-10 items-center justify-start gap-0 border-b p-0',
        mode.radius,
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
        'focus-visible:ring-primary text-muted-foreground hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        mode.radius,
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
        'focus-visible:ring-primary mt-4 focus-visible:ring-2 focus-visible:outline-none',
        className
      )}
      suppressHydrationWarning
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
