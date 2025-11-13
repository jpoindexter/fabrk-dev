# Role Selector Component

A visual role selection component with hierarchical roles, permission display, and confirmation dialogs.

## Features

- **Visual role cards** with icons and descriptions
- **Single or multi-select** mode
- **Permission badges** for each role
- **Hierarchical roles** (Owner > Admin > Member > Guest)
- **Current role indicator**
- **Confirmation dialog** for role changes
- **Disabled roles** support
- **Two variants**: cards (grid) and list (vertical)
- **Neobrutalism styling** with theme support

## Basic Usage

```tsx
import { RoleSelector, DEFAULT_ROLES } from '@/components/ui/role-selector';

export default function TeamSettings() {
  const [selectedRole, setSelectedRole] = useState('member');

  return (
    <RoleSelector
      roles={DEFAULT_ROLES}
      value={selectedRole}
      onChange={setSelectedRole}
      showPermissions
    />
  );
}
```

## Default Roles

The component includes 4 default roles:

1. **Owner** - Full system access with billing and deletion rights
2. **Admin** - Manage team members and workspace settings
3. **Member** - Create and edit content with standard access
4. **Guest** - View-only access to shared content

## Props

```typescript
interface RoleSelectorProps {
  roles: Role[];                    // Array of role definitions
  value?: string | string[];        // Selected role(s)
  onChange?: (value: string | string[]) => void;
  multiSelect?: boolean;            // Allow multiple selection
  showPermissions?: boolean;        // Display permission badges
  showConfirmation?: boolean;       // Show confirmation dialog
  currentRole?: string;             // Highlight current role
  variant?: 'cards' | 'list';      // Display variant
  className?: string;               // Additional CSS classes
}

interface Role {
  id: string;
  name: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  permissions: string[];
  disabled?: boolean;
}
```

## Examples

### Multi-Select Mode

```tsx
<RoleSelector
  roles={DEFAULT_ROLES}
  value={['admin', 'member']}
  multiSelect
  onChange={(roles) => console.log('Selected:', roles)}
/>
```

### List Variant

```tsx
<RoleSelector
  roles={DEFAULT_ROLES}
  value="admin"
  variant="list"
  showPermissions
/>
```

### With Confirmation Dialog

```tsx
<RoleSelector
  roles={DEFAULT_ROLES}
  value="member"
  showConfirmation
  onChange={(role) => console.log('Role changed to:', role)}
/>
```

### Current Role Highlighted

```tsx
<RoleSelector
  roles={DEFAULT_ROLES}
  value="admin"
  currentRole="member"  // Shows "Current" badge
  showPermissions
/>
```

### Disabled Roles

```tsx
const rolesWithDisabled = DEFAULT_ROLES.map(role =>
  role.id === 'owner' ? { ...role, disabled: true } : role
);

<RoleSelector
  roles={rolesWithDisabled}
  value="admin"
/>
```

### Custom Roles

```tsx
import { Pencil, MessageSquare, Eye } from 'lucide-react';

const PROJECT_ROLES = [
  {
    id: 'editor',
    name: 'Editor',
    description: 'Full edit access to project files',
    icon: Pencil,
    permissions: ['Edit files', 'Manage settings', 'Invite members'],
  },
  {
    id: 'commenter',
    name: 'Commenter',
    description: 'Add comments and suggestions',
    icon: MessageSquare,
    permissions: ['Add comments', 'View files'],
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'View-only access',
    icon: Eye,
    permissions: ['View files', 'Download content'],
  },
];

<RoleSelector
  roles={PROJECT_ROLES}
  value="editor"
  showPermissions
/>
```

## Use Cases

### Team Member Invitation

```tsx
export default function InviteMemberDialog() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');

  const handleInvite = () => {
    // Send invitation with selected role
    sendInvitation(email, role);
  };

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <RoleSelector
            roles={DEFAULT_ROLES}
            value={role}
            onChange={setRole}
            showPermissions
            variant="list"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleInvite}>Send Invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Role Change with Confirmation

```tsx
export default function MemberRoleSettings({ member }) {
  const [role, setRole] = useState(member.role);

  const handleRoleChange = async (newRole: string) => {
    await updateMemberRole(member.id, newRole);
    setRole(newRole);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-black">Change Member Role</h3>
      <RoleSelector
        roles={DEFAULT_ROLES}
        value={role}
        currentRole={member.role}
        onChange={handleRoleChange}
        showConfirmation
        showPermissions
      />
    </div>
  );
}
```

### Multi-Tenant Access Control

```tsx
export default function WorkspaceAccessControl() {
  const [selectedRoles, setSelectedRoles] = useState(['member']);

  return (
    <div className="space-y-4">
      <h3 className="font-black">Allowed Roles</h3>
      <p className="text-sm text-muted-foreground">
        Select which roles can access this workspace
      </p>
      <RoleSelector
        roles={DEFAULT_ROLES}
        value={selectedRoles}
        onChange={setSelectedRoles}
        multiSelect
        showPermissions
      />
    </div>
  );
}
```

## Styling

The component uses Fabrk's neobrutalism design tokens and is fully theme-responsive:

- **Border**: `border-2 border-brutal`
- **Shadows**: `shadow-brutal`, `shadow-brutal-lg`
- **Radius**: `rounded-brutal`
- **Colors**: Uses theme variables (`primary`, `accent`, `card`, etc.)
- **Hover effects**: Shadow elevation and transform
- **Active state**: Primary border and background tint

## Accessibility

- Proper button semantics with `disabled` state
- Check icon indicates selected state
- Focus ring for keyboard navigation
- Alert dialog for confirmations with proper ARIA attributes
- Color contrast meets WCAG AA standards

## Storybook

View all examples in Storybook:

```bash
npm run storybook
```

Navigate to **UI > RoleSelector** to see:
- Default role selector
- Multi-select mode
- Card vs List variants
- With/without permissions
- Confirmation dialogs
- Custom roles
- Interactive examples
