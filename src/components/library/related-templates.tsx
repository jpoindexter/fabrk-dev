/**
 * Related Templates Component
 * Shows similar templates based on category, features, and badges
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader } from '@/components/ui/card';
import type { Template } from '@/app/(marketing)/library/library-data';
import { templates } from '@/app/(marketing)/library/library-data';
import { getRelatedTemplates } from '@/lib/search';

export interface RelatedTemplatesProps {
  currentTemplateId: string;
  limit?: number;
}

export function RelatedTemplates({ currentTemplateId, limit = 3 }: RelatedTemplatesProps) {
  // Find current template
  const currentTemplate = templates.find((t) => t.id === currentTemplateId);

  if (!currentTemplate) {
    return null;
  }

  // Get related templates using search algorithm
  const relatedTemplates = getRelatedTemplates(currentTemplate, templates, limit);

  if (relatedTemplates.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader code="0xFF" title="RELATED TEMPLATES" />
      <div className="p-4">
        <p className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [RECOMMENDED]: Templates similar to {currentTemplate.name}
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relatedTemplates.map((template) => (
            <Link key={template.id} href={template.href} className="group">
              <div className="border-border bg-card hover:border-primary/50 h-full border transition-all">
                {/* Card Header */}
                <div className="border-border flex items-center justify-between border-b px-3 py-2">
                  <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                    [{template.id.toUpperCase()}]
                  </span>
                  <template.icon className="text-muted-foreground size-4" />
                </div>

                {/* Card Content */}
                <div className="flex flex-col p-3">
                  {/* Badge */}
                  {template.badge && (
                    <div className="border-primary/50 text-primary mb-2 w-fit border px-2 py-0.5">
                      <span className={cn(mode.font, 'text-xs')}>
                        {template.badge.toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className={cn(
                      mode.font,
                      'group-hover:text-primary mb-2 text-sm font-semibold transition-colors'
                    )}
                  >
                    {template.name}
                  </h3>

                  {/* Description */}
                  <p className={cn(mode.font, 'text-muted-foreground mb-3 line-clamp-2 text-xs')}>
                    {template.description}
                  </p>

                  {/* Features (max 2) */}
                  <div className="mt-auto">
                    <div className={cn(mode.font, 'text-muted-foreground mb-1 text-xs')}>
                      [FEATURES]:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className={cn(mode.font, 'border-border border px-2 py-0.5 text-xs')}
                        >
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 2 && (
                        <span className={cn(mode.font, 'border-border border px-2 py-0.5 text-xs')}>
                          +{template.features.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="border-border mt-3 flex items-center justify-between border-t pt-2">
                    <span
                      className={cn(
                        mode.font,
                        'text-primary group-hover:text-primary/80 text-xs transition-colors'
                      )}
                    >
                      &gt; VIEW
                    </span>
                    <ArrowRight
                      className={cn(
                        'text-muted-foreground h-3 w-3 transition-transform group-hover:translate-x-1'
                      )}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}
