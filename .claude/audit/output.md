# Audit Output Format

Templates for generating comprehensive audit reports.

---

## Issue Format

### Individual Issue Card

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ISSUE #001                                        [CRITICAL]   ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ File:      src/components/landing/hero.tsx                     ┃
┃ Line:      47-49                                               ┃
┃ Category:  COLOR                                               ┃
┃ Rule:      No hardcoded colors                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ CURRENT:                                                       ┃
┃   <div className="bg-purple-500 text-white">                   ┃
┃                                                                ┃
┃ REQUIRED:                                                      ┃
┃   <div className="bg-primary text-primary-foreground">        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Compact Issue Format (for tables)

```
#001 | CRITICAL | src/hero.tsx:47 | COLOR | bg-purple-500 → bg-primary
```

---

## Summary Tables

Generate these tables after scanning:

### 1. Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| Total Files Scanned | XXX | - |
| Total Lines of Code | X,XXX | - |
| Issues Found | XX | 🔴 |
| Critical Issues | XX | 🔴 |
| Compliance Score | XX.X% | 🟡 |

---

### 2. Issues by Category

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Color Violations | | | | | |
| Shape/Rounded | | | | | |
| Typography | | | | | |
| Accessibility | | | | | |
| Security | | | | | |
| Code Quality | | | | | |
| Documentation | | | | | |
| **TOTAL** | | | | | |

---

### 3. Color Token Violations

| # | Severity | File | Line | Hardcoded | Token Replacement |
|---|----------|------|------|-----------|-------------------|
| 1 | 🔴 CRIT | hero.tsx | 47 | `bg-purple-500` | `bg-primary` |
| 2 | 🔴 CRIT | hero.tsx | 48 | `text-white` | `text-primary-foreground` |
| | | | | | |

---

### 4. Rounded Corner Violations

| # | Severity | File | Line | Current | Fix |
|---|----------|------|------|---------|-----|
| 1 | 🟠 HIGH | card.tsx | 23 | `rounded-lg` | `rounded-none` |
| 2 | 🟠 HIGH | button.tsx | 15 | `rounded-md` | `rounded-none` |
| | | | | | |

---

### 5. Shadow Violations

| # | Severity | File | Line | Current | Fix |
|---|----------|------|------|---------|-----|
| 1 | 🔴 CRIT | dialog.tsx | 34 | `shadow-lg` | `shadow-sm` |
| | | | | | |

---

### 6. Typography Violations

| # | Severity | File | Line | Issue | Fix |
|---|----------|------|------|-------|-----|
| 1 | 🟠 HIGH | label.tsx | 12 | Missing `font-mono` | Add `font-mono text-xs` |
| 2 | 🟠 HIGH | button.tsx | 8 | Missing `> PREFIX` | Change to `> SUBMIT` |
| | | | | | |

---

### 7. Accessibility Issues

| # | Severity | File | Line | WCAG | Issue | Fix |
|---|----------|------|------|------|-------|-----|
| 1 | 🔴 CRIT | icon-btn.tsx | 15 | 1.1.1 | Missing `aria-label` | Add `aria-label="Close"` |
| 2 | 🔴 CRIT | input.tsx | 22 | 1.3.1 | Missing label | Add `<Label htmlFor="">` |
| 3 | 🟠 HIGH | nav.tsx | 45 | 2.4.7 | `outline-none` w/o focus | Add `focus-visible:outline` |
| | | | | | | |

---

### 8. Security Issues

| # | Severity | File | Line | Issue | Risk | Fix |
|---|----------|------|------|-------|------|-----|
| 1 | 🔴 CRIT | api.ts | 34 | `process.env.API_KEY` | Env bypass | Use `env.server.API_KEY` |
| 2 | 🔴 CRIT | html.tsx | 12 | `dangerouslySetInnerHTML` | XSS | Add DOMPurify |
| | | | | | | |

---

### 9. Code Quality Issues

| # | Severity | File | Line | Type | Issue |
|---|----------|------|------|------|-------|
| 1 | 🟡 MED | utils.ts | 45 | Debug | `console.log()` |
| 2 | 🟡 MED | form.tsx | 12 | TODO | `// TODO: fix validation` |
| 3 | 🟡 MED | types.ts | 89 | TypeScript | `: any` without comment |
| | | | | | |

---

### 10. File Size Violations

| # | Severity | File | Lines | Action |
|---|----------|------|-------|--------|
| 1 | 🔴 CRIT | hero.tsx | 456 | MUST split immediately |
| 2 | 🟠 HIGH | dashboard.tsx | 342 | MUST split |
| 3 | 🟡 MED | settings.tsx | 245 | Review for split |
| | | | | |

---

### 11. Documentation Violations

| # | Severity | File | Issue | Fix |
|---|----------|------|-------|-----|
| 1 | 🟠 HIGH | button/page.tsx | Missing template | Use `ComponentShowcaseTemplate` |
| 2 | 🟠 HIGH | card/page.tsx | DocsCard no title | Add `title="CARD"` |
| 3 | 🟡 MED | input/page.tsx | Wrapper div in preview | Remove wrapper |
| | | | | |

---

### 12. Template Compliance

| Category | Total Pages | Using Template | Compliant | Score |
|----------|-------------|----------------|-----------|-------|
| Components | XX | XX | XX | XX% |
| Features | XX | XX | XX | XX% |
| Tutorials | XX | XX | XX | XX% |
| Getting Started | XX | XX | XX | XX% |
| **TOTAL** | XX | XX | XX | XX% |

---

### 13. Enterprise Pattern Compliance

| Pattern | Required | Found | Missing | Status |
|---------|----------|-------|---------|--------|
| Error boundaries | XX routes | XX | XX | ✅/❌ |
| Loading states | XX routes | XX | XX | ✅/❌ |
| Not-found pages | XX routes | XX | XX | ✅/❌ |
| Suspense boundaries | XX lazy | XX | XX | ✅/❌ |
| Error handling | XX fetches | XX | XX | ✅/❌ |

---

## Metrics Dashboard

### Full Dashboard

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                          DESIGN SYSTEM AUDIT REPORT                          ║
║                              [DATE] [TIME]                                    ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  FILES SCANNED                         ISSUES BY SEVERITY                    ║
║  ─────────────────                     ───────────────────                   ║
║  Total Files:          XXX             🔴 Critical:         XX               ║
║  Lines of Code:      X,XXX             🟠 High:             XX               ║
║  Compliant:        XX (XX%)            🟡 Medium:           XX               ║
║  With Issues:      XX (XX%)            🔵 Low:              XX               ║
║                                                                              ║
║  ISSUES BY CATEGORY                    COMPLIANCE METRICS                    ║
║  ──────────────────                    ──────────────────                    ║
║  Colors:               XX              Design System:      XX%               ║
║  Shapes:               XX              Accessibility:      XX%               ║
║  Typography:           XX              Security:           XX%               ║
║  Accessibility:        XX              Documentation:      XX%               ║
║  Security:             XX              Code Quality:       XX%               ║
║  Code Quality:         XX                                                    ║
║  Documentation:        XX              OVERALL SCORE:     XX.X%              ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  VERDICT:  [PASS/FAIL/NEEDS_WORK]                                            ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### Compact Dashboard

```
AUDIT: XX files | XXX LOC | Score: XX.X%
Issues: 🔴XX 🟠XX 🟡XX 🔵XX = XX total
Verdict: [PASS/FAIL]
```

---

## Severity Levels

| Level | Emoji | Color | When to Use | Example |
|-------|-------|-------|-------------|---------|
| CRITICAL | 🔴 | Red | Must fix immediately - blocks release | Hardcoded colors, security issues |
| HIGH | 🟠 | Orange | Must fix before release | Rounded corners, missing a11y |
| MEDIUM | 🟡 | Yellow | Should fix soon | Code quality, file size |
| LOW | 🔵 | Blue | Nice to fix | Minor optimizations |

---

## Verdict Criteria

| Verdict | Criteria | Action |
|---------|----------|--------|
| **PASS** | 0 Critical, 0 High, Score ≥ 95% | Ready to ship |
| **NEEDS_WORK** | 0 Critical, ≤5 High, Score ≥ 80% | Fix High issues first |
| **FAIL** | Any Critical OR >5 High OR Score < 80% | Block release, fix all |

---

## Report Sections Order

1. **Executive Summary** - Quick overview for stakeholders
2. **Metrics Dashboard** - Visual compliance status
3. **Critical Issues** - Must fix immediately
4. **High Priority Issues** - Must fix before release
5. **Category Breakdowns** - Detailed tables
6. **Recommendations** - Suggested fix order
7. **Next Steps** - Action items

---

## Accessibility Report Section

### WCAG 2.1 AA Compliance

| Principle | Guideline | Status | Issues |
|-----------|-----------|--------|--------|
| Perceivable | 1.1 Text Alternatives | ✅/❌ | XX |
| Perceivable | 1.3 Adaptable | ✅/❌ | XX |
| Perceivable | 1.4 Distinguishable | ✅/❌ | XX |
| Operable | 2.1 Keyboard Accessible | ✅/❌ | XX |
| Operable | 2.4 Navigable | ✅/❌ | XX |
| Understandable | 3.1 Readable | ✅/❌ | XX |
| Understandable | 3.2 Predictable | ✅/❌ | XX |
| Robust | 4.1 Compatible | ✅/❌ | XX |

---

## 14. Spacing Violations

| # | Severity | File | Line | Current | Fix |
|---|----------|------|------|---------|-----|
| 1 | 🟡 MED | hero.tsx | 23 | `p-3` | `p-2` or `p-4` |
| 2 | 🟡 MED | card.tsx | 45 | `gap-5` | `gap-4` or `gap-6` |
| 3 | 🟡 MED | form.tsx | 67 | `space-y-7` | `space-y-6` or `space-y-8` |
| | | | | | |

**Rule:** Use 8-point grid (p-1, p-2, p-4, p-6, p-8, p-12, p-16)

---

## 15. Animation & Transition Violations

| # | Severity | File | Line | Issue | Fix |
|---|----------|------|------|-------|-----|
| 1 | 🟡 MED | button.tsx | 15 | `hover:bg-muted` missing transition | Add `transition-colors duration-200` |
| 2 | 🟡 MED | card.tsx | 28 | `duration-500` too slow | Use `duration-200` or `duration-300` |
| 3 | 🟠 HIGH | modal.tsx | 45 | Animation without reduced-motion | Add `motion-reduce:` or `motion-safe:` |
| | | | | | |

---

## 16. Responsive Design Violations

| # | Severity | File | Line | Issue | Fix |
|---|----------|------|------|-------|-----|
| 1 | 🟠 HIGH | grid.tsx | 12 | `grid-cols-4` not responsive | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` |
| 2 | 🟠 HIGH | hero.tsx | 34 | `text-5xl` not responsive | `text-2xl md:text-4xl lg:text-5xl` |
| 3 | 🟠 HIGH | sidebar.tsx | 56 | `w-[300px]` breaks mobile | `w-full md:w-[300px]` |
| 4 | 🟡 MED | nav.tsx | 23 | `hidden md:flex` no mobile alt | Add mobile nav alternative |
| | | | | | |

---

## 17. Theme Compliance

### Token Usage Audit

| Category | Total | Using Tokens | Hardcoded | Score |
|----------|-------|--------------|-----------|-------|
| Backgrounds | XX | XX | XX | XX% |
| Text colors | XX | XX | XX | XX% |
| Border colors | XX | XX | XX | XX% |
| **TOTAL** | XX | XX | XX | XX% |

### Theme Switching Test

| Theme | Landing | Dashboard | Docs | Templates | Score |
|-------|---------|-----------|------|-----------|-------|
| Light | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | X/4 |
| Dark | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | X/4 |
| Synthwave | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | X/4 |
| Dracula | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | X/4 |

---

## 18. Icon Violations

| # | Severity | File | Line | Issue | Fix |
|---|----------|------|------|-------|-----|
| 1 | 🔴 CRIT | button.tsx | 45 | Icon button missing `aria-label` | Add `aria-label="Close"` |
| 2 | 🟡 MED | nav.tsx | 23 | Icon size inconsistent | Use `h-5 w-5` for nav icons |
| 3 | 🟡 MED | card.tsx | 67 | Decorative icon missing `aria-hidden` | Add `aria-hidden="true"` |
| | | | | | |

---

## 19. Radix UI Violations

| # | Severity | File | Line | Component | Issue | Fix |
|---|----------|------|------|-----------|-------|-----|
| 1 | 🟠 HIGH | link.tsx | 12 | Button+Link | Missing `asChild` | Add `asChild` to Button |
| 2 | 🟠 HIGH | dialog.tsx | 34 | Dialog | Missing `onOpenChange` | Add controlled state |
| 3 | 🟡 MED | select.tsx | 56 | Select | Missing `placeholder` | Add placeholder prop |
| 4 | 🟡 MED | tabs.tsx | 78 | Tabs | Missing `defaultValue` | Add defaultValue prop |
| | | | | | | |

---

## 20. Framer Motion Violations

| # | Severity | File | Line | Issue | Fix |
|---|----------|------|------|-------|-----|
| 1 | 🟡 MED | hero.tsx | 45 | `animate` without `initial` | Add `initial` prop |
| 2 | 🟡 MED | modal.tsx | 67 | Exit animation without AnimatePresence | Wrap in AnimatePresence |
| 3 | 🟡 MED | list.tsx | 89 | Mapped items without `layout` | Add `layout` prop for reorder |
| | | | | | |

---

## Performance Metrics (Optional)

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Largest Contentful Paint | < 2.5s | X.Xs | ✅/❌ |
| First Input Delay | < 100ms | XXms | ✅/❌ |
| Cumulative Layout Shift | < 0.1 | X.XX | ✅/❌ |
| Bundle Size (gzipped) | < 100KB | XXKB | ✅/❌ |

---

## Quick Fix Recipes

### Batch Rounded Corner Fix

```bash
# Preview files with violations
grep -rn "rounded-lg\|rounded-md\|rounded-sm\|rounded-xl" src/app src/components --include="*.tsx"

# Count violations
grep -rE "rounded-(sm|md|lg|xl|2xl|3xl)" src/ --include="*.tsx" | wc -l
```

### Batch Spacing Fix

```bash
# Find non-grid spacing
grep -rE "(p|m|gap|space)-(3|5|7|9|11)" src/ --include="*.tsx"

# Common replacements:
# p-3 → p-2 or p-4
# p-5 → p-4 or p-6
# gap-3 → gap-2 or gap-4
```

### Batch Transition Fix

```bash
# Find hover without transition
grep -rn "hover:" src/ --include="*.tsx" | grep -v "transition"

# Add transition-colors duration-200 before hover:
```

### Batch Responsive Fix

```bash
# Find non-responsive grids
grep -rn "grid-cols-[3-6]" src/ --include="*.tsx" | grep -v "md:\|lg:\|sm:"

# Find non-responsive text
grep -rn "text-[3-5]xl" src/ --include="*.tsx" | grep -v "md:\|lg:\|sm:"
```

---

## Summary Report Template (Copy-Paste)

```
════════════════════════════════════════════════════════════════════════
                         DESIGN SYSTEM AUDIT
                          [DATE] [TIME]
════════════════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY
─────────────────
Files Scanned:    XXX
Lines of Code:    X,XXX
Compliance Score: XX.X%
Verdict:          [PASS/NEEDS_WORK/FAIL]

ISSUES BY SEVERITY
──────────────────
🔴 Critical:  XX  (must fix immediately)
🟠 High:      XX  (must fix before release)
🟡 Medium:    XX  (should fix soon)
🔵 Low:       XX  (nice to fix)
─────────────────
Total:        XX

TOP ISSUES
──────────
1. [SEVERITY] file:line - Issue description
2. [SEVERITY] file:line - Issue description
3. [SEVERITY] file:line - Issue description
4. [SEVERITY] file:line - Issue description
5. [SEVERITY] file:line - Issue description

CATEGORY BREAKDOWN
──────────────────
Colors:        XX violations
Shapes:        XX violations
Typography:    XX violations
Accessibility: XX violations
Spacing:       XX violations
Animation:     XX violations
Responsive:    XX violations
Security:      XX violations
Code Quality:  XX violations
Documentation: XX violations

RECOMMENDED FIX ORDER
─────────────────────
1. Security issues (Critical)
2. Accessibility issues (Critical)
3. Design system colors (Critical)
4. Rounded corners (High)
5. Responsive design (High)
6. Spacing alignment (Medium)
7. Animation timing (Medium)
8. Code quality (Medium)

════════════════════════════════════════════════════════════════════════
```
