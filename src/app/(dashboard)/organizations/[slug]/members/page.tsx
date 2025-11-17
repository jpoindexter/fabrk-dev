/**
 * Organization Members Page
 * View and manage organization members with role-based access control
 */

"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Users,
  Mail,
  MoreVertical,
  Shield,
  Trash2,
  Crown,
  UserCheck,
  UserX,
  Loader2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Member {
  id: string;
  userId: string;
  role: "OWNER" | "ADMIN" | "MEMBER" | "GUEST";
  joinedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  role: string;
}

export default function OrganizationMembersPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(true);
  const [organization, setOrganization] = React.useState<Organization | null>(null);
  const [members, setMembers] = React.useState<Member[]>([]);
  const [inviting, setInviting] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState<"ADMIN" | "MEMBER" | "GUEST">("MEMBER");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch organization
        const orgResponse = await fetch(`/api/organizations/${params.slug}`);
        if (!orgResponse.ok) throw new Error("Failed to fetch organization");
        const orgData = await orgResponse.json();
        setOrganization(orgData.organization);

        // Fetch members
        const membersResponse = await fetch(
          `/api/organizations/${orgData.organization.id}/members`
        );
        if (!membersResponse.ok) throw new Error("Failed to fetch members");
        const membersData = await membersResponse.json();
        setMembers(membersData.members);
      } catch (error: unknown) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load organization members");
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchData();
    }
  }, [params.slug]);

  const handleInvite = async () => {
    if (!organization || !inviteEmail) return;

    setInviting(true);
    try {
      const response = await fetch("/api/organizations/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationId: organization.id,
          email: inviteEmail,
          role: inviteRole,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send invitation");
      }

      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
      setInviteRole("MEMBER");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send invitation";
      toast.error(errorMessage);
    } finally {
      setInviting(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!organization) return;

    try {
      const response = await fetch(`/api/organizations/${organization.id}/members/${memberId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to remove member");
      }

      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      toast.success("Member removed successfully");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to remove member";
      toast.error(errorMessage);
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: string) => {
    if (!organization) return;

    try {
      const response = await fetch(`/api/organizations/${organization.id}/members/${memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update role");
      }

      setMembers((prev) =>
        prev.map((m) =>
          m.id === memberId ? { ...m, role: newRole as any } : m
        )
      );
      toast.success("Member role updated successfully");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update role";
      toast.error(errorMessage);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "OWNER":
        return "default";
      case "ADMIN":
        return "secondary";
      case "MEMBER":
        return "outline";
      case "GUEST":
        return "outline";
      default:
        return "outline";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "OWNER":
        return <Crown className="h-3 w-3" />;
      case "ADMIN":
        return <Shield className="h-3 w-3" />;
      case "MEMBER":
        return <UserCheck className="h-3 w-3" />;
      case "GUEST":
        return <UserX className="h-3 w-3" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!organization) {
    return (
      <Card className="rounded-brutal border-2 border-brutal">
        <CardContent className="py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium">Organization not found</h3>
            <Button onClick={() => router.push("/dashboard")} className="mt-4">
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isOwnerOrAdmin = ["OWNER", "ADMIN"].includes(organization.role);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-brutal border-2 border-brutal bg-primary p-2">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Team Members</h1>
            <p className="text-muted-foreground">
              Manage members and roles for {organization.name}
            </p>
          </div>
        </div>

        {isOwnerOrAdmin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-brutal border-2 border-brutal">
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join {organization.name}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="rounded-brutal border-2 border-brutal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteRole} onValueChange={(val: any) => setInviteRole(val)}>
                    <SelectTrigger
                      id="role"
                      className="rounded-brutal border-2 border-brutal"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-brutal border-2 border-brutal">
                      <SelectItem value="MEMBER">Member</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="GUEST">Guest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleInvite}
                  disabled={!inviteEmail || inviting}
                >
                  {inviting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Members Table */}
      <Card className="rounded-brutal border-2 border-brutal shadow-brutal">
        <CardHeader>
          <CardTitle>Members ({members.length})</CardTitle>
          <CardDescription>
            View and manage all members of your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => {
                const isCurrentUser = member.userId === session?.user?.id;
                const canManage = isOwnerOrAdmin && !isCurrentUser && member.role !== "OWNER";

                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border-2 border-brutal">
                          <AvatarImage src={member.user.image || ""} />
                          <AvatarFallback className="text-xs">
                            {member.user.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.user.name}</p>
                          {isCurrentUser && (
                            <span className="text-xs text-muted-foreground">(You)</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {member.user.email}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getRoleBadgeVariant(member.role)}
                        className="gap-1"
                      >
                        {getRoleIcon(member.role)}
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {new Date(member.joinedAt).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      {canManage && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="rounded-brutal border-2 border-brutal"
                          >
                            <DropdownMenuLabel>Manage Member</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(member.id, "ADMIN")}
                              disabled={member.role === "ADMIN"}
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Make Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(member.id, "MEMBER")}
                              disabled={member.role === "MEMBER"}
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Make Member
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(member.id, "GUEST")}
                              disabled={member.role === "GUEST"}
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              Make Guest
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Member
                            </DropdownMenuItem>
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

      {/* Role Permissions Info */}
      <Card className="rounded-brutal border-2 border-brutal">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Understanding member roles and their access levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-brutal border-2 border-brutal bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                <Badge variant="default">OWNER</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Full control over organization, including deletion and ownership transfer.
              </p>
            </div>
            <div className="rounded-brutal border-2 border-brutal bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <Badge variant="secondary">ADMIN</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Can manage members, settings, and billing. Cannot delete organization.
              </p>
            </div>
            <div className="rounded-brutal border-2 border-brutal bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                <Badge variant="outline">MEMBER</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Standard access to organization resources and features.
              </p>
            </div>
            <div className="rounded-brutal border-2 border-brutal bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <UserX className="h-5 w-5 text-primary" />
                <Badge variant="outline">GUEST</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Limited read-only access to specific resources.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
