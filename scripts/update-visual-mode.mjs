#!/usr/bin/env node

/**
 * Batch update all dashboard files to use Visual Mode System
 * Replaces hardcoded rounded-none and font-mono with mode references
 */

import { readFileSync, writeFileSync } from "fs";
import { glob } from "glob";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

// Find all TSX files in dashboard
const files = glob.sync("src/app/(dashboard)/**/*.tsx", { cwd: ROOT });

let filesChanged = 0;
let totalReplacements = 0;

for (const file of files) {
  const filePath = join(ROOT, file);
  let content = readFileSync(filePath, "utf8");
  const original = content;

  // Check if file has hardcoded values
  if (!content.includes("rounded-none") && !content.includes("font-mono")) {
    continue;
  }

  // Check if already has imports
  const hasModeImport = content.includes('from "@/lib/design-system"');
  const hasCnImport = content.includes('from "@/lib/utils"') && content.includes("cn");

  let replacements = 0;

  // Add imports if missing
  if (!hasModeImport || !hasCnImport) {
    // Find the last import statement
    const importRegex = /import\s+.*?from\s+['"].*?['"];?\n/g;
    const matches = [...content.matchAll(importRegex)];

    if (matches.length > 0) {
      const lastImport = matches[matches.length - 1];
      const insertIndex = lastImport.index + lastImport[0].length;

      let importsToAdd = "";
      if (!hasModeImport) {
        importsToAdd += 'import { mode } from "@/lib/design-system";\n';
      }
      if (!hasCnImport) {
        // Check if cn import needs to be added
        if (!content.includes('from "@/lib/utils"')) {
          importsToAdd += 'import { cn } from "@/lib/utils";\n';
        } else {
          // Add cn to existing import
          content = content.replace(
            /import\s+{([^}]+)}\s+from\s+['"]@\/lib\/utils['"]/,
            (match, imports) => {
              if (!imports.includes("cn")) {
                return `import { ${imports.trim()}, cn } from "@/lib/utils"`;
              }
              return match;
            }
          );
        }
      }

      if (importsToAdd) {
        content = content.slice(0, insertIndex) + importsToAdd + content.slice(insertIndex);
      }
    }
  }

  // Replace className="...rounded-none..." with className={cn("...", mode.radius)}
  content = content.replace(
    /className=["']([^"']*?\s+)rounded-none(\s+[^"']*?)["']/g,
    (match, before, after) => {
      replacements++;
      const cleanBefore = before.trim();
      const cleanAfter = after.trim();
      const classes = [cleanBefore, cleanAfter].filter(Boolean).join(" ");
      return `className={cn("${classes}", mode.radius)}`;
    }
  );

  // Replace className="rounded-none ..." with className={cn("...", mode.radius)}
  content = content.replace(
    /className=["']rounded-none(\s+[^"']+?)["']/g,
    (match, after) => {
      replacements++;
      return `className={cn("${after.trim()}", mode.radius)}`;
    }
  );

  // Replace className="... rounded-none" with className={cn("...", mode.radius)}
  content = content.replace(
    /className=["']([^"']+?\s+)rounded-none["']/g,
    (match, before) => {
      replacements++;
      return `className={cn("${before.trim()}", mode.radius)}`;
    }
  );

  // Replace standalone className="rounded-none"
  content = content.replace(
    /className=["']rounded-none["']/g,
    () => {
      replacements++;
      return `className={mode.radius}`;
    }
  );

  // Replace className={`...rounded-none...`} template literals
  content = content.replace(
    /className=\{`([^`]*?)rounded-none([^`]*?)`\}/g,
    (match, before, after) => {
      replacements++;
      const beforeClean = before.trim();
      const afterClean = after.trim();

      // Handle conditional classes
      if (before.includes("${") || after.includes("${")) {
        return `className={cn(\`${beforeClean}\`, mode.radius, \`${afterClean}\`)}`;
      }

      const classes = [beforeClean, afterClean].filter(Boolean).join(" ");
      return `className={cn("${classes}", mode.radius)}`;
    }
  );

  // Replace font-mono in className
  content = content.replace(
    /className=["']([^"']*?\s+)font-mono(\s+[^"']*?)["']/g,
    (match, before, after) => {
      replacements++;
      const cleanBefore = before.trim();
      const cleanAfter = after.trim();
      const classes = [cleanBefore, cleanAfter].filter(Boolean).join(" ");
      return `className={cn("${classes}", mode.font)}`;
    }
  );

  content = content.replace(
    /className=["']font-mono(\s+[^"']+?)["']/g,
    (match, after) => {
      replacements++;
      return `className={cn("${after.trim()}", mode.font)}`;
    }
  );

  content = content.replace(
    /className=["']([^"']+?\s+)font-mono["']/g,
    (match, before) => {
      replacements++;
      return `className={cn("${before.trim()}", mode.font)}`;
    }
  );

  content = content.replace(
    /className=["']font-mono["']/g,
    () => {
      replacements++;
      return `className={mode.font}`;
    }
  );

  if (content !== original) {
    writeFileSync(filePath, content, "utf8");
    filesChanged++;
    totalReplacements += replacements;
    console.log(`✓ ${file} (${replacements} replacements)`);
  }
}

console.log(`\n✓ Updated ${filesChanged} files with ${totalReplacements} total replacements`);
