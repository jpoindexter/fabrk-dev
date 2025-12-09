"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ThemeName } from "../themes";
import { DEFAULT_THEME, THEME_NAMES } from "../themes";

// =============================================================================
// CONTEXT TYPES
// =============================================================================

export type VisualModeName = "terminal" | "modern" | "minimal" | "linear";
export type ColorThemeName = "light" | "dark";

export interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colorTheme: ColorThemeName;
  setColorTheme: (theme: ColorThemeName) => void;
  visualMode: VisualModeName;
  setVisualMode: (mode: VisualModeName) => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  defaultColorTheme?: ColorThemeName;
  defaultVisualMode?: VisualModeName;
  storageKey?: string;
  storageKeyPrefix?: string;
  persist?: boolean;
}

export interface ThemeScriptProps {
  storageKey?: string;
  storageKeyPrefix?: string;
  defaultColorTheme?: ColorThemeName;
  defaultVisualMode?: VisualModeName;
}

// =============================================================================
// CONTEXT
// =============================================================================

const ThemeContext = createContext<ThemeContextValue | null>(null);

// =============================================================================
// PROVIDER
// =============================================================================

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  defaultColorTheme = "light",
  defaultVisualMode = "modern",
  storageKey,
  storageKeyPrefix = "design-system",
  persist = true,
}: ThemeProviderProps) {
  const colorKey = storageKey || `${storageKeyPrefix}-color-theme`;
  const visualKey = `${storageKeyPrefix}-visual-mode`;

  const [theme, setThemeState] = useState<ThemeName>(defaultTheme);
  const [colorTheme, setColorThemeState] = useState<ColorThemeName>(defaultColorTheme);
  const [visualMode, setVisualModeState] = useState<VisualModeName>(defaultVisualMode);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (!persist) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      return;
    }

    const storedColor = localStorage.getItem(colorKey);
    if (storedColor && ["light", "dark"].includes(storedColor)) {
      setColorThemeState(storedColor as ColorThemeName);
    }

    const storedVisual = localStorage.getItem(visualKey);
    if (storedVisual && ["terminal", "modern", "minimal", "linear"].includes(storedVisual)) {
      setVisualModeState(storedVisual as VisualModeName);
    }

    setMounted(true);
  }, [colorKey, visualKey, persist]);

  // Update localStorage and DOM when theme changes
  useEffect(() => {
    if (!mounted) return;

    if (persist) {
      localStorage.setItem(colorKey, colorTheme);
      localStorage.setItem(visualKey, visualMode);
    }

    document.documentElement.setAttribute("data-theme", colorTheme);
    document.documentElement.setAttribute("data-visual-mode", visualMode);
  }, [colorTheme, visualMode, colorKey, visualKey, mounted, persist]);

  const setTheme = (newTheme: ThemeName) => {
    if (THEME_NAMES.includes(newTheme)) {
      setThemeState(newTheme);
    }
  };

  const setColorTheme = (newTheme: ColorThemeName) => {
    if (["light", "dark"].includes(newTheme)) {
      setColorThemeState(newTheme);
    }
  };

  const setVisualMode = (newMode: VisualModeName) => {
    if (["terminal", "modern", "minimal", "linear"].includes(newMode)) {
      setVisualModeState(newMode);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        colorTheme,
        setColorTheme,
        visualMode,
        setVisualMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// =============================================================================
// HOOKS
// =============================================================================

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}

export function useOptionalThemeContext(): ThemeContextValue | null {
  return useContext(ThemeContext);
}

// =============================================================================
// SCRIPT FOR SSR FLASH PREVENTION
// =============================================================================

/**
 * Inline script to prevent flash of unstyled content
 * Add this to <head> before any stylesheets
 */
export function ThemeScript({
  storageKey,
  storageKeyPrefix = "design-system",
  defaultColorTheme = "light",
  defaultVisualMode = "terminal",
}: ThemeScriptProps) {
  const colorKey = storageKey || `${storageKeyPrefix}-color-theme`;
  const visualKey = `${storageKeyPrefix}-visual-mode`;

  const script = `
    (function() {
      try {
        var colorTheme = localStorage.getItem('${colorKey}') || '${defaultColorTheme}';
        if (['light', 'dark'].includes(colorTheme)) {
          document.documentElement.setAttribute('data-theme', colorTheme);
        }
        var visualMode = localStorage.getItem('${visualKey}') || '${defaultVisualMode}';
        if (['terminal', 'modern', 'minimal', 'linear'].includes(visualMode)) {
          document.documentElement.setAttribute('data-visual-mode', visualMode);
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} suppressHydrationWarning />;
}

export default ThemeProvider;
