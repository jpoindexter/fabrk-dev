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
        // Brutalist base styles
        "rounded-brutal border-4 border-black bg-card text-card-foreground shadow-brutal",

        // Brutalist transitions - snappy 150ms
        "transition-brutal",

        // Brutalist hover state - lift + grow shadow
        "hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1",

        // Focus-within state - thick ring for accessibility
        "focus-within:ring-4 focus-within:ring-primary",

        // Dark mode
        "dark:border-white dark:bg-card dark:shadow-brutal",
        "dark:hover:shadow-brutal-lg",

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
        // Brutalist typography - bold and commanding
        "text-[20px] leading-[1.2] font-black tracking-[-0.018em]",
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
        // Brutalist typography - bold body text
        "text-[14px] leading-[1.5] font-bold tracking-[-0.003em]",
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
