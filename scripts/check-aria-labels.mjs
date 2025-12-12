#!/usr/bin/env node

/**
 * Check for icon-only buttons without aria-label attributes
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');

// Directories to scan
const dirsToScan = [
  join(projectRoot, 'src/components'),
  join(projectRoot, 'src/app'),
];

// Recursively get all .tsx/.ts files
function getAllFiles(dir, files = []) {
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules
      if (item !== 'node_modules') {
        getAllFiles(fullPath, files);
      }
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Check if a file has icon buttons without aria-label
function checkFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const issues = [];

  // Find all instances of size="icon" or size='icon'
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('size="icon"') || line.includes("size='icon'") || line.includes('size={\'icon\'}') || line.includes('size={"icon"}')) {
      // Check the surrounding lines (before and after) for aria-label
      const contextStart = Math.max(0, i - 5);
      const contextEnd = Math.min(lines.length, i + 10);
      const contextLines = lines.slice(contextStart, contextEnd).join('\n');

      // Check if this button block has aria-label
      if (!contextLines.includes('aria-label')) {
        issues.push({
          file: filePath.replace(projectRoot + '/', ''),
          line: i + 1,
          snippet: lines[i].trim(),
        });
      }
    }
  }

  return issues;
}

// Main execution
console.log('🔍 Scanning for icon-only buttons without aria-label...\n');

let allFiles = [];
for (const dir of dirsToScan) {
  allFiles = allFiles.concat(getAllFiles(dir));
}

let totalIssues = 0;
const fileIssues = [];

for (const file of allFiles) {
  const issues = checkFile(file);
  if (issues.length > 0) {
    fileIssues.push({ file, issues });
    totalIssues += issues.length;
  }
}

if (totalIssues === 0) {
  console.log('✅ All icon-only buttons have aria-label attributes!\n');
  console.log(`📊 Scanned ${allFiles.length} files`);
} else {
  console.log(`⚠️  Found ${totalIssues} potential issues:\n`);

  for (const { file, issues } of fileIssues) {
    console.log(`📄 ${file}`);
    for (const issue of issues) {
      console.log(`   Line ${issue.line}: ${issue.snippet}`);
    }
    console.log('');
  }

  console.log(`\n⚠️  Note: This is a heuristic check. Some issues may be false positives if:`);
  console.log(`   - The button is wrapped in a component that adds aria-label`);
  console.log(`   - The button has a text label (not truly icon-only)`);
  console.log(`   - The button is in documentation/example code\n`);
}
