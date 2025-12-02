"use client";

/**
 * Two-Factor Authentication Card
 * Part of SecuritySettings split
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Smartphone, CheckCircle2, XCircle } from "lucide-react";

interface Security2FACardProps {
  twoFactorEnabled: boolean;
  isEnabling2FA: boolean;
  isDisabling2FA: boolean;
  onEnable2FA: () => void;
  onDisable2FA: () => void;
  onViewBackupCodes: () => void;
}

export function Security2FACard({
  twoFactorEnabled,
  isEnabling2FA,
  isDisabling2FA,
  onEnable2FA,
  onDisable2FA,
  onViewBackupCodes,
}: Security2FACardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 border-border rounded-none border p-4">
              <Smartphone className="text-primary h-6 w-6" />
            </div>
            <div>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </div>
          </div>
          {twoFactorEnabled ? (
            <Badge variant="default" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Enabled
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1">
              <XCircle className="h-3 w-3" />
              Disabled
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Two-factor authentication (2FA) adds an additional layer of security by requiring a second
          form of verification when you sign in.
        </p>

        {twoFactorEnabled ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="text-success h-4 w-4" />
              <span>2FA is currently protecting your account</span>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={onViewBackupCodes}>
                View Backup Codes
              </Button>
              <Button variant="destructive" onClick={onDisable2FA} disabled={isDisabling2FA}>
                {isDisabling2FA ? "Disabling..." : "Disable 2FA"}
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={onEnable2FA} disabled={isEnabling2FA}>
            <Shield className="mr-2 h-4 w-4" />
            {isEnabling2FA ? "Setting up..." : "Enable Two-Factor Authentication"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
