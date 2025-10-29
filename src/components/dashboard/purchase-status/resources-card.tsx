/**
 * ✅ FABRK COMPONENT
 * Resources Card Component
 * Under 150 lines ✓
 * Production ready ✓
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tokens } from "@/lib/design-system/tokens";
import { ExternalLink, Github, MessageSquare, Package } from "lucide-react";
import { ResourcesCardProps } from "./purchase-status-types";

export function ResourcesCard({ hasAccess }: ResourcesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`flex items-center ${tokens.spacing.gap[2]}`}>
          <Package className={`${tokens.sizes.icon.md}`} />
          Resources & Support
        </CardTitle>
        <CardDescription>Everything you need to get started</CardDescription>
      </CardHeader>
      <CardContent className={`${tokens.spacing.space.y[4]}`}>
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
            <Github className={`mr-2 ${tokens.sizes.icon.sm}`} />
            GitHub Repository
            {hasAccess && <ExternalLink className={`ml-auto ${tokens.sizes.icon.sm}`} />}
          </a>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={!hasAccess}
          asChild
        >
          <a href="/docs" target="_blank" rel="noopener noreferrer">
            <Package className={`mr-2 ${tokens.sizes.icon.sm}`} />
            Documentation
            {hasAccess && <ExternalLink className={`ml-auto ${tokens.sizes.icon.sm}`} />}
          </a>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={!hasAccess}
          asChild
        >
          <a href="https://discord.gg/dNhq9kTEnu" target="_blank" rel="noopener noreferrer">
            <MessageSquare className={`mr-2 ${tokens.sizes.icon.sm}`} />
            Discord Community
            {hasAccess && <ExternalLink className={`ml-auto ${tokens.sizes.icon.sm}`} />}
          </a>
        </Button>

        {!hasAccess && (
          <p className={`${tokens.text.size.xs} text-muted-foreground dark:text-muted-foreground`}>
            Purchase Fabrk to unlock all resources
          </p>
        )}
      </CardContent>
    </Card>
  );
}
