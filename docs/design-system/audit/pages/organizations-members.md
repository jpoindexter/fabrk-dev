# Organization Members Page Audit

**File**: `src/app/(dashboard)/organizations/[slug]/members/page.tsx`

## Purpose

View and manage organization members with role-based access control.

## Layout Overview

- **Container**: `mx-auto max-w-6xl space-y-6`
- **Client Component**: Uses `"use client"` with state management
- **Layout**: Vertical stack with header, table, and info card

## Key Components Used

- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Table`, `TableBody`, `TableHead`, `TableHeader`, `TableRow`
- `Button` from `@/components/ui/button`
- `MembersPageHeader`, `MemberTableRow`, `RolePermissionsCard` - Custom member management components
- `useRouter`, `useParams` from next/navigation
- Icons: `Loader2`
- `toast` from sonner
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale

- `text-lg` - Empty state heading
- `text-muted-foreground` - Empty state text
- `font-medium` - Empty state heading

## Spacing Patterns

- `mx-auto max-w-6xl` - Centered wide container (72rem / 1152px)
- `space-y-6` - Main container (24px)

## Font Weights and Families

- `font-medium` - Empty state heading

## Colors Used (Semantic Tokens)

- `text-muted-foreground` - Loading text, empty state text
- `border-border` - Card borders

## Hardcoded Values

- `max-w-6xl` - Container max width (72rem / 1152px)
- `h-8 w-8` - Loading spinner (32px × 32px)
- `w-[70px]` - Empty table head column (70px)
- `py-12` - Loading/error state padding (48px)

## Member Interface

```typescript
interface Member {
  id: string;
  userId: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'GUEST';
  joinedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  role: string;
}
```

## State Management

```typescript
const [loading, setLoading] = useState(true);
const [organization, setOrganization] = useState<Organization | null>(null);
const [members, setMembers] = useState<Member[]>([]);
```

## Data Fetching (useEffect)

Parallel API calls:

1. `GET /api/organizations/:slug` - Fetch organization
2. `GET /api/organizations/:id/members` - Fetch members list

## API Integration

1. `GET /api/organizations/:slug` - Fetch organization
2. `GET /api/organizations/:id/members` - List members
3. `PATCH /api/organizations/:id/members/:memberId` - Update role
4. `DELETE /api/organizations/:id/members/:memberId` - Remove member

## Permission Gating

`isOwnerOrAdmin` = role in ["OWNER", "ADMIN"]

- Passed to header for invite button visibility
- Passed to table rows for edit/remove actions

## Handler Functions

```typescript
handleRemoveMember(memberId: string)
  - DELETE request
  - Optimistic UI update (filter members array)
  - Toast notification

handleUpdateRole(memberId: string, newRole: string)
  - PATCH request
  - Optimistic UI update (map members array)
  - Toast notification
```

## Table Structure

5 columns:

1. Member (avatar + name)
2. Email
3. Role (badge or select dropdown)
4. Joined (formatted date)
5. Actions (delete button)

## Component Composition

Excellent separation:

- **MembersPageHeader**: Title + invite button/dialog
- **MemberTableRow**: Individual row with role editing
- **RolePermissionsCard**: Info card explaining role permissions

## Loading State

Centered spinner with text: "Loading users..."

## Empty State (Organization not found)

Centered card:

- Heading: "Organization not found"
- Back to Dashboard button

## Design System Integration

- ✅ Uses `mode.radius` for cards
- ✅ Uses `cn()` utility
- ✅ Semantic color tokens
- ✅ Clean component composition

## Error Handling

- Try/catch on all async operations
- Toast notifications for errors
- Error message extraction from responses

## Inconsistencies

- **No empty members state**: Doesn't show message when members array is empty
- **Hardcoded column width**: `w-[70px]` uses arbitrary Tailwind value
