/**
 * Templates Navigation - Terminal console style
 * Breadcrumbs + dropdown menu for quick navigation
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeDropdown } from "@/components/theme/theme-dropdown";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  templatesNavigation,
  findTemplateByHref,
  toTerminalCase,
} from "@/app/templates/templates-nav-data";

export function TemplatesNav() {
  const pathname = usePathname();
  const { template, section } = findTemplateByHref(pathname);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo/Home Link - Terminal Style */}
        <Link href="/" className="flex items-center gap-1.5 transition-opacity hover:opacity-80 font-mono">
          <span className="text-xs text-primary">&gt;</span>
          <span className="text-sm font-bold tracking-tight">FABRK</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">_TEMPLATES</span>
        </Link>

        {/* Breadcrumbs - Center */}
        <div className="flex-1 flex justify-center">
          <Breadcrumb>
            <BreadcrumbList className="font-mono text-xs">
              {/* Root templates level - just show TEMPLATES as current */}
              {!section && !template && (
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground">
                    TEMPLATES
                  </BreadcrumbPage>
                </BreadcrumbItem>
              )}

              {/* Category level - show TEMPLATES > CATEGORY */}
              {section && !template && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/templates" className="text-muted-foreground hover:text-foreground">
                        TEMPLATES
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-foreground">
                      {toTerminalCase(section.title)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}

              {/* Template level - show TEMPLATES > CATEGORY > TEMPLATE */}
              {section && template && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/templates" className="text-muted-foreground hover:text-foreground">
                        TEMPLATES
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={section.href} className="text-muted-foreground hover:text-foreground">
                        {toTerminalCase(section.title)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-foreground">
                      {toTerminalCase(template.title)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right Side: Theme + Menu */}
        <div className="flex items-center gap-2">
          <ThemeDropdown />

          {/* Quick Navigation Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-none h-8 w-8">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-none border-border font-mono">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                [NAVIGATE]:
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/templates" className="text-xs">
                  &gt; TEMPLATES_HOME
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {templatesNavigation.map((navSection) => (
                <DropdownMenuItem key={navSection.id} asChild>
                  <Link href={navSection.href} className="text-xs">
                    &gt; {toTerminalCase(navSection.title)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
