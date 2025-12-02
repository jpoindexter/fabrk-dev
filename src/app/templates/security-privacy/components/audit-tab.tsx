/**
 * Audit Log Tab Component - Security audit log
 */

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface AuditLogEntry {
  id: string;
  action: string;
  timestamp: string;
  ip: string;
  status: "success" | "failed";
}

interface AuditTabProps {
  auditLog: AuditLogEntry[];
}

export function AuditTab({ auditLog }: AuditTabProps) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-none bg-destructive/50" />
          <div className="size-2 rounded-none bg-warning/50" />
          <div className="size-2 rounded-none bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">audit.log</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-xs text-muted-foreground">[SECURITY_AUDIT_LOG]: COUNT={auditLog.length}</div>
          <Button variant="outline" size="sm" className="rounded-none font-mono text-xs h-7">
            <Download className="mr-2 h-3 w-3" />
            &gt; EXPORT
          </Button>
        </div>

        {/* Terminal Table */}
        <div className="border border-border">
          <div className="grid grid-cols-4 border-b border-border bg-muted/30 px-4 py-2 font-mono text-xs">
            <span className="text-muted-foreground">[ACTION]</span>
            <span className="text-muted-foreground">[TIMESTAMP]</span>
            <span className="text-muted-foreground">[IP_ADDRESS]</span>
            <span className="text-muted-foreground">[STATUS]</span>
          </div>
          <div className="divide-y divide-border">
            {auditLog.map((log) => (
              <div key={log.id} className="grid grid-cols-4 px-4 py-4 font-mono text-xs hover:bg-muted/30">
                <span>{log.action}</span>
                <span className="text-muted-foreground">{log.timestamp}</span>
                <span className="text-muted-foreground">{log.ip}</span>
                <span className={`border px-2 py-0.5 w-fit ${
                  log.status === "success" ? "border-success/50 text-success" : "border-destructive/50 text-destructive"
                }`}>
                  {log.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
