'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeName } from '../themes';
import { DEFAULT_THEME, THEME_NAMES } from '../themes';

// =============================================================================
// CONTEXT TYPES
// =============================================================================

// Color themes correspond to CRT phosphor palettes in globals.css
export type ColorThemeName =
  | 'amber'
  | 'green'
  | 'blue'
  | 'red'
  | 'purple'
  | 'light-green'
  | 'light-amber'
  | 'gameboy'
  | 'c64'
  | 'gbpocket'
  | 'vic20'
  | 'atari'
  | 'spectrum'
  | 'bw';

const ALL_THEMES = [
  'amber',
  'green',
  'blue',
  'red',
  'purple',
  'light-green',
  'light-amber',
  'gameboy',
  'c64',
  'gbpocket',
  'vic20',
  'atari',
  'spectrum',
  'bw',
];

// =============================================================================

export interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colorTheme: ColorThemeName;
  setColorTheme: (theme: ColorThemeName) => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  defaultColorTheme?: ColorThemeName;
  storageKey?: string;
  storageKeyPrefix?: string;
  persist?: boolean;
}

export interface ThemeScriptProps {
  storageKey?: string;
  storageKeyPrefix?: string;
  defaultColorTheme?: ColorThemeName;
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
  defaultColorTheme = 'green',
  storageKey,
  storageKeyPrefix = 'design-system',
  persist = true,
}: ThemeProviderProps) {
  const colorKey = storageKey || 'theme';
  const legacyColorKey = storageKey || `${storageKeyPrefix}-color-theme`;

  const [theme, setThemeState] = useState<ThemeName>(defaultTheme);
  const [colorTheme, setColorThemeState] = useState<ColorThemeName>(defaultColorTheme);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (!persist) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      return;
    }

    const storedColor = localStorage.getItem(colorKey) || localStorage.getItem(legacyColorKey);
    if (storedColor && ALL_THEMES.includes(storedColor)) {
      setColorThemeState(storedColor as ColorThemeName);
    }

    setMounted(true);
  }, [colorKey, legacyColorKey, persist]);

  // Update localStorage and DOM when theme changes
  useEffect(() => {
    if (!mounted) return;

    if (persist) {
      localStorage.setItem(colorKey, colorTheme);
    }

    document.documentElement.setAttribute('data-theme', colorTheme);
  }, [colorTheme, colorKey, mounted, persist]);

  const setTheme = (newTheme: ThemeName) => {
    if (THEME_NAMES.includes(newTheme)) {
      setThemeState(newTheme);
    }
  };

  const setColorTheme = (newTheme: ColorThemeName) => {
    if (ALL_THEMES.includes(newTheme)) {
      setColorThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        colorTheme,
        setColorTheme,
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
    throw new Error('useThemeContext must be used within a ThemeProvider');
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
  storageKeyPrefix = 'design-system',
  defaultColorTheme = 'green',
}: ThemeScriptProps) {
  const colorKey = storageKey || 'theme';
  const legacyColorKey = storageKey || `${storageKeyPrefix}-color-theme`;

  const script = `
    (function() {
      try {
        var colorTheme =
          localStorage.getItem('${colorKey}') ||
          localStorage.getItem('${legacyColorKey}') ||
          '${defaultColorTheme}';
        var validThemes = [
          'amber',
          'green',
          'blue',
          'red',
          'purple',
          'light-green',
          'light-amber',
          'gameboy',
          'c64',
          'gbpocket',
          'vic20',
          'atari',
          'spectrum',
          'bw',
        ];
        if (validThemes.includes(colorTheme)) {
          document.documentElement.setAttribute('data-theme', colorTheme);
        } else {
          document.documentElement.setAttribute('data-theme', '${defaultColorTheme}');
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} suppressHydrationWarning />;
}

export default ThemeProvider;
