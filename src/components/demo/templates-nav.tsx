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
  toDisplayCase,
} from "@/app/templates/templates-nav-data";
import { mode } from "@/lib/design-system/visual-mode";
import { cn } from "@/lib/utils";

export function TemplatesNav() {
  const pathname = usePathname();
  const { template, section } = findTemplateByHref(pathname);

  return (
    <nav className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo/Home Link - Terminal Style */}
        <Link
          href="/"
          className={cn("flex items-center gap-2 transition-opacity hover:opacity-80", mode.font)}
        >
          <span className="text-primary text-xs">&gt;</span>
          <span className="text-sm font-bold tracking-tight">FABRK</span>
          <span className="text-muted-foreground hidden text-xs sm:inline">_TEMPLATES</span>
        </Link>

        {/* Breadcrumbs - Center */}
        <div className="flex flex-1 justify-center">
          <Breadcrumb>
            <BreadcrumbList className={cn("text-xs", mode.font)}>
              {/* Root templates level - just show TEMPLATES as current */}
              {!section && !template && (
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground">TEMPLATES</BreadcrumbPage>
                </BreadcrumbItem>
              )}

              {/* Category level - show TEMPLATES > CATEGORY */}
              {section && !template && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href="/templates"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        TEMPLATES
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-foreground">
                      {toDisplayCase(section.title)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}

              {/* Template level - show TEMPLATES > CATEGORY > TEMPLATE */}
              {section && template && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href="/templates"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        TEMPLATES
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href={section.href}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {toDisplayCase(section.title)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-foreground">
                      {toDisplayCase(template.title)}
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
              <Button variant="outline" size="icon" className={cn("h-8 w-8", mode.radius)}>
                <Menu className="h-4 w-4" />
                <span className="sr-only">Navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={cn("border-border w-56 border", mode.radius, mode.font)}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
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
                    &gt; {toDisplayCase(navSection.title)}
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
