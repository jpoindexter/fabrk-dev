/**
 * Role Permissions Card Component
 * Displays information about different role permissions
 */

"use client";

import { Crown, Shield, UserCheck, UserX } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RolePermissionsCard() {
  return (
    <Card className="rounded-md border border-border">
      <CardHeader>
        <CardTitle>Role Permissions</CardTitle>
        <CardDescription>
          Understanding member roles and their access levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              <Badge variant="default">OWNER</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Full control over organization, including deletion and ownership transfer.
            </p>
          </div>
          <div className="rounded-md border border-border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <Badge variant="secondary">ADMIN</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Can manage members, settings, and billing. Cannot delete organization.
            </p>
          </div>
          <div className="rounded-md border border-border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              <Badge variant="outline">MEMBER</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Standard access to organization resources and features.
            </p>
          </div>
          <div className="rounded-md border border-border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <UserX className="h-5 w-5 text-primary" />
              <Badge variant="outline">GUEST</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Limited read-only access to specific resources.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
