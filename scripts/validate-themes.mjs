#!/usr/bin/env node

/**
 * WCAG 2.1 AA Theme Validation Script
 *
 * Validates all color themes in globals.css for accessibility compliance.
 * Checks text/background contrast ratios against WCAG 2.1 AA requirements.
 *
 * Usage: node scripts/validate-themes.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  parseOKLCH,
  calculateContrastRatio,
  meetsWCAG,
  getWCAGRating,
} from './utilities/color-utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Themes to validate
const THEMES = ['light', 'dark', 'red', 'blue', 'green', 'amber'];

// Text/background combinations to check
const CONTRAST_CHECKS = [
  { fg: '--foreground', bg: '--background', min: 4.5, label: 'Body text on canvas' },
  { fg: '--card-foreground', bg: '--card', min: 4.5, label: 'Card text on card bg' },
  { fg: '--muted-foreground', bg: '--muted', min: 4.5, label: 'Muted text on muted bg' },
  { fg: '--primary-foreground', bg: '--primary', min: 4.5, label: 'Button text on primary' },
  { fg: '--destructive-foreground', bg: '--destructive', min: 4.5, label: 'Error text on error bg' },
  { fg: '--success-foreground', bg: '--success', min: 4.5, label: 'Success text on success bg' },
  { fg: '--warning-foreground', bg: '--warning', min: 4.5, label: 'Warning text on warning bg' },
];

/**
 * Extract CSS variable value from theme block
 * @param {string} themeBlock - CSS theme block content
 * @param {string} varName - Variable name (e.g., '--foreground')
 * @returns {string | null} Variable value or null if not found
 */
function getThemeVariable(themeBlock, varName) {
  // Match: --foreground: 0% 0 0; or --foreground: oklch(0% 0 0);
  const regex = new RegExp(`${varName}:\\s*([^;]+);`);
  const match = themeBlock.match(regex);

  if (!match) {
    return null;
  }

  return match[1].trim();
}

/**
 * Extract theme block from globals.css
 * @param {string} cssContent - Full CSS file content
 * @param {string} themeName - Theme name (e.g., 'light', 'dark')
 * @returns {string | null} Theme block content
 */
function extractThemeBlock(cssContent, themeName) {
  // For light theme, use :root block
  if (themeName === 'light') {
    const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/s);
    return rootMatch ? rootMatch[1] : null;
  }

  // For other themes, use [data-theme='X'] block
  const themeRegex = new RegExp(`\\[data-theme=['"]${themeName}['"]\\]\\s*\\{([^}]+)\\}`, 's');
  const match = cssContent.match(themeRegex);

  return match ? match[1] : null;
}

/**
 * Validate a single theme
 * @param {string} themeName - Theme name
 * @param {string} cssContent - Full CSS content
 * @returns {Array<Object>} Validation results
 */
function validateTheme(themeName, cssContent) {
  const themeBlock = extractThemeBlock(cssContent, themeName);

  if (!themeBlock) {
    console.error(`❌ Theme "${themeName}" not found in globals.css`);
    return [];
  }

  const results = [];

  for (const check of CONTRAST_CHECKS) {
    const fgValue = getThemeVariable(themeBlock, check.fg);
    const bgValue = getThemeVariable(themeBlock, check.bg);

    if (!fgValue || !bgValue) {
      // Skip if variables not defined in this theme
      continue;
    }

    try {
      const ratio = calculateContrastRatio(fgValue, bgValue);
      const rating = getWCAGRating(ratio);
      const passes = ratio >= check.min;

      results.push({
        theme: themeName,
        fg: check.fg,
        bg: check.bg,
        label: check.label,
        ratio: ratio,
        required: check.min,
        rating: rating.level,
        passes: passes,
      });
    } catch (error) {
      results.push({
        theme: themeName,
        fg: check.fg,
        bg: check.bg,
        label: check.label,
        error: error.message,
        passes: false,
      });
    }
  }

  return results;
}

/**
 * Main validation function
 */
function main() {
  console.log('🔍 WCAG 2.1 AA Theme Validation\n');
  console.log('═'.repeat(80));

  // Read globals.css
  const globalsPath = path.join(__dirname, '../src/app/globals.css');

  if (!fs.existsSync(globalsPath)) {
    console.error(`❌ globals.css not found at: ${globalsPath}`);
    process.exit(1);
  }

  const cssContent = fs.readFileSync(globalsPath, 'utf-8');

  // Validate all themes
  let totalChecks = 0;
  let totalFailures = 0;
  const failuresByTheme = {};

  for (const theme of THEMES) {
    console.log(`\n📋 Validating theme: ${theme}`);
    console.log('─'.repeat(80));

    const results = validateTheme(theme, cssContent);

    if (results.length === 0) {
      console.log(`⚠️  No checks found for "${theme}"`);
      continue;
    }

    const failures = results.filter((r) => !r.passes);
    totalChecks += results.length;
    totalFailures += failures.length;

    if (failures.length > 0) {
      failuresByTheme[theme] = failures;

      console.log(`❌ ${failures.length} failure(s):\n`);

      failures.forEach((f) => {
        if (f.error) {
          console.log(`  • ${f.label}`);
          console.log(`    ERROR: ${f.error}\n`);
        } else {
          console.log(`  • ${f.label}`);
          console.log(`    Ratio: ${f.ratio.toFixed(2)}:1 (need ${f.required}:1)`);
          console.log(`    Rating: ${f.rating}\n`);
        }
      });
    } else {
      console.log(`✅ All ${results.length} checks passed`);
    }
  }

  // Summary
  console.log('\n');
  console.log('═'.repeat(80));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(80));
  console.log(`Total checks: ${totalChecks}`);
  console.log(`Failures: ${totalFailures}`);
  console.log(`Pass rate: ${(((totalChecks - totalFailures) / totalChecks) * 100).toFixed(1)}%\n`);

  if (totalFailures > 0) {
    console.log('❌ VALIDATION FAILED');
    console.log('\n🔧 To fix failures, adjust lightness values in globals.css:');
    console.log('   • Increase lightness by 5% increments for text colors');
    console.log('   • Decrease lightness for backgrounds if needed');
    console.log('   • Re-run validation after each change\n');
    process.exit(1);
  }

  console.log('✅ ALL THEMES PASS WCAG 2.1 AA\n');
  process.exit(0);
}

// Run validation
main();
