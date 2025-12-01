/**
 * Webhook Detail Page
 * View webhook configuration and delivery history
 */

"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  Loader2,
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
  organization: {
    id: string;
    name: string;
  };
  deliveryCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Delivery {
  id: string;
  event: string;
  payload: Record<string, unknown>;
  status: string;
  statusCode: number | null;
  response: string | null;
  attempts: number;
  nextRetryAt: string | null;
  createdAt: string;
}

export default function WebhookDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(true);
  const [webhook, setWebhook] = React.useState<Webhook | null>(null);
  const [deliveries, setDeliveries] = React.useState<Delivery[]>([]);
  const [secretVisible, setSecretVisible] = React.useState(false);
  const [secretCopied, setSecretCopied] = React.useState(false);
  const [expandedDelivery, setExpandedDelivery] = React.useState<string | null>(null);
  const [retrying, setRetrying] = React.useState<string | null>(null);

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

  async function retryDelivery(deliveryId: string) {
    try {
      setRetrying(deliveryId);
      const response = await fetch(`/api/webhooks/deliveries/${deliveryId}/retry`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to retry delivery");

      toast.success("Delivery retry initiated");
      setTimeout(fetchDeliveries, 2000); // Refresh after 2 seconds
    } catch (error: unknown) {
      console.error("Error retrying delivery:", error);
      toast.error("Failed to retry delivery");
    } finally {
      setRetrying(null);
    }
  }

  function copySecret() {
    if (webhook?.secret) {
      navigator.clipboard.writeText(webhook.secret);
      setSecretCopied(true);
      toast.success("Secret copied to clipboard");
      setTimeout(() => setSecretCopied(false), 2000);
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return null;
    }
  }

  function getStatusBadge(status: string) {
    const variants: Record<string, "default" | "accent" | "secondary"> = {
      success: "default",
      failed: "accent",
      pending: "secondary",
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {status}
      </Badge>
    );
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
        {/* Configuration Card */}
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

        {/* Delivery History Card */}
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
                onClick={fetchDeliveries}
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
                  <div
                    key={delivery.id}
                    className="border rounded-none p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
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
                            onClick={() => retryDelivery(delivery.id)}
                            disabled={retrying === delivery.id}
                          >
                            {retrying === delivery.id ? (
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
                          onClick={() =>
                            setExpandedDelivery(
                              expandedDelivery === delivery.id ? null : delivery.id
                            )
                          }
                        >
                          {expandedDelivery === delivery.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {expandedDelivery === delivery.id && (
                      <div className="pt-4 space-y-4 border-t">
                        <div>
                          <Label className="text-xs">Payload</Label>
                          <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-x-auto">
                            {JSON.stringify(delivery.payload, null, 2)}
                          </pre>
                        </div>

                        {delivery.response && (
                          <div>
                            <Label className="text-xs">Response</Label>
                            <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-x-auto">
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
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
