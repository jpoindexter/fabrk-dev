"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  UserPlus,
  Mail,
  MoreVertical,
  Crown,
  Shield,
  User,
  Clock,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Role = "owner" | "admin" | "member";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  joinedAt: Date;
  lastActive: Date;
}

interface PendingInvitation {
  id: string;
  email: string;
  role: Role;
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
}

const mockMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "owner",
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365), // 1 year ago
    lastActive: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "admin",
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180), // 6 months ago
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "member",
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90), // 3 months ago
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "member",
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 1 month ago
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
];

const mockInvitations: PendingInvitation[] = [
  {
    id: "inv_1",
    email: "alex@example.com",
    role: "member",
    invitedBy: "John Doe",
    invitedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
  },
  {
    id: "inv_2",
    email: "taylor@example.com",
    role: "admin",
    invitedBy: "Sarah Johnson",
    invitedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 48 hours ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
  },
];

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(mockMembers);
  const [invitations, setInvitations] = useState<PendingInvitation[]>(mockInvitations);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("member");
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentUserId = "1"; // Mock current user as owner

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case "owner":
        return Crown;
      case "admin":
        return Shield;
      case "member":
        return User;
    }
  };

  const getRoleBadgeVariant = (role: Role) => {
    switch (role) {
      case "owner":
        return "default";
      case "admin":
        return "secondary";
      case "member":
        return "outline";
    }
  };

  const getRoleDescription = (role: Role) => {
    switch (role) {
      case "owner":
        return "Full access to all features and settings";
      case "admin":
        return "Can manage members and access most features";
      case "member":
        return "Basic access to team resources";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleInviteMember = async () => {
    if (!inviteEmail || !inviteRole) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newInvitation: PendingInvitation = {
      id: `inv_${Date.now()}`,
      email: inviteEmail,
      role: inviteRole,
      invitedBy: "John Doe",
      invitedAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    };

    setInvitations([...invitations, newInvitation]);
    setInviteEmail("");
    setInviteRole("member");
    setIsInviteDialogOpen(false);
    setIsLoading(false);
  };

  const handleRevokeInvitation = (invitationId: string) => {
    setInvitations(invitations.filter((inv) => inv.id !== invitationId));
  };

  const handleResendInvitation = async (invitationId: string) => {
    // Simulate API call
    alert(`Invitation resent to ${invitations.find((inv) => inv.id === invitationId)?.email}`);
  };

  const handleChangeRole = async (memberId: string, newRole: Role) => {
    setMembers(
      members.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
  };

  const handleRemoveMember = () => {
    if (!memberToRemove) return;
    setMembers(members.filter((member) => member.id !== memberToRemove.id));
    setMemberToRemove(null);
  };

  const canManageMembers = (userRole: Role) => {
    return userRole === "owner" || userRole === "admin";
  };

  const currentUserRole = members.find((m) => m.id === currentUserId)?.role || "member";

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Team</h1>
          </div>
          <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={!canManageMembers(currentUserRole)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your team. The invitation will expire in 7 days.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="colleague@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as Role)}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Member</div>
                            <div className="text-xs text-muted-foreground">
                              Basic access to team resources
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Admin</div>
                            <div className="text-xs text-muted-foreground">
                              Can manage members and settings
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsInviteDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button onClick={handleInviteMember} disabled={!inviteEmail || isLoading}>
                  {isLoading ? "Sending..." : "Send Invitation"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">
          Manage your team members and their access levels
        </p>
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">
            <Users className="h-4 w-4 mr-2" />
            Members ({members.length})
          </TabsTrigger>
          <TabsTrigger value="invitations">
            <Mail className="h-4 w-4 mr-2" />
            Pending Invitations ({invitations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                People who have access to your team and their roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => {
                    const RoleIcon = getRoleIcon(member.role);
                    const isCurrentUser = member.id === currentUserId;

                    return (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {member.name}
                                {isCurrentUser && (
                                  <Badge variant="outline" className="text-xs">
                                    You
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">{member.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(member.role)}>
                            <RoleIcon className="h-3 w-3 mr-1" />
                            {member.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(member.joinedAt)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatTimeAgo(member.lastActive)}
                        </TableCell>
                        <TableCell className="text-right">
                          {!isCurrentUser && canManageMembers(currentUserRole) && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {member.role !== "owner" && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() => handleChangeRole(member.id, "admin")}
                                      disabled={member.role === "admin"}
                                    >
                                      <Shield className="h-4 w-4 mr-2" />
                                      Make Admin
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleChangeRole(member.id, "member")}
                                      disabled={member.role === "member"}
                                    >
                                      <User className="h-4 w-4 mr-2" />
                                      Make Member
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                  </>
                                )}
                                {member.role !== "owner" && (
                                  <DropdownMenuItem
                                    onClick={() => setMemberToRemove(member)}
                                    className="text-destructive"
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Remove from Team
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Role Descriptions */}
          <Card className="bg-accent/30">
            <CardHeader>
              <CardTitle className="text-base">Role Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(["owner", "admin", "member"] as Role[]).map((role) => {
                const RoleIcon = getRoleIcon(role);
                return (
                  <div key={role} className="flex items-start gap-3">
                    <RoleIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold capitalize">{role}</div>
                      <div className="text-sm text-muted-foreground">
                        {getRoleDescription(role)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-4">
          {invitations.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No pending invitations</h3>
                <p className="text-muted-foreground mb-4">
                  Invite team members to collaborate with you
                </p>
                <Button onClick={() => setIsInviteDialogOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Send First Invitation
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Pending Invitations</CardTitle>
                <CardDescription>
                  Invitations that have been sent but not yet accepted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Invited By</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invitations.map((invitation) => {
                      const RoleIcon = getRoleIcon(invitation.role);
                      const daysUntilExpiry = Math.ceil(
                        (invitation.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                      );

                      return (
                        <TableRow key={invitation.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{invitation.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getRoleBadgeVariant(invitation.role)}>
                              <RoleIcon className="h-3 w-3 mr-1" />
                              {invitation.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {invitation.invitedBy}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatTimeAgo(invitation.invitedAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {daysUntilExpiry}d
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleResendInvitation(invitation.id)}
                              >
                                <Mail className="h-4 w-4 mr-1" />
                                Resend
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRevokeInvitation(invitation.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          <Card className="bg-accent/30">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Invitation Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Invitations expire after 7 days</p>
              <p>• Recipients will receive an email with a secure link</p>
              <p>• You can resend or revoke invitations at any time</p>
              <p>• New members will have the role you assign when sending the invitation</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Remove Member Confirmation Dialog */}
      <AlertDialog open={!!memberToRemove} onOpenChange={() => setMemberToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{memberToRemove?.name}</strong> from the
              team? They will immediately lose access to all team resources.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveMember} className="bg-destructive">
              Remove Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
