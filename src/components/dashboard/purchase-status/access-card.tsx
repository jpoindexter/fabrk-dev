/**
 * ✅ FABRK COMPONENT
 * Access Card Component
 * Under 150 lines ✓
 * Production ready ✓
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
import { CheckCircle, Download, RefreshCw, XCircle } from "lucide-react";
import { AccessCardProps } from "./purchase-status-types";
export function AccessCard({
  hasAccess,
  onGenerateDownload,
  isGeneratingDownload,
}: AccessCardProps) {
  if (!hasAccess) {
    return (
      <TerminalCard tone="danger">
        <TerminalCardHeader code="0x01" title="NO_ACCESS" icon={<XCircle className="h-4 w-4" />} />
        <TerminalCardContent padding="md">
          <p className="text-muted-foreground dark:text-muted-foreground mb-4 text-sm">
            [STATUS]: Purchase required to access Fabrk boilerplate
          </p>
          <Button
            className="focus-visible:ring-ring w-full focus-visible:ring-2 focus-visible:outline-none"
            asChild
          >
            <a href="/pricing">&gt; VIEW_PRICING</a>
          </Button>
        </TerminalCardContent>
      </TerminalCard>
    );
  }

  return (
    <TerminalCard tone="success">
      <TerminalCardHeader
        code="0x01"
        title="ACCESS_GRANTED"
        icon={<CheckCircle className="h-4 w-4" />}
      />
      <TerminalCardContent padding="md" className="space-y-4">
        <div>
          <Badge variant="secondary" className="mb-2">
            COMPLETE_PACKAGE
          </Badge>
          <p className="text-muted-foreground dark:text-muted-foreground text-sm">
            [STATUS]: Lifetime access to all Fabrk components, templates, and updates
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
              &gt; GENERATING_DOWNLOAD_LINK...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              &gt; DOWNLOAD_FABRK
            </>
          )}
        </Button>
      </TerminalCardContent>
    </TerminalCard>
  );
}
