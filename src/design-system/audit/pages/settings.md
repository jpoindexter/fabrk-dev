# Settings Page Audit

**File**: `src/app/(dashboard)/settings/page.tsx`

## Purpose

Application-wide settings with sections for appearance, notifications, privacy, language, data export, and danger zone.

## Layout Overview

- **Container**: `container mx-auto max-w-6xl px-6 py-8`
- **Grid**: None - vertical stack of sections
- **Spacing**: `space-y-8` between sections

## Key Components Used

- `AppearanceForm`, `DangerZone`, `DataExportSection`, `LanguageForm`, `NotificationsForm`, `PrivacyForm` - Custom settings components
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Separator` - Divider between sections
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`
- Icons: `AlertTriangle`, `Bell`, `Download`, `Globe`, `Lock`, `Palette`

## Typography Scale

- `text-4xl` - Page title "Settings"
- `text-muted-foreground` - Subtitle
- `font-semibold` - Page title (tracking-tight)

## Spacing Patterns

- `px-6 py-8` - Main container padding (24px horizontal, 32px vertical)
- `mb-8` - Header bottom margin (32px)
- `mt-2` - Subtitle top margin (8px)
- `space-y-8` - Main sections spacing (32px)
- `mb-8` - Separator bottom margin before sections (32px)
- `gap-6` - Icon-header gap (24px)
- `p-2` - Icon container padding (8px)

## Font Weights and Families

- `font-semibold` - Page title

## Colors Used (Semantic Tokens)

- `text-muted-foreground` - Subtitle, icon colors, descriptions
- `text-primary` - Non-danger section icons
- `text-destructive` - Danger zone icon
- `bg-primary/10` - Icon container background (normal sections)
- `bg-destructive/10` - Icon container background (danger zone)
- `border-destructive/50` - Danger zone card border
- `border-border` - Standard borders

## Hardcoded Values

- `max-w-6xl` - Container max width (72rem / 1152px)
- `size-5` - Icon sizes (20px × 20px)

## Layout Patterns

- Vertical stack: All sections in single column
- Conditional card border: Danger zone gets `border-destructive/50`
- Icon + Title header pattern: Consistent across all sections

## Section Data Structure

```typescript
{
  id: string,
  title: string,
  description: string,
  icon: LucideIcon,
  component: ComponentType,
  isDanger: boolean
}
```

## Design System Integration

- ✅ Uses `mode.radius` for icon containers and cards
- ✅ Uses semantic color tokens exclusively
- ✅ Conditional styling based on `isDanger` flag
- ✅ Template string for dynamic color classes

## Component Pattern

- Array-driven sections mapping to Card components
- Dynamic icon/component rendering
- Separator between sections (except before first)
- CardTitle uses `as="h2"` for semantic HTML

## Inconsistencies

- **Template literals for colors**: Uses backtick template for conditional classes instead of `cn()` in some places
  ```tsx
  className={`size-5 ${section.isDanger ? "text-destructive" : "text-primary"}`}
  ```
- **Mixed conditional styling**: Some use `cn()`, some use template literals
