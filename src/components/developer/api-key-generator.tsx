/**
 * ✅ FABRK COMPONENT
 * Component for generating/displaying API keys with visibility toggle.
 *
 * @example
 * ```tsx
 * <ApiKeyGenerator
 *   apiKey="sk_live_123456789"
 *   onGenerate={() => {}}
 *   onRevoke={() => {}}
 * />
 * ```
 */

"use client";

import * as React from "react";
import { Eye, EyeOff, Copy, Check, Key, RefreshCw, Trash2, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { logger } from "@/lib/logger";

interface ApiKeyGeneratorProps {
  apiKey?: string;
  prefix?: string;
  onGenerate?: () => void | Promise<void>;
  onRevoke?: () => void | Promise<void>;
  isGenerating?: boolean;
  createdAt?: Date;
  lastUsed?: Date;
  className?: string;
}

export function ApiKeyGenerator({
  apiKey,
  prefix = "sk_live_",
  onGenerate,
  onRevoke,
  isGenerating = false,
  createdAt,
  lastUsed,
  className,
}: ApiKeyGeneratorProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!apiKey) return;

    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err: unknown) {
      logger.error("Failed to copy API key", err);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const maskApiKey = (key: string) => {
    if (!key) return "";
    const visibleChars = 8;
    if (key.length <= visibleChars) return key;
    return `${key.slice(0, visibleChars)}${"•".repeat(Math.min(key.length - visibleChars, 32))}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-black flex items-center gap-2">
            <Key className="h-4 w-4 text-primary" />
            API Key
          </CardTitle>
          {apiKey && (
            <Badge variant="outline" className="font-medium text-xs">
              Active
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {apiKey ? (
          <>
            {/* API Key Display */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type={isVisible ? "text" : "password"}
                    value={isVisible ? apiKey : maskApiKey(apiKey)}
                    readOnly
                    className="pr-24 font-mono text-sm"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleVisibility}
                      className="h-7 w-7 p-0"
                      aria-label={isVisible ? "Hide API key" : "Show API key"}
                    >
                      {isVisible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-7 w-7 p-0"
                      aria-label="Copy API key"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                {createdAt && (
                  <div>
                    Created: <span className="font-medium">{formatDate(createdAt)}</span>
                  </div>
                )}
                {lastUsed && (
                  <div>
                    Last used: <span className="font-medium">{formatDate(lastUsed)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="rounded-brutal border-2 border-brutal bg-warning/10 p-3">
              <div className="flex gap-2">
                <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-bold text-foreground">Keep this secret!</p>
                  <p className="text-xs text-muted-foreground">
                    Never share your API key or commit it to version control. Anyone with this key
                    can access your account.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {onGenerate && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onGenerate}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  <RefreshCw className={cn("mr-2 h-4 w-4", isGenerating && "animate-spin")} />
                  Regenerate
                </Button>
              )}
              {onRevoke && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="flex-1">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Revoke
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Revoke API Key?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently revoke this API key. Any applications using this key
                        will stop working. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={onRevoke} className="bg-destructive">
                        Revoke Key
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </>
        ) : (
          <>
            {/* No API Key State */}
            <div className="py-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-brutal border-2 border-brutal bg-primary/10">
                  <Key className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-foreground">No API key generated</p>
                <p className="text-sm text-muted-foreground">
                  Generate an API key to start using the API
                </p>
              </div>
              {onGenerate && (
                <Button onClick={onGenerate} disabled={isGenerating}>
                  <Key className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate API Key"}
                </Button>
              )}
            </div>
          </>
        )}

        {/* Usage Example */}
        {apiKey && (
          <div className="space-y-2">
            <p className="text-xs font-bold text-foreground">Usage Example:</p>
            <div className="rounded-brutal border-2 border-brutal bg-muted/50 p-3 font-mono text-xs">
              <div className="text-muted-foreground">curl -H "Authorization: Bearer {prefix}..."</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
