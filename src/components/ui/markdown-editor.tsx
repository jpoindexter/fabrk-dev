/**
 * ✅ FABRK COMPONENT
 * Markdown Editor with live preview
 * - Side-by-side editor and preview
 * - Toolbar with common formatting shortcuts
 * - Lightweight markdown parsing (no dependencies)
 * - Theme-responsive with neobrutalism styling
 *
 * @example
 * ```tsx
 * <MarkdownEditor value={text} onChange={setText} />
 * ```
 */

"use client";

import * as React from "react";
import {
  Bold,
  Italic,
  Heading1,
  Link as LinkIcon,
  Code,
  List,
  Eye,
  EyeOff,
  Edit3,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export type MarkdownEditorProps = {
  /** Current markdown content */
  value: string;
  /** Callback when content changes */
  onChange: (value: string) => void;
  /** Placeholder text for empty editor */
  placeholder?: string;
  /** Minimum height in pixels */
  minHeight?: number;
  /** Show only editor (no preview) */
  editorOnly?: boolean;
  /** Show only preview (no editor) */
  previewOnly?: boolean;
  /** Custom className */
  className?: string;
  /** Disable editing */
  disabled?: boolean;
};

/**
 * Simple markdown to HTML converter using regex
 * Supports: headers, bold, italic, links, code blocks, lists
 */
function parseMarkdown(markdown: string): string {
  if (!markdown) return '<p class="text-muted-foreground">No content yet...</p>';

  let html = markdown;

  // Code blocks (must be first to prevent other parsing inside)
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre class="bg-muted rounded-brutal p-4 my-4 overflow-x-auto border-2 border-brutal"><code class="text-sm font-mono">$2</code></pre>'
  );

  // Headers (h1-h6)
  html = html.replace(/^######\s+(.+)$/gm, '<h6 class="text-base font-bold mt-6 mb-2">$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="text-lg font-bold mt-6 mb-2">$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-xl font-bold mt-6 mb-2">$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-2xl font-bold mt-6 mb-3">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-3xl font-bold mt-8 mb-4">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-4xl font-bold mt-8 mb-4">$1</h1>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong class="font-bold">$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.+?)_/g, '<em class="italic">$1</em>');

  // Links
  html = html.replace(
    /\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" class="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono border border-brutal">$1</code>'
  );

  // Unordered lists
  html = html.replace(/^\*\s+(.+)$/gm, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(/^-\s+(.+)$/gm, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(/(<li class="ml-4 list-disc">.*<\/li>\n?)+/g, '<ul class="my-4 space-y-1">$&</ul>');

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-4 list-decimal">$1</li>');
  html = html.replace(/(<li class="ml-4 list-decimal">.*<\/li>\n?)+/g, '<ol class="my-4 space-y-1">$&</ol>');

  // Paragraphs (wrap non-tag lines)
  const lines = html.split('\n');
  const wrappedLines = lines.map((line) => {
    if (!line.trim()) return '';
    if (line.match(/^<(h[1-6]|ul|ol|pre|li)/)) return line;
    if (line.match(/^<\/(h[1-6]|ul|ol|pre|li)/)) return line;
    return `<p class="my-2 leading-relaxed">${line}</p>`;
  });
  html = wrappedLines.join('\n');

  return html;
}

export const MarkdownEditor = React.forwardRef<HTMLDivElement, MarkdownEditorProps>(
  (
    {
      value,
      onChange,
      placeholder = "Start writing in markdown...",
      minHeight = 400,
      editorOnly = false,
      previewOnly = false,
      className,
      disabled = false,
    },
    ref
  ) => {
    const [showPreview, setShowPreview] = React.useState(!editorOnly && !previewOnly);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Insert markdown syntax at cursor position
    const insertMarkdown = (before: string, after: string = "") => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);
      const newText =
        value.substring(0, start) + before + selectedText + after + value.substring(end);

      onChange(newText);

      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + before.length + selectedText.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    };

    const toolbarButtons = [
      { icon: Bold, label: "Bold", action: () => insertMarkdown("**", "**") },
      { icon: Italic, label: "Italic", action: () => insertMarkdown("*", "*") },
      { icon: Heading1, label: "Heading", action: () => insertMarkdown("# ", "") },
      { icon: LinkIcon, label: "Link", action: () => insertMarkdown("[", "](url)") },
      { icon: Code, label: "Code", action: () => insertMarkdown("```\n", "\n```") },
      { icon: List, label: "List", action: () => insertMarkdown("- ", "") },
    ];

    const isEditorVisible = previewOnly ? false : !editorOnly;
    const isPreviewVisible = editorOnly ? false : (previewOnly || showPreview);

    return (
      <div ref={ref} className={cn("flex flex-col gap-3", className)}>
        {/* Toolbar */}
        {!previewOnly && !disabled && (
          <div className="flex items-center gap-2 p-2 rounded-brutal border-2 border-brutal bg-card shadow-brutal">
            <div className="flex items-center gap-1">
              {toolbarButtons.map((btn) => (
                <Button
                  key={btn.label}
                  variant="ghost"
                  size="icon-sm"
                  onClick={btn.action}
                  title={btn.label}
                  type="button"
                >
                  <btn.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            {/* Preview toggle (only show if not editorOnly/previewOnly) */}
            {!editorOnly && !previewOnly && (
              <>
                <div className="h-6 w-px bg-border mx-2" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  type="button"
                  className="gap-2"
                >
                  {showPreview ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      <span className="text-xs">Hide Preview</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      <span className="text-xs">Show Preview</span>
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        )}

        {/* Editor and Preview */}
        <div
          className={cn(
            "grid gap-3",
            isEditorVisible && isPreviewVisible ? "grid-cols-2" : "grid-cols-1"
          )}
        >
          {/* Editor Pane */}
          {isEditorVisible && (
            <div className="flex flex-col">
              {isPreviewVisible && (
                <div className="flex items-center gap-2 mb-2 text-sm font-bold text-muted-foreground">
                  <Edit3 className="h-4 w-4" />
                  <span>Editor</span>
                </div>
              )}
              <Textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "font-mono text-sm resize-none",
                  "focus-visible:ring-2"
                )}
                style={{ minHeight }}
              />
            </div>
          )}

          {/* Preview Pane */}
          {isPreviewVisible && (
            <div className="flex flex-col">
              {isEditorVisible && (
                <div className="flex items-center gap-2 mb-2 text-sm font-bold text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </div>
              )}
              <div
                className={cn(
                  "rounded-brutal border-2 border-brutal bg-card p-4 shadow-brutal overflow-y-auto",
                  "prose prose-sm max-w-none",
                  "prose-headings:text-foreground prose-p:text-foreground",
                  "prose-strong:text-foreground prose-code:text-foreground",
                  "prose-a:text-primary"
                )}
                style={{ minHeight }}
                dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

MarkdownEditor.displayName = "MarkdownEditor";
