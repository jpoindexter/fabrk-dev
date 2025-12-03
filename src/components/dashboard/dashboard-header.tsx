/**
 * FABRK COMPONENT
 * Dashboard Header Component
 * Shared header for all dashboard pages with org switcher
 */

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Settings,
  CreditCard,
  Code,
  LogOut,
  User,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/home/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OrgSwitcher } from "@/components/organization/org-switcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NotificationCenter } from "@/components/notifications/notification-center";

export function DashboardHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Mock user data for showcase (no authentication required)
  const mockUser = {
    name: "Demo User",
    email: "demo@fabrk.dev",
    image: null,
    role: "USER",
  };

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/billing", label: "Billing", icon: CreditCard },
    { href: "/developer/api-keys", label: "API Keys", icon: Code },
  ];

  const userInitials = mockUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const isAdmin = false; // No admin for showcase

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo size={28} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith("/admin") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          )}
        </nav>

        {/* Right Section: Org Switcher + Notifications + User Menu */}
        <div className="flex items-center gap-4">
          {/* Organization Switcher */}
          <div className="hidden lg:block">
            <OrgSwitcher />
          </div>

          {/* Notification Center */}
          <NotificationCenter />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-none"
                aria-label="User menu"
              >
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={mockUser.image || ""} alt={mockUser.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 rounded-none border border-border shadow"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {mockUser.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {mockUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/security" className="cursor-pointer">
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer text-primary">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="cursor-pointer text-muted-foreground">
                  <LogOut className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Toggle mobile menu">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 py-6">
                {/* Mobile Org Switcher */}
                <div>
                  <p className="mb-2 text-sm font-medium text-muted-foreground">Organization</p>
                  <OrgSwitcher className="w-full" />
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Navigation</p>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-4 rounded-none border border-border px-4 py-4 text-sm font-medium transition-all",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-card hover:bg-primary hover:text-primary-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-4 rounded-none border border-border px-4 py-4 text-sm font-medium transition-all",
                        pathname.startsWith("/admin")
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-card hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      <Shield className="h-5 w-5" />
                      Admin
                    </Link>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
