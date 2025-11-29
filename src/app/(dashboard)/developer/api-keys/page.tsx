"use client";

/**
 * API Keys Management Page
 * Generate, view, and revoke API keys for programmatic access
 */

import { useState, useEffect } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  Key,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Code,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  permissions: string[];
  lastUsedAt: string | null;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
}

export default function ApiKeysPage() {
  const { success, error } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [isRevoking, setIsRevoking] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(["read"]);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [keyToRevoke, setKeyToRevoke] = useState<string | null>(null);

  // Fetch user's organization on mount
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch("/api/organizations");
        if (response.ok) {
          const data = await response.json();
          // Use the first organization (or implement org switcher for multi-org support)
          if (data.organizations && data.organizations.length > 0) {
            setOrganizationId(data.organizations[0].id);
          } else {
            error("No organization found", "Please create an organization first to use API keys.");
          }
        } else {
          error("Failed to load organization", "Please try again later");
        }
      } catch (err: unknown) {
        console.error("Error fetching organization:", err);
        error("Failed to load organization", "A network error occurred.");
      }
    };

    fetchOrganization();
  }, [error]);

  // Fetch API keys when organization is loaded
  useEffect(() => {
    if (organizationId) {
      fetchApiKeys();
    }
  }, [organizationId]);

  const fetchApiKeys = async () => {
    if (!organizationId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/api-keys?organizationId=${organizationId}`);
      if (response.ok) {
        const data = await response.json();
        setApiKeys(data);
      } else {
        const errorData = await response.json();
        error("Failed to load API keys", errorData.error || "Please try again later");
      }
    } catch (err: unknown) {
      console.error("Error fetching API keys:", err);
      error("Failed to load API keys", "A network error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKey = async () => {
    if (!organizationId) {
      error("Organization not loaded", "Please wait for organization data to load");
      return;
    }

    if (!newKeyName.trim()) {
      error("Name required", "Please enter a descriptive name for your API key");
      return;
    }

    if (selectedPermissions.length === 0) {
      error("Permissions required", "Please select at least one permission level for the API key");
      return;
    }

    setIsCreating(true);

    try {
      const response = await fetch("/api/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationId: organizationId,
          name: newKeyName,
          permissions: selectedPermissions,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCreatedKey(data.key); // Full key only shown once
        setNewKeyName("");
        setSelectedPermissions(["read"]);
        setIsDialogOpen(false);
        fetchApiKeys(); // Refresh list
        success("API key created", "Make sure to copy your new API key - you won't be able to see it again!");
      } else {
        const errorData = await response.json();
        error("Failed to create API key", errorData.error || "An error occurred while creating the API key. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Error creating API key:", err);
      error("Failed to create API key", "A network error occurred. Please check your connection and try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      success("Copied to clipboard", "API key has been copied to your clipboard");
    } catch (err: unknown) {
      console.error("Error copying to clipboard:", err);
      error("Failed to copy", "Please try copying manually");
    }
  };

  const confirmRevokeKey = async () => {
    if (!keyToRevoke) return;

    setIsRevoking(keyToRevoke);
    setRevokeDialogOpen(false);

    try {
      const response = await fetch(`/api/api-keys/${keyToRevoke}`, {
        method: "DELETE",
      });

      if (response.ok) {
        success("API key revoked", "The API key has been permanently revoked and can no longer be used");
        fetchApiKeys(); // Refresh list
      } else {
        const errorData = await response.json();
        error("Failed to revoke API key", errorData.error || "An error occurred while revoking the API key. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Error revoking API key:", err);
      error("Failed to revoke API key", "A network error occurred. Please check your connection and try again.");
    } finally {
      setIsRevoking(null);
      setKeyToRevoke(null);
    }
  };

  const toggleShowKey = (id: string) => {
    setShowKey({ ...showKey, [id]: !showKey[id] });
  };

  const maskKey = (keyPrefix: string) => {
    return `${keyPrefix}${"•".repeat(40)}`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  };

  const togglePermission = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const getPermissionBadgeVariant = (permission: string): "default" | "secondary" | "accent" | "outline" => {
    switch (permission) {
      case "read":
        return "default";
      case "write":
        return "secondary";
      case "admin":
        return "accent";
      default:
        return "outline";
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight mb-2">API Keys</h1>
            <p className="text-muted-foreground text-lg">
              Manage API keys for programmatic access to your account
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create API Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription>
                  Give your API key a descriptive name and select permissions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="keyName">API Key Name</Label>
                  <Input
                    id="keyName"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Production API, Mobile App, Testing"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="read"
                        checked={selectedPermissions.includes("read")}
                        onCheckedChange={() => togglePermission("read")}
                      />
                      <Label htmlFor="read" className="cursor-pointer">
                        Read - View organization data
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="write"
                        checked={selectedPermissions.includes("write")}
                        onCheckedChange={() => togglePermission("write")}
                      />
                      <Label htmlFor="write" className="cursor-pointer">
                        Write - Create and update resources
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="admin"
                        checked={selectedPermissions.includes("admin")}
                        onCheckedChange={() => togglePermission("admin")}
                      />
                      <Label htmlFor="admin" className="cursor-pointer text-destructive">
                        Admin - Full admin access (dangerous)
                      </Label>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCreateKey}
                  disabled={isCreating}
                  className="w-full"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create API Key"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Security Warning */}
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Keep your API keys secure!</strong> Never share your API keys or commit
          them to version control. Treat them like passwords.
        </AlertDescription>
      </Alert>

      {/* New Key Created Modal */}
      {createdKey && (
        <Alert className="mb-6 bg-success/10 border-success/20">
          <CheckCircle2 className="h-4 w-4 text-success" />
          <AlertDescription>
            <p className="font-semibold text-success mb-2">
              API Key Created Successfully!
            </p>
            <p className="text-sm mb-3">
              Make sure to copy your API key now. You won't be able to see it again!
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-2 bg-background rounded border border-border text-sm font-mono break-all">
                {createdKey}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopyKey(createdKey)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="link"
              size="sm"
              className="mt-2 h-auto p-0"
              onClick={() => setCreatedKey(null)}
            >
              I've saved my key
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* API Keys List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-4">
          {apiKeys.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <Key className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="font-semibold mb-1">No API keys yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create an API key to start making programmatic requests
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            apiKeys.map((apiKey) => (
              <Card key={apiKey.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-6">
                      <div className="p-3 rounded-lg bg-primary/10 border border-border">
                        <Key className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold">{apiKey.name}</h3>
                          {apiKey.permissions.map((permission) => (
                            <Badge
                              key={permission}
                              variant={getPermissionBadgeVariant(permission)}
                              className="text-xs"
                            >
                              {permission}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Created {formatDate(apiKey.createdAt)} by {apiKey.user.name || apiKey.user.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Last used {formatDate(apiKey.lastUsedAt)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setKeyToRevoke(apiKey.id);
                        setRevokeDialogOpen(true);
                      }}
                      disabled={isRevoking === apiKey.id}
                    >
                      {isRevoking === apiKey.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Revoking...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Revoke
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-2 bg-muted rounded border border-border text-sm font-mono">
                      {maskKey(apiKey.keyPrefix)}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyKey(apiKey.keyPrefix)}
                      title="Copy prefix"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Documentation */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle as="h2" className="text-lg flex items-center gap-2">
              <Code className="h-5 w-5" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Include your API key in the Authorization header:</p>
            <code className="block p-3 bg-muted rounded border border-border font-mono text-xs">
              Authorization: Bearer YOUR_API_KEY
            </code>
            <div className="pt-2">
              <p className="font-semibold mb-2">Example (cURL):</p>
              <code className="block p-3 bg-muted rounded border border-border font-mono text-xs whitespace-pre-wrap">
{`curl https://yourdomain.com/api/v1/organizations/${organizationId || "{org_id}"} \\
  -H "Authorization: Bearer sk_live_..."`}
              </code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle as="h2" className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Security Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="list-disc list-inside space-y-1">
              <li>Never commit API keys to version control</li>
              <li>Rotate keys regularly</li>
              <li>Use environment variables</li>
              <li>Revoke unused keys immediately</li>
              <li>Monitor API usage for anomalies</li>
              <li>Use read-only keys when possible</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Revoke API Key Dialog */}
      <AlertDialog open={revokeDialogOpen} onOpenChange={setRevokeDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke API Key?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently revoke the API key and immediately stop all API requests using this key.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRevokeKey}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Revoke API Key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
