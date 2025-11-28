/**
 * ✅ FABRK COMPONENT
 * User Management Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Download, MoreHorizontal, Search, Trash2, UserCog, UserX, UserPlus, Shield, User, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// User type definition
type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "GUEST";
  status: "active" | "inactive" | "suspended";
  plan: "Free" | "Pro" | "Enterprise";
  createdAt: string;
  lastLogin: string;
};

// Mock data - replace with your API
const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "ADMIN",
    status: "active",
    plan: "Enterprise",
    createdAt: "2024-01-15",
    lastLogin: "2024-11-10 14:23",
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "USER",
    status: "active",
    plan: "Pro",
    createdAt: "2024-02-20",
    lastLogin: "2024-11-09 09:15",
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma@example.com",
    role: "USER",
    status: "inactive",
    plan: "Free",
    createdAt: "2024-03-10",
    lastLogin: "2024-10-28 16:45",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@example.com",
    role: "GUEST",
    status: "active",
    plan: "Free",
    createdAt: "2024-04-05",
    lastLogin: "2024-11-11 11:30",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    role: "USER",
    status: "suspended",
    plan: "Pro",
    createdAt: "2024-05-12",
    lastLogin: "2024-09-15 08:20",
  },
  {
    id: "6",
    name: "David Martinez",
    email: "david@example.com",
    role: "ADMIN",
    status: "active",
    plan: "Enterprise",
    createdAt: "2024-01-08",
    lastLogin: "2024-11-11 15:10",
  },
  {
    id: "7",
    name: "Jessica Taylor",
    email: "jessica@example.com",
    role: "USER",
    status: "active",
    plan: "Pro",
    createdAt: "2024-06-22",
    lastLogin: "2024-11-10 12:05",
  },
  {
    id: "8",
    name: "Robert Brown",
    email: "robert@example.com",
    role: "USER",
    status: "inactive",
    plan: "Free",
    createdAt: "2024-07-18",
    lastLogin: "2024-08-30 19:40",
  },
  {
    id: "9",
    name: "Maria Garcia",
    email: "maria@example.com",
    role: "USER",
    status: "active",
    plan: "Enterprise",
    createdAt: "2024-02-28",
    lastLogin: "2024-11-11 10:25",
  },
  {
    id: "10",
    name: "Thomas Lee",
    email: "thomas@example.com",
    role: "GUEST",
    status: "active",
    plan: "Free",
    createdAt: "2024-08-05",
    lastLogin: "2024-11-08 14:55",
  },
];

// Column header with sorting
const DataTableColumnHeader = ({
  column,
  title,
}: {
  column: any;
  title: string;
}) => {
  return (
    <button
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
    >
      [{title.toUpperCase()}]
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );
};

// Table columns definition
const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-border"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-border"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center border border-border bg-muted font-mono text-xs">
          {row.getValue<string>("name").split(" ").map((n) => n[0]).join("")}
        </div>
        <span className="rounded-none font-mono text-xs">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      const role = row.getValue<string>("role");
      const roleColors: Record<string, string> = {
        ADMIN: "text-primary border-primary/50",
        USER: "text-foreground border-border",
        GUEST: "text-muted-foreground border-border",
      };
      const RoleIcon = role === "ADMIN" ? Shield : role === "USER" ? User : Users;
      return (
        <span className={`inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-xs ${roleColors[role]}`}>
          <RoleIcon className="h-3 w-3" />
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      const statusColors: Record<string, string> = {
        active: "text-success",
        inactive: "text-muted-foreground",
        suspended: "text-destructive",
      };
      return (
        <span className="rounded-none font-mono text-xs">
          <span className="text-muted-foreground">STATUS:</span>{" "}
          <span className={statusColors[status]}>{status.toUpperCase()}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "plan",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Plan" />,
    cell: ({ row }) => {
      const plan = row.getValue<string>("plan");
      const planColors: Record<string, string> = {
        Enterprise: "text-primary border-primary/50",
        Pro: "text-warning border-warning/50",
        Free: "text-muted-foreground border-border",
      };
      return (
        <span className={`border px-2 py-0.5 font-mono text-xs ${planColors[plan]}`}>
          {plan.toUpperCase()}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Login" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.getValue("lastLogin")}
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center border border-border hover:bg-muted">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-none border border-border font-mono text-xs">
            <DropdownMenuLabel className="text-muted-foreground">[ACTIONS]</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              &gt; COPY_ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCog className="mr-2 h-3 w-3" />
              &gt; EDIT
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserX className="mr-2 h-3 w-3" />
              &gt; SUSPEND
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-3 w-3" />
              &gt; DELETE
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UserManagementTemplate() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table API design is incompatible with React Compiler but works correctly
  const table = useReactTable({
    data: mockUsers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Role", "Status", "Plan", "Created", "Last Login"];
    const csvData = mockUsers.map((user) => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.plan,
      user.createdAt,
      user.lastLogin,
    ]);

    const csv = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const activeCount = mockUsers.filter((u) => u.status === "active").length;
  const adminCount = mockUsers.filter((u) => u.role === "ADMIN").length;
  const enterpriseCount = mockUsers.filter((u) => u.plan === "Enterprise").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-block border border-border px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">[TEMPLATE]: USER_MANAGEMENT</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">User Management</h1>
            <p className="font-mono text-sm text-muted-foreground">
              Manage users, roles, and permissions with TanStack Table
            </p>
          </div>
          <Button className="rounded-none font-mono text-xs">
            <UserPlus className="mr-2 h-4 w-4" />
            &gt; ADD_USER
          </Button>
        </div>

        {/* Stats Cards - Terminal Style */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[TOTAL_USERS]:</div>
            <div className="text-3xl font-bold">{mockUsers.length}</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">
              STATUS: <span className="text-success">INDEXED</span>
            </div>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[ACTIVE_USERS]:</div>
            <div className="text-3xl font-bold">{activeCount}</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">
              RATE: <span className="text-success">{Math.round((activeCount / mockUsers.length) * 100)}%</span>
            </div>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[ADMINS]:</div>
            <div className="text-3xl font-bold">{adminCount}</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">
              ROLE: <span className="text-primary">ELEVATED</span>
            </div>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[ENTERPRISE]:</div>
            <div className="text-3xl font-bold">{enterpriseCount}</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">
              PLAN: <span className="text-primary">PREMIUM</span>
            </div>
          </div>
        </div>

        {/* Main Table Card - Terminal Style */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">users.db</span>
            <div className="ml-auto">
              <Button onClick={exportToCSV} variant="outline" size="sm" className="rounded-none font-mono text-xs h-7">
                <Download className="mr-2 h-3 w-3" />
                &gt; EXPORT_CSV
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="font-mono text-xs text-muted-foreground mb-4">
              [ALL_USERS]: COUNT={mockUsers.length} | FILTERED={table.getFilteredRowModel().rows.length}
            </div>

            {/* Toolbar */}
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="search_users..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                      table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="rounded-none pl-10 font-mono text-xs"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-none font-mono text-xs">
                      [COLUMNS] <ChevronDown className="ml-2 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-none border border-border font-mono text-xs">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="rounded-none focus:bg-primary focus:text-primary-foreground"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id.toUpperCase()}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Bulk Actions */}
              {selectedCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    SELECTED: {selectedCount}
                  </span>
                  <Button variant="outline" size="sm" className="rounded-none font-mono text-xs h-7">
                    <UserCog className="mr-1 h-3 w-3" />
                    &gt; ROLE
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-none font-mono text-xs h-7">
                    <UserX className="mr-1 h-3 w-3" />
                    &gt; SUSPEND
                  </Button>
                  <Button variant="destructive" size="sm" className="rounded-none font-mono text-xs h-7">
                    <Trash2 className="mr-1 h-3 w-3" />
                    &gt; DELETE
                  </Button>
                </div>
              )}
            </div>

            {/* Terminal Table */}
            <div className="border border-border">
              {/* Table Header */}
              <div className="border-b border-border bg-muted/30">
                {table.getHeaderGroups().map((headerGroup) => (
                  <div key={headerGroup.id} className="flex items-center px-4 py-2">
                    {headerGroup.headers.map((header) => (
                      <div
                        key={header.id}
                        className="flex-1"
                        style={{
                          width: header.id === "select" ? 40 : header.id === "actions" ? 60 : undefined,
                          flex: header.id === "select" || header.id === "actions" ? "0 0 auto" : 1,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <div
                      key={row.id}
                      className={`flex items-center px-4 py-3 hover:bg-muted/30 ${
                        row.getIsSelected() ? "bg-primary/5" : ""
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <div
                          key={cell.id}
                          className="flex-1"
                          style={{
                            width: cell.column.id === "select" ? 40 : cell.column.id === "actions" ? 60 : undefined,
                            flex: cell.column.id === "select" || cell.column.id === "actions" ? "0 0 auto" : 1,
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <span className="font-mono text-xs text-muted-foreground">
                      [NO_RESULTS]: Query returned 0 users
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">ROWS_PER_PAGE:</span>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="rounded-none h-7 w-[70px] font-mono text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none min-w-[70px] font-mono text-xs">
                    {[10, 25, 50, 100].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`} className="rounded-none focus:bg-primary focus:text-primary-foreground">
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  PAGE: {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="font-mono text-xs h-7"
                  >
                    &lt; PREV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="font-mono text-xs h-7"
                  >
                    NEXT &gt;
                  </Button>
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
          <div className="p-4">
            <div className="mb-3 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
            <div className="space-y-1.5 font-mono text-xs">
              <div><span className="text-success">&gt;</span> TanStack Table v8 with sorting, filtering, pagination</div>
              <div><span className="text-success">&gt;</span> Bulk actions (select multiple users)</div>
              <div><span className="text-success">&gt;</span> Column visibility toggle</div>
              <div><span className="text-success">&gt;</span> Search by name/email</div>
              <div><span className="text-success">&gt;</span> Export to CSV functionality</div>
              <div><span className="text-success">&gt;</span> Role badges (Admin, User, Guest)</div>
              <div><span className="text-success">&gt;</span> Status indicators (Active, Inactive, Suspended)</div>
              <div><span className="text-success">&gt;</span> Row actions menu (Edit, Suspend, Delete)</div>
              <div><span className="text-success">&gt;</span> Stats cards (Total, Active, Admins, Enterprise)</div>
              <div><span className="text-success">&gt;</span> Terminal console aesthetic</div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: Replace mockUsers with your API data. Add API routes for edit/delete/suspend actions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
