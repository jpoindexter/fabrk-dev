/**
 * Team Dashboard Template
 * Multi-tenancy team management with RBAC, invitations, and activity feed
 */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DemoNav } from "@/components/demo/demo-nav";
import {
  Users,
  UserPlus,
  Mail,
  Crown,
  Shield,
  Eye,
  MoreHorizontal,
  Trash2,
  Send,
  Clock,
  Activity,
  Settings,
} from "lucide-react";

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

const roleColors: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
  owner: "default",
  admin: "secondary",
  member: "outline",
  guest: "outline",
};

const roleIcons: Record<string, any> = {
  owner: Crown,
  admin: Shield,
  member: Users,
  guest: Eye,
};

export default function TeamDashboardTemplate() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");

  const handleInvite = () => {
    if (!inviteEmail) {
      alert("Please enter an email address");
      return;
    }
    alert(`Invitation sent to ${inviteEmail} as ${inviteRole}`);
    setInviteEmail("");
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    alert(`Change member ${memberId} to ${newRole}`);
  };

  const handleRemoveMember = (memberId: string) => {
    if (confirm("Are you sure you want to remove this member?")) {
      alert(`Remove member ${memberId}`);
    }
  };

  const handleRevokeInvitation = (invitationId: string) => {
    alert(`Revoke invitation ${invitationId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Navigation */}
      <DemoNav backButtonText="Back" backButtonHref="/demo" />

      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Team Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Manage team members, roles, and permissions
            </p>
          </div>
          <Button className="font-semibold">
            <Settings className="mr-2 h-4 w-4" />
            Organization Settings
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-semibold">Organization</CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {teamData.organization.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="font-semibold">{teamData.organization.plan}</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-semibold">Team Size</CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {teamData.members.length} /{" "}
                {teamData.organization.memberLimit}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-semibold">
                {teamData.organization.memberLimit - teamData.members.length}{" "}
                seats available
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-semibold">
                Pending Invites
              </CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {teamData.pendingInvitations.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-semibold">
                Awaiting response
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-semibold">Active Now</CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {
                  teamData.members.filter((m) => m.lastActive === "Just now")
                    .length
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-semibold">
                Online members
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content - Members */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invite Section */}
            <Card>
              <CardHeader>
                <CardTitle className="font-semibold">Invite Team Member</CardTitle>
                <CardDescription>
                  Send an invitation to join {teamData.organization.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="flex-1 font-semibold"
                  />
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger className="w-32 font-semibold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin" className="font-semibold">Admin</SelectItem>
                      <SelectItem value="member" className="font-semibold">Member</SelectItem>
                      <SelectItem value="guest" className="font-semibold">Guest</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleInvite} className="font-semibold">
                    <Send className="mr-2 h-4 w-4" />
                    Invite
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Members Table */}
            <Card>
              <CardHeader>
                <CardTitle className="font-semibold">
                  Team Members ({teamData.members.length})
                </CardTitle>
                <CardDescription>
                  All active members in your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Member</TableHead>
                        <TableHead className="font-semibold">Role</TableHead>
                        <TableHead className="font-semibold">Last Active</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamData.members.map((member) => {
                        const RoleIcon = roleIcons[member.role];
                        return (
                          <TableRow key={member.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border border-border">
                                  <AvatarFallback className="bg-primary/10 font-semibold">
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold">{member.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {member.email}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={roleColors[member.role]}
                                className="gap-1 font-semibold capitalize"
                              >
                                <RoleIcon className="h-3 w-3" />
                                {member.role}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {member.lastActive}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="border border-border"
                                >
                                  <DropdownMenuLabel className="font-semibold">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {member.role !== "owner" && (
                                    <>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleRoleChange(member.id, "admin")
                                        }
                                        className="font-semibold"
                                      >
                                        Make Admin
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleRoleChange(member.id, "member")
                                        }
                                        className="font-semibold"
                                      >
                                        Make Member
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleRoleChange(member.id, "guest")
                                        }
                                        className="font-semibold"
                                      >
                                        Make Guest
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleRemoveMember(member.id)
                                        }
                                        className="font-semibold text-destructive"
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Remove
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {member.role === "owner" && (
                                    <DropdownMenuItem disabled className="font-semibold">
                                      Owner cannot be changed
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Pending Invitations */}
            <Card>
              <CardHeader>
                <CardTitle className="font-semibold">
                  Pending Invitations ({teamData.pendingInvitations.length})
                </CardTitle>
                <CardDescription>
                  Invitations waiting for acceptance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamData.pendingInvitations.map((invitation) => (
                  <div
                    key={invitation.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">{invitation.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Invited by {invitation.sentBy} •{" "}
                          {new Date(invitation.sentAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-semibold capitalize">
                        {invitation.role}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeInvitation(invitation.id)}
                        className="font-semibold"
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Activity Feed */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="font-semibold">Activity Feed</CardTitle>
                    <CardDescription>Recent team changes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamData.activityFeed.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex gap-3 border-l-2 border-primary pl-3"
                  >
                    <Clock className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        <span className="text-foreground">{activity.user}</span>{" "}
                        {activity.type === "member_added" && "added"}
                        {activity.type === "role_changed" && "changed role of"}
                        {activity.type === "invitation_sent" && "invited"}
                        {activity.type === "member_removed" && "removed"}{" "}
                        <span className="text-foreground">{activity.target}</span>
                      </p>
                      {activity.details && (
                        <p className="text-xs text-muted-foreground">
                          {activity.details}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Role Permissions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-semibold">Role Permissions</CardTitle>
                <CardDescription>
                  What each role can do
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    role: "owner",
                    permissions: [
                      "Full access",
                      "Billing & plan",
                      "Delete organization",
                    ],
                  },
                  {
                    role: "admin",
                    permissions: [
                      "Manage members",
                      "Change settings",
                      "View analytics",
                    ],
                  },
                  {
                    role: "member",
                    permissions: [
                      "Create projects",
                      "Edit content",
                      "View reports",
                    ],
                  },
                  {
                    role: "guest",
                    permissions: ["View only", "Comment", "Limited access"],
                  },
                ].map((item) => {
                  const RoleIcon = roleIcons[item.role];
                  return (
                    <div key={item.role} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <RoleIcon className="h-4 w-4 text-primary" />
                        <p className="font-semibold capitalize">{item.role}</p>
                      </div>
                      <ul className="ml-6 space-y-1 text-sm text-muted-foreground">
                        {item.permissions.map((perm, idx) => (
                          <li key={idx} className="font-semibold">
                            • {perm}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Implementation Note */}
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <h4 className="mb-2 font-semibold">👥 Template Features</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="font-semibold">
                ✓ 4 stat cards (Organization, Team Size, Pending, Active)
              </li>
              <li className="font-semibold">
                ✓ Invite team member form with email and role selector
              </li>
              <li className="font-semibold">
                ✓ Team members table with avatars, roles, last active
              </li>
              <li className="font-semibold">
                ✓ Role badges with icons (Owner, Admin, Member, Guest)
              </li>
              <li className="font-semibold">
                ✓ Dropdown actions (change role, remove member)
              </li>
              <li className="font-semibold">
                ✓ Pending invitations list with revoke functionality
              </li>
              <li className="font-semibold">
                ✓ Activity feed with recent team changes
              </li>
              <li className="font-semibold">
                ✓ Role permissions reference card
              </li>
              <li className="font-semibold">
                ✓ RBAC system (Owner → Admin → Member → Guest)
              </li>
              <li className="font-semibold">
                ✓ Multi-tenancy organization structure
              </li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              Add API routes for team management in{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                src/app/api/teams/
              </code>
              . Create Team and TeamMember Prisma models.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
