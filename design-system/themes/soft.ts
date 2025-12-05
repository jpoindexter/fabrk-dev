/**
 * Soft Theme
 *
 * Rounded corners, friendly typography, warm aesthetic.
 * Consumer-facing apps, approachable design.
 */

import { primitives } from "../tokens/primitives";
import type { SemanticTokens } from "../tokens/semantic";

export const softTheme: SemanticTokens = {
  color: {
    bg: {
      base: primitives.colors.gray[50],
      surface: primitives.colors.white,
      surfaceRaised: primitives.colors.white,
      surfaceSunken: primitives.colors.gray[100],
      muted: primitives.colors.gray[100],
      accent: primitives.colors.primary[500],
      accentMuted: primitives.colors.primary[50],
      accentHover: primitives.colors.primary[600],
      danger: primitives.colors.red[500],
      dangerMuted: primitives.colors.red[50],
      success: primitives.colors.green[500],
      successMuted: primitives.colors.green[50],
      warning: primitives.colors.amber[400],
      warningMuted: primitives.colors.amber[50],
      info: primitives.colors.blue[500],
      infoMuted: primitives.colors.blue[50],
    },
    text: {
      primary: primitives.colors.gray[800],
      secondary: primitives.colors.gray[600],
      muted: primitives.colors.gray[500],
      disabled: primitives.colors.gray[400],
      inverse: primitives.colors.white,
      accent: primitives.colors.primary[500],
      accentHover: primitives.colors.primary[600],
      danger: primitives.colors.red[500],
      success: primitives.colors.green[500],
      warning: primitives.colors.amber[600],
      info: primitives.colors.blue[500],
    },
    border: {
      default: primitives.colors.gray[200],
      muted: primitives.colors.gray[100],
      strong: primitives.colors.gray[300],
      accent: primitives.colors.primary[400],
      danger: primitives.colors.red[400],
      success: primitives.colors.green[400],
      focus: primitives.colors.primary[400],
    },
  },
  radius: {
    button: primitives.radius.xl,
    input: primitives.radius.lg,
    card: primitives.radius["2xl"],
    modal: primitives.radius["2xl"],
    badge: primitives.radius.full,
    avatar: primitives.radius.full,
  },
  shadow: {
    card: primitives.shadow.md,
    dropdown: primitives.shadow.lg,
    modal: primitives.shadow.xl,
    button: primitives.shadow.sm,
  },
  font: {
    body: primitives.fontFamily.sans,
    heading: primitives.fontFamily.display,
    code: primitives.fontFamily.mono,
    ui: primitives.fontFamily.sans,
  },
  textTransform: {
    button: "none",
    label: "capitalize",
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
// SOFT THEME UTILITIES
// =============================================================================

/**
 * Format text for soft style buttons
 * Example: "Save Changes" → "Save Changes"
 */
export function formatButtonText(text: string): string {
  return text;
}

/**
 * Format text for soft style labels
 * Example: "email" → "Email"
 */
export function formatLabelText(label: string): string {
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/**
 * Format card header for soft style
 * Example: ("Settings", "00") → "Settings"
 */
export function formatCardHeader(title: string): string {
  return title;
}

// =============================================================================
// SOFT TAILWIND CLASSES
// =============================================================================

export const softClasses = {
  radius: "rounded-xl",
  font: "font-sans",
  text: "",
  cardHeader: "font-sans text-base font-semibold",
  label: "font-sans text-sm text-muted-foreground capitalize",
  button: "rounded-xl font-sans shadow-sm",
  input: "rounded-lg font-sans border-input",
  card: "rounded-2xl border border-border shadow-md",
  badge: "rounded-full font-sans text-xs",
} as const;

export default softTheme;
