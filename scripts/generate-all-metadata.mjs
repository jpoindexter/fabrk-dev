#!/usr/bin/env node
/**
 * Master Metadata Generator
 * Scans all pages and generates layout.tsx files with metadata
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

async function getAllPageFiles() {
  const pattern = 'src/app/**/page.tsx';
  const files = await glob(pattern, { cwd: projectRoot });
  return files.map((f) => path.join(projectRoot, f));
}

function hasMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return (
      content.includes('export const metadata') ||
      content.includes('export async function generateMetadata')
    );
  } catch (e) {
    return false;
  }
}

function hasLayout(dir) {
  return fs.existsSync(path.join(dir, 'layout.tsx'));
}

function generateTitle(dirPath) {
  const relativePath = dirPath.replace(path.join(projectRoot, 'src/app'), '');
  const parts = relativePath
    .split('/')
    .filter((p) => p && !p.startsWith('(') && !p.endsWith(')'));

  if (parts.length === 0) return 'Home';

  const lastPart = parts[parts.length - 1];
  return lastPart
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateDescription(dirPath, title) {
  const relativePath = dirPath.replace(path.join(projectRoot, 'src/app'), '');

  // Component docs
  if (relativePath.includes('/docs/components/')) {
    return `${title} component documentation with examples, props, and usage guidelines. Terminal-styled UI component for modern SaaS applications.`;
  }

  // Feature docs
  if (relativePath.includes('/docs/features/')) {
    return `${title} feature guide with implementation steps, code examples, and best practices for Fabrk boilerplate.`;
  }

  // Security docs
  if (relativePath.includes('/docs/security/')) {
    return `${title} security guide. Learn how to implement secure ${title.toLowerCase()} in your SaaS application.`;
  }

  // Design docs
  if (relativePath.includes('/docs/design/')) {
    return `${title} design guide for the Fabrk terminal-styled design system. Patterns, tokens, and best practices.`;
  }

  // Deployment docs
  if (relativePath.includes('/docs/deployment/')) {
    return `${title} deployment guide. Step-by-step instructions for deploying your Fabrk application.`;
  }

  // Library templates
  if (relativePath.includes('/library/')) {
    return `${title} template - production-ready, copy-paste component with terminal design system styling.`;
  }

  // Generic
  return `${title} - Fabrk SaaS boilerplate with terminal-styled design system and production-ready features.`;
}

function generateLayoutContent(dirPath) {
  const title = generateTitle(dirPath);
  const description = generateDescription(dirPath, title);

  return `/**
 * ${title} - Layout with Metadata
 * Auto-generated SEO metadata
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title} | Fabrk',
  description: '${description}',
  openGraph: {
    title: '${title} | Fabrk',
    description: '${description}',
    type: 'website',
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

async function main() {
  console.log('🚀 Scanning all pages for metadata...\n');

  const allPages = await getAllPageFiles();
  const pagesNeedingMetadata = [];

  for (const pagePath of allPages) {
    // Skip if page already has metadata
    if (hasMetadata(pagePath)) continue;

    const dir = path.dirname(pagePath);

    // Skip if directory already has a layout
    if (hasLayout(dir)) continue;

    pagesNeedingMetadata.push({ pagePath, dir });
  }

  console.log(`Found ${pagesNeedingMetadata.length} pages needing metadata\n`);

  let created = 0;
  let errors = 0;

  for (const { dir, pagePath } of pagesNeedingMetadata) {
    try {
      const layoutPath = path.join(dir, 'layout.tsx');
      const content = generateLayoutContent(dir);
      fs.writeFileSync(layoutPath, content, 'utf8');

      const relativePath = pagePath.replace(projectRoot, '');
      console.log(`✅ Created ${relativePath}`);
      created++;
    } catch (error) {
      console.error(`❌ Error: ${pagePath}`, error.message);
      errors++;
    }
  }

  console.log(`\n✨ Complete!`);
  console.log(`   Created: ${created} layouts`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total pages now with metadata: ${allPages.length - pagesNeedingMetadata.length + created}`);
}

main().catch(console.error);
