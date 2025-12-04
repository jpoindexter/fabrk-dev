/**
 * ✅ FABRK COMPONENT
 * Card component for grouping related content with consistent styling.
 * Uses Visual Mode System for aesthetic switching.
 *
 * @example
 * ```tsx
 * <card />
 * ```
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { mode } from "@/lib/design-system";

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
        // Radius from Visual Mode System
        "bg-card text-card-foreground border",
        mode.radius,

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
        // Typography - font from Visual Mode System
        "text-base font-semibold",
        mode.font,
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
        // Typography - font from Visual Mode System
        "text-xs font-normal",
        mode.font,
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
 * <StyledCard>
 *   <StyledCardHeader code="0x00" title="SECTION_TITLE" />
 *   <CardContent>...</CardContent>
 * </StyledCard>
 * ```
 */
export type StyledCardHeaderProps = {
  /** Hex code displayed in brackets (e.g., "0x00", "0x01") */
  code?: string;
  /** Title displayed after the hex code in UPPERCASE_SNAKE_CASE */
  title: string;
  /** Optional className for additional styling */
  className?: string;
};

const StyledCardHeader = React.forwardRef<HTMLDivElement, StyledCardHeaderProps>(
  ({ code = "0x00", title, className }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-card-header"
      className={cn("border-border border-b px-4 py-2", className)}
    >
      <span className={cn("text-muted-foreground text-xs", mode.font)}>
        [ [{code}] {title} ]
      </span>
    </div>
  )
);
StyledCardHeader.displayName = "StyledCardHeader";

/**
 * Terminal-style card container
 * Wrapper for cards that use the terminal aesthetic
 */
export type StyledCardProps = React.HTMLAttributes<HTMLDivElement>;

const StyledCard = React.forwardRef<HTMLDivElement, StyledCardProps>(
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
StyledCard.displayName = "StyledCard";

/**
 * Terminal-style label with brackets
 * Used for [LABEL]: patterns throughout templates
 *
 * @example
 * ```tsx
 * <TerminalLabel>TEMPLATE_FEATURES</TerminalLabel>
 * // Renders: [TEMPLATE_FEATURES]:
 * ```
 */
export type TerminalLabelProps = React.HTMLAttributes<HTMLDivElement> & {
  /** The label text (will be wrapped in brackets with colon) */
  children: React.ReactNode;
  /** Whether to show the colon after the brackets */
  showColon?: boolean;
};

const TerminalLabel = React.forwardRef<HTMLDivElement, TerminalLabelProps>(
  ({ children, showColon = true, className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-label"
      className={cn("text-muted-foreground text-xs", mode.font, className)}
      {...props}
    >
      [{children}]{showColon ? ":" : ""}
    </div>
  )
);
TerminalLabel.displayName = "TerminalLabel";

/**
 * Terminal-style feature list item with > prefix
 * Used for listing features in template cards
 *
 * @example
 * ```tsx
 * <TerminalFeatureItem>Multi-step form wizard</TerminalFeatureItem>
 * // Renders: > Multi-step form wizard
 * ```
 */
export type TerminalFeatureItemProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  /** Icon to use before text. Defaults to ">" */
  icon?: "arrow" | "check" | "dot";
};

const TerminalFeatureItem = React.forwardRef<HTMLDivElement, TerminalFeatureItemProps>(
  ({ children, icon = "arrow", className, ...props }, ref) => {
    const iconMap = {
      arrow: ">",
      check: "✓",
      dot: "•",
    };

    return (
      <div
        ref={ref}
        data-slot="terminal-feature-item"
        className={cn("text-xs", mode.font, className)}
        {...props}
      >
        <span className="text-success">{iconMap[icon]}</span> {children}
      </div>
    );
  }
);
TerminalFeatureItem.displayName = "TerminalFeatureItem";

/**
 * Terminal-style feature list container
 * Wraps multiple TerminalFeatureItem components
 *
 * @example
 * ```tsx
 * <TerminalFeatureList>
 *   <TerminalFeatureItem>Feature 1</TerminalFeatureItem>
 *   <TerminalFeatureItem>Feature 2</TerminalFeatureItem>
 * </TerminalFeatureList>
 * ```
 */
export type TerminalFeatureListProps = React.HTMLAttributes<HTMLDivElement>;

const TerminalFeatureList = React.forwardRef<HTMLDivElement, TerminalFeatureListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-feature-list"
      className={cn("space-y-1.5 text-xs", mode.font, className)}
      {...props}
    >
      {children}
    </div>
  )
);
TerminalFeatureList.displayName = "TerminalFeatureList";

/**
 * Terminal-style note/info text
 * Used for [NOTE]: patterns at the bottom of feature cards
 *
 * @example
 * ```tsx
 * <TerminalNote>Connect to your API to persist data.</TerminalNote>
 * // Renders: [NOTE]: Connect to your API to persist data.
 * ```
 */
export type TerminalNoteProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  /** Label text. Defaults to "NOTE" */
  label?: string;
};

const TerminalNote = React.forwardRef<HTMLDivElement, TerminalNoteProps>(
  ({ children, label = "NOTE", className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-note"
      className={cn("text-muted-foreground mt-4 text-xs", mode.font, className)}
      {...props}
    >
      [{label}]: {children}
    </div>
  )
);
TerminalNote.displayName = "TerminalNote";

/**
 * Terminal-style page badge
 * Used for [TEMPLATE]: NAME badges at top of template pages
 *
 * @example
 * ```tsx
 * <TerminalBadge>SIGN_IN</TerminalBadge>
 * // Renders: [TEMPLATE]: SIGN_IN
 * ```
 */
export type TerminalBadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  /** Prefix label. Defaults to "TEMPLATE" */
  prefix?: string;
};

const TerminalBadge = React.forwardRef<HTMLDivElement, TerminalBadgeProps>(
  ({ children, prefix = "TEMPLATE", className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-badge"
      className={cn("border-border inline-block border px-4 py-1", mode.radius, className)}
      {...props}
    >
      <span className={cn("text-muted-foreground text-xs", mode.font)}>
        [{prefix}]: {children}
      </span>
    </div>
  )
);
TerminalBadge.displayName = "TerminalBadge";

/**
 * Template page header component
 * Combines badge, title, and description in a consistent layout
 *
 * @example
 * ```tsx
 * <TemplatePageHeader
 *   badge="SIGN_IN"
 *   title="Sign In"
 *   description="Login page with social auth options"
 * />
 * ```
 */
export type TemplatePageHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Badge text (appears in [TEMPLATE]: BADGE) */
  badge: string;
  /** Page title */
  title: string;
  /** Page description */
  description?: string;
  /** Badge prefix. Defaults to "TEMPLATE" */
  badgePrefix?: string;
};

const TemplatePageHeader = React.forwardRef<HTMLDivElement, TemplatePageHeaderProps>(
  ({ badge, title, description, badgePrefix = "TEMPLATE", className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="template-page-header"
      className={cn("space-y-2", className)}
      {...props}
    >
      <TerminalBadge prefix={badgePrefix}>{badge}</TerminalBadge>
      <h1 className={cn("text-4xl font-semibold tracking-tight", mode.font)}>{title}</h1>
      {description && (
        <p className={cn("text-muted-foreground text-sm", mode.font)}>{description}</p>
      )}
    </div>
  )
);
TemplatePageHeader.displayName = "TemplatePageHeader";

/**
 * Terminal-style features card with header and feature list
 * Complete card component for template feature documentation
 *
 * @example
 * ```tsx
 * <FeaturesCard
 *   title="TEMPLATE_FEATURES"
 *   features={["Feature 1", "Feature 2"]}
 *   note="Connect to your API for real data."
 * />
 * ```
 */
export type FeaturesCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Card header title */
  title?: string;
  /** Hex code for header */
  code?: string;
  /** List of feature strings */
  features: string[];
  /** Optional note text at bottom */
  note?: string;
  /** Feature icon type */
  featureIcon?: "arrow" | "check" | "dot";
};

const FeaturesCard = React.forwardRef<HTMLDivElement, FeaturesCardProps>(
  (
    {
      title = "TEMPLATE_FEATURES",
      code = "0x00",
      features,
      note,
      featureIcon = "arrow",
      className,
      ...props
    },
    ref
  ) => (
    <StyledCard ref={ref} className={className} {...props}>
      <StyledCardHeader code={code} title={title} />
      <div className="p-4">
        <TerminalLabel className="mb-4">{title}</TerminalLabel>
        <TerminalFeatureList>
          {features.map((feature, index) => (
            <TerminalFeatureItem key={index} icon={featureIcon}>
              {feature}
            </TerminalFeatureItem>
          ))}
        </TerminalFeatureList>
        {note && <TerminalNote>{note}</TerminalNote>}
      </div>
    </StyledCard>
  )
);
FeaturesCard.displayName = "FeaturesCard";

/**
 * Terminal-style output window
 * Used for displaying terminal/CLI output with a simple header
 * No macOS-style colored dots - uses terminal aesthetic
 *
 * @example
 * ```tsx
 * <TerminalOutput title="terminal">
 *   <div>$ command</div>
 *   <div>output line</div>
 * </TerminalOutput>
 * ```
 */
export type TerminalOutputProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Title shown in header. Defaults to "terminal" */
  title?: string;
  children: React.ReactNode;
};

const TerminalOutput = React.forwardRef<HTMLDivElement, TerminalOutputProps>(
  ({ title = "terminal", children, className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-output"
      className={cn("border-border bg-card border text-left", mode.radius, className)}
      {...props}
    >
      <div className="border-border/50 flex items-center gap-2 border-b px-4 py-1.5">
        <span className={cn("text-muted-foreground text-xs", mode.font)}>[ {title} ]</span>
      </div>
      <div className={cn("text-foreground space-y-0.5 p-4 text-xs", mode.font)}>{children}</div>
    </div>
  )
);
TerminalOutput.displayName = "TerminalOutput";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  StyledCard,
  StyledCardHeader,
  TerminalLabel,
  TerminalFeatureItem,
  TerminalFeatureList,
  TerminalNote,
  TerminalBadge,
  TemplatePageHeader,
  FeaturesCard,
  TerminalOutput,
};
