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

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Vercel minimal styles - Subtle, 1px borders, soft transitions
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[14px] font-medium leading-none transition-vercel-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary action - Clean black with subtle hover
        default:
          "border bg-primary text-primary-foreground hover:opacity-90 active:opacity-80",

        // Destructive action - Clean red with subtle hover
        destructive:
          "border bg-destructive text-destructive-foreground hover:opacity-90 active:opacity-80",

        // Success action - Clean accent color with subtle hover
        success:
          "border bg-accent text-accent-foreground hover:opacity-90 active:opacity-80",

        // Outline - Minimal border with hover background
        outline:
          "border bg-card text-foreground hover:bg-muted active:bg-muted/80",

        // Secondary - Subtle background with hover
        secondary:
          "border bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",

        // Ghost - Minimal with subtle hover
        ghost:
          "border border-transparent hover:bg-muted active:bg-muted/80",

        // Link - Clean link style
        link:
          "text-foreground font-medium underline-offset-4 hover:underline active:text-foreground/80",

        // Marketing - Bold CTA style (keeps font-bold as it's a CTA)
        marketing:
          "border bg-primary font-bold text-primary-foreground hover:opacity-90 active:opacity-80",

        // Marketing outline - Bold outline CTA (keeps font-bold as it's a CTA)
        marketingOutline:
          "border bg-card font-bold text-foreground hover:bg-primary hover:text-primary-foreground active:opacity-80",
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
