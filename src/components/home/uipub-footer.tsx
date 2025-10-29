/**
 * ✅ FABRK COMPONENT
 * Footer - UI Pub Style
 * Production-ready ✓
 */

import Link from "next/link";

export function UIPubFooter() {
  return (
    <footer className="border-t border-border bg-white py-12">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 Fabrk. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/license"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              License
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
