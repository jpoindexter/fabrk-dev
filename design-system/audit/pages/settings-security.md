# Security Settings Page Audit

**File**: `src/app/(dashboard)/settings/security/page.tsx`

## Purpose
Security-focused settings page for 2FA, password, and session management.

## Layout Overview
- **Container**: `container mx-auto max-w-4xl px-6 py-8`
- **Layout**: Single column, narrower than other pages (max-w-4xl vs max-w-6xl)
- **Server Component**: Uses `async` server component pattern

## Key Components Used
- `SecuritySettings` - Client component for security UI
- `prisma` - Database queries
- `auth` - NextAuth session check
- `Button` from `@/components/ui/button`
- `ArrowLeft` icon from lucide-react
- `Link` from next/link

## Typography Scale
- `text-4xl` - Page title "Security Settings"
- `text-lg` - Subtitle
- `text-muted-foreground` - Subtitle color
- `font-bold` - Title

## Spacing Patterns
- `px-6 py-8` - Main container padding (24px horizontal, 32px vertical)
- `mb-8` - Header bottom margin (32px)
- `mb-4` - Back button bottom margin (16px)
- `mb-2` - Title bottom margin (8px)
- `mr-2` - Icon right margin (8px)

## Font Weights and Families
- `font-bold` - Page title

## Colors Used (Semantic Tokens)
- `text-muted-foreground` - Subtitle

## Hardcoded Values
- `max-w-4xl` - Container max width (56rem / 896px)
- `h-4 w-4` - Icon size (16px × 16px)

## Server-Side Patterns
- ✅ Server component with `async`
- ✅ Database queries before render
- ✅ Auth check with redirect
- ✅ Data transformation before passing to client component
- Fetches user with MFA device count for 2FA status
- Fetches OAuth account connections

## Data Fetching
```typescript
prisma.user.findUnique({
  select: {
    email, emailVerified, sessionVersion,
    _count: { select: { mfaDevices: { where: { verified: true } } } }
  }
})
```

## Props Passed to Client Component
- `user`: { email, emailVerified, sessionVersion, twoFactorEnabled }
- `connectedAccounts`: Array of { provider, accountId }

## Metadata
- ✅ Exports static `metadata` object for SEO
- Title: "Security Settings | Fabrk"
- Description: "Manage your account security, two-factor authentication, and active sessions"

## Design Patterns
- Server-side data fetching > client-side interactivity split
- Narrow container for focused, form-heavy content
- Back button for navigation hierarchy

## Inconsistencies
- **Different max-width**: Uses `max-w-4xl` instead of standard `max-w-6xl`
- **No design system imports**: Doesn't use `mode` or `cn` utilities
- **Plain Button**: Doesn't follow terminal style (no `&gt;` prefix)
