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

import { cn } from "@/lib/utils";

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
        // Vercel minimal styles - Border only, no shadow
        "bg-card text-card-foreground rounded-none border",

        // Subtle transition
        "transition-colors",

        // Focus-within state - thin ring for accessibility
        "focus-within:ring-primary focus-within:ring-2",

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
        "flex flex-col space-y-2 p-6", // 16px gap (2 × 8px), 24px padding (3 × 8px)
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
        // Terminal typography - semibold for headings
        "font-mono text-base font-semibold",
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
        // Terminal typography - normal weight for body text
        "font-mono text-xs font-normal",
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
        "px-6 pt-0 pb-6", // 24px horizontal/bottom padding (3 × 8px), 0 top padding
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
        "flex items-center px-6 pt-0 pb-6", // 24px horizontal/bottom padding (3 × 8px), 0 top padding
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

/**
 * Terminal-style card header with hex code prefix
 * Used across all template pages for consistent terminal aesthetic
 *
 * @example
 * ```tsx
 * <TerminalCard>
 *   <TerminalCardHeader code="0x00" title="SECTION_TITLE" />
 *   <CardContent>...</CardContent>
 * </TerminalCard>
 * ```
 */
export type TerminalCardHeaderProps = {
  /** Hex code displayed in brackets (e.g., "0x00", "0x01") */
  code?: string;
  /** Title displayed after the hex code in UPPERCASE_SNAKE_CASE */
  title: string;
  /** Optional className for additional styling */
  className?: string;
};

const TerminalCardHeader = React.forwardRef<HTMLDivElement, TerminalCardHeaderProps>(
  ({ code = "0x00", title, className }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-card-header"
      className={cn("border-border border-b px-4 py-2", className)}
    >
      <span className="text-muted-foreground font-mono text-xs">
        [ [{code}] {title} ]
      </span>
    </div>
  )
);
TerminalCardHeader.displayName = "TerminalCardHeader";

/**
 * Terminal-style card container
 * Wrapper for cards that use the terminal aesthetic
 */
export type TerminalCardProps = React.HTMLAttributes<HTMLDivElement>;

const TerminalCard = React.forwardRef<HTMLDivElement, TerminalCardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-card"
      className={cn("border-border bg-card border", className)}
      {...props}
    >
      {children}
    </div>
  )
);
TerminalCard.displayName = "TerminalCard";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  TerminalCard,
  TerminalCardHeader,
};
