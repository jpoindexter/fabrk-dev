# Audit Output Format

Templates for reporting audit results.

## Issue Format

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ISSUE #001                                         ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ File:     src/components/landing/hero.tsx          ┃
┃ Line:     47-49                                    ┃
┃ Category: STYLING                                  ┃
┃ Severity: CRITICAL                                 ┃
┃ Rule:     No rounded corners                       ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ CURRENT:                                           ┃
┃   <div className="rounded-lg bg-blue-500">         ┃
┃                                                    ┃
┃ REQUIRED:                                          ┃
┃   <div className="rounded-none bg-primary">        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## Summary Tables

Generate these tables after scanning:

### 1. File Size Violations
| # | Severity | File | Lines | Action |
|---|----------|------|-------|--------|

### 2. Rounded Corner Violations
| # | File | Line | Current | Fix |
|---|------|------|---------|-----|

### 3. Color Token Violations
| # | File | Line | Hardcoded | Token |
|---|------|------|-----------|-------|

### 4. Typography Violations
| # | File | Line | Current | Required |
|---|------|------|---------|----------|

### 5. Base UI Bypasses
| # | File | Line | Custom | Use Instead |
|---|------|------|--------|-------------|

### 6. Accessibility Issues
| # | File | Line | Issue | Fix |
|---|------|------|-------|-----|

### 7. Code Quality Issues
| # | File | Line | Type | Issue |
|---|------|------|------|-------|

### 8. Security Issues
| # | File | Line | Issue | Fix |
|---|------|------|-------|-----|

## Metrics Dashboard

```
╔════════════════════════════════════════════════════════════════╗
║                    AUDIT COMPLETE - METRICS                     ║
╠════════════════════════════════════════════════════════════════╣
║  FILES                             ISSUES BY SEVERITY           ║
║  Total Scanned:        XXX         Critical:           XX       ║
║  Lines of Code:      X,XXX         High:               XX       ║
║  Compliant:        XX (XX%)        Medium:             XX       ║
║  With Issues:      XX (XX%)        Low:                XX       ║
║                                                                 ║
║  COMPLIANCE SCORE:  XX.X%                                       ║
╚════════════════════════════════════════════════════════════════╝
```

## Severity Levels

| Level | Emoji | When to Use |
|-------|-------|-------------|
| CRITICAL | 🔴 | Must fix immediately (hardcoded colors, shadows) |
| HIGH | 🟠 | Must fix (rounded corners, file size) |
| MEDIUM | 🟡 | Should fix (code quality) |
| LOW | 🔵 | Nice to fix (minor issues) |
