# FILE STRUCTURE + CODEBASE HYGIENE AUDIT V3

## IMPROVEMENTS FROM V2

| Gap Identified | V3 Addition |
|----------------|-------------|
| No payment provider parity check | Section 9B: Payment Provider Parity |
| No test data clarity validation | Section 17B: Boilerplate Notice Validation |
| No webhook functionality verification | Section 9C: Webhook Handler Validation |
| No .env.example completeness check | Section 13B: Env Var Coverage |
| No SDK usage validation | Section 9D: SDK Integration Check |
| Limited production-ready checks | Section 24: Production Readiness |
| No runtime warning validation | Section 17C: Script Warning Check |
| Boilerplate single-file pattern | Section 3B: File Size Exceptions |

---

## EXECUTIVE SUMMARY FORMAT

```
VERDICT: [GO | NO-GO]
SCORE: [X]/100

CRITICAL BLOCKERS: [count]
HIGH PRIORITY: [count]
MEDIUM PRIORITY: [count]
LOW PRIORITY: [count]

IMMEDIATE ACTION REQUIRED:
1. [blocker 1]
2. [blocker 2]
...
```

---

## LAUNCH BLOCKER CHECKLIST (7 items)

| # | Check | Command/Location | Pass Criteria |
|---|-------|------------------|---------------|
| 1 | `.gitattributes` complete | `grep "export-ignore" .gitattributes \| wc -l` | ≥20 rules |
| 2 | Husky + lint-staged | `grep '"husky"' package.json` | Both present |
| 3 | TypeScript compiles | `npm run type-check` | Exit 0 |
| 4 | Production build | `npm run build` | Exit 0 |
| 5 | No hardcoded secrets | `grep -r "sk_live\|pk_live" src/` | No matches |
| 6 | LICENSE file exists | `ls LICENSE*` | File exists |
| 7 | Pre-commit hooks work | `git commit --dry-run` | Hooks execute |

---

## DEEP AUDIT SECTIONS (24 sections)

### Section 1: gitattributes Completeness
**Check:** All internal files excluded from customer package

```bash
# Required exclusions
for pattern in ".claude" ".archives" ".internal" "*.test.*" "*.spec.*" ".env*" "CLAUDE.md" ".husky" "vitest" "playwright" "mcp-servers" "__tests__" "*.stories.*" ".github" ".vscode"; do
  grep -q "$pattern" .gitattributes && echo "✅ $pattern" || echo "❌ MISSING: $pattern"
done
```

**Pass:** All patterns present

---

### Section 2: Husky/lint-staged Validation
**Check:** Git hooks properly configured

```bash
# Verify installation
grep '"husky"' package.json
grep '"lint-staged"' package.json
ls -la .husky/pre-commit

# Verify lint-staged config exists
grep -A 20 '"lint-staged"' package.json
```

**Pass:** Both installed, hooks exist, config present

---

### Section 3: File Size Analysis
**Check:** No files exceed 300 lines (with exceptions)

```bash
find src -name "*.tsx" -o -name "*.ts" | grep -v ".test." | grep -v ".spec." | grep -v "generated" | while read f; do
  lines=$(wc -l < "$f")
  if [ "$lines" -gt 300 ]; then
    echo "$lines lines: $f"
  fi
done | sort -rn
```

**Pass:** No user-authored files >300 lines

---

### Section 3B: File Size Exceptions (Boilerplate Pattern)
**Check:** Large files are documented as boilerplate templates

**Allowed Exceptions:**
- `src/components/ui/*` - UI components (single-file for copy-paste)
- `src/app/(marketing)/library/*` - Template demos
- `src/generated/*` - Auto-generated code
- `prisma/seed.ts` - Seed script (if well-documented)

**Pass:** Large files are either exceptions or have boilerplate notices

---

### Section 4: Next.js 16 Async Params
**Check:** No sync access to route params in server components

```bash
# Find violations
grep -rn "const.*{.*slug.*}.*=.*params" --include="*.tsx" src/app/ | grep -v "await"

# Verify client components use useParams
grep -l "useParams" src/app/**/*.tsx
```

**Pass:** No violations OR client components correctly use useParams()

---

### Section 5: Design System Token Usage
**Check:** No hardcoded hex colors (except legitimate exceptions)

```bash
grep -rn "#[0-9a-fA-F]\{3,6\}" --include="*.tsx" --include="*.ts" src/ | \
  grep -v "node_modules" | grep -v "generated/" | grep -v "eslint-disable" | \
  grep -v "email" | grep -v "brand" | grep -v "Brand"
```

**Pass:** No violations (email templates exempt with eslint-disable comment)

---

### Section 6: Theme Completeness
**Check:** All 12 themes are complete and functional

```bash
grep -E "^\[data-theme=" src/app/globals.css | sed 's/\[data-theme="//' | sed 's/"\].*//' | sort -u
```

**Required themes:** root, red, blue, green, amber, purple, gameboy, gbpocket, c64, vic20, atari, spectrum, bw

**Pass:** All 12+ themes present with complete token sets

---

### Section 7: TODO/FIXME Comments
**Check:** No production TODOs (documentation/demo exempted)

```bash
grep -rn "TODO\|FIXME" --include="*.tsx" --include="*.ts" src/ | \
  grep -v "node_modules" | grep -v "generated/" | grep -v "/docs/"
```

**Pass:** Zero matches outside documentation

---

### Section 8: Console.log Statements
**Check:** No production console statements

```bash
grep -rn "console\.\(log\|debug\|info\)" --include="*.tsx" --include="*.ts" src/ | \
  grep -v "node_modules" | grep -v "generated/" | grep -v ".test." | grep -v "/docs/"
```

**Pass:** Zero matches outside documentation examples

---

### Section 9: API Route Inventory
**Check:** All required API routes exist

```bash
# Count total routes
find src/app/api -name "route.ts" | wc -l

# Verify critical routes
for route in "auth" "stripe" "polar" "lemonsqueezy" "webhooks"; do
  find src/app/api -path "*$route*" -name "route.ts" | head -1
done
```

**Pass:** ≥50 routes, all critical routes present

---

### Section 9B: Payment Provider Parity (NEW)
**Check:** ALL payment providers have webhook handlers

```bash
echo "=== Payment Provider Webhooks ==="
for provider in stripe polar lemonsqueezy; do
  if find src/app/api -path "*$provider*webhook*" -name "route.ts" | grep -q .; then
    echo "✅ $provider webhook exists"
  else
    echo "❌ MISSING: $provider webhook"
  fi
done
```

**Pass:** 3/3 payment provider webhooks exist

---

### Section 9C: Webhook Handler Validation (NEW)
**Check:** Webhooks have proper signature verification

```bash
for provider in stripe polar lemonsqueezy; do
  webhook_file=$(find src/app/api -path "*$provider*webhook*" -name "route.ts" | head -1)
  if [ -n "$webhook_file" ]; then
    if grep -q "signature\|verify\|validateEvent" "$webhook_file"; then
      echo "✅ $provider has signature verification"
    else
      echo "⚠️ $provider missing signature verification"
    fi
  fi
done
```

**Pass:** All webhooks have signature verification

---

### Section 9D: SDK Integration Check (NEW)
**Check:** Payment SDKs used correctly

```bash
# Check Polar SDK usage
grep -r "validateEvent\|@polar-sh/sdk" src/app/api/polar/

# Check Stripe SDK usage
grep -r "stripe.webhooks.constructEvent" src/app/api/stripe/

# Check Lemonsqueezy verification
grep -r "verifyWebhookSignature" src/app/api/lemonsqueezy/
```

**Pass:** All SDKs used with proper verification methods

---

### Section 10: SEO Files
**Check:** sitemap and robots files exist

```bash
ls -la src/app/sitemap.* src/app/robots.*
```

**Pass:** Both files exist

---

### Section 11: LICENSE File
**Check:** License file exists with proper content

```bash
ls -la LICENSE* && head -5 LICENSE*
```

**Pass:** File exists with appropriate license type

---

### Section 12: Middleware Validation
**Check:** Next.js middleware properly configured

```bash
if [ -f "src/middleware.ts" ]; then
  echo "✅ middleware.ts exists"
  grep -A5 "config" src/middleware.ts
else
  echo "❌ MISSING: middleware.ts"
fi
```

**Pass:** Middleware exists with proper config

---

### Section 13: Environment Validation
**Check:** Zod env validation exists

```bash
if [ -f "src/lib/env.ts" ]; then
  grep -c "z\." src/lib/env.ts
fi
```

**Pass:** env.ts exists with ≥30 Zod validations

---

### Section 13B: Env Var Coverage (NEW)
**Check:** All env vars in code have .env.example entries

```bash
# Find env vars used in code
grep -roh "process\.env\.\w\+" src/ | sort -u > /tmp/code_envs.txt

# Find env vars in .env.example
grep -E "^[A-Z_]+=" .env.example | cut -d= -f1 | sort -u > /tmp/example_envs.txt

# Find missing
comm -23 /tmp/code_envs.txt /tmp/example_envs.txt
```

**Pass:** All code env vars have .env.example entries

---

### Section 14: Error Boundaries
**Check:** Error boundaries at all route levels

```bash
find src/app -name "error.tsx"
find src/app -name "not-found.tsx"
find src/app -name "global-error.tsx"
```

**Pass:** error.tsx at root and each route group, global-error.tsx exists

---

### Section 15: Duplicate Files
**Check:** No unintentional duplicate files

```bash
find src -name "*.tsx" -exec basename {} \; | sort | uniq -d
```

**Pass:** Duplicates are legitimate (different route groups)

---

### Section 16: i18n Configuration
**Check:** i18n properly configured

```bash
cat src/config/i18n.ts | head -20
```

**Pass:** ≥4 locales configured

---

### Section 17: Prisma Seed Data
**Check:** Seed file exists with example data

```bash
if [ -f "prisma/seed.ts" ]; then
  head -30 prisma/seed.ts
fi
```

**Pass:** Seed file exists

---

### Section 17B: Boilerplate Notice Validation (NEW)
**Check:** Template/example files have clear warnings

```bash
# Check seed.ts for boilerplate notice
if grep -q "BOILERPLATE\|EXAMPLE\|CUSTOMIZE\|BEFORE.*PRODUCTION" prisma/seed.ts; then
  echo "✅ seed.ts has boilerplate notice"
else
  echo "❌ seed.ts missing boilerplate notice"
fi

# Check for example data warnings
grep -n "EXAMPLE\|example\|test\|Test" prisma/seed.ts | head -5
```

**Pass:** Seed file has clear boilerplate/example notices

---

### Section 17C: Script Warning Check (NEW)
**Check:** Scripts warn users about example data

```bash
# Check for runtime warnings in seed
if grep -q 'console.*WARNING\|console.*EXAMPLE\|console.*Customize' prisma/seed.ts; then
  echo "✅ seed.ts has runtime warnings"
else
  echo "⚠️ seed.ts missing runtime warnings"
fi
```

**Pass:** Scripts output warnings when run

---

### Section 18: Component Count
**Check:** Component counts match documentation

```bash
find src/components/ui -name "*.tsx" | wc -l
find src/components -name "*.tsx" | wc -l
```

**Pass:** UI components ≥70, total ≥200

---

### Section 19: TypeScript
**Check:** TypeScript compiles without errors

```bash
npm run type-check
```

**Pass:** Exit code 0

---

### Section 20: Security Patterns
**Check:** No dangerous patterns

```bash
grep -rn "dangerouslySetInnerHTML" --include="*.tsx" src/ | grep -v "eslint-disable"
grep -rn "eval(" --include="*.tsx" --include="*.ts" src/
```

**Pass:** No eval(), dangerouslySetInnerHTML only with eslint-disable comments

---

### Section 21: Bundle Size
**Check:** No legacy bundle bloat

```bash
for pkg in lodash moment jquery underscore; do
  if grep -q "\"$pkg\"" package.json; then
    echo "⚠️ Found $pkg"
  fi
done
```

**Pass:** None of these packages present

---

### Section 22: Generated Files
**Check:** Generated files properly excluded

```bash
grep "generated" .gitignore
```

**Pass:** Generated directories in .gitignore

---

### Section 23: Accessibility
**Check:** No images without alt, icon buttons have aria-label

```bash
grep -rn "<img" --include="*.tsx" src/ | grep -v 'alt=' | head -5
grep -rn 'size="icon"' --include="*.tsx" src/components/ | grep -v "aria-label" | head -5
```

**Pass:** All images have alt, icon buttons have aria-label

---

### Section 24: Production Readiness (NEW)
**Check:** No hardcoded test data in production code

```bash
# Check for test customer IDs
grep -rn "cus_test\|pi_test\|sk_test" --include="*.ts" --include="*.tsx" src/ | \
  grep -v "/docs/" | grep -v "seed.ts" | grep -v ".test."

# Check for example.com emails in non-seed files
grep -rn "@example\.com" --include="*.ts" --include="*.tsx" src/ | \
  grep -v "seed.ts" | grep -v "/docs/"
```

**Pass:** No hardcoded test data outside seed/docs

---

## OUTPUT FORMAT

```markdown
# AUDIT RESULTS

## Executive Summary
VERDICT: [GO|NO-GO]
SCORE: [X]/100

## Blockers (Must Fix)
- [ ] Issue 1
- [ ] Issue 2

## High Priority
- [ ] Issue 1

## Medium Priority
- [ ] Issue 1

## Low Priority
- [ ] Issue 1

## Passed Checks
- [x] Section 1: gitattributes (29 rules)
- [x] Section 2: Husky/lint-staged
...

## Recommendations
1. Recommendation 1
2. Recommendation 2
```

---

## SCORING

| Category | Points | Criteria |
|----------|--------|----------|
| Launch Blockers | -20 each | Any blocker = immediate NO-GO |
| Critical Issues | -5 each | Security, build failures |
| High Priority | -3 each | Missing features, incomplete |
| Medium Priority | -2 each | Code quality, documentation |
| Low Priority | -1 each | Minor improvements |

**Passing Score:** 90/100 minimum for GO verdict
**Perfect Score:** 100/100 (no deductions)
