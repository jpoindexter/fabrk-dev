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
  // Neobrutalist base styles - Bold, thick borders, hard shadows
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-brutal text-[14px] font-bold leading-none transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary action - Bright yellow with thick border and hard shadow
        default:
          "border-4 border-black bg-primary text-primary-foreground shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 active:shadow-brutal-sm active:translate-x-1 active:translate-y-1",

        // Destructive action - Bold red with hard shadow
        destructive:
          "border-4 border-black bg-destructive text-destructive-foreground shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 active:shadow-brutal-sm active:translate-x-1 active:translate-y-1",

        // Success action - Lime green brutalist style
        success:
          "border-4 border-black bg-accent text-accent-foreground shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 active:shadow-brutal-sm active:translate-x-1 active:translate-y-1",

        // Outline - White with thick black border
        outline:
          "border-4 border-black bg-card text-foreground shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 active:shadow-brutal-sm active:translate-x-1 active:translate-y-1",

        // Secondary - Hot pink with hard shadow
        secondary:
          "border-4 border-black bg-secondary text-secondary-foreground shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 active:shadow-brutal-sm active:translate-x-1 active:translate-y-1",

        // Ghost - Minimal with hover transform
        ghost:
          "border-2 border-transparent hover:border-black hover:bg-muted active:bg-muted/80",

        // Link - Bold with underline
        link:
          "text-foreground font-bold underline-offset-4 hover:underline active:text-foreground/80",

        // Marketing - Ultra bold with colored shadow
        marketing:
          "border-4 border-black bg-primary font-black uppercase tracking-wide text-primary-foreground shadow-brutal-secondary hover:shadow-brutal-xl hover:-translate-x-2 hover:-translate-y-2 active:shadow-brutal active:translate-x-1 active:translate-y-1",

        // Marketing outline - Bold outline with colored hover
        marketingOutline:
          "border-4 border-black bg-card font-black uppercase tracking-wide text-foreground shadow-brutal hover:bg-primary hover:text-primary-foreground hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 active:shadow-brutal-sm active:translate-x-1 active:translate-y-1",
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
