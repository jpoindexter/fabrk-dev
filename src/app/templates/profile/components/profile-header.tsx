/**
 * FABRK COMPONENT
 * Profile Header - Avatar, info, and stats section
 */

"use client";

import { Button } from "@/components/ui/button";
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
    <div className="border-border bg-card border">
      <div className="border-border border-b px-4 py-2">
        <span className="text-muted-foreground font-mono text-xs">[ [0x00] USER_PROFILE ]</span>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <Avatar className="border-border h-32 w-32 rounded-none border-2 shadow-none">
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback className="bg-muted rounded-none font-mono text-2xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Info Section */}
          <div className="flex flex-1 flex-col gap-4">
            {/* Name + Buttons row */}
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-mono text-2xl font-semibold">{user.name}</h2>
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
            <div className="text-muted-foreground flex items-center gap-1 font-mono text-sm">
              <MapPin className="h-3 w-3" />
              {user.location}
            </div>

            {/* Bio */}
            <p className="text-muted-foreground font-mono text-sm">{user.bio}</p>
          </div>
        </div>

        {/* Stats - bottom row in boxes */}
        <div className="border-border mt-6 flex border-t pt-6">
          {Object.entries(user.stats).map(([key, value], index) => (
            <div
              key={key}
              className={`border-border border px-4 py-2 text-center ${index > 0 ? "border-l-0" : ""}`}
            >
              <div className="text-xl font-bold">{value}</div>
              <div className="text-muted-foreground font-mono text-xs uppercase">{key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
