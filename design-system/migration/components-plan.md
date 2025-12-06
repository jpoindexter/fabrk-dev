# Component Prioritization Plan

> Generated: 2025-12-06 (PHASE 3)
> Source: design-system/audit/components/index.json, design-system/violations/components.json
> Status: **NO FIXES REQUIRED** - All components are compliant

---

## Executive Summary

After comprehensive Phase 2 audit of **98 UI components**, the finding is:

**97 FULLY COMPLIANT, 1 ACCEPTABLE EXCEPTION**

All components are:
- ✅ Using mode.radius from @/design-system
- ✅ Using mode.font from @/design-system  
- ✅ Using design tokens (not hardcoded colors)
- ✅ Following terminal aesthetic

---

## Component Priority Tiers

### TIER 1: Core Foundation (Must be perfect)

| Component | Status | Mode Usage | Violations | Dependencies |
|-----------|--------|------------|------------|--------------|
| **Button** | ✅ COMPLIANT | mode.radius, mode.font, mode.textTransform | 0 | Used by 200+ files |
| **Card (TerminalCard)** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Used by 150+ files |
| **Input** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Used by 100+ files |
| **Label** | ✅ COMPLIANT | mode.font | 0 | Used by 80+ files |
| **Badge** | ✅ COMPLIANT | mode.radius, mode.font, mode.textTransform | 0 | Used by 60+ files |

**TIER 1: 5 components, 0 violations**

### TIER 2: Form Controls (Critical for user input)

| Component | Status | Mode Usage | Violations | Dependencies |
|-----------|--------|------------|------------|--------------|
| **Select** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Used by 40+ files |
| **Textarea** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Used by 30+ files |
| **Checkbox** | ✅ COMPLIANT | mode.radius | 0 | Used by 25+ files |
| **Switch** | ✅ COMPLIANT | !rounded-none direct | 0 | Used by 20+ files |
| **RadioGroup** | ✅ COMPLIANT | mode.radius | 0 | Used by 15+ files |
| **Form** | ✅ COMPLIANT | mode.font | 0 | Used by 50+ files |

**TIER 2: 6 components, 0 violations**

### TIER 3: Layout & Navigation

| Component | Status | Mode Usage | Violations | Dependencies |
|-----------|--------|------------|------------|--------------|
| **Dialog** | ✅ COMPLIANT | mode.radius | 0 | Used by 40+ files |
| **Sheet** | ✅ COMPLIANT | mode.radius | 0 | Used by 25+ files |
| **Tabs** | ✅ COMPLIANT | !rounded-none, mode.font | 0 | Used by 35+ files |
| **StyledTabs** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Used by 20+ files |
| **DropdownMenu** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Used by 30+ files |
| **Popover** | ✅ COMPLIANT | mode.radius | 0 | Used by 20+ files |
| **Sidebar** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Used by 10+ files |
| **NavigationMenu** | ✅ COMPLIANT | mode.radius | 0 | Used by 5+ files |

**TIER 3: 8 components, 0 violations**

### TIER 4: Feedback & Status

| Component | Status | Mode Usage | Violations | Dependencies |
|-----------|--------|------------|------------|--------------|
| **Alert** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Used by 15+ files |
| **Toast** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Used by 25+ files |
| **Tooltip** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Used by 30+ files |
| **Progress** | ✅ COMPLIANT | mode.radius | 0 | Used by 10+ files |
| **Skeleton** | ✅ COMPLIANT | mode.radius | 0 | Used by 15+ files |

**TIER 4: 5 components, 0 violations**

### TIER 5: Data Display

| Component | Status | Mode Usage | Violations | Dependencies |
|-----------|--------|------------|------------|--------------|
| **Table** | ✅ COMPLIANT | mode.font | 0 | Used by 20+ files |
| **Avatar** | ✅ COMPLIANT | mode.radius | 0 | Used by 30+ files |
| **Calendar** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Used by 5+ files |
| **Accordion** | ✅ COMPLIANT | mode.font | 0 | Used by 10+ files |

**TIER 5: 4 components, 0 violations**

### TIER 6: Specialized

| Component | Status | Mode Usage | Violations | Notes |
|-----------|--------|------------|------------|-------|
| **ColorPicker** | ⚠️ ACCEPTABLE | mode.radius, mode.font | 1 | Hex colors for presets - required |
| **Command** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Command palette |
| **Combobox** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Autocomplete |
| **DatePicker** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Date selection |
| **Slider** | ✅ COMPLIANT | mode.radius | 0 | Range input |
| **HoverCard** | ✅ COMPLIANT | mode.radius | 0 | Hover tooltip |
| **AlertDialog** | ✅ COMPLIANT | mode.radius | 0 | Confirmation dialog |
| **ContextMenu** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Right-click menu |
| **Menubar** | ✅ COMPLIANT | mode.radius, mode.font | 0 | Menu bar |

**TIER 6: 9 components, 1 acceptable exception**

---

## Components NOT Using Mode Import (Intentional)

21 components don't import `mode` from `@/design-system`. This is **by design**:

| Component | Reason |
|-----------|--------|
| Separator | 1px line, no radius needed |
| ScrollArea | Container, inherits from children |
| AspectRatio | Container, no visual styling |
| Collapsible | Container, no visual styling |
| Stack | Layout utility |
| Grid | Layout utility |
| Container | Layout utility |
| Lazy | Loading utility |
| + 13 more | Primitives or utilities |

**These are NOT violations.** They're intentionally minimal.

---

## Violation Details

### ColorPicker (ACCEPTABLE)

**File:** `src/components/ui/color-picker.tsx`
**Lines:** 25-41
**Issue:** Contains 16 hex color values for default presets

```typescript
const DEFAULT_COLORS = [
  "#D0021B", "#F5A623", "#F8E71C", "#8B572A",
  "#7ED321", "#417505", "#BD10E0", "#9013FE",
  // ... more colors
];
```

**Verdict:** ACCEPTABLE - This is a color picker component. It requires color values to function. The component itself uses design tokens for all UI elements.

---

## Component Architecture Summary

### Design System Integration

```
┌─────────────────────────────────────────────────┐
│                 @/design-system                  │
├─────────────────────────────────────────────────┤
│  mode.radius = "rounded-none"                   │
│  mode.font = "font-mono"                        │
│  mode.textTransform = "uppercase"               │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              UI Components (98)                  │
├─────────────────────────────────────────────────┤
│  77 components import mode                       │
│  21 components don't need mode (utilities)       │
│  All use design tokens for colors               │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│           Templates & Pages (300+)               │
├─────────────────────────────────────────────────┤
│  Import components from @/components/ui          │
│  Terminal aesthetic automatic                    │
│  No hardcoded styles needed                     │
└─────────────────────────────────────────────────┘
```

---

## Action Items

**NONE REQUIRED**

All components are compliant with the frozen design system. The Phase 2 audit confirmed:
- 100% radius compliance
- 100% font token compliance
- 99% color token compliance (1 acceptable exception)
- 78.6% mode system adoption (remaining are utilities)

---

## Maintenance Recommendations

1. **New Component Checklist:**
   - Import `mode` from `@/design-system`
   - Apply `mode.radius` to all bordered elements
   - Apply `mode.font` to all text
   - Use only design tokens for colors
   - Add to component index

2. **Review Triggers:**
   - Any new component addition
   - Any component styling changes
   - Any design system updates (requires explicit phase)

3. **Testing:**
   - Button and Card tests exist (`*.test.tsx`)
   - Consider adding visual regression tests
   - Theme switching tests for future multi-theme support

---

*Plan generated by PHASE 3: TEMPLATE + BOILERPLATE FIX PLAN - 2025-12-06*
