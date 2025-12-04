/**
 * FABRK COMPONENT
 * Comparison Table - Feature comparison across plans
 */

import { Check, X } from "lucide-react";
import { TerminalCardHeader } from "@/components/ui/card";

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
      <Check className="text-success mx-auto h-4 w-4" />
    ) : (
      <X className="text-muted-foreground mx-auto h-4 w-4" />
    );
  }
  return value;
}

export function ComparisonTable({ features }: ComparisonTableProps) {
  return (
    <div className="border-border bg-card border">
      <TerminalCardHeader code="0x00" title="COMPARISON" />

      <div className="p-4">
        <div className="text-muted-foreground mb-4 font-mono text-xs">[FEATURE_COMPARISON]:</div>

        <div className="border-border overflow-x-auto border">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-border bg-muted/30 border-b">
                <th className="text-muted-foreground px-4 py-4 text-left">[FEATURE]</th>
                <th className="text-muted-foreground px-4 py-4 text-center">STARTER</th>
                <th className="text-primary px-4 py-4 text-center">PRO</th>
                <th className="text-muted-foreground px-4 py-4 text-center">ENTERPRISE</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {features.map((feature, idx) => (
                <tr key={idx} className="hover:bg-muted/30">
                  <td className="px-4 py-4">{feature.name}</td>
                  <td className="px-4 py-4 text-center">{renderCell(feature.starter)}</td>
                  <td className="px-4 py-4 text-center">{renderCell(feature.pro)}</td>
                  <td className="px-4 py-4 text-center">{renderCell(feature.enterprise)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
