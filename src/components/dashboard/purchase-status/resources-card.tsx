/**
 * ✅ FABRK COMPONENT
 * Resources Card Component
 * Under 150 lines ✓
 * Production ready ✓
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, MessageSquare, Package } from "lucide-react";
import { ResourcesCardProps } from "./purchase-status-types";

export function ResourcesCard({ hasAccess }: ResourcesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Resources & Support
        </CardTitle>
        <CardDescription>Everything you need to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="w-full justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={!hasAccess}
          asChild
        >
          <a
            href="https://github.com/fabrk/boilerplate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub Repository
            {hasAccess && <ExternalLink className="ml-auto h-4 w-4" />}
          </a>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={!hasAccess}
          asChild
        >
          <a href="/docs" target="_blank" rel="noopener noreferrer">
            <Package className="mr-2 h-4 w-4" />
            Documentation
            {hasAccess && <ExternalLink className="ml-auto h-4 w-4" />}
          </a>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={!hasAccess}
          asChild
        >
          <a href="https://discord.gg/dNhq9kTEnu" target="_blank" rel="noopener noreferrer">
            <MessageSquare className="mr-2 h-4 w-4" />
            Discord Community
            {hasAccess && <ExternalLink className="ml-auto h-4 w-4" />}
          </a>
        </Button>

        {!hasAccess && (
          <p className="text-xs text-muted-foreground dark:text-muted-foreground">
            Purchase Fabrk to unlock all resources
          </p>
        )}
      </CardContent>
    </Card>
  );
}
