#!/usr/bin/env node

/**
 * Codemod: Card Standardization
 *
 * Automates complex card refactoring that ESLint cannot handle:
 * 1. Replace hardcoded font-mono with mode.font in className strings
 * 2. Convert custom header divs to CardHeader component
 * 3. Add mode.font to cn() calls missing it
 * 4. Ensure proper imports (mode, cn, CardHeader)
 *
 * Usage:
 *   node scripts/refactor-card-standardization.mjs [file-pattern]
 *   node scripts/refactor-card-standardization.mjs src/components/security
 *
 * Dry run (no changes):
 *   node scripts/refactor-card-standardization.mjs --dry-run src/components/security
 *
 * Part of card standardization initiative (2025-12-15)
 * See: /docs/design-system/spec/card-animations.md
 */

import { glob } from 'glob';
import * as fs from 'fs/promises';
import * as path from 'path';

// Parse CLI args
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const filePattern = args.find(arg => !arg.startsWith('--')) || 'src/components/**/*.tsx';

console.log('[Codemod] Card Standardization');
console.log(`[Pattern] ${filePattern}`);
console.log(`[Mode] ${dryRun ? 'DRY RUN (no changes)' : 'WRITE'}`);
console.log('');

/**
 * Find all target files
 */
async function findTargetFiles() {
  const files = await glob(filePattern, {
    cwd: process.cwd(),
    absolute: true,
  });

  // Filter to only security, organization, AI, and platform components
  return files.filter(file => {
    return (
      file.includes('/components/security/') ||
      file.includes('/components/organization/') ||
      file.includes('/components/ai/') ||
      file.includes('/app/(platform)/')
    );
  });
}

/**
 * Pattern 1: Replace hardcoded font-mono with mode.font
 *
 * Before: className="font-mono text-xs"
 * After:  className={cn(mode.font, 'text-xs')}
 */
function replaceFontMono(content) {
  let modified = content;
  let changes = 0;

  // Match className="..." with font-mono
  const classNamePattern = /className="([^"]*font-mono[^"]*)"/g;

  modified = modified.replace(classNamePattern, (match, classes) => {
    changes++;

    // Split classes, remove font-mono, wrap others in quotes
    const classList = classes
      .split(/\s+/)
      .filter(cls => cls !== 'font-mono' && cls.trim() !== '')
      .map(cls => `'${cls}'`)
      .join(', ');

    return `className={cn(mode.font, ${classList})}`;
  });

  return { content: modified, changes };
}

/**
 * Pattern 2: Add mode.font to existing cn() calls
 *
 * Before: cn('text-xs', mode.color.text.muted)
 * After:  cn(mode.font, 'text-xs', mode.color.text.muted)
 */
function addModeFontToCn(content) {
  let modified = content;
  let changes = 0;

  // Match cn(...) calls that have text classes but no mode.font
  const cnPattern = /cn\(([^)]+)\)/g;

  modified = modified.replace(cnPattern, (match, args) => {
    // Check if already has mode.font
    if (args.includes('mode.font')) {
      return match;
    }

    // Check if has text classes
    const hasTextClass = /['"]text-(xs|sm|base|lg|xl)/.test(args);
    if (!hasTextClass) {
      return match;
    }

    changes++;
    return `cn(mode.font, ${args})`;
  });

  return { content: modified, changes };
}

/**
 * Pattern 3: Add missing imports
 *
 * Ensures: import { mode } from '@/design-system';
 *          import { cn } from '@/lib/utils';
 *          import { CardHeader } from '@/components/ui/card';
 */
function ensureImports(content) {
  let modified = content;
  let changes = 0;

  // Check if mode is used but not imported
  if (content.includes('mode.font') || content.includes('mode.color')) {
    if (!content.includes("from '@/design-system'") && !content.includes('from "@/design-system"')) {
      // Add import after first import statement
      const firstImportMatch = content.match(/^import .+;$/m);
      if (firstImportMatch) {
        const insertAfter = firstImportMatch.index + firstImportMatch[0].length;
        modified =
          content.slice(0, insertAfter) +
          "\nimport { mode } from '@/design-system';" +
          content.slice(insertAfter);
        changes++;
      }
    }
  }

  // Check if cn is used but not imported
  if (content.includes('cn(')) {
    if (!content.includes("from '@/lib/utils'") && !content.includes('from "@/lib/utils"')) {
      const firstImportMatch = modified.match(/^import .+;$/m);
      if (firstImportMatch) {
        const insertAfter = firstImportMatch.index + firstImportMatch[0].length;
        modified =
          modified.slice(0, insertAfter) +
          "\nimport { cn } from '@/lib/utils';" +
          modified.slice(insertAfter);
        changes++;
      }
    }
  }

  return { content: modified, changes };
}

/**
 * Pattern 4: Convert custom header divs to CardHeader
 *
 * Before:
 *   <div className="border-b px-4 py-2">
 *     <span className="text-xs font-mono">[ [0x00] TITLE ]</span>
 *   </div>
 *
 * After:
 *   <CardHeader code="0x00" title="TITLE" />
 *
 * Note: This is a complex transformation, so we only flag for manual review
 */
function flagCustomHeaders(content, filename) {
  const customHeaderPattern = /<div[^>]*className="[^"]*border-b[^"]*"[^>]*>[\s\S]*?\[\s*\[0x\w+\]\s*\w+\s*\][\s\S]*?<\/div>/g;
  const matches = content.match(customHeaderPattern);

  if (matches && matches.length > 0) {
    console.log(`  ⚠️  Found ${matches.length} custom header div(s) - MANUAL REVIEW NEEDED`);
    console.log(`      File: ${path.basename(filename)}`);
    console.log(`      Pattern: <div className="border-b">[ [0xXX] TITLE ]</div>`);
    console.log(`      Action: Replace with <CardHeader code="0xXX" title="TITLE" />`);
    console.log('');
  }

  return matches ? matches.length : 0;
}

/**
 * Process a single file
 */
async function processFile(filepath) {
  const content = await fs.readFile(filepath, 'utf-8');
  const filename = path.basename(filepath);

  let modified = content;
  let totalChanges = 0;

  console.log(`[Processing] ${filename}`);

  // Apply transformations
  const fontMonoResult = replaceFontMono(modified);
  modified = fontMonoResult.content;
  totalChanges += fontMonoResult.changes;
  if (fontMonoResult.changes > 0) {
    console.log(`  ✓ Replaced ${fontMonoResult.changes} hardcoded font-mono`);
  }

  const modeFontResult = addModeFontToCn(modified);
  modified = modeFontResult.content;
  totalChanges += modeFontResult.changes;
  if (modeFontResult.changes > 0) {
    console.log(`  ✓ Added mode.font to ${modeFontResult.changes} cn() call(s)`);
  }

  const importResult = ensureImports(modified);
  modified = importResult.content;
  totalChanges += importResult.changes;
  if (importResult.changes > 0) {
    console.log(`  ✓ Added ${importResult.changes} missing import(s)`);
  }

  // Flag custom headers (no auto-fix)
  const customHeaderCount = flagCustomHeaders(content, filepath);

  // Write changes
  if (totalChanges > 0 && !dryRun) {
    await fs.writeFile(filepath, modified, 'utf-8');
    console.log(`  💾 Saved ${totalChanges} change(s)`);
  } else if (totalChanges > 0 && dryRun) {
    console.log(`  🔍 Would save ${totalChanges} change(s) (dry run)`);
  } else if (customHeaderCount === 0) {
    console.log(`  ✓ No changes needed`);
  }

  console.log('');

  return { totalChanges, customHeaderCount };
}

/**
 * Main execution
 */
async function main() {
  try {
    const files = await findTargetFiles();

    if (files.length === 0) {
      console.log('[Error] No target files found');
      console.log('[Info] This codemod only processes files in:');
      console.log('  - /components/security/');
      console.log('  - /components/organization/');
      console.log('  - /components/ai/');
      console.log('  - /app/(platform)/');
      process.exit(1);
    }

    console.log(`[Found] ${files.length} target file(s)`);
    console.log('');

    let totalChanges = 0;
    let totalCustomHeaders = 0;
    let filesChanged = 0;

    for (const file of files) {
      const result = await processFile(file);
      if (result.totalChanges > 0) {
        filesChanged++;
      }
      totalChanges += result.totalChanges;
      totalCustomHeaders += result.customHeaderCount;
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log('[Summary]');
    console.log(`  Files processed: ${files.length}`);
    console.log(`  Files changed: ${filesChanged}`);
    console.log(`  Total changes: ${totalChanges}`);
    console.log(`  Custom headers flagged: ${totalCustomHeaders}`);
    console.log('═══════════════════════════════════════════════════════');

    if (totalCustomHeaders > 0) {
      console.log('');
      console.log('[Action Required]');
      console.log('  Some files have custom header divs that need manual conversion:');
      console.log('  1. Replace <div className="border-b">[ [0xXX] TITLE ]</div>');
      console.log('  2. With: <CardHeader code="0xXX" title="TITLE" />');
      console.log('  3. Add import: import { CardHeader } from "@/components/ui/card";');
    }

    if (dryRun) {
      console.log('');
      console.log('[Dry Run] No files were modified');
      console.log('[Info] Run without --dry-run to apply changes');
    }

  } catch (error) {
    console.error('[Error]', error.message);
    process.exit(1);
  }
}

main();
