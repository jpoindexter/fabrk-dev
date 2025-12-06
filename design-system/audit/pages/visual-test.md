# Visual Test QA Tool Page Audit

**File:** `src/app/visual-test/page.tsx`
**Status:** Production-ready ✓ (QA Tool)
**Layout:** Split-pane visual testing interface with element tagging

---

## Purpose

**CRITICAL QA TOOL** - Visual testing and audit tool with:
- Left sidebar: Page navigation tree with status tracking
- Right pane: iframe preview with element inspection
- Draggable tagger: Status marking + element tagging with presets
- Export: JSON/MD reports

---

## Layout Overview

### Structure
- Client component ("use client")
- Full-screen layout: `flex h-screen font-mono`
- Left sidebar (collapsible): Navigation tree + stats + export
- Right pane: Path bar + iframe + draggable tagger overlay
- localStorage persistence for state

### Component Hierarchy
```
div (bg-background flex h-screen font-mono)
├── Aside (Sidebar - w-72 or w-12)
│   ├── Header + Stats + Search
│   ├── Navigation Tree (accordion)
│   └── Footer Actions (export, reset)
├── Right Pane (flex-1)
│   ├── Path Bar
│   ├── Iframe Preview
│   └── Draggable Tagger Window
│       ├── Status Buttons (OK/ISSUE/SKIP)
│       ├── Note Section
│       ├── Element Inspector (with presets)
│       └── Export/Clear Buttons
```

---

## Key Components Used

### Custom Implementation
- No external UI library components
- All custom terminal-styled elements
- Uses Lucide icons extensively
- useEffect + useRef for iframe injection
- localStorage for persistence

---

## Typography Scale Observed

### Sidebar
- **Labels:** `text-xs font-mono text-muted-foreground`
- **Page titles:** `text-xs font-mono`
- **Stats:** `text-xs font-mono` (color-coded)
- **Search:** `text-xs font-mono`

### Tagger Window
- **Window title:** `text-xs font-mono text-muted-foreground` → `[ TAGGER ]`
- **Section labels:** `text-xs font-mono text-muted-foreground`
- **Button text:** `text-xs font-mono`
- **Selector display:** `text-xs font-mono text-primary break-all`

### Path Bar
- **Text:** `text-xs font-mono text-muted-foreground`

---

## Spacing Patterns Observed

### Sidebar
- **Padding:** `p-4` (header), `p-2` (nav), `p-2` (footer)
- **Gap:** `gap-2` (buttons), `space-y-0.5` (nav items)
- **Search:** `py-2 px-8` (input)

### Tagger Window
- **Padding:** `p-4` (sections), `p-2` (header)
- **Gap:** `space-y-2` (forms), `gap-1` (button groups)
- **Window controls:** `gap-0.5` (close/minimize)

### Layout
- **Sidebar width:** `w-72` (expanded), `w-12` (collapsed)
- **Iframe:** `h-[calc(100vh-41px)]` (full height minus path bar)
- **Tagger position:** Dynamic via state (draggable)

---

## Inconsistencies / Ad-Hoc Styles

### Hardcoded Colors (INTENTIONAL)
✅ **ALLOWED** - Iframe injection styles:
```tsx
// Colors are intentionally hardcoded since they're injected into iframe
// and need to be visible across all themes
style.textContent = `.vt-hover { outline: 2px dashed orange !important; ... }`;
```
- **orange** for hover outline
- **red** for selected outline
- Necessary for cross-theme visibility

### Non-Standard Spacing
⚠️ **gap-0.5** (2px) - Very tight gap for window controls
  - Intentional for compact UI
  - Could use standard gap-1 (4px)

### Dynamic Positioning
✅ **State-driven** - Tagger position via `style={{ left, top }}`
  - Necessary for drag functionality
  - No hardcoded values

---

## Design System Compliance

✅ **PASS** - Font-mono throughout
✅ **PASS** - Design tokens for UI (border-border, bg-card, etc.)
✅ **JUSTIFIED** - Hardcoded iframe colors (cross-theme requirement)
✅ **PASS** - Spacing mostly 8-point grid
⚠️ **MINOR** - gap-0.5 (2px) could be gap-1 (4px)
✅ **PASS** - Terminal aesthetic maintained
✅ **PASS** - Accessible (aria-labels, keyboard nav)

---

## Recommendations

1. **Keep as-is** - Tool works excellently
2. **Consider gap-1** instead of gap-0.5 for window controls
3. **Document iframe styles** - Add comment explaining hardcoded colors ✅ (already present)
4. **Add keyboard shortcuts** - Enhance QA workflow
5. **Export to CSV** - Additional export format

---

## Related Files

None - Self-contained QA tool

---

## Notes

This is a **QA-specific tool** with intentional design system exceptions:
- Hardcoded iframe colors for cross-theme visibility
- Tight spacing for compact UI
- Custom drag implementation

These exceptions are **justified and documented**.
