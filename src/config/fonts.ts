/**
 * FONT CONFIGURATION
 *
 * Edit this file to customize the fonts available in the theme customizer.
 * All fonts are loaded from Google Fonts - no downloads required.
 *
 * To add a font:
 * 1. Find it on https://fonts.google.com
 * 2. Add it to FONT_OPTIONS below with the correct category
 * 3. That's it! The Google Fonts URL is auto-generated.
 *
 * Categories: 'display' | 'mono' | 'sans' | 'serif'
 */

export type FontCategory = 'display' | 'mono' | 'sans' | 'serif';

export interface FontOption {
  /** Unique identifier */
  value: string;
  /** Display name in dropdown */
  label: string;
  /** Google Fonts family name (must match exactly) */
  googleFamily: string;
  /** CSS font-family value */
  cssValue: string;
  /** Font category for grouping */
  category: FontCategory;
  /** Font weights to load (default: [400, 500, 700]) */
  weights?: number[];
}

/**
 * Available fonts in the theme customizer.
 * Add, remove, or reorder fonts here.
 */
export const FONT_OPTIONS: FontOption[] = [
  // ═══════════════════════════════════════════════════════════════
  // DISPLAY FONTS - Bold, condensed fonts for headlines
  // ═══════════════════════════════════════════════════════════════
  {
    value: 'bebas-neue',
    label: 'Bebas Neue',
    googleFamily: 'Bebas Neue',
    cssValue: "'Bebas Neue', Impact, sans-serif",
    category: 'display',
    weights: [400],
  },
  {
    value: 'oswald',
    label: 'Oswald',
    googleFamily: 'Oswald',
    cssValue: "'Oswald', Impact, sans-serif",
    category: 'display',
  },
  {
    value: 'anton',
    label: 'Anton',
    googleFamily: 'Anton',
    cssValue: "'Anton', Impact, sans-serif",
    category: 'display',
    weights: [400],
  },
  {
    value: 'archivo-black',
    label: 'Archivo Black',
    googleFamily: 'Archivo Black',
    cssValue: "'Archivo Black', Impact, sans-serif",
    category: 'display',
    weights: [400],
  },
  {
    value: 'russo-one',
    label: 'Russo One',
    googleFamily: 'Russo One',
    cssValue: "'Russo One', Impact, sans-serif",
    category: 'display',
    weights: [400],
  },

  // ═══════════════════════════════════════════════════════════════
  // MONOSPACE FONTS - For code and terminal aesthetic
  // ═══════════════════════════════════════════════════════════════
  {
    value: 'jetbrains',
    label: 'JetBrains Mono',
    googleFamily: 'JetBrains Mono',
    cssValue: "'JetBrains Mono', ui-monospace, monospace",
    category: 'mono',
  },
  {
    value: 'fira-code',
    label: 'Fira Code',
    googleFamily: 'Fira Code',
    cssValue: "'Fira Code', ui-monospace, monospace",
    category: 'mono',
  },
  {
    value: 'source-code',
    label: 'Source Code Pro',
    googleFamily: 'Source Code Pro',
    cssValue: "'Source Code Pro', ui-monospace, monospace",
    category: 'mono',
  },
  {
    value: 'ibm-plex',
    label: 'IBM Plex Mono',
    googleFamily: 'IBM Plex Mono',
    cssValue: "'IBM Plex Mono', ui-monospace, monospace",
    category: 'mono',
  },
  {
    value: 'roboto-mono',
    label: 'Roboto Mono',
    googleFamily: 'Roboto Mono',
    cssValue: "'Roboto Mono', ui-monospace, monospace",
    category: 'mono',
  },
  {
    value: 'space-mono',
    label: 'Space Mono',
    googleFamily: 'Space Mono',
    cssValue: "'Space Mono', ui-monospace, monospace",
    category: 'mono',
    weights: [400, 700],
  },

  // ═══════════════════════════════════════════════════════════════
  // SANS-SERIF FONTS - Clean, modern fonts for body text
  // ═══════════════════════════════════════════════════════════════
  {
    value: 'inter',
    label: 'Inter',
    googleFamily: 'Inter',
    cssValue: "'Inter', system-ui, sans-serif",
    category: 'sans',
  },
  {
    value: 'roboto',
    label: 'Roboto',
    googleFamily: 'Roboto',
    cssValue: "'Roboto', system-ui, sans-serif",
    category: 'sans',
  },
  {
    value: 'open-sans',
    label: 'Open Sans',
    googleFamily: 'Open Sans',
    cssValue: "'Open Sans', system-ui, sans-serif",
    category: 'sans',
  },
  {
    value: 'lato',
    label: 'Lato',
    googleFamily: 'Lato',
    cssValue: "'Lato', system-ui, sans-serif",
    category: 'sans',
    weights: [400, 700],
  },
  {
    value: 'poppins',
    label: 'Poppins',
    googleFamily: 'Poppins',
    cssValue: "'Poppins', system-ui, sans-serif",
    category: 'sans',
  },
  {
    value: 'montserrat',
    label: 'Montserrat',
    googleFamily: 'Montserrat',
    cssValue: "'Montserrat', system-ui, sans-serif",
    category: 'sans',
  },

  // ═══════════════════════════════════════════════════════════════
  // SERIF FONTS - Classic, elegant fonts
  // ═══════════════════════════════════════════════════════════════
  {
    value: 'playfair',
    label: 'Playfair Display',
    googleFamily: 'Playfair Display',
    cssValue: "'Playfair Display', serif",
    category: 'serif',
    weights: [400, 700],
  },
  {
    value: 'merriweather',
    label: 'Merriweather',
    googleFamily: 'Merriweather',
    cssValue: "'Merriweather', serif",
    category: 'serif',
    weights: [400, 700],
  },
  {
    value: 'lora',
    label: 'Lora',
    googleFamily: 'Lora',
    cssValue: "'Lora', serif",
    category: 'serif',
    weights: [400, 700],
  },
  {
    value: 'crimson',
    label: 'Crimson Text',
    googleFamily: 'Crimson Text',
    cssValue: "'Crimson Text', serif",
    category: 'serif',
    weights: [400, 700],
  },
];

/**
 * Default fonts (used when no saved config exists)
 */
export const DEFAULT_BODY_FONT = 'jetbrains';
export const DEFAULT_HEADLINE_FONT = 'jetbrains';

/**
 * Generates the Google Fonts URL from FONT_OPTIONS.
 * This is called at build time, so adding fonts above automatically updates the URL.
 */
export function generateGoogleFontsUrl(): string {
  const families = FONT_OPTIONS.map((font) => {
    const weights = font.weights || [400, 500, 700];
    const weightStr = weights.join(';');
    // Google Fonts URL format: family=Font+Name:wght@400;500;700
    const familyName = font.googleFamily.replace(/ /g, '+');
    return `family=${familyName}:wght@${weightStr}`;
  }).join('&');

  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

/**
 * Pre-generated URL for use in layout.tsx
 * This avoids calling generateGoogleFontsUrl() at runtime
 */
export const GOOGLE_FONTS_URL = generateGoogleFontsUrl();
