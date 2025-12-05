# Organization Settings Page Audit

**File**: `src/app/(dashboard)/organizations/[slug]/settings/page.tsx`

## Purpose
Organization settings management with general info editing and danger zone for owners.

## Layout Overview
- **Container**: `mx-auto max-w-4xl space-y-6`
- **Client Component**: Uses `"use client"` with form validation
- **Layout**: Vertical stack of cards

## Key Components Used
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Form`, `FormControl`, `FormDescription`, `FormField`, `FormItem`, `FormLabel`, `FormMessage`
- `Input`, `Textarea`, `Button`
- `AlertDialog` components for delete confirmation
- `useRouter`, `useParams` from next/navigation
- `useSession` from next-auth
- `useForm` from react-hook-form
- `zodResolver` from @hookform/resolvers/zod
- Icons: `Save`, `Trash2`, `AlertTriangle`, `Loader2`, `Settings as SettingsIcon`
- `toast` from sonner
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale
- `text-3xl` - Page title "Organization Settings"
- `text-muted-foreground` - Subtitle, form descriptions, danger zone description
- `text-lg` - Empty state heading
- `text-base` - (implied in CardTitle)
- `font-bold` - Page title, empty state heading, card title (CardTitle default)
- `font-medium` - Danger zone heading

## Spacing Patterns
- `mx-auto max-w-4xl` - Centered narrow container (56rem / 896px)
- `space-y-6` - Main container (24px)
- `space-y-4` - Form fields (16px)
- `gap-4` - Header icon-text (16px)
- `gap-6` - Icon-text gaps (24px)
- `gap-2` - Button groups, icon-text (8px)
- `p-2` - Icon container padding (8px)
- `p-4` - Danger zone content padding, form field padding (16px)
- `pt-4` - Form button section top padding (16px)
- `mt-1` - Form description top margin (4px)
- `mt-4` - Button top margin (16px)
- `ml-4` - Delete button left margin (16px)

## Font Weights and Families
- `font-bold` - Page title
- `font-medium` - Danger zone heading

## Colors Used (Semantic Tokens)
- `text-muted-foreground` - Subtitles, form descriptions, icon colors
- `text-primary-foreground` - Header icon color
- `text-destructive` - Danger zone title, delete icon, error icon
- `text-destructive-foreground` - Delete button text
- `bg-primary` - Header icon background
- `bg-destructive/10` - Danger zone card background
- `bg-destructive` - Delete button background
- `hover:bg-destructive/90` - Delete button hover
- `border-border` - Standard borders, cards, inputs
- `border-destructive` - Danger zone card border

## Hardcoded Values
- `max-w-4xl` - Container max width (56rem / 896px)
- `h-6 w-6` - Header icon (24px × 24px)
- `h-8 w-8` - Loading spinner (32px × 32px)
- `h-12 w-12` - Error icon (48px × 48px)
- `h-5 w-5` - AlertDialog icon (20px × 20px)
- `h-4 w-4` - Button icons (16px × 16px)

## Form Validation Schema
```typescript
const settingsSchema = z.object({
  name: z.string().min(2, "..."),
  description: z.string().optional(),
  slug: z.string().min(2, "...").regex(/^[a-z0-9-]+$/, "..."),
  logo: z.string().url().optional().or(z.literal(""))
});
```

## State Management
```typescript
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [deleting, setDeleting] = useState(false);
const [organization, setOrganization] = useState<Organization | null>(null);
const form = useForm<SettingsFormData>(...);
```

## Data Fetching
useEffect with organization fetch:
- GET /api/organizations/:slug
- Populates form with reset()
- Stores organization state

## API Integration
1. `GET /api/organizations/:slug` - Fetch organization
2. `PATCH /api/organizations/:id` - Update organization
3. `DELETE /api/organizations/:id` - Delete organization

## Permission Gating
`isOwnerOrAdmin` = role in ["OWNER", "ADMIN"]
- Disables form fields for non-admins
- Hides save buttons for non-admins
- Only OWNER sees danger zone

## Form Fields
1. **Organization Name** - Required, min 2 chars
2. **URL Slug** - Required, min 2 chars, lowercase + hyphens only
3. **Description** - Optional, textarea
4. **Logo URL** - Optional, must be valid URL

## Slug Redirect
If slug changes on save:
```typescript
router.push(`/organizations/${data.slug}/settings`);
```

## Danger Zone (Owner Only)
Red-bordered card:
- Warning about irreversible action
- Delete button opens confirmation dialog
- Dialog shows organization name
- Delete redirects to /dashboard

## Loading States
1. **Initial**: Centered spinner
2. **Saving**: Button spinner + disabled state
3. **Deleting**: Button spinner (doesn't disable to prevent state issues)

## Error States
Card with:
- Alert triangle icon
- "Organization not found" message
- Back to dashboard button

## Design System Integration
- ✅ Uses `mode.radius` for all rounded elements
- ✅ Uses `cn()` utility
- ✅ Semantic color tokens
- ✅ Consistent card/border patterns

## Inconsistencies
- **Title size**: Uses `text-3xl` (most admin pages use this too)
- **Loading spinner not centered**: Uses flex items-center justify-center but no height constraint
