/**
 * ✅ FABRK COMPONENT
 * Footer Component - Minimal
 * Production-ready ✓
 */

import { tokens } from "@/lib/design-system/tokens";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-6 dark:border-border">
      <div className={`mx-auto max-w-6xl ${tokens.spacing.px[6]}`}>
        <div className="flex items-center justify-between">
          <p className={`${tokens.text.size.sm} text-muted-foreground dark:text-muted-foreground`}>
            © 2024 Fabrk. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className={`${tokens.text.size.sm} text-muted-foreground transition-colors hover:text-foreground dark:text-foreground`}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className={`${tokens.text.size.sm} text-muted-foreground transition-colors hover:text-foreground dark:text-foreground`}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
