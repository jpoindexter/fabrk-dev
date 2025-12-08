# Design System Audit: Theming Documentation Page

**Route:** `/docs/extras/theming`
**File:** `src/app/docs/extras/theming/page.tsx`
**Category:** Documentation
**Status:** ✅ ACCEPTABLE (Special Case)

## Purpose

Documentation page explaining Fabrk's 20 built-in color themes and how to customize them.

## Key Components

- FeatureGuideTemplate
- DocsSection, DocsCard, DocsLinkCard
- TerminalCard, TerminalCardContent

## Violations Found

### Hex Colors (12 instances)

**Lines:** 117-156
**Context:** Theme preview colors in JavaScript array

```tsx
const themes = [
  { id: "light", name: "Light", preview: "#ffffff" },
  { id: "dark", name: "Dark", preview: "#1d232a" },
  { id: "ocean", name: "Ocean", preview: "#0ea5e9" },
  // ...and 9 more theme previews
];
```

**Severity:** ⚠️ WARNING
**Verdict:** **ACCEPTABLE - This is a special case**

### Justification

1. **Purpose**: These hex colors are **data values**, not CSS styling
2. **Context**: Used in `style={{ backgroundColor: theme.color }}` for theme preview swatches
3. **Functionality**: Users need to see actual theme colors visually
4. **Alternative Not Viable**: Cannot use design tokens here because we're showing examples of OTHER themes

### Why This is Different from a Violation

- ❌ **Violation**: `className="bg-[#ffffff]"` or `style="color: #fff"` in component styling
- ✅ **Acceptable**: `const previewColor = "#ffffff"` passed to a preview swatch element

## Recommendation

**NO ACTION REQUIRED** - This is proper usage. The hex colors are:

- Stored as data, not styling classes
- Used only for visual previews of theme palettes
- Documented clearly in code comments
- Not affecting the terminal design system aesthetic

## Terminal Design Compliance

The page itself follows terminal design:

- ✅ Uses `rounded-none` on TerminalCard
- ✅ Uses design tokens for all actual styling
- ✅ `font-mono` for all text
- ✅ Terminal aesthetic card headers with `[ [0xB0] THEME_SYSTEM ]`

## Notes

The page could benefit from an ESLint comment to suppress hex color warnings:

```tsx
// eslint-disable-next-line design-system/no-hardcoded-colors -- Theme preview data values
const themes = [...]
```
