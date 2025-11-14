/**
 * ✅ FABRK COMPONENT
 * Card component for displaying organization info (logo, name, member count, plan badge).
 *
 * @example
 * ```tsx
 * <OrgCard
 *   name="Acme Corp"
 *   memberCount={12}
 *   plan="Pro"
 *   onSelect={() => {}}
 * />
 * ```
 */

"use client";

import * as React from "react";
import { Users, Crown, CheckCircle2, MoreVertical, Settings, LogOut } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface OrgCardProps {
  id?: string;
  name: string;
  logo?: string;
  memberCount: number;
  plan: "Free" | "Starter" | "Pro" | "Enterprise";
  role?: "Owner" | "Admin" | "Member";
  isActive?: boolean;
  onSelect?: () => void;
  onSettings?: () => void;
  onLeave?: () => void;
  className?: string;
}

const planColors = {
  Free: "bg-muted text-muted-foreground",
  Starter: "bg-primary/10 text-primary border-primary/20",
  Pro: "bg-accent text-accent-foreground",
  Enterprise: "bg-gradient-to-r from-primary to-accent text-primary-foreground",
};

export function OrgCard({
  id,
  name,
  logo,
  memberCount,
  plan,
  role = "Member",
  isActive = false,
  onSelect,
  onSettings,
  onLeave,
  className,
}: OrgCardProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card
      className={cn(
        "group relative cursor-pointer transition-all duration-200 hover:shadow-brutal-lg",
        isActive && "ring-2 ring-primary shadow-brutal-lg",
        className
      )}
      onClick={onSelect}
    >
      <CardContent className="p-6">
        {/* Active indicator */}
        {isActive && (
          <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-brutal">
            <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
          </div>
        )}

        <div className="flex items-start justify-between gap-4">
          {/* Left side - Logo & Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <Avatar className="h-12 w-12 rounded-brutal border-2 border-brutal shadow-brutal">
              {logo ? (
                <AvatarImage src={logo} alt={name} />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-black">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 min-w-0 space-y-2">
              <div className="space-y-1">
                <h3 className="font-black text-foreground text-lg truncate">{name}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className={cn("font-medium text-xs", planColors[plan])}
                  >
                    {plan}
                  </Badge>
                  {role === "Owner" && (
                    <Badge variant="outline" className="font-medium text-xs">
                      <Crown className="mr-1 h-3 w-3" />
                      {role}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {memberCount} member{memberCount !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              {onSettings && (
                <>
                  <DropdownMenuItem onClick={onSettings}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              {onLeave && role !== "Owner" && (
                <DropdownMenuItem
                  onClick={onLeave}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Leave org
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
