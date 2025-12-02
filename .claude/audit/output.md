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

## Performance Metrics (Optional)

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Largest Contentful Paint | < 2.5s | X.Xs | ✅/❌ |
| First Input Delay | < 100ms | XXms | ✅/❌ |
| Cumulative Layout Shift | < 0.1 | X.XX | ✅/❌ |
| Bundle Size (gzipped) | < 100KB | XXKB | ✅/❌ |
