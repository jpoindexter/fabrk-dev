/**
 * ✅ FABRK COMPONENT
 * Box layout component for flexible container styling.
 *
 * @example
 * ```tsx
 * <box />
 * ```
 */

import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const boxVariants = cva("", {
  variants: {
    padding: {
      none: "",
      xs: "p-2",
      sm: `${tokens.spacing.p[6]}`,
      md: `${tokens.spacing.p[6]}`,
      lg: "p-8",
      xl: "p-10",
      "2xl": "p-12",
    },
    margin: {
      none: "",
      xs: "m-2",
      sm: "m-4",
      md: "m-6",
      lg: "m-8",
      xl: "m-10",
      "2xl": "m-12",
      auto: "m-auto",
    },
    display: {
      block: "block",
      inline: "inline",
      "inline-block": "inline-block",
      flex: "flex",
      "inline-flex": "inline-flex",
      grid: "grid",
      "inline-grid": "inline-grid",
      hidden: "hidden",
    },
    position: {
      static: "static",
      relative: "relative",
      absolute: "absolute",
      fixed: "fixed",
      sticky: "sticky",
    },
    overflow: {
      visible: "overflow-visible",
      hidden: "overflow-hidden",
      clip: "overflow-clip",
      scroll: "overflow-scroll",
      auto: "overflow-auto",
      "x-auto": "overflow-x-auto",
      "y-auto": "overflow-y-auto",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
    shadow: {
      none: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
      "2xl": "",
      inner: "",
    },
    border: {
      none: "",
      all: "border",
      top: "border-t",
      right: "border-r",
      bottom: "border-b",
      left: "border-l",
      x: "border-x",
      y: "border-y",
    },
  },
  defaultVariants: {
    display: "block",
    position: "static",
    overflow: "visible",
  },
});

export interface BoxProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> {
  /**
   * Semantic element to render
   * Use semantic elements like "section", "article", "nav", "main" when appropriate
   */
  as?: React.ElementType;
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  /**
   * Accessible label for landmark elements
   * Required when using semantic elements like <nav>, <section>
   */
  "aria-label"?: string;
  /**
   * ID of element that labels this box
   */
  "aria-labelledby"?: string;
}

const Box = React.forwardRef<HTMLElement, BoxProps>(
  (
    {
      className,
      padding,
      margin,
      display,
      position,
      overflow,
      radius,
      shadow,
      border,
      as: Component = "div",
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      style,
      ...props
    },
    ref
  ) => {
    const customStyles = {
      ...style,
      ...(width && { "--width": width, width: "var(--width)" }),
      ...(height && { "--height": height, height: "var(--height)" }),
      ...(minWidth && { "--min-width": minWidth, minWidth: "var(--min-width)" }),
      ...(minHeight && { "--min-height": minHeight, minHeight: "var(--min-height)" }),
      ...(maxWidth && { "--max-width": maxWidth, maxWidth: "var(--max-width)" }),
      ...(maxHeight && { "--max-height": maxHeight, maxHeight: "var(--max-height)" }),
    } as React.CSSProperties;

    return (
      <Component
        data-slot="box"
        ref={ref}
        className={cn(
          boxVariants({
            padding,
            margin,
            display,
            position,
            overflow,
            radius,
            shadow,
            border,
          }),
          className
        )}
        style={customStyles}
        {...props}
      />
    );
  }
);
Box.displayName = "Box";

export { Box, boxVariants };
