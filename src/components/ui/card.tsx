/**
 * ✅ FABRK COMPONENT
 * Card component for grouping related content with consistent styling.
 * Uses Visual Mode System for aesthetic switching.
 *
 * Design System Integration:
 * - Imports from @/design-system for static mode (server components)
 * - Radius from visual mode config (mode.radius applies the correct value)
 * - Focus ring using design tokens (focus-within:ring-primary)
 * - Spacing follows 8-point grid: p-6 (24px), space-y-2 (8px)
 *
 * Component Hierarchy:
 * - Card → Container with border and background
 * - CardHeader → Title area with vertical spacing
 * - CardTitle → Semantic heading (h1-h6)
 * - CardDescription → Muted description text
 * - CardContent → Main content area
 * - CardFooter → Action area
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Settings</CardTitle>
 *     <CardDescription>Manage your preferences</CardDescription>
 *   </CardHeader>
 *   <CardContent>...</CardContent>
 * </Card>
 * ```
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

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
        "flex flex-col space-y-2 p-6", // 8px gap, 24px padding (both on 8-point grid)
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
 * Sharp-style card header with hex code prefix
 * Used across all template pages for consistent sharp aesthetic
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
  /** Optional icon displayed on the right side of header */
  icon?: React.ReactNode;
  /** Optional metadata displayed on right (e.g., "8 items") */
  meta?: React.ReactNode;
  /** Optional className for additional styling */
  className?: string;
};

const StyledCardHeader = React.forwardRef<HTMLDivElement, StyledCardHeaderProps>(
  ({ code = "0x00", title, icon, meta, className }, ref) => (
    <div
      ref={ref}
      data-slot="styled-card-header"
      className={cn(
        "border-border flex items-center justify-between border-b px-4 py-2",
        className
      )}
    >
      <span className={cn("text-muted-foreground text-xs", mode.font)}>
        [ [{code}] {title} ]
      </span>
      {(icon || meta) && (
        <span className="flex items-center gap-2">
          {meta && <span className={cn("text-muted-foreground text-xs", mode.font)}>{meta}</span>}
          {icon}
        </span>
      )}
    </div>
  )
);
StyledCardHeader.displayName = "StyledCardHeader";

/**
 * Styled card container
 * Wrapper for cards that use the sharp aesthetic
 */
export type StyledCardProps = React.HTMLAttributes<HTMLDivElement>;

const StyledCard = React.forwardRef<HTMLDivElement, StyledCardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="styled-card"
      className={cn("border-border bg-card border", mode.radius, className)}
      {...props}
    >
      {children}
    </div>
  )
);
StyledCard.displayName = "StyledCard";

/**
 * Bracketed label with brackets
 * Used for [LABEL]: patterns throughout templates
 *
 * @example
 * ```tsx
 * <StyledLabel>TEMPLATE_FEATURES</StyledLabel>
 * // Renders: [TEMPLATE_FEATURES]:
 * ```
 */
export type StyledLabelProps = React.HTMLAttributes<HTMLDivElement> & {
  /** The label text (will be wrapped in brackets with colon) */
  children: React.ReactNode;
  /** Whether to show the colon after the brackets */
  showColon?: boolean;
};

const StyledLabel = React.forwardRef<HTMLDivElement, StyledLabelProps>(
  ({ children, showColon = true, className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="styled-label"
      className={cn("text-muted-foreground text-xs", mode.font, className)}
      {...props}
    >
      [{children}]{showColon ? ":" : ""}
    </div>
  )
);
StyledLabel.displayName = "StyledLabel";

/**
 * Feature list item with > prefix
 * Used for listing features in template cards
 *
 * @example
 * ```tsx
 * <FeatureItem>Multi-step form wizard</FeatureItem>
 * // Renders: > Multi-step form wizard
 * ```
 */
export type FeatureItemProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  /** Icon to use before text. Defaults to ">" */
  icon?: "arrow" | "check" | "dot";
};

const FeatureItem = React.forwardRef<HTMLDivElement, FeatureItemProps>(
  ({ children, icon = "arrow", className, ...props }, ref) => {
    const iconMap = {
      arrow: ">",
      check: "✓",
      dot: "•",
    };

    return (
      <div
        ref={ref}
        data-slot="feature-item"
        className={cn("text-xs", mode.font, className)}
        {...props}
      >
        <span className="text-success">{iconMap[icon]}</span> {children}
      </div>
    );
  }
);
FeatureItem.displayName = "FeatureItem";

/**
 * Feature list container
 * Wraps multiple FeatureItem components
 *
 * @example
 * ```tsx
 * <FeatureList>
 *   <FeatureItem>Feature 1</FeatureItem>
 *   <FeatureItem>Feature 2</FeatureItem>
 * </FeatureList>
 * ```
 */
export type FeatureListProps = React.HTMLAttributes<HTMLDivElement>;

const FeatureList = React.forwardRef<HTMLDivElement, FeatureListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="feature-list"
      className={cn("space-y-2 text-xs", mode.font, className)}
      {...props}
    >
      {children}
    </div>
  )
);
FeatureList.displayName = "FeatureList";

/**
 * Note/info text
 * Used for [NOTE]: patterns at the bottom of feature cards
 *
 * @example
 * ```tsx
 * <InfoNote>Connect to your API to persist data.</InfoNote>
 * // Renders: [NOTE]: Connect to your API to persist data.
 * ```
 */
export type InfoNoteProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  /** Label text. Defaults to "NOTE" */
  label?: string;
};

const InfoNote = React.forwardRef<HTMLDivElement, InfoNoteProps>(
  ({ children, label = "NOTE", className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="info-note"
      className={cn("text-muted-foreground mt-4 text-xs", mode.font, className)}
      {...props}
    >
      [{label}]: {children}
    </div>
  )
);
InfoNote.displayName = "InfoNote";

/**
 * Page badge
 * Used for [TEMPLATE]: NAME badges at top of template pages
 *
 * @example
 * ```tsx
 * <PageBadge>SIGN_IN</PageBadge>
 * // Renders: [TEMPLATE]: SIGN_IN
 * ```
 */
export type PageBadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  /** Prefix label. Defaults to "TEMPLATE" */
  prefix?: string;
};

const PageBadge = React.forwardRef<HTMLDivElement, PageBadgeProps>(
  ({ children, prefix = "TEMPLATE", className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="page-badge"
      className={cn("border-border inline-block border px-4 py-1", mode.radius, className)}
      {...props}
    >
      <span className={cn("text-muted-foreground text-xs", mode.font)}>
        [{prefix}]: {children}
      </span>
    </div>
  )
);
PageBadge.displayName = "PageBadge";

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
      <PageBadge prefix={badgePrefix}>{badge}</PageBadge>
      <h1 className={cn("text-4xl font-semibold tracking-tight", mode.font)}>{title}</h1>
      {description && (
        <p className={cn("text-muted-foreground text-sm", mode.font)}>{description}</p>
      )}
    </div>
  )
);
TemplatePageHeader.displayName = "TemplatePageHeader";

/**
 * Features card with header and feature list
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
        <StyledLabel className="mb-4">{title}</StyledLabel>
        <FeatureList>
          {features.map((feature, index) => (
            <FeatureItem key={index} icon={featureIcon}>
              {feature}
            </FeatureItem>
          ))}
        </FeatureList>
        {note && <InfoNote>{note}</InfoNote>}
      </div>
    </StyledCard>
  )
);
FeaturesCard.displayName = "FeaturesCard";

/**
 * TerminalCard - ONE canonical card component
 * One shell, content is composition. Variants control tone and interactivity.
 *
 * @example
 * ```tsx
 * <TerminalCard tone="primary" interactive>
 *   <TerminalCardHeader code="0x00" title="TITLE" icon={<Icon />} />
 *   <TerminalCardContent>Any content here</TerminalCardContent>
 *   <TerminalCardFooter>Optional actions</TerminalCardFooter>
 * </TerminalCard>
 * ```
 */
export type TerminalCardTone = "neutral" | "primary" | "success" | "warning" | "danger";

export type TerminalCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Color tone for border */
  tone?: TerminalCardTone;
  /** Enable hover/focus states for interactive cards */
  interactive?: boolean;
  /** Semantic HTML element */
  as?: "div" | "article" | "section";
};

const toneStyles: Record<TerminalCardTone, string> = {
  neutral: "border-border",
  primary: "border-primary",
  success: "border-success",
  warning: "border-warning",
  danger: "border-destructive",
};

const TerminalCard = React.forwardRef<HTMLDivElement, TerminalCardProps>(
  ({ className, tone = "neutral", interactive = false, as: Component = "div", ...props }, ref) => (
    <Component
      ref={ref}
      data-slot="terminal-card"
      className={cn(
        // Base styles - ONE card shell
        "bg-card flex flex-col border",
        mode.radius,

        // Tone (border color)
        toneStyles[tone],

        // Interactive states
        interactive && "group hover:border-primary/50 transition-colors",

        // Equal height support
        "h-full",

        className
      )}
      {...props}
    />
  )
);
TerminalCard.displayName = "TerminalCard";

/**
 * TerminalCardHeader - Header with terminal pattern [ [0xXX] TITLE ]
 */
export type TerminalCardHeaderProps = StyledCardHeaderProps;

const TerminalCardHeader = React.forwardRef<HTMLDivElement, TerminalCardHeaderProps>(
  ({ code = "0x00", title, icon, meta, className }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-card-header"
      className={cn(
        "border-border flex items-center justify-between border-b px-4 py-2",
        className
      )}
    >
      <span className={cn("text-muted-foreground text-xs", mode.font)}>
        [ [{code}] {title} ]
      </span>
      {(icon || meta) && (
        <span className="flex items-center gap-2">
          {meta && <span className={cn("text-muted-foreground text-xs", mode.font)}>{meta}</span>}
          {icon}
        </span>
      )}
    </div>
  )
);
TerminalCardHeader.displayName = "TerminalCardHeader";

/**
 * TerminalCardContent - Content area with optional DESC: prefix
 */
export type TerminalCardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Padding size */
  padding?: "sm" | "md" | "lg";
};

const paddingStyles = {
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

const TerminalCardContent = React.forwardRef<HTMLDivElement, TerminalCardContentProps>(
  ({ className, padding = "md", ...props }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-card-content"
      className={cn("flex-1", paddingStyles[padding], className)}
      {...props}
    />
  )
);
TerminalCardContent.displayName = "TerminalCardContent";

/**
 * TerminalCardFooter - Footer area for actions
 */
export type TerminalCardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const TerminalCardFooter = React.forwardRef<HTMLDivElement, TerminalCardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-card-footer"
      className={cn("border-border flex items-center gap-2 border-t px-4 py-2", className)}
      {...props}
    />
  )
);
TerminalCardFooter.displayName = "TerminalCardFooter";

/**
 * TerminalStat - Key-value pair with label and highlighted value
 * Used in hero cards and stat displays
 *
 * @example
 * ```tsx
 * <TerminalStatGroup>
 *   <TerminalStat label="Speed" value="OPTIMIZED" />
 *   <TerminalStat label="Integration" value="SEAMLESS" />
 * </TerminalStatGroup>
 * ```
 */
export type TerminalStatProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Label text (muted color) */
  label: string;
  /** Value text (primary color) */
  value: string | number;
  /** Size variant */
  size?: "sm" | "md";
};

const TerminalStat = React.forwardRef<HTMLSpanElement, TerminalStatProps>(
  ({ label, value, size = "md", className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="terminal-stat"
      className={cn(size === "sm" ? "text-xs" : "text-sm", className)}
      {...props}
    >
      <span className={cn("text-muted-foreground", mode.font)}>{label}:</span>{" "}
      <span className={cn("text-primary", mode.font)}>{value}</span>
    </span>
  )
);
TerminalStat.displayName = "TerminalStat";

/**
 * TerminalStatGroup - Container for multiple TerminalStat components
 */
export type TerminalStatGroupProps = React.HTMLAttributes<HTMLDivElement>;

const TerminalStatGroup = React.forwardRef<HTMLDivElement, TerminalStatGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-stat-group"
      className={cn("flex flex-wrap gap-4", className)}
      {...props}
    />
  )
);
TerminalStatGroup.displayName = "TerminalStatGroup";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  StyledCard,
  StyledCardHeader,
  StyledLabel,
  FeatureItem,
  FeatureList,
  InfoNote,
  PageBadge,
  TemplatePageHeader,
  FeaturesCard,
  // Canonical terminal components
  TerminalCard,
  TerminalCardHeader,
  TerminalCardContent,
  TerminalCardFooter,
  TerminalStat,
  TerminalStatGroup,
};
