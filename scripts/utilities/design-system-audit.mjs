#!/usr/bin/env node

/**
 * Smart Design System Audit
 *
 * Focuses on REAL violations, not spacing variations.
 *
 * Categories:
 *   - CRITICAL: Blocks deployment (terminal aesthetic violations)
 *   - WARNING: Should fix (accessibility, best practices)
 *   - INFO: Nice to have (consistency suggestions)
 *
 * Usage: node scripts/utilities/design-system-audit.mjs [--fix] [--json]
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const outputJson = args.includes('--json');
const showHelp = args.includes('--help');

if (showHelp) {
  console.log(`
Smart Design System Audit

Usage: node scripts/utilities/design-system-audit.mjs [options]

Options:
  --json    Output results as JSON
  --help    Show this help message

Categories:
  CRITICAL  Terminal aesthetic violations (rounded corners, shadows)
  WARNING   Color format inconsistencies, accessibility issues
  INFO      Suggestions for improvement
`);
  process.exit(0);
}

// Files to completely skip (intentional exceptions)
const ALLOWLIST_FILES = [
  // Visual mode system contains alternative modes by design
  'lib/design-system/visual-mode.ts',
  // Color picker requires hex values
  'components/ui/color-picker.tsx',
  'app/docs/components/color-picker/page.tsx',
  'app/component-showcase/page.tsx',
  // Theme switcher shows theme previews
  'components/theme/theme-dropdown.tsx',
  'components/theme/color-theme-switcher.tsx',
  'app/docs/extras/theming/page.tsx',
  // Email templates need inline styles
  'lib/email/',
  'emails/',
  'app/templates/email-templates/',
  'app/docs/tutorials/email-templates/',
  'app/docs/features/emails/',
  // Google OAuth uses brand colors
  'app/docs/features/google-oauth/page.tsx',
  // Stories and tests
  '.stories.tsx',
  '.test.tsx',
  '__tests__/',
];

// Patterns that are intentionally variable (NOT violations)
const INTENTIONAL_VARIATIONS = [
  // Spacing scale is intentional
  /^(p|m|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr)-\d/,
  /^(gap|space-[xy])-\d/,
  // Size scale is intentional
  /^(w|h|min-w|min-h|max-w|max-h)-/,
  // Typography scale is intentional
  /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/,
  /^font-(normal|medium|semibold|bold|black)/,
  // Flex/grid variations are layout decisions
  /^(flex|grid)-/,
  /^(items|justify|col|row)-/,
  // Position values are layout decisions
  /^(top|right|bottom|left|inset)-/,
  // Z-index variations are stacking decisions
  /^z-/,
  // Opacity variations are design decisions
  /^opacity-/,
];

// CRITICAL violations - terminal aesthetic must be enforced
const CRITICAL_PATTERNS = [
  {
    name: 'rounded-corners',
    pattern: /\brounded-(sm|md|lg|xl|2xl|3xl)\b/g,
    message: 'Use rounded-none for terminal aesthetic',
    suggestion: 'rounded-none',
  },
  {
    name: 'banned-shadows',
    pattern: /\bshadow-(md|lg|xl|2xl)\b/g,
    message: 'Terminal aesthetic uses no shadows',
    suggestion: 'Remove shadow class',
  },
  {
    name: 'hardcoded-white',
    pattern: /\b(bg|text|border)-white\b/g,
    message: 'Use design tokens instead of white',
    suggestion: 'bg-background, text-foreground, border-border',
  },
  {
    name: 'hardcoded-black',
    pattern: /\b(bg|text|border)-black\b/g,
    message: 'Use design tokens instead of black',
    suggestion: 'bg-foreground, text-background',
  },
];

// WARNING patterns - should fix but not blocking
const WARNING_PATTERNS = [
  {
    name: 'hsl-vs-oklch',
    pattern: /hsl\(var\(--(?!chart)/g,
    message: 'Consider using oklch() for consistency with globals.css',
    context: 'CSS uses OKLCH color space, but component uses HSL',
  },
  {
    name: 'inline-hex-color',
    pattern: /#[0-9a-fA-F]{3,6}(?=["'\s,;)}])/g,
    message: 'Use CSS variables instead of hex colors',
    context: 'Hardcoded colors break theming',
  },
  {
    name: 'icon-button-no-label',
    pattern: /<Button[^>]*size=["']icon["'](?![^>]*aria-label)/g,
    message: 'Icon buttons need aria-label for accessibility',
    context: 'Screen readers cannot describe icon-only buttons',
  },
];

// Get all source files
function getSourceFiles() {
  try {
    const output = execSync('git ls-files "src/**/*.tsx" "src/**/*.ts"', { encoding: 'utf-8' });
    return output.trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

// Check if file is in allowlist
function isAllowlisted(filePath) {
  return ALLOWLIST_FILES.some(pattern => filePath.includes(pattern));
}

// Audit a single file
function auditFile(filePath) {
  if (isAllowlisted(filePath)) return { critical: [], warnings: [] };

  let content;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch {
    return { critical: [], warnings: [] };
  }

  const lines = content.split('\n');
  const critical = [];
  const warnings = [];

  // Check critical patterns
  CRITICAL_PATTERNS.forEach(({ name, pattern, message, suggestion }) => {
    lines.forEach((line, index) => {
      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;
      // Skip if line has exception comment
      if (line.includes('// allowed') || line.includes('// intentional')) return;

      const matches = line.match(pattern);
      if (matches) {
        matches.forEach(match => {
          critical.push({
            file: filePath,
            line: index + 1,
            rule: name,
            match,
            message,
            suggestion,
          });
        });
      }
    });
  });

  // Check warning patterns
  WARNING_PATTERNS.forEach(({ name, pattern, message, context }) => {
    lines.forEach((line, index) => {
      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;

      const matches = line.match(pattern);
      if (matches) {
        matches.forEach(match => {
          warnings.push({
            file: filePath,
            line: index + 1,
            rule: name,
            match,
            message,
            context,
          });
        });
      }
    });
  });

  return { critical, warnings };
}

// Main audit function
function runAudit() {
  const files = getSourceFiles();

  if (files.length === 0) {
    console.error('No source files found');
    process.exit(1);
  }

  let allCritical = [];
  let allWarnings = [];

  files.forEach(file => {
    const { critical, warnings } = auditFile(file);
    allCritical.push(...critical);
    allWarnings.push(...warnings);
  });

  // Deduplicate by file+line+rule
  const dedup = (arr) => {
    const seen = new Set();
    return arr.filter(item => {
      const key = `${item.file}:${item.line}:${item.rule}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  allCritical = dedup(allCritical);
  allWarnings = dedup(allWarnings);

  if (outputJson) {
    console.log(JSON.stringify({
      summary: {
        critical: allCritical.length,
        warnings: allWarnings.length,
        filesScanned: files.length,
      },
      critical: allCritical,
      warnings: allWarnings,
    }, null, 2));
    process.exit(allCritical.length > 0 ? 1 : 0);
  }

  // Pretty output
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║            SMART DESIGN SYSTEM AUDIT                         ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  console.log(`📁 Scanned ${files.length} files\n`);

  if (allCritical.length === 0 && allWarnings.length === 0) {
    console.log('✅ No violations found! Design system is consistent.\n');
    process.exit(0);
  }

  if (allCritical.length > 0) {
    console.log(`\n❌ CRITICAL (${allCritical.length}) - Must fix for terminal aesthetic:\n`);

    // Group by rule
    const byRule = {};
    allCritical.forEach(v => {
      if (!byRule[v.rule]) byRule[v.rule] = [];
      byRule[v.rule].push(v);
    });

    Object.entries(byRule).forEach(([rule, violations]) => {
      console.log(`  [${rule}] ${violations[0].message}`);
      console.log(`  Suggestion: ${violations[0].suggestion}\n`);
      violations.slice(0, 5).forEach(v => {
        console.log(`    ${v.file}:${v.line} → "${v.match}"`);
      });
      if (violations.length > 5) {
        console.log(`    ... and ${violations.length - 5} more\n`);
      }
      console.log('');
    });
  }

  if (allWarnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${allWarnings.length}) - Should fix:\n`);

    const byRule = {};
    allWarnings.forEach(v => {
      if (!byRule[v.rule]) byRule[v.rule] = [];
      byRule[v.rule].push(v);
    });

    Object.entries(byRule).forEach(([rule, violations]) => {
      console.log(`  [${rule}] ${violations[0].message}`);
      if (violations[0].context) {
        console.log(`  Context: ${violations[0].context}\n`);
      }
      violations.slice(0, 3).forEach(v => {
        console.log(`    ${v.file}:${v.line}`);
      });
      if (violations.length > 3) {
        console.log(`    ... and ${violations.length - 3} more\n`);
      }
      console.log('');
    });
  }

  console.log('────────────────────────────────────────────────────────────────');
  console.log(`Summary: ${allCritical.length} critical, ${allWarnings.length} warnings`);
  console.log('────────────────────────────────────────────────────────────────\n');

  // Exit with error if critical violations
  process.exit(allCritical.length > 0 ? 1 : 0);
}

runAudit();
