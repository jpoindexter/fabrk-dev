/**
 * ✅ FABRK COMPONENT
 * Button component with variants and states.
 *
 * @example
 * ```tsx
 * <button variant="default" size="md">Content</button>
 * ```
 */

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/design-system/utils";

const buttonVariants = cva(
  // Base styles - Using 8px spacing system & typography tokens
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[14px] font-medium leading-none ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary action - Purple brand color with border for definition
        default:
          "border border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/95",

        // Destructive action - High contrast red with clear danger signal
        destructive:
          "border border-destructive bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/95",

        // Success action - Green for positive actions
        success:
          "border border-primary bg-success text-primary-foreground shadow-sm hover:bg-success/90 active:bg-success/95",

        // Outline - Subtle with hover state
        outline:
          "border border-input bg-background hover:border-accent hover:bg-accent hover:text-accent-foreground active:bg-accent/80",

        // Secondary - Less emphasis than primary
        secondary:
          "border border-secondary bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:bg-secondary/90",

        // Ghost - Minimal, no border
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",

        // Link - Text-only
        link:
          "text-primary underline-offset-4 hover:underline active:text-primary/80",

        // Marketing - Bold, uppercase
        marketing:
          "border border-border bg-primary font-semibold uppercase tracking-wide text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg active:scale-[0.97]",

        // Marketing outline
        marketingOutline:
          "border-2 border-border bg-background font-semibold uppercase tracking-wide text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
      },
      size: {
        // Aligned with 8px spacing system
        sm: "h-8 px-3 py-1.5 text-[12px]",      // 32px height (4 × 8px)
        default: "h-10 px-4 py-2",               // 40px height (5 × 8px)
        lg: "h-12 px-6 py-3 text-[16px]",       // 48px height (6 × 8px)
        xl: "h-14 px-8 py-4 text-[16px]",       // 56px height (7 × 8px)
        icon: "size-10",                         // 40px square (5 × 8px)
        "icon-sm": "size-8",                     // 32px square (4 × 8px)
        "icon-lg": "size-12",                    // 48px square (6 × 8px)
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
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
      loadingText = "Loading...",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // UX Heuristic #1: Visibility of System Status
    return (
      <Comp data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading ? "true" : undefined}
        aria-label={loading ? loadingText : undefined}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className={`"h-4 w-4" animate-spin`} />
            <span>{loadingText}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
