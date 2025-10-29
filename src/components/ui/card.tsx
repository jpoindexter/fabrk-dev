/**
 * ✅ FABRK COMPONENT
 * Card component for grouping related content with consistent styling.
 *
 * @example
 * ```tsx
 * <card />
 * ```
 */

import * as React from "react";

import { cn } from "@/lib/design-system/utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Semantic element to use for the card
   * @default "div"
   */
  as?: "div" | "article" | "section";
};
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  /**
   * Heading level for semantic HTML
   * @default "h3"
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, as: Component = "div", ...props }, ref) => (
    <Component
      data-slot="card"
      ref={ref}
      className={cn(
        // Base styles - 8px spacing system
        "rounded-lg border border-border bg-card text-card-foreground shadow-sm",

        // Transitions - Smooth state changes
        "transition-all duration-200 ease-out",

        // Hover state - Subtle lift effect
        "hover:border-accent/50 hover:shadow-md",

        // Focus-within state - Clear ring indicator for accessibility
        "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",

        // Dark mode
        "dark:border-border dark:bg-card dark:shadow-sm",
        "dark:hover:border-accent/40 dark:hover:shadow-md",

        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      data-slot="card-header"
      ref={ref}
      className={cn(
        // Base styles - 8px spacing system
        "flex flex-col space-y-2 p-6",  // 16px gap (2 × 8px), 24px padding (3 × 8px)
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = "h3", ...props }, ref) => (
    <Component
      data-slot="card-title"
      ref={ref}
      className={cn(
        // Using typography tokens - matches typography.h3
        "text-[20px] leading-[1.2] font-semibold tracking-[-0.018em]",
        "text-card-foreground",

        // Dark mode
        "dark:text-card-foreground",

        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      data-slot="card-description"
      ref={ref}
      className={cn(
        // Using typography tokens - matches typography.body
        "text-[14px] leading-[1.5] font-normal tracking-[-0.003em]",
        "text-muted-foreground",

        // Dark mode
        "dark:text-muted-foreground",

        className
      )}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      data-slot="card-content"
      ref={ref}
      className={cn(
        // Base styles - 8px spacing system
        "px-6 pb-6 pt-0",  // 24px horizontal/bottom padding (3 × 8px), 0 top padding
        className
      )}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      data-slot="card-footer"
      ref={ref}
      className={cn(
        // Base styles - 8px spacing system
        "flex items-center px-6 pb-6 pt-0",  // 24px horizontal/bottom padding (3 × 8px), 0 top padding
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
