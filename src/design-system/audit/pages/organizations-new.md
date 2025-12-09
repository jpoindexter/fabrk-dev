# Create Organization Page Audit

**File**: `src/app/(dashboard)/organizations/new/page.tsx`

## Purpose

3-step wizard for creating a new organization with invite functionality.

## Layout Overview

- **Container**: `mx-auto max-w-2xl space-y-6`
- **Client Component**: Uses `"use client"` with form validation
- **Layout**: Wizard steps with conditional rendering

## Key Components Used

- `ProgressSteps`, `OrganizationDetailsStep`, `InviteMembersStep`, `SuccessStep` - Custom wizard components
- `useRouter` from next/navigation
- `useSession` from next-auth
- `useForm` from react-hook-form
- `zodResolver` from @hookform/resolvers/zod
- `toast` from sonner
- Zod for schema validation

## Typography Scale

- **No direct typography** - All delegated to child components

## Spacing Patterns

- `space-y-6` - Main container (24px)

## Font Weights and Families

- **None direct** - All in child components

## Colors Used

- **None direct** - All in child components

## Hardcoded Values

- `max-w-2xl` - Container max width (42rem / 672px)

## Form Validation Schemas

```typescript
const organizationSchema = z.object({
  name: z.string().min(2, '...'),
  description: z.string().optional(),
  slug: z
    .string()
    .min(2, '...')
    .regex(/^[a-z0-9-]+$/, '...'),
});

const inviteSchema = z.object({
  emails: z.string(),
  role: z.enum(['OWNER', 'ADMIN', 'MEMBER', 'GUEST']),
});
```

## State Management

```typescript
const [step, setStep] = useState(1);
const [loading, setLoading] = useState(false);
const [createdOrgId, setCreatedOrgId] = useState<string | null>(null);
const orgForm = useForm<OrganizationFormData>(...);
const inviteForm = useForm<InviteFormData>(...);
```

## Auto-Slug Generation

Uses form.watch() to generate slug from name:

```typescript
const slug = value.name
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
```

## Step Flow

1. **Organization Details** (Step 1)
   - Name, Description, Slug
   - On submit: POST /api/organizations/create
   - Stores createdOrgId, advances to step 2

2. **Invite Members** (Step 2)
   - Emails (comma/newline separated), Role
   - On submit: POST /api/organizations/invite (multiple)
   - On skip: Redirect to /dashboard

3. **Success** (Step 3) - Not currently used in flow

## API Integration

1. `POST /api/organizations/create` - Creates organization
2. `POST /api/organizations/invite` - Sends invites (one per email)

## Invite Processing

Splits email string by newline, comma, or semicolon:

```typescript
const emailList = data.emails
  .split(/[\n,;]+/)
  .map((e) => e.trim())
  .filter((e) => e);
```

## Error Handling

- Try/catch on all async operations
- Toast notifications for success/failure
- Error message extraction from API responses

## Component Composition

Excellent wizard pattern:

- Parent manages state and flow
- Child components handle UI and local validation
- Props pass callbacks and state

## Wizard Navigation

- Progress indicator at top
- Back button (step 2)
- Skip button (step 2)
- Cancel button (step 1)

## Design Patterns

- ✅ Clean separation of concerns
- ✅ Type-safe form handling with Zod + react-hook-form
- ✅ Auto-slug generation with reactive form watching
- ✅ Multi-step state management
- ✅ Proper loading states

## Inconsistencies

- **Step 3 (Success) never reached**: Flow goes step 1 → 2 → redirect
- **totalSteps = 2**: Comment says 3-step but only uses 2
- **Promise.all for invites**: No partial success handling (all-or-nothing)
