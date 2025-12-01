/**
 * DocsPropsTable - API reference table for component props
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { docsTypography } from "../typography";

interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface DocsPropsTableProps {
  /** Array of prop definitions */
  props: Prop[];
}

export function DocsPropsTable({ props }: DocsPropsTableProps) {
  return (
    <div className="border border-border rounded-none overflow-hidden">
      {/* Terminal Header */}
      <div className="border-b border-border px-4 py-2 bg-card">
        <span className="font-mono text-xs text-muted-foreground">
          [ [0x00] API_REFERENCE ]
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase">Prop</TableHead>
            <TableHead className="uppercase">Type</TableHead>
            <TableHead className="uppercase">Default</TableHead>
            <TableHead className="uppercase">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="font-mono text-sm">
                {prop.name}
                {prop.required && <span className="text-destructive ml-1">*</span>}
              </TableCell>
              <TableCell>
                <code className={docsTypography.code}>{prop.type}</code>
              </TableCell>
              <TableCell>
                {prop.default ? (
                  <code className={docsTypography.code}>{prop.default}</code>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className={docsTypography.caption}>
                {prop.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
