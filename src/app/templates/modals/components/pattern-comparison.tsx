/**
 * FABRK COMPONENT
 * Pattern Comparison - Table comparing modal patterns
 */

import { StyledCardHeader } from "@/components/ui/card";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function PatternComparison() {
  return (
    <div className="border-border bg-card border">
      <StyledCardHeader code="0x00" title="COMPARISON" />
      <div className="p-4">
        <div className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>[WHEN_TO_USE]:</div>
        <div className="border-border overflow-x-auto border">
          <table className={cn(mode.font, "w-full text-xs")}>
            <thead>
              <tr className="border-border bg-muted/30 border-b">
                <th className="text-muted-foreground px-4 py-2 text-left">[PATTERN]</th>
                <th className="text-muted-foreground px-4 py-2 text-left">USE_CASE</th>
                <th className="text-muted-foreground px-4 py-2 text-left">BLOCKING</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              <tr>
                <td className="px-4 py-2 font-medium">AlertDialog</td>
                <td className="text-muted-foreground px-4 py-2">
                  Destructive/irreversible actions
                </td>
                <td className="px-4 py-2">Yes (modal)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Dialog</td>
                <td className="text-muted-foreground px-4 py-2">Forms, creation flows</td>
                <td className="px-4 py-2">Yes (modal)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Sheet</td>
                <td className="text-muted-foreground px-4 py-2">Settings, navigation, details</td>
                <td className="px-4 py-2">Yes (slide-over)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Popover</td>
                <td className="text-muted-foreground px-4 py-2">Contextual info, quick actions</td>
                <td className="px-4 py-2">No (floating)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
