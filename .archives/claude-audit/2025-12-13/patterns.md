# Audit Patterns

Regex patterns for finding design system violations.

---

## Quick Reference

| Topic | File |
|-------|------|
| Critical & High | [`patterns-critical.md`](patterns-critical.md) |
| Medium & Low | [`patterns-medium.md`](patterns-medium.md) |

---

## Quick Scan Commands

```bash
# CRITICAL: Run first
grep -rE "#[0-9a-fA-F]{3,8}|shadow-(md|lg|xl)|process\.env\." src/ --include="*.tsx"

# HIGH: Run second
grep -rE "rounded-(sm|md|lg|xl)|outline-none(?!.*focus)" src/ --include="*.tsx"

# MEDIUM: Run third
grep -rE "console\.log|TODO|FIXME|: any(?!.*//)" src/ --include="*.tsx"

# Built-in scans
npm run scan:hex    # Hardcoded colors
npm run lint        # ESLint + a11y
npm run type-check  # TypeScript
```

---

## Pattern Categories

| # | Category | Severity |
|---|----------|----------|
| 1 | Colors | CRITICAL |
| 2 | Shapes | HIGH |
| 3 | Typography | HIGH |
| 4 | Accessibility | CRITICAL |
| 5 | Security | CRITICAL |
| 6 | Templates | HIGH |
| 7 | Code Quality | MEDIUM |
| 8 | Spacing | MEDIUM |
| 9 | Animation | MEDIUM |
| 10 | Performance | MEDIUM |
| 11 | Responsive | HIGH |
| 12 | Framer Motion | MEDIUM |
| 13 | Radix UI | HIGH |
| 14 | Imports | LOW |

---

## Most Common Patterns

### Colors (CRITICAL)

```bash
(bg|text|border)-(red|blue|gray|purple)-\d+
bg-white|text-white|bg-black|text-black
```

### Shapes (HIGH)

```bash
rounded-(sm|md|lg|xl)
shadow-(md|lg|xl|2xl)
```

### Accessibility (CRITICAL)

```bash
outline-none(?!.*focus-visible)
<img(?!.*alt=)
size="icon"(?!.*aria-label)
```

### Code Quality (MEDIUM)

```bash
console\.(log|warn|error)
@ts-ignore
TODO|FIXME
```

---

## Pattern Testing

Test patterns at: https://regex101.com/

Verify patterns don't have false positives before bulk fixes.
