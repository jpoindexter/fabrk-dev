/**
 * Semantic Design Tokens
 *
 * Purpose-driven tokens that map to primitives. These are context-aware
 * and describe WHAT the token is for, not what it looks like.
 *
 * Naming Convention: purpose-context-state (e.g., text-primary, bg-surface-hover)
 *
 * Usage: Import and use in components for consistent, theme-aware styling.
 *
 * @see https://spectrum.adobe.com/page/design-tokens/
 */

import { primitives } from "./primitives";

// ============================================================================
// COLOR TOKENS (Semantic References to CSS Variables)
// ============================================================================

/**
 * Color token references
 * These map to CSS custom properties defined in globals.css
 * Format: oklch(var(--token-name))
 */
export const colors = {
  // -------------------------------------------------------------------------
  // Background Colors
  // -------------------------------------------------------------------------
  background: {
    /** Page background */
    default: "bg-background",
    /** Card/panel background */
    surface: "bg-card",
    /** Muted/subtle background */
    muted: "bg-muted",
    /** Primary accent background */
    primary: "bg-primary",
    /** Secondary accent background */
    secondary: "bg-secondary",
    /** Destructive/error background */
    destructive: "bg-destructive",
    /** Success background */
    success: "bg-success",
    /** Warning background */
    warning: "bg-warning",
    /** Info background */
    info: "bg-info",
    /** Popover/dropdown background */
    popover: "bg-popover",
    /** Accent/highlight background */
    accent: "bg-accent",
  },

  // -------------------------------------------------------------------------
  // Text Colors
  // -------------------------------------------------------------------------
  text: {
    /** Primary text color */
    default: "text-foreground",
    /** Secondary/muted text */
    muted: "text-muted-foreground",
    /** Text on primary background */
    onPrimary: "text-primary-foreground",
    /** Text on secondary background */
    onSecondary: "text-secondary-foreground",
    /** Text on destructive background */
    onDestructive: "text-destructive-foreground",
    /** Text on success background */
    onSuccess: "text-success-foreground",
    /** Text on warning background */
    onWarning: "text-warning-foreground",
    /** Text on info background */
    onInfo: "text-info-foreground",
    /** Primary brand color for text */
    primary: "text-primary",
    /** Destructive/error text */
    destructive: "text-destructive",
    /** Success text */
    success: "text-success",
    /** Warning text */
    warning: "text-warning",
    /** Info text */
    info: "text-info",
    /** Text on card surface */
    onSurface: "text-card-foreground",
    /** Text on popover */
    onPopover: "text-popover-foreground",
    /** Text on accent background */
    onAccent: "text-accent-foreground",
  },

  // -------------------------------------------------------------------------
  // Border Colors
  // -------------------------------------------------------------------------
  border: {
    /** Default border color */
    default: "border-border",
    /** Input border color */
    input: "border-input",
    /** Focus ring color */
    ring: "ring-ring",
    /** Primary border */
    primary: "border-primary",
    /** Destructive border */
    destructive: "border-destructive",
    /** Success border */
    success: "border-success",
    /** Warning border */
    warning: "border-warning",
  },
} as const;

// ============================================================================
// SPACING TOKENS (Semantic Purpose)
// ============================================================================

/**
 * Semantic spacing tokens
 * Maps purpose to primitive spacing values
 */
export const spacing = {
  // -------------------------------------------------------------------------
  // Component Internal Spacing
  // -------------------------------------------------------------------------
  component: {
    /** Tight internal padding (badges, small buttons) */
    xs: "p-1", // 4px
    /** Small internal padding (buttons) */
    sm: "p-2", // 8px
    /** Default internal padding (inputs, cards) */
    md: "p-4", // 16px
    /** Large internal padding (sections) */
    lg: "p-6", // 24px
    /** Extra large padding (hero sections) */
    xl: "p-8", // 32px
  },

  // -------------------------------------------------------------------------
  // Layout Spacing
  // -------------------------------------------------------------------------
  layout: {
    /** Gap between items in a row/column */
    gap: {
      xs: "gap-1", // 4px - micro (icons with text)
      sm: "gap-2", // 8px - tight (form elements)
      md: "gap-4", // 16px - default (cards in grid)
      lg: "gap-6", // 24px - comfortable (sections)
      xl: "gap-8", // 32px - spacious
    },
    /** Vertical section spacing */
    section: {
      sm: "py-12", // 48px - small sections
      md: "py-16", // 64px - medium sections
      lg: "py-20", // 80px - large sections (RECOMMENDED DEFAULT)
      xl: "py-24", // 96px - hero sections
    },
    /** Container padding (responsive) */
    container: {
      x: "px-4 sm:px-6 lg:px-8",
      y: "py-8 sm:py-12 lg:py-16",
    },
  },

  // -------------------------------------------------------------------------
  // Stack Spacing (Vertical)
  // -------------------------------------------------------------------------
  stack: {
    /** Tight vertical spacing */
    xs: "space-y-1", // 4px
    /** Small vertical spacing */
    sm: "space-y-2", // 8px
    /** Default vertical spacing */
    md: "space-y-4", // 16px
    /** Large vertical spacing */
    lg: "space-y-6", // 24px
    /** Extra large vertical spacing */
    xl: "space-y-8", // 32px
  },

  // -------------------------------------------------------------------------
  // Inline Spacing (Horizontal)
  // -------------------------------------------------------------------------
  inline: {
    /** Tight horizontal spacing */
    xs: "space-x-1", // 4px
    /** Small horizontal spacing */
    sm: "space-x-2", // 8px
    /** Default horizontal spacing */
    md: "space-x-4", // 16px
    /** Large horizontal spacing */
    lg: "space-x-6", // 24px
  },
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS (Semantic Purpose)
// ============================================================================

/**
 * Semantic typography tokens
 * Defines text styles for specific UI contexts
 */
export const typography = {
  // -------------------------------------------------------------------------
  // Headings
  // -------------------------------------------------------------------------
  heading: {
    /** Page title (h1) - Largest heading */
    page: "text-4xl font-bold tracking-tight",
    /** Section title (h2) */
    section: "text-3xl font-bold",
    /** Subsection title (h3) */
    subsection: "text-2xl font-semibold",
    /** Card title (h4) */
    card: "text-lg font-semibold",
    /** Small heading (h5) */
    small: "text-base font-semibold",
    /** Tiny heading (h6) */
    tiny: "text-sm font-semibold",
  },

  // -------------------------------------------------------------------------
  // Body Text
  // -------------------------------------------------------------------------
  body: {
    /** Large body text */
    lg: "text-lg leading-relaxed",
    /** Default body text */
    default: "text-base leading-relaxed",
    /** Small body text */
    sm: "text-sm leading-relaxed",
    /** Extra small body text */
    xs: "text-xs leading-relaxed",
  },

  // -------------------------------------------------------------------------
  // UI Text (Labels, Buttons, etc.)
  // -------------------------------------------------------------------------
  ui: {
    /** Button text */
    button: "text-xs font-medium",
    /** Label text */
    label: "text-xs font-semibold",
    /** Caption/helper text */
    caption: "text-xs text-muted-foreground",
    /** Badge text */
    badge: "text-xs font-medium",
    /** Navigation link */
    nav: "text-sm font-medium",
    /** Breadcrumb */
    breadcrumb: "text-xs",
  },

  // -------------------------------------------------------------------------
  // Special Text
  // -------------------------------------------------------------------------
  special: {
    /** Code/monospace */
    code: "font-mono text-xs",
    /** Numeric data */
    data: "font-mono tabular-nums",
    /** Quote/testimonial */
    quote: "text-lg italic",
    /** Overline text */
    overline: "text-xs uppercase tracking-wider",
  },
} as const;

// ============================================================================
// INTERACTIVE TOKENS (Focus, Hover, Active States)
// ============================================================================

export const interactive = {
  /** Focus ring styles */
  focus: {
    /** Default focus ring */
    ring: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    /** Focus ring without offset */
    ringTight: "focus-visible:ring-2 focus-visible:ring-ring",
    /** Focus outline (for links) */
    outline: "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
  },

  /** Transition presets */
  transition: {
    /** Fast transition for small elements */
    fast: "transition-all duration-150 ease-out",
    /** Default transition */
    default: "transition-all duration-200 ease-out",
    /** Slow transition for large elements */
    slow: "transition-all duration-300 ease-out",
    /** Color-only transition */
    colors: "transition-colors duration-200 ease-out",
    /** Transform transition */
    transform: "transition-transform duration-200 ease-out",
  },

  /** Disabled state */
  disabled: "opacity-50 pointer-events-none cursor-not-allowed",
} as const;

// ============================================================================
// LAYOUT TOKENS
// ============================================================================

export const layout = {
  /** Container max-widths */
  container: {
    /** Small container (prose, forms) */
    sm: "max-w-2xl", // 672px
    /** Medium container (content pages) */
    md: "max-w-4xl", // 896px
    /** Default container (dashboard) */
    default: "max-w-6xl", // 1152px
    /** Large container (wide layouts) */
    lg: "max-w-7xl", // 1280px
    /** Full width */
    full: "max-w-full",
    /** Prose width (optimal reading) */
    prose: "max-w-prose", // 65ch
  },

  /** Grid templates */
  grid: {
    /** Single column */
    cols1: "grid-cols-1",
    /** Two columns */
    cols2: "grid-cols-1 sm:grid-cols-2",
    /** Three columns */
    cols3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    /** Four columns */
    cols4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    /** Auto-fit cards */
    autoFit: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
  },

  /** Flex layouts */
  flex: {
    /** Center both axes */
    center: "flex items-center justify-center",
    /** Space between */
    between: "flex items-center justify-between",
    /** Start aligned */
    start: "flex items-center justify-start",
    /** End aligned */
    end: "flex items-center justify-end",
    /** Column layout */
    col: "flex flex-col",
    /** Row layout */
    row: "flex flex-row",
  },
} as const;

// ============================================================================
// ELEVATION TOKENS (Z-Index + Shadows)
// ============================================================================

export const elevation = {
  /** Base level - page content */
  base: { z: "z-0", shadow: "" },
  /** Raised - cards, panels */
  raised: { z: "z-10", shadow: "shadow-sm" },
  /** Dropdown - menus, selects */
  dropdown: { z: "z-50", shadow: "shadow-md" },
  /** Sticky - fixed headers */
  sticky: { z: "z-40", shadow: "shadow-sm" },
  /** Overlay - modal backdrops */
  overlay: { z: "z-50", shadow: "" },
  /** Modal - dialogs, sheets */
  modal: { z: "z-50", shadow: "shadow-xl" },
  /** Toast - notifications */
  toast: { z: "z-[100]", shadow: "shadow-lg" },
  /** Tooltip - help text */
  tooltip: { z: "z-50", shadow: "shadow-md" },
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export const semanticTokens = {
  colors,
  spacing,
  typography,
  interactive,
  layout,
  elevation,
} as const;

export default semanticTokens;
