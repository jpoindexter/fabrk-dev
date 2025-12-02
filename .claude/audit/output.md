# Audit Output Format

Templates for generating audit reports.

---

## Quick Reference

| Topic | File |
|-------|------|
| Issue Tables | [`output-tables.md`](output-tables.md) |
| Dashboard & Report | [`output-dashboard.md`](output-dashboard.md) |

---

## Compact Issue Format

```
#001 | CRITICAL | src/hero.tsx:47 | COLOR | bg-purple-500 → bg-primary
```

---

## Issues by Category

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Color Violations | | | | | |
| Shape/Rounded | | | | | |
| Typography | | | | | |
| Accessibility | | | | | |
| Security | | | | | |
| Code Quality | | | | | |
| **TOTAL** | | | | | |

---

## Severity Reference

| Level | Emoji | Example |
|-------|-------|---------|
| CRITICAL | 🔴 | Hardcoded colors, security |
| HIGH | 🟠 | Rounded corners, a11y |
| MEDIUM | 🟡 | Code quality |
| LOW | 🔵 | Optimizations |

---

## Compliance Score

```
Score = 100 - (Critical × 10) - (High × 3) - (Medium × 1) - (Low × 0.5)
```

| Score | Verdict |
|-------|---------|
| 95-100 | PASS |
| 80-94 | NEEDS_WORK |
| < 80 | FAIL |

---

## Report Sections Order

1. Executive Summary
2. Metrics Dashboard
3. Critical Issues
4. High Priority Issues
5. Category Breakdowns
6. Recommendations
7. Next Steps
