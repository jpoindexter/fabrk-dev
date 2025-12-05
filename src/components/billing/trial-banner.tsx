"use client";

/**
 * Trial Banner Component
 * Shows trial status and days remaining in the dashboard
 */

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TrialBannerProps {
  trialEndsAt: string | null;
  tier: string;
}

export function TrialBanner({ trialEndsAt, tier }: TrialBannerProps) {
  // Calculate trial status from props (no need for useEffect/useState)
  const { daysRemaining, isExpired } = useMemo(() => {
    if (!trialEndsAt || tier !== "trial") {
      return { daysRemaining: 0, isExpired: false };
    }

    const endDate = new Date(trialEndsAt);
    const now = new Date();
    const msRemaining = endDate.getTime() - now.getTime();
    const days = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

    return {
      daysRemaining: Math.max(0, days),
      isExpired: days <= 0,
    };
  }, [trialEndsAt, tier]);

  // Only show for trial users
  if (tier !== "trial" || !trialEndsAt) {
    return null;
  }

  if (isExpired) {
    return (
      <Alert className="border-destructive bg-destructive/10">
        <Clock className="h-4 w-4 text-destructive" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-destructive font-medium">
            Your free trial has ended. Upgrade now to continue using all features.
          </span>
          <Button asChild size="sm" className="ml-4">
            <Link href="/pricing">
              &gt; UPGRADE_NOW
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Warning when 3 days or less remaining
  const isUrgent = daysRemaining <= 3;

  return (
    <Alert className={isUrgent ? "border-warning bg-warning/10" : "border-primary bg-primary/10"}>
      <Clock className={`h-4 w-4 ${isUrgent ? "text-warning" : "text-primary"}`} />
      <AlertDescription className="flex items-center justify-between">
        <span className={isUrgent ? "text-warning font-medium" : "text-primary"}>
          {daysRemaining === 1
            ? "Your free trial ends tomorrow!"
            : `${daysRemaining} days remaining in your free trial.`}
        </span>
        <Button asChild variant={isUrgent ? "default" : "outline"} size="sm" className="ml-4 font-mono text-xs">
          <Link href="/pricing">
            {isUrgent ? "> UPGRADE_NOW" : "> VIEW_PLANS"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
