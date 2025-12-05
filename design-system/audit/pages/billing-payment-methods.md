# Payment Methods Page Audit

**File**: `src/app/(dashboard)/billing/payment-methods/page.tsx`

## Purpose
Manage payment methods with Stripe integration (add, set default, remove).

## Layout Overview
- **Container**: `container mx-auto max-w-6xl px-6 py-8`
- **Client Component**: Uses `"use client"` for interactivity
- **Grid**: `grid gap-6 md:grid-cols-2` for info cards at bottom

## Key Components Used
- `Button`, `Card`, `CardContent`, `CardHeader`, `CardTitle`
- `Badge` from `@/components/ui/badge`
- `Alert`, `AlertDescription`
- `AlertDialog` components for delete confirmation
- Icons: `CreditCard`, `Plus`, `Trash2`, `CheckCircle2`, `ArrowLeft`, `Shield`
- `useToast` hook
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale
- `text-4xl` - Page title "Payment Methods"
- `text-lg` - Subtitle
- `text-muted-foreground` - Subtitles, empty state text, info text
- `text-sm` - Card descriptions, button text, expiry text, empty state subtitle
- `text-xs` - Badge text, card content text
- `font-semibold` - Title (tracking-tight), card brand, card titles
- `capitalize` - Card brand text

## Spacing Patterns
- `px-6 py-8` - Container padding (24px horizontal, 32px vertical)
- `mb-8` - Header margin (32px)
- `mb-6` - Alert margin (24px)
- `mb-4` - Empty state margins (16px)
- `mb-2` - Title margin, icon margins (8px)
- `mb-1` - Card label margin (4px)
- `mt-8` - Info cards top margin (32px)
- `space-y-4` - Cards list, empty state content, info cards (16px)
- `gap-6` - Icon-text gaps, card content gaps (24px)
- `gap-2` - Button icon-text gaps, badge icon gaps (8px)
- `pt-6` - Card content top padding (24px)
- `p-4` - Card icon container, border (16px)
- `p-6` - Card padding (24px)

## Font Weights and Families
- `font-semibold` - Title, card brand, card title

## Colors Used (Semantic Tokens)
- `text-muted-foreground` - Subtitles, secondary text, icons, card expiry
- `text-destructive` - Clear logs button text
- `text-destructive-foreground` - AlertDialog action button text
- `text-primary-foreground` - Badge foreground
- `bg-primary/10` - Card icon container background
- `bg-destructive` - AlertDialog action button background
- `hover:bg-destructive/90` - AlertDialog action button hover
- `border-border` - Card icon container border
- `border` - Default border color

## Hardcoded Values
- `max-w-6xl` - Container max width (72rem / 1152px)
- `h-12 w-12` - Empty state icon (48px × 48px)
- `h-6 w-6` - Card icon (24px × 24px)
- `h-4 w-4` - All other icons (16px × 16px)
- `h-3 w-3` - Badge icon (12px × 12px)

## State Management
```typescript
const [isLoading, setIsLoading] = useState(false);
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [methodToDelete, setMethodToDelete] = useState<string | null>(null);
const [paymentMethods] = useState<PaymentMethod[]>([]); // Empty initial state
```

## API Integration
Three endpoints:
1. `POST /api/stripe/setup-intent` - Add new payment method (redirects to Stripe)
2. `POST /api/stripe/payment-methods/default` - Set default method
3. `DELETE /api/stripe/payment-methods/:id` - Remove method

## Card Pattern (Payment Method Display)
- Icon container (24px padding, primary/10 background, bordered)
- Brand + last 4 digits
- Default badge (if applicable)
- Expiry date
- Action buttons (Set Default, Delete)

## Empty State Pattern
- Centered card content
- Icon + heading + description + CTA button
- Consistent with other pages

## Design System Integration
- ✅ Uses `mode.radius` for all rounded elements
- ✅ Uses `cn()` utility
- ✅ Semantic color tokens throughout

## Alert Pattern
Security notice with Shield icon:
- Informational (not warning/error)
- Communicates Stripe handling
- Positioned above main content

## Inconsistencies
- **Initial state**: Payment methods array starts empty (would show empty state even with real data until loaded)
- **No loading state for initial data**: Only has `isLoading` for add operation
- **No data fetching**: Missing useEffect to load existing payment methods
- **Dialog button text**: Uses plain "Remove Payment Method" instead of terminal style `&gt;` prefix
