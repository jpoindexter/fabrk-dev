"use client";

/**
 * ThemeProvider Component
 *
 * Provides theme context to the entire application.
 * Manages color themes and visual modes with persistence.
 *
 * Usage:
 * ```tsx
 * // In layout.tsx
 * import { ThemeProvider } from '@/design-system/providers';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ThemeProvider
 *           defaultColorTheme="dark"
 *           defaultVisualMode="terminal"
 *         >
 *           {children}
 *         </ThemeProvider>
 *       </body>
 *     </html>
 *   );
 * }
 *
 * // In components
 * import { useThemeContext } from '@/design-system/providers';
 *
 * function MyComponent() {
 *   const { colorTheme, setColorTheme, visualMode } = useThemeContext();
 *   // ...
 * }
 * ```
 */

import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import type { ColorThemeName, VisualModeName } from "../themes/theme.types";
import {
  isDarkTheme,
  isColorThemeName,
  isVisualModeName,
  DEFAULT_COLOR_THEME,
  DEFAULT_VISUAL_MODE,
  COLOR_THEME_NAMES,
  VISUAL_MODE_NAMES,
} from "../themes/theme.types";

// ============================================================================
// TYPES
// ============================================================================

export interface ThemeProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Default color theme */
  defaultColorTheme?: ColorThemeName;
  /** Default visual mode */
  defaultVisualMode?: VisualModeName;
  /** Storage key prefix */
  storageKeyPrefix?: string;
  /** Whether to persist theme to localStorage */
  persist?: boolean;
  /** Force a specific theme (disables switching) */
  forcedColorTheme?: ColorThemeName;
  /** Force a specific visual mode */
  forcedVisualMode?: VisualModeName;
  /** Disable transitions during theme change */
  disableTransitionOnChange?: boolean;
  /** Script to inject for preventing flash (for SSR) */
  enableSystem?: boolean;
}

export interface ThemeContextValue {
  // -------------------------------------------------------------------------
  // Color Theme
  // -------------------------------------------------------------------------
  /** Current color theme */
  colorTheme: ColorThemeName;
  /** Set color theme */
  setColorTheme: (theme: ColorThemeName) => void;
  /** Whether current theme is dark */
  isDark: boolean;
  /** Toggle between light and dark */
  toggleDark: () => void;
  /** Available color themes */
  colorThemes: readonly ColorThemeName[];

  // -------------------------------------------------------------------------
  // Visual Mode
  // -------------------------------------------------------------------------
  /** Current visual mode */
  visualMode: VisualModeName;
  /** Set visual mode */
  setVisualMode: (mode: VisualModeName) => void;
  /** Available visual modes */
  visualModes: readonly VisualModeName[];

  // -------------------------------------------------------------------------
  // State
  // -------------------------------------------------------------------------
  /** Whether theme is mounted (for SSR hydration) */
  mounted: boolean;
  /** Reset to defaults */
  reset: () => void;

  // -------------------------------------------------------------------------
  // Visual mode helpers
  // -------------------------------------------------------------------------
  /** Whether current mode is terminal */
  isTerminalMode: boolean;
  /** Whether current mode uses rounded corners */
  hasRoundedCorners: boolean;
}

// ============================================================================
// CONTEXT
// ============================================================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// STORAGE KEYS
// ============================================================================

const getStorageKeys = (prefix: string) => ({
  colorTheme: `${prefix}-color-theme`,
  visualMode: `${prefix}-visual-mode`,
});

// ============================================================================
// THEME PAIRS (for dark/light toggle)
// ============================================================================

const LIGHT_DARK_PAIRS: Record<ColorThemeName, ColorThemeName> = {
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
// PROVIDER COMPONENT
// ============================================================================

export function ThemeProvider({
  children,
  defaultColorTheme = DEFAULT_COLOR_THEME,
  defaultVisualMode = DEFAULT_VISUAL_MODE,
  storageKeyPrefix = "fabrk",
  persist = true,
  forcedColorTheme,
  forcedVisualMode,
  disableTransitionOnChange = false,
}: ThemeProviderProps): React.ReactElement {
  const storageKeys = getStorageKeys(storageKeyPrefix);

  // State
  const [colorTheme, setColorThemeState] = useState<ColorThemeName>(
    forcedColorTheme || defaultColorTheme
  );
  const [visualMode, setVisualModeState] = useState<VisualModeName>(
    forcedVisualMode || defaultVisualMode
  );
  const [mounted, setMounted] = useState(false);

  // -------------------------------------------------------------------------
  // Initialize from storage
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don't load from storage if forced
    if (!forcedColorTheme && persist) {
      const stored = localStorage.getItem(storageKeys.colorTheme);
      if (stored && isColorThemeName(stored)) {
        setColorThemeState(stored);
      }
    }

    if (!forcedVisualMode && persist) {
      const stored = localStorage.getItem(storageKeys.visualMode);
      if (stored && isVisualModeName(stored)) {
        setVisualModeState(stored);
      }
    }

    setMounted(true);
  }, [persist, forcedColorTheme, forcedVisualMode, storageKeys]);

  // -------------------------------------------------------------------------
  // Apply theme to DOM
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Disable transitions during theme change
    if (disableTransitionOnChange) {
      root.style.setProperty("--transition-duration", "0ms");
    }

    // Apply color theme
    root.setAttribute("data-theme", colorTheme);

    // Apply visual mode
    root.setAttribute("data-visual-mode", visualMode);

    // Apply dark class for Tailwind dark mode
    if (isDarkTheme(colorTheme)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Re-enable transitions
    if (disableTransitionOnChange) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.style.removeProperty("--transition-duration");
        });
      });
    }

    // Persist
    if (persist && typeof window !== "undefined") {
      if (!forcedColorTheme) {
        localStorage.setItem(storageKeys.colorTheme, colorTheme);
      }
      if (!forcedVisualMode) {
        localStorage.setItem(storageKeys.visualMode, visualMode);
      }
    }
  }, [
    colorTheme,
    visualMode,
    mounted,
    persist,
    forcedColorTheme,
    forcedVisualMode,
    disableTransitionOnChange,
    storageKeys,
  ]);

  // -------------------------------------------------------------------------
  // Setters
  // -------------------------------------------------------------------------
  const setColorTheme = useCallback(
    (theme: ColorThemeName) => {
      if (forcedColorTheme) return;
      if (isColorThemeName(theme)) {
        setColorThemeState(theme);
      }
    },
    [forcedColorTheme]
  );

  const setVisualMode = useCallback(
    (mode: VisualModeName) => {
      if (forcedVisualMode) return;
      if (isVisualModeName(mode)) {
        setVisualModeState(mode);
      }
    },
    [forcedVisualMode]
  );

  const toggleDark = useCallback(() => {
    if (forcedColorTheme) return;
    const paired = LIGHT_DARK_PAIRS[colorTheme];
    setColorThemeState(paired);
  }, [colorTheme, forcedColorTheme]);

  const reset = useCallback(() => {
    if (!forcedColorTheme) {
      setColorThemeState(defaultColorTheme);
    }
    if (!forcedVisualMode) {
      setVisualModeState(defaultVisualMode);
    }
  }, [defaultColorTheme, defaultVisualMode, forcedColorTheme, forcedVisualMode]);

  // -------------------------------------------------------------------------
  // Context value
  // -------------------------------------------------------------------------
  const value = useMemo<ThemeContextValue>(
    () => ({
      colorTheme,
      setColorTheme,
      isDark: isDarkTheme(colorTheme),
      toggleDark,
      colorThemes: COLOR_THEME_NAMES,
      visualMode,
      setVisualMode,
      visualModes: VISUAL_MODE_NAMES,
      mounted,
      reset,
      isTerminalMode: visualMode === "terminal",
      hasRoundedCorners: visualMode !== "terminal",
    }),
    [colorTheme, setColorTheme, toggleDark, visualMode, setVisualMode, mounted, reset]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * Access theme context
 *
 * @throws If used outside ThemeProvider
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
}

/**
 * Access theme context (optional - returns undefined if outside provider)
 */
export function useOptionalThemeContext(): ThemeContextValue | undefined {
  return useContext(ThemeContext);
}

// ============================================================================
// SCRIPT FOR SSR
// ============================================================================

/**
 * Script to prevent theme flash during SSR
 * Include this in your HTML head
 */
export const ThemeScript = ({
  storageKeyPrefix = "fabrk",
  defaultColorTheme = DEFAULT_COLOR_THEME,
  defaultVisualMode = DEFAULT_VISUAL_MODE,
}: {
  storageKeyPrefix?: string;
  defaultColorTheme?: ColorThemeName;
  defaultVisualMode?: VisualModeName;
}): React.ReactElement => {
  const script = `
(function() {
  try {
    var colorTheme = localStorage.getItem('${storageKeyPrefix}-color-theme') || '${defaultColorTheme}';
    var visualMode = localStorage.getItem('${storageKeyPrefix}-visual-mode') || '${defaultVisualMode}';
    document.documentElement.setAttribute('data-theme', colorTheme);
    document.documentElement.setAttribute('data-visual-mode', visualMode);
    if (['dark','synthwave','halloween','forest','aqua','luxury','dracula','business'].includes(colorTheme)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
  `.trim();

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
};

export default ThemeProvider;
