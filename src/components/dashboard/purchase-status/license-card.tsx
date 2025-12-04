/**
 * ✅ FABRK COMPONENT
 * License Card Component
 * Under 150 lines ✓
 * Production ready ✓
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Key } from "lucide-react";
import { LicenseCardProps } from "./purchase-status-types";

import { mode } from "@/lib/design-system/visual-mode";
import { cn } from "@/lib/utils";
export function LicenseCard({ licenseKey, onCopyLicense, copiedLicense }: LicenseCardProps) {
  if (!licenseKey) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          License Key
        </CardTitle>
        <CardDescription>Your unique license key for Fabrk</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={cn("bg-muted dark:bg-muted p-6 text-sm", mode.font, mode.radius)}>
            {licenseKey}
          </div>
          <Button
            variant="outline"
            onClick={onCopyLicense}
            className="focus-visible:ring-ring w-full focus-visible:ring-2 focus-visible:outline-none"
          >
            {copiedLicense ? (
              <>✓ Copied to Clipboard</>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy License Key
              </>
            )}
          </Button>
          <p className="text-muted-foreground dark:text-muted-foreground text-xs">
            Keep this key safe. You&apos;ll need it for future updates and support.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
