/**
 * DocsCard - Terminal-style card wrapper for documentation content
 * Matches the landing page card aesthetic with [ [0xXX] TITLE ] format
 */

import { cn } from "@/lib/utils";

interface DocsCardProps {
  /** Card content */
  children: React.ReactNode;
  /** Optional className for custom styling */
  className?: string;
  /** Hex code like "01", "0A" - will be formatted as 0x01, 0x0A */
  code?: string;
  /** Terminal header title */
  title?: string;
}

export function DocsCard({ children, className, code, title }: DocsCardProps) {
  const hasHeader = code || title;
  // Strip [0x and ] if present since we add them in the template
  const hexCode = code?.replace(/^\[0x/, '').replace(/\]$/, '') || "00";
  const headerTitle = title?.toUpperCase().replace(/\s+/g, '_') || "INFO";

  return (
    <div className={cn("border border-border bg-card", className)}>
      {hasHeader && (
        <div className="border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            [ [0x{hexCode}] {headerTitle} ]
          </span>
        </div>
      )}
      <div className="p-4 font-mono text-sm text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
