/**
 * ✅ FABRK COMPONENT
 * Access Card Component
 * Under 150 lines ✓
 * Production ready ✓
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tokens } from "@/lib/design-system/tokens";
import { CheckCircle, Download, RefreshCw } from "lucide-react";
import { AccessCardProps } from "./purchase-status-types";

export function AccessCard({
  hasAccess,
  onGenerateDownload,
  isGeneratingDownload,
}: AccessCardProps) {
  if (!hasAccess) {
    return (
      <Card className="border-destructive dark:border-destructive">
        <CardHeader>
          <CardTitle className={`flex items-center ${tokens.spacing.gap[2]}`}>
            <div className="size-2 rounded-full bg-destructive dark:bg-destructive" />
            No Access
          </CardTitle>
          <CardDescription>Purchase required to access Fabrk</CardDescription>
        </CardHeader>
        <CardContent>
          <p
            className={`mb-4 ${tokens.text.size.sm} text-muted-foreground dark:text-muted-foreground`}
          >
            You don&apos;t have access to the Fabrk boilerplate yet.
          </p>
          <Button
            className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            asChild
          >
            <a href="/pricing">View Pricing</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary dark:border-primary">
      <CardHeader>
        <CardTitle className={`flex items-center ${tokens.spacing.gap[2]}`}>
          <CheckCircle className={`${tokens.sizes.icon.md} text-primary dark:text-primary`} />
          Access Granted
        </CardTitle>
        <CardDescription>Full access to Fabrk AI Boilerplate</CardDescription>
      </CardHeader>
      <CardContent className={`${tokens.spacing.space.y[4]}`}>
        <div>
          <Badge variant="secondary" className="mb-2">
            Complete Package
          </Badge>
          <p className={`${tokens.text.size.sm} text-muted-foreground dark:text-muted-foreground`}>
            You have lifetime access to all Fabrk components, templates, and updates.
          </p>
        </div>
        <Button
          onClick={onGenerateDownload}
          disabled={isGeneratingDownload}
          className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {isGeneratingDownload ? (
            <>
              <RefreshCw className={`mr-2 ${tokens.sizes.icon.sm} animate-spin`} />
              Generating Download Link...
            </>
          ) : (
            <>
              <Download className={`mr-2 ${tokens.sizes.icon.sm}`} />
              Download Fabrk
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
