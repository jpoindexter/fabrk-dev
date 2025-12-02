/**
 * FABRK COMPONENT
 * Terminal Header - Console-style header with dots
 */

interface TerminalHeaderProps {
  filename: string;
}

export function TerminalHeader({ filename }: TerminalHeaderProps) {
  return (
    <div className="border-border flex items-center gap-2 border-b px-4 py-2">
      <div className="flex gap-2">
        <div className="bg-destructive/50 size-2 rounded-full" />
        <div className="bg-warning/50 size-2 rounded-full" />
        <div className="bg-success/50 size-2 rounded-full" />
      </div>
      <span className="text-muted-foreground font-mono text-xs">{filename}</span>
    </div>
  );
}
