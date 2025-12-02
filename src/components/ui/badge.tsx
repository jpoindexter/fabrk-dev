import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-none border w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none transition-colors gap-1.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-primary hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/90",
        accent: "bg-accent text-accent-foreground border-accent hover:bg-accent/90",
        destructive: "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90",
        neutral: "bg-background text-foreground border-foreground hover:bg-muted",
        outline: "bg-transparent border-foreground text-foreground hover:bg-foreground/10",
      },
      size: {
        // Industry standard: Minimum py-1.5 (6px) for touch-friendly spacing
        sm: "px-2 py-1.5 font-mono text-xs font-semibold [&>svg]:size-3",
        md: "px-3 py-1.5 font-mono text-xs font-medium [&>svg]:size-3",
        lg: "px-4 py-1.5 font-mono text-xs font-semibold [&>svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
