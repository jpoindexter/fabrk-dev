/**
 * ✅ FABRK COMPONENT
 * TerminalCard - ONE canonical card component for the entire codebase.
 * One shell, content is composition. Variants control tone, size, and interactivity.
 *
 * Design System Integration:
 * - Imports from @/design-system for static mode (server components)
 * - Radius from visual mode config (mode.radius applies the correct value)
 * - Spacing follows 8-point grid
 *
 * Size Guide:
 * - "auto": Natural height, use for standalone cards, notes, badges
 * - "full": h-full for equal-height grids (default)
 *
 * @example
 * ```tsx
 * // Grid card (equal heights)
 * <TerminalCard tone="primary" interactive>
 *   <TerminalCardHeader code="0x00" title="TITLE" icon={<Icon />} />
 *   <TerminalCardContent>Any content here</TerminalCardContent>
 * </TerminalCard>
 *
 * // Standalone card (natural height)
 * <TerminalCard size="auto">
 *   <TerminalCardContent>Note content</TerminalCardContent>
 * </TerminalCard>
 * ```
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

/**
 * TerminalCard - ONE canonical card component
 * One shell, content is composition. Variants control tone, size, and interactivity.
 */
export type TerminalCardTone = "neutral" | "primary" | "success" | "warning" | "danger";
export type TerminalCardSize = "auto" | "full";

export type TerminalCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Color tone for border */
  tone?: TerminalCardTone;
  /** Size behavior: "auto" = natural height, "full" = h-full for grids */
  size?: TerminalCardSize;
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

const sizeStyles: Record<TerminalCardSize, string> = {
  auto: "", // Natural height
  full: "h-full", // Equal height for grids
};

const TerminalCard = React.forwardRef<HTMLDivElement, TerminalCardProps>(
  (
    {
      className,
      tone = "neutral",
      size = "full",
      interactive = false,
      as: Component = "div",
      ...props
    },
    ref
  ) => (
    <Component
      ref={ref}
      data-slot="terminal-card"
      className={cn(
        // Base styles - ONE card shell
        "bg-card flex flex-col border",
        mode.radius,

        // Tone (border color)
        toneStyles[tone],

        // Size behavior
        sizeStyles[size],

        // Interactive states
        interactive && "group hover:border-primary/50 transition-colors",

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
export type TerminalCardHeaderProps = {
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
 * TerminalCardContent - Content area with configurable padding
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
 * TerminalBadge - Inline badge with terminal pattern [ [0xXX] LABEL ] META
 * Used for section headers, page labels, and inline status indicators.
 * This is NOT a card - it's a compact inline element.
 *
 * @example
 * ```tsx
 * // Section header badge
 * <TerminalBadge code="0x00" label="SYSTEM_INIT" meta="SAAS_BOILERPLATE_v2.0" />
 *
 * // Simple badge without meta
 * <TerminalBadge code="0x50" label="DEV_EXPERIENCE" />
 * ```
 */
export type TerminalBadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Hex code displayed in brackets (e.g., "0x00", "0x01") */
  code?: string;
  /** Primary label text */
  label: string;
  /** Optional metadata after the label (e.g., "v2.0", "FIB[144]") */
  meta?: string;
};

const TerminalBadge = React.forwardRef<HTMLDivElement, TerminalBadgeProps>(
  ({ code = "0x00", label, meta, className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-badge"
      className={cn("border-border bg-card inline-block border px-4 py-2", mode.radius, className)}
      {...props}
    >
      <span className={cn("text-muted-foreground text-xs", mode.font)}>
        [ [{code}] {label} ]{meta ? ` ${meta}` : ""}
      </span>
    </div>
  )
);
TerminalBadge.displayName = "TerminalBadge";

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
    <TerminalCard ref={ref} className={className} {...props}>
      <TerminalCardHeader code={code} title={title} />
      <TerminalCardContent>
        <StyledLabel className="mb-4">{title}</StyledLabel>
        <FeatureList>
          {features.map((feature, index) => (
            <FeatureItem key={index} icon={featureIcon}>
              {feature}
            </FeatureItem>
          ))}
        </FeatureList>
        {note && <InfoNote>{note}</InfoNote>}
      </TerminalCardContent>
    </TerminalCard>
  )
);
FeaturesCard.displayName = "FeaturesCard";

export {
  // Canonical terminal components
  TerminalCard,
  TerminalCardHeader,
  TerminalCardContent,
  TerminalCardFooter,
  TerminalStat,
  TerminalStatGroup,
  // Inline badge (not a card)
  TerminalBadge,
  // Helper components
  StyledLabel,
  FeatureItem,
  FeatureList,
  InfoNote,
  PageBadge,
  TemplatePageHeader,
  FeaturesCard,
};
