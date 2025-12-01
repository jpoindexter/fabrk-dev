/**
 * Delivery History Card
 * Displays list of webhook deliveries with refresh functionality
 */

"use client";

import * as React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import type { Delivery } from "./types";
import { DeliveryItem } from "./delivery-item";

interface DeliveryHistoryCardProps {
  deliveries: Delivery[];
  webhookId: string;
  onRefresh: () => void;
}

export function DeliveryHistoryCard({
  deliveries,
  webhookId,
  onRefresh,
}: DeliveryHistoryCardProps) {
  const [expandedDelivery, setExpandedDelivery] = React.useState<string | null>(null);
  const [retrying, setRetrying] = React.useState<string | null>(null);

  async function retryDelivery(deliveryId: string) {
    try {
      setRetrying(deliveryId);
      const response = await fetch(`/api/webhooks/deliveries/${deliveryId}/retry`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to retry delivery");

      toast.success("Delivery retry initiated");
      setTimeout(onRefresh, 2000); // Refresh after 2 seconds
    } catch (error: unknown) {
      console.error("Error retrying delivery:", error);
      toast.error("Failed to retry delivery");
    } finally {
      setRetrying(null);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Delivery History</CardTitle>
            <CardDescription>
              Recent webhook deliveries (last 50)
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {deliveries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No deliveries yet
          </div>
        ) : (
          <div className="space-y-2">
            {deliveries.map((delivery) => (
              <DeliveryItem
                key={delivery.id}
                delivery={delivery}
                expanded={expandedDelivery === delivery.id}
                retrying={retrying === delivery.id}
                onToggleExpand={() =>
                  setExpandedDelivery(
                    expandedDelivery === delivery.id ? null : delivery.id
                  )
                }
                onRetry={() => retryDelivery(delivery.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
