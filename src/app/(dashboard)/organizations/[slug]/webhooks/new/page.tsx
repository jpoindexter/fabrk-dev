/**
 * Create Webhook Page
 * Form to create a new webhook
 */

"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, Loader2, Copy, Check, Eye, EyeOff } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { getAllEvents, EVENT_CATEGORIES, EVENT_DESCRIPTIONS } from "@/lib/webhooks/events";

interface Organization {
  id: string;
  name: string;
  slug: string;
}

export default function CreateWebhookPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(true);
  const [creating, setCreating] = React.useState(false);
  const [organization, setOrganization] = React.useState<Organization | null>(null);
  const [url, setUrl] = React.useState("");
  const [selectedEvents, setSelectedEvents] = React.useState<string[]>([]);
  const [createdSecret, setCreatedSecret] = React.useState<string | null>(null);
  const [secretVisible, setSecretVisible] = React.useState(false);
  const [secretCopied, setSecretCopied] = React.useState(false);

  React.useEffect(() => {
    fetchOrganization();
  }, [params.slug]);

  async function fetchOrganization() {
    try {
      const response = await fetch(`/api/organizations/${params.slug}`);
      if (!response.ok) throw new Error("Failed to fetch organization");
      const data = await response.json();
      setOrganization(data);
    } catch (error) {
      console.error("Error fetching organization:", error);
      toast.error("Failed to load organization");
      router.push("/organizations");
    } finally {
      setLoading(false);
    }
  }

  async function createWebhook(e: React.FormEvent) {
    e.preventDefault();

    if (!organization) return;

    if (!url) {
      toast.error("Please enter a webhook URL");
      return;
    }

    if (selectedEvents.length === 0) {
      toast.error("Please select at least one event");
      return;
    }

    try {
      setCreating(true);

      const response = await fetch("/api/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationId: organization.id,
          url,
          events: selectedEvents,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create webhook");
      }

      const data = await response.json();

      // Show the secret
      setCreatedSecret(data.secret);
      toast.success("Webhook created successfully");
    } catch (error: any) {
      console.error("Error creating webhook:", error);
      toast.error(error.message || "Failed to create webhook");
    } finally {
      setCreating(false);
    }
  }

  function toggleEvent(event: string) {
    setSelectedEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
  }

  function selectAllEvents(category: keyof typeof EVENT_CATEGORIES) {
    const categoryEvents = EVENT_CATEGORIES[category];
    const allSelected = categoryEvents.every((event) => selectedEvents.includes(event));

    if (allSelected) {
      setSelectedEvents((prev) => prev.filter((e) => !(categoryEvents as readonly string[]).includes(e)));
    } else {
      setSelectedEvents((prev) => [...new Set([...prev, ...categoryEvents])]);
    }
  }

  function copySecret() {
    if (createdSecret) {
      navigator.clipboard.writeText(createdSecret);
      setSecretCopied(true);
      toast.success("Secret copied to clipboard");
      setTimeout(() => setSecretCopied(false), 2000);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Show success screen with secret
  if (createdSecret) {
    return (
      <div className="container py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Webhook Created Successfully</CardTitle>
            <CardDescription>
              Save your webhook secret now. You won't be able to see it again.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Webhook Secret</Label>
              <div className="flex gap-2 mt-2">
                <div className="relative flex-1">
                  <Input
                    value={createdSecret}
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
                <Button onClick={copySecret} variant="outline" size="icon">
                  {secretCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Use this secret to verify webhook signatures using HMAC-SHA256
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Signature Verification Example</p>
              <pre className="text-xs overflow-x-auto">
                {`const crypto = require('crypto');

const signature = req.headers['x-webhook-signature'];
const payload = JSON.stringify(req.body);
const secret = '${createdSecret}';

const expected = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

if (signature === expected) {
  // Valid webhook
}`}
              </pre>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => router.push(`/organizations/${params.slug}/webhooks`)}
                className="flex-1"
              >
                Done
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show create form
  return (
    <div className="container py-8 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">Create Webhook</h1>
        <p className="text-muted-foreground mt-2">
          Configure a new webhook endpoint for {organization?.name}
        </p>
      </div>

      <form onSubmit={createWebhook}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Configuration</CardTitle>
              <CardDescription>
                Specify the URL where webhook events should be sent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="url">Webhook URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/webhooks"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Must be HTTPS in production. Requests timeout after 10 seconds.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Subscriptions</CardTitle>
              <CardDescription>
                Choose which events to subscribe to
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(EVENT_CATEGORIES).map(([category, events]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium capitalize">{category}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => selectAllEvents(category as any)}
                    >
                      {events.every((e) => selectedEvents.includes(e))
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {events.map((event) => (
                      <div key={event} className="flex items-start space-x-3">
                        <Checkbox
                          id={event}
                          checked={selectedEvents.includes(event)}
                          onCheckedChange={() => toggleEvent(event)}
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={event}
                            className="text-sm font-medium cursor-pointer"
                          >
                            {event}
                          </label>
                          <p className="text-xs text-muted-foreground">
                            {EVENT_DESCRIPTIONS[event as keyof typeof EVENT_DESCRIPTIONS]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={creating} className="flex-1">
              {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Webhook
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
