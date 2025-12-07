/**
 * Terminal Theme
 *
 * Sharp edges, monospace typography, uppercase text.
 * Developer tools, CLI-inspired aesthetic.
 */

import { primitives } from "../tokens/primitives";
import type { SemanticTokens } from "../tokens/semantic";

export const terminalTheme: SemanticTokens = {
  color: {
    bg: {
      base: primitives.colors.gray[950],
      surface: primitives.colors.gray[900],
      surfaceRaised: primitives.colors.gray[800],
      surfaceSunken: primitives.colors.gray[950],
      muted: primitives.colors.gray[800],
      accent: primitives.colors.primary[600],
      accentMuted: primitives.colors.primary[950],
      accentHover: primitives.colors.primary[500],
      danger: primitives.colors.red[600],
      dangerMuted: primitives.colors.red[950],
      success: primitives.colors.green[600],
      successMuted: primitives.colors.green[950],
      warning: primitives.colors.amber[500],
      warningMuted: primitives.colors.amber[950],
      info: primitives.colors.blue[600],
      infoMuted: primitives.colors.blue[950],
    },
    text: {
      primary: primitives.colors.gray[50],
      secondary: primitives.colors.gray[300],
      muted: primitives.colors.gray[500],
      disabled: primitives.colors.gray[600],
      inverse: primitives.colors.gray[950],
      accent: primitives.colors.primary[400],
      accentHover: primitives.colors.primary[300],
      danger: primitives.colors.red[400],
      success: primitives.colors.green[400],
      warning: primitives.colors.amber[400],
      info: primitives.colors.blue[400],
    },
    border: {
      default: primitives.colors.gray[800],
      muted: primitives.colors.gray[900],
      strong: primitives.colors.gray[700],
      accent: primitives.colors.primary[500],
      danger: primitives.colors.red[500],
      success: primitives.colors.green[500],
      focus: primitives.colors.primary[400],
    },
  },
  radius: {
    button: primitives.radius.none,
    input: primitives.radius.none,
    card: primitives.radius.none,
    modal: primitives.radius.none,
    badge: primitives.radius.sm,
    avatar: primitives.radius.none,
  },
  shadow: {
    card: primitives.shadow.none,
    dropdown: primitives.shadow.sm,
    modal: primitives.shadow.md,
    button: primitives.shadow.none,
  },
  font: {
    body: primitives.fontFamily.mono,
    heading: primitives.fontFamily.mono,
    code: primitives.fontFamily.mono,
    ui: primitives.fontFamily.mono,
  },
  textTransform: {
    button: "uppercase",
    label: "uppercase",
    heading: "uppercase",
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
// TERMINAL THEME UTILITIES
// =============================================================================

/**
 * Format text for terminal style buttons
 * Example: "Save Changes" → "> SAVE_CHANGES"
 */
export function formatButtonText(text: string): string {
  return `> ${text.toUpperCase().replace(/ /g, "_")}`;
}

/**
 * Format text for terminal style labels
 * Example: "Email" → "[EMAIL]:"
 */
export function formatLabelText(label: string): string {
  return `[${label.toUpperCase()}]:`;
}

/**
 * Format card header for terminal style
 * Example: ("Settings", "00") → "[ [0x00] SETTINGS ]"
 */
export function formatCardHeader(title: string, code?: string): string {
  const hexCode = code ? `[0x${code}] ` : "";
  return `[ ${hexCode}${title.toUpperCase()} ]`;
}

/**
 * Format status text for terminal style
 * Example: "Active" → "[ACTIVE]"
 */
export function formatStatusText(status: string): string {
  return `[${status.toUpperCase()}]`;
}

// =============================================================================
// TERMINAL TAILWIND CLASSES
// =============================================================================

export const terminalClasses = {
  radius: "rounded",
  font: "font-mono",
  text: "uppercase",
  cardHeader: "font-mono text-xs text-muted-foreground",
  label: "font-mono text-xs text-muted-foreground uppercase",
  button: "rounded font-mono uppercase",
  input: "rounded font-mono border-border",
  card: "rounded border border-border",
  badge: "rounded font-mono text-xs uppercase",
} as const;

export default terminalTheme;
