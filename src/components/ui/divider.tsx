/**
 * ✅ FABRK COMPONENT
 * Divider component for visual separation.
 *
 * @example
 * ```tsx
 * <divider variant="default" />
 * ```
 */

import { cn } from "@/lib/design-system/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const dividerVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
    variant: {
      solid: "bg-border",
      dashed: "border-border",
      dotted: "border-border",
      gradient: "bg-gradient-to-r from-background/0 via-border to-background/0",
    },
    spacing: {
      none: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
    spacing: "md",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLHRElement>,
    VariantProps<typeof dividerVariants> {
  label?: React.ReactNode;
  labelPosition?: "left" | "center" | "right";
  labelClassName?: string;
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      className,
      orientation,
      variant,
      spacing,
      label,
      labelPosition = "center",
      labelClassName,
      ...props
    },
    ref
  ) => {
    const spacingClasses = {
      none: "",
      sm: orientation === "horizontal" ? "my-2" : "mx-2",
      md: orientation === "horizontal" ? "my-4" : "mx-4",
      lg: orientation === "horizontal" ? "my-6" : "mx-6",
      xl: orientation === "horizontal" ? "my-8" : "mx-8",
    };

    const borderStyles = {
      dashed:
        orientation === "horizontal" ? "border-t-2 border-dashed" : "border-l-2 border-dashed",
      dotted:
        orientation === "horizontal" ? "border-t-2 border-dotted" : "border-l-2 border-dotted",
    };

    if (label && orientation === "horizontal") {
      const labelAlignClasses = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
      };

      return (
        <div data-slot="divider"
          className={cn(
            "flex items-center",
            spacingClasses[spacing || "md"],
            labelAlignClasses[labelPosition],
            className
          )}
          {...props}
        >
          {labelPosition === "center" && (
            <div
              className={cn(
                "flex-1",
                variant === "gradient"
                  ? "h-px bg-gradient-to-r from-background/0 via-border to-background/0"
                  : variant === "dashed"
                    ? "border-t-2 border-dashed border-border"
                    : variant === "dotted"
                      ? "border-t-2 border-dotted border-border"
                      : "h-px bg-border"
              )}
            />
          )}
          <span
            className={cn(
              "px-3 text-sm text-muted-foreground",
              labelPosition !== "center" && "pr-3",
              labelClassName
            )}
          >
            {label}
          </span>
          <div
            className={cn(
              "flex-1",
              variant === "gradient"
                ? "h-px bg-gradient-to-r from-background/0 via-border to-background/0"
                : variant === "dashed"
                  ? "border-t-2 border-dashed border-border"
                  : variant === "dotted"
                    ? "border-t-2 border-dotted border-border"
                    : "h-px bg-border"
            )}
          />
        </div>
      );
    }

    return (
      <hr
        data-slot="divider"
        ref={ref}
        className={cn(
          dividerVariants({ orientation, variant }),
          variant === "dashed" || variant === "dotted" ? borderStyles[variant] : "",
          spacingClasses[spacing || "md"],
          className
        )}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

export { Divider, dividerVariants };
