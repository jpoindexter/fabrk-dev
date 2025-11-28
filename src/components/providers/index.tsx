"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

/**
 * Client-side providers
 * DaisyUI theme system (data-theme attribute)
 * PostHog analytics initialized via instrumentation-client.ts (Next.js 15+)
 * Dark/light mode toggle removed in favor of 20 color themes
 * SessionProvider for next-auth useSession hook
 */

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          className: "!rounded-none border border-border font-mono text-xs",
          style: {
            borderRadius: 0,
          },
        }}
      />
    </SessionProvider>
  );
}
