import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import tailwindAnimate from "tailwindcss-animate";
import { tokens } from "./src/lib/design-system/tokens";

const semanticColor = (name: string) => `hsl(var(--${name}))`;

const colorConfig = {
  background: semanticColor("background"),
  foreground: semanticColor("foreground"),
  card: {
    DEFAULT: semanticColor("card"),
    foreground: semanticColor("card-foreground"),
  },
  popover: {
    DEFAULT: semanticColor("popover"),
    foreground: semanticColor("popover-foreground"),
  },
  primary: {
    DEFAULT: semanticColor("primary"),
    foreground: semanticColor("primary-foreground"),
  },
  secondary: {
    DEFAULT: semanticColor("secondary"),
    foreground: semanticColor("secondary-foreground"),
  },
  accent: {
    DEFAULT: semanticColor("accent"),
    foreground: semanticColor("accent-foreground"),
  },
  muted: {
    DEFAULT: semanticColor("muted"),
    foreground: semanticColor("muted-foreground"),
  },
  destructive: {
    DEFAULT: semanticColor("destructive"),
    foreground: semanticColor("destructive-foreground"),
  },
  border: semanticColor("border"),
  input: semanticColor("input"),
  ring: semanticColor("ring"),
  success: {
    DEFAULT: semanticColor("success"),
    foreground: semanticColor("success-foreground"),
  },
  warning: {
    DEFAULT: semanticColor("warning"),
    foreground: semanticColor("warning-foreground"),
  },
  info: {
    DEFAULT: semanticColor("info"),
    foreground: semanticColor("info-foreground"),
  },
};

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: colorConfig,
      borderRadius: {
        none: tokens.radius.none,
        xs: tokens.radius.xs,
        sm: tokens.radius.sm,
        md: tokens.radius.md,
        lg: tokens.radius.lg,
        xl: tokens.radius.xl,
        "2xl": tokens.radius["2xl"],
        full: tokens.radius.full,
      },
      boxShadow: tokens.shadows,
      spacing: tokens.spacing,
      fontFamily: {
        sans: tokens.typography.fonts.sans,
        mono: tokens.typography.fonts.mono,
      },
      fontSize: tokens.typography.size,
      fontWeight: tokens.typography.weight,
      letterSpacing: tokens.typography.letterSpacing,
      lineHeight: tokens.typography.lineHeight,
      transitionDuration: {
        70: "70ms",
        110: "110ms",
        240: "240ms",
        400: "400ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [tailwindAnimate, typography],
};

export default config;
