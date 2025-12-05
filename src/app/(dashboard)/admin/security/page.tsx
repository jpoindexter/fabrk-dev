/**
 * Admin Security Logs
 * View and analyze security events
 */

"use client";

import React, { useState, useEffect, startTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryAuditLogs, getSecuritySummary, type AuditLogEntry } from "@/lib/security/audit-log";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date(date));
}

function getSeverityColor(severity: string): "destructive" | "default" | "secondary" | "outline" {
  switch (severity) {
    case "critical":
      return "destructive";
    case "high":
      return "destructive";
    case "medium":
      return "default";
    case "low":
      return "secondary";
    default:
      return "outline";
  }
}

function getResultIcon(result: string): React.JSX.Element {
  switch (result) {
    case "success":
      return <CheckCircle className="text-success h-4 w-4" />;
    case "failure":
      return <XCircle className="text-destructive h-4 w-4" />;
    case "error":
      return <AlertTriangle className="text-warning h-4 w-4" />;
    default:
      return <Info className="text-info h-4 w-4" />;
  }
}

export default function AdminSecurityPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string | undefined>();
  const [summary, setSummary] = useState<Awaited<ReturnType<typeof getSecuritySummary>>>();

  useEffect(() => {
    // Load logs - use startTransition for non-urgent updates
    startTransition(() => {
      const loadData = async () => {
        const filters: Parameters<typeof queryAuditLogs>[0] = {};
        if (severityFilter && severityFilter !== "all") {
          filters.severity = severityFilter as AuditLogEntry["severity"];
        }
        filters.limit = 50;

        const auditLogs = await queryAuditLogs(filters);
        setLogs(auditLogs);

        // Load summary (last 7 days)
        const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const summaryData = await getSecuritySummary(since);
        setSummary(summaryData);
      };

      loadData();
    });
  }, [severityFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security Logs</h1>
        <p className="text-muted-foreground">Monitor security events and audit logs</p>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events (7d)</CardTitle>
              <Info className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalEvents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
              <AlertTriangle className="text-destructive h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.bySeverity.critical || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High</CardTitle>
              <AlertTriangle className="text-warning h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.bySeverity.high || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medium</CardTitle>
              <Info className="text-info h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.bySeverity.medium || 0}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Security Events</CardTitle>
              <CardDescription>Last 50 security events</CardDescription>
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className={cn("border", mode.radius)}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-muted-foreground text-center">
                      No security events found
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-muted-foreground text-xs">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell className={cn("text-xs", mode.font)}>{log.eventType}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="text-sm">
                        {log.userEmail || log.userId || "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getResultIcon(log.result)}
                          <span className="text-sm capitalize">{log.result}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getSeverityColor(log.severity)}
                          className="w-24 justify-center font-semibold"
                        >
                          {log.severity}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
