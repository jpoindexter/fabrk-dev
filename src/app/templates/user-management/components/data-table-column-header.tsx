/**
 * Sortable column header component
 */

import { ArrowUpDown } from "lucide-react";

export function DataTableColumnHeader({
  column,
  title,
}: {
  column: any;
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
