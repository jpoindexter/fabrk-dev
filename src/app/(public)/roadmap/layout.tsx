'use client';

import { useRef } from 'react';
import { DocsSidebar, NavSection } from '@/components/docs/docs-sidebar';
import { DocsToc } from '@/components/docs/docs-toc';
import { ROADMAP } from '@/data/roadmap';
import { Milestone } from 'lucide-react';

// Build navigation from roadmap data
function buildRoadmapNavigation(): NavSection[] {
  return ROADMAP.map((section) => ({
    title: section.title,
    id: `phase-${section.phase}`,
    items: section.items.map((item) => ({
      title: item.title,
      href: `/roadmap#phase-${section.phase}`,
      icon: Milestone,
    })),
  }));
}

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const navigation = buildRoadmapNavigation();

  return (
    <div className="flex flex-1">
      <DocsSidebar
        navigation={navigation}
        formatSectionTitle={(title) => `[${title}]`}
        formatItemTitle={(title) => title}
      />

      <main ref={mainRef} className="min-w-0 flex-1">
        <div className="mx-auto max-w-3xl px-6 py-8 lg:px-8">{children}</div>
      </main>

      <DocsToc mainRef={mainRef} />
    </div>
  );
}
