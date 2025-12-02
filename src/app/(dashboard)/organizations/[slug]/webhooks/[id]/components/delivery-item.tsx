/**
 * Delivery Item Component
 * Individual webhook delivery row with expandable details
 */

"use client";

import * as React from "react";
import { Loader2, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { Delivery } from "./types";
import { formatDate, getStatusIcon, getStatusBadge } from "./utils";

interface DeliveryItemProps {
  delivery: Delivery;
  expanded: boolean;
  retrying: boolean;
  onToggleExpand: () => void;
  onRetry: () => void;
}

export function DeliveryItem({
  delivery,
  expanded,
  retrying,
  onToggleExpand,
  onRetry,
}: DeliveryItemProps) {
  return (
    <div className="border rounded-none p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {getStatusIcon(delivery.status)}
          <div>
            <p className="font-mono text-sm font-medium">
              {delivery.event}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(delivery.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {getStatusBadge(delivery.status)}
          {delivery.statusCode && (
            <Badge variant="outline">
              {delivery.statusCode}
            </Badge>
          )}
          <Badge variant="outline">
            {delivery.attempts} attempt{delivery.attempts !== 1 ? "s" : ""}
          </Badge>
          {delivery.status === "failed" && delivery.attempts < 5 && (
            <Button
              size="sm"
              variant="outline"
              onClick={onRetry}
              disabled={retrying}
            >
              {retrying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </>
              )}
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={onToggleExpand}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="pt-4 space-y-4 border-t">
          <div>
            <Label className="text-xs">Payload</Label>
            <pre className="mt-2 p-4 bg-muted rounded text-xs overflow-x-auto">
              {JSON.stringify(delivery.payload, null, 2)}
            </pre>
          </div>

          {delivery.response && (
            <div>
              <Label className="text-xs">Response</Label>
              <pre className="mt-2 p-4 bg-muted rounded text-xs overflow-x-auto">
                {delivery.response}
              </pre>
            </div>
          )}

          {delivery.nextRetryAt && (
            <div>
              <Label className="text-xs">Next Retry</Label>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatDate(delivery.nextRetryAt)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
