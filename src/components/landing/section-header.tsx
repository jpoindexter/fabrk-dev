/**
 * ✅ FABRK COMPONENT
 * SectionHeader - Reusable badge + title + description pattern
 * Used 8× across landing page sections
 * Production-ready ✓
 */

import { Badge } from '@/components/ui/badge';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge: string;
  code: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  badge,
  code,
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const containerClass = align === 'center' ? 'mx-auto' : '';

  return (
    <div className={cn('mb-12 max-w-3xl', containerClass, alignClass)}>
      <Badge variant="outline" className="mb-4">
        [{code}] {badge}
      </Badge>

      <h2 className={cn('mb-4 text-3xl font-bold tracking-tight lg:text-4xl', mode.font)}>
        {title}
      </h2>

      <p className={cn('text-sm', mode.color.text.muted)}>{description}</p>
    </div>
  );
}
