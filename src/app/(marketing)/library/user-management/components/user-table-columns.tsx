/**
 * Table columns definition for user management
 */

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Trash2, UserCog, UserX, Shield, User, Users } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from './data-table-column-header';
import type { User as UserType } from './types';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<UserType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-border"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-border"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <div
          className={cn(
            mode.font,
            'border-border bg-muted flex h-8 w-8 items-center justify-center border text-xs'
          )}
        >
          {row
            .getValue<string>('name')
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <span className={cn(mode.radius, mode.font, 'text-xs')}>{row.getValue('name')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => (
      <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
        {row.getValue('email')}
      </span>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      const role = row.getValue<string>('role');
      const roleColors: Record<string, string> = {
        ADMIN: 'text-primary border-primary/50',
        USER: 'text-foreground border-border',
        GUEST: 'text-muted-foreground border-border',
      };
      const RoleIcon = role === 'ADMIN' ? Shield : role === 'USER' ? User : Users;
      return (
        <span
          className={`inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-xs ${roleColors[role]}`}
        >
          <RoleIcon className="h-3 w-3" />
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue<string>('status');
      const statusColors: Record<string, string> = {
        active: 'text-success',
        inactive: 'text-muted-foreground',
        suspended: 'text-destructive',
      };
      return (
        <span className={cn(mode.radius, mode.font, 'text-xs')}>
          <span className="text-muted-foreground">STATUS:</span>{' '}
          <span className={statusColors[status]}>{status.toUpperCase()}</span>
        </span>
      );
    },
  },
  {
    accessorKey: 'plan',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Plan" />,
    cell: ({ row }) => {
      const plan = row.getValue<string>('plan');
      const planColors: Record<string, string> = {
        Enterprise: 'text-primary border-primary/50',
        Pro: 'text-warning border-warning/50',
        Free: 'text-muted-foreground border-border',
      };
      return (
        <span className={`border px-2 py-0.5 font-mono text-xs ${planColors[plan]}`}>
          {plan.toUpperCase()}
        </span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => (
      <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
        {new Date(row.getValue('createdAt')).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: 'lastLogin',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Login" />,
    cell: ({ row }) => (
      <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
        {row.getValue('lastLogin')}
      </span>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="border-border hover:bg-muted flex h-8 w-8 items-center justify-center border">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={cn(mode.radius, mode.font, 'border-border border text-xs')}
          >
            <DropdownMenuLabel className="text-muted-foreground">[ACTIONS]</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              &gt; COPY_ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCog className="mr-2 h-3 w-3" />
              &gt; EDIT
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserX className="mr-2 h-3 w-3" />
              &gt; SUSPEND
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-3 w-3" />
              &gt; DELETE
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
