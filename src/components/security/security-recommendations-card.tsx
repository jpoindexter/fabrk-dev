"use client";

/**
 * Security Recommendations Card
 * Part of SecuritySettings split
 */

import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

interface SecurityRecommendationsCardProps {
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  connectedAccountsCount: number;
}

export function SecurityRecommendationsCard({
  emailVerified,
  twoFactorEnabled,
  connectedAccountsCount,
}: SecurityRecommendationsCardProps) {
  const warningCount = [!emailVerified, !twoFactorEnabled].filter(Boolean).length;

  return (
    <TerminalCard tone={warningCount > 0 ? "warning" : "success"}>
      <TerminalCardHeader
        code="0x05"
        title="SECURITY_RECOMMENDATIONS"
        icon={<Shield className="h-4 w-4" />}
        meta={
          warningCount > 0
            ? `${warningCount} ${warningCount === 1 ? "warning" : "warnings"}`
            : "all clear"
        }
      />
      <TerminalCardContent>
        <ul className="space-y-2">
          {!emailVerified && (
            <li className="flex items-start gap-2">
              <AlertTriangle className="text-warning mt-0.5 h-4 w-4 shrink-0" />
              <span className="font-mono text-xs">Verify your email address</span>
            </li>
          )}
          {!twoFactorEnabled && (
            <li className="flex items-start gap-2">
              <AlertTriangle className="text-warning mt-0.5 h-4 w-4 shrink-0" />
              <span className="font-mono text-xs">Enable two-factor authentication</span>
            </li>
          )}
          {connectedAccountsCount === 0 && (
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-success mt-0.5 h-4 w-4 shrink-0" />
              <span className="font-mono text-xs">
                Connect a backup sign-in method (Google or GitHub)
              </span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-success mt-0.5 h-4 w-4 shrink-0" />
            <span className="font-mono text-xs">Use a strong, unique password</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-success mt-0.5 h-4 w-4 shrink-0" />
            <span className="font-mono text-xs">Review your active sessions regularly</span>
          </li>
        </ul>
      </TerminalCardContent>
    </TerminalCard>
  );
}
