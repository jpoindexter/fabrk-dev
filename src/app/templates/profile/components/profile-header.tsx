/**
 * FABRK COMPONENT
 * Profile Header - Avatar, info, and stats section
 */

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Edit,
  Settings,
} from "lucide-react";

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
          {/* Avatar Section */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Avatar className="h-32 w-32 border-2 border-border rounded-none">
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback className="rounded-none bg-muted text-2xl font-mono">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Button className="rounded-none font-mono text-xs">
                <Edit className="mr-1 h-3 w-3" />
                &gt; EDIT_PROFILE
              </Button>
              <Button
                variant="outline"
                className="rounded-none font-mono text-xs"
              >
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <Badge className="rounded-none font-mono text-xs">
                  {user.role}
                </Badge>
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                @{user.username}
              </div>
            </div>

            <p className="font-mono text-sm">{user.bio}</p>

            <div className="flex flex-wrap gap-4 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {user.email}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {user.location}
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="h-3 w-3" />
                <a
                  href={user.website}
                  className="text-primary hover:underline"
                >
                  {user.website.replace("https://", "")}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Joined {user.joinDate}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 pt-2">
              {Object.entries(user.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-xl font-bold">{value}</div>
                  <div className="font-mono text-xs text-muted-foreground uppercase">
                    {key}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
