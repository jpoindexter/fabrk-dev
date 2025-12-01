/**
 * API Keys List Component
 * Displays list of API keys or empty state
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Key, Copy, Trash2, Loader2 } from "lucide-react";

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

interface ApiKeysListProps {
  apiKeys: ApiKey[];
  loading: boolean;
  isRevoking: string | null;
  onCopyKey: (key: string) => void;
  onRevokeKey: (id: string) => void;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Never";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
};

const maskKey = (keyPrefix: string) => {
  return `${keyPrefix}${"•".repeat(40)}`;
};

const getPermissionBadgeVariant = (
  permission: string
): "default" | "secondary" | "accent" | "outline" => {
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

export function ApiKeysList({
  apiKeys,
  loading,
  isRevoking,
  onCopyKey,
  onRevokeKey,
}: ApiKeysListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (apiKeys.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-4">
      {apiKeys.map((apiKey) => (
        <Card key={apiKey.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-none bg-primary/10 border border-border">
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
                    Created {formatDate(apiKey.createdAt)} by{" "}
                    {apiKey.user.name || apiKey.user.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last used {formatDate(apiKey.lastUsedAt)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRevokeKey(apiKey.id)}
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
                onClick={() => onCopyKey(apiKey.keyPrefix)}
                title="Copy prefix"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
