/**
 * Design System
 *
 * Token-driven, themeable design system for modern SaaS applications.
 *
 * Architecture:
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  COMPONENTS                                                     │
 * │  Reference semantic tokens only                                 │
 * │  Never reference raw values or theme-specific tokens            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  SEMANTIC TOKENS                                                │
 * │  Role-based naming (bg-surface, text-primary)                   │
 * │  Resolved by active theme                                       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  THEMES                                                         │
 * │  Map semantic tokens to primitive values                        │
 * │  Terminal, Modern, Soft                                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  PRIMITIVES                                                     │
 * │  Raw values (colors, sizes)                                     │
 * │  Shared across all themes                                       │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * @see ./spec/overview.md for philosophy
 * @see ./spec/foundations.md for token definitions
 * @see ./spec/themes.md for theme system
 */

// =============================================================================
// TOKEN EXPORTS
// =============================================================================

export {
  primitives,
  colors,
  space,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  radius,
  shadow,
  duration,
  easing,
  breakpoint,
  container,
  zIndex,
  borderWidth,
  accessibility,
} from "./tokens/primitives";

export type {
  SemanticTokens,
  ColorTokens,
  RadiusTokens,
  ShadowTokens,
  FontTokens,
  TextTransformTokens,
  SpacingTokens,
} from "./tokens/semantic";

export { cssVariableNames } from "./tokens/semantic";

// =============================================================================
// THEME EXPORTS
// =============================================================================

export {
  themes,
  themeClasses,
  themeUtils,
  THEME_NAMES,
  DEFAULT_THEME,
  CURRENT_THEME,
  getActiveTheme,
  getActiveThemeClasses,
  getActiveThemeUtils,
  terminalTheme,
  terminalClasses,
  modernTheme,
  modernClasses,
  softTheme,
  softClasses,
  formatTerminalButtonText,
  formatTerminalLabelText,
  formatTerminalCardHeader,
  formatTerminalStatusText,
  formatModernButtonText,
  formatModernLabelText,
  formatModernCardHeader,
  formatSoftButtonText,
  formatSoftLabelText,
  formatSoftCardHeader,
} from "./themes";

export type { ThemeName, ThemeUtils } from "./themes";

// =============================================================================
// BACKWARDS COMPATIBILITY LAYER
// =============================================================================
// The following exports maintain compatibility with the 100+ components
// that import from @/design-system using the old API.

import {
  CURRENT_THEME,
  themeClasses,
  getActiveThemeUtils,
  terminalClasses,
} from "./themes";

/**
 * Visual mode configuration interface (for backwards compatibility)
 */
export interface ModeConfig {
  radius: string;
  font: string;
  shadow: string;
  buttonPrefix: string;
  labelFormat: "brackets" | "plain";
  cardHeader: "bracketed" | "simple" | "minimal";
  textTransform: "uppercase" | "normal";
  inputStyle: string;
  borderWidth: string;
}

/**
 * Current mode configuration - used by 100+ components
 * This maps the new theme system to the old `mode` API
 */
export const mode: ModeConfig = {
  radius: terminalClasses.radius,
  font: terminalClasses.font,
  shadow: "",
  buttonPrefix: "> ",
  labelFormat: "brackets",
  cardHeader: "bracketed",
  textTransform: "uppercase",
  inputStyle: terminalClasses.input,
  borderWidth: "border",
};

/**
 * Format a label according to current mode
 */
export function formatLabel(label: string): string {
  if (mode.labelFormat === "brackets") {
    return `[${label.toUpperCase()}]:`;
  }
  return label;
}

/**
 * Format button text according to current mode
 */
export function formatButtonText(text: string): string {
  if (mode.textTransform === "uppercase") {
    return `${mode.buttonPrefix}${text.toUpperCase().replace(/ /g, "_")}`;
  }
  return `${mode.buttonPrefix}${text}`;
}

/**
 * Format card title according to current mode
 */
export function formatCardTitle(title: string, code?: string): string {
  if (mode.cardHeader === "bracketed") {
    const hexCode = code ? `[0x${code}] ` : "";
    return `[ ${hexCode}${title.toUpperCase()} ]`;
  }
  return title;
}

/**
 * Check if current mode is sharp (terminal)
 */
export function isSharpMode(): boolean {
  return CURRENT_THEME === "terminal";
}

/**
 * Check if current mode uses rounded corners
 */
export function hasRoundedCorners(): boolean {
  return CURRENT_THEME !== "terminal";
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

const designSystem = {
  mode,
  formatLabel,
  formatButtonText,
  formatCardTitle,
  isSharpMode,
  hasRoundedCorners,
} as const;

export default designSystem;
