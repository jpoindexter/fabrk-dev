/**
 * ✅ FABRK COMPONENT
 * Button component with variants and states.
 *
 * @example
 * ```tsx
 * <button variant="default" size="md">Content</button>
 * ```
 */

"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/design-system/utils";

const buttonVariants = cva(
  // Base styles - Neo-Brutalism with bold borders and shadows
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[14px] font-bold leading-none border-3 border-black dark:border-white shadow-brutal-sm transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary action - Purple brand color with brutal border
        default:
          "bg-primary text-primary-foreground hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",

        // Destructive action - High contrast red with brutal shadow
        destructive:
          "bg-destructive text-destructive-foreground hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",

        // Success action - Green for positive actions
        success:
          "bg-success text-success-foreground hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",

        // Outline - White background with brutal border
        outline:
          "bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",

        // Secondary - Yellow accent with brutal style
        secondary:
          "bg-secondary text-secondary-foreground hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",

        // Ghost - No shadow, minimal border
        ghost:
          "border-transparent shadow-none hover:bg-accent hover:text-accent-foreground hover:border-black dark:hover:border-white",

        // Link - Text-only, no border or shadow
        link:
          "border-transparent shadow-none text-primary underline-offset-4 hover:underline",

        // Marketing - Bold, uppercase with brutal styling
        marketing:
          "bg-primary uppercase tracking-wide text-primary-foreground hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",

        // Marketing outline - Brutal outline style
        marketingOutline:
          "bg-background uppercase tracking-wide text-foreground hover:bg-accent hover:text-accent-foreground hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",
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
