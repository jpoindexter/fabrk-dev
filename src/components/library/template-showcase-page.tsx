/**
 * TemplateShowcasePage - Reusable wrapper for all template showcase pages
 * Eliminates boilerplate across 33+ template pages
 */
'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Card,
  CardHeader,
  CardContent,
  TemplatePageHeader,
  FeatureList,
  FeatureItem,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { RelatedTemplates } from './related-templates';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

/** Skeleton loader for preview section */
function PreviewSkeleton() {
  return (
    <div className="bg-background/50 flex min-h-[400px] items-center justify-center p-8">
      <div className="space-y-4 text-center">
        <div className="bg-muted mx-auto h-8 w-32 animate-pulse" />
        <div className="bg-muted mx-auto h-4 w-48 animate-pulse" />
        <div className={cn(mode.font, mode.typography.caption, mode.color.text.muted)}>
          Loading preview...
        </div>
      </div>
    </div>
  );
}

/** Error fallback for preview section */
function PreviewError({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="bg-destructive/5 border-destructive/20 flex min-h-[200px] flex-col items-center justify-center gap-4 border p-8">
      <div className={cn(mode.font, 'text-destructive text-sm font-semibold')}>
        [ERROR]: Preview failed to load
      </div>
      <div className={cn(mode.font, mode.typography.caption, mode.color.text.muted)}>
        {error.message}
      </div>
      <button
        onClick={resetErrorBoundary}
        className={cn(
          'border px-4 py-2',
          'border-border hover:bg-muted',
          mode.radius,
          mode.font,
          mode.typography.caption
        )}
      >
        &gt; RETRY
      </button>
    </div>
  );
}

/** Parse a file path string into FileStructureItem format */
export function parseFilePath(path: string, label?: string): FileStructureItem {
  const segments = path.split('/').filter(Boolean);
  return {
    path: segments.map((seg, i) => (i < segments.length - 1 ? seg + '/' : seg)),
    label,
  };
}

/**
 * TemplatePreviewWrapper - Standardized wrapper for all template previews
 * Ensures consistent padding, background, and container styling
 */
export interface TemplatePreviewWrapperProps {
  children: React.ReactNode;
  /** Minimum height for the preview container. Default: '600px' */
  minHeight?: string;
  /** Additional className for custom styling */
  className?: string;
}

export function TemplatePreviewWrapper({
  children,
  minHeight = '600px',
  className,
}: TemplatePreviewWrapperProps) {
  return (
    <div className={cn('bg-background/50 p-4 sm:p-8', className)} style={{ minHeight }}>
      <div className="container mx-auto max-w-7xl">{children}</div>
    </div>
  );
}

export interface FileStructureItem {
  /** File path segments (e.g., ['app/', '(dashboard)/', 'profile/page.tsx']) */
  path: string[];
  /** Optional label (e.g., '← Copy template here') */
  label?: string;
}

export interface TemplateShowcasePageProps {
  /** Badge text for header */
  badge: string;
  /** Page title */
  title: string;
  /** Page description */
  description: string;
  /** Template ID for related templates (must match library-data.ts) */
  templateId: string;
  /** The preview component to render */
  preview: React.ReactNode;
  /** The template code to show in code tab */
  code: string;
  /** File structure - simple string or detailed items */
  fileStructure: string | FileStructureItem[];
  /** List of features */
  features: string[];
  /** Show related templates (default: true) */
  showRelated?: boolean;
  /** Number of related templates to show (default: 3) */
  relatedLimit?: number;
}

export function TemplateShowcasePage({
  badge,
  title,
  description,
  templateId,
  preview,
  code,
  fileStructure,
  features,
  showRelated = true,
  relatedLimit = 3,
}: TemplateShowcasePageProps) {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader badge={badge} title={title} description={description} />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE_PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  'h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0',
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  aria-label="Preview template"
                  className={cn(
                    'flex items-center gap-2 border-r px-4 py-2',
                    'border-border',
                    'data-[state=active]:bg-accent data-[state=active]:text-accent-foreground',
                    'data-[state=inactive]:text-muted-foreground',
                    'data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground',
                    'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2',
                    mode.radius,
                    mode.font,
                    mode.typography.caption
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  aria-label="View source code"
                  className={cn(
                    'flex items-center gap-2 border-r px-4 py-2',
                    'border-border',
                    'data-[state=active]:bg-accent data-[state=active]:text-accent-foreground',
                    'data-[state=inactive]:text-muted-foreground',
                    'data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground',
                    'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2',
                    mode.radius,
                    mode.font,
                    mode.typography.caption
                  )}
                >
                  [CODE]
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full" role="tabpanel">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE_PREVIEW" />
              <ErrorBoundary FallbackComponent={PreviewError}>
                <Suspense fallback={<PreviewSkeleton />}>{preview}</Suspense>
              </ErrorBoundary>
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full" role="tabpanel">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE_CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={code} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE_STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className={mode.color.text.muted}>[FILES]:</div>
              <div className="space-y-1 pl-4">
                {typeof fileStructure === 'string' ? (
                  <FileStructureLine path={fileStructure} label="← Copy template here" />
                ) : (
                  fileStructure.map((item, idx) => (
                    <FileStructureLine key={idx} path={item.path.join('')} label={item.label} />
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x03" title="FEATURES" />
          <CardContent padding="md">
            <FeatureList>
              {features.map((feature, idx) => (
                <FeatureItem key={idx}>{feature}</FeatureItem>
              ))}
            </FeatureList>
          </CardContent>
        </Card>

        {/* Related Templates */}
        {showRelated && <RelatedTemplates currentTemplateId={templateId} limit={relatedLimit} />}
      </div>
    </div>
  );
}

/** Helper component for file structure lines */
function FileStructureLine({ path, label }: { path: string; label?: string }) {
  // Parse path into segments for coloring
  // e.g., "app/(dashboard)/profile/page.tsx" -> colored segments
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
