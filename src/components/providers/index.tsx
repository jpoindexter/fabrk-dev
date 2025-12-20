'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { ThemeProvider, type ColorThemeName } from '@/design-system/providers';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

/**
 * Client-side providers
 *
 * Provider hierarchy:
 * 1. SessionProvider - NextAuth session management
 * 2. ThemeProvider - Design system color theme management
 *
 * Theme System:
 * - Color themes: Light and Dark
 * - Terminal aesthetic (sharp edges, monospace font) is enforced globally
 * - Persisted to localStorage with SSR flash prevention
 */

interface ProvidersProps {
  children: ReactNode;
  /** Default color theme (defaults to "green") */
  defaultColorTheme?: ColorThemeName;
}

export function Providers({ children, defaultColorTheme = 'green' }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider defaultColorTheme={defaultColorTheme} storageKeyPrefix="fabrk-theme">
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            className: cn('border border-border text-xs', mode.radius, mode.font),
          }}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}
