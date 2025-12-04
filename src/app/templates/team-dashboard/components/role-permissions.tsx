/**
 * ✅ FABRK COMPONENT
 * Role Permissions - Display role permissions reference
 */

import { StyledCardHeader } from "@/components/ui/card";
import { Users, Crown, Shield, Eye, type LucideIcon } from "lucide-react";

const roleIcons: Record<string, LucideIcon> = {
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
    <div className="border-border bg-card border">
      <StyledCardHeader code="0x00" title="PERMISSIONS" />
      <div className="p-4">
        <div className="text-muted-foreground mb-4 font-mono text-xs">[ROLE_PERMISSIONS]:</div>
        <div className="space-y-4 font-mono text-xs">
          {rolePermissions.map((item) => {
            const RoleIcon = roleIcons[item.role];
            return (
              <div key={item.role}>
                <div className="mb-1 flex items-center gap-2">
                  <RoleIcon className="text-primary h-3 w-3" />
                  <span className="font-semibold">{item.role.toUpperCase()}</span>
                </div>
                <div className="text-muted-foreground ml-4 space-y-0.5">
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
