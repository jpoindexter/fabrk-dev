/**
 * Design System Bridge
 *
 * Bridges the old static `mode` system with the new dynamic ThemeProvider.
 * Provides backwards compatibility for existing components while enabling
 * runtime theme switching.
 *
 * Migration Strategy:
 * 1. Phase 1 (current): Static mode export for server components
 * 2. Phase 2: useModeContext() hook for client components wanting dynamic switching
 * 3. Phase 3: Full migration to context-based system
 *
 * @example
 * // For static/server components (backwards compatible)
 * import { mode } from "@/lib/design-system";
 *
 * // For client components wanting dynamic switching
 * import { useModeClasses } from "@/lib/design-system/bridge";
 */

import { CURRENT_MODE, type VisualMode, type VisualModeConfig, visualModes } from "./visual-mode";

// Re-export types for convenience
export type { VisualMode, VisualModeConfig };

/**
 * Get visual mode config by name
 */
export function getVisualMode(modeName: VisualMode): VisualModeConfig {
  return visualModes[modeName];
}

/**
 * Get current static mode name
 */
export function getCurrentModeName(): VisualMode {
  return CURRENT_MODE;
}

/**
 * CSS classes mapped to the new design system tokens
 * These align with design-system/themes/terminal.ts and modern.ts
 */
export const modeClasses = {
  terminal: {
    radius: "rounded-none",
    font: "font-mono",
    shadow: "",
    textTransform: "uppercase" as const,
    // Typography
    pageTitle: "font-mono text-3xl font-bold uppercase tracking-tight",
    sectionHeading: "font-mono text-lg font-semibold uppercase",
    cardTitle: "font-mono text-xs font-semibold uppercase",
    body: "font-mono text-sm",
    label: "font-mono text-xs text-muted-foreground",
    caption: "font-mono text-xs text-muted-foreground",
    // Components
    button: "rounded-none font-mono text-xs uppercase",
    input: "rounded-none font-mono text-xs",
    card: "rounded-none border bg-card",
    cardHeader: "border-b border-border px-4 py-2",
    badge: "rounded-none font-mono text-xs uppercase",
    // Interactive
    focusRing: "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
    cardHover: "hover:border-primary/50 transition-colors",
  },
  modern: {
    radius: "rounded-lg",
    font: "font-sans",
    shadow: "shadow-sm",
    textTransform: "normal" as const,
    // Typography
    pageTitle: "font-sans text-3xl font-bold tracking-tight",
    sectionHeading: "font-sans text-lg font-semibold",
    cardTitle: "font-sans text-sm font-medium",
    body: "font-sans text-sm",
    label: "font-sans text-xs text-muted-foreground",
    caption: "font-sans text-xs text-muted-foreground",
    // Components
    button: "rounded-lg font-sans text-sm",
    input: "rounded-lg font-sans text-sm",
    card: "rounded-lg border bg-card shadow-sm",
    cardHeader: "px-6 py-4",
    badge: "rounded-full font-sans text-xs",
    // Interactive
    focusRing:
      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
    cardHover: "hover:shadow-md transition-shadow",
  },
  minimal: {
    radius: "rounded-md",
    font: "font-sans",
    shadow: "",
    textTransform: "normal" as const,
    // Typography
    pageTitle: "font-sans text-3xl font-medium tracking-tight",
    sectionHeading: "font-sans text-lg font-medium",
    cardTitle: "font-sans text-sm font-medium",
    body: "font-sans text-sm",
    label: "font-sans text-xs text-muted-foreground",
    caption: "font-sans text-xs text-muted-foreground",
    // Components
    button: "rounded-md font-sans text-sm",
    input: "rounded-md font-sans text-sm",
    card: "rounded-md border-0 bg-card",
    cardHeader: "px-4 py-3",
    badge: "rounded-md font-sans text-xs",
    // Interactive
    focusRing: "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
    cardHover: "hover:bg-muted/50 transition-colors",
  },
  linear: {
    radius: "rounded-lg",
    font: "font-sans",
    shadow: "shadow-sm",
    textTransform: "normal" as const,
    // Typography
    pageTitle: "font-sans text-3xl font-semibold tracking-tight",
    sectionHeading: "font-sans text-lg font-semibold",
    cardTitle: "font-sans text-sm font-semibold",
    body: "font-sans text-sm",
    label: "font-sans text-xs text-muted-foreground",
    caption: "font-sans text-xs text-muted-foreground",
    // Components
    button: "rounded-lg font-sans text-sm font-medium",
    input: "rounded-lg font-sans text-sm",
    card: "rounded-lg border bg-card shadow-sm",
    cardHeader: "px-6 py-4 border-b border-border",
    badge: "rounded-md font-sans text-xs font-medium",
    // Interactive
    focusRing:
      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:outline-none",
    cardHover: "hover:border-primary/30 transition-colors",
  },
} as const;

/**
 * Map old mode names to new mode names
 */
const modeNameMap: Record<string, keyof typeof modeClasses> = {
  sharp: "terminal",
  standard: "modern",
  minimal: "minimal",
  linear: "linear",
};

/**
 * Get mode classes for a given mode name
 * Handles mapping old names (sharp, standard) to new names (terminal, modern)
 */
export function getModeClasses(modeName: string): (typeof modeClasses)[keyof typeof modeClasses] {
  const mappedName = modeNameMap[modeName] || modeName;
  return modeClasses[mappedName as keyof typeof modeClasses] || modeClasses.terminal;
}

/**
 * Current mode classes (static, for server components)
 */
export const currentModeClasses = getModeClasses(CURRENT_MODE);

/**
 * Utility to combine classes conditionally
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
