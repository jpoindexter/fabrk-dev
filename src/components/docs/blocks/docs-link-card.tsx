/**
 * DocsLinkCard - Terminal-style clickable card for navigation links
 * Used in "Next Steps" sections throughout docs
 * Uses [ [0xXX] TITLE ] format for consistency
 */

import Link from 'next/link';
import { cn } from '@/lib/utils';

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

export function DocsLinkCard({
  href,
  title,
  description,
  code = '00',
  className,
}: DocsLinkCardProps) {
  const headerTitle = title.toUpperCase().replace(/\s+/g, '_');

  return (
    <Link href={href} className={cn('group block', className)}>
      <div className="border-border bg-card hover:border-primary/50 h-full border transition-all">
        {/* Terminal Header */}
        <div className="border-border border-b px-4 py-2">
          <span className="text-muted-foreground group-hover:text-primary font-mono text-xs transition-colors">
            [ [0x{code}] {headerTitle} ]
          </span>
        </div>
        {/* Content */}
        <div className="p-4">
          <p className="text-muted-foreground font-mono text-xs">
            DESC: {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
