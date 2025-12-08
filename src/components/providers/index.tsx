"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/design-system/providers";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

/**
 * Client-side providers
 *
 * Provider hierarchy:
 * 1. SessionProvider - NextAuth session management
 * 2. ThemeProvider - Design system theme/visual mode management
 *
 * Theme System:
 * - Color themes: 20 DaisyUI themes (light, dark, dracula, etc.)
 * - Visual modes: terminal, modern, minimal, linear
 * - Persisted to localStorage with SSR flash prevention
 *
 * PostHog analytics initialized via instrumentation-client.ts (Next.js 15+)
 */

interface ProvidersProps {
  children: ReactNode;
  /** Default color theme (defaults to "light") */
  defaultColorTheme?: "light" | "dark";
  /** Default visual mode (defaults to "terminal") */
  defaultVisualMode?: "terminal" | "modern" | "minimal" | "linear";
}

export function Providers({
  children,
  defaultColorTheme = "light",
  defaultVisualMode = "terminal",
}: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider
        defaultColorTheme={defaultColorTheme}
        defaultVisualMode={defaultVisualMode}
        storageKeyPrefix="fabrk"
        persist={true}
      >
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            className: cn("border border-border text-xs", mode.radius, mode.font),
          }}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}
