/**
 * Showcase Navigation Component
 * Shared navigation for all showcase pages
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Sparkles,
  Users,
  BarChart3,
  Home,
  ChevronRight,
  MonitorPlay,
} from "lucide-react";
import { cn } from "@/lib/utils";

const showcasePages = [
  {
    title: "What's Included",
    href: "/demo",
    icon: Sparkles,
    description: "Complete overview",
    badge: "Start Here",
  },
  {
    title: "UI Components",
    href: "/components",
    icon: Palette,
    description: "100+ components",
    badge: "Interactive",
  },
  {
    title: "Admin Dashboard",
    href: "/examples/admin",
    icon: Users,
    description: "User management",
    badge: "Example",
  },
  {
    title: "Analytics",
    href: "/examples/analytics",
    icon: BarChart3,
    description: "Metrics dashboard",
    badge: "Example",
  },
];

export function ShowcaseNav() {
  const pathname = usePathname();

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent className="pt-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Showcase Pages</h3>
          <Link href="/">
            <Button variant="outline" size="sm">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {showcasePages.map((page) => {
            const Icon = page.icon;
            const isActive = pathname === page.href;

            return (
              <Link key={page.href} href={page.href} className="block">
                <div
                  className={cn(
                    "p-4 rounded-none border-2 transition-all",
                    "hover:border-primary/50 hover:shadow-sm",
                    isActive
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-background"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <Badge
                      variant={isActive ? "default" : "outline"}
                      className="text-xs"
                    >
                      {page.badge}
                    </Badge>
                  </div>
                  <h4
                    className={cn(
                      "font-semibold text-sm mb-1",
                      isActive ? "text-primary" : "text-foreground"
                    )}
                  >
                    {page.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {page.description}
                  </p>
                  {isActive && (
                    <div className="mt-2 flex items-center text-xs text-primary">
                      <span>Current page</span>
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
