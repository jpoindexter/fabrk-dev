/**
 * Sortable column header component
 */

import { ArrowUpDown } from "lucide-react";
import type { Column } from "@tanstack/react-table";

export function DataTableColumnHeader<TData>({
  column,
  title,
}: {
  column: Column<TData, unknown>;
  title: string;
}) {
  return (
    <button
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
    >
      [{title.toUpperCase()}]
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );
}
