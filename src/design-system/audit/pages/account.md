# Account Page Audit

**File**: `src/app/(dashboard)/account/page.tsx`

## Purpose

Comprehensive account settings page with tabbed interface for profile, security, billing, API keys, and sessions.

## Layout Overview

- **Container**: `container mx-auto max-w-6xl px-6 py-8`
- **Grid Systems**:
  - Tabs list: `grid h-auto w-full max-w-6xl grid-cols-5 p-2`
  - Content area: `grid gap-6 lg:grid-cols-3`
- **Layout**: Tab navigation + 2-column layout (main content + sidebar)

## Key Components Used

- `ApiKeysSection`, `BillingSection`, `ProfileForm`, `SecurityForm`, `SessionsSection` - Custom account components
- `Button`, `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger`
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`
- Icons: `CreditCard`, `Key`, `Monitor`, `Shield`, `User`

## Typography Scale

- `text-4xl` - Page title "Account Settings"
- `text-muted-foreground` - Subtitle, help text
- `text-xs` - Tab labels, card descriptions, help links
- `text-sm` - Card text, status labels
- `text-base` - Sidebar card titles
- `font-semibold` - Tracking-tight on title
- `font-medium` - Tab labels, quick action labels

## Spacing Patterns

- `px-6 py-8` - Main container padding (24px horizontal, 32px vertical)
- `mb-8` - Header bottom margin (32px)
- `mt-2` - Subtitle top margin (8px)
- `space-y-6` - Tabs vertical spacing (24px)
- `space-y-4` - Sidebar cards spacing (16px)
- `space-y-2` - Quick action buttons spacing (8px)
- `space-y-0.5` - Button description spacing (2px)
- `gap-6` - Grid gap (24px), icon-text gap (24px)
- `gap-2` - Tab icon-label gap (8px), badge group gap (8px)
- `p-2` - Tabs list padding (8px)
- `px-4 py-4` - Tab trigger padding (16px all)
- `pb-4` - Card header bottom padding (16px)
- `p-6` - Button padding (24px)

## Font Weights and Families

- `font-semibold` - Page title
- `font-medium` - Tab labels, quick action titles

## Colors Used (Semantic Tokens)

- `text-muted-foreground` - Subtitles, secondary text, descriptions
- `bg-background` - Active tab background
- `data-[state=active]:bg-background` - Active tab state
- `hover:bg-primary` - Tab hover background
- `hover:text-primary-foreground` - Tab hover text
- `bg-primary` - Active quick action background
- `text-primary-foreground` - Active quick action text
- `text-primary` - Status badge, links
- `border-border` - All borders

## Hardcoded Values

- `max-w-6xl` - Container max width (72rem / 1152px)
- `h-4 w-4` - Icon sizes (16px × 16px)
- `size-5` - Quick action icons (20px × 20px)

## Layout Patterns

- Responsive tabs: `grid-cols-5` (desktop), flex column (mobile implied)
- Responsive content: `lg:grid-cols-3` (2-col main + 1-col sidebar)
- Responsive grid columns: `lg:col-span-2` for main, implied `lg:col-span-1` for sidebar

## Tab Pattern

- State management: `useState` for `activeTab`
- Tab structure: Icon + Label in flex column layout
- Conditional classes: `data-[state=active]` for active state
- Transition: `transition-colors` on hover/active

## Design System Integration

- ✅ Uses `mode.radius` consistently for rounded elements
- ✅ Uses semantic color tokens (no hardcoded colors)
- ✅ Uses `cn()` utility for conditional classes

## Sidebar Pattern

- Quick Actions: Clickable buttons that sync with tabs
- Account Status: Read-only info display (Plan, Status, Member Since, Storage)
- Help: Links to documentation and support

## Component Usage

- All tabs use same Card > CardHeader > CardTitle/CardDescription > CardContent pattern
- Quick actions mirror tabs with same data structure
- Active state synchronized between tabs and quick actions

## Inconsistencies

- **No terminal-style button text** - Unlike profile page, doesn't use `&gt;` prefix
- **Mixed spacing**: Quick actions use `gap-6` for icon spacing, tabs use `gap-2`
- **CardTitle prop**: Uses `as="h2"` - interesting semantic HTML pattern
