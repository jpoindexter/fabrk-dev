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
import { CheckCircle, Download, RefreshCw } from "lucide-react";
import { AccessCardProps } from "./purchase-status-types";

import { mode } from "@/lib/design-system/visual-mode";
import { cn } from "@/lib/utils";
export function AccessCard({
  hasAccess,
  onGenerateDownload,
  isGeneratingDownload,
}: AccessCardProps) {
  if (!hasAccess) {
    return (
      <Card className="border-destructive dark:border-destructive">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2`}>
            <div className={cn("bg-destructive dark:bg-destructive size-2", mode.radius)} />
            No Access
          </CardTitle>
          <CardDescription>Purchase required to access Fabrk</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground dark:text-muted-foreground mb-4 text-sm">
            You don&apos;t have access to the Fabrk boilerplate yet.
          </p>
          <Button
            className="focus-visible:ring-ring w-full focus-visible:ring-2 focus-visible:outline-none"
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
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="text-primary dark:text-primary h-5 w-5" />
          Access Granted
        </CardTitle>
        <CardDescription>Full access to Fabrk AI Boilerplate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Badge variant="secondary" className="mb-2">
            Complete Package
          </Badge>
          <p className="text-muted-foreground dark:text-muted-foreground text-sm">
            You have lifetime access to all Fabrk components, templates, and updates.
          </p>
        </div>
        <Button
          onClick={onGenerateDownload}
          disabled={isGeneratingDownload}
          className="focus-visible:ring-ring w-full focus-visible:ring-2 focus-visible:outline-none"
        >
          {isGeneratingDownload ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating Download Link...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Fabrk
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
