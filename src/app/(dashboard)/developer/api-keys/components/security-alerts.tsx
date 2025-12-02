/**
 * Security Alerts Component
 * Displays security warnings and newly created key alerts
 */

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2, Copy } from "lucide-react";

interface SecurityAlertsProps {
  createdKey: string | null;
  onCopyKey: (key: string) => void;
  onDismissCreatedKey: () => void;
}

export function SecurityAlerts({
  createdKey,
  onCopyKey,
  onDismissCreatedKey,
}: SecurityAlertsProps) {
  return (
    <>
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
            <p className="text-sm mb-4">
              Make sure to copy your API key now. You won't be able to see it again!
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-2 bg-background rounded border border-border text-sm font-mono break-all">
                {createdKey}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onCopyKey(createdKey)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="link"
              size="sm"
              className="mt-2 h-auto p-0"
              onClick={onDismissCreatedKey}
            >
              I've saved my key
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
