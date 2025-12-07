# Footer Component Audit

**File:** `src/components/landing/footer.tsx`  
**Category:** organism  
**Severity:** MAJOR

---

## A. Token Usage

| Token         | Status | Violations                             |
| ------------- | ------ | -------------------------------------- |
| `mode.radius` | ⚠️     | Not using mode - hardcodes styling     |
| `mode.font`   | ❌     | 25+ instances of `font-mono` hardcoded |
| Colors        | ✅     | Uses semantic tokens correctly         |
| Spacing       | ✅     | Uses 8-point grid                      |

### Specific Violations

```
Line 33: className="... font-mono"
Line 44: className="... font-mono text-xs"
Line 54: className="font-mono text-xs"
Line 55: className="text-success font-mono text-xs"
Line 71: className="... font-mono ..."
Line 77: className="text-muted-foreground font-mono text-xs"
Line 78: className="text-success font-mono text-xs"
Line 89: className="... font-mono text-xs"
Line 93: className="... font-mono text-xs ..."
Line 99: className="... font-mono text-xs ..."
... (15+ more instances)
```

---

## B. Naming & API

| Aspect         | Status | Notes                 |
| -------------- | ------ | --------------------- |
| Component name | ✅     | `Footer` is generic   |
| Props          | N/A    | No configurable props |

No naming violations.

---

## C. Themeability

| Aspect          | Status | Notes                                 |
| --------------- | ------ | ------------------------------------- |
| Font            | ❌     | Hardcoded `font-mono`                 |
| Radius          | ⚠️     | Not applicable (no bordered elements) |
| Text formatting | ❌     | Terminal syntax hardcoded             |

### Theme-Specific Content Hardcoded

```jsx
// Hardcoded terminal formatting:
"[ PRODUCT ]";
"[ COMPANY ]";
"[ LEGAL ]";
"> FEATURES";
"[STATUS]:";
"└─ [STATUS]:";
```

**Recommendation:** Use `formatLabel()` from design system for bracket formatting.

---

## D. Layout & Responsibilities

| Aspect                | Status |
| --------------------- | ------ |
| Single responsibility | ✅     |
| Responsive            | ✅     |
| Grid usage            | ✅     |

No layout violations.

---

## E. Copy / Microcopy

Terminal-specific copy is hardcoded:

- `■ OPERATIONAL`
- `[OK]`
- Link prefixes `>`

These should use theme utilities or be configurable.

---

## Recommendations

1. **Import mode** from `@/design-system`
2. **Replace all `font-mono`** with `mode.font`
3. **Use formatLabel()** for `[ PRODUCT ]` style labels
4. Consider extracting link rendering to use theme utils

---

## Fix Example

```tsx
// Before
<div className="text-muted-foreground mb-4 font-mono text-xs">[ PRODUCT ]</div>;

// After
import { mode, formatLabel } from "@/design-system";

<div className={cn("text-muted-foreground mb-4 text-xs", mode.font)}>{formatLabel("PRODUCT")}</div>;
```
