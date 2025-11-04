import type { Config } from "tailwindcss";import type { Config } from "tailwindcss";



const config = {const config: Config = {

  darkMode: ["class"],  darkMode: ["class"],

  content: [  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

    "./pages/**/*.{ts,tsx}",  theme: {

    "./components/**/*.{ts,tsx}",    container: {

    "./app/**/*.{ts,tsx}",      center: true,

    "./src/**/*.{ts,tsx}",      padding: "2rem",

  ],      screens: {

  prefix: "",        "2xl": "1400px",

  theme: {      },

    container: {    },

      center: true,    extend: {

      padding: "2rem",      // UI Pub Design System - 4px base spacing

      screens: {      colors: {

        "2xl": "1400px",        border: "hsl(var(--border))",

      },        input: "hsl(var(--input))",

    },        ring: "hsl(var(--ring))",

    extend: {        background: "hsl(var(--background))",

      colors: {        foreground: "hsl(var(--foreground))",

        border: "hsl(var(--border))",        primary: {

        input: "hsl(var(--input))",          DEFAULT: "hsl(var(--primary))",

        ring: "hsl(var(--ring))",          foreground: "hsl(var(--primary-foreground))",

        background: "hsl(var(--background))",        },

        foreground: "hsl(var(--foreground))",        secondary: {

        primary: {          DEFAULT: "hsl(var(--secondary))",

          DEFAULT: "hsl(var(--primary))",          foreground: "hsl(var(--secondary-foreground))",

          foreground: "hsl(var(--primary-foreground))",        },

        },        destructive: {

        secondary: {          DEFAULT: "hsl(var(--destructive))",

          DEFAULT: "hsl(var(--secondary))",          foreground: "hsl(var(--destructive-foreground))",

          foreground: "hsl(var(--secondary-foreground))",        },

        },        success: {

        destructive: {          DEFAULT: "hsl(var(--success))",

          DEFAULT: "hsl(var(--destructive))",          foreground: "hsl(var(--success-foreground))",

          foreground: "hsl(var(--destructive-foreground))",        },

        },        warning: {

        muted: {          DEFAULT: "hsl(var(--warning))",

          DEFAULT: "hsl(var(--muted))",          foreground: "hsl(var(--warning-foreground))",

          foreground: "hsl(var(--muted-foreground))",        },

        },        info: {

        accent: {          DEFAULT: "hsl(var(--info))",

          DEFAULT: "hsl(var(--accent))",          foreground: "hsl(var(--info-foreground))",

          foreground: "hsl(var(--accent-foreground))",        },

        },        muted: {

        popover: {          DEFAULT: "hsl(var(--muted))",

          DEFAULT: "hsl(var(--popover))",          foreground: "hsl(var(--muted-foreground))",

          foreground: "hsl(var(--popover-foreground))",        },

        },        accent: {

        card: {          DEFAULT: "hsl(var(--accent))",

          DEFAULT: "hsl(var(--card))",          foreground: "hsl(var(--accent-foreground))",

          foreground: "hsl(var(--card-foreground))",        },

        },        popover: {

      },          DEFAULT: "hsl(var(--popover))",

      borderRadius: {          foreground: "hsl(var(--popover-foreground))",

        lg: "var(--radius)",        },

        md: "calc(var(--radius) - 2px)",        card: {

        sm: "calc(var(--radius) - 4px)",          DEFAULT: "hsl(var(--card))",

      },          foreground: "hsl(var(--card-foreground))",

      animation: {        },

        marquee: "marquee var(--duration) linear infinite",        "code-block": {

        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",          DEFAULT: "hsl(var(--code-block))",

        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",          foreground: "hsl(var(--code-block-foreground))",

        "accordion-down": "accordion-down 0.2s ease-out",        },

        "accordion-up": "accordion-up 0.2s ease-out",        // UI Pub surface scale

        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",        "surface-1": "hsl(var(--surface-1))",

        shimmer: "shimmer 2s infinite",        "surface-2": "hsl(var(--surface-2))",

      },        "surface-3": "hsl(var(--surface-3))",

      keyframes: {        "surface-4": "hsl(var(--surface-4))",

        marquee: {        "surface-5": "hsl(var(--surface-5))",

          from: { transform: "translateX(0)" },        "surface-6": "hsl(var(--surface-6))",

          to: { transform: "translateX(calc(-100% - var(--gap)))" },        "surface-7": "hsl(var(--surface-7))",

        },        "surface-8": "hsl(var(--surface-8))",

        "marquee-vertical": {        "surface-9": "hsl(var(--surface-9))",

          from: { transform: "translateY(0)" },        "surface-10": "hsl(var(--surface-10))",

          to: { transform: "translateY(calc(-100% - var(--gap)))" },        "surface-11": "hsl(var(--surface-11))",

        },        "surface-12": "hsl(var(--surface-12))",

        "border-beam": {      },

          "100%": {      // UI Pub 7px border radius

            "offset-distance": "100%",      borderRadius: {

          },        lg: "var(--radius)",

        },        md: "var(--radius)",

        "accordion-down": {        sm: "calc(var(--radius) - 2px)",

          from: { height: "0" },      },

          to: { height: "var(--radix-accordion-content-height)" },      fontFamily: {

        },        sans: ["var(--font-dm-sans)", "sans-serif"],

        "accordion-up": {        mono: ["var(--font-dm-mono)", "monospace"],

          from: { height: "var(--radix-accordion-content-height)" },      },

          to: { height: "0" },      // Carbon Design System motion durations

        },      transitionDuration: {

        ripple: {        "70": "70ms",

          "0%, 100%": {        "110": "110ms",

            transform: "translate(-50%, -50%) scale(1)",        "240": "240ms",

          },        "400": "400ms",

          "50%": {      },

            transform: "translate(-50%, -50%) scale(0.9)",      keyframes: {

          },        "accordion-down": {

        },          from: { height: "0" },

        shimmer: {          to: { height: "var(--radix-accordion-content-height)" },

          "0%": { transform: "translateX(-100%)" },        },

          "100%": { transform: "translateX(100%)" },        "accordion-up": {

        },          from: { height: "var(--radix-accordion-content-height)" },

      },          to: { height: "0" },

    },        },

  },        "accordion-blur-in": {

  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],          from: { opacity: "0", filter: "blur(4px)" },

} satisfies Config;          to: { opacity: "1", filter: "blur(0)" },

        },

export default config;        shimmer: {

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
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
