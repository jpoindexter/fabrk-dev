/**
 * Design System
 *
 * Token-driven, themeable design system for modern SaaS applications.
 *
 * Architecture:
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  COMPONENTS                                                     │
 * │  Reference semantic tokens only                                 │
 * │  Never reference raw values or theme-specific tokens            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  SEMANTIC TOKENS                                                │
 * │  Role-based naming (bg-surface, text-primary)                   │
 * │  Resolved by active theme                                       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  THEMES                                                         │
 * │  Map semantic tokens to primitive values                        │
 * │  Terminal, Modern, Soft                                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  PRIMITIVES                                                     │
 * │  Raw values (colors, sizes)                                     │
 * │  Shared across all themes                                       │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * @see ./spec/overview.md for philosophy
 * @see ./spec/foundations.md for token definitions
 * @see ./spec/themes.md for theme system
 */

// =============================================================================
// TOKEN EXPORTS
// =============================================================================

export {
  primitives,
  colors,
  space,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  radius,
  shadow,
  duration,
  easing,
  breakpoint,
  container,
  zIndex,
  borderWidth,
  accessibility,
} from './tokens/primitives';

export type {
  SemanticTokens,
  ColorTokens,
  RadiusTokens,
  ShadowTokens,
  FontTokens,
  TextTransformTokens,
  SpacingTokens,
} from './tokens/semantic';

export { cssVariableNames } from './tokens/semantic';

// =============================================================================
// THEME EXPORTS
// =============================================================================

export {
  themes,
  themeClasses,
  themeUtils,
  THEME_NAMES,
  DEFAULT_THEME,
  CURRENT_THEME,
  getActiveTheme,
  getActiveThemeClasses,
  getActiveThemeUtils,
  terminalTheme,
  terminalClasses,
  modernTheme,
  modernClasses,
  softTheme,
  softClasses,
  formatTerminalButtonText,
  formatTerminalLabelText,
  formatTerminalCardHeader,
  formatTerminalStatusText,
  formatModernButtonText,
  formatModernLabelText,
  formatModernCardHeader,
  formatSoftButtonText,
  formatSoftLabelText,
  formatSoftCardHeader,
} from './themes';

export type { ThemeName, ThemeUtils } from './themes';

// =============================================================================
// BACKWARDS COMPATIBILITY LAYER
// =============================================================================
// The following exports maintain compatibility with the 100+ components
// that import from @/design-system using the old API.

import { CURRENT_THEME, terminalClasses } from './themes';

/**
 * Visual mode configuration interface (for backwards compatibility)
 */
export interface ModeConfig {
  radius: string;
  font: string;
  shadow: string;
  buttonPrefix: string;
  labelFormat: 'brackets' | 'plain';
  cardHeader: 'bracketed' | 'simple' | 'minimal';
  textTransform: 'uppercase' | 'normal';
  inputStyle: string;
  borderWidth: string;

  // NEW - Extended token system
  color: {
    bg: {
      base: string;
      surface: string;
      elevated: string;
      accent: string;
      danger: string;
      success: string;
      warning: string;
      info: string;
      muted: string;
      secondary: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
      inverse: string;
      accent: string;
      danger: string;
      success: string;
      warning: string;
      info: string;
    };
    border: {
      default: string;
      focus: string;
      accent: string;
      danger: string;
      success: string;
      warning: string;
    };
  };

  spacing: {
    button: {
      sm: string;
      md: string;
      lg: string;
    };
    input: string;
    card: string;
    badge: {
      sm: string;
      md: string;
    };
  };

  typography: {
    button: string;
    body: {
      xs: string;
      sm: string;
      md: string;
    };
    heading: {
      h1: string;
      h2: string;
      h3: string;
    };
    caption: string;
    input: string;
    label: string;
  };

  state: {
    hover: {
      bg: string;
      text: string;
    };
    focus: {
      ring: string;
    };
    disabled: {
      opacity: string;
      cursor: string;
    };
  };
}

/**
 * Current mode configuration - used by 100+ components
 * This maps the new theme system to the old `mode` API
 */
export const mode: ModeConfig = {
  radius: terminalClasses.radius,
  font: terminalClasses.font,
  shadow: 'shadow-sm',
  buttonPrefix: '> ',
  labelFormat: 'brackets',
  cardHeader: 'bracketed',
  textTransform: 'uppercase',
  inputStyle: terminalClasses.input,
  borderWidth: 'border',

  // Color tokens - map to Tailwind classes
  color: {
    bg: {
      base: 'bg-background',
      surface: 'bg-card',
      elevated: 'bg-popover',
      accent: 'bg-accent', // Purple accent for CTAs
      danger: 'bg-destructive',
      success: 'bg-success',
      warning: 'bg-warning',
      info: 'bg-info',
      muted: 'bg-muted',
      secondary: 'bg-secondary',
    },
    text: {
      primary: 'text-foreground',
      secondary: 'text-card-foreground',
      muted: 'text-muted-foreground',
      inverse: 'text-accent-foreground', // White text for purple buttons
      accent: 'text-accent', // Purple text for links/emphasis
      danger: 'text-destructive',
      success: 'text-success',
      warning: 'text-warning',
      info: 'text-info',
    },
    border: {
      default: 'border-border',
      focus: 'border-ring',
      accent: 'border-primary',
      danger: 'border-destructive',
      success: 'border-success',
      warning: 'border-warning',
    },
  },

  // Spacing tokens - 8-point grid
  spacing: {
    button: {
      sm: 'px-2 py-1',
      md: 'px-4 py-2',
      lg: 'px-6 py-3',
    },
    input: 'px-4 py-2',
    card: 'p-4',
    badge: {
      sm: 'px-2 py-0.5',
      md: 'px-2 py-1',
    },
  },

  // Typography tokens
  typography: {
    button: 'text-xs font-medium',
    body: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
    },
    heading: {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-semibold',
    },
    caption: 'text-xs text-muted-foreground',
    input: 'text-sm',
    label: 'text-sm font-medium',
  },

  // State tokens
  state: {
    hover: {
      bg: 'hover:bg-primary/90',
      text: 'hover:text-foreground',
    },
    focus: {
      ring: 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    },
    disabled: {
      opacity: 'disabled:opacity-[var(--state-disabled-opacity)]',
      cursor: 'disabled:cursor-not-allowed',
    },
  },
};

/**
 * Format a label according to current mode
 */
export function formatLabel(label: string): string {
  if (mode.labelFormat === 'brackets') {
    return `[${label.toUpperCase()}]:`;
  }
  return label;
}

/**
 * Format button text according to current mode
 */
export function formatButtonText(text: string): string {
  if (mode.textTransform === 'uppercase') {
    return `${mode.buttonPrefix}${text.toUpperCase()}`;
  }
  return `${mode.buttonPrefix}${text}`;
}

/**
 * Format card title according to current mode
 */
export function formatCardTitle(title: string, code?: string): string {
  if (mode.cardHeader === 'bracketed') {
    const hexCode = code ? `[0x${code}] ` : '';
    return `[ ${hexCode}${title.toUpperCase()} ]`;
  }
  return title;
}

/**
 * Check if current mode is sharp (terminal)
 */
export function isSharpMode(): boolean {
  return CURRENT_THEME === 'terminal';
}

/**
 * Check if current mode uses rounded corners
 */
export function hasRoundedCorners(): boolean {
  return CURRENT_THEME !== 'terminal';
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

const designSystem = {
  mode,
  formatLabel,
  formatButtonText,
  formatCardTitle,
  isSharpMode,
  hasRoundedCorners,
} as const;

export default designSystem;
