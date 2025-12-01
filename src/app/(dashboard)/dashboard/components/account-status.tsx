/**
 * Account Status Component
 * Displays current account information and status
 */

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Activity } from "lucide-react";

interface AccountStatusProps {
  mfaEnabled?: boolean;
  userTier?: string | null;
}

export function AccountStatus({ mfaEnabled, userTier }: AccountStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Account Status</CardTitle>
        <CardDescription>
          Current account information and status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex items-center gap-3 rounded-none border p-4">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Security</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={mfaEnabled ? "default" : "secondary"}
                >
                  2FA {mfaEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-none border p-4">
            <Users className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Account Type</p>
              <Badge variant="outline" className="mt-1">
                {userTier || "FREE"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-none border p-4">
            <Activity className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge className="mt-1 bg-success text-success-foreground">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
