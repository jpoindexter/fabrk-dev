#!/usr/bin/env node
/**
 * update-markdown-counts.mjs
 *
 * Automatically updates component and theme counts in markdown documentation files.
 * Reads counts from source of truth (component-counts.json, themes.ts) and updates
 * markdown files to prevent drift between code and documentation.
 *
 * Run manually: npm run update-markdown-counts
 * Runs automatically: prebuild hook (before every build)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// =============================================================================
// SOURCE OF TRUTH - Read dynamic counts
// =============================================================================

function getComponentCount() {
  const countsPath = path.join(ROOT, 'src/data/component-counts.json');
  try {
    const data = JSON.parse(fs.readFileSync(countsPath, 'utf8'));
    return data.uiComponentCount;
  } catch (error) {
    console.error('❌ Could not read component-counts.json:', error.message);
    return 77; // Fallback
  }
}

function getThemeCount() {
  const themesPath = path.join(ROOT, 'src/data/themes.ts');
  try {
    const content = fs.readFileSync(themesPath, 'utf8');
    // Count theme objects in the themes array
    const matches = content.match(/id:\s*['"][^'"]+['"]/g);
    return matches ? matches.length : 12; // Fallback to 12
  } catch (error) {
    console.error('❌ Could not read themes.ts:', error.message);
    return 12; // Fallback
  }
}

function getTemplateCount() {
  // Templates are counted from library-nav-data.ts
  const navPath = path.join(ROOT, 'src/app/(marketing)/library/library-nav-data.ts');
  try {
    const content = fs.readFileSync(navPath, 'utf8');
    // Look for TEMPLATE_COUNT_STRING export
    const match = content.match(/TEMPLATE_COUNT_STRING\s*=\s*['"](\d+)\+?['"]/);
    if (match) {
      return parseInt(match[1], 10);
    }
    // Fallback: count items array
    const itemMatches = content.match(/{\s*title:/g);
    return itemMatches ? itemMatches.length : 34;
  } catch (error) {
    console.error('❌ Could not read library-nav-data.ts:', error.message);
    return 34; // Fallback
  }
}

// =============================================================================
// MARKDOWN FILES TO UPDATE
// =============================================================================

const MARKDOWN_FILES = [
  // Root documentation
  'README.md',
  'CLAUDE.md',
  // Getting started
  'docs/01-getting-started/README.md',
  'docs/01-getting-started/DOCUMENTATION_INDEX.md',
  // Components
  'docs/02-components/COMPONENTS-INVENTORY.md',
  // Design
  'docs/08-design/TERMINAL-FLAT-DESIGN-SPEC.md',
  'docs/08-design/COMPONENT-AUTHORING.md',
  'docs/08-design/CUSTOMIZATION-GUIDE.md',
  'docs/08-design/TOKEN-REFERENCE.md',
  'docs/08-design/THEME-GUIDE.md',
  // Launch
  'docs/09-launch/LAUNCH-PREPARATION-SUMMARY.md',
  'docs/09-launch/COMMUNITY-BUILDING-STRATEGY.md',
  // Deployment
  'docs/10-deployment/PRODUCT-HUNT-LAUNCH.md',
  'docs/10-deployment/NPM-PACKAGE-GUIDE.md',
];

// =============================================================================
// REPLACEMENT PATTERNS
// =============================================================================

function getReplacements(componentCount, themeCount, templateCount) {
  return [
    // Component counts - various formats
    {
      // "87 Components" or "77 Components" → correct count
      pattern: /\b\d{2,3}\s+Components\b/gi,
      replacement: `${componentCount} Components`,
    },
    {
      // "77+ components" or "87+ components" → correct count
      pattern: /\b\d{2,3}\+?\s+components\b/gi,
      replacement: `${componentCount}+ components`,
    },
    {
      // **87 Components** or **77 Components** → correct count (bold)
      pattern: /\*\*\d{2,3}\s+Components\*\*/gi,
      replacement: `**${componentCount} Components**`,
    },
    {
      // Component Inventory (77 Components) → correct count
      pattern: /Component Inventory \(\d{2,3} Components\)/gi,
      replacement: `Component Inventory (${componentCount} Components)`,
    },

    // Theme counts - various formats
    {
      // "6 Themes" or "12 Themes" → correct count
      pattern: /\b(6|12|13)\s+Themes\b/g,
      replacement: `${themeCount} Themes`,
    },
    {
      // "(12 themes)" → correct count
      pattern: /\((\d{1,2})\s+themes\)/gi,
      replacement: `(${themeCount} themes)`,
    },
    {
      // "all 12 themes" or "all 6 themes" → correct count
      pattern: /all\s+\d{1,2}\s+themes/gi,
      replacement: `all ${themeCount} themes`,
    },

    // Template counts
    {
      // "28 Templates" or "33 Templates" or "34 Templates" → correct count
      pattern: /\b\d{2}\s+Templates\b/g,
      replacement: `${templateCount} Templates`,
    },

    // Stats line in docs (| 77 Components | 33 Templates | 12 Themes |)
    {
      pattern: /\|\s*\d{2,3}\s+Components\s*\|\s*\d{2}\s+Templates\s*\|\s*\d{1,2}\s+Themes\s*\|/g,
      replacement: `| ${componentCount} Components | ${templateCount} Templates | ${themeCount} Themes |`,
    },
  ];
}

// =============================================================================
// MAIN UPDATE FUNCTION
// =============================================================================

function updateMarkdownFile(filePath, replacements) {
  const fullPath = path.join(ROOT, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⏭️  Skipped (not found): ${filePath}`);
    return { updated: false, changes: 0 };
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let changes = 0;

  for (const { pattern, replacement } of replacements) {
    const originalContent = content;
    content = content.replace(pattern, replacement);
    if (content !== originalContent) {
      changes++;
    }
  }

  if (changes > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Updated: ${filePath} (${changes} patterns matched)`);
    return { updated: true, changes };
  } else {
    console.log(`⏭️  No changes: ${filePath}`);
    return { updated: false, changes: 0 };
  }
}

// =============================================================================
// EXECUTE
// =============================================================================

function main() {
  console.log('\n🔢 Updating markdown documentation counts...\n');

  const componentCount = getComponentCount();
  const themeCount = getThemeCount();
  const templateCount = getTemplateCount();

  console.log(`📊 Source of truth:`);
  console.log(`   - Components: ${componentCount}`);
  console.log(`   - Themes: ${themeCount}`);
  console.log(`   - Templates: ${templateCount}`);
  console.log('');

  const replacements = getReplacements(componentCount, themeCount, templateCount);

  let totalUpdated = 0;
  let totalChanges = 0;

  for (const file of MARKDOWN_FILES) {
    const result = updateMarkdownFile(file, replacements);
    if (result.updated) {
      totalUpdated++;
      totalChanges += result.changes;
    }
  }

  console.log('');
  console.log(`📝 Summary: ${totalUpdated} files updated, ${totalChanges} total changes`);
  console.log('');
}

main();
