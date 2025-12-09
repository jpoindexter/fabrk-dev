/**
 * ✅ FABRK COMPONENT
 * Badge component for status indicators and labels.
 * Uses Visual Mode System for aesthetic switching.
 *
 * Design System Integration:
 * - Imports from @/design-system for static mode
 * - Radius and font from visual mode config
 * - Text transform: uppercase in terminal mode
 * - Compact sizing (default sm): px-2 py-0.5 text-xs [&>svg]:size-3
 * - All icons standardized to size-3 (12px) for consistency
 *
 * @example
 * ```tsx
 * <Badge variant="default">NEW</Badge>
 * <Badge variant="destructive">ERROR</Badge>
 * <Badge size="md">MEDIUM</Badge>
 * ```
 */

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

/**
 * Badge Variants using Design System Tokens
 *
 * Color tokens:
 * - bg-primary, text-primary-foreground → Primary badge
 * - bg-destructive, text-destructive-foreground → Error/warning
 * - bg-secondary, text-secondary-foreground → Muted badge
 * - bg-accent, text-accent-foreground → Highlighted badge
 */
const badgeVariants = cva(
  // Base styles - inline-flex for icon alignment, text transform handled by mode.textTransform
  'inline-flex items-center justify-center border w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none transition-colors gap-2',
  {
    variants: {
      variant: {
        // Primary - main action/status
        default:
          'bg-primary text-primary-foreground border-primary hover:bg-primary/90',
        // Secondary - muted status
        secondary:
          'bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/90',
        // Accent - highlighted status
        accent:
          'bg-accent text-accent-foreground border-accent hover:bg-accent/90',
        // Destructive - error/warning
        destructive:
          'bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90',
        // Neutral - subtle/default
        neutral:
          'bg-background text-foreground border-foreground hover:bg-muted',
        // Outline - bordered only
        outline:
          'bg-transparent border-foreground text-foreground hover:bg-foreground/10',
      },
      size: {
        // Compact sizing for consistent UI (matches tech stack pattern)
        sm: 'px-2 py-0.5 text-xs font-medium [&>svg]:size-3',
        md: 'px-2 py-1 text-xs font-medium [&>svg]:size-3',
        lg: 'px-3 py-1.5 text-xs font-semibold [&>svg]:size-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeVariants({ variant, size }),
        mode.radius,
        mode.font,
        mode.textTransform === 'uppercase' && 'uppercase',
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
