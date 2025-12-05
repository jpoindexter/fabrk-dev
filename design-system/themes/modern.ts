/**
 * Modern Visual Mode
 *
 * Contemporary SaaS aesthetic with rounded corners and sans-serif typography.
 * Similar to Linear, Vercel, and other modern design systems.
 *
 * Characteristics:
 * - Rounded corners (rounded-lg)
 * - Sans-serif font (Geist Sans)
 * - Subtle shadows
 * - Title case text
 * - Clean, minimal labels
 * - No prefixes on buttons
 *
 * @see ./theme.types.ts for type definitions
 */

import type { VisualModeConfig } from "./theme.types";

// ============================================================================
// MODERN MODE CONFIGURATION
// ============================================================================

export const modernMode: VisualModeConfig = {
  name: "Modern",
  description: "Contemporary SaaS aesthetic with rounded corners",

  // -------------------------------------------------------------------------
  // Shape Properties
  // -------------------------------------------------------------------------

  radius: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  },

  shadow: {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  },

  border: {
    none: "border-0",
    thin: "border",
    default: "border",
    thick: "border-2",
  },

  // -------------------------------------------------------------------------
  // Typography Properties
  // -------------------------------------------------------------------------

  fontFamily: "sans",
  textTransform: "normal",
  letterSpacing: "normal",

  // -------------------------------------------------------------------------
  // Component-Specific Overrides
  // -------------------------------------------------------------------------

  button: {
    prefix: "",
    suffix: "",
    weight: "medium",
  },

  label: {
    format: "plain",
  },

  cardHeader: {
    style: "simple",
    showCode: false,
  },

  input: {
    prefix: "",
    placeholderStyle: "muted",
  },
};

// ============================================================================
// MODERN TAILWIND CLASS MAPPINGS
// ============================================================================

/**
 * Ready-to-use Tailwind classes for modern mode
 */
export const modernClasses = {
  // -------------------------------------------------------------------------
  // Base element classes
  // -------------------------------------------------------------------------

  /** Border radius for all elements */
  radius: "rounded-lg",

  /** Font family */
  font: "font-sans",

  /** Text transform */
  textTransform: "", // normal case

  // -------------------------------------------------------------------------
  // Typography
  // -------------------------------------------------------------------------

  /** Page title */
  pageTitle: "font-sans text-4xl font-bold tracking-tight",

  /** Section heading */
  sectionHeading: "font-sans text-2xl font-semibold",

  /** Card title */
  cardTitle: "font-sans text-base font-semibold",

  /** Body text */
  body: "font-sans text-sm",

  /** Label */
  label: "font-sans text-sm font-medium text-foreground",

  /** Caption */
  caption: "font-sans text-sm text-muted-foreground",

  // -------------------------------------------------------------------------
  // Components
  // -------------------------------------------------------------------------

  /** Button base */
  button: "rounded-lg font-sans text-sm font-medium",

  /** Input base */
  input: "rounded-lg font-sans text-sm border-input",

  /** Card base */
  card: "rounded-lg border font-sans shadow-sm",

  /** Card header (modern style) */
  cardHeader: "p-6",

  /** Badge base */
  badge: "rounded-md font-sans text-xs font-medium",

  /** Dialog/modal */
  dialog: "rounded-lg font-sans shadow-lg",

  /** Alert */
  alert: "rounded-lg font-sans",

  /** Tabs */
  tabsList: "rounded-lg",
  tabsTrigger: "rounded-md font-sans text-sm",

  // -------------------------------------------------------------------------
  // Interactive states
  // -------------------------------------------------------------------------

  /** Focus ring */
  focusRing: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",

  /** Hover state for cards */
  cardHover: "hover:shadow-md transition-shadow",
} as const;

// ============================================================================
// MINIMAL MODE CONFIGURATION
// ============================================================================

export const minimalMode: VisualModeConfig = {
  name: "Minimal",
  description: "Clean, subtle aesthetic with minimal ornamentation",

  radius: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-md",
    full: "rounded-full",
  },

  shadow: {
    none: "",
    sm: "",
    md: "",
    lg: "shadow-sm",
  },

  border: {
    none: "border-0",
    thin: "border-0",
    default: "border",
    thick: "border",
  },

  fontFamily: "sans",
  textTransform: "normal",
  letterSpacing: "normal",

  button: {
    prefix: "",
    suffix: "",
    weight: "medium",
  },

  label: {
    format: "plain",
  },

  cardHeader: {
    style: "minimal",
    showCode: false,
  },

  input: {
    prefix: "",
    placeholderStyle: "italic",
  },
};

// ============================================================================
// LINEAR MODE CONFIGURATION
// ============================================================================

export const linearMode: VisualModeConfig = {
  name: "Linear",
  description: "Linear.app inspired aesthetic with subtle shadows",

  radius: {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
  },

  shadow: {
    none: "",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-md",
  },

  border: {
    none: "border-0",
    thin: "border",
    default: "border",
    thick: "border",
  },

  fontFamily: "sans",
  textTransform: "normal",
  letterSpacing: "normal",

  button: {
    prefix: "",
    suffix: "",
    weight: "medium",
  },

  label: {
    format: "plain",
  },

  cardHeader: {
    style: "simple",
    showCode: false,
  },

  input: {
    prefix: "",
    placeholderStyle: "muted",
  },
};

// ============================================================================
// MODERN FORMATTING FUNCTIONS
// ============================================================================

/**
 * Format text for modern display
 * Returns text as-is (Title Case is handled by the content, not transform)
 */
export function formatModernText(text: string): string {
  return text;
}

/**
 * Format button text (no prefix)
 */
export function formatButtonText(text: string): string {
  return text;
}

/**
 * Format label text (plain)
 */
export function formatLabelText(label: string): string {
  return label;
}

/**
 * Format card header (simple title)
 */
export function formatCardHeader(title: string): string {
  return title;
}

// ============================================================================
// MINIMAL TAILWIND CLASS MAPPINGS
// ============================================================================

export const minimalClasses = {
  radius: "rounded-md",
  font: "font-sans",
  textTransform: "",

  pageTitle: "font-sans text-3xl font-semibold",
  sectionHeading: "font-sans text-xl font-medium",
  cardTitle: "font-sans text-sm font-medium",
  body: "font-sans text-sm",
  label: "font-sans text-sm text-muted-foreground",
  caption: "font-sans text-xs text-muted-foreground",

  button: "rounded-md font-sans text-sm font-medium",
  input: "rounded-md font-sans text-sm border-input/50",
  card: "rounded-md font-sans border-0 bg-muted/30",
  cardHeader: "p-4",
  badge: "rounded font-sans text-xs",
  dialog: "rounded-md font-sans",
  alert: "rounded-md font-sans border-0 bg-muted/50",
  tabsList: "rounded-md bg-transparent",
  tabsTrigger: "rounded font-sans text-sm",

  focusRing: "focus-visible:ring-2 focus-visible:ring-ring",
  cardHover: "hover:bg-muted/50 transition-colors",
} as const;

// ============================================================================
// LINEAR TAILWIND CLASS MAPPINGS
// ============================================================================

export const linearClasses = {
  radius: "rounded-lg",
  font: "font-sans",
  textTransform: "",

  pageTitle: "font-sans text-3xl font-semibold tracking-tight",
  sectionHeading: "font-sans text-xl font-semibold",
  cardTitle: "font-sans text-base font-medium",
  body: "font-sans text-sm leading-relaxed",
  label: "font-sans text-sm font-medium",
  caption: "font-sans text-sm text-muted-foreground",

  button: "rounded-lg font-sans text-sm font-medium shadow-sm",
  input: "rounded-lg font-sans text-sm border-input shadow-sm",
  card: "rounded-xl font-sans border shadow-sm",
  cardHeader: "p-5",
  badge: "rounded-lg font-sans text-xs",
  dialog: "rounded-xl font-sans shadow-xl",
  alert: "rounded-lg font-sans shadow-sm",
  tabsList: "rounded-lg bg-muted p-1",
  tabsTrigger: "rounded-md font-sans text-sm",

  focusRing: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
  cardHover: "hover:shadow-md transition-shadow",
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export default modernMode;
