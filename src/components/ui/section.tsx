/**
 * ✅ FABRK COMPONENT
 * Section layout component.
 *
 * @example
 * ```tsx
 * <section>Content</section>
 * ```
 */

import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const sectionVariants = cva("relative", {
  variants: {
    spacing: {
      none: "",
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-24 md:py-32",
      "2xl": "py-32 md:py-48",
    },
    background: {
      none: "",
      muted: "bg-card",
      accent: "bg-accent",
      card: "bg-card",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      gradient: "bg-gradient-to-b from-background to-card",
    },
    width: {
      full: "w-full",
      screen: "w-screen",
      constrained: "",
    },
  },
  defaultVariants: {
    spacing: "md",
    background: "none",
    width: "full",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /**
   * Semantic element to render (section, article, div, etc.)
   * @default "section"
   */
  as?: React.ElementType;
  container?: boolean;
  containerSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /**
   * Accessible label for the section
   * Required when using <section> for accessibility
   */
  "aria-label"?: string;
  /**
   * ID of element that labels this section
   */
  "aria-labelledby"?: string;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      spacing,
      background,
      width,
      as: Component = "section",
      container = true,
      containerSize = "2xl",
      children,
      ...props
    },
    ref
  ) => {
    const containerSizes = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full",
    };

    return (
      <Component
        data-slot="section"
        ref={ref}
        className={cn(sectionVariants({ spacing, background, width }), className)}
        {...props}
      >
        {container ? (
          <div className={cn("mx-auto px-6 sm:px-6 lg:px-8", containerSizes[containerSize])}>
            {children}
          </div>
        ) : (
          children
        )}
      </Component>
    );
  }
);
Section.displayName = "Section";

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center" | "right";
  as?: React.ElementType;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      className,
      title,
      subtitle,
      description,
      align = "center",
      as: Component = "div",
      children,
      ...props
    },
    ref
  ) => {
    const alignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    return (
      <Component
        data-slot="section-header"
        ref={ref}
        className={cn(`${tokens.spacing.space.y[6]}`, alignClasses[align], className)}
        {...props}
      >
        {subtitle && (
          <p className={`"text-sm" font-medium uppercase tracking-wide text-muted-foreground`}>
            {subtitle}
          </p>
        )}
        {title && (
          <h2 className={`text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl`}>{title}</h2>
        )}
        {description && (
          <p className={`"text-lg" mx-auto max-w-3xl text-muted-foreground`}>{description}</p>
        )}
        {children}
      </Component>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

export { Section, SectionHeader, sectionVariants };
