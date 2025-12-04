/**
 * ✅ FABRK COMPONENT
 * PageWrapper - Centered page layout wrapper for auth and standalone pages
 *
 * @example
 * ```tsx
 * <PageWrapper>
 *   <Card>Your content</Card>
 * </PageWrapper>
 * ```
 */

import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div
      className={cn(
        "bg-muted/30 flex min-h-screen items-center justify-center px-4 py-12",
        className
      )}
    >
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
