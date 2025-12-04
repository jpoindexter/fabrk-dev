#!/usr/bin/env node
/**
 * Migrate hardcoded rounded-none/font-mono to use mode.radius/mode.font
 *
 * This script:
 * 1. Finds all .tsx files with hardcoded values
 * 2. Adds the mode import if missing
 * 3. Replaces hardcoded values with mode references
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SRC_DIR = '/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src';

// Files to skip (already properly configured or special cases)
const SKIP_FILES = [
  'visual-mode.ts',      // This defines the modes
  'globals.css',         // CSS file
  '.stories.tsx',        // Storybook files may need explicit values for demos
];

// Get all .tsx files with hardcoded values
function getFilesToMigrate() {
  const files = new Set();

  // Find files with rounded-none
  try {
    const roundedFiles = execSync(
      `grep -rl "rounded-none" "${SRC_DIR}" --include="*.tsx" 2>/dev/null || true`,
      { encoding: 'utf-8' }
    ).trim().split('\n').filter(Boolean);
    roundedFiles.forEach(f => files.add(f));
  } catch (e) {}

  // Find files with font-mono (but not in comments)
  try {
    const fontFiles = execSync(
      `grep -rl "font-mono" "${SRC_DIR}" --include="*.tsx" 2>/dev/null || true`,
      { encoding: 'utf-8' }
    ).trim().split('\n').filter(Boolean);
    fontFiles.forEach(f => files.add(f));
  } catch (e) {}

  return Array.from(files).filter(f => {
    return !SKIP_FILES.some(skip => f.includes(skip));
  });
}

// Check if file already imports mode
function hasModeImport(content) {
  return /import\s+\{[^}]*\bmode\b[^}]*\}\s+from\s+["']@\/lib\/design-system["']/.test(content) ||
         /import\s+\{\s*mode\s*\}\s+from\s+["']@\/lib\/design-system["']/.test(content);
}

// Check if file imports cn
function hasCnImport(content) {
  return /import\s+\{[^}]*\bcn\b[^}]*\}\s+from\s+["']@\/lib\/utils["']/.test(content);
}

// Add mode import to file
function addModeImport(content) {
  // Check if there's already a design-system import
  const designSystemImportRegex = /import\s+\{([^}]+)\}\s+from\s+["']@\/lib\/design-system["']/;
  const match = content.match(designSystemImportRegex);

  if (match) {
    // Add mode to existing import
    const imports = match[1];
    if (!imports.includes('mode')) {
      const newImports = imports.trim() + ', mode';
      return content.replace(designSystemImportRegex, `import { ${newImports} } from "@/lib/design-system"`);
    }
    return content;
  }

  // Add new import after the last import statement
  const lastImportIndex = content.lastIndexOf('import ');
  if (lastImportIndex === -1) {
    // No imports, add at top
    return `import { mode } from "@/lib/design-system";\n${content}`;
  }

  // Find the end of the last import line
  const afterLastImport = content.indexOf('\n', content.indexOf(';', lastImportIndex));
  if (afterLastImport === -1) {
    return content + `\nimport { mode } from "@/lib/design-system";`;
  }

  return content.slice(0, afterLastImport + 1) +
         `import { mode } from "@/lib/design-system";\n` +
         content.slice(afterLastImport + 1);
}

// Add cn import if missing
function addCnImport(content) {
  if (hasCnImport(content)) return content;

  // Check if there's a @/lib/utils import
  const utilsImportRegex = /import\s+\{([^}]+)\}\s+from\s+["']@\/lib\/utils["']/;
  const match = content.match(utilsImportRegex);

  if (match) {
    const imports = match[1];
    if (!imports.includes('cn')) {
      const newImports = 'cn, ' + imports.trim();
      return content.replace(utilsImportRegex, `import { ${newImports} } from "@/lib/utils"`);
    }
    return content;
  }

  // Add new import
  const lastImportIndex = content.lastIndexOf('import ');
  const afterLastImport = content.indexOf('\n', content.indexOf(';', lastImportIndex));

  return content.slice(0, afterLastImport + 1) +
         `import { cn } from "@/lib/utils";\n` +
         content.slice(afterLastImport + 1);
}

// Replace hardcoded values in className strings and cn() calls
function replaceHardcodedValues(content) {
  let result = content;

  // Pattern 1: Inside cn() calls - replace "rounded-none" with mode.radius
  // cn("rounded-none other-class") -> cn(mode.radius, "other-class")
  result = result.replace(
    /cn\s*\(\s*"([^"]*)\bfont-mono\b([^"]*)"/g,
    (match, before, after) => {
      const cleaned = (before + after).replace(/\s+/g, ' ').trim();
      if (cleaned) {
        return `cn(mode.font, "${cleaned}"`;
      }
      return `cn(mode.font`;
    }
  );

  result = result.replace(
    /cn\s*\(\s*"([^"]*)\brounded-none\b([^"]*)"/g,
    (match, before, after) => {
      const cleaned = (before + after).replace(/\s+/g, ' ').trim();
      if (cleaned) {
        return `cn(mode.radius, "${cleaned}"`;
      }
      return `cn(mode.radius`;
    }
  );

  // Pattern 2: Inside cn() with mode already - add to existing
  // cn(mode.radius, "font-mono other") -> cn(mode.radius, mode.font, "other")
  result = result.replace(
    /,\s*"([^"]*)\bfont-mono\b([^"]*)"/g,
    (match, before, after) => {
      const cleaned = (before + after).replace(/\s+/g, ' ').trim();
      if (cleaned) {
        return `, mode.font, "${cleaned}"`;
      }
      return `, mode.font`;
    }
  );

  result = result.replace(
    /,\s*"([^"]*)\brounded-none\b([^"]*)"/g,
    (match, before, after) => {
      const cleaned = (before + after).replace(/\s+/g, ' ').trim();
      if (cleaned) {
        return `, mode.radius, "${cleaned}"`;
      }
      return `, mode.radius`;
    }
  );

  // Pattern 3: Simple className="..." strings that need conversion to cn()
  // className="rounded-none text-xs" -> className={cn(mode.radius, "text-xs")}
  result = result.replace(
    /className="([^"]*)\brounded-none\b([^"]*)"/g,
    (match, before, after) => {
      const otherClasses = (before + after).replace(/\s+/g, ' ').trim();
      if (otherClasses) {
        return `className={cn(mode.radius, "${otherClasses}")}`;
      }
      return `className={mode.radius}`;
    }
  );

  result = result.replace(
    /className="([^"]*)\bfont-mono\b([^"]*)"/g,
    (match, before, after) => {
      const otherClasses = (before + after).replace(/\s+/g, ' ').trim();
      if (otherClasses) {
        return `className={cn(mode.font, "${otherClasses}")}`;
      }
      return `className={mode.font}`;
    }
  );

  // Pattern 4: Already using cn() but with className={cn(...)}
  // Handle nested replacements
  result = result.replace(
    /className=\{cn\(([^)]*)"([^"]*)\bfont-mono\b([^"]*)"([^)]*)\)\}/g,
    (match, before, classStart, classEnd, after) => {
      const cleaned = (classStart + classEnd).replace(/\s+/g, ' ').trim();
      if (cleaned) {
        return `className={cn(${before}mode.font, "${cleaned}"${after})}`;
      }
      return `className={cn(${before}mode.font${after})}`;
    }
  );

  result = result.replace(
    /className=\{cn\(([^)]*)"([^"]*)\brounded-none\b([^"]*)"([^)]*)\)\}/g,
    (match, before, classStart, classEnd, after) => {
      const cleaned = (classStart + classEnd).replace(/\s+/g, ' ').trim();
      if (cleaned) {
        return `className={cn(${before}mode.radius, "${cleaned}"${after})}`;
      }
      return `className={cn(${before}mode.radius${after})}`;
    }
  );

  return result;
}

// Process a single file
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;

  const hasRoundedNone = content.includes('rounded-none');
  const hasFontMono = /\bfont-mono\b/.test(content) && !/\/\/.*font-mono/.test(content);

  if (!hasRoundedNone && !hasFontMono) {
    return { changed: false, file: filePath };
  }

  // Add imports if needed
  if (!hasModeImport(content)) {
    content = addModeImport(content);
  }

  if (!hasCnImport(content) && (hasRoundedNone || hasFontMono)) {
    content = addCnImport(content);
  }

  // Replace hardcoded values
  content = replaceHardcodedValues(content);

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    return { changed: true, file: filePath };
  }

  return { changed: false, file: filePath };
}

// Main
console.log('🔍 Finding files to migrate...');
const files = getFilesToMigrate();
console.log(`Found ${files.length} files with hardcoded values\n`);

let changed = 0;
let errors = [];

for (const file of files) {
  try {
    const result = processFile(file);
    if (result.changed) {
      changed++;
      console.log(`✅ ${path.relative(SRC_DIR, file)}`);
    }
  } catch (error) {
    errors.push({ file, error: error.message });
    console.log(`❌ ${path.relative(SRC_DIR, file)}: ${error.message}`);
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Changed: ${changed} files`);
console.log(`   Errors: ${errors.length} files`);

if (errors.length > 0) {
  console.log(`\n❌ Errors:`);
  errors.forEach(e => console.log(`   ${e.file}: ${e.error}`));
}

console.log(`\n🔧 Run 'npm run type-check' to verify changes`);
