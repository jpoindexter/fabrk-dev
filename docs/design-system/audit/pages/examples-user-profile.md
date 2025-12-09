# Examples User Profile Page Audit

**File**: `src/app/(dashboard)/examples/user-profile/page.tsx`

## Purpose

Demo user profile page with mock data showing comprehensive profile UI patterns.

## Layout Overview

- **Container**: `space-y-8 p-8` (32px spacing, 32px padding)
- **Server Component**: Uses `async` with auth check
- **Grids**:
  - Main layout: `grid gap-6 lg:grid-cols-3`
  - Stats: `grid w-full grid-cols-3 gap-4`
  - Info cards: none (vertical stack)

## Key Components Used

- `Card` from `@/components/ui/card`
- `Button` from `@/components/ui/button`
- `auth` from `@/lib/auth`
- Icons: `User`, `Mail`, `Calendar`, `MapPin`, `Link as LinkIcon`, `Twitter`, `Github`, `Linkedin`, `Edit`, `Share2`, `MoreVertical`
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale

- `text-foreground` - Explicit primary text color throughout
- `text-muted-foreground` - Secondary text (bio, labels, descriptions, links)
- `text-muted-foreground/80` - Activity timestamps (reduced opacity)
- `text-3xl` - Page title "User Profile"
- `text-2xl` - User name, stat values
- `text-xl` - Section headings ("Recent Projects", "Recent Activity")
- `text-lg` - Project names, card titles
- `text-sm` - Descriptions, card text, labels, activity text, note text
- `text-xs` - Stats labels, bio badge text, tech tags, note code examples
- `font-bold` - Page title, user name, stat values, section headings, project names, card titles (tracking-tight on page title)
- `font-semibold` - Tech tags, activity actions, note text, badge text

## Spacing Patterns

- `space-y-8` - Main page container (32px)
- `space-y-6` - Left column cards (24px)
- `space-y-4` - Card content sections, project cards, activity items (16px)
- `space-y-2` - Info list items (8px)
- `space-y-1` - Project details (4px)
- `space-y-0.5` - Button descriptions (2px)
- `gap-6` - Main grid, left column (24px)
- `gap-4` - Stats grid, info card items, icon gaps, project section gaps (16px)
- `gap-2` - Button groups, badge icon gaps, tech tags (8px)
- `p-8` - Page padding (32px)
- `p-6` - Card padding, button padding (24px)
- `p-4` - Border padding, social links, info cards (16px)
- `p-2` - Note padding, metadata pre (8px)
- `p-1` - Button padding, activity icon containers, hover states (4px)
- `pt-6` - Stats top padding, card sections (24px)
- `pb-4` - Section header bottom padding (16px)
- `mt-4` - Various spacing (16px)
- `mt-1` - Description spacing (4px)
- `mt-2` - Card spacing (8px)
- `mt-6` - Stats section top margin (24px)
- `mb-4` - Section header bottom margin (16px)

## Font Weights and Families

- `font-bold` - Page title, user name, stats, section headings, project names
- `font-semibold` - Tech tags, activity text, note text, badge text

## Colors Used (Semantic Tokens)

- `text-foreground` - Primary text (explicitly set throughout)
- `text-muted-foreground` - Secondary text, icons, emails, dates
- `text-primary` - Website links
- `text-info` - Twitter and LinkedIn icons
- `text-success` - Online status indicator, live project badge
- `text-warning` - Planning project badge
- `bg-card` - Card backgrounds
- `bg-muted` - Tech tags, social link backgrounds, note code background
- `bg-background` - Online status dot
- `bg-primary/10` - Activity icon background
- `bg-primary/5` - Social link hover, note background
- `bg-success` - Online status indicator
- `bg-success/20` - Live project badge
- `bg-info/20` - In Development badge, info project badge
- `bg-warning/20` - Planning project badge
- `border-border` - All borders (cards, stats divider, avatar, social links, sections, note)
- `border-background` - Online status outer border
- `hover:bg-muted` - Project more button hover
- `hover:bg-primary/5` - Social link hover
- `hover:underline` - Link hover states
- `border-primary` - Note border

## Hardcoded Values

- `h-32 w-32` - Avatar (128px × 128px)
- `h-3 w-3` - Online status dot (12px × 12px)
- `h-5 w-5` - All icons except activity (20px × 20px)
- `h-4 w-4` - Info card icons (16px × 16px)
- `h-10 w-10` - Activity icons (40px × 40px)
- `h-12 w-12` - Empty state icon (implied, not used here)

## Mock Data Structure

Comprehensive mock object:

- Basic info: name, email, avatar, role, joinedDate, location, website, bio
- Social: twitter, github, linkedin
- Stats: projects, followers, following
- recentProjects: Array of {name, description, status, tech[]}
- activity: Array of {action, item, time}

## Layout Patterns

### Three-Column Grid

`lg:grid-cols-3`:

- Left column (`lg:col-span-1`): Profile card, Contact Info, Social Links
- Right column (`lg:col-span-2`): Recent Projects, Recent Activity

### Profile Card Structure

- Centered avatar with online indicator
- Name + role badge
- Bio text
- 3-column stats grid with border dividers

### Contact Info Card

List pattern with icon + text

### Social Links Card

Each link:

- Card-like button with border
- Icon + username
- Hover effect with primary tint
- External link with noopener noreferrer

### Project Cards

- Status badge (color-coded)
- Name + description
- Tech stack tags
- More menu button

### Activity Feed

- Icon container + text
- Action + item + timestamp

### Implementation Note

Final card with primary border explaining this is demo data

## Metadata

Static export:

- Title: "User Profile - Fabrk Dashboard"
- Description: "View and manage user profile"

## Design System Integration

- ✅ Uses `mode.radius` for avatar, badges, status dot, cards, borders
- ✅ Uses `cn()` utility extensively
- ✅ Semantic color tokens throughout
- ✅ Consistent spacing with 8-point grid
- ❌ Uses `<img>` tag instead of Next.js `Image` (noted in ESLint disable comment)

## Inconsistencies

- **Explicit text-foreground**: Most pages don't explicitly set this
- **No disabled state handling**: Edit/Share buttons always enabled
- **Template literals for conditionals**: Some conditional classes use template literals
- **Note about implementation**: Has inline code examples showing hardcoded data paths
