/**
 * Member Table Row Component
 * Displays individual member with role badge and management actions
 */

"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import {
  MoreVertical,
  Shield,
  Trash2,
  Crown,
  UserCheck,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { TableCell, TableRow } from "@/components/ui/table";

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

interface MemberTableRowProps {
  member: Member;
  isOwnerOrAdmin: boolean;
  onUpdateRole: (memberId: string, newRole: string) => Promise<void>;
  onRemoveMember: (memberId: string) => Promise<void>;
}

export function MemberTableRow({
  member,
  isOwnerOrAdmin,
  onUpdateRole,
  onRemoveMember,
}: MemberTableRowProps) {
  const { data: session } = useSession();
  const isCurrentUser = member.userId === session?.user?.id;
  const canManage = isOwnerOrAdmin && !isCurrentUser && member.role !== "OWNER";

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

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-border">
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
          className="gap-1 w-24 justify-center"
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
              <Button variant="ghost" size="icon" aria-label="Manage member options">
                <MoreVertical className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-none border border-border"
            >
              <DropdownMenuLabel>Manage Member</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onUpdateRole(member.id, "ADMIN")}
                disabled={member.role === "ADMIN"}
              >
                <Shield className="mr-2 h-4 w-4" />
                Make Admin
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onUpdateRole(member.id, "MEMBER")}
                disabled={member.role === "MEMBER"}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Make Member
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onUpdateRole(member.id, "GUEST")}
                disabled={member.role === "GUEST"}
              >
                <UserX className="mr-2 h-4 w-4" />
                Make Guest
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onRemoveMember(member.id)}
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
}
