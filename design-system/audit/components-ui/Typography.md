# Typography Component Audit

**File:** `src/components/ui/typography.tsx`  
**Category:** Typography  
**Status:** ⚠️ PARTIAL COMPLIANCE

---

## Token Usage

| Token | Used | Components |
|-------|------|------------|
| mode.font | Partial | H1, H2, H3, H4, Code ✅ / Body, BodyMuted, Lead, Small, List, ListItem ❌ |
| mode.radius | ✅ | Code |

## Design System Compliance

### Colors ✅
- Uses semantic tokens: `text-foreground`, `text-muted-foreground`, `text-primary`
- No hardcoded colors

### Typography - Partial ⚠️
- Headings (H1-H4) correctly use `mode.font`
- **ISSUE:** Body, BodyMuted, Lead, Small, List, ListItem do NOT use `mode.font`
- Impact: These components won't switch font family when theme changes

### Spacing ✅
- List uses `space-y-2`, `ml-6` (8px, 24px) - on grid
- Code uses `px-1.5 py-0.5` - appropriate for inline element

### Naming ✅
- Generic names: H1, H2, Body, Lead, Small, List, Code, Link
- No theme-specific naming

---

## Violations

### V011 - Inconsistent mode.font Usage

**Severity:** Medium  
**Impact:** Typography won't fully adapt to theme changes

**Affected Components:**
- Body (line ~150)
- BodyMuted (line ~170)
- Lead (line ~190)
- Small (line ~210)
- List (line ~240)
- ListItem (line ~270)

**Fix Required:**
```tsx
// Before
<p className={cn("text-foreground text-base leading-relaxed font-normal", className)}

// After
<p className={cn("text-foreground text-base leading-relaxed font-normal", mode.font, className)}
```

---

## Component Summary

| Component | mode.font | Status |
|-----------|-----------|--------|
| H1 | ✅ | Compliant |
| H2 | ✅ | Compliant |
| H3 | ✅ | Compliant |
| H4 | ✅ | Compliant |
| Body | ❌ | Needs fix |
| BodyMuted | ❌ | Needs fix |
| Lead | ❌ | Needs fix |
| Small | ❌ | Needs fix |
| List | ❌ | Needs fix |
| ListItem | ❌ | Needs fix |
| Strong | N/A | No text styling |
| Code | ✅ | Compliant |
| Link | N/A | No text styling |

---

## Recommendations

1. Add `mode.font` to Body, BodyMuted, Lead, Small, List components
2. Consider if ListItem needs its own mode.font (may inherit from List)
3. Ensure all typography can theme-switch for Terminal/Modern/Soft modes
