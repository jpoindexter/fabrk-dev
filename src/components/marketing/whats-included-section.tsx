'use client';

import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { INCLUDED_FEATURES } from '@/data/landing/included-features';
import { Check } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

/**
 * What's Included Section
 * Checklist of table-stakes features (Auth/Billing/Multi-tenancy)
 * Moves commodity features from spotlight to "included, not featured"
 */
export function WhatsIncludedSection() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="INCLUDED"
          code="0x45"
          title="EVERYTHING YOU NEED TO SHIP"
          description="Full-stack SaaS infrastructure, no assembly required"
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(INCLUDED_FEATURES).map(([category, features]) => (
            <Card key={category}>
              <div className={cn('bg-muted/50 border-b px-4 py-2', mode.color.border.default)}>
                <span className={cn('text-xs uppercase', mode.font, mode.color.text.muted)}>
                  [{category}]
                </span>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="text-success mt-0.5 h-4 w-4 shrink-0" />
                      <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
