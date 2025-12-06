# Profile Page Audit

**File**: `src/app/(dashboard)/profile/page.tsx`

## Purpose
User profile management with avatar upload, personal details, and social links editing.

## Layout Overview
- **Container**: `space-y-6` (24px vertical spacing)
- **Grid Systems**:
  - Account info cards: `grid gap-6 md:grid-cols-2`
  - Profile details form: `grid gap-6 md:grid-cols-2` (for social links section)

## Key Components Used
- `Button` from `@/components/ui/button`
- `Input` from `@/components/ui/input`
- `Label` from `@/components/ui/label`
- `Textarea` from `@/components/ui/textarea`
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Avatar`, `AvatarFallback`, `AvatarImage`
- `Badge` from `@/components/ui/badge`
- `Camera`, `Mail`, `User`, `Calendar`, `Shield` icons from lucide-react
- `useSession` from next-auth
- `toast` from sonner
- `mode`, `formatLabel` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale
- `text-4xl` - Page title
- `text-muted-foreground` - Subtitle
- `text-2xl` - Avatar fallback initials
- `text-lg` - User name display
- `text-sm` - Various labels, descriptions, button text
- `text-xs` - Card descriptions, badge text

## Spacing Patterns
- `space-y-6` - Main page container (24px)
- `space-y-1` - User info section (4px)
- `space-y-2` - Form field groups (8px)
- `space-y-4` - Card content, form sections (16px)
- `gap-6` - Grid gap for account cards and form fields (24px)
- `gap-4` - Info card item spacing (16px)
- `gap-2` - Badge group, button groups (8px)
- `p-4` - Info card padding (16px)
- `pt-6` - Card content top padding (24px)

## Font Weights and Families
- `font-semibold` - Page title, user name, card labels
- `font-medium` - Table headers, labels

## Colors Used (Semantic Tokens)
- `text-muted-foreground` - Subtitles, secondary text, icon colors
- `text-primary-foreground` - Camera icon on primary button
- `bg-primary` - Avatar edit button background
- `hover:bg-primary/90` - Avatar edit button hover
- `border` - Card borders, info card borders

## Hardcoded Values
- `h-24 w-24` - Avatar size (96px × 96px)
- `h-4 w-4` - Icon sizes (16px × 16px)
- `h-5 w-5` - Icon sizes (20px × 20px)

## Layout Patterns
- Responsive grid: `md:grid-cols-2` for account info and social links
- Flexbox: `flex items-center gap-6` for avatar section
- Nested spacing: `space-y-*` within cards

## Form Patterns
- State management with `useState` for form data
- Disabled inputs when not in edit mode
- Conditional button display based on `isEditing` state
- File upload for avatar with `FormData`

## Design System Integration
- ✅ Uses `mode.radius` from design system
- ✅ Uses `formatLabel()` helper for consistent label formatting
- ✅ Uses `cn()` utility for conditional classes

## Component Usage Patterns
- Avatar with Camera overlay for upload trigger
- Badge variants: `variant="secondary"` for role, `variant="outline"` for tier
- Info cards with icon + label + value pattern
- Form with conditional edit/save buttons

## Inconsistencies
- **Mixed spacing values**: Uses both `space-y-6` and `space-y-4` in different sections
- **Button text format**: Uses `&gt; EDIT_PROFILE`, `&gt; CANCEL`, `&gt; SAVE_CHANGES` (terminal style with arrow prefix)
- **No `mode.font`**: Could use monospace font for consistency with terminal theme
