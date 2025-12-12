# Card Component Audit

**File:** `src/components/ui/card.tsx`  
**Category:** molecule  
**Severity:** CRITICAL

---

## A. Token Usage

| Token         | Status       | Notes                                                          |
| ------------- | ------------ | -------------------------------------------------------------- |
| `mode.radius` | ✅ Compliant | Uses `mode.radius` correctly                                   |
| `mode.font`   | ✅ Compliant | Uses `mode.font` correctly                                     |
| Colors        | ✅ Compliant | Uses semantic tokens (bg-card, text-foreground, border-border) |
| Spacing       | ✅ Compliant | Uses 8-point grid (p-4, py-2, gap-6)                           |

**Violations:** None

---

## B. Naming & API

### Current Names (Theme-Specific)

| Export                | Issue                        |
| --------------------- | ---------------------------- |
| `TerminalCard`        | Theme-locked name            |
| `TerminalCardHeader`  | Theme-locked name            |
| `TerminalCardContent` | Theme-locked name            |
| `TerminalCardFooter`  | Theme-locked name            |
| `TerminalStat`        | Theme-locked name            |
| `TerminalStatGroup`   | Theme-locked name            |
| `TerminalBadge`       | Theme-locked name            |
| `StyledLabel`         | Vague, not industry-standard |

### Suggested Generic Names

| Current               | Suggested                       | Reason                        |
| --------------------- | ------------------------------- | ----------------------------- |
| `TerminalCard`        | `Card`                          | Industry standard             |
| `TerminalCardHeader`  | `CardHeader`                    | Industry standard             |
| `TerminalCardContent` | `CardContent`                   | Industry standard             |
| `TerminalCardFooter`  | `CardFooter`                    | Industry standard             |
| `TerminalStat`        | `Stat`                          | Generic                       |
| `TerminalStatGroup`   | `StatGroup`                     | Generic                       |
| `TerminalBadge`       | `InlineBadge` or `SectionBadge` | Distinguishes from Badge atom |
| `StyledLabel`         | `FormLabel` or `FieldLabel`     | Industry standard             |

### Props Analysis

| Prop          | Standard? | Notes             |
| ------------- | --------- | ----------------- |
| `tone`        | ✅        | Industry standard |
| `size`        | ✅        | Industry standard |
| `interactive` | ✅        | Industry standard |
| `as`          | ✅        | Industry standard |

**Violations:**

- `violations.naming`: Component names are theme-specific

---

## C. Themeability

| Aspect                     | Status | Notes |
| -------------------------- | ------ | ----- |
| Uses semantic tokens       | ✅     |       |
| Radius via mode            | ✅     |       |
| Font via mode              | ✅     |       |
| No hardcoded theme styling | ✅     |       |

**Issue:** The **naming** is theme-locked even though the **implementation** is themeable.

---

## D. Layout & Responsibilities

| Aspect                | Status |
| --------------------- | ------ |
| Single responsibility | ✅     |
| No hardcoded layout   | ✅     |
| Composable            | ✅     |

No violations.

---

## E. Copy / Microcopy

The component uses format functions for terminal-style text:

- `formatCardTitle()` for headers
- Hex codes like `[0x00]`

This is **correct** - formatting should be theme-driven, not hardcoded.

---

## Recommendations

1. **Rename exports** to generic names
2. Keep Terminal\* as deprecated aliases for migration
3. Add JSDoc deprecation notices
4. Update spec to use generic names

---

## Impact Assessment

- **61 files** import TerminalCard/TerminalCardHeader/etc.
- Renaming is a breaking change
- Suggest migration script or find-replace
