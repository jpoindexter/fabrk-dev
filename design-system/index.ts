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
// LEGACY COMPATIBILITY EXPORTS (from old src/lib/design-system)
// ============================================================================

/**
 * Visual Mode type - maps to VisualModeName but with old naming
 * @deprecated Use VisualModeName instead
 */
export type VisualMode = "sharp" | "standard" | "minimal" | "linear";

/**
 * Visual mode configuration interface
 */
export interface LegacyVisualModeConfig {
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
 * Legacy visual mode configurations
 */
export const legacyVisualModes: Record<VisualMode, LegacyVisualModeConfig> = {
  sharp: {
    radius: "rounded-none",
    font: "font-mono",
    shadow: "",
    buttonPrefix: "> ",
    labelFormat: "brackets",
    cardHeader: "bracketed",
    textTransform: "uppercase",
    inputStyle: "rounded-none border-border",
    borderWidth: "border",
  },
  standard: {
    radius: "rounded-lg",
    font: "font-sans",
    shadow: "shadow-sm",
    buttonPrefix: "",
    labelFormat: "plain",
    cardHeader: "simple",
    textTransform: "normal",
    inputStyle: "rounded-lg border-input",
    borderWidth: "border",
  },
  minimal: {
    radius: "rounded-md",
    font: "font-sans",
    shadow: "",
    buttonPrefix: "",
    labelFormat: "plain",
    cardHeader: "minimal",
    textTransform: "normal",
    inputStyle: "rounded-md border-input/50",
    borderWidth: "border-0",
  },
  linear: {
    radius: "rounded-lg",
    font: "font-sans",
    shadow: "shadow-sm",
    buttonPrefix: "",
    labelFormat: "plain",
    cardHeader: "simple",
    textTransform: "normal",
    inputStyle: "rounded-lg border-input",
    borderWidth: "border",
  },
};

/**
 * Current visual mode for the entire application.
 * Change this value to switch the entire site's aesthetic.
 */
export const CURRENT_MODE: VisualMode = "sharp";

/**
 * Current mode configuration - use this in components
 * This is the main export used by 100+ components
 */
export const mode = legacyVisualModes[CURRENT_MODE];

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
 * Get card header classes for current mode
 */
export function getCardHeaderClasses(): string {
  if (mode.cardHeader === "bracketed") {
    return "font-mono text-xs text-muted-foreground";
  }
  if (mode.cardHeader === "simple") {
    return "font-sans text-sm font-medium";
  }
  return "font-sans text-sm";
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
 * Check if current mode is sharp (angular)
 */
export function isSharpMode(): boolean {
  return CURRENT_MODE === "sharp";
}

/**
 * Check if current mode uses rounded corners
 */
export function hasRoundedCorners(): boolean {
  return CURRENT_MODE !== "sharp";
}

// ============================================================================
// DESIGN SYSTEM CONSTANTS (LEGACY - prefer typography scale exports above)
// These are kept for backwards compatibility with existing components.
// For new code, use: import { headingHierarchy, bodyText, uiText } from '@/design-system'
// ============================================================================

/**
 * @deprecated Use `headingHierarchy` from typography scale instead
 */
export const TYPOGRAPHY = {
  pageTitle: {
    className: "text-4xl font-semibold tracking-tight",
    description: "Large page heading - used for main page titles",
  },
  sectionHeading: {
    className: "text-2xl font-semibold",
    description: "Medium section heading",
  },
  subsectionHeading: {
    className: "text-lg font-semibold",
    description: "Small subsection heading",
  },
  body: {
    className: "text-base",
    description: "Standard body text",
  },
  small: {
    className: "text-sm",
    description: "Small text for labels and descriptions",
  },
  extraSmall: {
    className: "text-xs",
    description: "Extra small text for captions",
  },
} as const;

/**
 * @deprecated Use terminal mode formatting functions instead:
 * - formatTerminalCardHeader() for card headers
 * - formatTerminalButtonText() for buttons
 * - formatTerminalLabelText() for labels
 */
export const TERMINAL_TYPOGRAPHY = {
  pageTitle: {
    className: "font-mono text-4xl font-semibold tracking-tight",
    description: "Terminal-style page title",
  },
  pageDescription: {
    className: "font-mono text-sm text-muted-foreground",
    description: "Terminal-style page description",
  },
  sectionHeading: {
    className: "font-mono text-lg font-semibold",
    description: "Terminal-style section heading",
  },
  cardHeader: {
    className: "font-mono text-xs text-muted-foreground",
    description: "Terminal card header - [ [0xXX] TITLE ]",
  },
  label: {
    className: "font-mono text-xs text-muted-foreground",
    description: "Terminal-style label with brackets",
  },
  body: {
    className: "font-mono text-xs",
    description: "Terminal-style body text",
  },
  feature: {
    className: "font-mono text-xs",
    description: "Terminal-style feature list item",
  },
  note: {
    className: "font-mono text-xs text-muted-foreground",
    description: "Terminal-style note text",
  },
  badge: {
    className: "font-mono text-xs",
    description: "Terminal-style badge text",
  },
  code: {
    className: "font-mono text-xs",
    description: "Terminal-style code/hex display",
  },
} as const;

/**
 * @deprecated Use `headingHierarchy.docs` from typography scale instead
 */
export const DOCS_TYPOGRAPHY = {
  h1: {
    className: "font-mono text-3xl font-bold tracking-tight",
    description: "Docs page main heading",
  },
  h2: {
    className: "font-mono text-2xl font-semibold",
    description: "Docs section heading",
  },
  h3: {
    className: "font-mono text-xl font-semibold",
    description: "Docs subsection heading",
  },
  h4: {
    className: "font-mono text-lg font-medium",
    description: "Docs card heading",
  },
  paragraph: {
    className: "font-mono text-sm leading-relaxed",
    description: "Docs paragraph text",
  },
  caption: {
    className: "font-mono text-xs text-muted-foreground",
    description: "Docs caption text",
  },
  codeInline: {
    className: "font-mono text-xs bg-muted px-1.5 py-0.5 rounded-none",
    description: "Inline code snippet",
  },
} as const;

/**
 * @deprecated Use `spacingBundle` or import from spacing/scale directly
 */
export const SPACING = {
  containerMaxWidth: "max-w-6xl",
  containerDescription: "Standard maximum container width for dashboard pages",
  gridGap: "gap-6",
  gridGapDescription: "Standard gap between grid items",
  cardPadding: "p-6",
  cardPaddingDescription: "Standard padding inside cards and containers",
  sectionSpacing: "space-y-6",
  sectionSpacingDescription: "Vertical spacing between sections",
  xs: "space-x-2",
  sm: "space-x-3",
  md: "space-x-4",
  lg: "space-x-6",
  xl: "space-x-8",
} as const;

export const BUTTON_SIZES = {
  icon: {
    className: "h-10 w-10",
    description: "Icon button size (40px) - WCAG 2.1 AA compliant",
    wcagCompliant: true,
  },
  small: {
    className: "h-7 px-2 text-xs",
    description: "Small button",
  },
  default: {
    className: "h-8 px-3 py-1.5",
    description: "Default button size",
  },
  large: {
    className: "h-9 px-6",
    description: "Large button",
  },
  xl: {
    className: "h-12 px-8 text-lg",
    description: "Extra large button",
  },
} as const;

export const PAGINATION = {
  buttonSize: {
    className: "h-10 w-10",
    description: "Pagination button size (40px) - WCAG 2.1 AA compliant",
  },
  defaultPageSizes: [10, 20, 30, 40, 50],
  description: "Default options for rows per page in data tables",
} as const;

export const SCROLL = {
  containerClass:
    "scroll-smooth [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-none",
  description: "Styled scrollbar for overflow-x-auto containers",
  appliedTo: ["pricing-table", "data-table"],
} as const;

export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  mobile: "< 640px",
  tablet: ">= 640px",
  desktop: ">= 768px",
  large: ">= 1024px",
} as const;

export const ACCESSIBILITY = {
  minTouchTarget: "44x44px",
  iconButton: "40x40px (h-10 w-10)",
  paginationButton: "40x40px (h-10 w-10)",
  touchTargetNote: "40px base size + padding/margin achieves 44px touch target",
} as const;

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
