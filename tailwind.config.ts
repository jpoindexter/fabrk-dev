import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // UI Pub Design System - 4px base spacing
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "code-block": {
          DEFAULT: "hsl(var(--code-block))",
          foreground: "hsl(var(--code-block-foreground))",
        },
        // UI Pub surface scale
        "surface-1": "hsl(var(--surface-1))",
        "surface-2": "hsl(var(--surface-2))",
        "surface-3": "hsl(var(--surface-3))",
        "surface-4": "hsl(var(--surface-4))",
        "surface-5": "hsl(var(--surface-5))",
        "surface-6": "hsl(var(--surface-6))",
        "surface-7": "hsl(var(--surface-7))",
        "surface-8": "hsl(var(--surface-8))",
        "surface-9": "hsl(var(--surface-9))",
        "surface-10": "hsl(var(--surface-10))",
        "surface-11": "hsl(var(--surface-11))",
        "surface-12": "hsl(var(--surface-12))",
      },
      // UI Pub 7px border radius
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "calc(var(--radius) - 2px)",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      // Carbon Design System motion durations
      transitionDuration: {
        "70": "70ms",
        "110": "110ms",
        "240": "240ms",
        "400": "400ms",
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
        "accordion-blur-in": {
          from: { opacity: "0", filter: "blur(4px)" },
          to: { opacity: "1", filter: "blur(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "accordion-blur-in": "accordion-blur-in 0.3s ease-out",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
};

export default config;
