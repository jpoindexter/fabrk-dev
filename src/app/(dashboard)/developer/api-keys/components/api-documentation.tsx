/**
 * API Documentation Component
 * Displays API usage examples and security best practices
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, AlertTriangle } from "lucide-react";

interface ApiDocumentationProps {
  organizationId: string | null;
}

export function ApiDocumentation({ organizationId }: ApiDocumentationProps) {
  return (
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
          <code className="block p-4 bg-muted rounded border border-border font-mono text-xs">
            Authorization: Bearer YOUR_API_KEY
          </code>
          <div className="pt-2">
            <p className="font-semibold mb-2">Example (cURL):</p>
            <code className="block p-4 bg-muted rounded border border-border font-mono text-xs whitespace-pre-wrap">
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
  );
}
