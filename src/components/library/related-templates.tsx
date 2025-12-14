/**
 * Related Templates Component
 * Shows similar templates based on category, features, and badges
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
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
        <p className={cn(mode.font, mode.typography.caption, mode.color.text.muted, 'mb-4')}>
          [RECOMMENDED]: Templates similar to {currentTemplate.name}
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relatedTemplates.map((template) => (
            <Link
              key={template.id}
              href={template.href}
              className="group focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Card interactive size="auto" className="h-full">
                <CardHeader
                  code={template.id.slice(0, 4).toUpperCase()}
                  title={template.id.toUpperCase()}
                  icon={<template.icon className={cn('size-4', mode.color.icon.muted)} />}
                />
                <CardContent padding="md" className="flex flex-1 flex-col">
                  {/* Badge */}
                  {template.badge && (
                    <div
                      className={cn(
                        'mb-2 w-fit border px-2 py-0.5',
                        'border-primary/50',
                        mode.radius
                      )}
                    >
                      <span
                        className={cn(mode.font, mode.typography.caption, mode.color.text.accent)}
                      >
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
                  <p
                    className={cn(
                      mode.font,
                      mode.typography.caption,
                      mode.color.text.muted,
                      'mb-4 line-clamp-2'
                    )}
                  >
                    {template.description}
                  </p>

                  {/* Features (max 2) */}
                  <div className="mt-auto">
                    <div
                      className={cn(
                        mode.font,
                        mode.typography.caption,
                        mode.color.text.muted,
                        'mb-1'
                      )}
                    >
                      [FEATURES]:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className={cn(
                            mode.font,
                            mode.typography.caption,
                            'border px-2 py-0.5',
                            mode.color.border.default,
                            mode.radius
                          )}
                        >
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 2 && (
                        <span
                          className={cn(
                            mode.font,
                            mode.typography.caption,
                            'border px-2 py-0.5',
                            mode.color.border.default,
                            mode.radius
                          )}
                        >
                          +{template.features.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <span className={cn(mode.font, mode.typography.caption, mode.color.text.accent)}>
                    &gt; VIEW
                  </span>
                  <ArrowRight
                    className={cn(
                      'h-3 w-3 transition-transform group-hover:translate-x-1',
                      mode.color.icon.muted
                    )}
                  />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}
