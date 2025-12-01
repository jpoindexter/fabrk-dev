/**
 * Security Score Component - Terminal console style
 */

import { CheckCircle2, XCircle } from "lucide-react";

interface SecurityScoreProps {
  user: {
    emailVerified: boolean;
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
  };
}

export function SecurityScore({ user }: SecurityScoreProps) {
  const daysSincePasswordChange = Math.floor(
    (Date.now() - new Date(user.lastPasswordChange).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="border border-primary bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">security_score.json</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center border border-border bg-primary/10 font-mono text-xl font-bold text-primary">
              75%
            </div>
            <div>
              <div className="font-mono text-xs text-muted-foreground">[SECURITY_SCORE]:</div>
              <div className="font-mono text-xs text-muted-foreground">Good security posture, but improvements recommended</div>
            </div>
          </div>
          <span className="border border-warning/50 px-2 py-0.5 font-mono text-xs text-warning">
            MEDIUM_RISK
          </span>
        </div>
        <div className="space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            {user.emailVerified ? (
              <CheckCircle2 className="h-4 w-4 text-success" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
            <span>EMAIL_VERIFIED: {user.emailVerified ? "TRUE" : "FALSE"}</span>
          </div>
          <div className="flex items-center gap-2">
            {user.twoFactorEnabled ? (
              <CheckCircle2 className="h-4 w-4 text-success" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
            <span>TWO_FACTOR_AUTH: {user.twoFactorEnabled ? "TRUE" : "FALSE"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>PASSWORD_CHANGED: {daysSincePasswordChange}_DAYS_AGO (recommended: every 90 days)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
