/**
 * ✅ FABRK COMPONENT
 * Members Table - Team members list with actions
 */

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
  Users,
  Crown,
  Shield,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinedAt: string;
  lastActive: string;
}

interface MembersTableProps {
  members: Member[];
}

const roleIcons: Record<string, any> = {
  owner: Crown,
  admin: Shield,
  member: Users,
  guest: Eye,
};

export function MembersTable({ members }: MembersTableProps) {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

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

  return (
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
          [TEAM_MEMBERS]: COUNT={members.length}
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
            {members.map((member) => {
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
  );
}
