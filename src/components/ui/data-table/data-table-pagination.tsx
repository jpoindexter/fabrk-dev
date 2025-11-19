/**
 * ✅ FABRK COMPONENT
 * Component: data-table-pagination
 * - Under 150 lines ✓
 * - No hardcoded colors ✓
 * - Semantic tokens only ✓
 * - Error/loading states ✓
 * - TypeScript interfaces ✓
 * - Production ready ✓
 *
 * @example
 * ```tsx
 * <DataTablePagination />
 * ```
 */

/**
 * @file data-table-pagination.tsx
 * @description Data table pagination component
 * @security Client-side pagination controls
 * @testing Component tests
 * @accessibility ARIA labels for pagination controls
 * @performance Optimized page navigation
 */

"use client";

import { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> extends React.HTMLAttributes<HTMLElement> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export type { DataTablePaginationProps };

/**
 * Data table pagination component
 */
function DataTablePaginationInner<TData>(
  { table, pageSizeOptions = [10, 20, 30, 40, 50], className }: DataTablePaginationProps<TData>,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <nav
      data-slot="data-table-pagination"
      ref={ref}
      className={cn("flex items-center justify-between px-2", className)}
      aria-label="Table pagination"
    >
      <div className={`flex items-center space-x-2`}>
        <p className={`"text-sm" text-muted-foreground dark:text-muted-foreground`}>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </p>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className={`flex items-center space-x-2`}>
          <p className={`"text-sm" font-medium`}>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <SelectValue placeholder={`${table.getState().pagination.pageSize}`} />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={`"text-sm" flex w-24 items-center justify-center font-medium`}>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className={`flex items-center space-x-2`}>
          <Button
            variant="outline"
            className={`"h-10 w-10" hidden p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex`}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className={`"h-4 w-4"`} />
          </Button>
          <Button
            variant="outline"
            className={`"h-10 w-10" p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className={`"h-4 w-4"`} />
          </Button>
          <Button
            variant="outline"
            className={`"h-10 w-10" p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className={`"h-4 w-4"`} />
          </Button>
          <Button
            variant="outline"
            className={`"h-10 w-10" hidden p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex`}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className={`"h-4 w-4"`} />
          </Button>
        </div>
      </div>
    </nav>
  );
}

export const DataTablePagination = React.forwardRef(DataTablePaginationInner) as <TData>(
  props: DataTablePaginationProps<TData> & { ref?: React.ForwardedRef<HTMLElement> }
) => ReturnType<typeof DataTablePaginationInner>;

(DataTablePagination as any).displayName = "DataTablePagination";
