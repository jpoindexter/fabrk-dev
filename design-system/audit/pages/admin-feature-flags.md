# Admin Feature Flags (DB) Page Audit

**File**: `src/app/(dashboard)/admin/feature-flags-db/page.tsx`

## Purpose
Database-backed feature flag management with rollout control.

## Layout Overview
- **Container**: `space-y-6` (24px vertical spacing)
- **Client Component**: Uses `"use client"` with state management
- **Grid**: `grid gap-4` for flags list

## Key Components Used
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Switch` from `@/components/ui/switch`
- `Label` from `@/components/ui/label`
- `Badge` from `@/components/ui/badge`
- `Slider` from `@/components/ui/slider`
- `Button`, `Input`, `Textarea`
- `AlertDialog` components for delete confirmation
- `toast` from sonner
- Icons: `Plus`, `Trash2`
- `formatLabel` from `@/design-system`

## Typography Scale
- `text-3xl` - Page title "Feature Flags (Database)" (note: inconsistent)
- `text-muted-foreground` - Subtitle, card descriptions, empty state
- `text-sm` - Empty state text
- `text-lg` - Flag name
- `font-bold` - Page title (tracking-tight)

## Spacing Patterns
- `space-y-6` - Main container (24px)
- `space-y-4` - Create form fields, flag cards (16px)
- `space-y-2` - Form field groups, slider section (8px)
- `space-y-1` - Card header spacing (4px)
- `space-x-2` - Switch-label gaps, inline buttons (8px)
- `gap-4` - Flag card grid, icon-text gaps (16px)
- `gap-2` - Button groups (8px)

## Font Weights and Families
- `font-bold` - Page title

## Colors Used (Semantic Tokens)
- `text-muted-foreground` - Subtitles, empty state text
- `text-destructive` - Delete icon
- `text-destructive-foreground` - AlertDialog action button text
- `bg-destructive` - AlertDialog action button background
- `hover:bg-destructive/90` - AlertDialog action button hover

## Hardcoded Values
- `h-4 w-4` - Icons (16px × 16px)

## State Management
Complex state for CRUD operations:
```typescript
const [flags, setFlags] = useState<FeatureFlag[]>([]);
const [loading, setLoading] = useState(true);
const [showCreateForm, setShowCreateForm] = useState(false);
const [newFlag, setNewFlag] = useState({
  name: "", description: "", enabled: false, rolloutPercentage: 0
});
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [flagToDelete, setFlagToDelete] = useState<string | null>(null);
```

## API Integration
4 endpoints:
1. `GET /api/admin/feature-flags` - Fetch all flags
2. `POST /api/admin/feature-flags` - Create new flag
3. `PATCH /api/admin/feature-flags` - Update flag (enabled or rolloutPercentage)
4. `DELETE /api/admin/feature-flags?id=:id` - Delete flag

## Feature Flag Interface
```typescript
interface FeatureFlag {
  id: string;
  name: string;
  description: string | null;
  enabled: boolean;
  rolloutPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Create Form Fields
- Name (Input)
- Description (Textarea)
- Enable immediately (Switch)
- Buttons: CREATE, CANCEL

## Flag Card Structure
- Header: Name + Description + Switch + Delete button
- Content: Rollout percentage slider (0-100%, step: 5)
- Slider disabled when flag not enabled

## Slider Pattern
- Displays current percentage in Badge
- `onValueCommit` for API update (not onChange)
- Visual feedback with disabled state

## Empty State
Centered card: "No feature flags created yet. Click 'New Flag' to create one."

## Design System Integration
- ✅ Uses `formatLabel()` for consistent label formatting
- ✅ Terminal-style button text (`&gt; NEW_FLAG`, `&gt; CREATE`, `&gt; CANCEL`, `&gt; DELETE_FLAG`)
- Uses standard semantic tokens

## Error Handling
Toast notifications for:
- Fetch failures
- Create failures
- Update failures
- Delete failures

## Loading State
Simple centered "Loading..." text (148px height)

## Inconsistencies
- **Title size**: Uses `text-3xl` instead of `text-4xl`
- **Button text**: Uses terminal style (`&gt;` prefix) - good!
- **No mode/cn imports**: Doesn't use design system utilities
- **Hardcoded loading height**: `h-48` in JSX
