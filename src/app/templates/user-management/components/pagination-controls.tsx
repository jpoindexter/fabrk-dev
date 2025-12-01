/**
 * Pagination controls component
 */

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "./types";

interface PaginationControlsProps {
  table: Table<User>;
}

export function PaginationControls({ table }: PaginationControlsProps) {
  return (
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
  );
}
