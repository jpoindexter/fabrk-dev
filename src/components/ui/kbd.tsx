/**
 * ✅ FABRK COMPONENT
 * Display keyboard keys or keyboard shortcuts.
 *
 * @example
 * ```tsx
 * <Kbd>Ctrl</Kbd>
 *
 * <KbdGroup>
 *   <Kbd>Ctrl</Kbd>
 *   <span>+</span>
 *   <Kbd>B</Kbd>
 * </KbdGroup>
 * ```
 */

import { cn } from "@/lib/design-system/utils";

export type KbdProps = React.ComponentProps<"kbd"> & {
  /**
   * Accessible label for the keyboard shortcut
   * Recommended for complex shortcuts (e.g., "Control plus B")
   */
  "aria-label"?: string;
};
export type KbdGroupProps = React.ComponentProps<"div"> & {
  /**
   * Accessible label describing the full shortcut
   * e.g., "Keyboard shortcut: Control plus B"
   */
  "aria-label"?: string;
};

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-card border border-border px-1 font-sans text-xs font-medium text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      role="text"
      {...props}
    />
  );
}
Kbd.displayName = "Kbd";

function KbdGroup({ className, ...props }: KbdGroupProps) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      role="text"
      {...props}
    />
  );
}
KbdGroup.displayName = "KbdGroup";

export { Kbd, KbdGroup };
