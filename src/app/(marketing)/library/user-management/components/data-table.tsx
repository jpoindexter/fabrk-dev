/**
 * Data table component with terminal styling
 */

import { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type { User } from "./types";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

interface DataTableProps {
  table: Table<User>;
}

export function DataTable({ table }: DataTableProps) {
  return (
    <div className="border-border border">
      {/* Table Header */}
      <div className="border-border bg-muted/30 border-b">
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
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Table Body */}
      <div className="divide-border divide-y">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className={`hover:bg-muted/30 flex items-center px-4 py-4 ${
                row.getIsSelected() ? "bg-primary/5" : ""
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  className="flex-1"
                  style={{
                    width:
                      cell.column.id === "select"
                        ? 40
                        : cell.column.id === "actions"
                          ? 60
                          : undefined,
                    flex:
                      cell.column.id === "select" || cell.column.id === "actions" ? "0 0 auto" : 1,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="px-4 py-8 text-center">
            <span className={cn(mode.font, "text-muted-foreground text-xs")}>
              [NO_RESULTS]: Query returned 0 users
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
