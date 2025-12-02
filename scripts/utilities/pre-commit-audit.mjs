#!/usr/bin/env node

/**
 * Pre-commit Design System Audit
 *
 * Runs critical pattern checks from .claude/audit/patterns-critical.md
 * on staged .tsx files before allowing commit.
 *
 * Exit codes:
 *   0 = Pass (no violations)
 *   1 = Fail (violations found)
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';

// Get staged .tsx files
function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACMR', { encoding: 'utf-8' });
    return output.split('\n').filter(f => f.endsWith('.tsx') && f.startsWith('src/'));
  } catch {
    return [];
  }
}

// Pattern checks with their descriptions
const CRITICAL_PATTERNS = [
  {
    name: 'console.log',
    pattern: /console\.(log|debug|info)\(/,
    message: 'Remove console.log/debug/info statements before commit',
    exceptions: ['// DEBUG', '// TODO: remove'],
  },
  {
    name: 'target="_blank" without rel',
    pattern: /target="_blank"(?![^>]*rel="noopener)/,
    message: 'External links need rel="noopener noreferrer"',
  },
  {
    name: 'rounded corners (non-none)',
    pattern: /rounded-(sm|md|lg|xl|2xl|3xl)\b/,
    message: 'Use rounded-none for terminal aesthetic',
    exceptions: ['rounded-full'], // Traffic light dots
  },
  {
    name: 'banned shadows',
    pattern: /shadow-(md|lg|xl|2xl|inner)\b/,
    message: 'Use shadow-sm or shadow-none only',
  },
  {
    name: 'hardcoded white/black',
    pattern: /(bg|text|border)-(white|black)\b(?!\s*\/)/,
    message: 'Use design tokens: bg-background, text-foreground, etc.',
    exceptions: ['// theme', '// intentional'],
  },
  {
    name: 'process.env direct access',
    pattern: /process\.env\.(?!NODE_ENV)/,
    message: 'Use env.server.X or env.client.X from lib/env.ts',
    exceptions: ['env.ts', 'next.config'],
  },
];

// High priority patterns (warn but don't block)
const HIGH_PATTERNS = [
  {
    name: 'missing aria-label on icon button',
    pattern: /<Button[^>]*size="icon"(?![^>]*aria-label)/,
    message: 'Icon-only buttons need aria-label for accessibility',
    warn: true,
  },
  {
    name: 'img without alt',
    pattern: /<img(?![^>]*alt=)/,
    message: 'Images need alt text for accessibility',
    warn: true,
  },
];

function checkFile(filePath, patterns, isWarning = false) {
  let content;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch {
    return [];
  }

  const violations = [];
  const lines = content.split('\n');

  patterns.forEach(({ name, pattern, message, exceptions = [] }) => {
    lines.forEach((line, index) => {
      // Skip if line contains an exception
      if (exceptions.some(exc => line.includes(exc))) return;

      if (pattern.test(line)) {
        violations.push({
          file: filePath,
          line: index + 1,
          name,
          message,
          isWarning,
          content: line.trim().substring(0, 80),
        });
      }
    });
  });

  return violations;
}

function main() {
  const files = getStagedFiles();

  if (files.length === 0) {
    console.log('✓ No staged .tsx files to audit');
    process.exit(0);
  }

  console.log(`\n🔍 Auditing ${files.length} staged file(s)...\n`);

  let criticalViolations = [];
  let warnings = [];

  files.forEach(file => {
    criticalViolations.push(...checkFile(file, CRITICAL_PATTERNS, false));
    warnings.push(...checkFile(file, HIGH_PATTERNS, true));
  });

  // Print warnings (don't block)
  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS (non-blocking):');
    warnings.forEach(v => {
      console.log(`   ${v.file}:${v.line}`);
      console.log(`   └─ [${v.name}] ${v.message}`);
      console.log(`      ${v.content}\n`);
    });
  }

  // Print critical violations (block commit)
  if (criticalViolations.length > 0) {
    console.log('❌ CRITICAL VIOLATIONS (blocking):');
    criticalViolations.forEach(v => {
      console.log(`   ${v.file}:${v.line}`);
      console.log(`   └─ [${v.name}] ${v.message}`);
      console.log(`      ${v.content}\n`);
    });
    console.log(`\n❌ Pre-commit audit FAILED: ${criticalViolations.length} critical violation(s)`);
    console.log('   Fix the issues above or use --no-verify to bypass (not recommended)\n');
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.log(`✓ Pre-commit audit PASSED with ${warnings.length} warning(s)\n`);
  } else {
    console.log('✓ Pre-commit audit PASSED\n');
  }

  process.exit(0);
}

main();
