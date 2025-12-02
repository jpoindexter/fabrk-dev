/**
 * FABRK COMPONENT
 * Profile Header - Avatar, info, and stats section
 */

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, MapPin } from "lucide-react";

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
        <div className="flex gap-2">
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
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <Avatar className="h-32 w-32 border-2 border-border rounded-none shadow-none">
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback className="rounded-none bg-muted text-2xl font-mono">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Info Section */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Name + Buttons row */}
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <div className="flex gap-2">
                <Button className="rounded-none font-mono text-xs">
                  <Edit className="mr-1 h-3 w-3" />
                  &gt; EDIT_PROFILE
                </Button>
                <Button variant="outline" className="rounded-none font-mono text-xs">
                  &gt; PUBLIC_VIEW
                </Button>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 font-mono text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {user.location}
            </div>

            {/* Bio */}
            <p className="font-mono text-sm text-muted-foreground">{user.bio}</p>
          </div>
        </div>

        {/* Stats - bottom row in boxes */}
        <div className="flex mt-6 pt-6 border-t border-border">
          {Object.entries(user.stats).map(([key, value], index) => (
            <div key={key} className={`text-center px-4 py-2 border border-border ${index > 0 ? 'border-l-0' : ''}`}>
              <div className="text-xl font-bold">{value}</div>
              <div className="font-mono text-xs text-muted-foreground uppercase">
                {key}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
