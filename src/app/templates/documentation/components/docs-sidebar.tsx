/**
 * ✅ FABRK COMPONENT
 * Documentation Sidebar Navigation
 * Production-ready ✓
 */

import { Badge } from "@/components/ui/badge";
import { docsStructure, docContent } from "./docs-data";

interface DocsSidebarProps {
  activeDoc: string;
  onDocChange: (docId: string) => void;
}

export function DocsSidebar({ activeDoc, onDocChange }: DocsSidebarProps) {
  return (
    <aside className="w-64 border-r border-b border-border bg-card">
      <nav className="space-y-6 p-4">
        {docsStructure.map((section, idx) => {
          const Icon = section.icon;
          return (
            <div key={idx}>
              <div className="mb-4 flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <h3 className="font-mono text-xs font-bold">
                  [{section.section.toUpperCase().replace(/ /g, "_")}]:
                </h3>
              </div>
              <ul className="space-y-1">
                {section.pages.map((page) => {
                  const hasContent = page.id in docContent;
                  return (
                    <li key={page.id}>
                      <button
                        onClick={() => hasContent && onDocChange(page.id)}
                        disabled={!hasContent}
                        className={`flex w-full items-center justify-between px-4 py-2 text-left font-mono text-xs transition-colors ${
                          activeDoc === page.id
                            ? "bg-primary text-primary-foreground"
                            : hasContent
                            ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                            : "text-muted-foreground/50 cursor-not-allowed"
                        }`}
                      >
                        <span>{page.title}</span>
                        {page.badge && (
                          <Badge
                            variant={activeDoc === page.id ? "secondary" : "outline"}
                            className="text-xs rounded-none py-0 h-5"
                          >
                            {page.badge}
                          </Badge>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
