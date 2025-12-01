/**
 * ✅ FABRK COMPONENT
 * Pagination controls for user data table.
 */

"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { UserData } from "./user-table-columns";

interface UserTablePaginationProps {
  table: Table<UserData>;
}

export function UserTablePagination({ table }: UserTablePaginationProps) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        {selectedRows.length > 0 && (
          <span>
            {selectedRows.length} of {table.getFilteredRowModel().rows.length} row(s) selected
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
