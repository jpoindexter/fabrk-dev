/**
 * Dashboard Header Component
 * Displays welcome message and user avatar
 */

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  userName?: string | null;
  userImage?: string | null;
  userInitials: string;
}

export function DashboardHeader({
  userName,
  userImage,
  userInitials,
}: DashboardHeaderProps) {
  const firstName = userName?.split(" ")[0] || "User";

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">
          Welcome back, {firstName}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your account today.
        </p>
      </div>
      <Avatar className="h-12 w-12">
        <AvatarImage src={userImage || ""} />
        <AvatarFallback>{userInitials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
