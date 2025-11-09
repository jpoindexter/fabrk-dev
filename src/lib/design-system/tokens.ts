import { z } from "zod";

const palette = {
  base: {
    background: { light: "0 0% 100%", dark: "222 16% 6%" },
    foreground: { light: "222 47% 11%", dark: "210 40% 98%" },
    muted: { light: "215 20% 95%", dark: "217 15% 22%" },
    mutedForeground: { light: "215 16% 46%", dark: "217 15% 80%" },
  },
  surfaces: {
    card: { light: "0 0% 100%", dark: "222 16% 8%" },
    cardForeground: { light: "222 47% 11%", dark: "210 40% 98%" },
    popover: { light: "0 0% 100%", dark: "222 16% 8%" },
    popoverForeground: { light: "222 47% 11%", dark: "210 40% 98%" },
  },
  interactive: {
    border: { light: "214 32% 91%", dark: "217 27% 26%" },
    input: { light: "214 32% 91%", dark: "217 27% 26%" },
    ring: { light: "211 100% 50%", dark: "210 100% 60%" },
  },
  brand: {
    primary: { light: "211 100% 50%", dark: "210 100% 65%" },
    primaryForeground: { light: "210 40% 98%", dark: "222 47% 11%" },
    secondary: { light: "218 14% 93%", dark: "217 33% 18%" },
    secondaryForeground: { light: "222 47% 11%", dark: "210 40% 98%" },
    accent: { light: "15 86% 57%", dark: "15 80% 62%" },
    accentForeground: { light: "0 0% 100%", dark: "0 0% 12%" },
    destructive: { light: "0 72% 51%", dark: "0 82% 60%" },
    destructiveForeground: { light: "0 0% 100%", dark: "0 0% 100%" },
  },
  semantic: {
    success: { light: "142 70% 45%", dark: "142 70% 55%" },
    successForeground: { light: "142 85% 10%", dark: "142 20% 15%" },
    warning: { light: "38 92% 50%", dark: "38 92% 60%" },
    warningForeground: { light: "38 10% 10%", dark: "38 10% 10%" },
    info: { light: "207 90% 54%", dark: "207 90% 64%" },
    infoForeground: { light: "0 0% 100%", dark: "207 30% 10%" },
  },
} as const;

const spacing = {
  0: "0rem",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
} as const;

const radius = {
  none: "0",
  xs: "0.125rem",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
} as const;

const shadows = {
  xs: "0 1px 2px 0 rgba(15, 23, 42, 0.03)",
  sm: "0 1px 3px 0 rgba(15, 23, 42, 0.08)",
  md: "0 4px 6px -1px rgba(15, 23, 42, 0.12)",
  lg: "0 10px 15px -3px rgba(15, 23, 42, 0.15)",
  xl: "0 20px 25px -5px rgba(15, 23, 42, 0.2)",
} as const;

const typography = {
  fonts: {
    sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
    mono: ["var(--font-mono)", '"JetBrains Mono"', '"SFMono-Regular"', '"Fira Code"', "monospace"],
  },
  size: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },
  weight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
  lineHeight: {
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

const modeSchema = z.object({ light: z.string(), dark: z.string() });

const paletteSchema = z.object({
  base: z.object({
    background: modeSchema,
    foreground: modeSchema,
    muted: modeSchema,
    mutedForeground: modeSchema,
  }),
  surfaces: z.object({
    card: modeSchema,
    cardForeground: modeSchema,
    popover: modeSchema,
    popoverForeground: modeSchema,
  }),
  interactive: z.object({
    border: modeSchema,
    input: modeSchema,
    ring: modeSchema,
  }),
  brand: z.object({
    primary: modeSchema,
    primaryForeground: modeSchema,
    secondary: modeSchema,
    secondaryForeground: modeSchema,
    accent: modeSchema,
    accentForeground: modeSchema,
    destructive: modeSchema,
    destructiveForeground: modeSchema,
  }),
  semantic: z.object({
    success: modeSchema,
    successForeground: modeSchema,
    warning: modeSchema,
    warningForeground: modeSchema,
    info: modeSchema,
    infoForeground: modeSchema,
  }),
});

const spacingSchema = z.record(z.string());
const radiusSchema = z.record(z.string());
const shadowsSchema = z.record(z.string());
const typographySchema = z.object({
  fonts: z.object({
    sans: z.array(z.string()),
    mono: z.array(z.string()),
  }),
  size: z.record(z.string()),
  weight: z.record(z.string()),
  lineHeight: z.record(z.string()),
  letterSpacing: z.record(z.string()),
});

export const DesignTokensSchema = z.object({
  palette: paletteSchema,
  spacing: spacingSchema,
  radius: radiusSchema,
  shadows: shadowsSchema,
  typography: typographySchema,
});

export const tokens = DesignTokensSchema.parse({
  palette,
  spacing,
  radius,
  shadows,
  typography,
});

export type DesignTokens = z.infer<typeof DesignTokensSchema>;

export type SemanticColor = keyof typeof tokens.palette.semantic;
