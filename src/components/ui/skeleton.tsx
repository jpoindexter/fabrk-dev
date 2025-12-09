import * as React from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('bg-muted animate-pulse', mode.radius, className)} {...props} />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
