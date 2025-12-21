/**
 * Profile Preview - User profile demo for hero playground
 */
'use client';

import { BrowserFrame } from './browser-frame';
import { LeftNavigation } from './left-navigation';
import { Reveal } from '@/components/motion';
import {
  mockProfileUser,
  mockProfileActivity,
  mockProfileProjects,
  mockProfileBadges,
} from './mock-data';

// Profile components
import { ProfileHeader } from '@/app/(marketing)/library/profile/components/profile-header';
import { BadgesSection } from '@/app/(marketing)/library/profile/components/badges-section';
import { ProfileTabs } from '@/app/(marketing)/library/profile/components/profile-tabs';

export function ProfilePreview() {
  return (
    <BrowserFrame>
      <LeftNavigation activeSection="profile" />
      <div className="flex-1 overflow-auto p-8">
        <div className="container mx-auto max-w-7xl space-y-6 [&_>*>*:first-child]:hidden">
          {/* Profile Header */}
          <Reveal delay={0}>
            <ProfileHeader user={mockProfileUser} />
          </Reveal>

          {/* Badges Section */}
          <Reveal delay={100}>
            <BadgesSection badges={mockProfileBadges} />
          </Reveal>

          {/* Profile Tabs */}
          <Reveal delay={200}>
            <ProfileTabs activity={mockProfileActivity} projects={mockProfileProjects} />
          </Reveal>
        </div>
      </div>
    </BrowserFrame>
  );
}
