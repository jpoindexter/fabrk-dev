/**
 * Token Validation Utilities
 *
 * Validate design system usage across the codebase.
 * Detects off-grid spacing, missing font-mono, hardcoded colors, etc.
 *
 * Usage:
 * ```ts
 * import { validateSpacing, validateTypography, validateColors } from '@/design-system/utils/validate-tokens';
 *
 * // Validate a class string
 * const result = validateSpacing('p-3 m-4 gap-6');
 * // Returns: { valid: false, violations: ['p-3'], suggestions: { 'p-3': 'p-2 or p-4' } }
 * ```
 */

// ============================================================================
// TYPES
// ============================================================================

export interface ValidationResult {
  /** Whether the input is valid */
  valid: boolean;
  /** List of violations found */
  violations: string[];
  /** Suggestions for fixing violations */
  suggestions: Record<string, string>;
  /** Severity level */
  severity: "error" | "warning" | "info";
}

export interface ValidationRule {
  /** Rule name */
  name: string;
  /** Description of what this rule checks */
  description: string;
  /** Pattern to match violations */
  pattern: RegExp;
  /** Severity level */
  severity: "error" | "warning" | "info";
  /** Function to generate suggestion */
  suggest: (match: string) => string;
}

// ============================================================================
// VALIDATION RULES
// ============================================================================

/**
 * Off-grid spacing values (breaks 8-point grid)
 */
export const BANNED_SPACING_VALUES = ["3", "5", "7", "9", "11", "14", "18"] as const;

/**
 * Off-grid spacing patterns
 */
const offGridSpacingPatterns = BANNED_SPACING_VALUES.map((value) => ({
  value,
  pattern: new RegExp(`(?:^|\\s)(?:p|m|gap|space-[xy]|px|py|mx|my|pt|pb|pl|pr|mt|mb|ml|mr)-${value}(?:\\s|$)`, "g"),
  smaller: value === "3" ? "2" : value === "5" ? "4" : value === "7" ? "6" : value === "9" ? "8" : value === "11" ? "10" : value === "14" ? "12" : "16",
  larger: value === "3" ? "4" : value === "5" ? "6" : value === "7" ? "8" : value === "9" ? "10" : value === "11" ? "12" : value === "14" ? "16" : "20",
}));

/**
 * Spacing validation rules
 */
export const spacingRules: ValidationRule[] = offGridSpacingPatterns.map(({ value, pattern, smaller, larger }) => ({
  name: `off-grid-${value}`,
  description: `Spacing value ${value} (${parseInt(value) * 4}px) breaks 8-point grid`,
  pattern,
  severity: "error" as const,
  suggest: () => `Use ${smaller} (${parseInt(smaller) * 4}px) or ${larger} (${parseInt(larger) * 4}px)`,
}));

/**
 * Typography validation rules
 */
export const typographyRules: ValidationRule[] = [
  {
    name: "missing-font-mono",
    description: "Terminal mode requires font-mono on UI text",
    pattern: /(?:^|\s)text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl)(?:\s|$)/g,
    severity: "warning",
    suggest: () => "Add font-mono for terminal aesthetic",
  },
];

/**
 * Color validation rules
 */
export const colorRules: ValidationRule[] = [
  {
    name: "hardcoded-white",
    description: "Use bg-background or text-primary-foreground instead of white",
    pattern: /(?:^|\s)(?:bg|text|border)-white(?:\s|$)/g,
    severity: "error",
    suggest: () => "Use bg-background, text-foreground, or semantic color tokens",
  },
  {
    name: "hardcoded-black",
    description: "Use bg-foreground or text-background instead of black",
    pattern: /(?:^|\s)(?:bg|text|border)-black(?:\s|$)/g,
    severity: "error",
    suggest: () => "Use bg-foreground, text-background, or semantic color tokens",
  },
  {
    name: "hardcoded-gray",
    description: "Use muted/muted-foreground instead of gray-*",
    pattern: /(?:^|\s)(?:bg|text|border)-gray-\d+(?:\s|$)/g,
    severity: "error",
    suggest: () => "Use bg-muted, text-muted-foreground, or semantic tokens",
  },
  {
    name: "hex-color",
    description: "Hardcoded hex colors break theme switching",
    pattern: /#[0-9a-fA-F]{3,8}/g,
    severity: "error",
    suggest: () => "Use CSS variable: oklch(var(--token-name))",
  },
];

/**
 * Border radius validation rules
 */
export const radiusRules: ValidationRule[] = [
  {
    name: "rounded-sm",
    description: "Terminal mode uses rounded-none",
    pattern: /(?:^|\s)rounded-sm(?:\s|$)/g,
    severity: "warning",
    suggest: () => "Use rounded-none for terminal mode",
  },
  {
    name: "rounded-md",
    description: "Terminal mode uses rounded-none",
    pattern: /(?:^|\s)rounded-md(?:\s|$)/g,
    severity: "warning",
    suggest: () => "Use rounded-none for terminal mode",
  },
  {
    name: "rounded-lg",
    description: "Terminal mode uses rounded-none",
    pattern: /(?:^|\s)rounded-lg(?:\s|$)/g,
    severity: "warning",
    suggest: () => "Use rounded-none for terminal mode",
  },
  {
    name: "rounded-xl",
    description: "Terminal mode uses rounded-none",
    pattern: /(?:^|\s)rounded-xl(?:\s|$)/g,
    severity: "warning",
    suggest: () => "Use rounded-none for terminal mode",
  },
];

/**
 * Shadow validation rules
 */
export const shadowRules: ValidationRule[] = [
  {
    name: "shadow-md",
    description: "Terminal mode uses no shadows",
    pattern: /(?:^|\s)shadow-md(?:\s|$)/g,
    severity: "warning",
    suggest: () => "Remove shadow for terminal mode",
  },
  {
    name: "shadow-lg",
    description: "Terminal mode uses no shadows",
    pattern: /(?:^|\s)shadow-lg(?:\s|$)/g,
    severity: "warning",
    suggest: () => "Remove shadow for terminal mode",
  },
  {
    name: "shadow-xl",
    description: "Terminal mode uses no shadows",
    pattern: /(?:^|\s)shadow-xl(?:\s|$)/g,
    severity: "warning",
    suggest: () => "Remove shadow for terminal mode",
  },
];

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate a class string against a set of rules
 */
function validateAgainstRules(
  classString: string,
  rules: ValidationRule[]
): ValidationResult {
  const violations: string[] = [];
  const suggestions: Record<string, string> = {};
  let maxSeverity: "error" | "warning" | "info" = "info";

  for (const rule of rules) {
    const matches = classString.match(rule.pattern);
    if (matches) {
      for (const match of matches) {
        const trimmed = match.trim();
        if (trimmed) {
          violations.push(trimmed);
          suggestions[trimmed] = rule.suggest(trimmed);

          if (rule.severity === "error") {
            maxSeverity = "error";
          } else if (rule.severity === "warning" && maxSeverity !== "error") {
            maxSeverity = "warning";
          }
        }
      }
    }
  }

  return {
    valid: violations.length === 0,
    violations,
    suggestions,
    severity: violations.length === 0 ? "info" : maxSeverity,
  };
}

/**
 * Validate spacing classes
 *
 * @param classString - Tailwind class string to validate
 * @returns Validation result with violations and suggestions
 */
export function validateSpacing(classString: string): ValidationResult {
  return validateAgainstRules(classString, spacingRules);
}

/**
 * Validate typography classes
 */
export function validateTypography(classString: string): ValidationResult {
  return validateAgainstRules(classString, typographyRules);
}

/**
 * Validate color classes
 */
export function validateColors(classString: string): ValidationResult {
  return validateAgainstRules(classString, colorRules);
}

/**
 * Validate border radius classes
 */
export function validateRadius(classString: string): ValidationResult {
  return validateAgainstRules(classString, radiusRules);
}

/**
 * Validate shadow classes
 */
export function validateShadows(classString: string): ValidationResult {
  return validateAgainstRules(classString, shadowRules);
}

/**
 * Run all validations on a class string
 */
export function validateAll(classString: string): {
  spacing: ValidationResult;
  typography: ValidationResult;
  colors: ValidationResult;
  radius: ValidationResult;
  shadows: ValidationResult;
  summary: {
    valid: boolean;
    totalViolations: number;
    errorCount: number;
    warningCount: number;
  };
} {
  const spacing = validateSpacing(classString);
  const typography = validateTypography(classString);
  const colors = validateColors(classString);
  const radius = validateRadius(classString);
  const shadows = validateShadows(classString);

  const allResults = [spacing, typography, colors, radius, shadows];
  const totalViolations = allResults.reduce((sum, r) => sum + r.violations.length, 0);
  const errorCount = allResults.filter((r) => r.severity === "error").length;
  const warningCount = allResults.filter((r) => r.severity === "warning").length;

  return {
    spacing,
    typography,
    colors,
    radius,
    shadows,
    summary: {
      valid: totalViolations === 0,
      totalViolations,
      errorCount,
      warningCount,
    },
  };
}

// ============================================================================
// FILE SCANNING (for CLI/build-time use)
// ============================================================================

/**
 * Extract class strings from a file content
 * Looks for className="..." and cn(...) patterns
 */
export function extractClassStrings(fileContent: string): string[] {
  const classStrings: string[] = [];

  // Match className="..."
  const classNamePattern = /className=["'`]([^"'`]+)["'`]/g;
  let classNameMatch;
  while ((classNameMatch = classNamePattern.exec(fileContent)) !== null) {
    classStrings.push(classNameMatch[1]);
  }

  // Match cn(...) calls (simplified - real implementation would need AST parsing)
  const cnPattern = /cn\s*\(\s*["'`]([^"'`]+)["'`]/g;
  let cnMatch;
  while ((cnMatch = cnPattern.exec(fileContent)) !== null) {
    classStrings.push(cnMatch[1]);
  }

  return classStrings;
}

/**
 * Validate all class strings in a file
 */
export function validateFile(fileContent: string): {
  classStrings: string[];
  results: Array<{
    classString: string;
    validation: ReturnType<typeof validateAll>;
  }>;
  summary: {
    totalClasses: number;
    validClasses: number;
    invalidClasses: number;
    totalViolations: number;
  };
} {
  const classStrings = extractClassStrings(fileContent);
  const results = classStrings.map((classString) => ({
    classString,
    validation: validateAll(classString),
  }));

  const validClasses = results.filter((r) => r.validation.summary.valid).length;
  const totalViolations = results.reduce((sum, r) => sum + r.validation.summary.totalViolations, 0);

  return {
    classStrings,
    results,
    summary: {
      totalClasses: classStrings.length,
      validClasses,
      invalidClasses: classStrings.length - validClasses,
      totalViolations,
    },
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export const validators = {
  validateSpacing,
  validateTypography,
  validateColors,
  validateRadius,
  validateShadows,
  validateAll,
  extractClassStrings,
  validateFile,
} as const;

export const rules = {
  spacing: spacingRules,
  typography: typographyRules,
  colors: colorRules,
  radius: radiusRules,
  shadows: shadowRules,
} as const;

export default validators;
