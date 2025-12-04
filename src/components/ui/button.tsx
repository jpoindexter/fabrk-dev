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
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-mono text-xs font-medium uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-foreground/20 bg-background hover:bg-foreground/10 hover:border-foreground/40",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-foreground/10 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Consistent high-emphasis CTA styles used across marketing, demo, and variation pages
        // Industry standard: All button variants use rounded-none for consistency
        primaryCta:
          "bg-primary text-primary-foreground hover:bg-primary/90 rounded-none text-base px-6 py-4",
        secondaryCta:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-none text-base px-6 py-4",
        ghostOnDark:
          "border border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10 rounded-none text-base px-6 py-4",
      },
      size: {
        // WCAG 2.1 AA: min-h-[44px] ensures adequate touch target on mobile
        default: "min-h-[44px] px-4 py-1.5 sm:min-h-0 sm:h-8",
        sm: "min-h-[44px] min-w-[44px] rounded-none px-2 text-xs sm:min-h-0 sm:min-w-0 sm:h-8",
        lg: "min-h-[44px] rounded-none px-6 sm:min-h-0 sm:h-9",
        xl: "min-h-[44px] rounded-none px-8 text-lg sm:min-h-0 sm:h-12",
        icon: "min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:h-10 sm:w-10",
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
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading ? "true" : undefined}
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
Button.displayName = "Button";

export { Button, buttonVariants };
