/**
 * @ai-context Main application layout with navigation
 * @ai-purpose Provides consistent layout across all pages
 * @ai-can-modify Add navigation items, change layout structure
 */

"use client";

import { TierBadge } from "@/components/dashboard/TierBadge";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { tokens, cn } from "@/lib/design-system/tokens";
import {
  Bell,
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Palette,
  Settings,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  adminOnly?: boolean;
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className={tokens.sizes.icon.sm} />,
  },
  {
    title: "AI Studio",
    href: "/studio",
    icon: <Palette className={tokens.sizes.icon.sm} />,
    badge: "New",
  },
  {
    title: "Pricing",
    href: "/pricing",
    icon: <Sparkles className={tokens.sizes.icon.sm} />,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: <CreditCard className={tokens.sizes.icon.sm} />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className={tokens.sizes.icon.sm} />,
  },
  {
    title: "Admin",
    href: "/admin",
    icon: <Shield className={tokens.sizes.icon.sm} />,
    adminOnly: true,
    badge: "Admin",
  },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Get user data from session

  const { data: session } = useSession();
  const user = session?.user || null;

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const NavItems = () => (
    <>
      {navigation
        .filter((item) => !item.adminOnly || isAdmin)
        .map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
              {item.badge && (
                <Badge variant="outline" className="ms-auto">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
    </>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-background/95">
        <div className={cn(tokens.responsive.container.default, "flex h-12 items-center")}>
          <div className="me-4 flex">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
                  aria-label="Action button"
                >
                  <Menu className={tokens.sizes.icon.md} />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav role="navigation" className={cn("flex flex-col", "space-y-1")}>
                  <Link
                    href="/"
                    className={cn("mb-4 flex items-center", "gap-2")}
                  >
                    <Home className={tokens.sizes.icon.md} />
                    <span className="font-medium">Fabrk</span>
                  </Link>
                  {/* Navigation items */}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className={cn("me-6 flex items-center", "gap-2")}>
              <Home className={tokens.sizes.icon.md} />
              <span className="hidden font-medium sm:inline-block">Fabrk</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            role="navigation"
            className={cn(
              "hidden items-center md:flex",
              "gap-6",
              "text-sm font-medium"
            )}
          >
            {navigation
              .filter((item) => !item.adminOnly || isAdmin)
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center",
                      "gap-2",
                      "transition-colors hover:text-foreground/80",
                      isActive ? "text-foreground" : "text-foreground/60"
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="outline" className="ms-1">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
          </nav>

          {/* Right side actions */}
          <div className={cn("ms-auto flex items-center", "gap-4")}>
            <ThemeToggle />

            <Button
              variant="ghost"
              size="sm"
              className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Action button"
            >
              <Bell className={tokens.sizes.icon.md} />
              <span
                className={cn(
                  "absolute -right-1 -top-1",
                  "h-2 w-2",
                  "rounded-full border- border-background bg-foreground"
                )}
              />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn("relative", "h-10 w-10", "rounded-full")}
                  aria-label="Action button"
                  data-testid="user-menu"
                >
                  <Avatar className={"size-10"}>
                    <AvatarImage src={user?.image || undefined} alt={user?.name || undefined} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className={cn("flex flex-col", "space-y-1")}>
                    <div className="flex items-center justify-between">
                      <p className={`${tokens.text.size.sm} font-medium leading-none`}>
                        {user?.name || "User"}
                      </p>
                      <TierBadge
                        tier={user?.subscriptionTier || "trial"}
                        size="sm"
                        showIcon={false}
                      />
                    </div>
                    <p
                      className={`${tokens.text.size.xs} leading-none text-muted-foreground dark:text-muted-foreground`}
                    >
                      {user?.email || ""}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Users className={cn("me-2", tokens.sizes.icon.sm)} />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className={cn("me-2", tokens.sizes.icon.sm)} />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className={cn("me-2", tokens.sizes.icon.sm)} />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  data-testid="logout-button"
                >
                  <LogOut className={cn("me-2", tokens.sizes.icon.sm)} />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={tokens.responsive.container.default}>{children}</main>
    </div>
  );
}
