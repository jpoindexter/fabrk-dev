/**
 * FABRK COMPONENT
 * Profile Page Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Edit,
  Settings,
  Activity,
  Star,
  GitBranch,
  MessageSquare,
  Award,
  Zap,
  TrendingUp,
} from "lucide-react";

const mockUser = {
  name: "Alex Chen",
  username: "alexchen",
  email: "alex@fabrk.dev",
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
  {
    id: "4",
    type: "commit",
    title: "Merged PR #89 into main",
    timestamp: "2 days ago",
    icon: GitBranch,
  },
  {
    id: "5",
    type: "achievement",
    title: 'Earned badge: "100 Contributions"',
    timestamp: "3 days ago",
    icon: Award,
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
  {
    id: "3",
    name: "mobile-app",
    description: "React Native mobile application",
    stars: 67,
    language: "TypeScript",
    updated: "3 days ago",
  },
];

const mockBadges = [
  { id: "1", name: "Early Adopter", icon: Zap, color: "primary" },
  { id: "2", name: "Top Contributor", icon: TrendingUp, color: "success" },
  { id: "3", name: "Bug Hunter", icon: Activity, color: "warning" },
  { id: "4", name: "Team Player", icon: Award, color: "primary" },
];

export default function ProfilePageTemplate() {
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block border border-border px-3 py-1">
            <span className="font-mono text-xs text-muted-foreground">
              [TEMPLATE]: PROFILE_PAGE
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Profile Page
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            User profile with stats, activity feed, projects, and badges
          </p>
        </div>

        {/* Profile Card */}
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
                  <AvatarImage src={mockUser.avatar || undefined} />
                  <AvatarFallback className="rounded-none bg-muted text-2xl font-mono">
                    {mockUser.name
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
                    <h2 className="text-2xl font-semibold">{mockUser.name}</h2>
                    <Badge className="rounded-none font-mono text-xs bg-primary/20 text-primary border-primary/50">
                      {mockUser.role}
                    </Badge>
                  </div>
                  <div className="font-mono text-sm text-muted-foreground">
                    @{mockUser.username}
                  </div>
                </div>

                <p className="font-mono text-sm">{mockUser.bio}</p>

                <div className="flex flex-wrap gap-4 font-mono text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {mockUser.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {mockUser.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" />
                    <a
                      href={mockUser.website}
                      className="text-primary hover:underline"
                    >
                      {mockUser.website.replace("https://", "")}
                    </a>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Joined {mockUser.joinDate}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 pt-2">
                  {Object.entries(mockUser.stats).map(([key, value]) => (
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

        {/* Badges Section */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              badges.tsx
            </span>
          </div>
          <div className="p-4">
            <div className="font-mono text-xs text-muted-foreground mb-3">
              [ACHIEVEMENTS]: {mockBadges.length} BADGES_EARNED
            </div>
            <div className="flex flex-wrap gap-3">
              {mockBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className="flex items-center gap-2 border border-border px-3 py-2 bg-muted/30"
                  >
                    <Icon className={`h-4 w-4 text-${badge.color}`} />
                    <span className="font-mono text-xs">{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              content.tsx
            </span>
          </div>

          <div className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="rounded-none border border-border bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="activity"
                  className="rounded-none font-mono text-xs px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Activity className="mr-1 h-3 w-3" />
                  [ACTIVITY]
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="rounded-none font-mono text-xs px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <GitBranch className="mr-1 h-3 w-3" />
                  [PROJECTS]
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="mt-4">
                <div className="space-y-2">
                  {mockActivity.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 border border-border p-3 hover:bg-muted/30 transition-colors"
                      >
                        <div className="p-2 border border-border bg-muted/30">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="font-mono text-sm">{item.title}</div>
                          <div className="font-mono text-[10px] text-muted-foreground">
                            {item.timestamp}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="projects" className="mt-4">
                <div className="space-y-2">
                  {mockProjects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-border p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm font-medium text-primary">
                              {project.name}
                            </span>
                            <Badge className="rounded-none font-mono text-[10px] bg-muted text-muted-foreground">
                              {project.language}
                            </Badge>
                          </div>
                          <p className="font-mono text-xs text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                          <Star className="h-3 w-3" />
                          {project.stars}
                        </div>
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground mt-2">
                        Updated {project.updated}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Features Card */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              features.md
            </span>
          </div>
          <div className="p-4">
            <div className="mb-3 font-mono text-xs text-muted-foreground">
              [TEMPLATE_FEATURES]:
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> User info card with
                avatar
              </div>
              <div>
                <span className="text-success">&gt;</span> Stats display
                (projects, contributions, followers)
              </div>
              <div>
                <span className="text-success">&gt;</span> Achievement badges
              </div>
              <div>
                <span className="text-success">&gt;</span> Activity feed with
                timestamps
              </div>
              <div>
                <span className="text-success">&gt;</span> Projects tab with
                star counts
              </div>
              <div>
                <span className="text-success">&gt;</span> Edit profile and
                settings actions
              </div>
              <div>
                <span className="text-success">&gt;</span> Responsive layout
              </div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: Connect to your user service to populate real data and
              upload avatars.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
