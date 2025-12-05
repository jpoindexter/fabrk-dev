/**
 * CSS Generation Utilities
 *
 * Generate CSS custom properties from TypeScript tokens.
 * Useful for build-time generation or dynamic theming.
 *
 * Usage:
 * ```ts
 * import { generateCSSVariables, generateThemeCSS } from '@/design-system/utils/generate-css';
 *
 * // Generate CSS variables from tokens
 * const css = generateCSSVariables(primitives.spacing, 'space');
 * // Output: --space-0: 0px; --space-1: 0.25rem; ...
 *
 * // Generate complete theme CSS
 * const themeCSS = generateThemeCSS('terminal');
 * ```
 */

import { primitives } from "../tokens/primitives";
import { terminalMode } from "../themes/terminal";
import { modernMode, minimalMode, linearMode } from "../themes/modern";
import type { VisualModeConfig, VisualModeName } from "../themes/theme.types";

// ============================================================================
// TYPES
// ============================================================================

export interface CSSVariableOutput {
  /** CSS variable name (including --) */
  name: string;
  /** CSS value */
  value: string;
}

export interface GeneratedCSS {
  /** Raw CSS string */
  css: string;
  /** Array of variable definitions */
  variables: CSSVariableOutput[];
  /** Selector used (e.g., ":root", "[data-visual-mode='terminal']") */
  selector: string;
}

// ============================================================================
// CSS VARIABLE GENERATION
// ============================================================================

/**
 * Generate CSS variables from a token object
 *
 * @param tokens - Object with token values
 * @param prefix - Prefix for variable names (e.g., 'space', 'text')
 * @returns Object with CSS string and variable array
 *
 * @example
 * ```ts
 * const result = generateCSSVariables(
 *   { xs: '0.75rem', sm: '0.875rem', base: '1rem' },
 *   'text'
 * );
 * // Returns: --text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem;
 * ```
 */
export function generateCSSVariables(
  tokens: Record<string, string | number>,
  prefix: string
): GeneratedCSS {
  const variables: CSSVariableOutput[] = [];

  for (const [key, value] of Object.entries(tokens)) {
    const name = `--${prefix}-${key}`;
    const cssValue = typeof value === "number" ? `${value}` : value;
    variables.push({ name, value: cssValue });
  }

  const css = variables.map((v) => `${v.name}: ${v.value};`).join("\n  ");

  return {
    css,
    variables,
    selector: ":root",
  };
}

/**
 * Generate CSS variables from nested token object
 *
 * @param tokens - Nested object with token values
 * @param prefix - Base prefix
 * @returns Flattened CSS variables
 *
 * @example
 * ```ts
 * const result = generateNestedCSSVariables(
 *   { button: { height: { sm: '2rem', lg: '2.5rem' } } },
 *   'component'
 * );
 * // Returns: --component-button-height-sm: 2rem; --component-button-height-lg: 2.5rem;
 * ```
 */
export function generateNestedCSSVariables(
  tokens: Record<string, unknown>,
  prefix: string
): GeneratedCSS {
  const variables: CSSVariableOutput[] = [];

  function traverse(obj: Record<string, unknown>, path: string[]): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        traverse(value as Record<string, unknown>, currentPath);
      } else if (typeof value === "string" || typeof value === "number") {
        const name = `--${prefix}-${currentPath.join("-")}`;
        const cssValue = typeof value === "number" ? `${value}` : value;
        variables.push({ name, value: cssValue });
      }
    }
  }

  traverse(tokens, []);

  const css = variables.map((v) => `${v.name}: ${v.value};`).join("\n  ");

  return {
    css,
    variables,
    selector: ":root",
  };
}

// ============================================================================
// THEME CSS GENERATION
// ============================================================================

const visualModes: Record<VisualModeName, VisualModeConfig> = {
  terminal: terminalMode,
  modern: modernMode,
  minimal: minimalMode,
  linear: linearMode,
};

/**
 * Generate CSS for a visual mode
 *
 * @param mode - Visual mode name
 * @returns CSS string with mode-specific variables
 */
export function generateVisualModeCSS(mode: VisualModeName): GeneratedCSS {
  const config = visualModes[mode];
  const selector =
    mode === "terminal" ? ":root" : `[data-visual-mode="${mode}"]`;

  const variables: CSSVariableOutput[] = [
    // Radius
    { name: "--mode-radius", value: `var(--radius-${config.radius.lg.replace("rounded-", "")})` },
    { name: "--mode-radius-sm", value: `var(--radius-${config.radius.sm.replace("rounded-", "")})` },
    { name: "--mode-radius-md", value: `var(--radius-${config.radius.md.replace("rounded-", "")})` },
    { name: "--mode-radius-lg", value: `var(--radius-${config.radius.lg.replace("rounded-", "")})` },

    // Shadow
    { name: "--mode-shadow", value: `var(--shadow-${config.shadow.md || "none"})` },

    // Typography
    { name: "--mode-font", value: `var(--font-${config.fontFamily})` },
    { name: "--mode-text-transform", value: config.textTransform },
    { name: "--mode-letter-spacing", value: `var(--tracking-${config.letterSpacing})` },

    // Border
    { name: "--mode-border-width", value: config.border.default === "border" ? "1px" : "0" },
  ];

  const css = `${selector} {\n  ${variables.map((v) => `${v.name}: ${v.value};`).join("\n  ")}\n}`;

  return {
    css,
    variables,
    selector,
  };
}

/**
 * Generate complete primitive token CSS
 */
export function generatePrimitiveCSS(): GeneratedCSS {
  const sections: string[] = [];

  // Spacing
  const spacingVars = generateCSSVariables(primitives.spacing, "space");
  sections.push(`/* Spacing */\n  ${spacingVars.css}`);

  // Font size
  const fontSizeVars = generateCSSVariables(primitives.fontSize, "text");
  sections.push(`/* Font Size */\n  ${fontSizeVars.css}`);

  // Border radius
  const radiusVars = generateCSSVariables(primitives.borderRadius, "radius");
  sections.push(`/* Border Radius */\n  ${radiusVars.css}`);

  // Shadow
  const shadowVars = generateCSSVariables(primitives.shadow, "shadow");
  sections.push(`/* Shadow */\n  ${shadowVars.css}`);

  // Z-index
  const zIndexVars = generateCSSVariables(primitives.zIndex, "z");
  sections.push(`/* Z-Index */\n  ${zIndexVars.css}`);

  // Duration
  const durationVars = generateCSSVariables(primitives.duration, "duration");
  sections.push(`/* Duration */\n  ${durationVars.css}`);

  const css = `:root {\n  ${sections.join("\n\n  ")}\n}`;

  return {
    css,
    variables: [],
    selector: ":root",
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert camelCase to kebab-case
 */
export function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Convert kebab-case to camelCase
 */
export function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Generate a CSS class name from tokens
 *
 * @param tokens - Array of token values
 * @returns Combined class string
 *
 * @example
 * ```ts
 * const classes = combineClasses(['rounded-none', 'font-mono', 'text-xs']);
 * // Returns: "rounded-none font-mono text-xs"
 * ```
 */
export function combineClasses(...tokens: (string | undefined | false)[]): string {
  return tokens.filter(Boolean).join(" ");
}

/**
 * Generate inline style object from CSS variables
 *
 * @param variables - Object with variable names and values
 * @returns React-compatible style object
 */
export function generateInlineStyles(
  variables: Record<string, string | number>
): Record<string, string | number> {
  const styles: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(variables)) {
    // Convert to CSS custom property format
    const cssKey = key.startsWith("--") ? key : `--${toKebabCase(key)}`;
    styles[cssKey] = value;
  }

  return styles;
}

// ============================================================================
// EXPORTS
// ============================================================================

export const cssGenerators = {
  generateCSSVariables,
  generateNestedCSSVariables,
  generateVisualModeCSS,
  generatePrimitiveCSS,
  toKebabCase,
  toCamelCase,
  combineClasses,
  generateInlineStyles,
} as const;

export default cssGenerators;
