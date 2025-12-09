'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    data-slot="slider"
    className={cn(
      'relative flex w-full touch-none items-center select-none',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        'bg-secondary relative h-2 w-full grow overflow-hidden border',
        mode.radius
      )}
    >
      <SliderPrimitive.Range className="bg-primary absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        'border-primary bg-background focus-visible:ring-primary block h-5 w-5 border transition-colors hover:scale-105 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        mode.radius
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
