/**
 * DocsNavFooter - Previous/Next navigation links
 */

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { docsTypography } from "../typography";

interface NavLink {
  title: string;
  href: string;
}

interface DocsNavFooterProps {
  /** Previous page link */
  previous?: NavLink;
  /** Next page link */
  next?: NavLink;
}

export function DocsNavFooter({ previous, next }: DocsNavFooterProps) {
  if (!previous && !next) return null;

  return (
    <nav className="flex items-center justify-between border-t border-border pt-6 mt-16">
      {previous ? (
        <Link
          href={previous.href}
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <div>
            <p className={`${docsTypography.caption} uppercase`}>Previous</p>
            <p className={`${docsTypography.h4} uppercase group-hover:text-primary`}>
              {previous.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex items-center gap-2 text-right text-muted-foreground hover:text-foreground transition-colors"
        >
          <div>
            <p className={`${docsTypography.caption} uppercase`}>Next</p>
            <p className={`${docsTypography.h4} uppercase group-hover:text-primary`}>
              {next.title}
            </p>
          </div>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
