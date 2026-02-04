---
title: 'Organization Management: Multi-Tenant Teams'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'organization-team-management'
description: 'Fabrk includes complete organization and team management: invites, roles, permissions, and multi-tenancy patterns.'
publishedAt: '2026-01-19T10:00:00.000Z'
---

**Built-in multi-tenancy for B2B SaaS.**

---

## Why Organizations?

Most B2B SaaS needs:

- Team workspaces
- User invitations
- Role-based permissions
- Data isolation

Fabrk includes all of this.

---

## Data Model

```prisma
model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())

  members OrganizationMember[]
}

model OrganizationMember {
  id             String     @id @default(cuid())
  userId         String
  organizationId String
  role           MemberRole @default(MEMBER)
  joinedAt       DateTime   @default(now())

  user         User         @relation(fields: [userId], references: [id])
  organization Organization @relation(fields: [organizationId], references: [id])

  @@unique([userId, organizationId])
}

enum MemberRole {
  OWNER
  ADMIN
  MEMBER
}
```

---

## Roles and Permissions

| Role | Capabilities |
|------|--------------|
| OWNER | Full access, delete org, transfer ownership |
| ADMIN | Manage members, settings, billing |
| MEMBER | Access resources, no management |

---

## Creating Organizations

```typescript
// Create organization with owner
const org = await prisma.organization.create({
  data: {
    name: 'Acme Corp',
    slug: 'acme-corp',
    members: {
      create: {
        userId: session.user.id,
        role: 'OWNER',
      },
    },
  },
});
```

---

## Inviting Members

```typescript
// Create invitation
const invite = await prisma.organizationInvite.create({
  data: {
    organizationId: org.id,
    email: 'new@member.com',
    role: 'MEMBER',
    token: generateToken(),
    expiresAt: addDays(new Date(), 7),
  },
});

// Send invite email
await sendEmail.teamInvite({
  to: invite.email,
  orgName: org.name,
  inviteUrl: `${appUrl}/invite/${invite.token}`,
});
```

---

## Accepting Invites

```typescript
// Accept invitation
export async function acceptInvite(token: string, userId: string) {
  const invite = await prisma.organizationInvite.findUnique({
    where: { token },
  });

  if (!invite || invite.expiresAt < new Date()) {
    throw new Error('Invalid or expired invite');
  }

  // Create membership
  await prisma.organizationMember.create({
    data: {
      userId,
      organizationId: invite.organizationId,
      role: invite.role,
    },
  });

  // Delete used invite
  await prisma.organizationInvite.delete({
    where: { id: invite.id },
  });
}
```

---

## Authorization Helpers

```typescript
// Check membership
async function isMember(userId: string, orgId: string) {
  const member = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: { userId, organizationId: orgId },
    },
  });
  return !!member;
}

// Check role
async function hasRole(userId: string, orgId: string, roles: MemberRole[]) {
  const member = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: { userId, organizationId: orgId },
    },
  });
  return member && roles.includes(member.role);
}

// Check if admin or owner
async function isAdmin(userId: string, orgId: string) {
  return hasRole(userId, orgId, ['OWNER', 'ADMIN']);
}
```

---

## Scoping Queries

Always scope queries to the organization:

```typescript
// GOOD - scoped to organization
const projects = await prisma.project.findMany({
  where: {
    organizationId: currentOrg.id,
  },
});

// BAD - returns all projects
const projects = await prisma.project.findMany();
```

---

## Organization Context

Use context for easy access:

```typescript
// hooks/use-organization.ts
export function useOrganization() {
  const [org] = useLocalStorage('currentOrg', null);

  const switchOrg = (orgId: string) => {
    localStorage.setItem('currentOrg', orgId);
    router.refresh();
  };

  return { org, switchOrg };
}
```

---

## API Route Protection

Protect routes with organization checks:

```typescript
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orgId = request.headers.get('x-organization-id');
  if (!orgId) {
    return Response.json({ error: 'Organization required' }, { status: 400 });
  }

  // Verify membership
  const isMember = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: session.user.id,
        organizationId: orgId,
      },
    },
  });

  if (!isMember) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Proceed with org-scoped data
}
```

---

## Organization Switcher

UI component for switching organizations:

```tsx
import { useOrganization } from '@/hooks/use-organization';
import { Select } from '@/components/ui/select';

export function OrgSwitcher() {
  const { orgs, currentOrg, switchOrg } = useOrganization();

  return (
    <Select value={currentOrg?.id} onValueChange={switchOrg}>
      {orgs.map((org) => (
        <SelectItem key={org.id} value={org.id}>
          {org.name}
        </SelectItem>
      ))}
    </Select>
  );
}
```

---

## Member Management UI

```tsx
import { Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function MemberList({ members }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>{member.user.name}</TableCell>
            <TableCell>
              <Badge>{member.role}</Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

## Billing per Organization

Subscriptions are tied to organizations:

```prisma
model Subscription {
  id             String       @id
  organizationId String
  status         String
  priceId        String

  organization Organization @relation(fields: [organizationId], references: [id])
}
```

---

## Components Included

Fabrk provides organization components:

| Component | Purpose |
|-----------|---------|
| `OrgSwitcher` | Switch between organizations |
| `MemberList` | Display team members |
| `InviteForm` | Invite new members |
| `RoleSelect` | Change member roles |
| `OrgSettings` | Organization settings |

---

## Best Practices

1. **Always scope queries** - Never leak data between orgs
2. **Check permissions** - Verify role before actions
3. **Use transactions** - For multi-step operations
4. **Audit changes** - Log who did what
5. **Handle edge cases** - Last owner, pending invites

---

## Getting Started

1. Run `npm run db:push` to create tables
2. Import organization components
3. Add org context to your app
4. Scope all data queries

Multi-tenancy, built in.

