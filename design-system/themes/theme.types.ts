/**
 * Theme Type Definitions
 *
 * TypeScript interfaces for the theming system.
 * Supports both visual modes (terminal, modern) and color themes (light, dark, etc.)
 *
 * Architecture:
 * - VisualMode: Controls shape/typography (terminal=sharp, modern=rounded)
 * - ColorTheme: Controls color palette (20 DaisyUI-compatible themes)
 *
 * @see ./terminal.ts for terminal mode configuration
 * @see ./modern.ts for modern mode configuration
 */

// ============================================================================
// VISUAL MODE TYPES
// ============================================================================

/**
 * Available visual modes
 * - terminal: Sharp corners, monospace font, angular aesthetic
 * - modern: Rounded corners, sans-serif, contemporary SaaS style
 * - minimal: Subtle rounded corners, minimal ornamentation
 * - linear: Linear.app inspired, clean with subtle shadows
 */
export type VisualModeName = "terminal" | "modern" | "minimal" | "linear";

/**
 * Visual mode configuration
 * Controls the "shape" and "feel" of the UI, independent of colors
 */
export interface VisualModeConfig {
  /** Display name for UI */
  name: string;

  /** Description of this mode */
  description: string;

  // -------------------------------------------------------------------------
  // Shape Properties
  // -------------------------------------------------------------------------

  /** Border radius - applied to all components */
  radius: {
    none: string; // 0px
    sm: string; // Small elements (badges)
    md: string; // Medium elements (buttons, inputs)
    lg: string; // Large elements (cards, dialogs)
    full: string; // Circular (avatars)
  };

  /** Shadow intensity */
  shadow: {
    none: string;
    sm: string;
    md: string;
    lg: string;
  };

  /** Border width */
  border: {
    none: string;
    thin: string;
    default: string;
    thick: string;
  };

  // -------------------------------------------------------------------------
  // Typography Properties
  // -------------------------------------------------------------------------

  /** Primary font family */
  fontFamily: "mono" | "sans";

  /** Text transform for UI elements (buttons, labels) */
  textTransform: "uppercase" | "normal" | "capitalize";

  /** Letter spacing */
  letterSpacing: "normal" | "wide" | "wider";

  // -------------------------------------------------------------------------
  // Component-Specific Overrides
  // -------------------------------------------------------------------------

  /** Button styling */
  button: {
    /** Text prefix (e.g., "> " for terminal) */
    prefix: string;
    /** Text suffix */
    suffix: string;
    /** Font weight */
    weight: "normal" | "medium" | "semibold" | "bold";
  };

  /** Label styling */
  label: {
    /** Format: "brackets" = [LABEL]: or "plain" = Label */
    format: "brackets" | "plain" | "colon";
  };

  /** Card header styling */
  cardHeader: {
    /** Style: "terminal" = [ [0x00] TITLE ], "simple" = Title, "minimal" = title */
    style: "terminal" | "simple" | "minimal";
    /** Show hex code prefix */
    showCode: boolean;
  };

  /** Input styling */
  input: {
    /** Show prefix character */
    prefix: string;
    /** Placeholder style */
    placeholderStyle: "muted" | "italic";
  };
}

// ============================================================================
// COLOR THEME TYPES
// ============================================================================

/**
 * Available color themes
 * Compatible with DaisyUI theme system
 */
export type ColorThemeName =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "luxury"
  | "dracula"
  | "autumn"
  | "business";

/**
 * Color theme type (light or dark)
 */
export type ColorThemeType = "light" | "dark";

/**
 * Color theme metadata
 */
export interface ColorThemeMetadata {
  /** Theme display name */
  name: string;

  /** Theme type */
  type: ColorThemeType;

  /** Primary color (for preview) */
  primaryColor: string;

  /** Description */
  description: string;

  /** Recommended use cases */
  bestFor: string[];
}

/**
 * OKLCH color value (as used in CSS)
 * Format: "lightness% chroma hue"
 */
export type OklchValue = string;

/**
 * Color theme color tokens
 */
export interface ColorThemeColors {
  // -------------------------------------------------------------------------
  // Core Colors
  // -------------------------------------------------------------------------
  background: OklchValue;
  foreground: OklchValue;
  card: OklchValue;
  cardForeground: OklchValue;
  popover: OklchValue;
  popoverForeground: OklchValue;

  // -------------------------------------------------------------------------
  // Brand Colors
  // -------------------------------------------------------------------------
  primary: OklchValue;
  primaryForeground: OklchValue;
  secondary: OklchValue;
  secondaryForeground: OklchValue;
  accent: OklchValue;
  accentForeground: OklchValue;

  // -------------------------------------------------------------------------
  // Semantic Colors
  // -------------------------------------------------------------------------
  destructive: OklchValue;
  destructiveForeground: OklchValue;
  success: OklchValue;
  successForeground: OklchValue;
  warning: OklchValue;
  warningForeground: OklchValue;
  info: OklchValue;
  infoForeground: OklchValue;

  // -------------------------------------------------------------------------
  // Utility Colors
  // -------------------------------------------------------------------------
  muted: OklchValue;
  mutedForeground: OklchValue;
  border: OklchValue;
  input: OklchValue;
  ring: OklchValue;

  // -------------------------------------------------------------------------
  // Chart Colors
  // -------------------------------------------------------------------------
  chart1: OklchValue;
  chart2: OklchValue;
  chart3: OklchValue;
  chart4: OklchValue;
  chart5: OklchValue;
  chart6?: OklchValue;
  chart7?: OklchValue;
  chart8?: OklchValue;
  chart9?: OklchValue;
}

/**
 * Complete color theme definition
 */
export interface ColorTheme {
  metadata: ColorThemeMetadata;
  colors: ColorThemeColors;
}

// ============================================================================
// COMBINED THEME TYPE
// ============================================================================

/**
 * Complete theme state
 * Combines visual mode + color theme
 */
export interface ThemeState {
  /** Current visual mode */
  visualMode: VisualModeName;

  /** Current color theme */
  colorTheme: ColorThemeName;

  /** Computed values for easy access */
  computed: {
    isDark: boolean;
    fontFamily: "mono" | "sans";
    hasRoundedCorners: boolean;
    hasShadows: boolean;
  };
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Theme CSS variable map
 * Used to generate CSS custom properties
 */
export type ThemeCSSVariables = {
  [key: `--${string}`]: string;
};

/**
 * Theme class map
 * Used for Tailwind class generation
 */
export type ThemeClassMap = Record<string, string>;

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isVisualModeName(value: string): value is VisualModeName {
  return ["terminal", "modern", "minimal", "linear"].includes(value);
}

export function isColorThemeName(value: string): value is ColorThemeName {
  return [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "luxury",
    "dracula",
    "autumn",
    "business",
  ].includes(value);
}

export function isDarkTheme(theme: ColorThemeName): boolean {
  const darkThemes: ColorThemeName[] = [
    "dark",
    "synthwave",
    "halloween",
    "forest",
    "aqua",
    "luxury",
    "dracula",
    "business",
  ];
  return darkThemes.includes(theme);
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const DEFAULT_VISUAL_MODE: VisualModeName = "terminal";
export const DEFAULT_COLOR_THEME: ColorThemeName = "dark";

export const VISUAL_MODE_NAMES: VisualModeName[] = [
  "terminal",
  "modern",
  "minimal",
  "linear",
];

export const COLOR_THEME_NAMES: ColorThemeName[] = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "luxury",
  "dracula",
  "autumn",
  "business",
];
