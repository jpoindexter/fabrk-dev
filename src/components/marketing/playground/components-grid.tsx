/**
 * Components Grid - 25+ diverse component types across 4 columns
 */
'use client';

import { GridColumnOne, GridColumnTwo, GridColumnThree, GridColumnFour } from './grid-columns';
import { Reveal } from '@/components/motion';

export function ComponentsGrid() {
  return (
    <div className="grid items-start gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
      <Reveal delay={0}>
        <GridColumnOne />
      </Reveal>
      <Reveal delay={100}>
        <GridColumnTwo />
      </Reveal>
      <Reveal delay={200}>
        <GridColumnThree />
      </Reveal>
      <Reveal delay={300}>
        <GridColumnFour />
      </Reveal>
    </div>
  );
}
