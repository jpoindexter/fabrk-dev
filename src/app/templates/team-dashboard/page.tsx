/**
 * ✅ FABRK COMPONENT
 * Team Dashboard Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { DashboardHeader } from "./components/dashboard-header";
import { StatsCards } from "./components/stats-cards";
import { InviteSection } from "./components/invite-section";
import { MembersTable } from "./components/members-table";
import { PendingInvitations } from "./components/pending-invitations";
import { ActivityFeed } from "./components/activity-feed";
import { RolePermissions } from "./components/role-permissions";
import { ImplementationNote } from "./components/implementation-note";

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

export default function TeamDashboardTemplate() {
  const activeNowCount = teamData.members.filter((m) => m.lastActive === "Just now").length;

  return (
    <div>
      {/* Page Content */}
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

        {/* Implementation Note */}
        <ImplementationNote />
      </div>
    </div>
  );
}
