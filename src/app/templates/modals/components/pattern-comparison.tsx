/**
 * FABRK COMPONENT
 * Pattern Comparison - Table comparing modal patterns
 */

export function PatternComparison() {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-none bg-destructive/50" />
          <div className="size-2 rounded-none bg-warning/50" />
          <div className="size-2 rounded-none bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          comparison.md
        </span>
      </div>
      <div className="p-4">
        <div className="font-mono text-xs text-muted-foreground mb-4">
          [WHEN_TO_USE]:
        </div>
        <div className="border border-border overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-2 text-muted-foreground">
                  [PATTERN]
                </th>
                <th className="text-left px-4 py-2 text-muted-foreground">
                  USE_CASE
                </th>
                <th className="text-left px-4 py-2 text-muted-foreground">
                  BLOCKING
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2 font-medium">AlertDialog</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Destructive/irreversible actions
                </td>
                <td className="px-4 py-2">Yes (modal)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Dialog</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Forms, creation flows
                </td>
                <td className="px-4 py-2">Yes (modal)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Sheet</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Settings, navigation, details
                </td>
                <td className="px-4 py-2">Yes (slide-over)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Popover</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Contextual info, quick actions
                </td>
                <td className="px-4 py-2">No (floating)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
