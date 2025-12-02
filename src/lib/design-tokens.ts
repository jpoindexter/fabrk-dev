/**
 * CENTRAL DESIGN TOKENS (Source of Truth)
 * Mapped to Tailwind v4 CSS Variables in `src/app/globals.css`
 *
 * Usage:
 * import { tokens } from "@/lib/design-tokens";
 * <div className={tokens.colors.primary} />
 */

export const tokens = {
  colors: {
    // Semantic Colors (OKLCH Mapped)
    background: "bg-background",
    foreground: "text-foreground",
    card: "bg-card",
    cardForeground: "text-card-foreground",
    popover: "bg-popover",
    popoverForeground: "text-popover-foreground",
    primary: "bg-primary",
    primaryForeground: "text-primary-foreground",
    secondary: "bg-secondary",
    secondaryForeground: "text-secondary-foreground",
    muted: "bg-muted",
    mutedForeground: "text-muted-foreground",
    accent: "bg-accent",
    accentForeground: "text-accent-foreground",
    destructive: "bg-destructive",
    destructiveForeground: "text-destructive-foreground",
    success: "text-success",
    warning: "text-warning",
    info: "text-info",
    border: "border-border",
    input: "border-input",
    ring: "ring-ring",
    chart1: "oklch(var(--chart-1))",
    chart2: "oklch(var(--chart-2))",
    chart3: "oklch(var(--chart-3))",
    chart4: "oklch(var(--chart-4))",
    chart5: "oklch(var(--chart-5))",
  },
  typography: {
    fonts: {
      sans: "font-sans",
      mono: "font-mono",
    },
    sizes: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
  },
  spacing: {
    // 8-point grid system
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
  },
  borderRadius: {
    none: "rounded-none", // TERMINAL STYLE (Strict Enforcement)
    // All other radii are banned for Terminal Style, but listed for reference/legacy
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full", // DEPRECATED: Terminal style uses rounded-none everywhere
  },
  shadows: {
    none: "shadow-none",
    sm: "shadow-sm",
    default: "shadow",
    md: "shadow-md",
    lg: "shadow-lg",
  },
} as const;

// Helper to enforce design token usage in runtime (if needed)
export function validateToken(token: string) {
  // Logic to validate if a class string uses valid tokens
  return true;
}
