/**
 * ✅ FABRK COMPONENT
 * Alert component for displaying important messages.
 * Uses Visual Mode System for aesthetic switching.
 *
 * Design System Integration:
 * - Imports from @/design-system for static mode
 * - Radius and font from visual mode config
 * - Spacing follows 8-point grid: px-6 (24px), py-4 (16px), gap-x-4 (16px)
 * - WCAG AAA compliant status colors (7:1+ contrast)
 *
 * @example
 * ```tsx
 * // Error alert
 * <Alert variant="destructive">
 *   <AlertCircle className="h-4 w-4" />
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Something went wrong.</AlertDescription>
 * </Alert>
 *
 * // Warning alert
 * <Alert variant="warning">
 *   <AlertTriangle className="h-4 w-4" />
 *   <AlertTitle>Warning</AlertTitle>
 *   <AlertDescription>Please review before continuing.</AlertDescription>
 * </Alert>
 *
 * // Success alert
 * <Alert variant="success">
 *   <CheckCircle className="h-4 w-4" />
 *   <AlertTitle>Success</AlertTitle>
 *   <AlertDescription>Changes saved successfully.</AlertDescription>
 * </Alert>
 * ```
 */

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

/**
 * Alert Variants using WCAG AAA Compliant Status Colors
 *
 * WCAG Compliance (Light Theme):
 * - info: 7.1:1 contrast ✅
 * - destructive: 7.5:1 contrast ✅
 * - success: 7.2:1 contrast ✅
 * - warning: 7.8:1 contrast ✅
 *
 * WCAG Compliance (Dark Theme):
 * - info: 13.5:1 contrast ✅
 * - destructive: 10.5:1 contrast ✅
 * - success: 11:1 contrast ✅
 * - warning: 13:1 contrast ✅
 *
 * Uses semantic status color tokens with proper backgrounds
 */
const alertVariants = cva(
  // Base styles - grid layout for icon + content, padding follows 8-point grid
  'relative w-full border px-6 py-4 text-xs grid has-[>svg]:grid-cols-[calc(1.5rem)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-4 gap-y-1 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        // Info - informational alert (blue)
        default:
          'bg-[oklch(var(--color-status-info-bg))] text-[oklch(var(--color-status-info))] border-[oklch(var(--color-status-info))]',
        // Destructive - error alert (red)
        destructive:
          'bg-[oklch(var(--color-status-error-bg))] text-[oklch(var(--color-status-error))] border-[oklch(var(--color-status-error))]',
        // Success - confirmation alert (green)
        success:
          'bg-[oklch(var(--color-status-success-bg))] text-[oklch(var(--color-status-success))] border-[oklch(var(--color-status-success))]',
        // Warning - warning alert (orange)
        warning:
          'bg-[oklch(var(--color-status-warning-bg))] text-[oklch(var(--color-status-warning))] border-[oklch(var(--color-status-warning))]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), mode.radius, mode.font, 'crt-scanlines', className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn('col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'col-start-2 grid justify-items-start gap-1 text-xs font-normal [&_p]:leading-relaxed',
        mode.font,
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
