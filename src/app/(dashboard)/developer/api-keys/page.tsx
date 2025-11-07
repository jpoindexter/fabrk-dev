"use client";

/**
 * API Keys Management Page
 * Generate, view, and revoke API keys for programmatic access
 */

import { useState } from "react";
import Link from "next/link";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  lastUsed: Date | null;
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Production API",
      key: "sk_live_1234567890abcdef",
      createdAt: new Date("2024-01-15"),
      lastUsed: new Date("2024-11-05"),
    },
  ]);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      alert("Please enter a name for your API key");
      return;
    }

    setIsCreating(true);

    // TODO: Call API to generate key
    // In real implementation, this would be a cryptographically secure random string
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

    const apiKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: newKey,
      createdAt: new Date(),
      lastUsed: null,
    };

    setApiKeys([...apiKeys, apiKey]);
    setCreatedKey(newKey);
    setNewKeyName("");
    setIsCreating(false);
  };

  const handleCopyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
    alert("API key copied to clipboard!");
  };

  const handleRevokeKey = async (id: string) => {
    if (
      confirm(
        "Are you sure you want to revoke this API key? This action cannot be undone and will immediately stop all API requests using this key."
      )
    ) {
      // TODO: Call API to revoke key
      setApiKeys(apiKeys.filter((k) => k.id !== id));
    }
  };

  const toggleShowKey = (id: string) => {
    setShowKey({ ...showKey, [id]: !showKey[id] });
  };

  const maskKey = (key: string) => {
    return `${key.substring(0, 12)}${"•".repeat(20)}`;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Never";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">API Keys</h1>
            <p className="text-muted-foreground text-lg">
              Manage API keys for programmatic access to your account
            </p>
          </div>

          <Dialog>
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
                  Give your API key a descriptive name to help identify its purpose
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
                <Button
                  onClick={handleCreateKey}
                  disabled={isCreating}
                  className="w-full"
                >
                  {isCreating ? "Creating..." : "Create API Key"}
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
        <Alert className="mb-6 bg-green-500/10 border-green-500/20">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription>
            <p className="font-semibold text-green-600 mb-2">
              API Key Created Successfully!
            </p>
            <p className="text-sm mb-3">
              Make sure to copy your API key now. You won't be able to see it again!
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-2 bg-background rounded border-2 border-border text-sm font-mono">
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
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
                      <Key className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{apiKey.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {apiKey.key.startsWith("sk_live") ? "Live" : "Test"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Created {formatDate(apiKey.createdAt)} • Last used{" "}
                        {formatDate(apiKey.lastUsed)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRevokeKey(apiKey.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Revoke
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-muted rounded border-2 border-border text-sm font-mono">
                    {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleShowKey(apiKey.id)}
                  >
                    {showKey[apiKey.id] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyKey(apiKey.key)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Documentation */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Code className="h-5 w-5" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Include your API key in the Authorization header:</p>
            <code className="block p-3 bg-muted rounded border-2 border-border font-mono text-xs">
              Authorization: Bearer YOUR_API_KEY
            </code>
            <Link href="/docs/api-reference" className="text-primary hover:underline inline-block mt-2">
              View API Documentation →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
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
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
