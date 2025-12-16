#!/usr/bin/env node

/**
 * Update Markdown Dynamic Counts
 * Syncs component/template counts from source of truth to README.md and CLAUDE.md
 *
 * Run: npm run update-markdown-counts
 * Or:  node scripts/update-markdown-counts.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Count UI components (recursive .tsx files in src/components/ui)
function countComponents(dir, count = 0) {
  const files = readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = join(dir, file.name);
    if (file.isDirectory()) {
      count = countComponents(fullPath, count);
    } else if (file.name.endsWith('.tsx')) {
      count++;
    }
  }
  return count;
}

// Count templates from library-nav-data.ts (parse the file)
function countTemplates() {
  const navDataPath = join(rootDir, 'src/app/(marketing)/library/library-nav-data.ts');
  const content = readFileSync(navDataPath, 'utf-8');

  // Count items arrays (excluding getting-started)
  const matches = content.match(/items:\s*\[([\s\S]*?)\]/g) || [];
  let count = 0;

  matches.forEach((match, index) => {
    // Skip first match (getting-started section)
    if (index === 0) return;

    // Count objects in the items array
    const itemMatches = match.match(/\{\s*title:/g);
    if (itemMatches) {
      count += itemMatches.length;
    }
  });

  return count;
}

// Count themes
function countThemes() {
  const themesPath = join(rootDir, 'src/data/themes.ts');
  const content = readFileSync(themesPath, 'utf-8');
  const matches = content.match(/id:\s*['"][^'"]+['"]/g);
  return matches ? matches.length : 0;
}

// Update component-counts.json
function updateComponentCountsJson(componentCount) {
  const jsonPath = join(rootDir, 'src/data/component-counts.json');
  const data = { uiComponentCount: componentCount };
  writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n');
  console.log(`✅ Updated component-counts.json: ${componentCount} components`);
}

// Update a markdown file with new counts
function updateMarkdownFile(filePath, componentCount, templateCount, themeCount) {
  let content = readFileSync(filePath, 'utf-8');
  const fileName = filePath.split('/').pop();
  let changes = 0;

  // Track original content
  const original = content;

  // README.md patterns - more specific replacements
  const readmePatterns = [
    // "### UI Components (77 Total)" -> exact match
    [/### UI Components \(\d+ Total\)/g, `### UI Components (${componentCount} Total)`],
    // "All 77 UI components" (case insensitive)
    [/[Aa]ll \d+ UI components/g, `All ${componentCount} UI components`],
    // "77 production-ready components"
    [/\d+ production-ready components/g, `${componentCount} production-ready components`],
    // "See all 77 UI components" in nav
    [/[Ss]ee all \d+ UI components/g, `See all ${componentCount} UI components`],
    // "# 77 UI component" in directory trees
    [/# \d+ UI component/g, `# ${componentCount} UI component`],
    // "77 UI component docs"
    [/\d+ UI component docs/g, `${componentCount} UI component docs`],
    // Inline mentions like "on top of 77 UI components"
    [/of \d+ UI components/g, `of ${componentCount} UI components`],
  ];

  // CLAUDE.md patterns
  const claudePatterns = [
    // Table rows
    [/\| UI Components \| `[^`]+` \| \d+ \|/g, `| UI Components | \`src/data/component-counts.json\` | ${componentCount} |`],
    [/\| Templates \| `[^`]+` \(auto-counted\) \| \d+\+ \|/g, `| Templates | \`library-nav-data.ts\` (auto-counted) | ${templateCount}+ |`],
    [/\| Themes \| `[^`]+` \| \d+ \|/g, `| Themes | \`src/data/themes.ts\` | ${themeCount} |`],
    // "77+" standalone
    [/"\d+\+" and "\d+\+"/g, `"${componentCount}+" and "${templateCount}+"`],
  ];

  // Apply all patterns
  const allPatterns = [...readmePatterns, ...claudePatterns];

  allPatterns.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
  });

  // Count actual changes
  if (content !== original) {
    changes = (original.match(/\d+/g) || []).length - (content.match(/\d+/g) || []).length;
    changes = Math.abs(changes) || 1; // At least 1 if content changed
    writeFileSync(filePath, content);
    console.log(`✅ Updated ${fileName}`);
  } else {
    console.log(`ℹ️  No changes needed in ${fileName}`);
  }
}

// Find all markdown files with potential counts
function findMarkdownFiles(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    // Skip node_modules, .next, .git
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;

    if (entry.isDirectory()) {
      findMarkdownFiles(fullPath, files);
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Main
async function main() {
  console.log('\n📊 Updating Markdown Dynamic Counts\n');

  const componentsDir = join(rootDir, 'src/components/ui');
  const componentCount = countComponents(componentsDir);
  const templateCount = countTemplates();
  const themeCount = countThemes();

  console.log(`Found: ${componentCount} components, ${templateCount} templates, ${themeCount} themes\n`);

  // Update source of truth
  updateComponentCountsJson(componentCount);

  // Find all markdown files in the repo
  const allMarkdownFiles = findMarkdownFiles(rootDir);

  // Priority files (always update)
  const priorityFiles = [
    join(rootDir, 'README.md'),
    join(rootDir, 'CLAUDE.md'),
    join(rootDir, 'CHANGELOG.md'),
  ];

  // Update priority files first
  priorityFiles.forEach(file => {
    try {
      if (allMarkdownFiles.includes(file)) {
        updateMarkdownFile(file, componentCount, templateCount, themeCount);
      }
    } catch (err) {
      console.error(`❌ Failed to update ${file}: ${err.message}`);
    }
  });

  // Update docs folder files
  const docsDir = join(rootDir, 'docs');
  const docsFiles = allMarkdownFiles.filter(f => f.startsWith(docsDir));

  let docsUpdated = 0;
  docsFiles.forEach(file => {
    try {
      const content = readFileSync(file, 'utf-8');
      // Only update files that contain component/template count patterns
      if (/\d+ (UI )?[Cc]omponents?|\d+ templates?/i.test(content)) {
        const original = content;
        updateMarkdownFile(file, componentCount, templateCount, themeCount);
        if (readFileSync(file, 'utf-8') !== original) {
          docsUpdated++;
        }
      }
    } catch (err) {
      // Silently skip files that can't be read
    }
  });

  if (docsUpdated > 0) {
    console.log(`✅ Updated ${docsUpdated} files in docs/`);
  }

  console.log('\n✅ Done!\n');
}

main().catch(console.error);
