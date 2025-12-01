/**
 * DocsToc - Table of Contents right sidebar
 * Extracts h2 headings from page content
 */
"use client";

import { useState, useEffect, RefObject } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface TocHeading {
  id: string;
  text: string;
}

interface DocsTocProps {
  mainRef: RefObject<HTMLElement | null>;
  className?: string;
}

export function DocsToc({ mainRef, className }: DocsTocProps) {
  const pathname = usePathname();
  const [tocHeadings, setTocHeadings] = useState<TocHeading[]>([]);

  useEffect(() => {
    // Small delay to ensure content is rendered
    const timer = setTimeout(() => {
      if (mainRef.current) {
        const headings = mainRef.current.querySelectorAll("h2");
        const items = Array.from(headings).map((heading) => {
          // Create ID from heading text if not present
          const text = heading.textContent || "";
          const id = heading.id || text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          if (!heading.id) {
            heading.id = id;
          }
          return { id, text };
        });
        setTocHeadings(items);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, mainRef]);

  return (
    <aside
      className={cn(
        "sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-l border-border xl:block overflow-y-auto bg-background isolate",
        className
      )}
      aria-label="Table of contents"
    >
      <div className="p-4">
        <div className="mb-4 font-mono text-sm text-muted-foreground">[ON_THIS_PAGE]:</div>
        {tocHeadings.length > 0 ? (
          <nav>
            <ul className="space-y-2 font-mono text-xs">
              {tocHeadings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className="flex items-start gap-1 text-muted-foreground hover:text-foreground hover:bg-muted px-2 py-1 transition-colors"
                  >
                    <span className="shrink-0">&gt;</span>
                    <span className="break-words">{heading.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <p className="font-mono text-sm text-muted-foreground/50 px-2">No sections found</p>
        )}
      </div>
    </aside>
  );
}
