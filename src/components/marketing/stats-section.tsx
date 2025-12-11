'use client';

import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { StatCard } from '@/components/landing/stat-card';
import { STATS } from '@/data/landing';

/**
 * Stats Section
 * Shows trust indicators - users, components, time saved, satisfaction
 * Grid layout with animated stat cards
 */
export function StatsSection() {
  return (
    <section className="border-border border-t py-16 lg:py-24">
      <Container>
        <SectionHeader
          badge="TRUST INDICATORS"
          code="0x20"
          title="BATTLE-TESTED BY BUILDERS"
          description="Real developers shipping real products. These numbers represent actual time saved and projects launched."
          align="center"
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.id}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
