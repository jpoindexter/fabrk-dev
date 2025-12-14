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
    <div className={cn('mb-16 max-w-3xl', containerClass, alignClass)}>
      <Badge variant="outline" className="mb-6">
        [{code}] {badge}
      </Badge>

      <h2
        className={cn(
          'mb-6 text-4xl leading-tight font-semibold tracking-tight lg:text-5xl',
          mode.font
        )}
      >
        {title}
      </h2>

      <p className={cn('text-sm leading-relaxed', mode.color.text.muted)}>{description}</p>
    </div>
  );
}
