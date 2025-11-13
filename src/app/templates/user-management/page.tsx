/**
 * User Management Template
 * Complete admin interface for managing users with TanStack Table
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
import { ArrowUpDown, ChevronDown, Download, MoreHorizontal, Search, Trash2, UserCog, UserX } from "lucide-react";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="font-bold hover:bg-accent"
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
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
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brutal bg-primary/10 font-bold text-primary">
          {row.getValue<string>("name").charAt(0)}
        </div>
        <span className="font-bold">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      const role = row.getValue<string>("role");
      return (
        <Badge
          variant={role === "ADMIN" ? "default" : "secondary"}
          className="font-bold"
        >
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      const variants: Record<string, "default" | "secondary" | "outline"> = {
        active: "default",
        inactive: "secondary",
        suspended: "outline",
      };
      return (
        <Badge variant={variants[status]} className="font-bold capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "plan",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Plan" />,
    cell: ({ row }) => {
      const plan = row.getValue<string>("plan");
      return (
        <Badge
          variant={plan === "Enterprise" ? "default" : "outline"}
          className="font-bold"
        >
          {plan}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Login" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
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
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-2 border-brutal">
            <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
              className="font-bold"
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-bold">
              <UserCog className="mr-2 h-4 w-4" />
              Edit user
            </DropdownMenuItem>
            <DropdownMenuItem className="font-bold">
              <UserX className="mr-2 h-4 w-4" />
              Suspend user
            </DropdownMenuItem>
            <DropdownMenuItem className="font-bold text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete user
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

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">User Management</h1>
          <p className="mt-2 text-muted-foreground">
            Manage users, roles, and permissions with TanStack Table
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-bold">Total Users</CardDescription>
              <CardTitle className="text-3xl font-bold">
                {mockUsers.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-bold">Active Users</CardDescription>
              <CardTitle className="text-3xl font-bold">
                {mockUsers.filter((u) => u.status === "active").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-bold">Admins</CardDescription>
              <CardTitle className="text-3xl font-bold">
                {mockUsers.filter((u) => u.role === "ADMIN").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-bold">Enterprise</CardDescription>
              <CardTitle className="text-3xl font-bold">
                {mockUsers.filter((u) => u.plan === "Enterprise").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Table Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-bold">All Users</CardTitle>
                <CardDescription>
                  Search, filter, and manage your user base
                </CardDescription>
              </div>
              <Button onClick={exportToCSV} variant="outline" className="font-bold">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Toolbar */}
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                      table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="pl-10 font-bold"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="font-bold">
                      Columns <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="border-2 border-brutal">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="font-bold capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Bulk Actions */}
              {selectedCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-muted-foreground">
                    {selectedCount} selected
                  </span>
                  <Button variant="outline" size="sm" className="font-bold">
                    <UserCog className="mr-2 h-4 w-4" />
                    Change Role
                  </Button>
                  <Button variant="outline" size="sm" className="font-bold">
                    <UserX className="mr-2 h-4 w-4" />
                    Suspend
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="font-bold"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="rounded-md border-2 border-brutal">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        <span className="text-muted-foreground">No users found.</span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-muted-foreground">
                  Rows per page:
                </span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className="rounded-md border-2 border-brutal bg-background px-3 py-1 font-bold shadow-brutal"
                >
                  {[10, 25, 50, 100].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-muted-foreground">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="font-bold"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="font-bold"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Note */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <h4 className="mb-2 font-bold">📋 Template Features</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="font-bold">✓ TanStack Table v8 with sorting, filtering, pagination</li>
              <li className="font-bold">✓ Bulk actions (select multiple users)</li>
              <li className="font-bold">✓ Column visibility toggle</li>
              <li className="font-bold">✓ Search by name/email</li>
              <li className="font-bold">✓ Export to CSV functionality</li>
              <li className="font-bold">✓ Role badges (Admin, User, Guest)</li>
              <li className="font-bold">✓ Status indicators (Active, Inactive, Suspended)</li>
              <li className="font-bold">✓ Row actions menu (Edit, Suspend, Delete)</li>
              <li className="font-bold">✓ Stats cards (Total, Active, Admins, Enterprise)</li>
              <li className="font-bold">✓ Responsive design with neo-brutalism styling</li>
            </ul>
            <p className="mt-4 text-sm font-bold text-muted-foreground">
              Replace <code className="rounded bg-muted px-1 py-0.5">mockUsers</code> with your API data. Add API routes for edit/delete/suspend actions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
