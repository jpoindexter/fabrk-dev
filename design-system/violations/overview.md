# Design System Violations Report

> Generated: 2025-12-05
> Audit Type: CONSISTENCY LOCKDOWN
> Source of Truth: `/design-system/` (tokens, themes, primitives)

---

## Executive Summary

| Category | Violations | Critical | Medium | Low | Info |
|----------|-----------|----------|--------|-----|------|
| Typography | 35 | 0 | 32 | 2 | 1 |
| Spacing | 0 | 0 | 0 | 0 | 0 |
| Colors | 0* | 0 | 0 | 3 | 0 |
| Radius | 1 | 0 | 0 | 1 | 2 |
| Shadow | 0 | 0 | 0 | 0 | 0 |
| Components | 5 | 0 | 3 | 2 | 1 |
| Copy/Microcopy | 3 | 0 | 1 | 2 | 1 |
| **TOTAL** | **44** | **0** | **36** | **10** | **5** |

*Colors marked as violations are in test/documentation files only - acceptable

---

## Biggest Systemic Problems

### 1. `font-black` Usage (29 locations)

**Problem:** `font-black` (weight 900) is used in 29 components but is NOT defined in the design system primitives.

**Design System defines:**
- `normal` (400)
- `medium` (500)
- `semibold` (600)
- `bold` (700)

**Affected components:**
- Analytics charts (funnel, revenue, analytics-chart)
- Admin widgets (system-health, metrics-card)
- Marketing (pricing-comparison)
- Organization components (org-card, team-activity)

**Fix:** Replace `font-black` with `font-bold` (700) across all 29 locations.

---

### 2. CardTitle Font Weight Inconsistency

**Problem:** `CardTitle` uses different font weights across the codebase:
- Some use `font-black` (12 locations)
- Others use `font-semibold` (the Card component default)

**This creates visual inconsistency** where some cards have bolder titles than others.

**Fix:** Standardize on `font-semibold` (the Card.tsx default) or update Card component.

---

### 3. Button Text Format Inconsistency

**Problem:** Terminal format for buttons is `> UPPERCASE_TEXT` but some buttons use:
- `"Click me"` (lowercase, no prefix)
- `"Send Invitation"` (title case, no prefix)
- `"Submit"` (title case, no prefix)

**Correct format:** `> SUBMIT`, `> SEND_INVITATION`, `> CLICK_ME`

**Affected locations:** Mostly in test files and markdown docs (15 locations)

**Fix:** Use `formatButtonText()` from `@/design-system` for all buttons.

---

### 4. Arbitrary Line Height Values

**Problem:** `leading-[1.1]` is used in hero sections instead of design tokens.

**Design system defines:**
- `none` (1)
- `tight` (1.25)
- `snug` (1.375)
- `normal` (1.5)
- `relaxed` (1.625)
- `loose` (2)

**Affected locations:**
- `src/components/landing/hero-split.tsx:51`
- `src/components/landing/hero-video.tsx:83`

**Fix:** Use `leading-none` or `leading-tight` instead of arbitrary value.

---

### 5. Label Format Inconsistency

**Problem:** Some labels use `formatLabel()` → `[LABEL]:` while others use plain text.

**Correct format:** `[LABEL]:` (using formatLabel from @/design-system)

**Affected locations:** 5 labels in component-showcase.tsx use plain text instead of terminal format.

---

## Compliant Areas ✓

The following areas are **fully compliant** with the design system:

1. **Spacing** - All values on 8-point grid (no p-3, p-5, gap-3, etc.)
2. **Colors** - No hardcoded hex/rgb values in components (only in docs/tests)
3. **Shadow** - No shadow-md/lg/xl violations (terminal theme = shadow-none)
4. **Border Radius** - No rounded-md/lg/xl in production components

---

## Violation Files

| File | Contents |
|------|----------|
| `typography.json` | 47 entries - font-black, arbitrary sizes/line-heights |
| `spacing.json` | 0 entries - COMPLIANT |
| `colors.json` | 3 entries - all in docs/tests (acceptable) |
| `radius.json` | 3 entries - mostly info-level (loading spinners) |
| `shadow.json` | 0 entries - COMPLIANT |
| `components.json` | 6 entries - CardTitle, Button, Label inconsistencies |
| `copy.json` | 4 entries - Get Started, Sign In, Log Out formatting |

---

## Recommended Fix Order

1. **font-black → font-bold** (29 files, mechanical replacement)
2. **CardTitle consistency** (12 files, remove custom font-black)
3. **Button formatButtonText()** (15 locations, mostly in tests/docs)
4. **leading-[1.1] → leading-tight** (2 files, simple replacement)
5. **Label formatLabel()** (5 locations in component-showcase)

---

## Notes

- No code was changed during this audit
- All violations are logged in machine-readable JSON format
- Run `npm run scan:hex` to verify no new color violations
- Terminal theme (`rounded-none`, `font-mono`, `uppercase`) is the current active theme
