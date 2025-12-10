/**
 * ✅ FABRK COMPONENT
 * Card - ONE canonical card component for the entire codebase.
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
 * NAMING: Use generic names (Card, CardHeader, etc.) in new code.
 * Legacy names (Card, etc.) are deprecated but still exported for compatibility.
 *
 * @example
 * ```tsx
 * // Grid card (equal heights)
 * <Card tone="primary" interactive>
 *   <CardHeader code="0x00" title="TITLE" icon={<Icon />} />
 *   <CardContent>Any content here</CardContent>
 * </Card>
 *
 * // Standalone card (natural height)
 * <Card size="auto">
 *   <CardContent>Note content</CardContent>
 * </Card>
 * ```
 */

import * as React from 'react';

import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

/**
 * Card - ONE canonical card component
 * One shell, content is composition. Variants control tone, size, and interactivity.
 */
export type CardTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
export type CardSize = 'auto' | 'full';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Color tone for border */
  tone?: CardTone;
  /** Size behavior: "auto" = natural height, "full" = h-full for grids */
  size?: CardSize;
  /** Enable hover/focus states for interactive cards */
  interactive?: boolean;
  /** Semantic HTML element */
  as?: 'div' | 'article' | 'section';
};

const toneStyles: Record<CardTone, string> = {
  neutral: 'border-border',
  primary: 'border-primary',
  success: 'border-success',
  warning: 'border-warning',
  danger: 'border-destructive',
};

const sizeStyles: Record<CardSize, string> = {
  auto: '', // Natural height
  full: 'h-full', // Equal height for grids
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      tone = 'neutral',
      size = 'full',
      interactive = false,
      as: Component = 'div',
      ...props
    },
    ref
  ) => (
    <Component
      ref={ref}
      data-slot="card"
      className={cn(
        // Base styles - ONE card shell + CRT scanlines in Terminal mode
        'bg-card crt-scanlines flex flex-col border',
        mode.radius,

        // Tone (border color)
        toneStyles[tone],

        // Size behavior
        sizeStyles[size],

        // Interactive states
        interactive && 'group hover:border-primary/50 transition-colors',

        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

/**
 * CardHeader - Header with terminal pattern [ [0xXX] TITLE ]
 */
export type CardHeaderProps = {
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

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ code = '0x00', title, icon, meta, className }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        'border-border flex items-center justify-between border-b px-4 py-2',
        'last:border-b-0', // Remove bottom border when CardHeader is last child (no CardContent)
        className
      )}
    >
      <span className={cn('text-muted-foreground text-xs', mode.font)}>
        [ [{code}] {title} ]
      </span>
      {(icon || meta) && (
        <span className="flex items-center gap-2">
          {meta && <span className={cn('text-muted-foreground text-xs', mode.font)}>{meta}</span>}
          {icon}
        </span>
      )}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

/**
 * CardContent - Content area with configurable padding
 */
export type CardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Padding size */
  padding?: 'sm' | 'md' | 'lg';
};

const paddingStyles = {
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
};

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn('flex-1', paddingStyles[padding], className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

/**
 * CardFooter - Footer area for actions
 */
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn('border-border flex items-center gap-2 border-t px-4 py-2', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

/**
 * Stat - Key-value pair with label and highlighted value
 * Used in hero cards and stat displays
 *
 * @example
 * ```tsx
 * <StatGroup>
 *   <Stat label="Speed" value="OPTIMIZED" />
 *   <Stat label="Integration" value="SEAMLESS" />
 * </StatGroup>
 * ```
 */
export type StatProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Label text (muted color) */
  label: string;
  /** Value text (primary color) */
  value: string | number;
  /** Size variant */
  size?: 'sm' | 'md';
};

const Stat = React.forwardRef<HTMLSpanElement, StatProps>(
  ({ label, value, size = 'md', className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="stat"
      className={cn(size === 'sm' ? 'text-xs' : 'text-sm', className)}
      {...props}
    >
      <span className={cn('text-muted-foreground', mode.font)}>{label}:</span>{' '}
      <span className={cn('text-primary', mode.font)}>{value}</span>
    </span>
  )
);
Stat.displayName = 'Stat';

/**
 * StatGroup - Container for multiple Stat components
 */
export type StatGroupProps = React.HTMLAttributes<HTMLDivElement>;

const StatGroup = React.forwardRef<HTMLDivElement, StatGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="stat-group"
      className={cn('flex flex-wrap gap-4', className)}
      {...props}
    />
  )
);
StatGroup.displayName = 'StatGroup';

/**
 * Bracketed label with brackets
 * Used for [LABEL]: patterns throughout templates
 *
 * @example
 * ```tsx
 * <StyledLabel>TEMPLATE FEATURES</StyledLabel>
 * // Renders: [TEMPLATE FEATURES]:
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
      className={cn('text-muted-foreground text-xs', mode.font, className)}
      {...props}
    >
      [{children}]{showColon ? ':' : ''}
    </div>
  )
);
StyledLabel.displayName = 'StyledLabel';

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
  icon?: 'arrow' | 'check' | 'dot';
};

const FeatureItem = React.forwardRef<HTMLDivElement, FeatureItemProps>(
  ({ children, icon = 'arrow', className, ...props }, ref) => {
    const iconMap = {
      arrow: '>',
      check: '✓',
      dot: '•',
    };

    return (
      <div
        ref={ref}
        data-slot="feature-item"
        className={cn('text-xs', mode.font, className)}
        {...props}
      >
        <span className="text-success">{iconMap[icon]}</span> {children}
      </div>
    );
  }
);
FeatureItem.displayName = 'FeatureItem';

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
      className={cn('space-y-2 text-xs', mode.font, className)}
      {...props}
    >
      {children}
    </div>
  )
);
FeatureList.displayName = 'FeatureList';

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
  ({ children, label = 'NOTE', className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="info-note"
      className={cn('text-muted-foreground mt-4 text-xs', mode.font, className)}
      {...props}
    >
      [{label}]: {children}
    </div>
  )
);
InfoNote.displayName = 'InfoNote';

/**
 * Badge - Inline badge with terminal pattern [ [0xXX] LABEL ] META
 * Used for section headers, page labels, and inline status indicators.
 * This is NOT a card - it's a compact inline element.
 *
 * @example
 * ```tsx
 * // Section header badge
 * <Badge code="0x00" label="SYSTEM INIT" meta="SAAS BOILERPLATE v2.0" />
 *
 * // Simple badge without meta
 * <Badge code="0x50" label="DEV EXPERIENCE" />
 * ```
 */
export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Hex code displayed in brackets (e.g., "0x00", "0x01") */
  code?: string;
  /** Primary label text */
  label: string;
  /** Optional metadata after the label (e.g., "v2.0", "FIB[144]") */
  meta?: string;
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ code = '0x00', label, meta, className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="badge"
      className={cn('border-border bg-card inline-block border px-2 py-1', mode.radius, className)}
      {...props}
    >
      <span className={cn('text-muted-foreground text-xs', mode.font)}>
        [ [{code}] {label} ]{meta ? ` ${meta}` : ''}
      </span>
    </div>
  )
);
Badge.displayName = 'Badge';

/**
 * Page badge
 * Used for [TEMPLATE]: NAME badges at top of template pages
 *
 * @example
 * ```tsx
 * <PageBadge>SIGN IN</PageBadge>
 * // Renders: [TEMPLATE]: SIGN IN
 * ```
 */
export type PageBadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  /** Prefix label. Defaults to "TEMPLATE" */
  prefix?: string;
};

const PageBadge = React.forwardRef<HTMLDivElement, PageBadgeProps>(
  ({ children, prefix = 'TEMPLATE', className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="page-badge"
      className={cn('border-border inline-block border px-4 py-1', mode.radius, className)}
      {...props}
    >
      <span className={cn('text-muted-foreground text-xs', mode.font)}>
        [{prefix}]: {children}
      </span>
    </div>
  )
);
PageBadge.displayName = 'PageBadge';

/**
 * Template page header component
 * Combines badge, title, and description in a consistent layout
 *
 * @example
 * ```tsx
 * <TemplatePageHeader
 *   badge="SIGN IN"
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
  ({ badge, title, description, badgePrefix = 'TEMPLATE', className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="template-page-header"
      className={cn('space-y-2', className)}
      {...props}
    >
      <PageBadge prefix={badgePrefix}>{badge}</PageBadge>
      <h1 className={cn('text-4xl font-semibold tracking-tight', mode.font)}>{title}</h1>
      {description && (
        <p className={cn('text-muted-foreground text-sm', mode.font)}>{description}</p>
      )}
    </div>
  )
);
TemplatePageHeader.displayName = 'TemplatePageHeader';

/**
 * Features card with header and feature list
 * Complete card component for template feature documentation
 *
 * @example
 * ```tsx
 * <FeaturesCard
 *   title="TEMPLATE FEATURES"
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
  featureIcon?: 'arrow' | 'check' | 'dot';
};

const FeaturesCard = React.forwardRef<HTMLDivElement, FeaturesCardProps>(
  (
    {
      title = 'TEMPLATE FEATURES',
      code = '0x00',
      features,
      note,
      featureIcon = 'arrow',
      className,
      ...props
    },
    ref
  ) => (
    <Card ref={ref} className={className} {...props}>
      <CardHeader code={code} title={title} />
      <CardContent>
        <StyledLabel className="mb-4">{title}</StyledLabel>
        <FeatureList>
          {features.map((feature, index) => (
            <FeatureItem key={index} icon={featureIcon}>
              {feature}
            </FeatureItem>
          ))}
        </FeatureList>
        {note && <InfoNote>{note}</InfoNote>}
      </CardContent>
    </Card>
  )
);
FeaturesCard.displayName = 'FeaturesCard';

// Export all components
export {
  // Core Card components
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  // Stat components
  Stat,
  StatGroup,
  // Badge
  Badge,
  // Helper components
  StyledLabel,
  FeatureItem,
  FeatureList,
  InfoNote,
  PageBadge,
  TemplatePageHeader,
  FeaturesCard,
};
