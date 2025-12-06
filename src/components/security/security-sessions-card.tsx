"use client";

/**
 * Active Sessions Card
 * Part of SecuritySettings split
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, StyledCardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, LogOut } from "lucide-react";

import { mode } from "@/design-system";
import { cn } from "@/lib/utils";
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
      <StyledCardHeader
        title="ACTIVE_SESSIONS"
        icon={<Clock className="text-muted-foreground h-4 w-4" />}
      />
      <CardContent className="space-y-4">
        <p className="text-muted-foreground mb-4 font-mono text-xs">
          Manage devices and locations where you&apos;re signed in
        </p>
        <p className="text-muted-foreground font-mono text-xs">Session version: {sessionVersion}</p>

        {/* Placeholder for active sessions - would require Session model */}
        <div className="space-y-4">
          <div
            className={cn(
              "border-border flex items-center justify-between border p-4",
              mode.radius
            )}
          >
            <div>
              <p className="font-mono text-sm font-medium">Current Session</p>
              <p className="text-muted-foreground font-mono text-xs">
                Your current browser session
              </p>
            </div>
            <Badge>Active</Badge>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Button
            variant="destructive"
            onClick={onInvalidateSessions}
            disabled={isInvalidatingSessions}
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isInvalidatingSessions ? "> INVALIDATING..." : "> SIGN_OUT_ALL_SESSIONS"}
          </Button>
          <p className="text-muted-foreground text-center font-mono text-xs">
            This will log you out from all devices except this one. You&apos;ll need to sign in
            again on those devices.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
