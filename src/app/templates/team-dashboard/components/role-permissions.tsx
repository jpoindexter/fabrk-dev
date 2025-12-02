/**
 * ✅ FABRK COMPONENT
 * Role Permissions - Display role permissions reference
 */

import { Users, Crown, Shield, Eye } from "lucide-react";

const roleIcons: Record<string, any> = {
  owner: Crown,
  admin: Shield,
  member: Users,
  guest: Eye,
};

const rolePermissions = [
  {
    role: "owner",
    permissions: ["Full access", "Billing & plan", "Delete organization"],
  },
  {
    role: "admin",
    permissions: ["Manage members", "Change settings", "View analytics"],
  },
  {
    role: "member",
    permissions: ["Create projects", "Edit content", "View reports"],
  },
  {
    role: "guest",
    permissions: ["View only", "Comment", "Limited access"],
  },
];

export function RolePermissions() {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">permissions.config</span>
      </div>
      <div className="p-4">
        <div className="font-mono text-xs text-muted-foreground mb-4">[ROLE_PERMISSIONS]:</div>
        <div className="space-y-4 font-mono text-xs">
          {rolePermissions.map((item) => {
            const RoleIcon = roleIcons[item.role];
            return (
              <div key={item.role}>
                <div className="flex items-center gap-2 mb-1">
                  <RoleIcon className="h-3 w-3 text-primary" />
                  <span className="font-semibold">{item.role.toUpperCase()}</span>
                </div>
                <div className="ml-4 space-y-0.5 text-muted-foreground">
                  {item.permissions.map((perm, idx) => (
                    <div key={idx}>&gt; {perm}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
