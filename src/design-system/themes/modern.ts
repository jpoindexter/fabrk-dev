/**
 * Modern Theme
 *
 * Subtle radii, clean sans-serif, minimal shadows.
 * Linear/Vercel-style SaaS aesthetic.
 */

import { primitives } from "../tokens/primitives";
import type { SemanticTokens } from "../tokens/semantic";

export const modernTheme: SemanticTokens = {
  color: {
    bg: {
      base: primitives.colors.gray[50],
      surface: primitives.colors.white,
      surfaceRaised: primitives.colors.white,
      surfaceSunken: primitives.colors.gray[100],
      muted: primitives.colors.gray[100],
      accent: primitives.colors.primary[600],
      accentMuted: primitives.colors.primary[50],
      accentHover: primitives.colors.primary[700],
      danger: primitives.colors.red[600],
      dangerMuted: primitives.colors.red[50],
      success: primitives.colors.green[600],
      successMuted: primitives.colors.green[50],
      warning: primitives.colors.amber[500],
      warningMuted: primitives.colors.amber[50],
      info: primitives.colors.blue[600],
      infoMuted: primitives.colors.blue[50],
    },
    text: {
      primary: primitives.colors.gray[900],
      secondary: primitives.colors.gray[700],
      muted: primitives.colors.gray[500],
      disabled: primitives.colors.gray[400],
      inverse: primitives.colors.white,
      accent: primitives.colors.primary[600],
      accentHover: primitives.colors.primary[700],
      danger: primitives.colors.red[600],
      success: primitives.colors.green[600],
      warning: primitives.colors.amber[600],
      info: primitives.colors.blue[600],
    },
    border: {
      default: primitives.colors.gray[200],
      muted: primitives.colors.gray[100],
      strong: primitives.colors.gray[300],
      accent: primitives.colors.primary[600],
      danger: primitives.colors.red[500],
      success: primitives.colors.green[500],
      focus: primitives.colors.primary[500],
    },
  },
  radius: {
    button: primitives.radius.md,
    input: primitives.radius.md,
    card: primitives.radius.lg,
    modal: primitives.radius.xl,
    badge: primitives.radius.full,
    avatar: primitives.radius.full,
  },
  shadow: {
    card: primitives.shadow.sm,
    dropdown: primitives.shadow.md,
    modal: primitives.shadow.lg,
    button: primitives.shadow.xs,
  },
  font: {
    body: primitives.fontFamily.sans,
    heading: primitives.fontFamily.sans,
    code: primitives.fontFamily.mono,
    ui: primitives.fontFamily.sans,
  },
  textTransform: {
    button: "none",
    label: "none",
    heading: "none",
  },
  spacing: {
    component: {
      paddingXs: primitives.space[1],
      paddingSm: primitives.space[2],
      paddingMd: primitives.space[4],
      paddingLg: primitives.space[6],
      paddingXl: primitives.space[8],
      gapXs: primitives.space[1],
      gapSm: primitives.space[2],
      gapMd: primitives.space[4],
      gapLg: primitives.space[6],
    },
    section: {
      sm: primitives.space[8],
      md: primitives.space[12],
      lg: primitives.space[16],
      xl: primitives.space[24],
    },
    page: {
      padding: primitives.space[6],
    },
  },
};

// =============================================================================
// MODERN THEME UTILITIES
// =============================================================================

/**
 * Format text for modern style buttons
 * Example: "Save Changes" → "Save Changes"
 */
export function formatButtonText(text: string): string {
  return text;
}

/**
 * Format text for modern style labels
 * Example: "Email" → "Email"
 */
export function formatLabelText(label: string): string {
  return label;
}

/**
 * Format card header for modern style
 * Example: ("Settings", "00") → "Settings"
 */
export function formatCardHeader(title: string): string {
  return title;
}

// =============================================================================
// MODERN TAILWIND CLASSES
// =============================================================================

export const modernClasses = {
  radius: "rounded-md",
  font: "font-sans",
  text: "",
  cardHeader: "font-sans text-sm font-medium",
  label: "font-sans text-sm text-muted-foreground",
  button: "rounded-md font-sans shadow-sm",
  input: "rounded-md font-sans border-input",
  card: "rounded-lg border border-border shadow-sm",
  badge: "rounded-full font-sans text-xs",
} as const;

export default modernTheme;
