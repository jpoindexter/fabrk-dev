/**
 * Roadmap Page
 * Product roadmap - Terminal style matching changelog
 */

import { Metadata } from 'next';
import { ROADMAP } from '@/data/roadmap';
import { Badge } from '@/components/ui/card';
import { RoadmapEntry } from '@/components/roadmap';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export const metadata: Metadata = {
  title: 'Roadmap | Fabrk',
  description: 'See what we are building next. Product roadmap and planned features for Fabrk.',
};

export default function RoadmapPage() {
  return (
    <>
      {/* Hero */}
      <div className="border-border mb-12 border-b pb-8">
        <div className="mb-4">
          <Badge code="0x00" label="ROADMAP" meta="PRODUCT DIRECTION" />
        </div>
        <h1 className={cn('mb-2 text-lg font-bold', mode.font)}>PRODUCT ROADMAP</h1>
        <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
          See what we have shipped and what we are building next. Priorities shift based on customer
          feedback.
        </p>
      </div>

      {/* Roadmap Entries */}
      <div className="space-y-12">
        {ROADMAP.map((section, index) => (
          <section key={section.phase} className="scroll-mt-20">
            <h2 id={`phase-${section.phase}`} className={cn('mb-4 text-sm font-semibold', mode.font)}>
              {section.phase} - {section.title}
            </h2>
            <RoadmapEntry section={section} index={index} />
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="border-border mt-16 border-t pt-8">
        <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
          [REQUEST]: Have a feature idea? Email{' '}
          <a href="mailto:support@fabrk.dev" className="text-primary hover:underline">
            support@fabrk.dev
          </a>
        </p>
        <p className={cn('text-muted-foreground text-xs', mode.font)}>[EOF] - End of roadmap</p>
      </div>
    </>
  );
}
