# Audit Output: Dashboard & Report

Templates for audit dashboards and final reports.

---

## Metrics Dashboard

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
║  COMPLIANCE METRICS                                                          ║
║  ──────────────────                                                          ║
║  Design System:      XX%                                                     ║
║  Accessibility:      XX%                                                     ║
║  Security:           XX%                                                     ║
║  Code Quality:       XX%                                                     ║
║                                                                              ║
║  OVERALL SCORE:     XX.X%                                                    ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  VERDICT:  [PASS/FAIL/NEEDS_WORK]                                            ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## Compact Dashboard

```
AUDIT: XX files | XXX LOC | Score: XX.X%
Issues: 🔴XX 🟠XX 🟡XX 🔵XX = XX total
Verdict: [PASS/FAIL]
```

---

## Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| Total Files Scanned | XXX | - |
| Total Lines of Code | X,XXX | - |
| Issues Found | XX | 🔴 |
| Critical Issues | XX | 🔴 |
| Compliance Score | XX.X% | 🟡 |

---

## Severity Levels

| Level | Emoji | When to Use | Example |
|-------|-------|-------------|---------|
| CRITICAL | 🔴 | Must fix immediately | Hardcoded colors, security |
| HIGH | 🟠 | Must fix before release | Rounded corners, a11y |
| MEDIUM | 🟡 | Should fix soon | Code quality |
| LOW | 🔵 | Nice to fix | Optimizations |

---

## Verdict Criteria

| Verdict | Criteria | Action |
|---------|----------|--------|
| **PASS** | 0 Critical, 0 High, Score ≥ 95% | Ship it |
| **NEEDS_WORK** | 0 Critical, ≤5 High, Score ≥ 80% | Fix High first |
| **FAIL** | Any Critical OR >5 High OR Score < 80% | Block release |

---

## Summary Report Template

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

RECOMMENDED FIX ORDER
─────────────────────
1. Security issues (Critical)
2. Accessibility issues (Critical)
3. Design system colors (Critical)
4. Rounded corners (High)
5. Responsive design (High)

════════════════════════════════════════════════════════════════════════
```
