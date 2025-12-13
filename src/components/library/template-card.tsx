/**
 * TemplateCard - Reusable card for template listings
 * Uses design system Card components properly
 * Supports both featured and regular variants
 */
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
  features: string[];
  badge?: string;
  /** File path hint for developers */
  filePath?: string;
  /** Dependencies required */
  dependencies?: string[];
  /** Whether this is a featured template */
  featured?: boolean;
}

export function TemplateCard({
  id,
  name,
  description,
  href,
  icon: Icon,
  features,
  badge,
  filePath,
  dependencies,
  featured = false,
}: TemplateCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card
        interactive
        size="full"
        tone={featured ? 'primary' : 'neutral'}
        className="h-full transition-all"
      >
        <CardHeader
          code={featured ? '0xFEAT' : undefined}
          title={id.toUpperCase().replace(/-/g, '_')}
          icon={
            <Icon className={cn('size-4', featured ? 'text-primary' : 'text-muted-foreground')} />
          }
        />
        <CardContent padding="md" className="flex flex-col">
          {/* Title + Badge Row */}
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3
              className={cn(
                mode.font,
                'group-hover:text-primary text-base font-semibold transition-colors'
              )}
            >
              {name}
            </h3>
            {badge && (
              <Badge variant="outline" className={cn(mode.font, 'shrink-0 text-xs')}>
                {badge.toUpperCase()}
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className={cn(mode.font, 'text-muted-foreground mb-4 text-xs leading-relaxed')}>
            {description}
          </p>

          {/* File Path (dev-focused) */}
          {filePath && (
            <div className={cn(mode.font, 'text-muted-foreground mb-3 text-xs')}>
              <span className="text-muted-foreground/60">PATH:</span>{' '}
              <code className="text-primary/80">{filePath}</code>
            </div>
          )}

          {/* Features + Dependencies */}
          <div className="mt-auto space-y-2">
            {/* Dependencies */}
            {dependencies && dependencies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {dependencies.map((dep) => (
                  <span
                    key={dep}
                    className={cn(
                      mode.font,
                      'border-warning/30 bg-warning/10 text-warning border px-1.5 py-0.5 text-xs'
                    )}
                  >
                    {dep}
                  </span>
                ))}
              </div>
            )}

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 3).map((feature) => (
                <span
                  key={feature}
                  className={cn(
                    mode.font,
                    'border-border bg-muted/50 border px-1.5 py-0.5 text-xs'
                  )}
                >
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span
                  className={cn(
                    mode.font,
                    'border-border bg-muted/50 border px-1.5 py-0.5 text-xs'
                  )}
                >
                  +{features.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="border-border mt-4 flex items-center justify-between border-t pt-3">
            <span
              className={cn(
                mode.font,
                'text-primary group-hover:text-primary/80 text-xs transition-colors'
              )}
            >
              &gt; VIEW
            </span>
            <span
              className={cn(
                mode.font,
                'text-muted-foreground text-xs transition-transform group-hover:translate-x-1'
              )}
            >
              →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
