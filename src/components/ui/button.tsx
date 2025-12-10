/**
 * ✅ FABRK COMPONENT
 * Button component with variants and states.
 * Uses Visual Mode System for aesthetic switching.
 *
 * Design System Integration:
 * - Imports from @/design-system for static mode (server components)
 * - Radius, font, and text transform from visual mode config
 * - Follows 8-point grid spacing system
 *
 * @example
 * ```tsx
 * <Button variant="default" size="md">> SUBMIT</Button>
 * ```
 */

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

/**
 * Button Variants using Design System Tokens
 *
 * Color tokens:
 * - bg-primary, text-primary-foreground → Primary action
 * - bg-destructive, text-destructive-foreground → Destructive action
 * - bg-secondary, text-secondary-foreground → Secondary action
 * - bg-background, text-foreground → Ghost/outline
 *
 * State tokens:
 * - --state-disabled-opacity: 0.38 → WCAG-compliant disabled state
 * - --state-hover-opacity: 0.08 → Hover overlay
 * - --state-active-opacity: 0.12 → Active/pressed overlay
 *
 * Spacing (8-point grid):
 * - px-4 (16px), py-2 (8px) → Default
 * - px-2 (8px) → Small
 * - px-6 (24px) → Large
 * - px-8 (32px) → Extra large
 */
const buttonVariants = cva(
  // Base styles - focus ring from design tokens, disabled state uses design system opacity
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-[var(--state-disabled-opacity)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Primary - solid background
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        // Destructive - danger/delete actions
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // Outline - bordered, transparent background
        outline: 'border border-border bg-background hover:bg-muted hover:border-primary/50',
        // Secondary - muted background
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        // Ghost - no background, subtle hover
        ghost: 'text-foreground hover:bg-foreground/10 hover:text-foreground',
        // Link - text only with underline
        link: 'text-primary underline-offset-4 hover:underline',
        // CTA variants - larger padding for marketing sections (terminal aesthetic: text-xs)
        primaryCta: 'bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-6 py-4',
        secondaryCta:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs px-6 py-4',
        ghostOnDark:
          'border border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10 text-xs px-6 py-4',
      },
      size: {
        // WCAG 2.1 AA: min-h-[44px] ensures adequate touch target on mobile
        // Heights follow 8-point grid: h-8 (32px), h-9 (36px), h-10 (40px), h-12 (48px)
        default: 'min-h-[44px] px-4 py-2 sm:min-h-0 sm:h-8',
        sm: 'min-h-[44px] min-w-[44px] px-2 text-xs sm:min-h-0 sm:min-w-0 sm:h-8',
        lg: 'min-h-[44px] px-6 sm:min-h-0 sm:h-10',
        xl: 'min-h-[44px] px-8 text-lg sm:min-h-0 sm:h-12',
        icon: 'min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:h-10 sm:w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingText = '> LOADING...',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    // UX Heuristic #1: Visibility of System Status
    // Visual Mode System: Apply radius, font, and text transform from mode config
    return (
      <Comp
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size }),
          mode.radius,
          mode.font,
          mode.textTransform === 'uppercase' && 'uppercase',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading ? 'true' : undefined}
        aria-label={loading ? loadingText : undefined}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{loadingText}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
