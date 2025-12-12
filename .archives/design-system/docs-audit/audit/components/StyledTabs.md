# StyledTabs Component Audit

**File:** `src/components/ui/styled-tabs.tsx`  
**Category:** molecule  
**Severity:** MAJOR

---

## A. Token Usage

| Token         | Status | Notes            |
| ------------- | ------ | ---------------- |
| `mode.radius` | ✅     | Via TerminalCard |
| `mode.font`   | ✅     | Via TerminalCard |
| Colors        | ✅     | Semantic tokens  |

**Violations:** None (tokens are correct)

---

## B. Naming & API

| Aspect              | Status | Issue                                        |
| ------------------- | ------ | -------------------------------------------- |
| Component name      | ❌     | `StyledTabs` is vague, not industry standard |
| `StyledTabsContent` | ❌     | Theme-suggestive naming                      |

### Current Exports

| Export              | Issue                                 |
| ------------------- | ------------------------------------- |
| `StyledTabs`        | "Styled" is meaningless - what style? |
| `StyledTabsContent` | Duplicates base Tabs naming           |
| `StyledTab` (type)  | Interface for tab data                |
| `StyledTabsProps`   | Type                                  |

### Suggested Generic Names

| Current             | Suggested                                | Reason             |
| ------------------- | ---------------------------------------- | ------------------ |
| `StyledTabs`        | Merge into `Tabs` with `variant="panel"` | Reduce API surface |
| `StyledTabsContent` | `TabsContent` (already exists in base)   | Avoid duplication  |

---

## C. Themeability

| Aspect               | Status | Notes                       |
| -------------------- | ------ | --------------------------- |
| Uses semantic tokens | ✅     |                             |
| Uses TerminalCard    | ⚠️     | Dependency has naming issue |

The component is **functionally themeable** but:

1. Name suggests a specific "style"
2. Depends on theme-named `TerminalCard`

---

## D. Layout & Responsibilities

| Aspect                | Status | Notes                                      |
| --------------------- | ------ | ------------------------------------------ |
| Single responsibility | ⚠️     | Wraps tabs in card - maybe too opinionated |
| Composition           | ⚠️     | Tightly couples tabs with card layout      |

This component is a **pattern** (tabs inside a card with header) rather than a primitive. This is fine but should be:

1. Named to reflect what it IS (e.g., `PanelTabs`, `CardTabs`)
2. Or be a usage example, not a component

---

## E. Copy / Microcopy

Uses terminal formatting:

- Hex code in header
- Description function for dynamic text

This is **correct** - formatting flows through design system.

---

## Recommendations

### Option A: Merge into Tabs

Add a `variant="panel"` to base Tabs component that wraps in card.

### Option B: Rename

Rename to `CardTabs` or `PanelTabs` to describe what it actually is.

### Option C: Keep as Pattern

Move to `patterns/` or `recipes/` folder to indicate it's a composed pattern, not a primitive.

---

## Dependencies

This component imports:

- `TerminalCard` (naming issue)
- `TerminalCardHeader` (naming issue)
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` (correct)

Fixing Card naming will cascade here.
