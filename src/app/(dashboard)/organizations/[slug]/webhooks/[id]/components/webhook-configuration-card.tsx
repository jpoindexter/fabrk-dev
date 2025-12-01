/**
 * Webhook Configuration Card
 * Displays webhook URL, signing secret, and subscribed events
 */

"use client";

import * as React from "react";
import { Copy, Check, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { Webhook } from "./types";

interface WebhookConfigurationCardProps {
  webhook: Webhook;
}

export function WebhookConfigurationCard({ webhook }: WebhookConfigurationCardProps) {
  const [secretVisible, setSecretVisible] = React.useState(false);
  const [secretCopied, setSecretCopied] = React.useState(false);

  function copySecret() {
    if (webhook?.secret) {
      navigator.clipboard.writeText(webhook.secret);
      setSecretCopied(true);
      toast.success("Secret copied to clipboard");
      setTimeout(() => setSecretCopied(false), 2000);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
        <CardDescription>
          Webhook endpoint and signing secret
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Webhook URL</Label>
          <Input
            value={webhook.url}
            readOnly
            className="mt-2 font-mono text-sm"
          />
        </div>

        <div>
          <Label>Signing Secret</Label>
          <div className="flex gap-2 mt-2">
            <div className="relative flex-1">
              <Input
                value={webhook.secret}
                readOnly
                type={secretVisible ? "text" : "password"}
                className="font-mono text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setSecretVisible(!secretVisible)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {secretVisible ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            <Button onClick={copySecret} variant="outline" size="icon" aria-label={secretCopied ? "Copied" : "Copy secret"}>
              {secretCopied ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <Label>Subscribed Events ({webhook.events.length})</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {webhook.events.map((event) => (
              <Badge key={event} variant="secondary" className="font-mono text-xs">
                {event}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm font-medium">Status</p>
            <p className="text-sm text-muted-foreground">
              {webhook.enabled ? "Active" : "Disabled"}
            </p>
          </div>
          <Badge variant={webhook.enabled ? "default" : "secondary"}>
            {webhook.enabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
