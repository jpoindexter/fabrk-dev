# Typography Component Family Audit

**Last Updated:** 2025-12-07
**Category:** Typography
**Status:** ✅ DS-COMPLIANT

---

## Components in Family

| Component | File                               | Status                       |
| --------- | ---------------------------------- | ---------------------------- |
| H1        | `src/components/ui/typography.tsx` | ✅ Compliant                 |
| H2        | `src/components/ui/typography.tsx` | ✅ Compliant                 |
| H3        | `src/components/ui/typography.tsx` | ✅ Compliant                 |
| H4        | `src/components/ui/typography.tsx` | ✅ Compliant                 |
| Body      | `src/components/ui/typography.tsx` | ✅ Compliant                 |
| BodyMuted | `src/components/ui/typography.tsx` | ✅ Compliant                 |
| Lead      | `src/components/ui/typography.tsx` | ✅ Compliant                 |
| Small     | `src/components/ui/typography.tsx` | ✅ Compliant                 |
| List      | `src/components/ui/typography.tsx` | ✅ Compliant                 |
| ListItem  | `src/components/ui/typography.tsx` | ✅ Compliant                 |
| Strong    | `src/components/ui/typography.tsx` | ✅ Compliant (inherits font) |
| Code      | `src/components/ui/typography.tsx` | ✅ Compliant                 |
| Link      | `src/components/ui/typography.tsx` | ✅ Compliant                 |

---

## Token Usage Summary

| Component | mode.font      | mode.radius | Font Size           | Notes                |
| --------- | -------------- | ----------- | ------------------- | -------------------- |
| H1        | ✅ Line 45     | N/A         | text-4xl → text-6xl | Responsive scale     |
| H2        | ✅ Line 77     | N/A         | text-3xl → text-4xl | Responsive scale     |
| H3        | ✅ Line 107    | N/A         | text-xl             | Fixed                |
| H4        | ✅ Line 135    | N/A         | text-lg             | Fixed                |
| Body      | ✅ Line 169    | N/A         | text-base           | Standard body        |
| BodyMuted | ✅ Line 198    | N/A         | text-base           | Muted color          |
| Lead      | ✅ Line 227    | N/A         | text-lg             | Intro text           |
| Small     | ✅ Line 254    | N/A         | text-sm             | Fine print           |
| List      | ✅ Line 301    | N/A         | text-base           | Container            |
| ListItem  | ✅ Line 329    | N/A         | inherited           | From parent List     |
| Strong    | N/A (inherits) | N/A         | inherited           | Weight modifier only |
| Code      | ✅ Line 374    | ✅ Line 374 | text-sm             | Inline code          |
| Link      | ✅ Line 402    | N/A         | inherited           | Inline link          |

---

## Component Details

### Headings (H1-H4)

All heading components:

- Use `mode.font` for theme-aware font-family
- Use DS-consistent font sizes (text-xl through text-6xl)
- Use `font-semibold` weight
- Use `leading-tight` line height
- Use `text-foreground` color token

**Responsive Typography:**

- H1: `text-4xl sm:text-5xl md:text-5xl lg:text-6xl`
- H2: `text-3xl sm:text-3xl md:text-4xl`

### Body Text (Body, BodyMuted, Lead, Small)

| Component | Color                 | Size      | Use Case        |
| --------- | --------------------- | --------- | --------------- |
| Body      | text-foreground       | text-base | Main content    |
| BodyMuted | text-muted-foreground | text-base | Supporting text |
| Lead      | text-foreground       | text-lg   | Introductions   |
| Small     | text-muted-foreground | text-sm   | Legal/footnotes |

All use:

- `mode.font` for font-family
- `leading-relaxed` (1.625) for readability
- `font-normal` weight

### Lists (List, ListItem)

- **List**: Container with `mode.font`, `ml-6` indent, `space-y-2` spacing
- **ListItem**: Individual items with `mode.font`, `leading-relaxed`
- Supports `ordered` prop for numbered lists (list-decimal vs list-disc)

### Semantic Text (Strong, Code, Link)

**Strong:**

- Only applies `font-semibold`
- Does NOT use mode.font (intentional - inherits from parent)
- Used inline within Body/Lead/etc. which already have mode.font

**Code:**

- Uses `mode.font` AND `mode.radius`
- Background: `bg-muted`
- Size: `text-sm`
- Padding: `px-1.5 py-0.5`

**Link:**

- Uses `mode.font`
- Color: `text-primary`
- Hover: `hover:underline`
- Offset: `underline-offset-4`

---

## Typography in Overlay Components

Typography styling is properly propagated to overlay title/description components:

| Component   | Title                                | Description                                |
| ----------- | ------------------------------------ | ------------------------------------------ |
| Sheet       | SheetTitle (L100): mode.font ✅      | SheetDescription (L113): mode.font ✅      |
| Dialog      | DialogTitle (L102): mode.font ✅     | DialogDescription (L115): mode.font ✅     |
| AlertDialog | AlertDialogTitle (L86): mode.font ✅ | AlertDialogDescription (L99): mode.font ✅ |
| Popover     | PopoverContent (L31): mode.font ✅   | N/A                                        |
| HoverCard   | HoverCardContent (L25): mode.font ✅ | N/A                                        |
| Tooltip     | TooltipContent (L25): mode.font ✅   | N/A                                        |

---

## Design System Font Scale Compliance

All typography components use the standard Tailwind/DS font scale:

| Token     | Size | Usage                     |
| --------- | ---- | ------------------------- |
| text-xs   | 12px | Labels, captions          |
| text-sm   | 14px | Small, Code, descriptions |
| text-base | 16px | Body, BodyMuted, List     |
| text-lg   | 18px | Lead, H4                  |
| text-xl   | 20px | H3                        |
| text-2xl  | 24px | -                         |
| text-3xl  | 30px | H2 (base)                 |
| text-4xl  | 36px | H1 (base), H2 (md)        |
| text-5xl  | 48px | H1 (sm/md)                |
| text-6xl  | 60px | H1 (lg)                   |

**No off-scale font sizes are used.**

---

## Violations Status

| ID   | Component  | Issue                        | Status       | Notes           |
| ---- | ---------- | ---------------------------- | ------------ | --------------- |
| V011 | Typography | Inconsistent mode.font usage | ✅ **Fixed** | Commit 331656b7 |

---

## Design Patterns

### Strong Component Pattern

The Strong component intentionally does NOT use `mode.font`:

```tsx
<strong ref={ref} className={cn('font-semibold', className)} {...props} />
```

**Rationale:**

- Strong is used inline within text that already has mode.font
- Font-family is inherited from the parent element
- Adding mode.font would be redundant
- Strong is a semantic weight modifier, not a standalone text container

This is an **accepted design pattern**, not a violation.

---

## Theme Readiness

All Typography family components are **theme-ready**:

1. **Font switching**: All text containers use `mode.font` - adapts to Terminal/Modern/Soft themes
2. **Color tokens**: All colors use semantic tokens (text-foreground, text-muted-foreground, text-primary)
3. **Font sizes**: All use DS-standard Tailwind text scale
4. **Font weights**: Use standard weight classes (font-normal, font-semibold)
5. **Line heights**: Use DS-standard leading classes (leading-tight, leading-relaxed)

---

## Final Status

**✅ TYPOGRAPHY FAMILY IS FULLY DS-COMPLIANT AND THEME-READY**

- 13 components audited
- All components use mode.font correctly (except Strong which inherits - accepted pattern)
- All font sizes from standard DS scale
- All colors use semantic tokens
- 1 historical violation (V011) fixed in commit 331656b7
- 0 remaining violations
- 0 accepted exceptions needed
- 0 code-quality issues
