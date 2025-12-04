/**
 * Visual Mode System
 *
 * Switch the entire site aesthetic by changing ONE line: CURRENT_MODE
 *
 * This controls:
 * - Border radius (sharp vs rounded)
 * - Font family (mono vs sans)
 * - Shadows (none vs subtle)
 * - Button prefixes ("> " vs none)
 * - Label format (brackets vs plain)
 * - Card headers (terminal vs simple)
 * - Text transform (uppercase vs normal)
 *
 * @example
 * // In visual-mode.ts, change this line:
 * export const CURRENT_MODE: VisualMode = "terminal";
 * // to:
 * export const CURRENT_MODE: VisualMode = "standard";
 * // → Entire site switches to rounded ShadCN style
 */

export type VisualMode = "terminal" | "standard" | "minimal";

export interface VisualModeConfig {
  /** Border radius class - applied to cards, buttons, inputs, etc. */
  radius: string;
  /** Font family class - applied to UI text */
  font: string;
  /** Shadow class - applied to elevated elements */
  shadow: string;
  /** Button text prefix - prepended to button labels */
  buttonPrefix: string;
  /** Label format - "brackets" = [LABEL]: or "plain" = Label */
  labelFormat: "brackets" | "plain";
  /** Card header style - "terminal" = [ [0x00] TITLE ] or "simple" = Title */
  cardHeader: "terminal" | "simple" | "minimal";
  /** Text transform for labels/buttons */
  textTransform: "uppercase" | "normal";
  /** Input styling */
  inputStyle: string;
  /** Border width for cards/containers */
  borderWidth: string;
}

/**
 * Visual mode configurations
 *
 * terminal: Sharp corners, monospace font, command-line aesthetic
 * standard: Rounded corners, sans-serif, ShadCN/modern SaaS style
 * minimal: Subtle rounded corners, clean and minimal
 */
export const visualModes: Record<VisualMode, VisualModeConfig> = {
  terminal: {
    radius: "rounded-none",
    font: "font-mono",
    shadow: "",
    buttonPrefix: "> ",
    labelFormat: "brackets",
    cardHeader: "terminal",
    textTransform: "uppercase",
    inputStyle: "rounded-none border-border",
    borderWidth: "border",
  },
  standard: {
    radius: "rounded-lg",
    font: "font-sans",
    shadow: "shadow-sm",
    buttonPrefix: "",
    labelFormat: "plain",
    cardHeader: "simple",
    textTransform: "normal",
    inputStyle: "rounded-lg border-input",
    borderWidth: "border",
  },
  minimal: {
    radius: "rounded-md",
    font: "font-sans",
    shadow: "",
    buttonPrefix: "",
    labelFormat: "plain",
    cardHeader: "minimal",
    textTransform: "normal",
    inputStyle: "rounded-md border-input/50",
    borderWidth: "border-0",
  },
};

// ============================================================================
// THE ONE LINE TO CHANGE
// ============================================================================

/**
 * Current visual mode for the entire application.
 *
 * Change this value to switch the entire site's aesthetic:
 * - "terminal" → Sharp corners, monospace, command-line style
 * - "standard" → Rounded corners, sans-serif, modern SaaS style
 * - "minimal" → Subtle rounded corners, clean and minimal
 */
export const CURRENT_MODE: VisualMode = "terminal";

// ============================================================================
// EXPORTS
// ============================================================================

/** Current mode configuration - use this in components */
export const mode = visualModes[CURRENT_MODE];

/**
 * Format a label according to current mode
 * @example
 * formatLabel("Email") // terminal: "[EMAIL]:" | standard: "Email"
 */
export function formatLabel(label: string): string {
  if (mode.labelFormat === "brackets") {
    return `[${label.toUpperCase()}]:`;
  }
  return label;
}

/**
 * Format button text according to current mode
 * @example
 * formatButtonText("Submit") // terminal: "> SUBMIT" | standard: "Submit"
 */
export function formatButtonText(text: string): string {
  if (mode.textTransform === "uppercase") {
    return `${mode.buttonPrefix}${text.toUpperCase().replace(/ /g, "_")}`;
  }
  return `${mode.buttonPrefix}${text}`;
}

/**
 * Get card header classes for current mode
 */
export function getCardHeaderClasses(): string {
  if (mode.cardHeader === "terminal") {
    return "font-mono text-xs text-muted-foreground";
  }
  if (mode.cardHeader === "simple") {
    return "font-sans text-sm font-medium";
  }
  return "font-sans text-sm";
}

/**
 * Format card title according to current mode
 * @example
 * formatCardTitle("Settings", "00") // terminal: "[ [0x00] SETTINGS ]" | standard: "Settings"
 */
export function formatCardTitle(title: string, code?: string): string {
  if (mode.cardHeader === "terminal") {
    const hexCode = code ? `[0x${code}] ` : "";
    return `[ ${hexCode}${title.toUpperCase()} ]`;
  }
  return title;
}

/**
 * Check if current mode is terminal
 */
export function isTerminalMode(): boolean {
  return CURRENT_MODE === "terminal";
}

/**
 * Check if current mode uses rounded corners
 */
export function hasRoundedCorners(): boolean {
  return CURRENT_MODE !== "terminal";
}
