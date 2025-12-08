/**
 * FABRK COMPONENT
 * User Management Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UserPlus, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, TemplatePageHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { columns } from "./components/user-table-columns";
import { mockUsers } from "./components/types";
import { StatsCards } from "./components/stats-cards";
import { TableToolbar } from "./components/table-toolbar";
import { DataTable } from "./components/data-table";
import { PaginationControls } from "./components/pagination-controls";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

const templateCode = `"use client";

import { useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UserPlus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function UserManagement() {
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

  return (
    <div className="container mx-auto max-w-7xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className={cn(mode.font, "text-2xl font-semibold")}>
          User Management
        </h1>
        <Button className={cn(mode.radius, mode.font, "text-xs")}>
          <UserPlus className="mr-2 h-4 w-4" />
          &gt; ADD_USER
        </Button>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader code="0x00" title="USERS_DATABASE" />
        <div className="p-4">
          {/* Search and filters */}
          <Input
            placeholder="Search users..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value)
            }
            className={cn(mode.radius, mode.font, "mb-4 max-w-sm text-xs")}
          />

          {/* Table */}
          <DataTable columns={columns} data={table.getRowModel().rows} />

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={cn(mode.radius, mode.font, "text-xs")}
            >
              &lt; PREV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={cn(mode.radius, mode.font, "text-xs")}
            >
              &gt; NEXT
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}`;

function UserManagementPreview() {
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

    const csv = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="bg-background/50 min-h-[600px] p-4 sm:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className={cn(mode.font, "text-2xl font-semibold")}>User Management</h1>
          <Button className={cn(mode.radius, mode.font, "text-xs")}>
            <UserPlus className="mr-2 h-4 w-4" />
            &gt; ADD_USER
          </Button>
        </div>

        {/* Stats Cards */}
        <StatsCards users={mockUsers} />

        {/* Main Table Card */}
        <Card>
          <CardHeader code="0x00" title="USERS_DATABASE" />

          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className={cn(mode.font, "text-muted-foreground text-xs")}>
                [ALL_USERS]: COUNT={mockUsers.length} | FILTERED=
                {table.getFilteredRowModel().rows.length}
              </div>
              <Button
                onClick={exportToCSV}
                variant="outline"
                size="sm"
                className={cn(mode.radius, mode.font, "h-7 text-xs")}
              >
                <Download className="mr-2 h-3 w-3" />
                &gt; EXPORT_CSV
              </Button>
            </div>

            {/* Toolbar */}
            <TableToolbar table={table} />

            {/* Terminal Table */}
            <DataTable table={table} />

            {/* Pagination */}
            <PaginationControls table={table} />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function UserManagementTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="USER_MANAGEMENT"
          title="User Management"
          description="Manage users, roles, and permissions with TanStack Table"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE_PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  "h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0",
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    "border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs",
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={cn(
                    "border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs",
                    mode.radius,
                    mode.font
                  )}
                >
                  [CODE]
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE_PREVIEW" />
              <UserManagementPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE_CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE_STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, "space-y-1 text-xs")}>
              <div className="text-muted-foreground">[FILES]:</div>
              <div className="space-y-1 pl-4">
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">admin/users/</span>
                  <span className="text-foreground">page.tsx</span>
                  <span className="text-muted-foreground ml-4">← Copy template here</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x03" title="FEATURES" />
          <CardContent padding="md">
            <div className={cn(mode.font, "space-y-2 text-xs")}>
              <div>
                <span className="text-success">&gt;</span> TanStack Table integration
              </div>
              <div>
                <span className="text-success">&gt;</span> Sorting, filtering, pagination
              </div>
              <div>
                <span className="text-success">&gt;</span> CSV export functionality
              </div>
              <div>
                <span className="text-success">&gt;</span> User stats dashboard
              </div>
              <div>
                <span className="text-success">&gt;</span> Role-based status badges
              </div>
              <div>
                <span className="text-success">&gt;</span> Responsive table layout
              </div>
              <div>
                <span className="text-success">&gt;</span> DS-compliant (mode.font, mode.radius)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
