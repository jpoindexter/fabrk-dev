"use client";

/**
 * Active Sessions Card
 * Part of SecuritySettings split
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, LogOut } from "lucide-react";

interface SecuritySessionsCardProps {
  sessionVersion: number;
  isInvalidatingSessions: boolean;
  onInvalidateSessions: () => void;
}

export function SecuritySessionsCard({
  sessionVersion,
  isInvalidatingSessions,
  onInvalidateSessions,
}: SecuritySessionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-none bg-primary/10 border border-border">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>
              Manage devices and locations where you're signed in
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Session version: {sessionVersion}
        </p>

        {/* Placeholder for active sessions - would require Session model */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-border rounded-none">
            <div>
              <p className="font-medium text-sm">Current Session</p>
              <p className="text-xs text-muted-foreground">
                Your current browser session
              </p>
            </div>
            <Badge>Active</Badge>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Button
            variant="destructive"
            onClick={onInvalidateSessions}
            disabled={isInvalidatingSessions}
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isInvalidatingSessions ? "Invalidating sessions..." : "Sign Out All Other Sessions"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            This will log you out from all devices except this one. You'll need to sign in
            again on those devices.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
