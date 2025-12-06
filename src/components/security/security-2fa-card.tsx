"use client";

/**
 * Two-Factor Authentication Card
 * Part of SecuritySettings split
 */

import { Button } from "@/components/ui/button";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Smartphone, CheckCircle2, XCircle } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

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
    <TerminalCard tone={twoFactorEnabled ? "success" : "warning"}>
      <TerminalCardHeader
        code="0x02"
        title="TWO_FACTOR_AUTH"
        icon={<Smartphone className="h-4 w-4" />}
      />
      <TerminalCardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground font-mono text-xs">
            Add an extra layer of security to your account
          </p>
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
        <p className="text-muted-foreground font-mono text-xs">
          Two-factor authentication (2FA) adds an additional layer of security by requiring a second
          form of verification when you sign in.
        </p>

        {twoFactorEnabled ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-success h-4 w-4" />
              <span className="font-mono text-xs">2FA is currently protecting your account</span>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={onViewBackupCodes}>
                &gt; VIEW_BACKUP_CODES
              </Button>
              <Button variant="destructive" onClick={onDisable2FA} disabled={isDisabling2FA}>
                {isDisabling2FA ? "> DISABLING..." : "> DISABLE_2FA"}
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={onEnable2FA} disabled={isEnabling2FA}>
            <Shield className="mr-2 h-4 w-4" />
            {isEnabling2FA ? "> SETTING_UP..." : "> ENABLE_2FA"}
          </Button>
        )}
      </TerminalCardContent>
    </TerminalCard>
  );
}
