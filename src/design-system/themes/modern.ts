/**
 * Modern (Vercel Geist-Inspired) Theme
 *
 * Exact replica of Vercel's Geist UI design tokens.
 * Source: https://geist-ui.dev/en-us/guide/colors
 */

import { primitives } from '../tokens/primitives';
import type { SemanticTokens } from '../tokens/semantic';

export const modernTheme: SemanticTokens = {
  color: {
    bg: {
      // Geist: "Background" (#fff)
      base: '#ffffff',
      // Geist: "Accents 1" (#fafafa) - commonly used for hover/subtle backgrounds
      surface: '#ffffff',
      surfaceRaised: '#fafafa',
      surfaceSunken: '#eaeaea', // Accents 2
      muted: '#eaeaea', // Accents 2

      // Geist: "Success" (#0070f3) is often used as the primary brand color in Vercel apps
      accent: '#0070f3',
      accentMuted: '#d3e5ff', // Success Lighter
      accentHover: '#0761d1', // Success Dark

      // Geist: "Error" (#e00)
      danger: '#ee0000',
      dangerMuted: '#f7d4d6', // Error Lighter

      // Geist: "Success" (#0070f3)
      success: '#0070f3',
      successMuted: '#d3e5ff', // Success Lighter

      // Geist: "Warning" (#f5a623)
      warning: '#f5a623',
      warningMuted: '#ffefcf', // Warning Lighter

      // Geist: "Violet" (#7928ca) or Cyan (#50e3c2) often used for info/special
      info: '#7928ca',
      infoMuted: '#e3d7fc', // Violet Lighter
    },
    text: {
      // Geist: Foreground (#000)
      primary: '#000000',
      // Geist: Accents 5 (#666) or Accents 6 (#444)
      secondary: '#666666',
      // Geist: Accents 3 (#999) or Accents 4 (#888)
      muted: '#888888',
      // Geist: Accents 2 (#eaeaea) or 3 (#999)
      disabled: '#eaeaea',
      // Inverse for dark buttons
      inverse: '#ffffff',

      accent: '#0070f3',
      accentHover: '#0761d1',
      danger: '#ee0000',
      success: '#0070f3',
      warning: '#f5a623',
      info: '#7928ca',
    },
    border: {
      // Geist: Accents 2 (#eaeaea) is the standard border color
      default: '#eaeaea',
      muted: '#fafafa', // Accents 1
      strong: '#999999', // Accents 3
      accent: '#0070f3',
      danger: '#ee0000',
      success: '#0070f3',
      focus: '#0070f3',
    },
  },
  radius: {
    // Geist uses 6px (0.375rem) for standard radii
    button: '0.375rem', // 6px
    input: '0.375rem', // 6px
    card: '0.5rem', // 8px
    modal: '0.75rem', // 12px
    badge: '9999px', // Full
    avatar: '9999px', // Full
  },
  shadow: {
    // Geist shadows are very subtle
    card: '0 0 0 1px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)',
    dropdown: '0 4px 12px rgba(0,0,0,0.1)',
    modal: '0 12px 24px rgba(0,0,0,0.1)',
    button: '0 2px 4px rgba(0,0,0,0.05)',
  },
  font: {
    body: '"Geist Sans", "Inter", sans-serif',
    heading: '"Geist Sans", "Inter", sans-serif',
    code: '"Geist Mono", monospace',
    ui: '"Geist Sans", "Inter", sans-serif',
  },
  textTransform: {
    button: 'none',
    label: 'none',
    heading: 'none',
  },
  spacing: {
    component: {
      paddingXs: '0.25rem',
      paddingSm: '0.5rem',
      paddingMd: '1rem',
      paddingLg: '1.5rem',
      paddingXl: '2rem',
      gapXs: '0.25rem',
      gapSm: '0.5rem',
      gapMd: '1rem',
      gapLg: '1.5rem',
    },
    section: {
      sm: '2rem',
      md: '3rem',
      lg: '4rem',
      xl: '6rem',
    },
    page: {
      padding: '1.5rem',
    },
  },
};

// =============================================================================
// MODERN THEME UTILITIES
// =============================================================================

/**
 * Format text for modern style buttons
 * Example: "Save Changes" → "Save Changes"
 * Geist style typically uses sentence case for UI elements.
 */
export function formatButtonText(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Format text for modern style labels
 * Example: "Email" → "Email"
 * Geist style labels are typically sentence case.
 */
export function formatLabelText(label: string): string {
  if (!label) return '';
  return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
}

/**
 * Format card header for modern style
 * Example: ("Settings", "00") → "Settings"
 * Geist card headers are usually simple, title case or sentence case.
 */
export function formatCardHeader(title: string): string {
  if (!title) return '';
  return title.charAt(0).toUpperCase() + title.slice(1);
}

// =============================================================================
// MODERN TAILWIND CLASSES
// =============================================================================

export const modernClasses = {
  radius: 'rounded-md',
  font: 'font-sans',
  text: '',
  cardHeader: 'font-sans text-sm font-medium',
  label: 'font-sans text-sm text-muted-foreground',
  button: 'rounded-md font-sans shadow-sm',
  input: 'rounded-md font-sans border-border',
  card: 'rounded-lg border border-border shadow-sm',
  badge: 'rounded-full font-sans text-xs',
} as const;

export default modernTheme;
