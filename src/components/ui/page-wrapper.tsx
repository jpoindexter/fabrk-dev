/**
 * ✅ FABRK COMPONENT
 * Page wrapper component for auth pages
 * Provides centered container with padding
 *
 * @example
 * ```tsx
 * <PageWrapper>
 *   <LoginForm />
 * </PageWrapper>
 * ```
 */

import { cn } from "@/lib/cn";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div
      data-slot="page-wrapper"
      className={cn(
        // Center content
        "flex min-h-screen items-center justify-center",
        // Padding - 8px spacing system
        "px-4 py-8",
        // Light/dark mode support
        "bg-background",
        className
      )}
    >
      {children}
    </div>
  );
}
