---
title: 'Admin Panel: Managing Your SaaS'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'admin-panel-features'
description: 'Fabrk includes a complete admin panel for user management, subscription oversight, system health, and more.'
publishedAt: '2026-01-10T10:00:00.000Z'
---

**Admin tools for SaaS operators.**

---

## Admin Panel Overview

Fabrk's admin panel provides:

- User management
- Subscription oversight
- System health monitoring
- Feature flags
- Analytics

All styled with the terminal aesthetic.

---

## Access Control

Admin routes are protected:

```typescript
// middleware.ts
export async function middleware(request: Request) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = await auth();

    if (session?.user.role !== 'admin') {
      return Response.redirect(new URL('/dashboard', request.url));
    }
  }
}
```

---

## User Management

View and manage all users:

```tsx
export function UserManagement() {
  const { users, isLoading } = useUsers();

  return (
    <Card className={cn('overflow-hidden', mode.radius)}>
      <div className="border-b border-border px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">
            [ USERS ]
          </span>
          <InputSearch placeholder="Search users..." />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge>{user.plan}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Impersonate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Suspend
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

---

## User Impersonation

Impersonate users for support:

```typescript
// api/admin/impersonate/route.ts
export async function POST(request: Request) {
  const session = await auth();

  // Only admins can impersonate
  if (session?.user.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { userId } = await request.json();

  // Store original admin ID
  const impersonationToken = await createImpersonationToken({
    adminId: session.user.id,
    targetUserId: userId,
  });

  // Log for audit
  await prisma.auditLog.create({
    data: {
      action: 'IMPERSONATE',
      adminId: session.user.id,
      targetUserId: userId,
    },
  });

  return Response.json({ token: impersonationToken });
}
```

---

## Subscription Management

Monitor subscriptions:

```tsx
export function SubscriptionOverview() {
  return (
    <div className="space-y-6">
      {/* MRR Card */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard label="MRR" value="$12,450" change={8} />
        <KPICard label="Active" value="847" change={5} />
        <KPICard label="Trial" value="124" change={12} />
        <KPICard label="Churned" value="23" change={-15} />
      </div>

      {/* Subscription Table */}
      <Card className={cn('overflow-hidden', mode.radius)}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Renews</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Subscription rows */}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
```

---

## System Health

Monitor system status:

```tsx
export function SystemHealth() {
  const { health } = useSystemHealth();

  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="border-b border-border pb-2 mb-4">
        <span className="font-mono text-xs text-muted-foreground">
          [ SYSTEM STATUS ]
        </span>
      </div>
      <div className="space-y-4">
        <HealthItem
          name="Database"
          status={health.database}
          latency={health.dbLatency}
        />
        <HealthItem
          name="Redis"
          status={health.redis}
          latency={health.redisLatency}
        />
        <HealthItem
          name="External APIs"
          status={health.apis}
        />
        <HealthItem
          name="Background Jobs"
          status={health.jobs}
          pending={health.pendingJobs}
        />
      </div>
    </Card>
  );
}

function HealthItem({ name, status, latency, pending }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={cn(
          'w-2 h-2 rounded-full',
          status === 'healthy' ? 'bg-success' : 'bg-destructive'
        )} />
        <span className="font-mono text-sm">{name}</span>
      </div>
      <div className="text-muted-foreground font-mono text-xs">
        {latency && `${latency}ms`}
        {pending !== undefined && `${pending} pending`}
      </div>
    </div>
  );
}
```

---

## Feature Flags

Control features from admin:

```tsx
export function FeatureFlags() {
  const { flags, toggleFlag } = useFeatureFlags();

  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="border-b border-border pb-2 mb-4">
        <span className="font-mono text-xs text-muted-foreground">
          [ FEATURE FLAGS ]
        </span>
      </div>
      <div className="space-y-4">
        {flags.map((flag) => (
          <div key={flag.id} className="flex items-center justify-between">
            <div>
              <span className="font-mono text-sm">{flag.name}</span>
              <p className="text-muted-foreground text-xs">
                {flag.description}
              </p>
            </div>
            <Switch
              checked={flag.enabled}
              onCheckedChange={() => toggleFlag(flag.id)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
```

---

## Audit Logs

Track admin actions:

```tsx
export function AuditLog() {
  const { logs } = useAuditLogs();

  return (
    <Card className={cn('overflow-hidden', mode.radius)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                <Badge>{log.action}</Badge>
              </TableCell>
              <TableCell>{log.admin.name}</TableCell>
              <TableCell>{log.target}</TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(log.timestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

---

## Admin Navigation

Sidebar for admin sections:

```tsx
export function AdminSidebar() {
  return (
    <nav className="w-64 border-r border-border p-4">
      <div className="font-mono text-xs text-muted-foreground mb-4">
        [ ADMIN ]
      </div>
      <ul className="space-y-1">
        <NavItem href="/admin" icon={LayoutDashboard}>
          Overview
        </NavItem>
        <NavItem href="/admin/users" icon={Users}>
          Users
        </NavItem>
        <NavItem href="/admin/subscriptions" icon={CreditCard}>
          Subscriptions
        </NavItem>
        <NavItem href="/admin/health" icon={Activity}>
          System Health
        </NavItem>
        <NavItem href="/admin/flags" icon={Flag}>
          Feature Flags
        </NavItem>
        <NavItem href="/admin/logs" icon={FileText}>
          Audit Logs
        </NavItem>
      </ul>
    </nav>
  );
}
```

---

## Components Included

| Component | Purpose |
|-----------|---------|
| `UserManagement` | User CRUD |
| `SubscriptionOverview` | Subscription stats |
| `SystemHealth` | Service status |
| `FeatureFlags` | Toggle features |
| `AuditLog` | Action history |
| `AdminSidebar` | Navigation |

---

## Best Practices

1. **Audit everything** - Log admin actions
2. **Require confirmation** - For destructive actions
3. **Use impersonation sparingly** - With logging
4. **Keep it simple** - Admins need efficiency
5. **Mobile support** - Admins work from phones too

Admin tools for operators.

