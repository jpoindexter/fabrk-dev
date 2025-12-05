"use client";

/**
 * useTokens Hook
 *
 * Provides convenient access to design tokens with TypeScript support.
 * Includes utilities for building class strings and accessing semantic values.
 *
 * Usage:
 * ```tsx
 * import { useTokens } from '@/design-system/hooks/use-tokens';
 *
 * function Button({ children }) {
 *   const { button, cn, spacing } = useTokens();
 *
 *   return (
 *     <button className={cn(
 *       button.base,
 *       button.size.default.height,
 *       button.variant.default.base,
 *       spacing.component.md
 *     )}>
 *       {children}
 *     </button>
 *   );
 * }
 * ```
 */

import { useMemo } from "react";
import { componentTokens, button, input, card, badge, alert, dialog } from "../tokens/components";
import { semanticTokens, colors, interactive, layout, elevation } from "../tokens/semantic";
import { primitives } from "../tokens/primitives";
import { typographyScale, headingHierarchy, bodyText, uiText } from "../typography/scale";
import { spacing as spacingScale, semanticSpacing, containerWidths, gridLayouts } from "../spacing/scale";

// ============================================================================
// TYPES
// ============================================================================

export interface UseTokensReturn {
  // -------------------------------------------------------------------------
  // Component tokens
  // -------------------------------------------------------------------------
  /** Button tokens */
  button: typeof button;
  /** Input tokens */
  input: typeof input;
  /** Card tokens */
  card: typeof card;
  /** Badge tokens */
  badge: typeof badge;
  /** Alert tokens */
  alert: typeof alert;
  /** Dialog tokens */
  dialog: typeof dialog;
  /** All component tokens */
  components: typeof componentTokens;

  // -------------------------------------------------------------------------
  // Semantic tokens
  // -------------------------------------------------------------------------
  /** Color tokens */
  colors: typeof colors;
  /** Interactive tokens (focus, transitions) */
  interactive: typeof interactive;
  /** Layout tokens (containers, grids) */
  layout: typeof layout;
  /** Elevation tokens (z-index, shadows) */
  elevation: typeof elevation;
  /** All semantic tokens */
  semantic: typeof semanticTokens;

  // -------------------------------------------------------------------------
  // Primitive tokens
  // -------------------------------------------------------------------------
  /** Raw primitive values */
  primitives: typeof primitives;

  // -------------------------------------------------------------------------
  // Typography
  // -------------------------------------------------------------------------
  /** Type scale */
  typeScale: typeof typographyScale;
  /** Heading hierarchy */
  headings: typeof headingHierarchy;
  /** Body text styles */
  body: typeof bodyText;
  /** UI text styles */
  ui: typeof uiText;

  // -------------------------------------------------------------------------
  // Spacing
  // -------------------------------------------------------------------------
  /** Spacing scale */
  spacing: typeof spacingScale;
  /** Semantic spacing */
  semanticSpacing: typeof semanticSpacing;
  /** Container widths */
  containers: typeof containerWidths;
  /** Grid layouts */
  grids: typeof gridLayouts;

  // -------------------------------------------------------------------------
  // Utilities
  // -------------------------------------------------------------------------
  /** Combine classes (like cn/clsx) */
  cn: (...classes: (string | undefined | false | null)[]) => string;
  /** Get CSS variable value */
  getCSSVar: (name: string) => string;
  /** Build responsive class string */
  responsive: (
    base: string,
    sm?: string,
    md?: string,
    lg?: string,
    xl?: string
  ) => string;
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

export function useTokens(): UseTokensReturn {
  return useMemo(() => {
    // Utility: combine classes
    const cn = (...classes: (string | undefined | false | null)[]): string => {
      return classes.filter(Boolean).join(" ");
    };

    // Utility: get CSS variable
    const getCSSVar = (name: string): string => {
      if (typeof window === "undefined") {
        return `var(--${name})`;
      }
      const value = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`);
      return value.trim() || `var(--${name})`;
    };

    // Utility: build responsive class string
    const responsive = (
      base: string,
      sm?: string,
      md?: string,
      lg?: string,
      xl?: string
    ): string => {
      const classes = [base];
      if (sm) classes.push(`sm:${sm}`);
      if (md) classes.push(`md:${md}`);
      if (lg) classes.push(`lg:${lg}`);
      if (xl) classes.push(`xl:${xl}`);
      return classes.join(" ");
    };

    return {
      // Component tokens
      button,
      input,
      card,
      badge,
      alert,
      dialog,
      components: componentTokens,

      // Semantic tokens
      colors,
      interactive,
      layout,
      elevation,
      semantic: semanticTokens,

      // Primitive tokens
      primitives,

      // Typography
      typeScale: typographyScale,
      headings: headingHierarchy,
      body: bodyText,
      ui: uiText,

      // Spacing
      spacing: spacingScale,
      semanticSpacing,
      containers: containerWidths,
      grids: gridLayouts,

      // Utilities
      cn,
      getCSSVar,
      responsive,
    };
  }, []);
}

// ============================================================================
// STATIC UTILITIES
// ============================================================================

/**
 * Combine classes (like cn/clsx) - static version
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Build a class string from token parts
 */
export function buildClass(
  ...tokens: Array<string | Record<string, boolean | undefined>>
): string {
  const classes: string[] = [];

  for (const token of tokens) {
    if (typeof token === "string") {
      classes.push(token);
    } else if (typeof token === "object") {
      for (const [className, enabled] of Object.entries(token)) {
        if (enabled) {
          classes.push(className);
        }
      }
    }
  }

  return classes.join(" ");
}

/**
 * Create variant-based class builder
 *
 * @example
 * ```ts
 * const buttonClass = createVariantClass(button.variant, button.size);
 * const classes = buttonClass({ variant: 'default', size: 'lg' });
 * ```
 */
export function createVariantClass<
  V extends Record<string, { base: string; hover?: string }>,
  S extends Record<string, { height: string; padding: string }>
>(
  variants: V,
  sizes: S
): (options: { variant?: keyof V; size?: keyof S }) => string {
  return ({ variant = "default" as keyof V, size = "default" as keyof S }) => {
    const variantClasses = variants[variant];
    const sizeClasses = sizes[size];

    return cn(
      variantClasses?.base,
      variantClasses?.hover,
      sizeClasses?.height,
      sizeClasses?.padding
    );
  };
}

export default useTokens;
