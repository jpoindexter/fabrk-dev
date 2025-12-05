/**
 * Component Design Tokens
 *
 * Component-specific token definitions that combine primitives and semantic tokens
 * into ready-to-use component configurations.
 *
 * These tokens are theme-agnostic - visual mode differences are handled
 * by the theme system, not here.
 *
 * @see ./primitives.ts for raw values
 * @see ./semantic.ts for purpose-based tokens
 */

// ============================================================================
// BUTTON TOKENS
// ============================================================================

export const button = {
  // -------------------------------------------------------------------------
  // Sizes
  // -------------------------------------------------------------------------
  size: {
    xs: {
      height: "h-7",
      padding: "px-2",
      text: "text-xs",
      iconSize: "h-3 w-3",
    },
    sm: {
      height: "h-8",
      padding: "px-3",
      text: "text-xs",
      iconSize: "h-4 w-4",
    },
    default: {
      height: "h-9",
      padding: "px-4",
      text: "text-sm",
      iconSize: "h-4 w-4",
    },
    lg: {
      height: "h-10",
      padding: "px-6",
      text: "text-sm",
      iconSize: "h-5 w-5",
    },
    xl: {
      height: "h-12",
      padding: "px-8",
      text: "text-base",
      iconSize: "h-5 w-5",
    },
    icon: {
      height: "h-9",
      padding: "p-0",
      width: "w-9",
      text: "text-sm",
      iconSize: "h-4 w-4",
    },
    iconLg: {
      height: "h-10",
      padding: "p-0",
      width: "w-10",
      text: "text-sm",
      iconSize: "h-5 w-5",
    },
  },

  // -------------------------------------------------------------------------
  // Variants (color schemes)
  // -------------------------------------------------------------------------
  variant: {
    default: {
      base: "bg-primary text-primary-foreground",
      hover: "hover:bg-primary/90",
    },
    destructive: {
      base: "bg-destructive text-destructive-foreground",
      hover: "hover:bg-destructive/90",
    },
    outline: {
      base: "border border-input bg-background",
      hover: "hover:bg-accent hover:text-accent-foreground",
    },
    secondary: {
      base: "bg-secondary text-secondary-foreground",
      hover: "hover:bg-secondary/80",
    },
    ghost: {
      base: "bg-transparent",
      hover: "hover:bg-accent hover:text-accent-foreground",
    },
    link: {
      base: "text-primary underline-offset-4",
      hover: "hover:underline",
    },
  },

  // -------------------------------------------------------------------------
  // States
  // -------------------------------------------------------------------------
  state: {
    disabled: "opacity-50 pointer-events-none",
    loading: "opacity-70 pointer-events-none",
    focus: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  },

  // -------------------------------------------------------------------------
  // Base styles (applied to all buttons)
  // -------------------------------------------------------------------------
  base: "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors",
} as const;

// ============================================================================
// INPUT TOKENS
// ============================================================================

export const input = {
  // -------------------------------------------------------------------------
  // Sizes
  // -------------------------------------------------------------------------
  size: {
    sm: {
      height: "h-8",
      padding: "px-3 py-1",
      text: "text-xs",
    },
    default: {
      height: "h-9",
      padding: "px-3 py-2",
      text: "text-sm",
    },
    lg: {
      height: "h-10",
      padding: "px-4 py-2",
      text: "text-sm",
    },
  },

  // -------------------------------------------------------------------------
  // States
  // -------------------------------------------------------------------------
  state: {
    default: "border-input bg-background",
    focus: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    error: "border-destructive focus-visible:ring-destructive",
    success: "border-success focus-visible:ring-success",
    disabled: "opacity-50 cursor-not-allowed",
  },

  // -------------------------------------------------------------------------
  // Base styles
  // -------------------------------------------------------------------------
  base: "flex w-full border file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground transition-colors",

  // -------------------------------------------------------------------------
  // Touch target (WCAG 2.1 AA compliant)
  // -------------------------------------------------------------------------
  touchTarget: "min-h-[44px] sm:min-h-0",
} as const;

// ============================================================================
// CARD TOKENS
// ============================================================================

export const card = {
  // -------------------------------------------------------------------------
  // Padding variants
  // -------------------------------------------------------------------------
  padding: {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  },

  // -------------------------------------------------------------------------
  // Parts
  // -------------------------------------------------------------------------
  parts: {
    header: "flex flex-col space-y-1.5 p-6",
    title: "font-semibold leading-none tracking-tight",
    description: "text-sm text-muted-foreground",
    content: "p-6 pt-0",
    footer: "flex items-center p-6 pt-0",
  },

  // -------------------------------------------------------------------------
  // Base styles
  // -------------------------------------------------------------------------
  base: "bg-card text-card-foreground border",
} as const;

// ============================================================================
// BADGE TOKENS
// ============================================================================

export const badge = {
  // -------------------------------------------------------------------------
  // Sizes
  // -------------------------------------------------------------------------
  size: {
    sm: {
      padding: "px-2 py-0.5",
      text: "text-[10px]",
    },
    default: {
      padding: "px-2.5 py-0.5",
      text: "text-xs",
    },
    lg: {
      padding: "px-3 py-1",
      text: "text-xs",
    },
  },

  // -------------------------------------------------------------------------
  // Variants
  // -------------------------------------------------------------------------
  variant: {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    info: "bg-info text-info-foreground",
    outline: "border border-current bg-transparent",
  },

  // -------------------------------------------------------------------------
  // Base styles
  // -------------------------------------------------------------------------
  base: "inline-flex items-center font-medium transition-colors",
} as const;

// ============================================================================
// ALERT TOKENS
// ============================================================================

export const alert = {
  // -------------------------------------------------------------------------
  // Variants
  // -------------------------------------------------------------------------
  variant: {
    default: "bg-background text-foreground border",
    destructive: "bg-destructive/10 text-destructive border-destructive/50",
    success: "bg-success/10 text-success border-success/50",
    warning: "bg-warning/10 text-warning border-warning/50",
    info: "bg-info/10 text-info border-info/50",
  },

  // -------------------------------------------------------------------------
  // Parts
  // -------------------------------------------------------------------------
  parts: {
    icon: "h-4 w-4",
    title: "font-semibold leading-none tracking-tight",
    description: "text-sm [&_p]:leading-relaxed",
  },

  // -------------------------------------------------------------------------
  // Base styles
  // -------------------------------------------------------------------------
  base: "relative w-full p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
} as const;

// ============================================================================
// DIALOG/MODAL TOKENS
// ============================================================================

export const dialog = {
  // -------------------------------------------------------------------------
  // Sizes
  // -------------------------------------------------------------------------
  size: {
    sm: "max-w-sm",
    default: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[calc(100%-2rem)]",
  },

  // -------------------------------------------------------------------------
  // Parts
  // -------------------------------------------------------------------------
  parts: {
    overlay: "fixed inset-0 z-50 bg-black/80",
    content: "fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 p-6 shadow-lg",
    header: "flex flex-col space-y-1.5 text-center sm:text-left",
    title: "text-lg font-semibold leading-none tracking-tight",
    description: "text-sm text-muted-foreground",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    close: "absolute right-4 top-4 opacity-70 hover:opacity-100",
  },

  // -------------------------------------------------------------------------
  // Animation
  // -------------------------------------------------------------------------
  animation: {
    overlay: "animate-in fade-in-0",
    content: "animate-in fade-in-0 zoom-in-95",
    exit: "animate-out fade-out-0 zoom-out-95",
  },
} as const;

// ============================================================================
// TABLE TOKENS
// ============================================================================

export const table = {
  // -------------------------------------------------------------------------
  // Parts
  // -------------------------------------------------------------------------
  parts: {
    wrapper: "relative w-full overflow-auto",
    table: "w-full caption-bottom text-sm",
    header: "border-b",
    headerCell: "h-10 px-4 text-left align-middle font-medium text-muted-foreground",
    body: "[&_tr:last-child]:border-0",
    row: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
    cell: "p-4 align-middle",
    footer: "border-t bg-muted/50 font-medium",
    caption: "mt-4 text-sm text-muted-foreground",
  },
} as const;

// ============================================================================
// FORM TOKENS
// ============================================================================

export const form = {
  // -------------------------------------------------------------------------
  // Field spacing
  // -------------------------------------------------------------------------
  spacing: {
    field: "space-y-2",
    group: "space-y-4",
    section: "space-y-6",
  },

  // -------------------------------------------------------------------------
  // Parts
  // -------------------------------------------------------------------------
  parts: {
    label: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    description: "text-sm text-muted-foreground",
    error: "text-sm font-medium text-destructive",
    hint: "text-xs text-muted-foreground",
  },
} as const;

// ============================================================================
// NAVIGATION TOKENS
// ============================================================================

export const navigation = {
  // -------------------------------------------------------------------------
  // Header
  // -------------------------------------------------------------------------
  header: {
    height: "h-16",
    padding: "px-4 lg:px-6",
    base: "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
  },

  // -------------------------------------------------------------------------
  // Sidebar
  // -------------------------------------------------------------------------
  sidebar: {
    width: "w-64",
    collapsedWidth: "w-16",
    padding: "p-4",
    base: "fixed left-0 top-0 z-30 h-screen border-r bg-background",
  },

  // -------------------------------------------------------------------------
  // Nav items
  // -------------------------------------------------------------------------
  item: {
    base: "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors",
    active: "bg-accent text-accent-foreground",
    inactive: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
  },

  // -------------------------------------------------------------------------
  // Breadcrumb
  // -------------------------------------------------------------------------
  breadcrumb: {
    base: "flex items-center gap-2 text-sm",
    separator: "text-muted-foreground",
    current: "font-medium text-foreground",
    link: "text-muted-foreground hover:text-foreground transition-colors",
  },
} as const;

// ============================================================================
// TOOLTIP TOKENS
// ============================================================================

export const tooltip = {
  content: "z-50 overflow-hidden px-3 py-1.5 text-xs animate-in fade-in-0 zoom-in-95",
  arrow: "fill-current",
} as const;

// ============================================================================
// DROPDOWN TOKENS
// ============================================================================

export const dropdown = {
  content: "z-50 min-w-[8rem] overflow-hidden border bg-popover p-1 text-popover-foreground shadow-md",
  item: "relative flex cursor-default select-none items-center px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  separator: "-mx-1 my-1 h-px bg-muted",
  label: "px-2 py-1.5 text-sm font-semibold",
} as const;

// ============================================================================
// SKELETON TOKENS
// ============================================================================

export const skeleton = {
  base: "animate-pulse bg-muted",
  text: "h-4 w-full",
  avatar: "h-12 w-12 rounded-full",
  card: "h-[200px] w-full",
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export const componentTokens = {
  button,
  input,
  card,
  badge,
  alert,
  dialog,
  table,
  form,
  navigation,
  tooltip,
  dropdown,
  skeleton,
} as const;

export default componentTokens;
