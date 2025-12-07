/**
 * Semantic Design Tokens
 *
 * Role-based tokens that components reference.
 * These are resolved by the active theme.
 */

// =============================================================================
// SEMANTIC TOKEN TYPES
// =============================================================================

export interface ColorTokens {
  bg: {
    base: string;
    surface: string;
    surfaceRaised: string;
    surfaceSunken: string;
    muted: string;
    accent: string;
    accentMuted: string;
    accentHover: string;
    danger: string;
    dangerMuted: string;
    success: string;
    successMuted: string;
    warning: string;
    warningMuted: string;
    info: string;
    infoMuted: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    disabled: string;
    inverse: string;
    accent: string;
    accentHover: string;
    danger: string;
    success: string;
    warning: string;
    info: string;
  };
  border: {
    default: string;
    muted: string;
    strong: string;
    accent: string;
    danger: string;
    success: string;
    focus: string;
  };
}

export interface RadiusTokens {
  button: string;
  input: string;
  card: string;
  modal: string;
  badge: string;
  avatar: string;
}

export interface ShadowTokens {
  card: string;
  dropdown: string;
  modal: string;
  button: string;
}

export interface FontTokens {
  body: string;
  heading: string;
  code: string;
  ui: string;
}

export interface TextTransformTokens {
  button: "uppercase" | "capitalize" | "none";
  label: "uppercase" | "capitalize" | "none";
  heading: "uppercase" | "capitalize" | "none";
}

export interface SpacingTokens {
  component: {
    paddingXs: string;
    paddingSm: string;
    paddingMd: string;
    paddingLg: string;
    paddingXl: string;
    gapXs: string;
    gapSm: string;
    gapMd: string;
    gapLg: string;
  };
  section: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  page: {
    padding: string;
  };
}

// =============================================================================
// SEMANTIC TOKEN INTERFACE
// =============================================================================

export interface SemanticTokens {
  color: ColorTokens;
  radius: RadiusTokens;
  shadow: ShadowTokens;
  font: FontTokens;
  textTransform: TextTransformTokens;
  spacing: SpacingTokens;
}

// =============================================================================
// CSS VARIABLE NAMES (for mapping)
// =============================================================================

export const cssVariableNames = {
  color: {
    bg: {
      base: "--color-bg-base",
      surface: "--color-bg-surface",
      surfaceRaised: "--color-bg-surface-raised",
      surfaceSunken: "--color-bg-surface-sunken",
      muted: "--color-bg-muted",
      accent: "--color-bg-accent",
      accentMuted: "--color-bg-accent-muted",
      accentHover: "--color-bg-accent-hover",
      danger: "--color-bg-danger",
      dangerMuted: "--color-bg-danger-muted",
      success: "--color-bg-success",
      successMuted: "--color-bg-success-muted",
      warning: "--color-bg-warning",
      warningMuted: "--color-bg-warning-muted",
      info: "--color-bg-info",
      infoMuted: "--color-bg-info-muted",
    },
    text: {
      primary: "--color-text-primary",
      secondary: "--color-text-secondary",
      muted: "--color-text-muted",
      disabled: "--color-text-disabled",
      inverse: "--color-text-inverse",
      accent: "--color-text-accent",
      accentHover: "--color-text-accent-hover",
      danger: "--color-text-danger",
      success: "--color-text-success",
      warning: "--color-text-warning",
      info: "--color-text-info",
    },
    border: {
      default: "--color-border-default",
      muted: "--color-border-muted",
      strong: "--color-border-strong",
      accent: "--color-border-accent",
      danger: "--color-border-danger",
      success: "--color-border-success",
      focus: "--color-border-focus",
    },
  },
  radius: {
    button: "--radius-button",
    input: "--radius-input",
    card: "--radius-card",
    modal: "--radius-modal",
    badge: "--radius-badge",
    avatar: "--radius-avatar",
  },
  shadow: {
    card: "--shadow-card",
    dropdown: "--shadow-dropdown",
    modal: "--shadow-modal",
    button: "--shadow-button",
  },
  font: {
    body: "--font-body",
    heading: "--font-heading",
    code: "--font-code",
    ui: "--font-ui",
  },
} as const;

export default cssVariableNames;
