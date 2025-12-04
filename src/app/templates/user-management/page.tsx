/**
 * ✅ FABRK COMPONENT
 * User Management Template - Terminal console style
 * Production-ready ✓
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
import { TerminalCard, TerminalCardHeader, TemplatePageHeader } from "@/components/ui/card";
import { columns } from "./components/user-table-columns";
import { mockUsers } from "./components/types";
import { StatsCards } from "./components/stats-cards";
import { TableToolbar } from "./components/table-toolbar";
import { DataTable } from "./components/data-table";
import { PaginationControls } from "./components/pagination-controls";
import { FeaturesNote } from "./components/features-note";

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

    const csv = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div>
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <TemplatePageHeader
            badge="USER_MANAGEMENT"
            title="User Management"
            description="Manage users, roles, and permissions with TanStack Table"
          />
          <Button className="rounded-none font-mono text-xs">
            <UserPlus className="mr-2 h-4 w-4" />
            &gt; ADD_USER
          </Button>
        </div>

        {/* Stats Cards - Terminal Style */}
        <StatsCards users={mockUsers} />

        {/* Main Table Card - Terminal Style */}
        <TerminalCard>
          <TerminalCardHeader code="0x00" title="USERS_DATABASE" />

          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-muted-foreground font-mono text-xs">
                [ALL_USERS]: COUNT={mockUsers.length} | FILTERED=
                {table.getFilteredRowModel().rows.length}
              </div>
              <Button
                onClick={exportToCSV}
                variant="outline"
                size="sm"
                className="h-7 rounded-none font-mono text-xs"
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
        </TerminalCard>

        {/* Implementation Note */}
        <FeaturesNote />
      </div>
    </div>
  );
}
