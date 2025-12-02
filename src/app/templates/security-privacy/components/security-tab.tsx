/**
 * Security Tab Component - 2FA, Sessions, Password
 */

import { Button } from "@/components/ui/button";
import { Smartphone, Clock, LogOut, Key } from "lucide-react";

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

interface SecurityTabProps {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  activeSessions: ActiveSession[];
  onEnable2FA: () => void;
  onRevokeSession: (sessionId: string) => void;
}

export function SecurityTab({
  twoFactorEnabled,
  lastPasswordChange,
  activeSessions,
  onEnable2FA,
  onRevokeSession,
}: SecurityTabProps) {
  return (
    <div className="space-y-6">
      {/* 2FA Section */}
      <div className="border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="flex gap-2">
            <div className="size-2 rounded-full bg-destructive/50" />
            <div className="size-2 rounded-full bg-warning/50" />
            <div className="size-2 rounded-full bg-success/50" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">two_factor.config</span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-mono text-xs text-muted-foreground">[TWO_FACTOR_AUTH]:</div>
                <div className="font-mono text-xs text-muted-foreground">Add an extra layer of security with TOTP</div>
              </div>
            </div>
            <span className={`border px-2 py-0.5 font-mono text-xs ${
              twoFactorEnabled
                ? "border-success/50 text-success"
                : "border-destructive/50 text-destructive"
            }`}>
              {twoFactorEnabled ? "ENABLED" : "DISABLED"}
            </span>
          </div>
          <p className="mb-4 font-mono text-xs text-muted-foreground">
            Use an authenticator app like Google Authenticator or Authy to generate time-based codes.
          </p>
          <Button onClick={onEnable2FA} className="rounded-none font-mono text-xs">
            <Smartphone className="mr-2 h-4 w-4" />
            &gt; {twoFactorEnabled ? "MANAGE_2FA" : "ENABLE_2FA"}
          </Button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="flex gap-2">
            <div className="size-2 rounded-full bg-destructive/50" />
            <div className="size-2 rounded-full bg-warning/50" />
            <div className="size-2 rounded-full bg-success/50" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">sessions.log</span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-mono text-xs text-muted-foreground">[ACTIVE_SESSIONS]: COUNT={activeSessions.length}</div>
            </div>
          </div>
          <div className="space-y-4 font-mono text-xs">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between border border-border p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span>{session.device}</span>
                    {session.isCurrent && (
                      <span className="border border-primary/50 px-1.5 py-0.5 text-primary">CURRENT</span>
                    )}
                  </div>
                  <div className="text-muted-foreground">{session.location} • {session.ip}</div>
                  <div className="text-muted-foreground">Last active: {session.lastActive}</div>
                </div>
                {!session.isCurrent && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRevokeSession(session.id)}
                    className="rounded-none font-mono text-xs"
                  >
                    <LogOut className="mr-2 h-3 w-3" />
                    &gt; REVOKE
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="destructive" size="sm" className="rounded-none font-mono text-xs">
              <LogOut className="mr-2 h-3 w-3" />
              &gt; SIGN_OUT_ALL_OTHER_DEVICES
            </Button>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="flex gap-2">
            <div className="size-2 rounded-full bg-destructive/50" />
            <div className="size-2 rounded-full bg-warning/50" />
            <div className="size-2 rounded-full bg-success/50" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">password.config</span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-mono text-xs text-muted-foreground">[PASSWORD]:</div>
                <div className="font-mono text-xs text-muted-foreground">
                  Last changed: {new Date(lastPasswordChange).toLocaleDateString()}
                </div>
              </div>
            </div>
            <Button variant="outline" className="rounded-none font-mono text-xs">
              &gt; CHANGE_PASSWORD
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
