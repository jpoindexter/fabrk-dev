"use client";

/**
 * useTheme Hook
 *
 * Manages the complete theme state including color theme and visual mode.
 * Provides utilities for switching themes and accessing current state.
 *
 * Usage:
 * ```tsx
 * import { useTheme } from '@/design-system/hooks/use-theme';
 *
 * function ThemeSwitcher() {
 *   const { colorTheme, setColorTheme, isDark, toggleDark } = useTheme();
 *
 *   return (
 *     <button onClick={toggleDark}>
 *       {isDark ? 'Light Mode' : 'Dark Mode'}
 *     </button>
 *   );
 * }
 * ```
 */

import { useCallback, useEffect, useState } from "react";
import {
  ColorThemeName,
  VisualModeName,
  isDarkTheme,
  isColorThemeName,
  isVisualModeName,
  DEFAULT_COLOR_THEME,
  DEFAULT_VISUAL_MODE,
  COLOR_THEME_NAMES,
} from "../themes/theme.types";

// ============================================================================
// TYPES
// ============================================================================

export interface UseThemeOptions {
  /** Default color theme */
  defaultColorTheme?: ColorThemeName;
  /** Default visual mode */
  defaultVisualMode?: VisualModeName;
  /** Storage key for persisting theme */
  storageKey?: string;
  /** Whether to persist to localStorage */
  persist?: boolean;
  /** Attribute to set on document element */
  attribute?: "class" | "data-theme" | "data-visual-mode";
}

export interface UseThemeReturn {
  // -------------------------------------------------------------------------
  // Color Theme
  // -------------------------------------------------------------------------
  /** Current color theme name */
  colorTheme: ColorThemeName;
  /** Set color theme */
  setColorTheme: (theme: ColorThemeName) => void;
  /** Whether current theme is dark */
  isDark: boolean;
  /** Toggle between light and dark themes */
  toggleDark: () => void;
  /** All available color themes */
  colorThemes: readonly ColorThemeName[];

  // -------------------------------------------------------------------------
  // Visual Mode
  // -------------------------------------------------------------------------
  /** Current visual mode */
  visualMode: VisualModeName;
  /** Set visual mode */
  setVisualMode: (mode: VisualModeName) => void;

  // -------------------------------------------------------------------------
  // System
  // -------------------------------------------------------------------------
  /** Whether theme has been mounted (for SSR) */
  mounted: boolean;
  /** Reset to default theme */
  reset: () => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const STORAGE_KEY_THEME = "fabrk-color-theme";
const STORAGE_KEY_MODE = "fabrk-visual-mode";

// Light/dark theme pairs for toggling
const THEME_PAIRS: Record<ColorThemeName, ColorThemeName> = {
  light: "dark",
  dark: "light",
  cupcake: "dracula",
  bumblebee: "halloween",
  emerald: "forest",
  corporate: "business",
  synthwave: "retro",
  retro: "synthwave",
  cyberpunk: "dracula",
  valentine: "dracula",
  halloween: "bumblebee",
  forest: "emerald",
  aqua: "lofi",
  lofi: "aqua",
  pastel: "dracula",
  fantasy: "dracula",
  luxury: "light",
  dracula: "light",
  autumn: "business",
  business: "autumn",
};

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

export function useTheme(options: UseThemeOptions = {}): UseThemeReturn {
  const {
    defaultColorTheme = DEFAULT_COLOR_THEME,
    defaultVisualMode = DEFAULT_VISUAL_MODE,
    persist = true,
  } = options;

  // State
  const [colorTheme, setColorThemeState] = useState<ColorThemeName>(defaultColorTheme);
  const [visualMode, setVisualModeState] = useState<VisualModeName>(defaultVisualMode);
  const [mounted, setMounted] = useState(false);

  // -------------------------------------------------------------------------
  // Initialize from storage/system preference
  // -------------------------------------------------------------------------
  useEffect(() => {
    // Check localStorage first
    if (persist && typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(STORAGE_KEY_THEME);
      const storedMode = localStorage.getItem(STORAGE_KEY_MODE);

      if (storedTheme && isColorThemeName(storedTheme)) {
        setColorThemeState(storedTheme);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setColorThemeState(prefersDark ? "dark" : "light");
      }

      if (storedMode && isVisualModeName(storedMode)) {
        setVisualModeState(storedMode);
      }
    }

    setMounted(true);
  }, [persist]);

  // -------------------------------------------------------------------------
  // Apply theme to document
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Set color theme
    root.setAttribute("data-theme", colorTheme);

    // Set visual mode
    root.setAttribute("data-visual-mode", visualMode);

    // Update body class for dark mode (Tailwind dark mode support)
    if (isDarkTheme(colorTheme)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Persist to localStorage
    if (persist && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_THEME, colorTheme);
      localStorage.setItem(STORAGE_KEY_MODE, visualMode);
    }
  }, [colorTheme, visualMode, mounted, persist]);

  // -------------------------------------------------------------------------
  // Theme setters
  // -------------------------------------------------------------------------
  const setColorTheme = useCallback((theme: ColorThemeName) => {
    if (isColorThemeName(theme)) {
      setColorThemeState(theme);
    }
  }, []);

  const setVisualMode = useCallback((mode: VisualModeName) => {
    if (isVisualModeName(mode)) {
      setVisualModeState(mode);
    }
  }, []);

  const toggleDark = useCallback(() => {
    const pairedTheme = THEME_PAIRS[colorTheme];
    setColorThemeState(pairedTheme);
  }, [colorTheme]);

  const reset = useCallback(() => {
    setColorThemeState(defaultColorTheme);
    setVisualModeState(defaultVisualMode);
  }, [defaultColorTheme, defaultVisualMode]);

  // -------------------------------------------------------------------------
  // Derived state
  // -------------------------------------------------------------------------
  const isDark = isDarkTheme(colorTheme);

  return {
    colorTheme,
    setColorTheme,
    isDark,
    toggleDark,
    colorThemes: COLOR_THEME_NAMES,
    visualMode,
    setVisualMode,
    mounted,
    reset,
  };
}

export default useTheme;
