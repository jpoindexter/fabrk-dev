/**
 * Theme System
 *
 * Export all themes and utilities.
 */

import terminalTheme, {
  formatButtonText as formatTerminalButtonText,
  formatLabelText as formatTerminalLabelText,
  formatCardHeader as formatTerminalCardHeader,
  formatStatusText as formatTerminalStatusText,
  terminalClasses,
} from "./terminal";

import modernTheme, {
  formatButtonText as formatModernButtonText,
  formatLabelText as formatModernLabelText,
  formatCardHeader as formatModernCardHeader,
  modernClasses,
} from "./modern";

import softTheme, {
  formatButtonText as formatSoftButtonText,
  formatLabelText as formatSoftLabelText,
  formatCardHeader as formatSoftCardHeader,
  softClasses,
} from "./soft";

import type { SemanticTokens } from "../tokens/semantic";

// =============================================================================
// THEME NAMES
// =============================================================================

export type ThemeName = "terminal" | "modern" | "soft";

export const THEME_NAMES: ThemeName[] = ["terminal", "modern", "soft"];

export const DEFAULT_THEME: ThemeName = "terminal";

// =============================================================================
// THEME REGISTRY
// =============================================================================

export const themes: Record<ThemeName, SemanticTokens> = {
  terminal: terminalTheme,
  modern: modernTheme,
  soft: softTheme,
};

export const themeClasses = {
  terminal: terminalClasses,
  modern: modernClasses,
  soft: softClasses,
};

// =============================================================================
// ACTIVE THEME (for backwards compatibility)
// =============================================================================

/**
 * Current active theme name.
 * This is used by the `mode` export for backwards compatibility.
 */
export const CURRENT_THEME: ThemeName = "terminal";

/**
 * Get the active theme tokens
 */
export function getActiveTheme(): SemanticTokens {
  return themes[CURRENT_THEME];
}

/**
 * Get the active theme classes
 */
export function getActiveThemeClasses() {
  return themeClasses[CURRENT_THEME];
}

// =============================================================================
// THEME UTILITIES
// =============================================================================

export interface ThemeUtils {
  formatButtonText: (text: string) => string;
  formatLabelText: (label: string) => string;
  formatCardHeader: (title: string, code?: string) => string;
}

export const themeUtils: Record<ThemeName, ThemeUtils> = {
  terminal: {
    formatButtonText: formatTerminalButtonText,
    formatLabelText: formatTerminalLabelText,
    formatCardHeader: formatTerminalCardHeader,
  },
  modern: {
    formatButtonText: formatModernButtonText,
    formatLabelText: formatModernLabelText,
    formatCardHeader: formatModernCardHeader,
  },
  soft: {
    formatButtonText: formatSoftButtonText,
    formatLabelText: formatSoftLabelText,
    formatCardHeader: formatSoftCardHeader,
  },
};

/**
 * Get utilities for the active theme
 */
export function getActiveThemeUtils(): ThemeUtils {
  return themeUtils[CURRENT_THEME];
}

// =============================================================================
// RE-EXPORTS
// =============================================================================

export { terminalTheme, terminalClasses };
export { modernTheme, modernClasses };
export { softTheme, softClasses };
export type { SemanticTokens };

// Individual utility re-exports
export {
  formatTerminalButtonText,
  formatTerminalLabelText,
  formatTerminalCardHeader,
  formatTerminalStatusText,
};
export { formatModernButtonText, formatModernLabelText, formatModernCardHeader };
export { formatSoftButtonText, formatSoftLabelText, formatSoftCardHeader };
