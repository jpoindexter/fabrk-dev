/**
 * FABRK COMPONENT
 * Comparison Table - Feature comparison across plans
 */

import { Check, X } from "lucide-react";

interface ComparisonFeature {
  name: string;
  starter: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

interface ComparisonTableProps {
  features: ComparisonFeature[];
}

function renderCell(value: string | boolean) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-4 w-4 text-success mx-auto" />
    ) : (
      <X className="h-4 w-4 text-muted-foreground mx-auto" />
    );
  }
  return value;
}

export function ComparisonTable({ features }: ComparisonTableProps) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          comparison.csv
        </span>
      </div>

      <div className="p-4">
        <div className="font-mono text-xs text-muted-foreground mb-4">
          [FEATURE_COMPARISON]:
        </div>

        <div className="border border-border overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-4 text-muted-foreground">
                  [FEATURE]
                </th>
                <th className="text-center px-4 py-4 text-muted-foreground">
                  STARTER
                </th>
                <th className="text-center px-4 py-4 text-primary">PRO</th>
                <th className="text-center px-4 py-4 text-muted-foreground">
                  ENTERPRISE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {features.map((feature, idx) => (
                <tr key={idx} className="hover:bg-muted/30">
                  <td className="px-4 py-4">{feature.name}</td>
                  <td className="text-center px-4 py-4">
                    {renderCell(feature.starter)}
                  </td>
                  <td className="text-center px-4 py-4">
                    {renderCell(feature.pro)}
                  </td>
                  <td className="text-center px-4 py-4">
                    {renderCell(feature.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
