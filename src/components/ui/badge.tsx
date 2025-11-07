import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border-2 px-2.5 py-0.5 text-xs font-bold transition-all duration-150 ease-out shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]",
  {
    variants: {
      variant: {
        default:
          "border-black dark:border-white bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-black dark:border-white bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success:
          "border-green-600 bg-green-500 text-white hover:bg-green-600",
        warning:
          "border-yellow-600 bg-yellow-500 text-black hover:bg-yellow-600",
        outline:
          "border-black dark:border-white text-foreground bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
