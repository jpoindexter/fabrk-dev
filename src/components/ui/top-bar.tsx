"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface TopBarUser {
  name: string;
  email: string;
  image?: string | null;
}

export interface TopBarMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  destructive?: boolean;
}

export interface TopBarProps {
  /** Logo element or component */
  logo?: React.ReactNode;
  /** Current user info for avatar and menu */
  user?: TopBarUser;
  /** User menu items */
  userMenuItems?: TopBarMenuItem[];
  /** Show search input */
  showSearch?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Search change handler */
  onSearchChange?: (value: string) => void;
  /** Show notification badge */
  showNotifications?: boolean;
  /** Notification count */
  notificationCount?: number;
  /** Notification click handler */
  onNotificationClick?: () => void;
  /** Mobile menu trigger click handler */
  onMobileMenuClick?: () => void;
  /** Show mobile menu button */
  showMobileMenu?: boolean;
  /** Additional content on the right side */
  rightContent?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export function TopBar({
  logo,
  user,
  userMenuItems = [],
  showSearch = false,
  searchPlaceholder = "Search...",
  onSearchChange,
  showNotifications = false,
  notificationCount = 0,
  onNotificationClick,
  onMobileMenuClick,
  showMobileMenu = true,
  rightContent,
  className,
}: TopBarProps) {
  const userInitials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header
      className={cn("border-border bg-background sticky top-0 z-50 w-full border-b", className)}
    >
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Left: Mobile menu + Logo */}
        <div className="flex items-center gap-4">
          {showMobileMenu && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onMobileMenuClick}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {logo && (
            <Link href="/" className="flex items-center gap-2">
              {logo}
            </Link>
          )}
        </div>

        {/* Center: Search (optional) */}
        {showSearch && (
          <div className="mx-4 hidden max-w-md flex-1 md:block">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                className={cn("pl-9", mode.font, "text-xs")}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Right: Notifications + User Menu + Custom content */}
        <div className="flex items-center gap-2">
          {rightContent}

          {showNotifications && (
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onNotificationClick}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center p-0 text-[10px]"
                >
                  {notificationCount > 99 ? "99+" : notificationCount}
                </Badge>
              )}
            </Button>
          )}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn("relative h-9 w-9 p-0", mode.radius)}
                  aria-label="User menu"
                >
                  <Avatar className="border-border h-9 w-9 border">
                    <AvatarImage src={user.image || ""} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={cn("border-border w-56 border", mode.radius)}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className={cn("text-sm leading-none font-medium", mode.font)}>{user.name}</p>
                    <p className={cn("text-muted-foreground text-xs leading-none", mode.font)}>
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                {userMenuItems.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    {userMenuItems.map((item, index) => (
                      <DropdownMenuItem
                        key={index}
                        asChild={!!item.href}
                        onClick={item.onClick}
                        className={cn("cursor-pointer", item.destructive && "text-destructive")}
                      >
                        {item.href ? (
                          <Link href={item.href}>
                            {item.icon && <span className="mr-2">{item.icon}</span>}
                            {item.label}
                          </Link>
                        ) : (
                          <>
                            {item.icon && <span className="mr-2">{item.icon}</span>}
                            {item.label}
                          </>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
