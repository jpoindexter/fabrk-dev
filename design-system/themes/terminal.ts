/**
 * Terminal Visual Mode
 *
 * Sharp, angular, monospace aesthetic inspired by terminal/console interfaces.
 * This is the default visual mode for Fabrk.
 *
 * Characteristics:
 * - Sharp corners (rounded-none)
 * - Monospace font (JetBrains Mono)
 * - Minimal shadows
 * - Uppercase text with underscores
 * - Bracketed labels and headers
 * - Command-line prefixes (">")
 *
 * @see ./theme.types.ts for type definitions
 */

import type { VisualModeConfig } from "./theme.types";

// ============================================================================
// TERMINAL MODE CONFIGURATION
// ============================================================================

export const terminalMode: VisualModeConfig = {
  name: "Terminal",
  description: "Sharp, angular aesthetic with monospace typography",

  // -------------------------------------------------------------------------
  // Shape Properties
  // -------------------------------------------------------------------------

  radius: {
    none: "rounded-none",
    sm: "rounded-none",
    md: "rounded-none",
    lg: "rounded-none",
    full: "rounded-full", // Exception for avatars
  },

  shadow: {
    none: "",
    sm: "",
    md: "",
    lg: "",
  },

  border: {
    none: "border-0",
    thin: "border",
    default: "border",
    thick: "border-2",
  },

  // -------------------------------------------------------------------------
  // Typography Properties
  // -------------------------------------------------------------------------

  fontFamily: "mono",
  textTransform: "uppercase",
  letterSpacing: "wide",

  // -------------------------------------------------------------------------
  // Component-Specific Overrides
  // -------------------------------------------------------------------------

  button: {
    prefix: "> ",
    suffix: "",
    weight: "medium",
  },

  label: {
    format: "brackets",
  },

  cardHeader: {
    style: "terminal",
    showCode: true,
  },

  input: {
    prefix: "",
    placeholderStyle: "muted",
  },
};

// ============================================================================
// TERMINAL TAILWIND CLASS MAPPINGS
// ============================================================================

/**
 * Ready-to-use Tailwind classes for terminal mode
 */
export const terminalClasses = {
  // -------------------------------------------------------------------------
  // Base element classes
  // -------------------------------------------------------------------------

  /** Border radius for all elements */
  radius: "rounded-none",

  /** Font family */
  font: "font-mono",

  /** Text transform */
  textTransform: "uppercase",

  // -------------------------------------------------------------------------
  // Typography
  // -------------------------------------------------------------------------

  /** Page title */
  pageTitle: "font-mono text-4xl font-bold tracking-tight uppercase",

  /** Section heading */
  sectionHeading: "font-mono text-2xl font-bold uppercase",

  /** Card title */
  cardTitle: "font-mono text-xs text-muted-foreground uppercase tracking-wide",

  /** Body text */
  body: "font-mono text-xs",

  /** Label */
  label: "font-mono text-xs text-muted-foreground uppercase",

  /** Caption */
  caption: "font-mono text-xs text-muted-foreground",

  // -------------------------------------------------------------------------
  // Components
  // -------------------------------------------------------------------------

  /** Button base */
  button: "rounded-none font-mono text-xs font-medium uppercase",

  /** Input base */
  input: "rounded-none font-mono text-xs border-border",

  /** Card base */
  card: "rounded-none border font-mono",

  /** Card header (terminal style) */
  cardHeader: "border-b border-border px-4 py-2",

  /** Badge base */
  badge: "rounded-none font-mono text-xs uppercase",

  /** Dialog/modal */
  dialog: "rounded-none font-mono",

  /** Alert */
  alert: "rounded-none font-mono",

  /** Tabs */
  tabsList: "rounded-none",
  tabsTrigger: "rounded-none font-mono text-xs uppercase",

  // -------------------------------------------------------------------------
  // Interactive states
  // -------------------------------------------------------------------------

  /** Focus ring */
  focusRing: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",

  /** Hover state for cards */
  cardHover: "hover:border-primary/50 transition-colors",
} as const;

// ============================================================================
// TERMINAL FORMATTING FUNCTIONS
// ============================================================================

/**
 * Format text for terminal display
 * Converts "Hello World" to "HELLO_WORLD"
 */
export function formatTerminalText(text: string): string {
  return text.toUpperCase().replace(/\s+/g, "_");
}

/**
 * Format button text with prefix
 * Converts "Submit" to "> SUBMIT"
 */
export function formatButtonText(text: string): string {
  return `> ${formatTerminalText(text)}`;
}

/**
 * Format label text with brackets
 * Converts "Email" to "[EMAIL]:"
 */
export function formatLabelText(label: string): string {
  return `[${label.toUpperCase()}]:`;
}

/**
 * Format card header with hex code
 * Converts ("Settings", "00") to "[ [0x00] SETTINGS ]"
 */
export function formatCardHeader(title: string, hexCode?: string): string {
  const code = hexCode ? `[0x${hexCode}] ` : "";
  return `[ ${code}${title.toUpperCase()} ]`;
}

/**
 * Format status text
 * Converts ("online", true) to "[STATUS]: ONLINE"
 */
export function formatStatusText(label: string, value: string): string {
  return `[${label.toUpperCase()}]: ${value.toUpperCase()}`;
}

// ============================================================================
// TERMINAL COPY PATTERNS
// ============================================================================

/**
 * Standard copy patterns for terminal mode
 * Use these for consistent text formatting across the app
 */
export const terminalCopy = {
  // -------------------------------------------------------------------------
  // Action buttons
  // -------------------------------------------------------------------------
  actions: {
    submit: "> SUBMIT",
    save: "> SAVE_CHANGES",
    cancel: "> CANCEL",
    delete: "> DELETE",
    confirm: "> CONFIRM",
    continue: "> CONTINUE",
    back: "> BACK",
    next: "> NEXT",
    create: "> CREATE",
    edit: "> EDIT",
    view: "> VIEW",
    download: "> DOWNLOAD",
    upload: "> UPLOAD",
    refresh: "> REFRESH",
    search: "> SEARCH",
    filter: "> FILTER",
    sort: "> SORT",
    export: "> EXPORT",
    import: "> IMPORT",
    copy: "> COPY",
    share: "> SHARE",
    send: "> SEND",
    connect: "> CONNECT",
    disconnect: "> DISCONNECT",
    enable: "> ENABLE",
    disable: "> DISABLE",
    start: "> START",
    stop: "> STOP",
    reset: "> RESET",
    retry: "> RETRY",
    skip: "> SKIP",
    apply: "> APPLY",
    clear: "> CLEAR",
    close: "> CLOSE",
    open: "> OPEN",
    add: "> ADD",
    remove: "> REMOVE",
    update: "> UPDATE",
    upgrade: "> UPGRADE",
    install: "> INSTALL",
    uninstall: "> UNINSTALL",
    login: "> LOGIN",
    logout: "> LOGOUT",
    signUp: "> SIGN_UP",
    signIn: "> SIGN_IN",
    signOut: "> SIGN_OUT",
  },

  // -------------------------------------------------------------------------
  // Status labels
  // -------------------------------------------------------------------------
  status: {
    loading: "[STATUS]: LOADING...",
    success: "[STATUS]: SUCCESS",
    error: "[STATUS]: ERROR",
    warning: "[STATUS]: WARNING",
    info: "[STATUS]: INFO",
    pending: "[STATUS]: PENDING",
    active: "[STATUS]: ACTIVE",
    inactive: "[STATUS]: INACTIVE",
    online: "[STATUS]: ONLINE",
    offline: "[STATUS]: OFFLINE",
    connected: "[STATUS]: CONNECTED",
    disconnected: "[STATUS]: DISCONNECTED",
  },

  // -------------------------------------------------------------------------
  // Section headers
  // -------------------------------------------------------------------------
  sections: {
    settings: "[ [0x00] SETTINGS ]",
    account: "[ [0x01] ACCOUNT ]",
    profile: "[ [0x02] PROFILE ]",
    security: "[ [0x03] SECURITY ]",
    billing: "[ [0x04] BILLING ]",
    notifications: "[ [0x05] NOTIFICATIONS ]",
    preferences: "[ [0x06] PREFERENCES ]",
    admin: "[ [0xA0] ADMIN ]",
    dashboard: "[ [0xD0] DASHBOARD ]",
    analytics: "[ [0xA1] ANALYTICS ]",
  },
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export default terminalMode;
