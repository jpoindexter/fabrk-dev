"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Webhook,
  Plus,
  MoreVertical,
  Check,
  X,
  Clock,
  AlertCircle,
  Send,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Activity,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

type WebhookStatus = "active" | "inactive";
type EventType = "user.created" | "user.updated" | "payment.succeeded" | "payment.failed" | "subscription.created" | "subscription.cancelled";

interface WebhookEndpoint {
  id: string;
  url: string;
  description: string;
  secret: string;
  events: EventType[];
  status: WebhookStatus;
  createdAt: Date;
  lastTriggered?: Date;
  successRate: number;
}

interface WebhookLog {
  id: string;
  endpointId: string;
  event: EventType;
  status: "success" | "failed" | "pending";
  statusCode?: number;
  responseTime?: number;
  timestamp: Date;
  payload: Record<string, any>;
  response?: string;
  error?: string;
}

const mockEndpoints: WebhookEndpoint[] = [
  {
    id: "wh_1",
    url: "https://api.myapp.com/webhooks/fabrk",
    description: "Production webhook for user events",
    secret: "whsec_3K8dJ2kL9mN4pQ5rS6tU7vW8xY9zA1bC2dE3f",
    events: ["user.created", "user.updated", "payment.succeeded"],
    status: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    lastTriggered: new Date(Date.now() - 1000 * 60 * 15),
    successRate: 98.5,
  },
  {
    id: "wh_2",
    url: "https://staging.myapp.com/webhooks/fabrk",
    description: "Staging environment webhook",
    secret: "whsec_4L9eK3mM0nN5qR6sT7uV8wX9yZ0aB1cD2eF3g",
    events: ["payment.succeeded", "payment.failed"],
    status: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    lastTriggered: new Date(Date.now() - 1000 * 60 * 60 * 2),
    successRate: 100,
  },
  {
    id: "wh_3",
    url: "https://old.myapp.com/webhooks",
    description: "Legacy webhook (deprecated)",
    secret: "whsec_5M0fL4nN1oO6rS7tU8vW9xY0zA1bC2dE3fG4h",
    events: ["subscription.created", "subscription.cancelled"],
    status: "inactive",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
    successRate: 85.3,
  },
];

const mockLogs: WebhookLog[] = [
  {
    id: "log_1",
    endpointId: "wh_1",
    event: "user.created",
    status: "success",
    statusCode: 200,
    responseTime: 145,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    payload: { userId: "user_123", email: "newuser@example.com", name: "New User" },
    response: '{"received": true}',
  },
  {
    id: "log_2",
    endpointId: "wh_1",
    event: "payment.succeeded",
    status: "success",
    statusCode: 200,
    responseTime: 98,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    payload: { paymentId: "pay_456", amount: 4900, currency: "usd" },
    response: '{"received": true}',
  },
  {
    id: "log_3",
    endpointId: "wh_2",
    event: "payment.failed",
    status: "failed",
    statusCode: 500,
    responseTime: 1523,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    payload: { paymentId: "pay_789", error: "card_declined" },
    error: "Internal Server Error",
  },
  {
    id: "log_4",
    endpointId: "wh_1",
    event: "user.updated",
    status: "success",
    statusCode: 200,
    responseTime: 112,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    payload: { userId: "user_123", updates: { name: "Updated Name" } },
    response: '{"received": true}',
  },
  {
    id: "log_5",
    endpointId: "wh_2",
    event: "payment.succeeded",
    status: "pending",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    payload: { paymentId: "pay_999", amount: 9900, currency: "usd" },
  },
];

const allEventTypes: EventType[] = [
  "user.created",
  "user.updated",
  "payment.succeeded",
  "payment.failed",
  "subscription.created",
  "subscription.cancelled",
];

export default function WebhooksPage() {
  const [endpoints, setEndpoints] = useState<WebhookEndpoint[]>(mockEndpoints);
  const [logs, setLogs] = useState<WebhookLog[]>(mockLogs);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<WebhookEndpoint | null>(null);
  const [selectedLog, setSelectedLog] = useState<WebhookLog | null>(null);
  const [endpointToDelete, setEndpointToDelete] = useState<WebhookEndpoint | null>(null);
  const [showSecret, setShowSecret] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Create endpoint form state
  const [newEndpoint, setNewEndpoint] = useState({
    url: "",
    description: "",
    events: [] as EventType[],
  });

  // Test webhook state
  const [testEvent, setTestEvent] = useState<EventType>("user.created");
  const [testPayload, setTestPayload] = useState('{\n  "userId": "user_test_123",\n  "email": "test@example.com"\n}');

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const maskSecret = (secret: string) => {
    return `${secret.substring(0, 12)}${"•".repeat(20)}`;
  };

  const generateSecret = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let secret = "whsec_";
    for (let i = 0; i < 40; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  };

  const handleCreateEndpoint = async () => {
    if (!newEndpoint.url || newEndpoint.events.length === 0) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const endpoint: WebhookEndpoint = {
      id: `wh_${Date.now()}`,
      url: newEndpoint.url,
      description: newEndpoint.description,
      secret: generateSecret(),
      events: newEndpoint.events,
      status: "active",
      createdAt: new Date(),
      successRate: 100,
    };

    setEndpoints([endpoint, ...endpoints]);
    setNewEndpoint({ url: "", description: "", events: [] });
    setIsCreateDialogOpen(false);
    setIsLoading(false);
  };

  const handleToggleStatus = (endpointId: string) => {
    setEndpoints(
      endpoints.map((ep) =>
        ep.id === endpointId
          ? { ...ep, status: ep.status === "active" ? "inactive" : "active" }
          : ep
      )
    );
  };

  const handleDeleteEndpoint = () => {
    if (!endpointToDelete) return;
    setEndpoints(endpoints.filter((ep) => ep.id !== endpointToDelete.id));
    setEndpointToDelete(null);
  };

  const handleTestWebhook = async () => {
    if (!selectedEndpoint) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newLog: WebhookLog = {
      id: `log_${Date.now()}`,
      endpointId: selectedEndpoint.id,
      event: testEvent,
      status: "success",
      statusCode: 200,
      responseTime: Math.floor(Math.random() * 300) + 50,
      timestamp: new Date(),
      payload: JSON.parse(testPayload),
      response: '{"received": true, "test": true}',
    };

    setLogs([newLog, ...logs]);
    setIsTestDialogOpen(false);
    setSelectedEndpoint(null);
    setIsLoading(false);
  };

  const handleRetryWebhook = async (logId: string) => {
    // Simulate retry
    alert(`Retrying webhook delivery for log ${logId}`);
  };

  const handleCopySecret = (secret: string) => {
    navigator.clipboard.writeText(secret);
  };

  const handleEventToggle = (event: EventType) => {
    setNewEndpoint({
      ...newEndpoint,
      events: newEndpoint.events.includes(event)
        ? newEndpoint.events.filter((e) => e !== event)
        : [...newEndpoint.events, event],
    });
  };

  const getStatusBadge = (status: WebhookStatus) => {
    return status === "active" ? (
      <Badge variant="default" className="gap-1">
        <Check className="h-3 w-3" />
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="gap-1">
        <X className="h-3 w-3" />
        Inactive
      </Badge>
    );
  };

  const getLogStatusBadge = (status: "success" | "failed" | "pending") => {
    switch (status) {
      case "success":
        return (
          <Badge variant="default" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Success
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Webhook className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Webhooks</h1>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Endpoint
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Webhook Endpoint</DialogTitle>
                <DialogDescription>
                  Configure a new webhook endpoint to receive event notifications
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Endpoint URL *</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://api.myapp.com/webhooks"
                    value={newEndpoint.url}
                    onChange={(e) => setNewEndpoint({ ...newEndpoint, url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Production webhook endpoint"
                    value={newEndpoint.description}
                    onChange={(e) =>
                      setNewEndpoint({ ...newEndpoint, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Events to Subscribe *</Label>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {allEventTypes.map((event) => (
                      <div key={event} className="flex items-center space-x-2">
                        <Checkbox
                          id={event}
                          checked={newEndpoint.events.includes(event)}
                          onCheckedChange={() => handleEventToggle(event)}
                        />
                        <Label htmlFor={event} className="cursor-pointer text-sm font-normal">
                          {event}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-accent/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> A signing secret will be automatically generated for
                    this endpoint. Use it to verify webhook signatures.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateEndpoint}
                  disabled={!newEndpoint.url || newEndpoint.events.length === 0 || isLoading}
                >
                  {isLoading ? "Creating..." : "Create Endpoint"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">
          Configure and monitor webhook endpoints for real-time event notifications
        </p>
      </div>

      <Tabs defaultValue="endpoints" className="space-y-6">
        <TabsList>
          <TabsTrigger value="endpoints">
            <Webhook className="h-4 w-4 mr-2" />
            Endpoints ({endpoints.length})
          </TabsTrigger>
          <TabsTrigger value="logs">
            <Activity className="h-4 w-4 mr-2" />
            Recent Deliveries ({logs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          {endpoints.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Webhook className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No webhook endpoints</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first webhook endpoint to start receiving events
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Endpoint
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {endpoints.map((endpoint) => (
                <Card key={endpoint.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{endpoint.url}</CardTitle>
                          {getStatusBadge(endpoint.status)}
                        </div>
                        {endpoint.description && (
                          <CardDescription>{endpoint.description}</CardDescription>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedEndpoint(endpoint);
                              setIsTestDialogOpen(true);
                            }}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Test Endpoint
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(endpoint.id)}>
                            {endpoint.status === "active" ? (
                              <>
                                <X className="h-4 w-4 mr-2" />
                                Disable
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Enable
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setEndpointToDelete(endpoint)}
                            className="text-destructive"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Delete Endpoint
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
                        <div className="text-2xl font-bold">{endpoint.successRate}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Created</div>
                        <div className="text-sm">{formatDate(endpoint.createdAt)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Last Triggered</div>
                        <div className="text-sm">
                          {endpoint.lastTriggered
                            ? formatTimeAgo(endpoint.lastTriggered)
                            : "Never"}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Signing Secret</div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-sm bg-accent px-3 py-2 rounded font-mono">
                          {showSecret[endpoint.id]
                            ? endpoint.secret
                            : maskSecret(endpoint.secret)}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setShowSecret({ ...showSecret, [endpoint.id]: !showSecret[endpoint.id] })
                          }
                        >
                          {showSecret[endpoint.id] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopySecret(endpoint.secret)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Subscribed Events</div>
                      <div className="flex flex-wrap gap-2">
                        {endpoint.events.map((event) => (
                          <Badge key={event} variant="secondary">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Card className="bg-accent/30">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Webhook Security
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Always verify webhook signatures using the signing secret</p>
              <p>• Use HTTPS endpoints only to ensure secure delivery</p>
              <p>• Respond with 2xx status code within 5 seconds to avoid retries</p>
              <p>• Failed deliveries will be retried up to 3 times with exponential backoff</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          {logs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No webhook deliveries yet</h3>
                <p className="text-muted-foreground">
                  Delivery logs will appear here once events are triggered
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Recent Deliveries</CardTitle>
                <CardDescription>Webhook delivery attempts and their results</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Response Time</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => {
                      const endpoint = endpoints.find((ep) => ep.id === log.endpointId);

                      return (
                        <TableRow key={log.id}>
                          <TableCell>
                            <Badge variant="outline">{log.event}</Badge>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {endpoint?.url || "Unknown"}
                          </TableCell>
                          <TableCell>{getLogStatusBadge(log.status)}</TableCell>
                          <TableCell>
                            {log.responseTime ? (
                              <span className="text-sm text-muted-foreground">
                                {log.responseTime}ms
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatTimeAgo(log.timestamp)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedLog(log)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {log.status === "failed" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRetryWebhook(log.id)}
                                >
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Test Webhook Dialog */}
      <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Test Webhook Endpoint</DialogTitle>
            <DialogDescription>
              Send a test event to {selectedEndpoint?.url}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="test-event">Event Type</Label>
              <Select value={testEvent} onValueChange={(v) => setTestEvent(v as EventType)}>
                <SelectTrigger id="test-event">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allEventTypes.map((event) => (
                    <SelectItem key={event} value={event}>
                      {event}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="test-payload">Test Payload (JSON)</Label>
              <Textarea
                id="test-payload"
                value={testPayload}
                onChange={(e) => setTestPayload(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsTestDialogOpen(false);
                setSelectedEndpoint(null);
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleTestWebhook} disabled={isLoading}>
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "Sending..." : "Send Test Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Log Details Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Webhook Delivery Details</DialogTitle>
            <DialogDescription>Event: {selectedLog?.event}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-1">Status</div>
                {selectedLog && getLogStatusBadge(selectedLog.status)}
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Status Code</div>
                <div className="text-sm">{selectedLog?.statusCode || "N/A"}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Response Time</div>
                <div className="text-sm">{selectedLog?.responseTime ? `${selectedLog.responseTime}ms` : "N/A"}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Timestamp</div>
                <div className="text-sm">
                  {selectedLog ? formatDate(selectedLog.timestamp) : ""}
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Payload</div>
              <pre className="bg-accent p-3 rounded text-xs overflow-auto max-h-[200px]">
                {JSON.stringify(selectedLog?.payload, null, 2)}
              </pre>
            </div>

            {selectedLog?.response && (
              <div>
                <div className="text-sm font-medium mb-2">Response</div>
                <pre className="bg-accent p-3 rounded text-xs overflow-auto max-h-[200px]">
                  {selectedLog.response}
                </pre>
              </div>
            )}

            {selectedLog?.error && (
              <div>
                <div className="text-sm font-medium mb-2">Error</div>
                <div className="bg-destructive/10 text-destructive p-3 rounded text-sm">
                  {selectedLog.error}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedLog(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Endpoint Confirmation */}
      <AlertDialog open={!!endpointToDelete} onOpenChange={() => setEndpointToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Webhook Endpoint</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this webhook endpoint? This action cannot be undone
              and you will stop receiving events at this URL.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEndpoint} className="bg-destructive">
              Delete Endpoint
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
