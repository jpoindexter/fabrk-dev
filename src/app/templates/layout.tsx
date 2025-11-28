"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TerminalBackground } from "@/components/landing/terminal-background";
import { TemplatesNav } from "@/components/demo/templates-nav";
import { Footer } from "@/components/landing/footer";
import {
  templatesNavigation,
  toTerminalCase,
} from "@/app/templates/templates-nav-data";

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex flex-col font-mono">
      <TemplatesNav />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-border md:block overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-primary/50">
          {/* Sidebar Header */}
          <div className="border-b border-border px-4 py-3">
            <div className="text-xs text-muted-foreground">[NAV]:</div>
            <div className="text-xs text-foreground">TEMPLATE_BROWSER</div>
          </div>
          <nav className="space-y-6 p-4">
            {templatesNavigation.map((section) => {
              const isSectionActive = pathname === section.href;
              const SectionIcon = section.icon;

              return (
                <div key={section.id}>
                  {/* Category Header */}
                  <Link
                    href={section.href}
                    className={cn(
                      "mb-2 flex items-center gap-2 px-2 text-xs transition-colors",
                      isSectionActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <SectionIcon className="h-4 w-4" />
                    [{toTerminalCase(section.title)}]:
                  </Link>

                  {/* Template Items */}
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2 px-2 py-1.5 text-xs transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {isActive && <span className="text-primary-foreground">&gt;</span>}
                          {!isActive && <span className="opacity-0">&gt;</span>}
                          <Icon className="h-3 w-3" />
                          {toTerminalCase(item.title)}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 relative">
          <TerminalBackground />
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
