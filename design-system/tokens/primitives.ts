/**
 * Design Token Primitives
 *
 * Raw, context-free design values. These are the building blocks
 * that semantic tokens reference. Never use primitives directly in components.
 *
 * Naming Convention: category-scale (e.g., space-4, color-gray-500)
 *
 * @see https://www.designtokens.org/glossary/
 */

// ============================================================================
// SPACING SCALE (8-point grid)
// ============================================================================

/**
 * Spacing scale based on 8-point grid system
 * Used by: padding, margin, gap, positioning
 *
 * Scale: 0, 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
 * Base unit: 4px (Tailwind default)
 */
export const spacing = {
  0: "0px",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  4: "1rem", // 16px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  32: "8rem", // 128px
  40: "10rem", // 160px
  48: "12rem", // 192px
  64: "16rem", // 256px
  80: "20rem", // 320px
  96: "24rem", // 384px
} as const;

/**
 * Tailwind spacing class mapping
 * These are the ONLY spacing values allowed in the design system
 */
export const spacingClasses = {
  0: "0",
  1: "1", // 4px - micro spacing only
  2: "2", // 8px
  4: "4", // 16px
  6: "6", // 24px
  8: "8", // 32px
  10: "10", // 40px
  12: "12", // 48px
  16: "16", // 64px
  20: "20", // 80px
  24: "24", // 96px
  32: "32", // 128px
  40: "40", // 160px
  48: "48", // 192px
  64: "64", // 256px
  80: "80", // 320px
  96: "96", // 384px
} as const;

// ============================================================================
// TYPOGRAPHY SCALE
// ============================================================================

/**
 * Font size scale (Major Third - 1.25 ratio)
 * Matches Tailwind's default scale
 */
export const fontSize = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  base: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
  "6xl": "3.75rem", // 60px
  "7xl": "4.5rem", // 72px
  "8xl": "6rem", // 96px
  "9xl": "8rem", // 128px
} as const;

/**
 * Line height scale
 */
export const lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

/**
 * Font weight scale
 */
export const fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as const;

/**
 * Letter spacing scale
 */
export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

/**
 * Font family primitives
 */
export const fontFamily = {
  sans: 'var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
} as const;

// ============================================================================
// BORDER RADIUS SCALE
// ============================================================================

/**
 * Border radius scale
 * Terminal mode uses "none", modern modes use sm/md/lg
 */
export const borderRadius = {
  none: "0px",
  sm: "0.125rem", // 2px
  base: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// ============================================================================
// SHADOW SCALE
// ============================================================================

/**
 * Shadow scale
 * Terminal mode uses "none", modern modes use subtle shadows
 */
export const shadow = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

// ============================================================================
// BORDER WIDTH SCALE
// ============================================================================

export const borderWidth = {
  0: "0px",
  1: "1px",
  2: "2px",
  4: "4px",
  8: "8px",
} as const;

// ============================================================================
// OPACITY SCALE
// ============================================================================

export const opacity = {
  0: "0",
  5: "0.05",
  10: "0.1",
  20: "0.2",
  25: "0.25",
  30: "0.3",
  40: "0.4",
  50: "0.5",
  60: "0.6",
  70: "0.7",
  75: "0.75",
  80: "0.8",
  90: "0.9",
  95: "0.95",
  100: "1",
} as const;

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  auto: "auto",
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50", // Dropdowns, tooltips
  60: "60", // Fixed headers
  70: "70", // Modals backdrop
  80: "80", // Modals
  90: "90", // Toasts
  100: "100", // Maximum
} as const;

// ============================================================================
// ANIMATION DURATION
// ============================================================================

export const duration = {
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  300: "300ms",
  500: "500ms",
  700: "700ms",
  1000: "1000ms",
} as const;

// ============================================================================
// ANIMATION EASING
// ============================================================================

export const easing = {
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ============================================================================
// CONTAINER WIDTHS
// ============================================================================

export const containerWidth = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  "3xl": "1920px",
  full: "100%",
  prose: "65ch",
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export const primitives = {
  spacing,
  spacingClasses,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  fontFamily,
  borderRadius,
  shadow,
  borderWidth,
  opacity,
  zIndex,
  duration,
  easing,
  breakpoints,
  containerWidth,
} as const;

export type Spacing = keyof typeof spacing;
export type FontSize = keyof typeof fontSize;
export type LineHeight = keyof typeof lineHeight;
export type FontWeight = keyof typeof fontWeight;
export type LetterSpacing = keyof typeof letterSpacing;
export type FontFamily = keyof typeof fontFamily;
export type BorderRadius = keyof typeof borderRadius;
export type Shadow = keyof typeof shadow;
export type BorderWidth = keyof typeof borderWidth;
export type Opacity = keyof typeof opacity;
export type ZIndex = keyof typeof zIndex;
export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
export type Breakpoint = keyof typeof breakpoints;
export type ContainerWidth = keyof typeof containerWidth;

export default primitives;
