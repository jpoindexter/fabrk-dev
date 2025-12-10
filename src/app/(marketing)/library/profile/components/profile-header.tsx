/**
 * FABRK COMPONENT
 * Profile Header - Avatar, info, and stats section
 */

'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Edit, MapPin } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

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
    <Card tone="neutral">
      <CardHeader code="0x02" title="USER_PROFILE" />
      <CardContent padding="lg">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <Avatar className={cn(mode.radius, 'border-border h-32 w-32 border-2 shadow-none')}>
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback className={cn(mode.radius, mode.font, 'bg-muted text-2xl')}>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Info Section */}
          <div className="flex flex-1 flex-col gap-4">
            {/* Name + Buttons row */}
            <div className="flex items-center justify-between gap-4">
              <h2 className={cn(mode.font, 'text-2xl font-semibold tracking-tight')}>
                {user.name}
              </h2>
              <div className="flex gap-2">
                <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                  <Edit className="mr-1 h-3 w-3" />
                  &gt; EDIT_PROFILE
                </Button>
                <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                  &gt; PUBLIC_VIEW
                </Button>
              </div>
            </div>

            {/* Location */}
            <div className={cn(mode.font, 'text-muted-foreground flex items-center gap-1 text-sm')}>
              <MapPin className="h-3 w-3" />
              {user.location}
            </div>

            {/* Bio */}
            <p className={cn(mode.font, 'text-muted-foreground text-sm')}>{user.bio}</p>
          </div>
        </div>

        {/* Stats - bottom row in boxes */}
        <div className="border-border mt-6 flex border-t pt-6">
          {Object.entries(user.stats).map(([key, value], index) => (
            <div
              key={key}
              className={`border-border border px-4 py-2 text-center ${index > 0 ? 'border-l-0' : ''}`}
            >
              <div className="text-foreground text-xl font-semibold">{value}</div>
              <div className={cn(mode.font, 'text-muted-foreground text-xs uppercase')}>{key}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
