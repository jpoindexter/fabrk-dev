/**
 * Security Score Component - Terminal console style
 */

import { useMemo } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface SecurityScoreProps {
  user: {
    emailVerified: boolean;
    twoFactorEnabled: boolean;
    lastPasswordChange: string; // Ensure this matches the actual prop type
  };
}

export function SecurityScore({ user }: SecurityScoreProps) {
  // eslint-disable-next-line react-hooks/purity
  const nowTime = Date.now();

  const daysSincePasswordChange = useMemo(() => {
    if (!user.lastPasswordChange) return Infinity;
    const lastChange = new Date(user.lastPasswordChange).getTime();
    return Math.floor((nowTime - lastChange) / (1000 * 60 * 60 * 24));
  }, [user.lastPasswordChange, nowTime]); // Add nowTime to dependencies

  return (
    <div className="border-primary bg-card border">
      <div className="border-border flex items-center gap-2 border-b px-4 py-2">
        <div className="flex gap-2">
          <div className="bg-destructive/50 size-2 rounded-full" />
          <div className="bg-warning/50 size-2 rounded-full" />
          <div className="bg-success/50 size-2 rounded-full" />
        </div>
        <span className="text-muted-foreground font-mono text-xs">security_score.json</span>
      </div>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="border-border bg-primary/10 text-primary flex h-16 w-16 items-center justify-center border font-mono text-xl font-bold">
              75%
            </div>
            <div>
              <div className="text-muted-foreground font-mono text-xs">[SECURITY_SCORE]:</div>
              <div className="text-muted-foreground font-mono text-xs">
                Good security posture, but improvements recommended
              </div>
            </div>
          </div>
          <span className="border-warning/50 text-warning border px-2 py-0.5 font-mono text-xs">
            MEDIUM_RISK
          </span>
        </div>
        <div className="space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            {user.emailVerified ? (
              <CheckCircle2 className="text-success h-4 w-4" />
            ) : (
              <XCircle className="text-destructive h-4 w-4" />
            )}
            <span>EMAIL_VERIFIED: {user.emailVerified ? "TRUE" : "FALSE"}</span>
          </div>
          <div className="flex items-center gap-2">
            {user.twoFactorEnabled ? (
              <CheckCircle2 className="text-success h-4 w-4" />
            ) : (
              <XCircle className="text-destructive h-4 w-4" />
            )}
            <span>TWO_FACTOR_AUTH: {user.twoFactorEnabled ? "TRUE" : "FALSE"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-success h-4 w-4" />
            <span>
              PASSWORD_CHANGED: {daysSincePasswordChange}_DAYS_AGO (recommended: every 90 days)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
