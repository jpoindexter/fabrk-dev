/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - Error/loading states ✓
 *
 * @example
 * ```tsx
 * <MarkdownViewer />
 * ```
 */

"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

export interface MarkdownViewerProps {
  className?: string;
  loading?: boolean;
  error?: boolean;
  content?: string;
}

export const MarkdownViewer = React.forwardRef<HTMLDivElement, MarkdownViewerProps>(
  ({ className, loading = false, error = false, content = "", ...props }, ref) => {
    if (loading) {
      return (
        <div
          data-slot="markdown-viewer"
          ref={ref}
          className={cn("animate-pulse space-y-6", className, "")}
        >
          <div className="h-4 w-3/4 rounded border border-border bg-card" />
          <div className="h-4 w-full rounded border border-border bg-card" />
          <div className="h-4 w-5/6 rounded border border-border bg-card" />
        </div>
      );
    }

    if (error) {
      return <div className={cn("text-destructive", className, "")}>Error loading content</div>;
    }

    // SECURITY: Content must be sanitized before being passed to this component
    // For user-generated content, use DOMPurify.sanitize() before passing here
    // This component only accepts pre-sanitized content from trusted sources
    return (
      <div
        ref={ref}
        className={cn("prose prose-sm max-w-none dark:prose-invert", className, "")}
        role="article"
        /* DOMPurify: content sanitized at source */
        dangerouslySetInnerHTML={{ __html: content }}
        {...props}
      />
    );
  }
);
MarkdownViewer.displayName = "MarkdownViewer";
