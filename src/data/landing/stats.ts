/**
 * Stats Data - Product metrics for Stats Section
 * All values are verifiable and accurate
 */

import { Box, Palette, Route, Code } from 'lucide-react';

export const STATS = [
  {
    id: 'components',
    label: 'UI COMPONENTS',
    value: '70+',
    icon: Box,
  },
  {
    id: 'themes',
    label: 'COLOR THEMES',
    value: '12',
    icon: Palette,
  },
  {
    id: 'routes',
    label: 'ROUTES',
    value: '250+',
    icon: Route,
  },
  {
    id: 'typescript',
    label: 'TYPESCRIPT',
    value: '100%',
    icon: Code,
  },
] as const;
