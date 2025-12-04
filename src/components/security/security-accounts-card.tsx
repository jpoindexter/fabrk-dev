"use client";

/**
 * Connected Accounts Card
 * Part of SecuritySettings split
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Key, Trash2 } from "lucide-react";

import { mode } from "@/lib/design-system/visual-mode";
import { cn } from "@/lib/utils";
interface ConnectedAccount {
  provider: string;
  accountId: string;
}

interface SecurityAccountsCardProps {
  connectedAccounts: ConnectedAccount[];
  disconnectingProvider: string | null;
  onDisconnect: (provider: string) => void;
}

export function SecurityAccountsCard({
  connectedAccounts,
  disconnectingProvider,
  onDisconnect,
}: SecurityAccountsCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className={cn("bg-primary/10 border-border border p-4", mode.radius)}>
            <Key className="text-primary h-6 w-6" />
          </div>
          <div>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
              Manage third-party accounts linked to your Fabrk account
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {connectedAccounts.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No connected accounts. You can link Google or GitHub for faster sign-in.
          </p>
        ) : (
          <div className="space-y-4">
            {connectedAccounts.map((account, i) => (
              <div
                key={i}
                className={cn(
                  "border-border flex items-center justify-between border p-4",
                  mode.radius
                )}
              >
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="capitalize">
                    {account.provider}
                  </Badge>
                  <span className="text-muted-foreground text-sm">Connected</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDisconnect(account.provider)}
                  disabled={disconnectingProvider === account.provider}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {disconnectingProvider === account.provider ? "Disconnecting..." : "Disconnect"}
                </Button>
              </div>
            ))}
          </div>
        )}

        <Separator />

        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            Connect Google
          </Button>
          <Button variant="outline" size="sm">
            Connect GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
