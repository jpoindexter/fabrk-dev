/* eslint-disable design-system/no-hardcoded-colors */
/**
 * Profile Page Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { Star, GitBranch, MessageSquare, Award, Zap, TrendingUp, Activity } from 'lucide-react';
import { Card, CardHeader, CardContent, TemplatePageHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { LibraryNavigation } from '@/components/library';
import { ProfileHeader } from './components/profile-header';
import { BadgesSection } from './components/badges-section';
import { ProfileTabs } from './components/profile-tabs';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { Star, GitBranch, MessageSquare, Award, Zap, TrendingUp, Activity } from "lucide-react";
import { ProfileHeader } from "./components/profile-header";
import { BadgesSection } from "./components/badges-section";
import { ProfileTabs } from "./components/profile-tabs";

const mockUser = {
  name: "Alex Chen",
  username: "alexchen",
  email: "alex@fabrek.dev",
  avatar: null,
  bio: "Full-stack developer passionate about building great user experiences. Open source contributor.",
  location: "San Francisco, CA",
  website: "https://alexchen.dev",
  joinDate: "January 2024",
  role: "Pro Member",
  stats: {
    projects: 12,
    contributions: 847,
    followers: 234,
    following: 89,
  },
};

const mockActivity = [
  {
    id: "1",
    type: "commit",
    title: "Pushed 3 commits to fabrk/dashboard",
    timestamp: "2 hours ago",
    icon: GitBranch,
  },
  {
    id: "2",
    type: "comment",
    title: 'Commented on issue #142: "Add dark mode support"',
    timestamp: "5 hours ago",
    icon: MessageSquare,
  },
  {
    id: "3",
    type: "star",
    title: "Starred repository fabrk/ui-components",
    timestamp: "1 day ago",
    icon: Star,
  },
];

const mockProjects = [
  {
    id: "1",
    name: "dashboard-v2",
    description: "Next.js dashboard with analytics",
    stars: 45,
    language: "TypeScript",
    updated: "2 hours ago",
  },
  {
    id: "2",
    name: "api-gateway",
    description: "Microservices API gateway",
    stars: 128,
    language: "Go",
    updated: "1 day ago",
  },
];

const mockBadges = [
  { id: "1", name: "Early Adopter", icon: Zap, color: "primary" },
  { id: "2", name: "Top Contributor", icon: TrendingUp, color: "success" },
  { id: "3", name: "Bug Hunter", icon: Activity, color: "warning" },
  { id: "4", name: "Team Player", icon: Award, color: "primary" },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Profile Header */}
      <ProfileHeader user={mockUser} />

      {/* Badges Section */}
      <BadgesSection badges={mockBadges} />

      {/* Profile Tabs */}
      <ProfileTabs activity={mockActivity} projects={mockProjects} />
    </div>
  );
}`;

const mockUser = {
  name: 'Alex Chen',
  username: 'alexchen',
  email: 'alex@fabrek.dev',
  avatar: null,
  bio: 'Full-stack developer passionate about building great user experiences. Open source contributor.',
  location: 'San Francisco, CA',
  website: 'https://alexchen.dev',
  joinDate: 'January 2024',
  role: 'Pro Member',
  stats: {
    projects: 12,
    contributions: 847,
    followers: 234,
    following: 89,
  },
};

const mockActivity = [
  {
    id: '1',
    type: 'commit',
    title: 'Pushed 3 commits to fabrk/dashboard',
    timestamp: '2 hours ago',
    icon: GitBranch,
  },
  {
    id: '2',
    type: 'comment',
    title: 'Commented on issue #142: "Add dark mode support"',
    timestamp: '5 hours ago',
    icon: MessageSquare,
  },
  {
    id: '3',
    type: 'star',
    title: 'Starred repository fabrk/ui-components',
    timestamp: '1 day ago',
    icon: Star,
  },
  {
    id: '4',
    type: 'commit',
    title: 'Merged PR #89 into main',
    timestamp: '2 days ago',
    icon: GitBranch,
  },
  {
    id: '5',
    type: 'achievement',
    title: 'Earned badge: "100 Contributions"',
    timestamp: '3 days ago',
    icon: Award,
  },
];

const mockProjects = [
  {
    id: '1',
    name: 'dashboard-v2',
    description: 'Next.js dashboard with analytics',
    stars: 45,
    language: 'TypeScript',
    updated: '2 hours ago',
  },
  {
    id: '2',
    name: 'api-gateway',
    description: 'Microservices API gateway',
    stars: 128,
    language: 'Go',
    updated: '1 day ago',
  },
  {
    id: '3',
    name: 'mobile-app',
    description: 'React Native mobile application',
    stars: 67,
    language: 'TypeScript',
    updated: '3 days ago',
  },
];

const mockBadges = [
  { id: '1', name: 'Early Adopter', icon: Zap, color: 'primary' },
  { id: '2', name: 'Top Contributor', icon: TrendingUp, color: 'success' },
  { id: '3', name: 'Bug Hunter', icon: Activity, color: 'warning' },
  { id: '4', name: 'Team Player', icon: Award, color: 'primary' },
];

function ProfilePreview() {
  return (
    <div className="bg-background/50 min-h-[600px] p-4 sm:p-8">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Profile Header */}
        <ProfileHeader user={mockUser} />

        {/* Badges Section */}
        <BadgesSection badges={mockBadges} />

        {/* Profile Tabs */}
        <ProfileTabs activity={mockActivity} projects={mockProjects} />
      </div>
    </div>
  );
}

export default function ProfilePageTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Navigation */}
        <LibraryNavigation templateName="Profile Page" />

        {/* Header */}
        <TemplatePageHeader
          badge="PROFILE PAGE"
          title="Profile Page"
          description="User profile with stats, activity feed, projects, and badges"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  'h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0',
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [CODE]
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE PREVIEW" />
              <ProfilePreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className="text-muted-foreground">[FILES]:</div>
              <div className="space-y-1 pl-4">
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">(dashboard)/</span>
                  <span className="text-foreground">profile/page.tsx</span>
                  <span className="text-muted-foreground ml-4">← Copy template here</span>
                </div>
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">(dashboard)/profile/components/</span>
                  <span className="text-foreground">profile-header.tsx</span>
                </div>
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">(dashboard)/profile/components/</span>
                  <span className="text-foreground">badges-section.tsx</span>
                </div>
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">(dashboard)/profile/components/</span>
                  <span className="text-foreground">profile-tabs.tsx</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x03" title="FEATURES" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-2 text-xs')}>
              <div>
                <span className="text-success">&gt;</span> User profile header with avatar and stats
              </div>
              <div>
                <span className="text-success">&gt;</span> Achievement badges display
              </div>
              <div>
                <span className="text-success">&gt;</span> Tabbed navigation (Activity, Projects)
              </div>
              <div>
                <span className="text-success">&gt;</span> Activity feed with timestamps
              </div>
              <div>
                <span className="text-success">&gt;</span> Project cards with stats
              </div>
              <div>
                <span className="text-success">&gt;</span> Responsive mobile-first design
              </div>
              <div>
                <span className="text-success">&gt;</span> DS-compliant (mode.font, mode.radius)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
