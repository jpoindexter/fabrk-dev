/**
 * ✅ FABRK COMPONENT
 * Documentation Table of Contents
 * Production-ready ✓
 */

import { StyledCardHeader } from "@/components/ui/card";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

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
      className="border-border bg-card hidden w-64 border-b border-l xl:block"
      aria-label="Table of contents"
    >
      <StyledCardHeader code="0x00" title="TOC" />
      <div className="p-4">
        <div className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>[ON_THIS_PAGE]:</div>
        <nav>
          <ul className={cn(mode.font, "space-y-2 text-xs")}>
            {headings.map((heading, idx) => (
              <li key={idx}>
                <a
                  href={`#${heading.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted block px-2 py-1 transition-colors"
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
