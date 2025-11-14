/**
 * ✅ FABRK COMPONENT
 * Text component with typography variants.
 *
 * @example
 * ```tsx
 * <text variant="default" />
 * ```
 */

import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl",
      h2: "text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl",
      h3: "text-2xl font-medium tracking-tight md:text-3xl lg:text-4xl",
      h4: "text-xl font-medium md:text-2xl lg:text-3xl",
      h5: "text-lg font-medium md:text-xl lg:text-2xl",
      h6: "text-base font-medium md:text-lg lg:text-xl",
      body1: `${tokens.text.size.base}`,
      body2: `"text-sm"`,
      subtitle1: "text-lg font-medium",
      subtitle2: "text-base font-medium",
      caption: "text-xs text-muted-foreground",
      overline: "text-xs font-medium uppercase tracking-wide",
      code: "rounded border border-border bg-card px-1.5 py-0.5 font-mono text-sm",
      blockquote: "border-l-4 border-primary pl-4 italic",
    },
    color: {
      inherit: "",
      primary: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
      success: "text-primary",
      warning: "text-accent-foreground",
      info: "text-primary",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    weight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-medium",
      bold: "font-medium",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    size: {
      xs: `"text-xs"`,
      sm: `"text-sm"`,
      base: `${tokens.text.size.base}`,
      lg: `"text-lg"`,
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
      "8xl": "text-8xl",
      "9xl": "text-9xl",
    },
    decoration: {
      none: "",
      underline: "underline",
      overline: "overline",
      "line-through": "line-through",
    },
    transform: {
      none: "",
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
    },
    leading: {
      none: "leading-none",
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    },
    truncate: {
      none: "",
      single: "truncate",
      multi: "line-clamp-2",
    },
  },
  defaultVariants: {
    variant: "body1",
    color: "inherit",
    align: "left",
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
  gradient?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  noWrap?: boolean;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      variant,
      color,
      align,
      weight,
      size,
      decoration,
      transform,
      leading,
      truncate,
      as,
      gradient = false,
      gradientFrom = "from-primary",
      gradientTo = "to-primary",
      noWrap = false,
      ...props
    },
    ref
  ) => {
    // Determine the element type based on variant if not explicitly set
    let Component = as;
    if (!Component) {
      switch (variant) {
        case "h1":
          Component = "h1";
          break;
        case "h2":
          Component = "h2";
          break;
        case "h3":
          Component = "h3";
          break;
        case "h4":
          Component = "h4";
          break;
        case "h5":
          Component = "h5";
          break;
        case "h6":
          Component = "h6";
          break;
        case "blockquote":
          Component = "blockquote";
          break;
        case "code":
          Component = "code";
          break;
        default:
          Component = "p";
      }
    }

    return (
      <Component
        data-slot="text"
        ref={ref}
        className={cn(
          textVariants({
            variant,
            color: gradient ? undefined : color,
            align,
            weight,
            size: variant ? undefined : size,
            decoration,
            transform,
            leading,
            truncate,
          }),
          gradient &&
            `bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-background/0`,
          noWrap && "whitespace-nowrap",
          className
        )}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };
