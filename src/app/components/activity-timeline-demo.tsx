"use client";

import { useState } from "react";
import { ActivityTimeline, TimelineEvent } from "@/components/ui/activity-timeline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDemoDates } from "@/lib/utils/demo-dates";

export default function ActivityTimelineDemo() {
  // ✅ PRODUCTION PATTERN: Use fixed base date for hydration-safe dates
  // This ensures server and client generate identical timestamps
  const { daysAgo, hoursAgo, minutesAgo, now } = useDemoDates("2025-11-14T00:00:00.000Z");

  const [projectEvents] = useState<TimelineEvent[]>(() => [
      {
        id: "1",
        type: "created",
        user: { name: "Project Manager", avatar: "https://avatar.vercel.sh/pm" },
        title: "Project kickoff",
        description: "Initialized new SaaS project with team of 5 developers. Budget approved and timeline set for 12 weeks.",
        timestamp: daysAgo(10),
        metadata: {
          budget: "$50,000",
          duration: "12 weeks",
          team_size: 5,
        },
      },
      {
        id: "2",
        type: "assigned",
        user: { name: "Project Manager", avatar: "https://avatar.vercel.sh/pm" },
        title: "Team assignments",
        description: "Assigned roles and responsibilities to team members",
        timestamp: daysAgo(9),
        metadata: {
          frontend_devs: 2,
          backend_devs: 2,
          designer: 1,
        },
      },
      {
        id: "3",
        type: "updated",
        user: { name: "Lead Developer", avatar: "https://avatar.vercel.sh/dev1" },
        title: "Tech stack finalized",
        description: "Selected Next.js, PostgreSQL, and Stripe for the stack",
        timestamp: daysAgo(8),
        metadata: {
          frontend: "Next.js 15",
          database: "PostgreSQL",
          payments: "Stripe",
        },
      },
      {
        id: "4",
        type: "status_changed",
        user: { name: "System", avatar: "https://avatar.vercel.sh/system" },
        title: "Sprint 1 completed",
        description: "Successfully delivered authentication and dashboard",
        timestamp: daysAgo(5),
        metadata: {
          sprint: 1,
          features_completed: 8,
          bugs_fixed: 3,
        },
      },
      {
        id: "5",
        type: "commented",
        user: { name: "Client", avatar: "https://avatar.vercel.sh/client" },
        title: "Client feedback",
        description: "Love the progress! The dashboard looks amazing. Can we add analytics next?",
        timestamp: daysAgo(4),
      },
    ]);


  const [issueEvents] = useState<TimelineEvent[]>(() => [
      {
        id: "1",
        type: "created",
        user: { name: "Bug Reporter", avatar: "https://avatar.vercel.sh/reporter" },
        title: "Issue created",
        description: "Payment form validation not working correctly for international cards",
        timestamp: hoursAgo(48),
        metadata: {
          priority: "critical",
          severity: "high",
          affected_users: 127,
        },
      },
      {
        id: "2",
        type: "assigned",
        user: { name: "Team Lead", avatar: "https://avatar.vercel.sh/lead" },
        title: "Assigned to developer",
        description: "Assigned to payment team for investigation",
        timestamp: hoursAgo(47),
        metadata: {
          assignee: "Payment Team",
          estimated_time: "4 hours",
        },
      },
      {
        id: "3",
        type: "commented",
        user: { name: "Developer", avatar: "https://avatar.vercel.sh/dev" },
        title: "Investigation started",
        description: "Found the issue - Stripe validation regex doesn't support all international formats. Working on fix.",
        timestamp: hoursAgo(46),
      },
      {
        id: "4",
        type: "status_changed",
        user: { name: "Developer", avatar: "https://avatar.vercel.sh/dev" },
        title: "Status updated",
        description: "Moved to 'In Progress' after identifying root cause",
        timestamp: hoursAgo(45),
        metadata: {
          from: "Open",
          to: "In Progress",
        },
      },
      {
        id: "5",
        type: "updated",
        user: { name: "Developer", avatar: "https://avatar.vercel.sh/dev" },
        title: "Code fix committed",
        description: "Updated validation logic to support all card formats",
        timestamp: hoursAgo(42),
        metadata: {
          commit: "abc123f",
          files_changed: 3,
        },
      },
    ]);


  const [userEvents] = useState<TimelineEvent[]>(() => [
      {
        id: "1",
        type: "created",
        user: { name: "Emma Watson", avatar: "https://avatar.vercel.sh/emma" },
        title: "Account created",
        description: "Signed up via Google OAuth",
        timestamp: daysAgo(30),
        metadata: {
          provider: "google",
          plan: "free",
        },
      },
      {
        id: "2",
        type: "updated",
        user: { name: "Emma Watson", avatar: "https://avatar.vercel.sh/emma" },
        title: "Profile completed",
        description: "Added profile picture and bio",
        timestamp: daysAgo(29),
        metadata: {
          bio_length: 120,
          avatar_uploaded: true,
        },
      },
      {
        id: "3",
        type: "status_changed",
        user: { name: "Emma Watson", avatar: "https://avatar.vercel.sh/emma" },
        title: "Upgraded to Pro",
        description: "Subscribed to Pro plan ($29/month)",
        timestamp: daysAgo(20),
        metadata: {
          from_plan: "free",
          to_plan: "pro",
          amount: "$29",
        },
      },
      {
        id: "4",
        type: "created",
        user: { name: "Emma Watson", avatar: "https://avatar.vercel.sh/emma" },
        title: "First project created",
        description: "Created 'E-commerce Redesign' project",
        timestamp: daysAgo(15),
      },
    ]);


  const [systemEvents] = useState<TimelineEvent[]>(() => [
      {
        id: "1",
        type: "created",
        user: { name: "System", avatar: "https://avatar.vercel.sh/system" },
        title: "Database backup created",
        timestamp: now(),
        metadata: { size: "2.3 GB" },
      },
      {
        id: "2",
        type: "updated",
        user: { name: "Admin", avatar: "https://avatar.vercel.sh/admin" },
        title: "Server configuration updated",
        description: "Increased memory allocation to 16GB",
        timestamp: minutesAgo(30),
        metadata: { memory: "16GB", previous: "8GB" },
      },
      {
        id: "3",
        type: "deleted",
        user: { name: "Admin", avatar: "https://avatar.vercel.sh/admin" },
        title: "Old logs deleted",
        description: "Removed logs older than 90 days",
        timestamp: hoursAgo(2),
        metadata: { files_deleted: 1240, space_freed: "5.7 GB" },
      },
      {
        id: "4",
        type: "status_changed",
        user: { name: "System", avatar: "https://avatar.vercel.sh/system" },
        title: "Deployment status",
        description: "Application deployed to production",
        timestamp: hoursAgo(5),
        metadata: { environment: "production", build: "v2.1.4" },
      },
    ]);


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-foreground mb-2">Activity Timeline</h2>
        <p className="text-muted-foreground">
          Track events, actions, and changes with a beautiful vertical timeline
        </p>
      </div>

      <Tabs defaultValue="project" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="project">Project</TabsTrigger>
          <TabsTrigger value="issue">Issue</TabsTrigger>
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="project" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>
                Complete project history with grouped dates and filters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityTimeline
                events={projectEvents}
                groupByDate={true}
                showFilters={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Issue History</CardTitle>
              <CardDescription>
                Track bug reports from creation to resolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityTimeline
                events={issueEvents}
                showFilters={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>
                Monitor user actions and account changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityTimeline
                events={userEvents}
                groupByDate={true}
                showFilters={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Events</CardTitle>
              <CardDescription>
                Server operations, deployments, and maintenance tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityTimeline
                events={systemEvents}
                showFilters={true}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compact View</CardTitle>
              <CardDescription>
                Condensed timeline without expandable details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityTimeline
                events={systemEvents.slice(0, 3)}
                compact={true}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>What makes this component powerful</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>6 Event Types:</strong> Created, Updated, Commented, Status Changed, Assigned, Deleted</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>Smart Timestamps:</strong> Relative time (e.g., "2h ago") with absolute time on hover</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>User Attribution:</strong> Shows who performed each action with avatar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>Expandable Details:</strong> Click to reveal full description and metadata</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>Date Grouping:</strong> Organize events by "Today", "Yesterday", etc.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>Type Filters:</strong> Filter by event type with counters</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>Color-Coded:</strong> Each event type has unique color and icon</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>Modern Design:</strong> Clean borders, subtle shadows, polished aesthetic</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>Compact Mode:</strong> Condensed view for space-constrained layouts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>Metadata Support:</strong> Attach arbitrary data to events (key-value pairs)</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
