import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Configuration
const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, 'src');

// Regex patterns for Tailwind classes
// Note: Escaping square brackets for arbitrary values
const PATTERNS = {
  // Broadened regex to capture semantic colors (e.g. text-muted-foreground) and layout utility checks
  textColors: /text-([a-z]+(?:-[a-z0-9]+)*|\[.*?\])/g,
  bgColors: /bg-([a-z]+(?:-[a-z0-9]+)*|\[.*?\])/g,
  fontSizes: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\[.*?\])/g,
  rounded: /rounded-([a-z]+|\[\d+px\])?/g,
  shadows: /shadow-([a-z]+|\[.+\])?/g,
  borders: /border-([a-z]+-\d+|\[#[0-9a-fA-F]{3,6}\])/g,
};

// Store results
const stats = {
  textColors: {},
  bgColors: {},
  fontSizes: {},
  rounded: {},
  shadows: {},
  borders: {},
};

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  for (const [category, regex] of Object.entries(PATTERNS)) {
    const matches = content.match(regex);
    if (matches) {
      matches.forEach(match => {
        stats[category][match] = (stats[category][match] || 0) + 1;
      });
    }
  }
}

async function runAudit() {
  console.log(`🔍 Scanning ${SRC_DIR} for design inconsistencies...\n`);

  const files = await glob('src/**/*.{tsx,ts}', { 
    cwd: ROOT_DIR, 
    ignore: [
      '**/node_modules/**', 
      '**/.next/**',
      'src/app/docs/**',
      'src/components/docs/**',
      '**/*.md',
      '**/*.spec.ts',
      'tests/**'
    ] 
  });
  
  files.forEach(file => processFile(path.join(ROOT_DIR, file)));

  console.log('📊 INCONSISTENCY REPORT\n');

  printCategory('Font Sizes (Typography)', stats.fontSizes);
  printCategory('Text Colors', stats.textColors);
  printCategory('Background Colors', stats.bgColors);
  printCategory('Border Radius', stats.rounded);
  printCategory('Shadows', stats.shadows);
  printCategory('Borders', stats.borders);
}

function printCategory(title, data) {
  console.log(`--- ${title} ---`);
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  
  // Calculate total usages to find outliers
  const total = entries.reduce((sum, [_, count]) => sum + count, 0);
  
  entries.forEach(([value, count]) => {
    let status = '✅';
    
    // Flag outliers (less than 1% usage might be a mistake/inconsistency)
    if (total > 20 && count < Math.max(2, total * 0.02)) status = '⚠️ Rare/Inconsistent';
    if (value.includes('[') && value.includes(']')) status = '🔴 Arbitrary Value';

    console.log(`${String(count).padStart(4)}x  ${value.padEnd(30)} ${status}`);
  });
  console.log('\n');
}

runAudit();