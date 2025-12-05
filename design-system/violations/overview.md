# Design System Violations Report

> Generated: 2025-12-05
> Last Updated: 2025-12-05
> Audit Type: CONSISTENCY LOCKDOWN
> Source of Truth: `/design-system/` (tokens, themes, primitives)

---

## Executive Summary

| Category | Violations | Critical | Medium | Low | Info | Fixed |
|----------|-----------|----------|--------|-----|------|-------|
| Typography | 0 | 0 | 0 | 0 | 0 | ✅ 35 |
| Spacing | 0 | 0 | 0 | 0 | 0 | - |
| Colors | 0* | 0 | 0 | 0 | 3 | - |
| Radius | 0 | 0 | 0 | 0 | 0 | ✅ 1 |
| Shadow | 0 | 0 | 0 | 0 | 0 | - |
| Components | 0 | 0 | 0 | 0 | 0 | ✅ 55+ |
| Copy/Microcopy | 3 | 0 | 1 | 2 | 0 | - |
| **TOTAL** | **3** | **0** | **1** | **2** | **3** | **90+** |

*Colors marked as info are in test/documentation files only - acceptable

---

## Fixed Issues ✅

### 1. ~~`font-black` Usage~~ → FIXED

**Status:** ✅ Fixed in commit `69964d08` and earlier commits

All 29 `font-black` usages replaced with `font-bold` (700).

---

### 2. ~~CardTitle Font Weight~~ → FIXED

**Status:** ✅ Fixed

Standardized on `font-semibold` across all CardTitle instances.

---

### 3. ~~Button Radius Hardcoding~~ → FIXED

**Status:** ✅ Fixed in commits `69964d08` and current session

Removed 36+ hardcoded `rounded-none` from Buttons - now handled by Button component primitives.

---

### 4. ~~Arbitrary Line Height Values~~ → FIXED

**Status:** ✅ Fixed in commit `69964d08`

- `src/components/landing/hero-split.tsx`: `leading-[1.1]` → `leading-tight`
- `src/components/landing/hero-video.tsx`: `leading-[1.1]` → `leading-tight`

---

### 5. ~~Avatar Radius~~ → FIXED

**Status:** ✅ Fixed in current session

- `src/app/blog/[slug]/page.tsx`: `rounded-full` → `mode.radius`

---

## Remaining Issues

### 1. Button Text Format Inconsistency (Low Priority)

**Problem:** Terminal format for buttons is `> UPPERCASE_TEXT` but some buttons use:
- `"Click me"` (lowercase, no prefix)
- `"Send Invitation"` (title case, no prefix)

**Affected locations:** Mostly in test files and markdown docs (15 locations)

**Fix:** Use `formatButtonText()` from `@/design-system` for all buttons.

---

### 2. Label Format Inconsistency (Low Priority)

**Problem:** Some labels use `formatLabel()` → `[LABEL]:` while others use plain text.

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
| `typography.json` | 0 violations - ✅ COMPLIANT |
| `spacing.json` | 0 violations - ✅ COMPLIANT |
| `colors.json` | 3 info entries - all in docs/tests (acceptable) |
| `radius.json` | 0 violations, 2 accepted exceptions - ✅ COMPLIANT |
| `shadow.json` | 0 violations - ✅ COMPLIANT |
| `components.json` | 0 violations - ✅ COMPLIANT |
| `copy.json` | 3 entries - Button/Label format (low priority) |

---

## Completed Fixes (This Session)

1. ✅ **font-black → font-bold** (29 files)
2. ✅ **CardTitle consistency** (12 files)
3. ✅ **Button radius hardcoding** (36+ locations)
4. ✅ **Avatar radius hardcoding** (17+ locations)
5. ✅ **leading-[1.1] → leading-tight** (2 files)
6. ✅ **rounded-full avatar** (1 file)

---

## Remaining (Low Priority)

1. **Button formatButtonText()** (15 locations in tests/docs)
2. **Label formatLabel()** (5 locations in component-showcase)

---

## Notes

- 90+ violations fixed during design system migration
- All violations are logged in machine-readable JSON format
- Run `npm run scan:hex` to verify no new color violations
- Terminal theme (`rounded-none`, `font-mono`, `uppercase`) is the current active theme
- Loading spinner `rounded-full` is an accepted exception (functionally required)
