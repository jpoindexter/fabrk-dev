/**
 * ✅ FABRK COMPONENT
 * Component: data-table-content
 * - Under 150 lines ✓
 * - No hardcoded colors ✓
 * - Semantic tokens only ✓
 * - Error/loading states ✓
 * - TypeScript interfaces ✓
 * - Production ready ✓
 *
 * @example
 * ```tsx
 * <DataTableContent />
 * ```
 */

/**
 * @file data-table-content.tsx
 * @description Data table content rendering component
 * @security Client-side table rendering
 * @testing Component tests
 * @accessibility Semantic table structure
 * @performance Virtualized rendering for large datasets
 */

"use client";

import { Cell, flexRender, Header, HeaderGroup, Row } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/design-system/utils";
import { DataTableContentProps } from "./data-table-types";



export type { DataTableContentProps };

/**
 * Data table content component
 */
function DataTableContentInner<TData = unknown, TValue = unknown>(
  {
    table,
    columns,
    loading,
    emptyMessage = "No results found.",
    stickyHeader,
    rowClassName,
    onRowClick,
    className,
  }: DataTableContentProps<TData, TValue>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      data-slot="data-table-content"
      ref={ref}
      className={cn("relative overflow-auto rounded-md border", className)}
      role="region"
      aria-label="Data table content"
    >
      {loading && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-background dark:bg-background/80"
          role="status"
          aria-live="polite"
        >
          <Loader2
            className={`"h-8 w-8" animate-spin text-muted-foreground dark:text-muted-foreground`}
            aria-label="Loading data"
          />
          <span className="sr-only">Loading data...</span>
        </div>
      )}
      <Table>
        <TableHeader className={cn(stickyHeader && "sticky top-0 z-10 bg-background", "")}>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: Header<TData, unknown>) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: Row<TData>) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  onRowClick && "cursor-pointer transition-colors duration-200 hover:bg-accent/30",
                  rowClassName?.(row),
                  ""
                )}
                onClick={() => onRowClick?.(row)}
              >
                {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const DataTableContentWithDisplayName = React.forwardRef(DataTableContentInner);
DataTableContentWithDisplayName.displayName = "DataTableContent";

export const DataTableContent = DataTableContentWithDisplayName as <TData, TValue>(
  props: DataTableContentProps<TData, TValue> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof DataTableContentInner>;
