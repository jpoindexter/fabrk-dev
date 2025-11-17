/**
 * Organization Webhooks Page
 * View and manage webhooks for an organization
 */

"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Webhook,
  Plus,
  Loader2,
  Settings,
  Trash2,
  Power,
  PowerOff,
  TestTube,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface WebhookItem {
  id: string;
  url: string;
  events: string[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  deliveryCount: number;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  role: string;
}

export default function OrganizationWebhooksPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(true);
  const [organization, setOrganization] = React.useState<Organization | null>(null);
  const [webhooks, setWebhooks] = React.useState<WebhookItem[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [webhookToDelete, setWebhookToDelete] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchOrganization();
  }, [params.slug]);

  React.useEffect(() => {
    if (organization) {
      fetchWebhooks();
    }
  }, [organization]);

  async function fetchOrganization() {
    try {
      const response = await fetch(`/api/organizations/${params.slug}`);
      if (!response.ok) throw new Error("Failed to fetch organization");
      const data = await response.json();
      setOrganization(data);
    } catch (error: unknown) {
      console.error("Error fetching organization:", error);
      toast.error("Failed to load organization");
      router.push("/organizations");
    }
  }

  async function fetchWebhooks() {
    if (!organization) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/webhooks?organizationId=${organization.id}`);
      if (!response.ok) throw new Error("Failed to fetch webhooks");
      const data = await response.json();
      setWebhooks(data);
    } catch (error: unknown) {
      console.error("Error fetching webhooks:", error);
      toast.error("Failed to load webhooks");
    } finally {
      setLoading(false);
    }
  }

  async function toggleWebhook(webhookId: string, enabled: boolean) {
    try {
      const response = await fetch(`/api/webhooks/${webhookId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });

      if (!response.ok) throw new Error("Failed to update webhook");

      toast.success(enabled ? "Webhook enabled" : "Webhook disabled");
      fetchWebhooks();
    } catch (error: unknown) {
      console.error("Error toggling webhook:", error);
      toast.error("Failed to update webhook");
    }
  }

  async function confirmDeleteWebhook() {
    if (!webhookToDelete) return;

    setDeleteDialogOpen(false);

    try {
      const response = await fetch(`/api/webhooks/${webhookToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete webhook");

      toast.success("Webhook deleted successfully");
      fetchWebhooks();
    } catch (error: unknown) {
      console.error("Error deleting webhook:", error);
      toast.error("Failed to delete webhook");
    } finally {
      setWebhookToDelete(null);
    }
  }

  async function testWebhook(webhookId: string) {
    try {
      const response = await fetch(`/api/webhooks/${webhookId}/test`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to send test webhook");

      toast.success("Test webhook sent successfully");
    } catch (error: unknown) {
      console.error("Error testing webhook:", error);
      toast.error("Failed to send test webhook");
    }
  }

  const canManageWebhooks = organization?.role === "OWNER" || organization?.role === "ADMIN";

  if (loading && !organization) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">Webhooks</h1>
        <p className="text-muted-foreground mt-2">
          Configure webhooks to receive real-time event notifications
        </p>
      </div>

      {/* Header with Create Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Webhook className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {webhooks.length} / 5 webhooks
          </span>
        </div>

        {canManageWebhooks && (
          <Button
            onClick={() => router.push(`/organizations/${params.slug}/webhooks/new`)}
            disabled={webhooks.length >= 5}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Webhook
          </Button>
        )}
      </div>

      {/* Webhooks List */}
      {loading && organization ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : webhooks.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Webhook className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No webhooks configured</h3>
            <p className="text-muted-foreground mb-6">
              Create your first webhook to receive real-time event notifications
            </p>
            {canManageWebhooks && (
              <Button
                onClick={() => router.push(`/organizations/${params.slug}/webhooks/new`)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Webhook
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <Card key={webhook.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-base font-mono">
                        {webhook.url}
                      </CardTitle>
                      <Badge variant={webhook.enabled ? "default" : "secondary"}>
                        {webhook.enabled ? "Active" : "Disabled"}
                      </Badge>
                    </div>
                    <CardDescription>
                      {webhook.events.length} event{webhook.events.length !== 1 ? "s" : ""} • {webhook.deliveryCount} deliveries
                    </CardDescription>
                  </div>

                  {canManageWebhooks && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => testWebhook(webhook.id)}
                      >
                        <TestTube className="h-4 w-4 mr-2" />
                        Test
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleWebhook(webhook.id, !webhook.enabled)}
                      >
                        {webhook.enabled ? (
                          <>
                            <PowerOff className="h-4 w-4 mr-2" />
                            Disable
                          </>
                        ) : (
                          <>
                            <Power className="h-4 w-4 mr-2" />
                            Enable
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.push(`/organizations/${params.slug}/webhooks/${webhook.id}`)
                        }
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setWebhookToDelete(webhook.id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {webhook.events.map((event) => (
                    <Badge key={event} variant="secondary" className="font-mono text-xs">
                      {event}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Info Card */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>About Webhooks</CardTitle>
          <CardDescription>
            Webhooks allow you to receive real-time HTTP notifications when events occur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <strong className="text-foreground">Security:</strong> All webhook payloads
            are signed with HMAC-SHA256. Verify the signature using the{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              X-Webhook-Signature
            </code>{" "}
            header.
          </div>
          <div>
            <strong className="text-foreground">Retry Logic:</strong> Failed deliveries
            are automatically retried with exponential backoff (1min, 5min, 15min, 1hr,
            6hr) up to 5 attempts.
          </div>
          <div>
            <strong className="text-foreground">Limits:</strong> Maximum 5 webhooks per
            organization. Delivery timeout is 10 seconds.
          </div>
        </CardContent>
      </Card>

      {/* Delete Webhook Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Webhook?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the webhook and stop all event notifications to this URL.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteWebhook}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Webhook
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
