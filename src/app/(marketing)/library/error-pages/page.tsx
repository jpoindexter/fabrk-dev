/**
 * Error Pages Template - Terminal console style
 * Complete collection: Error, 401, 403, 404, 429, 500, 502, 503, 504
 */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  FeatureList,
  FeatureItem,
  TemplatePageHeader,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { TemplatePreviewWrapper } from '@/components/library';
import { RelatedTemplates } from '@/components/library/related-templates';
import Link from 'next/link';
import {
  FileQuestion,
  ServerCrash,
  Construction,
  Home,
  ArrowLeft,
  AlertTriangle,
  RefreshCw,
  LucideIcon,
  Lock,
  ShieldX,
  Clock,
  Wifi,
  Timer,
  ChevronRight,
} from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// Error page configurations
interface ErrorConfig {
  code: string;
  title: string;
  description: string;
  icon: LucideIcon;
  terminal: string[];
  actions: string[];
  color: 'destructive' | 'warning';
}

const errorConfigs: Record<string, ErrorConfig> = {
  error: {
    code: 'ERROR',
    title: 'Something Went Wrong',
    description:
      "We're sorry, but something unexpected happened. This error has been logged and we're looking into it.",
    icon: AlertTriangle,
    terminal: [
      '$ process.run --component=App',
      'STATUS: EXCEPTION CAUGHT',
      'TYPE: RuntimeError',
      '',
      'ERROR: Unexpected application error',
      'DIGEST: err_1921274745',
      'LOGGED: true',
      'TIMESTAMP: 2024-11-12T14:23:45Z',
    ],
    actions: ['TRY AGAIN', 'GO HOME'],
    color: 'destructive',
  },
  '401': {
    code: '401',
    title: 'Unauthorized',
    description: 'You need to sign in to access this page.',
    icon: Lock,
    terminal: [
      '$ curl -I https://fabrk.ai/dashboard',
      'HTTP/1.1 401 Unauthorized',
      'WWW-Authenticate: Bearer',
      '',
      'ERROR: Authentication required',
      'REASON: No valid session token',
      'REDIRECT: /sign-in',
    ],
    actions: ['SIGN IN', 'GO HOME'],
    color: 'destructive',
  },
  '403': {
    code: '403',
    title: 'Access Denied',
    description: "You don't have permission to access this resource.",
    icon: ShieldX,
    terminal: [
      '$ fabrk access --resource=/admin',
      'USER: user@example.com',
      'ROLE: member',
      'REQUIRED: admin',
      '',
      'ERROR: Insufficient permissions',
      'ACTION: Contact administrator',
    ],
    actions: ['GO BACK', 'GO HOME'],
    color: 'destructive',
  },
  '404': {
    code: '404',
    title: 'Page Not Found',
    description: "The page you're looking for doesn't exist or has been moved.",
    icon: FileQuestion,
    terminal: [
      '$ curl -I https://fabrk.ai/unknown-page',
      'HTTP/1.1 404 Not Found',
      'Content-Type: text/html',
      'X-Request-ID: abc123',
      '',
      'ERROR: Resource not found in database',
      'PATH: /unknown-page',
      'TIMESTAMP: 2024-11-12T14:23:45Z',
    ],
    actions: ['GO HOME', 'GO BACK'],
    color: 'destructive',
  },
  '429': {
    code: '429',
    title: 'Too Many Requests',
    description: "You've made too many requests. Please wait before trying again.",
    icon: Clock,
    terminal: [
      '$ fabrk api --endpoint=/users',
      'RATE_LIMIT: 100 req/min',
      'CURRENT: 127 req/min',
      'RETRY_AFTER: 45 seconds',
      '',
      'ERROR: Rate limit exceeded',
      'COOLDOWN: 00:00:45',
    ],
    actions: ['WAIT', 'GO HOME'],
    color: 'warning',
  },
  '500': {
    code: '500',
    title: 'Server Error',
    description: "Something went wrong on our end. We're working to fix it.",
    icon: ServerCrash,
    terminal: [
      '$ systemctl status fabrk-api',
      '● fabrk-api.service - Fabrk API Server',
      '   Status: ERROR',
      '   Memory: 512MB',
      '',
      'ERROR: Internal server exception',
      'TRACE: DatabaseConnectionError',
      'TIMESTAMP: 2024-11-12T14:23:45Z',
    ],
    actions: ['TRY AGAIN', 'GO HOME'],
    color: 'destructive',
  },
  '502': {
    code: '502',
    title: 'Bad Gateway',
    description: 'The server received an invalid response from an upstream server.',
    icon: Wifi,
    terminal: [
      '$ fabrk health --upstream',
      'GATEWAY: nginx/1.24.0',
      'UPSTREAM: api.fabrk.ai:8080',
      'RESPONSE: Invalid',
      '',
      'ERROR: Bad gateway response',
      'UPSTREAM_STATUS: Connection refused',
    ],
    actions: ['TRY AGAIN', 'STATUS PAGE'],
    color: 'destructive',
  },
  '503': {
    code: '503',
    title: 'Under Maintenance',
    description: "We're performing scheduled maintenance. Be back soon!",
    icon: Construction,
    terminal: [
      '$ fabrk status',
      'SERVICE: maintenance_mode=true',
      'DOWNTIME: ~30 minutes',
      'REASON: Database migration',
      '',
      'SCHEDULED: 2024-11-12T14:00:00Z',
      'ESTIMATED_END: 2024-11-12T14:30:00Z',
      'STATUS: IN PROGRESS',
    ],
    actions: ['REFRESH', 'STATUS PAGE'],
    color: 'warning',
  },
  '504': {
    code: '504',
    title: 'Gateway Timeout',
    description: 'The server took too long to respond. Please try again.',
    icon: Timer,
    terminal: [
      '$ fabrk request --timeout=30s',
      'ENDPOINT: /api/export',
      'TIMEOUT: 30000ms',
      'ELAPSED: 30001ms',
      '',
      'ERROR: Gateway timeout exceeded',
      'SUGGESTION: Retry with smaller payload',
    ],
    actions: ['TRY AGAIN', 'GO HOME'],
    color: 'warning',
  },
};

const templateCode = `"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  FileQuestion,
  ServerCrash,
  Construction,
  Home,
  RefreshCw,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

// Choose error type: 'error' | '404' | '500' | '503'
const errorType = '404';

const errorPages = {
  error: {
    code: "ERROR",
    title: "Something Went Wrong",
    description: "We're sorry, but something unexpected happened.",
    icon: AlertTriangle,
    terminal: [
      "$ process.run --component=App",
      "STATUS: EXCEPTION CAUGHT",
      "TYPE: RuntimeError",
      "",
      "ERROR: Unexpected application error",
      "DIGEST: err_1921274745",
    ],
    actions: ["TRY AGAIN", "GO HOME"],
  },
  "404": {
    code: "404",
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
    icon: FileQuestion,
    terminal: [
      "$ curl -I https://fabrk.ai/unknown-page",
      "HTTP/1.1 404 Not Found",
      "",
      "ERROR: Resource not found",
      "PATH: /unknown-page",
    ],
    actions: ["GO HOME", "GO BACK"],
  },
  "500": {
    code: "500",
    title: "Server Error",
    description: "Something went wrong on our end.",
    icon: ServerCrash,
    terminal: [
      "$ systemctl status fabrk-api",
      "● fabrk-api.service - Status: ERROR",
      "",
      "ERROR: Internal server exception",
      "TRACE: DatabaseConnectionError",
    ],
    actions: ["TRY AGAIN", "GO HOME"],
  },
  "503": {
    code: "503",
    title: "Under Maintenance",
    description: "We're performing scheduled maintenance.",
    icon: Construction,
    terminal: [
      "$ fabrk status",
      "SERVICE: maintenance_mode=true",
      "DOWNTIME: ~30 minutes",
      "",
      "STATUS: IN PROGRESS",
    ],
    actions: ["REFRESH", "STATUS PAGE"],
  },
};

export default function ErrorPage() {
  const error = errorPages[errorType];
  const Icon = error.icon;
  const isWarning = errorType === "503";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto max-w-lg space-y-6 text-center">
        {/* Icon */}
        <div
          className={\`mx-auto flex h-20 w-20 items-center justify-center border \${
            isWarning ? "border-warning bg-warning/10" : "border-destructive bg-destructive/10"
          }\`}
        >
          <Icon className={\`h-10 w-10 \${isWarning ? "text-warning" : "text-destructive"}\`} />
        </div>

        {/* Error Code */}
        <div className={cn(mode.font)}>
          <span className={\`text-6xl font-semibold \${isWarning ? "text-warning" : "text-destructive"}\`}>
            {error.code}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h2 className={cn(mode.font, "mb-2 text-2xl font-semibold")}>{error.title}</h2>
          <p className={cn(mode.font, "text-muted-foreground text-sm")}>{error.description}</p>
        </div>

        {/* Terminal Output */}
        <Card>
          <CardHeader code="0x00" title="OUTPUT" />
          <CardContent>
            <div className="space-y-0.5 text-xs">
              {error.terminal.map((line, idx) => (
                <div key={idx} className={
                  line.startsWith("ERROR") ? "text-destructive" :
                  line.startsWith("$") ? "text-success" :
                  line === "" ? "h-2" : ""
                }>
                  {line}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button className={cn(mode.radius, mode.font, "text-xs")}>
            <Home className="mr-1 h-3 w-3" /> &gt; GO HOME
          </Button>
          <Button variant="outline" className={cn(mode.radius, mode.font, "text-xs")}>
            <ArrowLeft className="mr-1 h-3 w-3" /> &gt; GO BACK
          </Button>
        </div>

        <div className={cn(mode.font, "text-muted-foreground text-xs")}>
          [REQUEST ID]: req_abc123def456
        </div>
      </div>
    </div>
  );
}`;

// Reusable error preview component
function ErrorPreview({ errorType }: { errorType: keyof typeof errorConfigs }) {
  const error = errorConfigs[errorType];
  const Icon = error.icon;
  const isWarning = error.color === 'warning';

  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div className="flex min-h-[550px] items-center justify-center">
        <div className="mx-auto max-w-lg space-y-6 text-center">
          {/* Icon */}
          <div
            className={cn(
              'mx-auto flex h-20 w-20 items-center justify-center border',
              isWarning ? 'border-warning bg-warning/10' : 'border-destructive bg-destructive/10'
            )}
          >
            <Icon className={cn('h-10 w-10', isWarning ? 'text-warning' : 'text-destructive')} />
          </div>

          {/* Error Code */}
          <div className={cn(mode.font)}>
            <span
              className={cn(
                'text-6xl font-semibold',
                isWarning ? 'text-warning' : 'text-destructive'
              )}
            >
              {error.code}
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h2 className={cn(mode.font, 'mb-2 text-2xl font-semibold tracking-tight')}>
              {error.title}
            </h2>
            <p className={cn(mode.font, 'text-muted-foreground text-sm')}>{error.description}</p>
          </div>

          {/* Terminal Output */}
          <Card>
            <CardHeader code="0x00" title="OUTPUT" />
            <CardContent>
              <div className="space-y-0.5 text-xs">
                {error.terminal.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.startsWith('ERROR')
                        ? 'text-destructive'
                        : line.startsWith('$')
                          ? 'text-success'
                          : line === ''
                            ? 'h-2'
                            : ''
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {error.actions.includes('SIGN IN') && (
              <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                <Lock className="mr-1 h-3 w-3" />
                &gt; SIGN IN
              </Button>
            )}
            {error.actions.includes('GO HOME') && (
              <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                <Home className="mr-1 h-3 w-3" />
                &gt; GO HOME
              </Button>
            )}
            {error.actions.includes('GO BACK') && (
              <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                <ArrowLeft className="mr-1 h-3 w-3" />
                &gt; GO BACK
              </Button>
            )}
            {error.actions.includes('TRY AGAIN') && (
              <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                <RefreshCw className="mr-1 h-3 w-3" />
                &gt; TRY AGAIN
              </Button>
            )}
            {error.actions.includes('WAIT') && (
              <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                <Clock className="mr-1 h-3 w-3" />
                &gt; WAIT
              </Button>
            )}
            {error.actions.includes('REFRESH') && (
              <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                <RefreshCw className="mr-1 h-3 w-3" />
                &gt; REFRESH
              </Button>
            )}
            {error.actions.includes('STATUS PAGE') && (
              <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                <AlertTriangle className="mr-1 h-3 w-3" />
                &gt; STATUS PAGE
              </Button>
            )}
          </div>

          {/* Request ID */}
          <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
            [REQUEST ID]: req_abc123def456
          </div>
        </div>
      </div>
    </TemplatePreviewWrapper>
  );
}

// File structure helper
function FileStructureLine({ path, label }: { path: string; label?: string }) {
  const segments = path.split('/').filter(Boolean);
  const fileName = segments.pop() || '';

  return (
    <div>
      {segments.map((segment, idx) => (
        <span key={idx}>
          <span
            className={segment.startsWith('(') ? mode.color.text.muted : mode.color.text.accent}
          >
            {segment}
          </span>
          <span className={mode.color.text.muted}>/</span>
        </span>
      ))}
      <span className={mode.color.text.primary}>{fileName}</span>
      {label && <span className={cn('ml-4', mode.color.text.muted)}>{label}</span>}
    </div>
  );
}

// Error type tabs data
const errorTypes = ['error', '401', '403', '404', '429', '500', '502', '503', '504'] as const;
type ErrorType = (typeof errorTypes)[number];

const errorTitles: Record<ErrorType, string> = {
  error: 'GENERIC_ERROR',
  '401': '401_UNAUTHORIZED',
  '403': '403_FORBIDDEN',
  '404': '404_NOT_FOUND',
  '429': '429_RATE_LIMIT',
  '500': '500_SERVER_ERROR',
  '502': '502_BAD_GATEWAY',
  '503': '503_MAINTENANCE',
  '504': '504_GATEWAY_TIMEOUT',
};

const errorLabels: Record<ErrorType, string> = {
  error: 'Generic error page',
  '401': '401 Unauthorized page',
  '403': '403 Forbidden page',
  '404': '404 Not Found page',
  '429': '429 Rate Limit page',
  '500': '500 Server Error page',
  '502': '502 Bad Gateway page',
  '503': '503 Maintenance page',
  '504': '504 Gateway Timeout page',
};

// Reusable ErrorTabContent component
function ErrorTabContent({
  errorType,
  templateCode,
}: {
  errorType: ErrorType;
  templateCode: string;
}) {
  return (
    <TabsContent value={errorType} className="mt-6 space-y-6">
      <Tabs defaultValue="preview" className="w-full">
        <Card>
          <CardHeader code="0x01" title={errorTitles[errorType]} />
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="preview" aria-label={`Preview ${errorLabels[errorType]}`}>
                [PREVIEW]
              </TabsTrigger>
              <TabsTrigger value="code" aria-label={`View ${errorLabels[errorType]} code`}>
                [CODE]
              </TabsTrigger>
            </TabsList>
          </div>
        </Card>
        <TabsContent value="preview" className="mt-6">
          <Card className="overflow-hidden">
            <CardHeader code="0x02" title="LIVE_PREVIEW" />
            <ErrorPreview errorType={errorType} />
          </Card>
        </TabsContent>
        <TabsContent value="code" className="mt-6">
          <Card className="overflow-hidden">
            <CardHeader code="0x02" title="SOURCE_CODE" />
            <div className="w-full max-w-full overflow-x-auto p-4">
              <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </TabsContent>
  );
}

export default function ErrorPagesTemplate() {
  const [activeError, setActiveError] = useState<string>('404');

  const features = [
    'Generic error page template',
    '401 Unauthorized page',
    '403 Access Denied page',
    '404 Not Found page',
    '429 Rate Limit page',
    '500 Server Error page',
    '502 Bad Gateway page',
    '503 Maintenance mode page',
    '504 Gateway Timeout page',
    'Terminal-style error output',
    'Contextual action buttons',
    'Request ID for debugging',
    'Color-coded severity (error vs warning)',
  ];

  const fileStructures: Record<string, { path: string; label: string }> = {
    error: { path: 'app/error.tsx', label: '← Generic errors' },
    '401': { path: 'app/(auth)/unauthorized/page.tsx', label: '← Auth required' },
    '403': { path: 'app/(auth)/forbidden/page.tsx', label: '← Access denied' },
    '404': { path: 'app/not-found.tsx', label: '← 404 errors' },
    '429': { path: 'app/api/error.tsx', label: '← Rate limit' },
    '500': { path: 'app/error.tsx', label: '← Server errors' },
    '502': { path: 'app/error.tsx', label: '← Gateway errors' },
    '503': { path: 'app/maintenance/page.tsx', label: '← Maintenance mode' },
    '504': { path: 'app/error.tsx', label: '← Timeout errors' },
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs">
          <Link
            href="/library"
            className={cn(
              'transition-colors',
              'text-muted-foreground hover:text-foreground',
              mode.font
            )}
          >
            Library
          </Link>
          <ChevronRight className="text-muted-foreground h-3 w-3" />
          <Link
            href="/library/patterns"
            className={cn(
              'transition-colors',
              'text-muted-foreground hover:text-foreground',
              mode.font
            )}
          >
            Patterns
          </Link>
          <ChevronRight className="text-muted-foreground h-3 w-3" />
          <span className={cn('text-foreground', mode.font)}>Error Pages</span>
        </nav>

        {/* Header */}
        <TemplatePageHeader
          badge="ERROR PAGES"
          title="Error Pages"
          description="Complete error page templates: Generic Error, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Rate Limit, 500 Server Error, 502 Bad Gateway, 503 Maintenance, 504 Timeout"
        />

        {/* Error Type Selector */}
        <Tabs defaultValue="404" className="w-full" onValueChange={(v) => setActiveError(v)}>
          <Card>
            <CardHeader code="0x00" title="ERROR_TEMPLATES" />
            <div className="overflow-x-auto">
              <TabsList>
                <TabsTrigger value="error" aria-label="Generic error page">
                  [ERROR]
                </TabsTrigger>
                <TabsTrigger value="401" aria-label="401 Unauthorized page">
                  [401]
                </TabsTrigger>
                <TabsTrigger value="403" aria-label="403 Forbidden page">
                  [403]
                </TabsTrigger>
                <TabsTrigger value="404" aria-label="404 Not Found page">
                  [404]
                </TabsTrigger>
                <TabsTrigger value="429" aria-label="429 Rate Limit page">
                  [429]
                </TabsTrigger>
                <TabsTrigger value="500" aria-label="500 Server Error page">
                  [500]
                </TabsTrigger>
                <TabsTrigger value="502" aria-label="502 Bad Gateway page">
                  [502]
                </TabsTrigger>
                <TabsTrigger value="503" aria-label="503 Maintenance page">
                  [503]
                </TabsTrigger>
                <TabsTrigger value="504" aria-label="504 Gateway Timeout page">
                  [504]
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* All Error Type Tabs - Data-driven (DRY) */}
          {errorTypes.map((errorType) => (
            <ErrorTabContent key={errorType} errorType={errorType} templateCode={templateCode} />
          ))}
        </Tabs>

        {/* File Structure */}
        {/* File Structure */}
        <Card>
          <CardHeader code="0x03" title="FILE_STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className={mode.color.text.muted}>[FILES]:</div>
              <div className="space-y-1 pl-4">
                <FileStructureLine
                  path={fileStructures[activeError].path}
                  label={fileStructures[activeError].label}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x04" title="FEATURES" />
          <CardContent padding="md">
            <FeatureList>
              {features.map((feature, idx) => (
                <FeatureItem key={idx}>{feature}</FeatureItem>
              ))}
            </FeatureList>
          </CardContent>
        </Card>

        {/* Related Templates */}
        <RelatedTemplates currentTemplateId="error-pages" limit={3} />
      </div>
    </div>
  );
}
