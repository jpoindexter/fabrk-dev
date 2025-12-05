"use client";

/**
 * useVisualMode Hook
 *
 * Focused hook for visual mode switching (terminal, modern, minimal, linear).
 * Returns mode-specific classes and formatting utilities.
 *
 * Usage:
 * ```tsx
 * import { useVisualMode } from '@/design-system/hooks/use-visual-mode';
 *
 * function Card({ title }: { title: string }) {
 *   const { classes, formatCardHeader, isTerminal } = useVisualMode();
 *
 *   return (
 *     <div className={classes.card}>
 *       <div className={classes.cardHeader}>
 *         {formatCardHeader(title, "00")}
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */

import { useMemo } from "react";
import type { VisualModeName, VisualModeConfig } from "../themes/theme.types";
import { VISUAL_MODE_NAMES, DEFAULT_VISUAL_MODE } from "../themes/theme.types";
import { terminalMode, terminalClasses, terminalCopy } from "../themes/terminal";
import {
  modernMode,
  modernClasses,
  minimalMode,
  minimalClasses,
  linearMode,
  linearClasses,
} from "../themes/modern";
import {
  formatTerminalText,
  formatButtonText as formatTerminalButtonText,
  formatLabelText as formatTerminalLabelText,
  formatCardHeader as formatTerminalCardHeader,
} from "../themes/terminal";

// ============================================================================
// TYPES
// ============================================================================

export interface UseVisualModeOptions {
  /** Override current mode (for testing or isolated components) */
  mode?: VisualModeName;
}

export interface VisualModeClasses {
  // Base classes
  radius: string;
  font: string;
  textTransform: string;

  // Typography
  pageTitle: string;
  sectionHeading: string;
  cardTitle: string;
  body: string;
  label: string;
  caption: string;

  // Components
  button: string;
  input: string;
  card: string;
  cardHeader: string;
  badge: string;
  dialog: string;
  alert: string;
  tabsList: string;
  tabsTrigger: string;

  // Interactive
  focusRing: string;
  cardHover: string;
}

export interface UseVisualModeReturn {
  /** Current visual mode name */
  mode: VisualModeName;
  /** Full mode configuration */
  config: VisualModeConfig;
  /** Ready-to-use Tailwind classes */
  classes: VisualModeClasses;

  // -------------------------------------------------------------------------
  // Mode checks
  // -------------------------------------------------------------------------
  /** Whether current mode is terminal */
  isTerminal: boolean;
  /** Whether current mode is modern */
  isModern: boolean;
  /** Whether current mode is minimal */
  isMinimal: boolean;
  /** Whether current mode is linear */
  isLinear: boolean;
  /** Whether current mode uses rounded corners */
  hasRoundedCorners: boolean;
  /** Whether current mode uses shadows */
  hasShadows: boolean;

  // -------------------------------------------------------------------------
  // Formatting utilities
  // -------------------------------------------------------------------------
  /** Format text according to current mode */
  formatText: (text: string) => string;
  /** Format button text */
  formatButtonText: (text: string) => string;
  /** Format label text */
  formatLabelText: (label: string) => string;
  /** Format card header */
  formatCardHeader: (title: string, code?: string) => string;

  // -------------------------------------------------------------------------
  // Copy patterns (terminal only)
  // -------------------------------------------------------------------------
  /** Predefined copy patterns */
  copy: typeof terminalCopy | null;

  // -------------------------------------------------------------------------
  // All available modes
  // -------------------------------------------------------------------------
  /** List of all available mode names */
  modes: readonly VisualModeName[];
}

// ============================================================================
// MODE REGISTRY
// ============================================================================

const modeConfigs: Record<VisualModeName, VisualModeConfig> = {
  terminal: terminalMode,
  modern: modernMode,
  minimal: minimalMode,
  linear: linearMode,
};

const modeClasses: Record<VisualModeName, VisualModeClasses> = {
  terminal: terminalClasses as VisualModeClasses,
  modern: modernClasses as VisualModeClasses,
  minimal: minimalClasses as VisualModeClasses,
  linear: linearClasses as VisualModeClasses,
};

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

export function useVisualMode(options: UseVisualModeOptions = {}): UseVisualModeReturn {
  const { mode = DEFAULT_VISUAL_MODE } = options;

  // Memoize derived values
  return useMemo(() => {
    const config = modeConfigs[mode];
    const classes = modeClasses[mode];

    const isTerminal = mode === "terminal";
    const isModern = mode === "modern";
    const isMinimal = mode === "minimal";
    const isLinear = mode === "linear";
    const hasRoundedCorners = mode !== "terminal";
    const hasShadows = mode === "modern" || mode === "linear";

    // Formatting functions based on mode
    const formatText = isTerminal
      ? formatTerminalText
      : (text: string) => text;

    const formatButtonText = isTerminal
      ? formatTerminalButtonText
      : (text: string) => text;

    const formatLabelText = isTerminal
      ? formatTerminalLabelText
      : (label: string) => label;

    const formatCardHeader = isTerminal
      ? formatTerminalCardHeader
      : (title: string) => title;

    const copy = isTerminal ? terminalCopy : null;

    return {
      mode,
      config,
      classes,
      isTerminal,
      isModern,
      isMinimal,
      isLinear,
      hasRoundedCorners,
      hasShadows,
      formatText,
      formatButtonText,
      formatLabelText,
      formatCardHeader,
      copy,
      modes: VISUAL_MODE_NAMES,
    };
  }, [mode]);
}

// ============================================================================
// STATIC UTILITIES
// ============================================================================

/**
 * Get classes for a specific mode without using the hook
 * Useful for server components or build-time generation
 */
export function getVisualModeClasses(mode: VisualModeName): VisualModeClasses {
  return modeClasses[mode];
}

/**
 * Get config for a specific mode
 */
export function getVisualModeConfig(mode: VisualModeName): VisualModeConfig {
  return modeConfigs[mode];
}

/**
 * Get the current mode from the document
 * Only works on client side
 */
export function getCurrentVisualMode(): VisualModeName {
  if (typeof document === "undefined") {
    return DEFAULT_VISUAL_MODE;
  }

  const mode = document.documentElement.getAttribute("data-visual-mode");
  if (mode && VISUAL_MODE_NAMES.includes(mode as VisualModeName)) {
    return mode as VisualModeName;
  }

  return DEFAULT_VISUAL_MODE;
}

export default useVisualMode;
