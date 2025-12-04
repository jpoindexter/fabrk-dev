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

import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import * as React from "react";
import DOMPurify from "isomorphic-dompurify";

export interface MarkdownViewerProps {
  className?: string;
  loading?: boolean;
  error?: boolean;
  content?: string;
}

export const MarkdownViewer = React.forwardRef<HTMLDivElement, MarkdownViewerProps>(
  ({ className, loading = false, error = false, content = "", ...props }, ref) => {
    // SECURITY: Content is sanitized using DOMPurify to prevent XSS attacks
    const sanitizedContent = React.useMemo(() => {
      return DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "br",
          "strong",
          "em",
          "u",
          "s",
          "a",
          "ul",
          "ol",
          "li",
          "blockquote",
          "code",
          "pre",
          "img",
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "class"],
        ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
      });
    }, [content]);

    if (loading) {
      return (
        <div
          data-slot="markdown-viewer"
          ref={ref}
          className={cn("animate-pulse space-y-6", className, "")}
        >
          <div className={cn("border-border bg-card h-4 w-3/4 border", mode.radius)} />
          <div className={cn("border-border bg-card h-4 w-full border", mode.radius)} />
          <div className={cn("border-border bg-card h-4 w-5/6 border", mode.radius)} />
        </div>
      );
    }

    if (error) {
      return <div className={cn("text-destructive", className, "")}>Error loading content</div>;
    }

    return (
      <div
        ref={ref}
        className={cn("prose prose-sm dark:prose-invert max-w-none", className, "")}
        role="article"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        {...props}
      />
    );
  }
);
MarkdownViewer.displayName = "MarkdownViewer";
