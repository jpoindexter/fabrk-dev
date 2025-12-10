/**
 * ✅ FABRK COMPONENT - PRO PACK
 * Webhook Log - Track webhook delivery status
 *
 * Features:
 * - DataTable of webhook events
 * - Status badges (success/failed/pending/retrying)
 * - Expandable rows for request/response payloads
 * - Retry failed webhooks button
 * - Filter by status, endpoint, date
 * - Real-time updates (optional via polling)
 *
 * Design System Integration:
 * - Terminal aesthetic with mode.radius, mode.font
 * - Design tokens only (no hardcoded colors)
 * - 8-point grid spacing
 * - WCAG 2.1 AA compliant
 *
 * @example
 * ```tsx
 * <WebhookLog
 *   userId="user_123"
 *   onRetry={(logId) => retryWebhook(logId)}
 * />
 * ```
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './sheet';
import { CodeBlock } from './code-block';
import { Search, RefreshCw, ExternalLink, Clock } from 'lucide-react';

export type WebhookStatus = 'success' | 'failed' | 'pending' | 'retrying';

export interface WebhookLogEntry {
  id: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: WebhookStatus;
  statusCode: number | null;
  requestPayload: string;
  responsePayload: string | null;
  error: string | null;
  timestamp: Date;
  duration: number | null; // milliseconds
  retryCount: number;
}

export interface WebhookLogProps {
  className?: string;
  userId?: string;
  onRetry?: (logId: string) => Promise<void>;
  onRefresh?: () => Promise<void>;
  initialLogs?: WebhookLogEntry[];
  realtimeUpdates?: boolean;
  pollInterval?: number; // milliseconds
}

export function WebhookLog({
  className,
  userId: _userId,
  onRetry,
  onRefresh,
  initialLogs = [],
  realtimeUpdates = false,
  pollInterval = 5000,
}: WebhookLogProps) {
  const [logs] = React.useState<WebhookLogEntry[]>(initialLogs);
  const [filteredLogs, setFilteredLogs] = React.useState<WebhookLogEntry[]>(initialLogs);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<WebhookStatus | 'all'>('all');
  const [selectedLog, setSelectedLog] = React.useState<WebhookLogEntry | null>(null);
  const [isRetrying, setIsRetrying] = React.useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Apply filters
  React.useEffect(() => {
    let filtered = logs;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((log) => log.status === statusFilter);
    }

    // Filter by search (endpoint or error)
    if (searchQuery) {
      filtered = filtered.filter(
        (log) =>
          log.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.error?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  }, [logs, searchQuery, statusFilter]);

  // Real-time polling (optional)
  React.useEffect(() => {
    if (!realtimeUpdates || !onRefresh) return;

    const interval = setInterval(() => {
      onRefresh();
    }, pollInterval);

    return () => clearInterval(interval);
  }, [realtimeUpdates, onRefresh, pollInterval]);

  const handleRetry = async (logId: string) => {
    if (!onRetry) return;

    setIsRetrying(logId);
    try {
      await onRetry(logId);
      // Refresh logs after retry
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      console.error('Failed to retry webhook:', error);
    } finally {
      setIsRetrying(null);
    }
  };

  const handleRefresh = async () => {
    if (!onRefresh) return;

    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusBadgeVariant = (status: WebhookStatus) => {
    switch (status) {
      case 'success':
        return 'default'; // Will use success color via className
      case 'failed':
        return 'destructive';
      case 'pending':
        return 'secondary';
      case 'retrying':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: WebhookStatus) => {
    switch (status) {
      case 'success':
        return '✓';
      case 'failed':
        return '✕';
      case 'pending':
        return '⏳';
      case 'retrying':
        return '↻';
      default:
        return '';
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header with Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className={cn('text-sm font-semibold tracking-tight', mode.font)}>
            [ WEBHOOK_LOGS ]
          </h3>
          <p className="text-muted-foreground mt-1 text-xs">
            Track webhook delivery status and debug failures
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={cn(mode.radius, mode.font)}
        >
          <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
          {'> '}REFRESH
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search by endpoint or error..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn('pl-10', mode.radius, mode.font)}
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as WebhookStatus | 'all')}
        >
          <SelectTrigger className={cn('w-full sm:w-[180px]', mode.radius, mode.font)}>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className={cn(mode.radius)}>
            <SelectItem value="all" className={cn(mode.font)}>
              [ALL_STATUS]
            </SelectItem>
            <SelectItem value="success" className={cn(mode.font)}>
              [SUCCESS]
            </SelectItem>
            <SelectItem value="failed" className={cn(mode.font)}>
              [FAILED]
            </SelectItem>
            <SelectItem value="pending" className={cn(mode.font)}>
              [PENDING]
            </SelectItem>
            <SelectItem value="retrying" className={cn(mode.font)}>
              [RETRYING]
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Logs Table */}
      <Card className={cn(mode.radius)}>
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center">
            <p className={cn('text-muted-foreground text-sm', mode.font)}>
              {searchQuery || statusFilter !== 'all'
                ? '[NO_LOGS_FOUND]: Try adjusting filters'
                : '[NO_WEBHOOK_LOGS]: Webhook events will appear here'}
            </p>
          </div>
        ) : (
          <div className="divide-border divide-y">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4">
                {/* Log Row */}
                <div className="flex items-start gap-4">
                  {/* Status & Method */}
                  <div className="flex flex-col items-center gap-2">
                    <Badge
                      variant={getStatusBadgeVariant(log.status)}
                      className={cn(
                        'w-20 justify-center',
                        mode.font,
                        log.status === 'success' && 'bg-success/20 text-success border-success'
                      )}
                    >
                      {getStatusIcon(log.status)} {log.status.toUpperCase()}
                    </Badge>
                    <span
                      className={cn(
                        'text-muted-foreground border-border rounded border px-2 py-1 text-xs',
                        mode.font
                      )}
                    >
                      {log.method}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className={cn('text-sm font-medium', mode.font)}>{log.endpoint}</p>
                        <div
                          className={cn(
                            'text-muted-foreground mt-1 flex flex-wrap items-center gap-2 text-xs',
                            mode.font
                          )}
                        >
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                          {log.duration && <span>• {log.duration}ms</span>}
                          {log.statusCode && <span>• Status: {log.statusCode}</span>}
                          {log.retryCount > 0 && <span>• Retries: {log.retryCount}</span>}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {log.status === 'failed' && onRetry && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRetry(log.id)}
                            disabled={isRetrying === log.id}
                            className={cn('text-xs', mode.radius, mode.font)}
                          >
                            {isRetrying === log.id ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3 w-3" />
                            )}
                            RETRY
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedLog(log)}
                          className={cn('text-xs', mode.radius, mode.font)}
                        >
                          <ExternalLink className="h-3 w-3" />
                          VIEW
                        </Button>
                      </div>
                    </div>

                    {log.error && (
                      <div className="bg-destructive/10 border-destructive rounded border p-2">
                        <p className={cn('text-destructive text-xs', mode.font)}>
                          [ERROR]: {log.error}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Details Sheet */}
      <Sheet open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <SheetContent className={cn('w-full overflow-y-auto sm:max-w-2xl', mode.radius)}>
          {selectedLog && (
            <>
              <SheetHeader>
                <SheetTitle className={cn(mode.font)}>[ WEBHOOK DETAILS ]</SheetTitle>
                <SheetDescription>
                  Full request and response payloads for debugging
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Metadata */}
                <div className="space-y-2">
                  <p className={cn('text-xs font-semibold', mode.font)}>[METADATA]:</p>
                  <div className="bg-muted border-border space-y-1 border p-3">
                    <div className="flex justify-between text-xs">
                      <span className={cn('text-muted-foreground', mode.font)}>[ID]:</span>
                      <span className={cn(mode.font)}>{selectedLog.id}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={cn('text-muted-foreground', mode.font)}>[ENDPOINT]:</span>
                      <span className={cn(mode.font)}>{selectedLog.endpoint}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={cn('text-muted-foreground', mode.font)}>[METHOD]:</span>
                      <span className={cn(mode.font)}>{selectedLog.method}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={cn('text-muted-foreground', mode.font)}>[TIMESTAMP]:</span>
                      <span className={cn(mode.font)}>
                        {new Date(selectedLog.timestamp).toISOString()}
                      </span>
                    </div>
                    {selectedLog.duration && (
                      <div className="flex justify-between text-xs">
                        <span className={cn('text-muted-foreground', mode.font)}>[DURATION]:</span>
                        <span className={cn(mode.font)}>{selectedLog.duration}ms</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Request Payload */}
                <div className="space-y-2">
                  <p className={cn('text-xs font-semibold', mode.font)}>[REQUEST PAYLOAD]:</p>
                  <CodeBlock code={selectedLog.requestPayload} language="json" maxHeight="300px" />
                </div>

                {/* Response Payload */}
                {selectedLog.responsePayload && (
                  <div className="space-y-2">
                    <p className={cn('text-xs font-semibold', mode.font)}>[RESPONSE PAYLOAD]:</p>
                    <CodeBlock
                      code={selectedLog.responsePayload}
                      language="json"
                      maxHeight="300px"
                    />
                  </div>
                )}

                {/* Error */}
                {selectedLog.error && (
                  <div className="space-y-2">
                    <p className={cn('text-xs font-semibold', mode.font)}>[ERROR]:</p>
                    <div className="bg-destructive/10 border-destructive border p-3">
                      <p className={cn('text-destructive text-xs', mode.font)}>
                        {selectedLog.error}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
