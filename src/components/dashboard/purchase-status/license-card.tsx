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
          <div className="rounded-none bg-muted p-6 font-mono text-sm dark:bg-muted">
            {licenseKey}
          </div>
          <Button
            variant="outline"
            onClick={onCopyLicense}
            className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          <p className="text-xs text-muted-foreground dark:text-muted-foreground">
            Keep this key safe. You&apos;ll need it for future updates and support.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
