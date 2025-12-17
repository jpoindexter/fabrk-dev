/**
 * Components Grid - 25+ diverse component types across 4 columns
 */
'use client';

import { GridColumnOne, GridColumnTwo, GridColumnThree, GridColumnFour } from './grid-columns';

export function ComponentsGrid() {
  return (
    <div className="grid items-start gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
      <GridColumnOne />
      <GridColumnTwo />
      <GridColumnThree />
      <GridColumnFour />
    </div>
  );
}
