/**
 * ✅ FABRK COMPONENT
 * Team Dashboard Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import {
  Users,
  Crown,
  Shield,
  Eye,
  MoreHorizontal,
  Trash2,
  Send,
  Clock,
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

const roleIcons: Record<string, any> = {
  owner: Crown,
  admin: Shield,
  member: Users,
  guest: Eye,
};

export default function TeamDashboardTemplate() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success(`Invitation sent to ${inviteEmail} as ${inviteRole}`);
    setInviteEmail("");
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    toast.success(`Changed member role to ${newRole}`);
  };

  const handleRemoveMember = () => {
    if (memberToRemove) {
      toast.success(`Member removed successfully`);
      setRemoveDialogOpen(false);
      setMemberToRemove(null);
    }
  };

  const handleRevokeInvitation = (invitationId: string) => {
    toast.success(`Invitation revoked successfully`);
  };

  return (
 <div >
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-block border border-border px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">[TEMPLATE]: TEAM_DASHBOARD</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">Team Dashboard</h1>
            <p className="font-mono text-sm text-muted-foreground">
              Manage team members, roles, and permissions
            </p>
          </div>
          <Button className="font-mono text-xs rounded-none">
            <Settings className="mr-2 h-4 w-4" />
            &gt; ORG_SETTINGS
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[ORGANIZATION]:</div>
            <div className="text-2xl font-bold">{teamData.organization.name}</div>
            <div className="font-mono text-xs text-muted-foreground mt-2">
              PLAN: <span className="text-primary">{teamData.organization.plan.toUpperCase()}</span>
            </div>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[TEAM_SIZE]:</div>
            <div className="text-2xl font-bold">
              {teamData.members.length} / {teamData.organization.memberLimit}
            </div>
            <div className="font-mono text-xs text-muted-foreground mt-2">
              STATUS: <span className="text-success">{teamData.organization.memberLimit - teamData.members.length}_SEATS_AVAILABLE</span>
            </div>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[PENDING_INVITES]:</div>
            <div className="text-2xl font-bold">{teamData.pendingInvitations.length}</div>
            <div className="font-mono text-xs text-muted-foreground mt-2">
              STATUS: <span className="text-warning">AWAITING_RESPONSE</span>
            </div>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[ACTIVE_NOW]:</div>
            <div className="text-2xl font-bold">
              {teamData.members.filter((m) => m.lastActive === "Just now").length}
            </div>
            <div className="font-mono text-xs text-muted-foreground mt-2">
              STATUS: <span className="text-success">ONLINE</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content - Members */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invite Section */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">invite_member.sh</span>
              </div>
              <div className="p-4">
                <div className="font-mono text-xs text-muted-foreground mb-3">[INVITE_TEAM_MEMBER]:</div>
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="rounded-none flex-1 font-mono text-xs"
                  />
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger className="rounded-none w-32 font-mono text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="admin" className="font-mono text-xs rounded-none focus:bg-primary focus:text-primary-foreground">ADMIN</SelectItem>
                      <SelectItem value="member" className="font-mono text-xs rounded-none focus:bg-primary focus:text-primary-foreground">MEMBER</SelectItem>
                      <SelectItem value="guest" className="font-mono text-xs rounded-none focus:bg-primary focus:text-primary-foreground">GUEST</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleInvite} className="rounded-none font-mono text-xs">
                    <Send className="mr-2 h-4 w-4" />
                    &gt; SEND_INVITE
                  </Button>
                </div>
              </div>
            </div>

            {/* Members Table */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">team_members.db</span>
              </div>
              <div className="p-4">
                <div className="font-mono text-xs text-muted-foreground mb-3">
                  [TEAM_MEMBERS]: COUNT={teamData.members.length}
                </div>
                <div className="border border-border">
                  {/* Table Header */}
                  <div className="grid grid-cols-4 border-b border-border bg-muted/30 px-4 py-2 font-mono text-xs">
                    <span className="text-muted-foreground">[MEMBER]</span>
                    <span className="text-muted-foreground">[ROLE]</span>
                    <span className="text-muted-foreground">[LAST_ACTIVE]</span>
                    <span className="text-muted-foreground">[ACTIONS]</span>
                  </div>
                  {/* Table Body */}
                  <div className="divide-y divide-border">
                    {teamData.members.map((member) => {
                      const RoleIcon = roleIcons[member.role];
                      return (
                        <div key={member.id} className="grid grid-cols-4 items-center px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center border border-border bg-muted font-mono text-xs">
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="font-mono text-xs font-semibold">{member.name}</p>
                              <p className="font-mono text-xs text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                          <div>
                            <span className="inline-flex items-center gap-1 border border-border px-2 py-0.5 font-mono text-xs">
                              <RoleIcon className="h-3 w-3" />
                              {member.role.toUpperCase()}
                            </span>
                          </div>
                          <div className="font-mono text-xs text-muted-foreground">
                            {member.lastActive}
                          </div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="rounded-none font-mono text-xs">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-none border border-border font-mono text-xs">
                                <DropdownMenuLabel>[ACTIONS]:</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {member.role !== "owner" && (
                                  <>
                                    <DropdownMenuItem onClick={() => handleRoleChange(member.id, "admin")}>
                                      &gt; SET_ROLE: ADMIN
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRoleChange(member.id, "member")}>
                                      &gt; SET_ROLE: MEMBER
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRoleChange(member.id, "guest")}>
                                      &gt; SET_ROLE: GUEST
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
                                      <AlertDialogTrigger asChild>
                                        <DropdownMenuItem
                                          onSelect={(e) => {
                                            e.preventDefault();
                                            setMemberToRemove(member.id);
                                            setRemoveDialogOpen(true);
                                          }}
                                          className="text-destructive"
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          &gt; REMOVE_MEMBER
                                        </DropdownMenuItem>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogTitle className="font-mono">[CONFIRM_REMOVAL]</AlertDialogTitle>
                                        <AlertDialogDescription className="font-mono text-xs">
                                          WARNING: This action will remove the member from the team. They will lose all access.
                                        </AlertDialogDescription>
                                        <div className="flex gap-4 justify-end">
                                          <AlertDialogCancel className="font-mono text-xs">&gt; CANCEL</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={handleRemoveMember}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-mono text-xs"
                                          >
                                            &gt; CONFIRM_REMOVE
                                          </AlertDialogAction>
                                        </div>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </>
                                )}
                                {member.role === "owner" && (
                                  <DropdownMenuItem disabled>
                                    [LOCKED]: OWNER_ROLE
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Invitations */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">pending_invites.log</span>
              </div>
              <div className="p-4">
                <div className="font-mono text-xs text-muted-foreground mb-3">
                  [PENDING_INVITATIONS]: COUNT={teamData.pendingInvitations.length}
                </div>
                <div className="space-y-2">
                  {teamData.pendingInvitations.map((invitation) => (
                    <div
                      key={invitation.id}
                      className="flex items-center justify-between border border-border bg-muted/30 px-4 py-3"
                    >
                      <div className="font-mono text-xs">
                        <span className="text-muted-foreground">EMAIL: </span>
                        <span className="font-semibold">{invitation.email}</span>
                        <span className="text-muted-foreground ml-4">SENT_BY: </span>
                        <span>{invitation.sentBy}</span>
                        <span className="text-muted-foreground ml-4">DATE: </span>
                        <span>{new Date(invitation.sentAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="border border-border px-2 py-0.5 font-mono text-xs">
                          ROLE: {invitation.role.toUpperCase()}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRevokeInvitation(invitation.id)}
                          className="rounded-none font-mono text-xs"
                        >
                          &gt; REVOKE
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Activity Feed */}
          <div className="space-y-6">
            {/* Activity Feed */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">activity.log</span>
              </div>
              <div className="p-4">
                <div className="font-mono text-xs text-muted-foreground mb-3">[ACTIVITY_FEED]:</div>
                <div className="space-y-3">
                  {teamData.activityFeed.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-3 border-l-2 border-primary pl-3"
                    >
                      <Clock className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                      <div className="font-mono text-xs">
                        <p>
                          <span className="text-foreground">{activity.user}</span>{" "}
                          <span className="text-muted-foreground">
                            {activity.type === "member_added" && "ADDED"}
                            {activity.type === "role_changed" && "CHANGED_ROLE"}
                            {activity.type === "invitation_sent" && "INVITED"}
                            {activity.type === "member_removed" && "REMOVED"}
                          </span>{" "}
                          <span className="text-foreground">{activity.target}</span>
                        </p>
                        {activity.details && (
                          <p className="text-muted-foreground">{activity.details}</p>
                        )}
                        <p className="text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Role Permissions */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">permissions.config</span>
              </div>
              <div className="p-4">
                <div className="font-mono text-xs text-muted-foreground mb-3">[ROLE_PERMISSIONS]:</div>
                <div className="space-y-4 font-mono text-xs">
                  {[
                    {
                      role: "owner",
                      permissions: ["Full access", "Billing & plan", "Delete organization"],
                    },
                    {
                      role: "admin",
                      permissions: ["Manage members", "Change settings", "View analytics"],
                    },
                    {
                      role: "member",
                      permissions: ["Create projects", "Edit content", "View reports"],
                    },
                    {
                      role: "guest",
                      permissions: ["View only", "Comment", "Limited access"],
                    },
                  ].map((item) => {
                    const RoleIcon = roleIcons[item.role];
                    return (
                      <div key={item.role}>
                        <div className="flex items-center gap-2 mb-1">
                          <RoleIcon className="h-3 w-3 text-primary" />
                          <span className="font-semibold">{item.role.toUpperCase()}</span>
                        </div>
                        <div className="ml-5 space-y-0.5 text-muted-foreground">
                          {item.permissions.map((perm, idx) => (
                            <div key={idx}>&gt; {perm}</div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Note */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">features.md</span>
          </div>
          <div className="p-6">
            <div className="mb-4 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
            <div className="space-y-2 font-mono text-xs">
              <div><span className="text-success">&gt;</span> 4 stat cards (Organization, Team Size, Pending, Active)</div>
              <div><span className="text-success">&gt;</span> Invite team member form with email and role selector</div>
              <div><span className="text-success">&gt;</span> Team members table with avatars, roles, last active</div>
              <div><span className="text-success">&gt;</span> Role badges with icons (Owner, Admin, Member, Guest)</div>
              <div><span className="text-success">&gt;</span> Dropdown actions (change role, remove member)</div>
              <div><span className="text-success">&gt;</span> Pending invitations list with revoke functionality</div>
              <div><span className="text-success">&gt;</span> Activity feed with recent team changes</div>
              <div><span className="text-success">&gt;</span> Role permissions reference card</div>
              <div><span className="text-success">&gt;</span> RBAC system (Owner → Admin → Member → Guest)</div>
              <div><span className="text-success">&gt;</span> Multi-tenancy organization structure</div>
            </div>
            <div className="mt-4 font-mono text-xs text-muted-foreground">
              [NOTE]: Add API routes in src/app/api/teams/. Create Team and TeamMember Prisma models.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
