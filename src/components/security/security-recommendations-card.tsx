"use client";

/**
 * Security Recommendations Card
 * Part of SecuritySettings split
 */

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

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
  return (
    <Card className="bg-accent/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Security Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {!emailVerified && (
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
              <span>Verify your email address</span>
            </li>
          )}
          {!twoFactorEnabled && (
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
              <span>Enable two-factor authentication</span>
            </li>
          )}
          {connectedAccountsCount === 0 && (
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <span>Connect a backup sign-in method (Google or GitHub)</span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
            <span>Use a strong, unique password</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
            <span>Review your active sessions regularly</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
