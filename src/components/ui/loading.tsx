/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 *
 * @example
 * ```tsx
 * <Spinner>Content</Spinner>
 * ```
 */

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { Button, ButtonProps } from './button';

// Spinner Component

export type LoadingSpinnerProps = React.ComponentProps<'div'>;

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
    };

    return (
      <div
        data-slot="spinner"
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn('flex items-center justify-center', className)}
        {...props}
      >
        <svg
          className={cn('animate-spin', mode.color.text.accent, sizeClasses[size])}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
Spinner.displayName = 'Spinner';

// Skeleton Component
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', width: _width, height: _height, ...props }, ref) => {
    const variantClasses = {
      text: 'h-4 w-full',
      circular: '',
      rectangular: '',
    };

    return (
      <div
        data-slot="skeleton"
        ref={ref}
        className={cn(
          'h-full w-full animate-pulse border',
          mode.color.bg.elevated,
          mode.color.border.default,
          mode.radius,
          variantClasses[variant],
          className
        )}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

// Loading Container for full-page loading
export interface LoadingContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const LoadingContainer = React.forwardRef<HTMLDivElement, LoadingContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        data-slot="loading-container"
        ref={ref}
        className={cn('flex min-h-96 flex-col items-center justify-center gap-6', className)}
        {...props}
      >
        <Spinner size="lg" />
        {children && <p className={cn('text-xs', mode.color.text.muted, mode.font)}>{children}</p>}
      </div>
    );
  }
);
LoadingContainer.displayName = 'LoadingContainer';

// Loading Button Component
export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading, loadingText, children, disabled, ...props }, ref) => {
    return (
      <Button data-slot="loading-button" ref={ref} disabled={loading || disabled} {...props}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading && loadingText ? loadingText : children}
      </Button>
    );
  }
);
LoadingButton.displayName = 'LoadingButton';

// Loading Spinner (alias for Spinner for compatibility)
export const LoadingSpinner = Spinner;
LoadingSpinner.displayName = 'LoadingSpinner';
