/**
 * ✅ FABRK COMPONENT
 * Stack layout component for vertical/horizontal stacking.
 *
 * @example
 * ```tsx
 * <stack>Content</stack>
 * ```
 */

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    spacing: {
      0: "gap-0",
      1: "gap-1",
      2: `gap-2`,
      3: "gap-3",
      4: `gap-6`,
      5: "gap-5",
      6: "gap-6",
      7: "gap-7",
      8: "gap-8",
      9: "gap-9",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
      20: "gap-20",
      24: "gap-24",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
      stretch: "justify-stretch",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    direction: "column",
    spacing: 4,
    align: "stretch",
    justify: "start",
    wrap: "nowrap",
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  /**
   * Semantic element to render
   * Use "ul" for lists, "nav" for navigation
   */
  as?: React.ElementType;
  divider?: React.ReactNode;
  fullWidth?: boolean;
  fullHeight?: boolean;
  /**
   * Accessible label when used as nav or list
   */
  "aria-label"?: string;
  /**
   * ID of element that labels this stack
   */
  "aria-labelledby"?: string;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction,
      spacing,
      align,
      justify,
      wrap,
      as: Component = "div",
      divider,
      fullWidth = false,
      fullHeight = false,
      children,
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children);
    const childrenWithDividers = divider
      ? childrenArray.reduce((acc: React.ReactNode[], child, index) => {
          acc.push(child);
          if (index < childrenArray.length - 1) {
            acc.push(
              React.cloneElement(
                divider as React.ReactElement<{ "aria-hidden"?: boolean | "true" | "false" }>,
                {
                  key: `divider-${index}`,
                  "aria-hidden": "true" as const,
                }
              )
            );
          }
          return acc;
        }, [])
      : children;

    return (
      <Component
        data-slot="stack"
        ref={ref}
        className={cn(
          stackVariants({ direction, spacing, align, justify, wrap }),
          fullWidth && "w-full",
          fullHeight && "h-full",
          className
        )}
        {...props}
      >
        {childrenWithDividers}
      </Component>
    );
  }
);
Stack.displayName = "Stack";

export type HStackProps = Omit<StackProps, "direction">;

const HStack = React.forwardRef<HTMLDivElement, HStackProps>((props, ref) => {
  return <Stack data-slot="hstack" ref={ref} direction="row" {...props} />;
});
HStack.displayName = "HStack";

export type VStackProps = Omit<StackProps, "direction">;

const VStack = React.forwardRef<HTMLDivElement, VStackProps>((props, ref) => {
  return <Stack data-slot="vstack" ref={ref} direction="column" {...props} />;
});
VStack.displayName = "VStack";

export { HStack, Stack, stackVariants, VStack };
