/**
 * Audit Log Tab Component - Security audit log
 */

import { Button } from "@/components/ui/button";
import { StyledCardHeader } from "@/components/ui/card";
import { Download } from "lucide-react";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

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
      <StyledCardHeader code="0x00" title="AUDIT" />
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className={cn(mode.font, "text-muted-foreground text-xs")}>
            [SECURITY_AUDIT_LOG]: COUNT={auditLog.length}
          </div>
          <Button variant="outline" size="sm" className={cn(mode.radius, mode.font, "h-7 text-xs")}>
            <Download className="mr-2 h-3 w-3" />
            &gt; EXPORT
          </Button>
        </div>

        {/* Terminal Table */}
        <div className="border-border border">
          <div
            className={cn(
              mode.font,
              "border-border bg-muted/30 grid grid-cols-4 border-b px-4 py-2 text-xs"
            )}
          >
            <span className="text-muted-foreground">[ACTION]</span>
            <span className="text-muted-foreground">[TIMESTAMP]</span>
            <span className="text-muted-foreground">[IP_ADDRESS]</span>
            <span className="text-muted-foreground">[STATUS]</span>
          </div>
          <div className="divide-border divide-y">
            {auditLog.map((log) => (
              <div
                key={log.id}
                className={cn(mode.font, "hover:bg-muted/30 grid grid-cols-4 px-4 py-4 text-xs")}
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
