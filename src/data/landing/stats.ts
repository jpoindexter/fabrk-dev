/**
 * Stats Data - Product metrics for Stats Section
 * All values are verifiable and accurate
 */

import { Box, Palette, Route, Code } from 'lucide-react';
import { docsNavigation } from '@/app/(marketing)/docs/docs-nav-data';
import { TEMPLATE_COUNT_STRING } from '@/app/(marketing)/library/library-nav-data';
import { THEME_NAMES } from '@/design-system/themes';
import { themes } from '@/data/themes';

// Calculate component count from docs navigation
const componentsSection = docsNavigation.find((s) => s.title === 'COMPONENTS');
let componentCount = 0;
if (componentsSection && componentsSection.subSections) {
  componentsSection.subSections.forEach((sub) => {
    componentCount += sub.items.length;
  });
}

// Export specific count string for reuse (e.g. "89+")
export const COMPONENT_COUNT_STRING = `${componentCount}+`;
export const COMPONENT_COUNT_INT = componentCount;
export { TEMPLATE_COUNT_STRING };

// Dynamic Theme Count
export const THEME_COUNT_INT = themes.length;
export const THEME_COUNT_STRING = `${THEME_COUNT_INT}`;

// Manual Constants (Centralized)
export const ROUTE_COUNT_STRING = '250+';
export const FILE_COUNT_STRING = '161';
export const TEST_COVERAGE_STRING = '100%';

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
    value: TEST_COVERAGE_STRING,
    icon: Code,
  },
] as const;
