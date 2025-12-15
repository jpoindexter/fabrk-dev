# FABRK SUPER AUDIT — MULTI-JUDGE COMPREHENSIVE REVIEW

> **Version:** 1.0
> **Created:** 2025-12-15
> **Purpose:** Ultimate launch readiness audit with 8 specialized judges
> **Scope:** Design System + Documentation + Code Quality + Security + Performance + Accessibility + SEO + File Hygiene

---

## OVERVIEW

This is the **DEFINITIVE** audit prompt. It combines all specialized audits into one comprehensive review with **8 independent judges**. Each judge has specific expertise and scoring criteria. ALL judges must pass for GO status.

**Required Score:** 95/100 minimum for GO verdict
**Zero Tolerance:** Any CRITICAL blocker = automatic NO-GO

---

## THE 8 JUDGES

| Judge | Expertise | Weight | Veto Power |
|-------|-----------|--------|------------|
| **J1: Russian Judge** | Brutal honesty, no excuses, finds gaps | 15% | YES |
| **J2: German Engineer** | Correctness, structure, traceability | 15% | YES |
| **J3: Dutch Pragmatist** | Simplicity, usability, maintainability | 10% | NO |
| **J4: Security Auditor** | OWASP, secrets, validation, XSS/CSRF | 15% | YES |
| **J5: Accessibility Expert** | WCAG 2.2 AA, ARIA, screen readers | 10% | YES |
| **J6: Performance Engineer** | Bundle size, Core Web Vitals, lazy loading | 10% | NO |
| **J7: SEO Specialist** | Metadata, OpenGraph, structured data | 10% | NO |
| **J8: DevOps Gatekeeper** | CI/CD, hooks, builds, deployment | 15% | YES |

**Veto Power:** Judges with veto power can issue NO-GO independently.

---

## EXECUTION PROTOCOL

### Phase 0: Environment Setup
```bash
# Verify you're in the correct directory
pwd  # Should be Fabrk_plate root

# Check Node/npm versions
node -v && npm -v

# Verify dependencies
npm ci
```

### Phase 1: Automated Scans (Run ALL)
```bash
# 1. Design System Audit
node .internal/scripts/utilities/design-system-audit.mjs

# 2. TypeScript Compilation
npm run type-check

# 3. ESLint
npm run lint

# 4. Hex Color Detection
npm run scan:hex

# 5. Production Build
npm run build

# 6. Security Audit
npm audit --audit-level=high
```

### Phase 2: Manual Inspection (Per Judge)
Each judge inspects their domain as specified below.

### Phase 3: Scoring & Verdict
Aggregate scores and determine GO/NO-GO.

---

## JUDGE 1: RUSSIAN JUDGE (Brutal Honesty)

**Mandate:** Find every gap, inconsistency, and lie in the codebase. No mercy.

### 1.1 Gap Detection Checklist

| Check | Command/Method | Pass Criteria |
|-------|----------------|---------------|
| Empty files | `find src -name "*.tsx" -empty` | 0 matches |
| Placeholder text | `grep -rn "TODO\|FIXME\|lorem\|TBD" src/` | 0 in production code |
| Incomplete components | `grep -rn "// TODO" --include="*.tsx" src/components/` | 0 matches |
| Missing exports | Check `src/components/*/index.ts` completeness | All components exported |
| Broken imports | `npm run type-check` | 0 errors |
| Dead code | `grep -rn "// DEPRECATED\|// UNUSED" src/` | 0 in shipped code |

### 1.2 Consistency Checks

```bash
# Component naming consistency
ls src/components/ui/ | grep -v "^[a-z-]*\.tsx$"  # Should be empty (kebab-case only)

# File naming consistency
find src -name "*_*" -type f  # Should be empty (no underscores)

# Export consistency
for file in src/components/ui/*.tsx; do
  basename=$(basename "$file" .tsx)
  if ! grep -q "export.*$basename\|export default" "$file"; then
    echo "Missing export: $file"
  fi
done
```

### 1.3 Documentation Lies Detection

```bash
# Count documented vs actual components
DOCS_COUNT=$(find src/app/\(marketing\)/docs/components -name "page.tsx" | wc -l)
UI_COUNT=$(find src/components/ui -name "*.tsx" | wc -l)
echo "Docs: $DOCS_COUNT, Components: $UI_COUNT"

# Find documented but non-existent
# (Manual: Check docs-nav-data.ts against actual files)
```

### 1.4 Scoring Criteria

| Finding | Deduction |
|---------|-----------|
| Empty/placeholder file | -5 per file |
| Documented but non-existent | -10 per item |
| Inconsistent naming | -2 per file |
| Dead code in production | -3 per instance |
| Missing export | -2 per component |

**Max Score: 100 | Passing: 85+**

---

## JUDGE 2: GERMAN ENGINEER (Correctness & Structure)

**Mandate:** Verify everything is correctly structured, typed, and traceable.

### 2.1 TypeScript Strictness

```bash
# Verify strict mode
grep '"strict": true' tsconfig.json

# Check for any type assertions
grep -rn "as any\|as unknown\|@ts-ignore\|@ts-nocheck" --include="*.tsx" --include="*.ts" src/ | wc -l
# Target: < 10 total (with justification)

# Verify no implicit any
npm run type-check 2>&1 | grep -c "implicitly has an 'any' type"
# Target: 0
```

### 2.2 File Structure Validation

```
Expected Structure:
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   ├── (marketing)/       # Marketing route group
│   ├── (platform)/        # Dashboard route group
│   └── api/               # API routes
├── components/
│   ├── ui/                # Primitives (77 files)
│   ├── landing/           # Landing sections
│   ├── marketing/         # Marketing components
│   ├── dashboard/         # Dashboard components
│   └── shared/            # Shared utilities
├── lib/                   # Utilities & clients
├── config/                # Configuration
└── design-system/         # Token system
```

```bash
# Verify structure
for dir in "src/app" "src/components/ui" "src/lib" "src/config" "src/design-system"; do
  if [ -d "$dir" ]; then
    echo "✅ $dir exists"
  else
    echo "❌ MISSING: $dir"
  fi
done
```

### 2.3 API Route Inventory

```bash
# Count routes
find src/app/api -name "route.ts" | wc -l
# Expected: 50+

# Verify critical routes exist
for route in "auth" "stripe/checkout" "stripe/webhook" "polar" "lemonsqueezy" "user"; do
  if find src/app/api -path "*$route*" -name "route.ts" | grep -q .; then
    echo "✅ $route"
  else
    echo "❌ MISSING: $route"
  fi
done
```

### 2.4 Import Traceability

```bash
# Check circular dependencies (requires madge)
npx madge --circular src/

# Check import paths are correct
grep -rn "from ['\"]@/" --include="*.tsx" --include="*.ts" src/ | head -20
```

### 2.5 Scoring Criteria

| Finding | Deduction |
|---------|-----------|
| Missing strict mode | -20 (CRITICAL) |
| `as any` without comment | -2 per instance |
| Wrong directory structure | -5 per violation |
| Missing critical API route | -10 per route |
| Circular dependency | -5 per cycle |

**Max Score: 100 | Passing: 90+**

---

## JUDGE 3: DUTCH PRAGMATIST (Simplicity & Usability)

**Mandate:** Ensure code is simple, readable, and maintainable.

### 3.1 File Size Limits

```bash
# Find oversized files (>300 lines)
find src -name "*.tsx" -o -name "*.ts" | while read f; do
  lines=$(wc -l < "$f" 2>/dev/null)
  if [ "$lines" -gt 300 ]; then
    echo "$lines lines: $f"
  fi
done | sort -rn | head -20

# Allowed exceptions:
# - src/components/ui/* (single-file components)
# - src/app/(marketing)/library/* (template demos)
# - Generated files
```

### 3.2 Complexity Analysis

```bash
# Functions with too many parameters (>5)
grep -rn "function.*(.*, .*, .*, .*, .*," --include="*.tsx" --include="*.ts" src/

# Deeply nested code (>4 levels)
# Manual inspection of complex files

# Long functions (>50 lines)
# Manual inspection
```

### 3.3 Naming Clarity

```bash
# Single-letter variables (except i, j, k in loops)
grep -rn "const [a-z] =" --include="*.tsx" --include="*.ts" src/ | grep -v "const i\|const j\|const k"

# Unclear abbreviations
grep -rn "const [a-z]{1,2}[A-Z]" --include="*.tsx" src/ | head -10
```

### 3.4 Code Duplication

```bash
# Find duplicate code blocks (requires jscpd)
npx jscpd src/ --min-lines 10 --min-tokens 50

# Manual: Look for similar components that could be unified
```

### 3.5 Scoring Criteria

| Finding | Deduction |
|---------|-----------|
| File > 500 lines | -5 per file |
| File > 300 lines (non-exempt) | -2 per file |
| Function > 50 lines | -2 per function |
| Unclear naming | -1 per instance |
| Code duplication > 20% | -10 |

**Max Score: 100 | Passing: 80+**

---

## JUDGE 4: SECURITY AUDITOR (OWASP + Secrets)

**Mandate:** Find all security vulnerabilities and exposed secrets.

### 4.1 Secret Detection (CRITICAL)

```bash
# API keys and tokens
grep -rn "sk_live\|pk_live\|sk_test\|pk_test" --include="*.ts" --include="*.tsx" src/
grep -rn "AKIA[A-Z0-9]{16}" src/  # AWS keys
grep -rn "ghp_[a-zA-Z0-9]{36}" src/  # GitHub tokens
grep -rn "xox[baprs]-[a-zA-Z0-9-]+" src/  # Slack tokens

# Passwords and secrets
grep -rn "password.*=.*['\"]" --include="*.ts" --include="*.tsx" src/ | grep -v "type\|interface\|placeholder"
grep -rn "secret.*=.*['\"]" --include="*.ts" --include="*.tsx" src/ | grep -v "env\|process"

# Database URLs
grep -rn "postgres://\|mysql://\|mongodb://" --include="*.ts" src/ | grep -v "env"
```

### 4.2 Dangerous Patterns

```bash
# eval() usage
grep -rn "eval(" --include="*.ts" --include="*.tsx" src/
# Expected: 0

# dangerouslySetInnerHTML without eslint-disable
grep -rn "dangerouslySetInnerHTML" --include="*.tsx" src/ | grep -v "eslint-disable"
# Expected: 0

# SQL injection vectors
grep -rn "query.*\`.*\${" --include="*.ts" src/
# Expected: 0 (use parameterized queries)

# XSS vectors
grep -rn "innerHTML\s*=" --include="*.tsx" src/
# Expected: 0
```

### 4.3 Input Validation

```bash
# API routes without validation
for route in $(find src/app/api -name "route.ts"); do
  if ! grep -q "zod\|yup\|joi\|validate" "$route"; then
    echo "⚠️ No validation: $route"
  fi
done

# Check for Zod usage
grep -rn "z\.object\|z\.string\|z\.number" src/app/api/ | wc -l
# Expected: High count (validation everywhere)
```

### 4.4 Authentication Checks

```bash
# Unprotected API routes (should use auth())
for route in $(find src/app/api -name "route.ts" | grep -v "webhook\|public\|health"); do
  if ! grep -q "auth()\|getServerSession\|getToken" "$route"; then
    echo "⚠️ Possibly unprotected: $route"
  fi
done
```

### 4.5 Dependency Vulnerabilities

```bash
npm audit --audit-level=high
# Expected: 0 high/critical vulnerabilities

npm outdated
# Check for severely outdated packages
```

### 4.6 Scoring Criteria

| Finding | Deduction |
|---------|-----------|
| Exposed secret/API key | -50 (CRITICAL BLOCKER) |
| eval() usage | -20 (CRITICAL) |
| dangerouslySetInnerHTML without comment | -10 |
| SQL injection vector | -30 (CRITICAL) |
| Unvalidated API input | -5 per route |
| High vulnerability in deps | -10 per CVE |
| Unprotected sensitive route | -10 per route |

**Max Score: 100 | Passing: 95+ | Any CRITICAL = NO-GO**

---

## JUDGE 5: ACCESSIBILITY EXPERT (WCAG 2.2 AA)

**Mandate:** Ensure full accessibility compliance.

### 5.1 Image Alt Text

```bash
# Images without alt
grep -rn "<img" --include="*.tsx" src/ | grep -v 'alt=' | head -10
# Expected: 0

# Empty alt on non-decorative images
grep -rn 'alt=""' --include="*.tsx" src/ | head -10
# Check each is truly decorative
```

### 5.2 Icon Button Accessibility

```bash
# Icon-only buttons without aria-label
grep -rn 'size="icon"\|variant="ghost".*size=' --include="*.tsx" src/components/ | while read line; do
  file=$(echo "$line" | cut -d: -f1)
  linenum=$(echo "$line" | cut -d: -f2)
  if ! sed -n "${linenum}p" "$file" | grep -q "aria-label"; then
    echo "⚠️ $line"
  fi
done
```

### 5.3 Form Accessibility

```bash
# Inputs without labels
grep -rn "<Input\|<input" --include="*.tsx" src/ | while read line; do
  # Check if preceded by Label or has aria-label
  echo "$line" | grep -q "aria-label\|id=.*Label\|htmlFor" || echo "⚠️ $line"
done | head -10

# Buttons without accessible text
grep -rn "<Button" --include="*.tsx" src/ | grep -v "aria-label\|>" | head -5
```

### 5.4 Color Contrast

```bash
# Check for low-contrast combinations in code
# (Manual verification with browser dev tools)
# Focus on:
# - text-muted-foreground on bg-background
# - disabled states
# - placeholder text
```

### 5.5 Keyboard Navigation

```bash
# Interactive elements without tabIndex or native focus
grep -rn "onClick=" --include="*.tsx" src/ | grep -v "button\|Button\|<a \|Link\|tabIndex" | head -10

# Check for focus trapping in modals
grep -rn "Dialog\|Sheet\|Modal" --include="*.tsx" src/components/ui/ | head -5
# Verify focus management
```

### 5.6 ARIA Usage

```bash
# ARIA roles
grep -rn "role=" --include="*.tsx" src/ | wc -l

# ARIA labels
grep -rn "aria-label\|aria-labelledby\|aria-describedby" --include="*.tsx" src/ | wc -l

# Live regions
grep -rn "aria-live\|aria-atomic" --include="*.tsx" src/ | wc -l
```

### 5.7 Scoring Criteria

| Finding | Deduction |
|---------|-----------|
| Image without alt | -3 per image |
| Icon button without aria-label | -5 per button |
| Form input without label | -5 per input |
| Failed color contrast | -10 per instance |
| Non-keyboard accessible element | -5 per element |
| Missing focus indicator | -5 per component |

**Max Score: 100 | Passing: 90+**

---

## JUDGE 6: PERFORMANCE ENGINEER (Core Web Vitals)

**Mandate:** Ensure optimal performance and bundle efficiency.

### 6.1 Bundle Analysis

```bash
# Check for bloated dependencies
for pkg in lodash moment jquery underscore; do
  if grep -q "\"$pkg\"" package.json; then
    echo "❌ Found bloated package: $pkg"
  fi
done

# Check bundle size (requires build)
npm run build
ls -la .next/static/chunks/*.js | head -10

# Analyze with bundle analyzer
# npx @next/bundle-analyzer
```

### 6.2 Image Optimization

```bash
# Check for next/image usage
grep -rn "<img " --include="*.tsx" src/ | grep -v "next/image\|Image from" | wc -l
# Expected: 0 (all images should use next/image)

# Check for unoptimized images
grep -rn "unoptimized" --include="*.tsx" src/ | wc -l
```

### 6.3 Lazy Loading

```bash
# Check for dynamic imports
grep -rn "dynamic(" --include="*.tsx" src/ | wc -l
# Expected: High count for heavy components

# Check for lazy loaded components
grep -rn "React.lazy\|lazy(" --include="*.tsx" src/ | wc -l
```

### 6.4 Server Components

```bash
# Count client vs server components
CLIENT=$(grep -rln "'use client'" --include="*.tsx" src/app/ | wc -l)
TOTAL=$(find src/app -name "*.tsx" | wc -l)
echo "Client components: $CLIENT / $TOTAL"
# Target: < 30% client components
```

### 6.5 Scoring Criteria

| Finding | Deduction |
|---------|-----------|
| Bloated package (lodash, moment) | -10 per package |
| Unoptimized image | -2 per image |
| Missing lazy loading for heavy component | -3 per component |
| > 50% client components | -10 |
| Bundle chunk > 500KB | -5 per chunk |

**Max Score: 100 | Passing: 80+**

---

## JUDGE 7: SEO SPECIALIST (Metadata & Discoverability)

**Mandate:** Ensure complete SEO optimization.

### 7.1 Metadata Coverage

```bash
# Pages with metadata
grep -rln "export const metadata\|generateMetadata" --include="*.tsx" src/app/ | wc -l

# Total pages
find src/app -name "page.tsx" | wc -l

# Layout metadata
grep -rln "export const metadata" --include="layout.tsx" src/app/ | wc -l
```

### 7.2 Required Files

```bash
# Check SEO files exist
for file in "src/app/sitemap.ts" "src/app/robots.ts" "src/app/manifest.ts"; do
  if [ -f "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ MISSING: $file"
  fi
done

# Check favicon
ls public/favicon* public/*.ico 2>/dev/null
```

### 7.3 OpenGraph Tags

```bash
# Check for OG tags
grep -rn "openGraph" --include="*.tsx" src/app/ | wc -l

# Check for Twitter cards
grep -rn "twitter:" --include="*.tsx" src/app/ | wc -l
```

### 7.4 Structured Data

```bash
# Check for JSON-LD
grep -rn "application/ld+json\|structuredData" --include="*.tsx" src/ | wc -l
```

### 7.5 Scoring Criteria

| Finding | Deduction |
|---------|-----------|
| Page without metadata | -2 per page |
| Missing sitemap | -15 |
| Missing robots.txt | -10 |
| Missing OpenGraph | -5 per important page |
| Missing favicon | -10 |
| No structured data | -5 |

**Max Score: 100 | Passing: 85+**

---

## JUDGE 8: DEVOPS GATEKEEPER (CI/CD & Deployment)

**Mandate:** Ensure production deployment readiness.

### 8.1 Git Hooks

```bash
# Check Husky installation
if [ -d ".husky" ] && [ -f ".husky/pre-commit" ]; then
  echo "✅ Husky installed"
else
  echo "❌ Husky not configured"
fi

# Check lint-staged
grep -q '"lint-staged"' package.json && echo "✅ lint-staged" || echo "❌ lint-staged missing"
```

### 8.2 Build Verification

```bash
# Clean build
rm -rf .next
npm run build
echo "Exit code: $?"
# Expected: 0
```

### 8.3 Environment Validation

```bash
# Check .env.example exists
if [ -f ".env.example" ]; then
  echo "✅ .env.example exists"
  wc -l .env.example
else
  echo "❌ MISSING .env.example"
fi

# Check env validation
if [ -f "src/lib/env.ts" ]; then
  grep -c "z\." src/lib/env.ts
fi
```

### 8.4 gitattributes

```bash
# Check export-ignore rules
grep -c "export-ignore" .gitattributes
# Expected: 20+

# Required exclusions
for pattern in ".claude" ".archives" ".internal" "*.test.*" ".env*" "CLAUDE.md"; do
  if grep -q "$pattern" .gitattributes; then
    echo "✅ $pattern excluded"
  else
    echo "❌ MISSING: $pattern"
  fi
done
```

### 8.5 License

```bash
if [ -f "LICENSE" ] || [ -f "LICENSE.md" ]; then
  echo "✅ License file exists"
  head -5 LICENSE* 2>/dev/null
else
  echo "❌ MISSING: LICENSE file"
fi
```

### 8.6 Scoring Criteria

| Finding | Deduction |
|---------|-----------|
| Build fails | -50 (CRITICAL BLOCKER) |
| Missing Husky | -15 |
| Missing lint-staged | -10 |
| Missing .env.example | -15 |
| Missing LICENSE | -10 |
| Incomplete gitattributes | -5 per missing pattern |

**Max Score: 100 | Passing: 90+**

---

## DESIGN SYSTEM SPECIFIC CHECKS

### Token Compliance

```bash
# Run design system audit
node .internal/scripts/utilities/design-system-audit.mjs

# Expected output:
# ✅ No violations found! Design system is consistent.
```

### Hex Color Detection

```bash
npm run scan:hex

# Expected: 0 violations (except documented exceptions)
```

### Theme Completeness

```bash
# Count themes
grep -c '\[data-theme=' src/app/globals.css
# Expected: 12+

# Verify all themes
for theme in root red blue green amber purple gameboy c64 gbpocket vic20 atari spectrum bw; do
  if grep -q "data-theme=['\"]$theme['\"]" src/app/globals.css 2>/dev/null || \
     grep -q "^:root" src/app/globals.css 2>/dev/null; then
    echo "✅ Theme: $theme"
  else
    echo "❌ MISSING: $theme"
  fi
done
```

### Terminal Aesthetic Compliance

```bash
# Check for rounded-none usage
grep -rn "rounded-md\|rounded-lg\|rounded-xl" --include="*.tsx" src/components/ | grep -v "rounded-none\|eslint-disable" | head -10

# Check for font-mono
grep -rn 'className="font-mono' --include="*.tsx" src/ | wc -l
```

---

## OUTPUT FORMAT

### Executive Summary

```markdown
# FABRK SUPER AUDIT — RESULTS

**Date:** YYYY-MM-DD
**Auditor:** Claude Opus 4.5
**Branch:** [branch-name]

## VERDICT: [GO / NO-GO]

## AGGREGATE SCORE: [XX]/100

| Judge | Score | Status | Veto |
|-------|-------|--------|------|
| J1: Russian Judge | XX/100 | PASS/FAIL | - |
| J2: German Engineer | XX/100 | PASS/FAIL | - |
| J3: Dutch Pragmatist | XX/100 | PASS/FAIL | - |
| J4: Security Auditor | XX/100 | PASS/FAIL | - |
| J5: Accessibility Expert | XX/100 | PASS/FAIL | - |
| J6: Performance Engineer | XX/100 | PASS/FAIL | - |
| J7: SEO Specialist | XX/100 | PASS/FAIL | - |
| J8: DevOps Gatekeeper | XX/100 | PASS/FAIL | - |

## CRITICAL BLOCKERS (Immediate NO-GO)

- [ ] [Issue 1]
- [ ] [Issue 2]

## HIGH PRIORITY (Must fix before launch)

- [ ] [Issue 1]
- [ ] [Issue 2]

## MEDIUM PRIORITY (Fix within 1 week)

- [ ] [Issue 1]

## LOW PRIORITY (Technical debt)

- [ ] [Issue 1]

## AUTOMATED SCAN RESULTS

| Scan | Result | Expected |
|------|--------|----------|
| Design System Audit | X violations | 0 |
| TypeScript | Pass/Fail | Pass |
| ESLint | X warnings | 0 |
| Hex Colors | X violations | 0 |
| npm audit | X high/critical | 0 |
| Build | Pass/Fail | Pass |

## JUDGE DETAILS

### J1: Russian Judge

**Score: XX/100**

Findings:
- [Finding 1]
- [Finding 2]

### J2: German Engineer

**Score: XX/100**

Findings:
- [Finding 1]

[... continue for all judges ...]

## RECOMMENDATIONS

1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]

## SIGN-OFF

- [ ] All CRITICAL blockers resolved
- [ ] All judges score 80+
- [ ] Aggregate score 95+
- [ ] Build passes
- [ ] All automated scans pass

**FINAL VERDICT: [GO / NO-GO]**
```

---

## SCORING FORMULA

```
Aggregate Score = (
  (J1 * 0.15) +
  (J2 * 0.15) +
  (J3 * 0.10) +
  (J4 * 0.15) +
  (J5 * 0.10) +
  (J6 * 0.10) +
  (J7 * 0.10) +
  (J8 * 0.15)
)

GO Criteria:
- Aggregate Score >= 95
- ALL veto judges >= 85
- ZERO critical blockers
- Build passes
- All automated scans pass
```

---

## QUICK REFERENCE: CRITICAL BLOCKERS

Any of these = automatic NO-GO:

1. **Exposed secrets** (API keys, passwords, tokens)
2. **Build failure**
3. **TypeScript compilation errors**
4. **SQL injection vulnerability**
5. **XSS vulnerability** (eval, unescaped innerHTML)
6. **Missing LICENSE file**
7. **Critical npm vulnerability**
8. **Authentication bypass**

---

## CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-15 | Initial super audit combining all prompts |

---

*Created by Claude Opus 4.5 for Fabrk SaaS Boilerplate*
*This prompt is the definitive audit standard for launch readiness*
