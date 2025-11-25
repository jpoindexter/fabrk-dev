"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";

/**
 * Client-side providers
 * Only DaisyUI theme system (data-theme attribute) is used
 * Dark/light mode toggle removed in favor of 20 color themes
 * Authentication removed - no SessionProvider needed
 */

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors />
    </>
  );
}
