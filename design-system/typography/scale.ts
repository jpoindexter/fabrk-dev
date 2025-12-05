/**
 * Typography Scale
 *
 * Standardized typography scale for consistent text hierarchy.
 * Based on Major Third (1.25) ratio, matching Tailwind's default.
 *
 * This file provides:
 * 1. Type scale definitions
 * 2. Heading hierarchy standards
 * 3. Body text standards
 * 4. Utility functions for type formatting
 *
 * @see https://tailwindcss.com/docs/font-size
 */

// ============================================================================
// TYPE SCALE (Major Third - 1.25 ratio)
// ============================================================================

/**
 * Type scale with corresponding Tailwind classes
 * Each step is 1.25x the previous
 */
export const typeScale = {
  // -------------------------------------------------------------------------
  // Display sizes (hero text, large headings)
  // -------------------------------------------------------------------------
  "9xl": {
    size: "8rem", // 128px
    lineHeight: "1",
    tailwind: "text-9xl",
    useCase: "Hero display text",
  },
  "8xl": {
    size: "6rem", // 96px
    lineHeight: "1",
    tailwind: "text-8xl",
    useCase: "Large display text",
  },
  "7xl": {
    size: "4.5rem", // 72px
    lineHeight: "1",
    tailwind: "text-7xl",
    useCase: "Display text",
  },
  "6xl": {
    size: "3.75rem", // 60px
    lineHeight: "1",
    tailwind: "text-6xl",
    useCase: "Large page title",
  },
  "5xl": {
    size: "3rem", // 48px
    lineHeight: "1",
    tailwind: "text-5xl",
    useCase: "Page title (marketing)",
  },

  // -------------------------------------------------------------------------
  // Heading sizes
  // -------------------------------------------------------------------------
  "4xl": {
    size: "2.25rem", // 36px
    lineHeight: "2.5rem", // 40px
    tailwind: "text-4xl",
    useCase: "H1 - Page title",
  },
  "3xl": {
    size: "1.875rem", // 30px
    lineHeight: "2.25rem", // 36px
    tailwind: "text-3xl",
    useCase: "H2 - Section title",
  },
  "2xl": {
    size: "1.5rem", // 24px
    lineHeight: "2rem", // 32px
    tailwind: "text-2xl",
    useCase: "H3 - Subsection title",
  },
  xl: {
    size: "1.25rem", // 20px
    lineHeight: "1.75rem", // 28px
    tailwind: "text-xl",
    useCase: "H4 - Card title (large)",
  },
  lg: {
    size: "1.125rem", // 18px
    lineHeight: "1.75rem", // 28px
    tailwind: "text-lg",
    useCase: "H5 - Card title, large body",
  },

  // -------------------------------------------------------------------------
  // Body sizes
  // -------------------------------------------------------------------------
  base: {
    size: "1rem", // 16px
    lineHeight: "1.5rem", // 24px
    tailwind: "text-base",
    useCase: "Body text (default)",
  },
  sm: {
    size: "0.875rem", // 14px
    lineHeight: "1.25rem", // 20px
    tailwind: "text-sm",
    useCase: "Secondary body text",
  },
  xs: {
    size: "0.75rem", // 12px
    lineHeight: "1rem", // 16px
    tailwind: "text-xs",
    useCase: "UI text, labels, captions",
  },
} as const;

// ============================================================================
// HEADING HIERARCHY (Standardized)
// ============================================================================

/**
 * Standard heading hierarchy
 * Use these classes for consistent heading styles across the app
 */
export const headingHierarchy = {
  // -------------------------------------------------------------------------
  // Application headings (dashboard, forms, etc.)
  // -------------------------------------------------------------------------
  app: {
    h1: {
      tailwind: "text-4xl font-bold tracking-tight",
      description: "Page title - largest heading in the app",
      example: "Dashboard, Settings, Profile",
    },
    h2: {
      tailwind: "text-3xl font-bold",
      description: "Section title - major sections on a page",
      example: "Recent Activity, Account Settings",
    },
    h3: {
      tailwind: "text-2xl font-semibold",
      description: "Subsection title - card groups, feature sections",
      example: "Security Options, Billing History",
    },
    h4: {
      tailwind: "text-lg font-semibold",
      description: "Card title - individual cards, panels",
      example: "Profile Information, API Keys",
    },
    h5: {
      tailwind: "text-base font-semibold",
      description: "Small heading - lists, accordions",
      example: "Active Sessions, Connected Apps",
    },
    h6: {
      tailwind: "text-sm font-semibold",
      description: "Tiny heading - table headers, labels",
      example: "Email, Status, Actions",
    },
  },

  // -------------------------------------------------------------------------
  // Documentation headings
  // -------------------------------------------------------------------------
  docs: {
    h1: {
      tailwind: "text-3xl font-bold tracking-tight",
      description: "Doc page title",
      example: "Getting Started, Button Component",
    },
    h2: {
      tailwind: "text-2xl font-semibold",
      description: "Doc section heading",
      example: "Installation, Usage, Props",
    },
    h3: {
      tailwind: "text-xl font-semibold",
      description: "Doc subsection heading",
      example: "Basic Usage, With Icons",
    },
    h4: {
      tailwind: "text-lg font-medium",
      description: "Doc card/example heading",
      example: "Primary Button, Destructive Button",
    },
  },

  // -------------------------------------------------------------------------
  // Marketing headings
  // -------------------------------------------------------------------------
  marketing: {
    h1: {
      tailwind: "text-5xl font-bold tracking-tight sm:text-6xl",
      description: "Hero heading",
      example: "Ship Your SaaS Faster",
    },
    h2: {
      tailwind: "text-4xl font-bold tracking-tight",
      description: "Section heading",
      example: "Features, Pricing, Testimonials",
    },
    h3: {
      tailwind: "text-2xl font-semibold",
      description: "Feature/card heading",
      example: "Authentication, Payments, Dashboard",
    },
  },
} as const;

// ============================================================================
// BODY TEXT STYLES
// ============================================================================

/**
 * Standard body text styles
 */
export const bodyText = {
  /** Large body text - lead paragraphs */
  lead: {
    tailwind: "text-lg leading-relaxed text-muted-foreground",
    description: "Lead paragraph text",
    useCase: "Page introductions, hero subtext",
  },

  /** Default body text */
  default: {
    tailwind: "text-base leading-relaxed",
    description: "Standard body text",
    useCase: "General content paragraphs",
  },

  /** Small body text */
  small: {
    tailwind: "text-sm leading-relaxed",
    description: "Secondary body text",
    useCase: "Descriptions, help text",
  },

  /** Extra small body text */
  xs: {
    tailwind: "text-xs leading-relaxed",
    description: "Fine print text",
    useCase: "Legal text, timestamps",
  },

  /** Muted body text */
  muted: {
    tailwind: "text-sm text-muted-foreground",
    description: "Subdued body text",
    useCase: "Secondary information, metadata",
  },
} as const;

// ============================================================================
// UI TEXT STYLES
// ============================================================================

/**
 * UI element text styles (buttons, labels, etc.)
 */
export const uiText = {
  /** Button text */
  button: {
    tailwind: "text-sm font-medium",
    description: "Button label text",
  },

  /** Label text */
  label: {
    tailwind: "text-sm font-medium leading-none",
    description: "Form label text",
  },

  /** Caption/helper text */
  caption: {
    tailwind: "text-xs text-muted-foreground",
    description: "Helper/caption text",
  },

  /** Badge text */
  badge: {
    tailwind: "text-xs font-medium",
    description: "Badge label text",
  },

  /** Navigation text */
  nav: {
    tailwind: "text-sm font-medium",
    description: "Navigation link text",
  },

  /** Tab text */
  tab: {
    tailwind: "text-sm font-medium",
    description: "Tab label text",
  },

  /** Breadcrumb text */
  breadcrumb: {
    tailwind: "text-sm",
    description: "Breadcrumb text",
  },

  /** Table header text */
  tableHeader: {
    tailwind: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
    description: "Table header text",
  },

  /** Table cell text */
  tableCell: {
    tailwind: "text-sm",
    description: "Table cell text",
  },
} as const;

// ============================================================================
// FONT WEIGHT STANDARDS
// ============================================================================

export const fontWeights = {
  /** Headings */
  h1: "font-bold",
  h2: "font-bold",
  h3: "font-semibold",
  h4: "font-semibold",
  h5: "font-semibold",
  h6: "font-semibold",

  /** Body */
  body: "font-normal",

  /** UI */
  button: "font-medium",
  label: "font-medium",
  badge: "font-medium",
  nav: "font-medium",
} as const;

// ============================================================================
// LINE HEIGHT STANDARDS
// ============================================================================

export const lineHeights = {
  /** Headings - tighter */
  heading: "leading-tight", // 1.25

  /** Body - relaxed for readability */
  body: "leading-relaxed", // 1.625

  /** UI - normal */
  ui: "leading-normal", // 1.5

  /** None - for large display text */
  none: "leading-none", // 1
} as const;

// ============================================================================
// LETTER SPACING STANDARDS
// ============================================================================

export const letterSpacing = {
  /** Headings - slightly tighter */
  heading: "tracking-tight", // -0.025em

  /** Body - normal */
  body: "tracking-normal", // 0

  /** UI labels (terminal mode) */
  wide: "tracking-wide", // 0.025em

  /** All caps text */
  wider: "tracking-wider", // 0.05em
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export const typographyScale = {
  typeScale,
  headingHierarchy,
  bodyText,
  uiText,
  fontWeights,
  lineHeights,
  letterSpacing,
} as const;

export default typographyScale;
