/**
 * Changelog Page
 * Version history and release notes - Terminal style
 */

import { Metadata } from 'next';
import { CHANGELOG } from '@/data/changelog';
import { Badge } from '@/components/ui/card';
import { ChangelogEntry } from '@/components/changelog';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

export const metadata: Metadata = {
  title: 'Changelog | Fabrk',
  description: 'Version history and release notes for Fabrk SaaS boilerplate.',
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="mb-8">
            <Badge code="0x00" label="CHANGELOG" meta="VERSION HISTORY" />
          </div>
          <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>[FABRK RELEASES]:</p>
          <h1 className={cn('mb-4 text-sm font-bold tracking-tight', mode.font)}>
            VERSION HISTORY
          </h1>
          <p className={cn('text-muted-foreground mx-auto max-w-2xl text-sm', mode.font)}>
            Track every update, improvement, and fix. All changes are documented here.
          </p>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-8">
          {CHANGELOG.map((entry, index) => (
            <ChangelogEntry key={entry.version} entry={entry} index={index} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className={cn('text-muted-foreground text-xs', mode.font)}>
            [EOF] - End of changelog. Run{' '}
            <code className="bg-muted px-1 py-0.5">npm run sync:changelog</code> to fetch latest
            releases.
          </p>
        </div>
      </div>
    </div>
  );
}
