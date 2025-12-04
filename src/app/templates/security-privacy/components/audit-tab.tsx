/**
 * Audit Log Tab Component - Security audit log
 */

import { Button } from "@/components/ui/button";
import { TerminalCardHeader } from "@/components/ui/card";
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
    <div className="border-border bg-card border">
      <TerminalCardHeader code="0x00" title="AUDIT" />
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-muted-foreground font-mono text-xs">
            [SECURITY_AUDIT_LOG]: COUNT={auditLog.length}
          </div>
          <Button variant="outline" size="sm" className="h-7 rounded-none font-mono text-xs">
            <Download className="mr-2 h-3 w-3" />
            &gt; EXPORT
          </Button>
        </div>

        {/* Terminal Table */}
        <div className="border-border border">
          <div className="border-border bg-muted/30 grid grid-cols-4 border-b px-4 py-2 font-mono text-xs">
            <span className="text-muted-foreground">[ACTION]</span>
            <span className="text-muted-foreground">[TIMESTAMP]</span>
            <span className="text-muted-foreground">[IP_ADDRESS]</span>
            <span className="text-muted-foreground">[STATUS]</span>
          </div>
          <div className="divide-border divide-y">
            {auditLog.map((log) => (
              <div
                key={log.id}
                className="hover:bg-muted/30 grid grid-cols-4 px-4 py-4 font-mono text-xs"
              >
                <span>{log.action}</span>
                <span className="text-muted-foreground">{log.timestamp}</span>
                <span className="text-muted-foreground">{log.ip}</span>
                <span
                  className={`w-fit border px-2 py-0.5 ${
                    log.status === "success"
                      ? "border-success/50 text-success"
                      : "border-destructive/50 text-destructive"
                  }`}
                >
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
