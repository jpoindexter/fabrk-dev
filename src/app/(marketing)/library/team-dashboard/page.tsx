/**
 * Team Dashboard Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
"use client";

import { Card, CardHeader, CardContent, TemplatePageHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

import { DashboardHeader } from "./components/dashboard-header";
import { StatsCards } from "./components/stats-cards";
import { InviteSection } from "./components/invite-section";
import { MembersTable } from "./components/members-table";
import { PendingInvitations } from "./components/pending-invitations";
import { ActivityFeed } from "./components/activity-feed";
import { RolePermissions } from "./components/role-permissions";

// Mock data
const teamData = {
  organization: {
    name: "Acme Corp",
    plan: "Professional",
    memberCount: 7,
    memberLimit: 10,
  },
  members: [
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@acme.com",
      role: "owner",
      status: "active",
      joinedAt: "2024-01-15",
      lastActive: "Just now",
    },
    {
      id: "2",
      name: "Mike Johnson",
      email: "mike@acme.com",
      role: "admin",
      status: "active",
      joinedAt: "2024-02-20",
      lastActive: "2 hours ago",
    },
    {
      id: "3",
      name: "Emma Davis",
      email: "emma@acme.com",
      role: "member",
      status: "active",
      joinedAt: "2024-03-10",
      lastActive: "5 hours ago",
    },
    {
      id: "4",
      name: "James Wilson",
      email: "james@acme.com",
      role: "member",
      status: "active",
      joinedAt: "2024-04-05",
      lastActive: "1 day ago",
    },
    {
      id: "5",
      name: "Lisa Anderson",
      email: "lisa@acme.com",
      role: "guest",
      status: "active",
      joinedAt: "2024-05-12",
      lastActive: "3 days ago",
    },
  ],
  pendingInvitations: [
    {
      id: "inv_1",
      email: "david@acme.com",
      role: "member",
      sentBy: "Sarah Chen",
      sentAt: "2024-11-10",
      expiresAt: "2024-11-17",
    },
    {
      id: "inv_2",
      email: "jessica@acme.com",
      role: "admin",
      sentBy: "Sarah Chen",
      sentAt: "2024-11-09",
      expiresAt: "2024-11-16",
    },
  ],
  activityFeed: [
    {
      id: "act_1",
      type: "member_added",
      user: "Sarah Chen",
      target: "James Wilson",
      timestamp: "2 hours ago",
    },
    {
      id: "act_2",
      type: "role_changed",
      user: "Sarah Chen",
      target: "Mike Johnson",
      details: "Admin → Member",
      timestamp: "1 day ago",
    },
    {
      id: "act_3",
      type: "invitation_sent",
      user: "Sarah Chen",
      target: "david@acme.com",
      timestamp: "2 days ago",
    },
    {
      id: "act_4",
      type: "member_removed",
      user: "Mike Johnson",
      target: "Robert Brown",
      timestamp: "5 days ago",
    },
  ],
};

const templateCode = `"use client";

import { DashboardHeader } from "./components/dashboard-header";
import { StatsCards } from "./components/stats-cards";
import { InviteSection } from "./components/invite-section";
import { MembersTable } from "./components/members-table";
import { PendingInvitations } from "./components/pending-invitations";
import { ActivityFeed } from "./components/activity-feed";
import { RolePermissions } from "./components/role-permissions";

export default function TeamDashboard() {
  const activeNowCount = teamData.members.filter(
    (m) => m.lastActive === "Just now"
  ).length;

  return (
    <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
      {/* Header */}
      <DashboardHeader />

      {/* Stats */}
      <StatsCards
        organization={teamData.organization}
        membersCount={teamData.members.length}
        pendingInvitationsCount={teamData.pendingInvitations.length}
        activeNowCount={activeNowCount}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - Members */}
        <div className="lg:col-span-2 space-y-6">
          <InviteSection />
          <MembersTable members={teamData.members} />
          <PendingInvitations invitations={teamData.pendingInvitations} />
        </div>

        {/* Sidebar - Activity Feed */}
        <div className="space-y-6">
          <ActivityFeed activities={teamData.activityFeed} />
          <RolePermissions />
        </div>
      </div>
    </div>
  );
}`;

function TeamDashboardPreview() {
  const activeNowCount = teamData.members.filter((m) => m.lastActive === "Just now").length;

  return (
    <div className="bg-background/50 p-4 sm:p-8">
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <DashboardHeader />

        {/* Stats */}
        <StatsCards
          organization={teamData.organization}
          membersCount={teamData.members.length}
          pendingInvitationsCount={teamData.pendingInvitations.length}
          activeNowCount={activeNowCount}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content - Members */}
          <div className="space-y-6 lg:col-span-2">
            {/* Invite Section */}
            <InviteSection />

            {/* Members Table */}
            <MembersTable members={teamData.members} />

            {/* Pending Invitations */}
            <PendingInvitations invitations={teamData.pendingInvitations} />
          </div>

          {/* Sidebar - Activity Feed */}
          <div className="space-y-6">
            {/* Activity Feed */}
            <ActivityFeed activities={teamData.activityFeed} />

            {/* Role Permissions */}
            <RolePermissions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamDashboardTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="TEAM_DASHBOARD"
          title="Team Dashboard"
          description="Manage team members, roles, invitations, and permissions"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE_PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  "h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0",
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    "border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs",
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={cn(
                    "border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs",
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
              <CardHeader code="0x01" title="LIVE_PREVIEW" />
              <TeamDashboardPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE_CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE_STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, "space-y-1 text-xs")}>
              <div className="text-muted-foreground">[FILES]:</div>
              <div className="space-y-1 pl-4">
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">(dashboard)/</span>
                  <span className="text-foreground">team/page.tsx</span>
                  <span className="text-muted-foreground ml-4">← Copy template here</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-foreground">dashboard-header.tsx</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-foreground">stats-cards.tsx</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-foreground">invite-section.tsx</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-foreground">members-table.tsx</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-foreground">pending-invitations.tsx</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-foreground">activity-feed.tsx</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-foreground">role-permissions.tsx</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x03" title="FEATURES" />
          <CardContent padding="md">
            <div className={cn(mode.font, "space-y-2 text-xs")}>
              <div>
                <span className="text-success">&gt;</span> Team member management with roles (Owner,
                Admin, Member, Guest)
              </div>
              <div>
                <span className="text-success">&gt;</span> Email invitation system with expiration
                tracking
              </div>
              <div>
                <span className="text-success">&gt;</span> Member activity tracking and status
                indicators
              </div>
              <div>
                <span className="text-success">&gt;</span> Role-based permissions matrix
              </div>
              <div>
                <span className="text-success">&gt;</span> Activity feed with member actions history
              </div>
              <div>
                <span className="text-success">&gt;</span> Organization stats (member count, plan,
                limits)
              </div>
              <div>
                <span className="text-success">&gt;</span> Responsive layout with sidebar for
                activity
              </div>
              <div>
                <span className="text-success">&gt;</span> Pending invitations management
              </div>
              <div>
                <span className="text-success">&gt;</span> DS-compliant (mode.font, mode.radius)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Note */}
        <Card>
          <CardHeader code="0x04" title="IMPLEMENTATION_NOTE" />
          <CardContent padding="md">
            <div className={cn(mode.font, "space-y-2 text-xs")}>
              <div className="text-muted-foreground">[BACKEND_INTEGRATION]:</div>
              <div className="space-y-1 pl-4">
                <div>• Replace mock data with API calls to your team management endpoints</div>
                <div>• Implement authentication/authorization checks for role-based actions</div>
                <div>• Add email service integration for sending invitations</div>
                <div>• Connect to your database for persistent member data</div>
                <div>• Add real-time updates for activity feed (optional: WebSockets/SSE)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
