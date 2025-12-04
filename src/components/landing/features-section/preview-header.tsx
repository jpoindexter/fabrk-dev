/**
 * Terminal Header Component
 * Reusable window header with terminal-style title
 */
"use client";

interface PreviewHeaderProps {
  title: string;
  animated?: boolean;
}

export function PreviewHeader({ title }: PreviewHeaderProps) {
  return (
    <div className="border-border flex items-center gap-2 border-b px-4 py-2">
      <span className="text-muted-foreground font-mono text-xs">[ {title} ]</span>
    </div>
  );
}
