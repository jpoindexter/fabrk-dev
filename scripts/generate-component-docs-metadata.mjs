#!/usr/bin/env node
/**
 * Generate Metadata for Component Documentation Pages
 * Creates layout.tsx files with SEO metadata
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const componentMetadata = {
  'advanced-filters': {
    title: 'Advanced Filters Component',
    description:
      'Comprehensive filtering component with date ranges, search, status filters, and clear all functionality. Terminal-styled for SaaS dashboards.',
  },
  'library-navigation': {
    title: 'Library Navigation Component',
    description:
      'Sidebar navigation component for template libraries with category grouping and active state management.',
  },
  'related-templates': {
    title: 'Related Templates Component',
    description:
      'Template suggestion component showing related templates with previews and navigation. Improves template discoverability.',
  },
};

function generateLayoutContent(componentKey, metadata) {
  const title = metadata.title;
  const description = metadata.description;

  return `/**
 * ${title} - Documentation Layout
 * Auto-generated SEO metadata
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title} | Fabrk',
  description: '${description}',
  openGraph: {
    title: '${title} | Fabrk Documentation',
    description: '${description}',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${title} | Fabrk',
    description: '${description}',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`;
}

function createLayoutForComponent(dirPath, componentKey) {
  const layoutPath = path.join(dirPath, 'layout.tsx');

  if (fs.existsSync(layoutPath)) {
    console.log(`⏭️  Skipping ${componentKey} (layout exists)`);
    return false;
  }

  const metadata = componentMetadata[componentKey];
  if (!metadata) {
    console.log(`⚠️  No metadata template for ${componentKey}`);
    return false;
  }

  const content = generateLayoutContent(componentKey, metadata);
  fs.writeFileSync(layoutPath, content, 'utf8');
  console.log(`✅ Created layout for ${componentKey}`);
  return true;
}

function main() {
  const docsPath = path.join(projectRoot, 'src/app/docs/components');

  const components = ['advanced-filters', 'library-navigation', 'related-templates'];

  let created = 0;
  let skipped = 0;

  console.log('🚀 Generating component documentation metadata...\n');

  components.forEach((comp) => {
    const fullPath = path.join(docsPath, comp);
    if (fs.existsSync(fullPath)) {
      const result = createLayoutForComponent(fullPath, comp);
      if (result) created++;
      else skipped++;
    }
  });

  console.log(`\n✨ Complete! Created ${created} layouts, skipped ${skipped}`);
}

main();
