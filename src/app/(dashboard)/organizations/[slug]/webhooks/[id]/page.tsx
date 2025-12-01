/**
 * Webhook Detail Page
 * View webhook configuration and delivery history
 */

"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Webhook, Delivery } from "./components/types";
import { WebhookConfigurationCard } from "./components/webhook-configuration-card";
import { DeliveryHistoryCard } from "./components/delivery-history-card";

export default function WebhookDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(true);
  const [webhook, setWebhook] = React.useState<Webhook | null>(null);
  const [deliveries, setDeliveries] = React.useState<Delivery[]>([]);

  React.useEffect(() => {
    fetchWebhook();
    fetchDeliveries();
  }, [params.id]);

  async function fetchWebhook() {
    try {
      const response = await fetch(`/api/webhooks/${params.id}`);
      if (!response.ok) throw new Error("Failed to fetch webhook");
      const data = await response.json();
      setWebhook(data);
    } catch (error: unknown) {
      console.error("Error fetching webhook:", error);
      toast.error("Failed to load webhook");
      router.back();
    } finally {
      setLoading(false);
    }
  }

  async function fetchDeliveries() {
    try {
      const response = await fetch(`/api/webhooks/${params.id}/deliveries?limit=50`);
      if (!response.ok) throw new Error("Failed to fetch deliveries");
      const data = await response.json();
      setDeliveries(data.deliveries);
    } catch (error: unknown) {
      console.error("Error fetching deliveries:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!webhook) {
    return null;
  }

  return (
    <div className="container py-8 max-w-6xl">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">Webhook Details</h1>
        <p className="text-muted-foreground mt-2 font-mono text-sm">
          {webhook.url}
        </p>
      </div>

      <div className="space-y-6">
        <WebhookConfigurationCard webhook={webhook} />
        <DeliveryHistoryCard
          deliveries={deliveries}
          webhookId={params.id as string}
          onRefresh={fetchDeliveries}
        />
      </div>
    </div>
  );
}
