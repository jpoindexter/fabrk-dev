"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LicenseInfo {
  key: string;
  type: string;
  status: "active" | "expired" | "suspended";
  purchaseDate: string;
  expiresAt?: string;
}

export function LicenseSection() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Placeholder license data - replace with actual data from your backend
  const licenseInfo: LicenseInfo | null = {
    key: "XXXX-XXXX-XXXX-XXXX",
    type: "Pro License",
    status: "active",
    purchaseDate: "2024-01-15",
    expiresAt: "2025-01-15",
  };

  // Set to null to show "no license" state
  // const licenseInfo: LicenseInfo | null = null;

  async function handleCopyKey() {
    if (!licenseInfo?.key) return;

    try {
      await navigator.clipboard.writeText(licenseInfo.key);
      setCopied(true);

      toast({
        title: "License key copied",
        description: "Your license key has been copied to clipboard.",
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
      });
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "expired":
        return "secondary";
      case "suspended":
        return "outline";
      default:
        return "outline";
    }
  };

  if (!licenseInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>License Key</CardTitle>
          <CardDescription>
            Your license key will appear here after purchase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              No license key found. Purchase a license to unlock premium features.
            </p>
            <Button variant="outline">View Plans</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>License Key</CardTitle>
        <CardDescription>
          Your license information and activation key.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">License Type</p>
              <p className="text-lg font-semibold">{licenseInfo.type}</p>
            </div>
            <Badge variant={getStatusBadgeVariant(licenseInfo.status)}>
              {licenseInfo.status.charAt(0).toUpperCase() +
                licenseInfo.status.slice(1)}
            </Badge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="license-key">License Key</Label>
            <div className="flex gap-2">
              <Input
                id="license-key"
                value={licenseInfo.key}
                readOnly
                className="font-mono"
              />
              <Button
                onClick={handleCopyKey}
                variant="outline"
                className="shrink-0"
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Purchased on</span>
              <span className="font-medium">{licenseInfo.purchaseDate}</span>
            </div>
            {licenseInfo.expiresAt && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expires on</span>
                <span className="font-medium">{licenseInfo.expiresAt}</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <p className="text-xs text-muted-foreground">
              Keep your license key secure. You'll need it to activate premium
              features across your projects.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
