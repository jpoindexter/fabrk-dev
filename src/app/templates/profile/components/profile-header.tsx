/**
 * FABRK COMPONENT
 * Profile Header - Avatar, info, and stats section
 */

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit } from "lucide-react";

interface UserStats {
  projects: number;
  contributions: number;
  followers: number;
  following: number;
}

interface User {
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  role: string;
  stats: UserStats;
}

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          profile.tsx
        </span>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section - spans full height */}
          <div className="flex-shrink-0">
            <Avatar className="h-40 w-40 border-2 border-border rounded-none shadow-none">
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback className="rounded-none bg-muted text-3xl font-mono">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Info Section - stacked vertically */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Name + Email */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <Badge className="rounded-none font-mono text-xs">
                  {user.role}
                </Badge>
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                {user.email}
              </div>
            </div>

            {/* Stats - boxed row */}
            <div className="flex">
              {Object.entries(user.stats).map(([key, value]) => (
                <div key={key} className="text-center px-4 py-2 border border-border first:border-r-0 [&:nth-child(2)]:border-r-0 [&:nth-child(3)]:border-r-0">
                  <div className="text-xl font-bold">{value}</div>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase">
                    {key}
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <p className="font-mono text-sm text-muted-foreground">{user.bio}</p>

            {/* Action Button */}
            <div>
              <Button className="rounded-none font-mono text-xs">
                <Edit className="mr-1 h-3 w-3" />
                &gt; EDIT_PROFILE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
