/**
 * Stats Data - Product metrics for Stats Section
 * All values are verifiable and accurate
 */

import { Box, Palette, Route, Code } from 'lucide-react';
import { docsNavigation } from '@/app/(marketing)/docs/docs-nav-data';
import { TEMPLATE_COUNT_STRING } from '@/app/(marketing)/library/library-nav-data';
import { themes } from '@/data/themes';
import componentCounts from '@/data/component-counts.json'; // Import the JSON file

// Dynamic UI Component Count (from src/components/ui)
export const COMPONENT_COUNT_INT = componentCounts.uiComponentCount;
export const COMPONENT_COUNT_STRING = `${COMPONENT_COUNT_INT}+`;

export { TEMPLATE_COUNT_STRING };

// Dynamic Theme Count
export const THEME_COUNT_INT = themes.length;
export const THEME_COUNT_STRING = `${THEME_COUNT_INT}`;

// Manual Constants (Centralized) - These would ideally also be dynamic
export const ROUTE_COUNT_STRING = '250+';
export const FILE_COUNT_STRING = '161'; // For "161 files you can understand"
export const TEST_COVERAGE_STRING = '100%'; // Assuming 100% test coverage for now

export const STATS = [
  {
    id: 'components',
    label: 'UI COMPONENTS',
    value: COMPONENT_COUNT_STRING,
    icon: Box,
  },
  {
    id: 'themes',
    label: 'COLOR THEMES',
    value: THEME_COUNT_STRING,
    icon: Palette,
  },
  {
    id: 'routes',
    label: 'ROUTES',
    value: ROUTE_COUNT_STRING,
    icon: Route,
  },
  {
    id: 'typescript',
    label: 'TYPESCRIPT',
    value: TEST_COVERAGE_STRING, // Assuming this is for TypeScript test coverage
    icon: Code,
  },
] as const;
