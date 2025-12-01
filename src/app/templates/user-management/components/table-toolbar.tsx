/**
 * Table toolbar with search, filters, and bulk actions
 */

import { Table } from "@tanstack/react-table";
import { Search, ChevronDown, UserCog, UserX, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "./types";

interface TableToolbarProps {
  table: Table<User>;
}

export function TableToolbar({ table }: TableToolbarProps) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="search_users..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="rounded-none pl-10 font-mono text-xs"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-none font-mono text-xs">
              [COLUMNS] <ChevronDown className="ml-2 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-none border border-border font-mono text-xs">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="rounded-none focus:bg-primary focus:text-primary-foreground"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id.toUpperCase()}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Bulk Actions */}
      {selectedCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">
            SELECTED: {selectedCount}
          </span>
          <Button variant="outline" size="sm" className="rounded-none font-mono text-xs h-7">
            <UserCog className="mr-1 h-3 w-3" />
            &gt; ROLE
          </Button>
          <Button variant="outline" size="sm" className="rounded-none font-mono text-xs h-7">
            <UserX className="mr-1 h-3 w-3" />
            &gt; SUSPEND
          </Button>
          <Button variant="destructive" size="sm" className="rounded-none font-mono text-xs h-7">
            <Trash2 className="mr-1 h-3 w-3" />
            &gt; DELETE
          </Button>
        </div>
      )}
    </div>
  );
}
