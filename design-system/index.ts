/**
 * Fabrk Design System
 *
 * Centralized export for all design system tokens, themes, and utilities.
 *
 * Architecture:
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                        DESIGN SYSTEM                            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  TOKENS (What)                                                  │
 * │  ├── primitives  → Raw values (4px, 16px, #000)                │
 * │  ├── semantic    → Purpose-based (bg-surface, text-muted)      │
 * │  └── components  → Component-specific (button.size.lg)         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  THEMES (How)                                                   │
 * │  ├── visual modes → Shape/feel (terminal, modern, minimal)     │
 * │  └── color themes → Colors (light, dark, dracula, etc.)        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  SCALES (Standards)                                             │
 * │  ├── typography  → Type scale, heading hierarchy               │
 * │  └── spacing     → 8-point grid, semantic spacing              │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Usage:
 * ```tsx
 * import { tokens, themes, typography, spacing } from '@/design-system';
 *
 * // Use semantic tokens
 * <div className={tokens.colors.background.surface}>
 *
 * // Use component tokens
 * <Button className={tokens.components.button.size.lg.height}>
 *
 * // Use theme utilities
 * const headerText = themes.terminal.formatCardHeader("Settings", "00");
 *
 * // Use typography scale
 * <h1 className={typography.headingHierarchy.app.h1.tailwind}>
 *
 * // Use spacing
 * <div className={spacing.semantic.section.lg.py}>
 * ```
 *
 * @see ./docs/AUDIT-CURRENT-STATE.md for current state analysis
 * @see ./docs/AUDIT-INCONSISTENCIES.md for known issues
 */

// ============================================================================
// TOKEN EXPORTS
// ============================================================================

export { primitives, default as primitivesDefault } from "./tokens/primitives";
export type {
  Spacing,
  FontSize,
  LineHeight,
  FontWeight,
  LetterSpacing,
  FontFamily,
  BorderRadius,
  Shadow,
  BorderWidth,
  Opacity,
  ZIndex,
  Duration,
  Easing,
  Breakpoint,
  ContainerWidth,
} from "./tokens/primitives";

export {
  semanticTokens,
  colors,
  spacing as semanticSpacing,
  typography as semanticTypography,
  interactive,
  layout,
  elevation,
  default as semanticDefault,
} from "./tokens/semantic";

export {
  componentTokens,
  button,
  input,
  card,
  badge,
  alert,
  dialog,
  table,
  form,
  navigation,
  tooltip,
  dropdown,
  skeleton,
  default as componentsDefault,
} from "./tokens/components";

// ============================================================================
// THEME EXPORTS
// ============================================================================

export type {
  VisualModeName,
  VisualModeConfig,
  ColorThemeName,
  ColorThemeType,
  ColorThemeMetadata,
  ColorThemeColors,
  ColorTheme,
  ThemeState,
  ThemeCSSVariables,
  ThemeClassMap,
  OklchValue,
} from "./themes/theme.types";

export {
  isVisualModeName,
  isColorThemeName,
  isDarkTheme,
  DEFAULT_VISUAL_MODE,
  DEFAULT_COLOR_THEME,
  VISUAL_MODE_NAMES,
  COLOR_THEME_NAMES,
} from "./themes/theme.types";

export {
  terminalMode,
  terminalClasses,
  terminalCopy,
  formatTerminalText,
  formatButtonText as formatTerminalButtonText,
  formatLabelText as formatTerminalLabelText,
  formatCardHeader as formatTerminalCardHeader,
  formatStatusText,
  default as terminalDefault,
} from "./themes/terminal";

export {
  modernMode,
  modernClasses,
  minimalMode,
  minimalClasses,
  linearMode,
  linearClasses,
  formatModernText,
  formatButtonText as formatModernButtonText,
  formatLabelText as formatModernLabelText,
  formatCardHeader as formatModernCardHeader,
  default as modernDefault,
} from "./themes/modern";

// ============================================================================
// SCALE EXPORTS
// ============================================================================

export {
  typographyScale,
  typeScale,
  headingHierarchy,
  bodyText,
  uiText,
  fontWeights,
  lineHeights,
  letterSpacing,
  default as typographyDefault,
} from "./typography/scale";

export {
  spacing,
  spacingScale,
  semanticSpacing as spacingSemanticSpacing,
  containerWidths,
  gridLayouts,
  BANNED_VALUES,
  isOnGrid,
  getNearestGridValue,
  suggestReplacement,
  default as spacingDefault,
} from "./spacing/scale";

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

export {
  cssGenerators,
  generateCSSVariables,
  generateNestedCSSVariables,
  generateVisualModeCSS,
  generatePrimitiveCSS,
  toKebabCase,
  toCamelCase,
  combineClasses,
  generateInlineStyles,
  default as cssGeneratorsDefault,
} from "./utils/generate-css";

export type {
  CSSVariableOutput,
  GeneratedCSS,
} from "./utils/generate-css";

export {
  validators,
  validateSpacing,
  validateTypography,
  validateColors,
  validateRadius,
  validateShadows,
  validateAll,
  extractClassStrings,
  validateFile,
  rules,
  BANNED_SPACING_VALUES,
  default as validatorsDefault,
} from "./utils/validate-tokens";

export type {
  ValidationResult,
  ValidationRule,
} from "./utils/validate-tokens";

// ============================================================================
// HOOK EXPORTS
// ============================================================================

export {
  useTheme,
  default as useThemeDefault,
} from "./hooks/use-theme";

export type {
  UseThemeOptions,
  UseThemeReturn,
} from "./hooks/use-theme";

export {
  useVisualMode,
  getVisualModeClasses,
  getVisualModeConfig,
  getCurrentVisualMode,
  default as useVisualModeDefault,
} from "./hooks/use-visual-mode";

export type {
  UseVisualModeOptions,
  UseVisualModeReturn,
  VisualModeClasses,
} from "./hooks/use-visual-mode";

export {
  useTokens,
  cn,
  buildClass,
  createVariantClass,
  default as useTokensDefault,
} from "./hooks/use-tokens";

export type {
  UseTokensReturn,
} from "./hooks/use-tokens";

// ============================================================================
// PROVIDER EXPORTS
// ============================================================================

export {
  ThemeProvider,
  useThemeContext,
  useOptionalThemeContext,
  ThemeScript,
} from "./providers";

export type {
  ThemeProviderProps,
  ThemeContextValue,
} from "./providers";

// ============================================================================
// CONVENIENCE BUNDLES
// ============================================================================

import { primitives } from "./tokens/primitives";
import { semanticTokens, colors, interactive, layout, elevation } from "./tokens/semantic";
import { componentTokens } from "./tokens/components";
import { terminalMode, terminalClasses, terminalCopy } from "./themes/terminal";
import { modernMode, modernClasses, minimalMode, minimalClasses, linearMode, linearClasses } from "./themes/modern";
import { typographyScale, headingHierarchy, bodyText, uiText } from "./typography/scale";
import { spacing, semanticSpacing as spacingSemanticSpacing, containerWidths, gridLayouts } from "./spacing/scale";
import { cssGenerators } from "./utils/generate-css";
import { validators, rules } from "./utils/validate-tokens";
import type { VisualModeConfig, VisualModeName } from "./themes/theme.types";

/**
 * All tokens bundled together
 */
export const tokens = {
  primitives,
  semantic: semanticTokens,
  colors,
  components: componentTokens,
  interactive,
  layout,
  elevation,
} as const;

/**
 * All visual modes bundled together
 */
export const visualModes: Record<VisualModeName, VisualModeConfig> = {
  terminal: terminalMode,
  modern: modernMode,
  minimal: minimalMode,
  linear: linearMode,
} as const;

/**
 * All visual mode classes bundled together
 */
export const visualModeClasses = {
  terminal: terminalClasses,
  modern: modernClasses,
  minimal: minimalClasses,
  linear: linearClasses,
} as const;

/**
 * Copy patterns for each mode
 */
export const copyPatterns = {
  terminal: terminalCopy,
} as const;

/**
 * Typography bundle
 */
export const typography = {
  scale: typographyScale,
  headings: headingHierarchy,
  body: bodyText,
  ui: uiText,
} as const;

/**
 * Spacing bundle
 */
export const spacingBundle = {
  scale: spacing,
  semantic: spacingSemanticSpacing,
  containers: containerWidths,
  grids: gridLayouts,
} as const;

/**
 * Utilities bundle
 */
export const utils = {
  css: cssGenerators,
  validators,
  rules,
} as const;

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

const designSystem = {
  tokens,
  visualModes,
  visualModeClasses,
  copyPatterns,
  typography,
  spacing: spacingBundle,
  utils,
} as const;

export default designSystem;
