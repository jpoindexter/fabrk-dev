/**
 * DocsLinkCard - Terminal-style clickable card for navigation links
 * Used in "Next Steps" sections throughout docs
 * Uses [ [0xXX] TITLE ] format for consistency
 */

import Link from "next/link";
import { cn } from "@/lib/utils";

interface DocsLinkCardProps {
  /** Link destination */
  href: string;
  /** Terminal header title */
  title: string;
  /** Card description */
  description: string;
  /** Hex code like "01", "0A" - defaults to "00" */
  code?: string;
  /** Optional className */
  className?: string;
}

export function DocsLinkCard({ href, title, description, code = "00", className }: DocsLinkCardProps) {
  const headerTitle = title.toUpperCase().replace(/\s+/g, '_');

  return (
    <Link href={href} className={cn("block group", className)}>
      <div className="h-full border border-border bg-card transition-all hover:border-primary/50">
        {/* Terminal Header */}
        <div className="border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">
            [ [0x{code}] {headerTitle} ]
          </span>
        </div>
        {/* Content */}
        <div className="p-4">
          <p className="font-mono text-xs text-muted-foreground">
            DESC: {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
