"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Mail, Shield, User } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Example user type
type User = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  status: "active" | "inactive" | "pending";
  createdAt: string;
};

// Example data
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "ADMIN",
    status: "active",
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "USER",
    status: "active",
    createdAt: "2025-01-02",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "USER",
    status: "pending",
    createdAt: "2025-01-03",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "USER",
    status: "active",
    createdAt: "2025-01-04",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "USER",
    status: "inactive",
    createdAt: "2025-01-05",
  },
];

// Column definitions
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      if (!row) return null;
      return (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <User className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium text-foreground">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      if (!row) return null;
      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{row.getValue("email")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      if (!row) return null;
      const role = row.getValue("role") as string;
      return (
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${
              role === "ADMIN"
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {role}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      if (!row) return null;
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            status === "active"
              ? "bg-success/20 text-success-foreground"
              : status === "pending"
              ? "bg-warning/20 text-warning-foreground"
              : "bg-destructive/20 text-destructive-foreground"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => {
      if (!row) return null;
      return <span className="text-muted-foreground">{row.getValue("createdAt")}</span>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      if (!row) return null;
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border border-border">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-none border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Users</p>
          <p className="text-3xl font-bold text-foreground">{users.length}</p>
        </div>
        <div className="rounded-none border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Active Users</p>
          <p className="text-3xl font-bold text-success">
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div className="rounded-none border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Admins</p>
          <p className="text-3xl font-bold text-primary">
            {users.filter((u) => u.role === "ADMIN").length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={users}
        searchKey="name"
        searchPlaceholder="Search users..."
        onRowClick={(user) => console.log("Clicked user:", user)}
      />
    </div>
  );
}
