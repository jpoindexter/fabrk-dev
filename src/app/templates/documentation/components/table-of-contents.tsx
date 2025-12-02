/**
 * ✅ FABRK COMPONENT
 * Documentation Table of Contents
 * Production-ready ✓
 */

export function TableOfContents() {
  const headings = [
    "Prerequisites",
    "Installation",
    "Environment Setup",
    "Database Setup",
    "Start Development",
    "Next Steps",
  ];

  return (
    <aside
      className="hidden w-64 border-l border-b border-border bg-card xl:block"
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-none bg-destructive/50" />
          <div className="size-2 rounded-none bg-warning/50" />
          <div className="size-2 rounded-none bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">toc.tsx</span>
      </div>
      <div className="p-4">
        <div className="mb-4 font-mono text-xs text-muted-foreground">[ON_THIS_PAGE]:</div>
        <nav>
          <ul className="space-y-2 font-mono text-xs">
            {headings.map((heading, idx) => (
              <li key={idx}>
                <a
                  href={`#${heading.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-muted-foreground hover:text-foreground hover:bg-muted px-2 py-1 transition-colors"
                >
                  &gt; {heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
