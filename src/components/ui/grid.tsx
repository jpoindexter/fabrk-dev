/**
 * ✅ FABRK COMPONENT
 * Grid layout component.
 *
 * @example
 * ```tsx
 * <grid />
 * ```
 */

import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12",
      none: "grid-cols-none",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: `${tokens.spacing.gap[2]}`,
      3: "gap-3",
      4: `${tokens.spacing.gap[6]}`,
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
    flow: {
      row: "grid-flow-row",
      col: "grid-flow-col",
      dense: "grid-flow-dense",
      "row-dense": "grid-flow-row-dense",
      "col-dense": "grid-flow-col-dense",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 4,
    flow: "row",
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /**
   * Semantic element to render (div, section, ul, etc.)
   * Use "ul" for lists of items, "section" for content sections
   */
  as?: React.ElementType;
  responsive?: boolean;
  /**
   * Accessible label for the grid region
   */
  "aria-label"?: string;
  /**
   * ID of element that labels this grid
   */
  "aria-labelledby"?: string;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, flow, as: Component = "div", responsive = true, ...props }, ref) => {
    const responsiveClass = responsive
      ? {
          1: "grid-cols-1",
          2: "grid-cols-1 sm:grid-cols-2",
          3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
          6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
        }[cols as number] || gridVariants({ cols })
      : gridVariants({ cols });

    return (
      <Component
        data-slot="grid"
        ref={ref}
        className={cn(
          "grid",
          responsive ? responsiveClass : gridVariants({ cols }),
          gridVariants({ gap, flow }),
          className
        )}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto" | "full";
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6 | "auto" | "full";
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | "auto";
  rowStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | "auto";
  as?: React.ElementType;
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, rowSpan, colStart, rowStart, as: Component = "div", ...props }, ref) => {
    const spanClasses = cn(
      colSpan &&
        {
          1: "col-span-1",
          2: "col-span-2",
          3: "col-span-3",
          4: "col-span-4",
          5: "col-span-5",
          6: "col-span-6",
          7: "col-span-7",
          8: "col-span-8",
          9: "col-span-9",
          10: "col-span-10",
          11: "col-span-11",
          12: "col-span-12",
          auto: "col-auto",
          full: "col-span-full",
        }[colSpan],
      rowSpan &&
        {
          1: "row-span-1",
          2: "row-span-2",
          3: "row-span-3",
          4: "row-span-4",
          5: "row-span-5",
          6: "row-span-6",
          auto: "row-auto",
          full: "row-span-full",
        }[rowSpan],
      colStart &&
        {
          1: "col-start-1",
          2: "col-start-2",
          3: "col-start-3",
          4: "col-start-4",
          5: "col-start-5",
          6: "col-start-6",
          7: "col-start-7",
          8: "col-start-8",
          9: "col-start-9",
          10: "col-start-10",
          11: "col-start-11",
          12: "col-start-12",
          13: "col-start-13",
          auto: "col-start-auto",
        }[colStart],
      rowStart &&
        {
          1: "row-start-1",
          2: "row-start-2",
          3: "row-start-3",
          4: "row-start-4",
          5: "row-start-5",
          6: "row-start-6",
          7: "row-start-7",
          auto: "row-start-auto",
        }[rowStart]
    );

    return (
      <Component
        data-slot="grid-item"
        ref={ref}
        className={cn(spanClasses, className)}
        {...props}
      />
    );
  }
);
GridItem.displayName = "GridItem";

export { Grid, GridItem, gridVariants };
