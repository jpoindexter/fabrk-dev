# File Naming Consistency Analysis Report

**Date:** November 13, 2025  
**Codebase:** Fabrk Plate (Next.js 15 SaaS Boilerplate)  
**Scope:** src/components, src/lib, src/app directories

---

## Executive Summary

The codebase has **moderate inconsistencies** in file naming conventions. The primary issues are:

1. **PascalCase vs kebab-case mixing in src/components/** (15 files affected)
2. **Directory duplication** in legal pages (src/app/legal vs src/app/(legal))
3. **Isolated PascalCase files** in otherwise kebab-case directories
4. **Directory naming confusion** (home vs landing component directories)
5. **One TSX file in src/lib/** that should follow lib naming conventions

**Recommendation:** Standardize to **kebab-case for all component and utility files** (React convention used by most of the codebase).

---

## 1. Component File Naming Issues

### 1.1 PascalCase Files in src/components/ (Non-Compliant)

These files violate the kebab-case convention used throughout the project:

| File Path | Issue | Recommendation |
|-----------|-------|-----------------|
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/ErrorBoundary.tsx` | PascalCase | Rename to `error-boundary.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/ErrorBoundary.test.tsx` | PascalCase test file | Rename to `error-boundary.test.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/MonitoringProvider.tsx` | PascalCase | Rename to `monitoring-provider.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/NotificationCenter.tsx` | PascalCase | Rename to `notification-center.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/dashboard/TierBadge.tsx` | PascalCase in kebab-case directory | Rename to `tier-badge.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/dashboard/UsageLimits.tsx` | PascalCase in kebab-case directory | Rename to `usage-limits.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/feature-flags/FeatureGate.tsx` | PascalCase in kebab-case directory | Rename to `feature-gate.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/feedback/FeedbackWidget.tsx` | PascalCase in kebab-case directory | Rename to `feedback-widget.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/feedback/NPSSurvey.tsx` | PascalCase in kebab-case directory | Rename to `nps-survey.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/seo/Breadcrumbs.tsx` | PascalCase in kebab-case directory | Rename to `breadcrumbs.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/seo/FAQSection.tsx` | PascalCase in kebab-case directory | Rename to `faq-section.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/seo/HowTo.tsx` | PascalCase in kebab-case directory | Rename to `how-to.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/seo/SchemaScript.tsx` | PascalCase in kebab-case directory | Rename to `schema-script.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/theme/ThemeProvider.tsx` | PascalCase in kebab-case directory | Rename to `theme-provider.tsx` |
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/theme/ThemeToggle.tsx` | PascalCase in kebab-case directory | Rename to `theme-toggle.tsx` |

**Total: 15 files need renaming**

### 1.2 Component Files Correctly Named (Compliant)

These files follow the kebab-case convention properly:

- All files in `/src/components/account/` ✓
- All files in `/src/components/admin/` ✓
- All files in `/src/components/auth/` ✓
- All files in `/src/components/dashboard/purchase-status/` ✓
- All files in `/src/components/home/` ✓
- All files in `/src/components/landing/` ✓
- All files in `/src/components/pricing/` ✓
- All files in `/src/components/security/` ✓
- All files in `/src/components/settings/` ✓
- All files in `/src/components/showcase/` ✓
- All files in `/src/components/ui/` ✓
- Single-file kebab-case: `footer.tsx`, `navigation.tsx`, `providers.tsx`, `theme-switcher.tsx`

### 1.3 Mixed PascalCase and kebab-case in Same Directory

**Directories with mixed naming:**

```
src/components/seo/
├── Breadcrumbs.tsx         ❌ PascalCase
├── FAQSection.tsx          ❌ PascalCase
├── HowTo.tsx               ❌ PascalCase
├── SchemaScript.tsx        ❌ PascalCase
└── index.ts                ✓ kebab-case (actually lowercase)

src/components/theme/
├── ThemeProvider.tsx       ❌ PascalCase
├── ThemeToggle.tsx         ❌ PascalCase
├── mode-toggle.tsx         ✓ kebab-case
└── (no index file)

src/components/dashboard/
├── TierBadge.tsx           ❌ PascalCase
├── UsageLimits.tsx         ❌ PascalCase
├── purchase-status.tsx     ✓ kebab-case
└── purchase-status/        ✓ kebab-case directory
```

---

## 2. Library File Naming Issues

### 2.1 TSX File in src/lib/ (Non-Standard)

| File Path | Issue | Recommendation |
|-----------|-------|-----------------|
| `/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/lib/analytics/AnalyticsProvider.tsx` | PascalCase TSX in lib directory | Rename to `analytics-provider.tsx` |

**Note:** The src/lib/ directory should contain utility functions and services (all TS files). React components should live in src/components/ only.

### 2.2 All Other lib/ Files (Compliant)

All other files in src/lib/ follow kebab-case convention properly:
- All TypeScript files use lowercase/kebab-case ✓
- Proper organization by feature (auth, stripe, security, etc.) ✓

---

## 3. Directory Duplication Issues

### 3.1 Legal Pages Duplication (CRITICAL)

**Two separate legal directories exist with overlapping content:**

```
src/app/legal/                    src/app/(legal)/
├── cookies/page.tsx            ├── layout.tsx
├── privacy/page.tsx            ├── privacy/page.tsx
└── terms/page.tsx              ├── refund/page.tsx
                                └── terms/page.tsx
```

**Issues:**
- `/src/app/legal/privacy/page.tsx` (full page - 280+ lines)
- `/src/app/(legal)/privacy/page.tsx` (layout-only version)
- Both routes are accessible: `/legal/privacy` AND `/(legal)/privacy`
- `/(legal)/` has a layout.tsx, `/legal/` does not
- `/legal/cookies` exists only in non-parenthesized version
- `/legal/refund` exists only in parenthesized version

**Recommendation:** Consolidate into single legal directory:
- Keep: `src/app/(legal)/` with layout.tsx
- Move: privacy.tsx from `/legal/` to `/(legal)/` if the detailed version is needed
- Add: cookies page to `/(legal)/` directory
- Delete: The duplicate `/legal/` directory entirely
- Update: All links in codebase to use `/(legal)/privacy`, `/(legal)/terms`, etc.

### 3.2 Other Directory Naming (No Critical Issues)

**landing vs home component directories:**
- `/src/components/landing/` - Landing page specific components (navigation, hero, pricing, etc.)
- `/src/components/home/` - Home page specific components (hero, features, pricing, etc.)

**Status:** This is acceptable as they serve different page variants, but could be consolidated if they have duplicate components.

**Suggestion:** Review if `home/` and `landing/` have duplicate components. If so, consolidate into single directory.

---

## 4. Other Naming Patterns

### 4.1 Stories Files (Storybook)

All story files follow kebab-case convention:
- `accordion.stories.tsx` ✓
- `button.stories.tsx` ✓
- `page-wrapper.stories.tsx` ✓

This is correct.

### 4.2 Test Files

Test file naming:
- `error-boundary.test.tsx` (prefix) ✓
- `ErrorBoundary.test.tsx` (wrong prefix) ❌
- Files in `ui/__tests__/` with kebab-case names ✓

### 4.3 App Routes (Special Cases)

Next.js special files are correctly named:
- `page.tsx` ✓
- `layout.tsx` ✓
- `route.ts` ✓
- `error.tsx` ✓
- `not-found.tsx` ✓
- `loading.tsx` ✓
- `global-error.tsx` ✓

---

## 5. Summary of Changes Required

### Priority 1 (Critical - Directory Duplication)
```
1. Merge /legal and /(legal) directories
   - Decision: Keep /(legal) with layout.tsx
   - Action: Move cookies, privacy (detailed), terms to /(legal)
   - Delete: /legal/ directory entirely
```

### Priority 2 (High - Component File Renames)
```
2. Rename 15 component files from PascalCase to kebab-case
   - ErrorBoundary.tsx → error-boundary.tsx
   - MonitoringProvider.tsx → monitoring-provider.tsx
   - NotificationCenter.tsx → notification-center.tsx
   - TierBadge.tsx → tier-badge.tsx
   - UsageLimits.tsx → usage-limits.tsx
   - FeatureGate.tsx → feature-gate.tsx
   - FeedbackWidget.tsx → feedback-widget.tsx
   - NPSSurvey.tsx → nps-survey.tsx
   - Breadcrumbs.tsx → breadcrumbs.tsx
   - FAQSection.tsx → faq-section.tsx
   - HowTo.tsx → how-to.tsx
   - SchemaScript.tsx → schema-script.tsx
   - ThemeProvider.tsx → theme-provider.tsx
   - ThemeToggle.tsx → theme-toggle.tsx
   - + test file: ErrorBoundary.test.tsx → error-boundary.test.tsx
```

### Priority 3 (Medium - Library File)
```
3. Move analytics provider to components
   - Option A: Move AnalyticsProvider.tsx to src/components/
   - Option B: Rename to analytics-provider.tsx and keep in lib/analytics/
   - Note: React components should live in src/components/, not src/lib/
```

### Priority 4 (Low - Optional Consolidation)
```
4. Review home/ vs landing/ directories
   - Check for duplicate components
   - Consolidate if significant overlap exists
```

---

## 6. Naming Convention Standards

### Established Convention
The codebase uses **kebab-case** for:
- Component files: `button.tsx`, `error-boundary.tsx`, `user-profile.tsx`
- Utility files: `error-handler.ts`, `format.ts`
- Directory names: `ui/`, `auth/`, `dashboard/`

### Rule of Thumb
| Category | Pattern | Example |
|----------|---------|---------|
| React Components | kebab-case | `error-boundary.tsx` |
| Utilities/Services | kebab-case | `error-handler.ts` |
| Directories | kebab-case | `src/components/auth/` |
| Component Classes | PascalCase (inside file) | `export default function ErrorBoundary()` |
| Types/Interfaces | PascalCase (inside file) | `interface ErrorBoundaryProps {}` |
| Constants | UPPER_SNAKE_CASE (inside file) | `const ERROR_MAX_RETRIES = 3;` |
| Special Next.js files | lowercase | `page.tsx`, `layout.tsx`, `route.ts` |

---

## 7. Implementation Steps

### Step 1: Fix Directory Duplication
```bash
# Back up original
cp -r src/app/legal src/app/legal.backup

# Delete duplicate
rm -rf src/app/legal/

# Update all route references in code
# Find: /legal/privacy → Replace: /(legal)/privacy
# Find: /legal/terms → Replace: /(legal)/terms
# Add cookies page to (legal) directory
```

### Step 2: Rename Component Files
```bash
# Use git mv to preserve history
git mv src/components/ErrorBoundary.tsx src/components/error-boundary.tsx
git mv src/components/ErrorBoundary.test.tsx src/components/error-boundary.test.tsx
git mv src/components/MonitoringProvider.tsx src/components/monitoring-provider.tsx
git mv src/components/NotificationCenter.tsx src/components/notification-center.tsx
# ... continue for all 15 files

# Update all imports in codebase
# Find: ErrorBoundary → Replace: error-boundary
# etc.
```

### Step 3: Fix Library Files
```bash
# Either move to components or rename
git mv src/lib/analytics/AnalyticsProvider.tsx src/components/analytics/analytics-provider.tsx
# Then update all imports
```

### Step 4: Update Imports
```bash
# Search and replace patterns:
import { ErrorBoundary } from "@/components/ErrorBoundary"
→ import { ErrorBoundary } from "@/components/error-boundary"
```

### Step 5: Verify Exports
Check that all renamed files export correctly:
```typescript
// error-boundary.tsx
export default function ErrorBoundary() { ... }
export { ErrorBoundary }; // if needed
```

---

## 8. Files That Need Updates

After renaming, these import statements need to be updated:

### Files Importing PascalCase Components
```bash
grep -r "from.*ErrorBoundary\|from.*MonitoringProvider\|from.*NotificationCenter" src/ --include="*.tsx" --include="*.ts"
grep -r "from.*TierBadge\|from.*UsageLimits\|from.*FeatureGate" src/ --include="*.tsx" --include="*.ts"
grep -r "from.*FeedbackWidget\|from.*NPSSurvey\|from.*ThemeProvider" src/ --include="*.tsx" --include="*.ts"
grep -r "from.*Breadcrumbs\|from.*FAQSection\|from.*HowTo\|from.*SchemaScript" src/ --include="*.tsx" --include="*.ts"
```

---

## 9. Recommendations

### Immediate Actions (Do First)
1. **Consolidate legal directories** - This is a clear duplicate that causes routing confusion
2. **Standardize component file naming** - Use consistent kebab-case across all components

### Medium-term Actions
1. Move React components from lib/ to components/
2. Add ESLint rule to enforce kebab-case naming for component files
3. Document naming conventions in project README or CONTRIBUTING.md

### Long-term Maintenance
1. Configure ESLint with `eslint-plugin-naming-convention` to prevent future inconsistencies
2. Add pre-commit hooks to catch naming violations before commit
3. Update CLAUDE.md with strict naming convention rules

---

## 10. ESLint Configuration (Recommended)

Add to `.eslintrc.json`:

```json
{
  "rules": {
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        "selector": "variable",
        "format": ["camelCase"]
      },
      {
        "selector": "parameter",
        "format": ["camelCase"]
      },
      {
        "selector": "memberLevelVariable",
        "format": ["camelCase"]
      },
      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      },
      {
        "selector": "enumMember",
        "format": ["UPPER_SNAKE_CASE"]
      }
    ]
  }
}
```

Note: ESLint rules apply to code within files, not filenames themselves. For filename enforcement, use a tool like `check-file-naming-convention-action` or add a custom script.

---

## Appendix: Complete File List

### Files Requiring Rename (15 total)

**Root level components:**
1. `src/components/ErrorBoundary.tsx` → `src/components/error-boundary.tsx`
2. `src/components/ErrorBoundary.test.tsx` → `src/components/error-boundary.test.tsx`
3. `src/components/MonitoringProvider.tsx` → `src/components/monitoring-provider.tsx`
4. `src/components/NotificationCenter.tsx` → `src/components/notification-center.tsx`

**Dashboard components:**
5. `src/components/dashboard/TierBadge.tsx` → `src/components/dashboard/tier-badge.tsx`
6. `src/components/dashboard/UsageLimits.tsx` → `src/components/dashboard/usage-limits.tsx`

**Feature flags components:**
7. `src/components/feature-flags/FeatureGate.tsx` → `src/components/feature-flags/feature-gate.tsx`

**Feedback components:**
8. `src/components/feedback/FeedbackWidget.tsx` → `src/components/feedback/feedback-widget.tsx`
9. `src/components/feedback/NPSSurvey.tsx` → `src/components/feedback/nps-survey.tsx`

**SEO components:**
10. `src/components/seo/Breadcrumbs.tsx` → `src/components/seo/breadcrumbs.tsx`
11. `src/components/seo/FAQSection.tsx` → `src/components/seo/faq-section.tsx`
12. `src/components/seo/HowTo.tsx` → `src/components/seo/how-to.tsx`
13. `src/components/seo/SchemaScript.tsx` → `src/components/seo/schema-script.tsx`

**Theme components:**
14. `src/components/theme/ThemeProvider.tsx` → `src/components/theme/theme-provider.tsx`
15. `src/components/theme/ThemeToggle.tsx` → `src/components/theme/theme-toggle.tsx`

**Library components (misplaced):**
- `src/lib/analytics/AnalyticsProvider.tsx` → Should be moved to `src/components/analytics/analytics-provider.tsx`

---

**Report Generated:** November 13, 2025
**Severity:** Medium (15 files + 1 directory duplication)
**Estimated Fix Time:** 2-3 hours (including imports update)
**Breaking Changes:** None (if done via git mv and proper import updates)
