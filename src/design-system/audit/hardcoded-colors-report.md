# Hardcoded Colors Report

**Audit Date:** 2025-12-07
**Auditor:** Claude Code

---

## Summary

| Category              | Count   | Status |
| --------------------- | ------- | ------ |
| Critical Violations   | 0       | ✅     |
| Acceptable Exceptions | 4 files | ✅     |
| Total Files Scanned   | 100+    | ✅     |

---

## Critical Violations (Must Fix)

**NONE FOUND**

All UI components correctly use semantic design tokens.

---

## Acceptable Exceptions

### 1. Chart Components (SSR/Hydration Fallbacks)

**Files:**

- `src/components/ui/line-chart.tsx`
- `src/components/ui/bar-chart.tsx`
- `src/components/ui/area-chart.tsx`

**Pattern:**

```tsx
// Default state before CSS variables load
const [themeColors, setThemeColors] = useState<{
  chart: string[];
  muted: string;
  border: string;
}>({ chart: [], muted: "#888", border: "#444" });

// Fallback colors for initial render
const fallbackColors = ["#6366f1", "#8b5cf6", "#22c55e", "#eab308", "#ef4444"];
```

**Reason:** These fallbacks are necessary for:

1. Server-side rendering (CSS variables not available)
2. Initial hydration before `useEffect` runs
3. Preventing flash of unstyled content

**Status:** ✅ Acceptable - Required for SSR hydration

---

### 2. Google Brand Colors (OAuth Sign-In)

**File:** `src/components/ui/sign-in-form.tsx:61-73`

**Code:**

```tsx
<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
  <path d="..." fill="#4285F4" /> {/* Google Blue */}
  <path d="..." fill="#34A853" /> {/* Google Green */}
  <path d="..." fill="#FBBC05" /> {/* Google Yellow */}
  <path d="..." fill="#EA4335" /> {/* Google Red */}
</svg>
```

**Reason:** Google brand guidelines require exact colors for official Google logo.

**Status:** ✅ Acceptable - Brand compliance required

---

### 3. Color Picker Component (Functional Requirement)

**File:** `src/components/ui/color-picker.tsx:26-44`

**Code:**

```tsx
const DEFAULT_COLORS = [
  "#D0021B",
  "#F5A623",
  "#F8E71C",
  "#8B572A",
  "#7ED321",
  "#417505",
  "#BD10E0",
  "#9013FE",
  "#4A90D9",
  "#50E3C2",
  "#B8E986",
  "#000000",
  "#4A4A4A",
  "#9B9B9B",
  "#FFFFFF",
];
```

**Reason:** Color picker must provide actual color values for users to select.

**Status:** ✅ Acceptable - Functional requirement

---

### 4. Pie Chart Fallback Colors

**File:** `src/components/ui/pie-chart.tsx:24-33`

**Code:**

```tsx
const DEFAULT_COLORS = [
  "hsl(var(--primary))", // ✅ Uses CSS variable
  "hsl(var(--accent))", // ✅ Uses CSS variable
  "hsl(var(--secondary))", // ✅ Uses CSS variable
  "oklch(70% 0.15 240)", // ⚠️ Hardcoded fallback
  "oklch(70% 0.15 160)", // ⚠️ Hardcoded fallback
  "oklch(70% 0.15 60)", // ⚠️ Hardcoded fallback
  "oklch(70% 0.20 340)", // ⚠️ Hardcoded fallback
  "oklch(60% 0.20 25)", // ⚠️ Hardcoded fallback
];
```

**Reason:** Provides additional colors when chart has more than 3 segments and CSS variables aren't available.

**Status:** ⚠️ Acceptable but could be improved - Consider using chart-4 through chart-9 CSS variables

---

## Violations NOT Found (Clean Components)

The following component categories were scanned and found **clean** (using only semantic tokens):

- ✅ Button variants
- ✅ Cards and containers
- ✅ Form inputs (input, textarea, select, checkbox, radio, switch)
- ✅ Navigation components (tabs, breadcrumb, sidebar, menubar)
- ✅ Feedback components (alert, toast, badge, progress)
- ✅ Overlay components (dialog, sheet, popover, tooltip)
- ✅ Data display (table, avatar, skeleton)
- ✅ Sparkline, Gauge, Heatmap, Funnel Chart, KPI Card, Stat Card
- ✅ Empty State, Data Table, Filters Bar

---

## Raw Color Patterns Found

| Pattern         | Files   | Status            |
| --------------- | ------- | ----------------- |
| `#` hex colors  | 4 files | ✅ All acceptable |
| `bg-gray-*`     | 0 files | ✅ Clean          |
| `bg-white`      | 0 files | ✅ Clean          |
| `text-white`    | 0 files | ✅ Clean          |
| `bg-black`      | 0 files | ✅ Clean          |
| `text-black`    | 0 files | ✅ Clean          |
| `border-gray-*` | 0 files | ✅ Clean          |

---

## Documentation Colors (Not Components)

**File:** `src/components/ui/CHAT-INPUT-PREVIEW.md`

Contains hex colors but this is a documentation/preview file, not a component.

**Status:** ✅ N/A - Documentation only

---

## Recommendations

1. **Add eslint-disable comments** to chart fallback colors for clarity:

   ```tsx
   /* eslint-disable design-system/no-hardcoded-colors -- SSR fallback before theme loads */
   const fallbackColors = ["#6366f1", ...];
   /* eslint-enable design-system/no-hardcoded-colors */
   ```

2. **Update pie-chart.tsx** to use `chart-4` through `chart-9` CSS variables instead of hardcoded oklch values when they become available in all themes.

3. **Consider adding** Google brand colors as CSS variables in `:root` if they're used elsewhere:
   ```css
   --brand-google-blue: 56% 0.15 250;
   --brand-google-red: 55% 0.25 25;
   --brand-google-yellow: 85% 0.18 95;
   --brand-google-green: 65% 0.18 145;
   ```
