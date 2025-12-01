/**
 * FABRK COMPONENT
 * Profile Page Template - Terminal console style
 * Production-ready
 */

"use client";

import {
  Star,
  GitBranch,
  MessageSquare,
  Award,
  Zap,
  TrendingUp,
  Activity,
} from "lucide-react";
import { ProfileHeader } from "./components/profile-header";
import { BadgesSection } from "./components/badges-section";
import { ProfileTabs } from "./components/profile-tabs";
import { FeaturesCard } from "./components/features-card";

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

        {/* Profile Header */}
        <ProfileHeader user={mockUser} />

        {/* Badges Section */}
        <BadgesSection badges={mockBadges} />

        {/* Profile Tabs */}
        <ProfileTabs activity={mockActivity} projects={mockProjects} />

        {/* Features Card */}
        <FeaturesCard />
      </div>
    </div>
  );
}
