# Developer API Keys Page Audit

**File**: `src/app/(dashboard)/developer/api-keys/page.tsx`

## Purpose
API key management with creation, viewing, permissions, and revocation functionality.

## Layout Overview
- **Container**: `container mx-auto max-w-6xl px-6 py-8`
- **Layout**: Vertical stack of components
- **Client Component**: Uses `"use client"` with hooks

## Key Components Used
- `ApiKeyHeader`, `CreateKeyForm`, `SecurityAlerts`, `ApiKeysList`, `ApiDocumentation`, `RevokeDialog` - Custom modular components
- `useToast` hook
- State management: `useState`, `useEffect`, `useCallback`

## Typography Scale
- **No direct typography** - All delegated to child components

## Spacing Patterns
- `px-6 py-8` - Container padding (24px horizontal, 32px vertical)

## Font Weights and Families
- **None direct** - All in child components

## Colors Used
- **None direct** - All in child components

## Hardcoded Values
- `max-w-6xl` - Container max width (72rem / 1152px)

## State Management
Manages complex state:
- `apiKeys` - Array of API key objects
- `loading` - Boolean loading state
- `organizationId` - Current org context
- `isCreating` - Create operation loading
- `isRevoking` - Revoke operation loading (ID string)
- `isDialogOpen` - Create dialog visibility
- `newKeyName`, `selectedPermissions` - Form state
- `createdKey` - Newly created full key (shown once)
- `revokeDialogOpen`, `keyToRevoke` - Revoke dialog state

## API Integration Patterns
- ✅ Organization fetch on mount
- ✅ API keys fetch when org loaded (using `useCallback`)
- ✅ Error handling with toast notifications
- ✅ Optimistic UI updates (refresh after mutations)
- ✅ One-time key display pattern for security

## Component Composition
Excellent separation:
1. **ApiKeyHeader** - Title + create button/dialog
2. **CreateKeyForm** - Form inside dialog
3. **SecurityAlerts** - Warnings + created key display
4. **ApiKeysList** - Table of existing keys
5. **ApiDocumentation** - Usage examples
6. **RevokeDialog** - Confirmation modal

## Security Patterns
- ✅ Full API key only shown once after creation
- ✅ Copy to clipboard functionality
- ✅ Confirmation dialog for destructive actions
- ✅ Permission-based key scoping
- Permission toggle UI with `selectedPermissions` array

## Data Flow
1. Mount → Fetch organization
2. Organization loaded → Fetch API keys
3. Create key → Display once → Clear → Refresh list
4. Revoke key → Confirm → Delete → Refresh list

## TypeScript Interface
```typescript
interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  permissions: string[];
  lastUsedAt: string | null;
  createdAt: string;
  user: { name: string | null; email: string; }
}
```

## Error Handling
- Try/catch on all async operations
- Toast notifications for all errors
- Fallback error messages for unknown errors
- Loading states prevent duplicate requests

## Inconsistencies
- **Very clean** - Excellent component composition pattern
- Uses standard container pattern consistent with other pages
