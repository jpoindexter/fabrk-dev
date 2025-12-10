'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/design-system/providers';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { env } from '@/lib/env';

/**
 * Client-side providers
 *
 * Provider hierarchy:
 * 1. SessionProvider - NextAuth session management
 * 2. ThemeProvider - Design system theme/visual mode management
 *
 * Theme System:
 * - Color themes: Light and Dark
 * - Visual modes: Terminal (sharp, monospace) and Modern (rounded, sans-serif)
 * - Persisted to localStorage with SSR flash prevention
 *
 * PostHog analytics initialized via instrumentation-client.ts (Next.js 15+)
 */

interface ProvidersProps {
  children: ReactNode;
  /** Default color theme (defaults to "light") */
  defaultColorTheme?: 'light' | 'dark';
  /** Default visual mode (defaults to "terminal") */
  defaultVisualMode?: 'terminal' | 'modern';
}

export function Providers({
  children,
  defaultColorTheme = 'light',
  defaultVisualMode,
}: ProvidersProps) {
  // Read from environment variable, fallback to prop
  const visualTheme = defaultVisualMode || env.client.NEXT_PUBLIC_DEFAULT_VISUAL_THEME;

  return (
    <SessionProvider>
      <ThemeProvider
        defaultColorTheme={defaultColorTheme}
        defaultVisualMode={visualTheme}
        storageKeyPrefix="fabrk-theme"
      >
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
