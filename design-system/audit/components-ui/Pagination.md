# Pagination Component Audit

**File:** `src/components/ui/pagination.tsx`  
**Category:** Organism  
**Status:** ⚠️ NEEDS ATTENTION

---

## Token Usage

| Token | Used | Notes |
|-------|------|-------|
| mode.radius | ❌ | Not imported or used |
| mode.font | ❌ | Not imported or used |
| mode.textTransform | ❌ | Not imported or used |

## Design System Compliance

### Colors ✅
- Uses `buttonVariants` which have proper token usage
- Relies on Button component for styling

### Typography ❌
- "Previous", "Next", "First", "Last" text has no mode.font
- Numbers and ellipsis have no mode.font
- Won't adapt to theme font changes

### Spacing ✅
- Uses `gap-2` (8px) - on grid
- Icon sizes `h-4 w-4` (16px)

### Naming ✅
- Generic: Pagination, PaginationContent, PaginationLink, PaginationPrevious, PaginationNext

---

## Violations

### V003 - Missing Mode Tokens

**Severity:** High  
**Impact:** Pagination won't theme-switch properly

**Root Cause:**
The component does not import `mode` from `@/design-system`. It relies entirely on `buttonVariants` for styling.

**Issue Details:**
1. No import: `import { mode } from "@/design-system"` is missing
2. PaginationContent, PaginationItem, PaginationEllipsis have no mode tokens
3. PaginationPrevious/Next text won't use themed font

---

## Fix Required

```tsx
// Add import
import { mode } from "@/design-system";

// Update PaginationLink
const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : "outline",
        size,
      }),
      mode.font,  // ADD THIS
      "cursor-pointer",
      className
    )}
    {...props}
  />
);

// Update text components
const PaginationPrevious = (...) => (
  <PaginationLink ...>
    <ChevronLeft className="h-4 w-4" />
    <span className={mode.font}>Previous</span>  // ADD mode.font
  </PaginationLink>
);
```

---

## Recommendations

1. **High Priority:** Add mode import and apply mode.font to text elements
2. Consider if mode.radius needed (buttons use it via buttonVariants)
3. Review PaginationEllipsis for any needed styling
