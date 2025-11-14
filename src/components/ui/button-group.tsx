/**
 * ✅ FABRK COMPONENT
 * Container that groups related buttons together with optional separators.
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button>Save</Button>
 *   <Button>Cancel</Button>
 * </ButtonGroup>
 *
 * <ButtonGroup orientation="vertical">
 *   <Button>Option 1</Button>
 *   <ButtonGroupSeparator />
 *   <Button>Option 2</Button>
 * </ButtonGroup>
 * ```
 */

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/design-system/utils";

const buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export type ButtonGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof buttonGroupVariants>;
export type ButtonGroupTextProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};
export type ButtonGroupSeparatorProps = React.ComponentProps<typeof Separator>;

function ButtonGroup({ className, orientation, ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}
ButtonGroup.displayName = "ButtonGroup";

function ButtonGroupText({ className, asChild = false, ...props }: ButtonGroupTextProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="button-group-text"
      className={cn(
        "shadow-xs flex items-center gap-2 rounded-md border bg-card px-4 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}
ButtonGroupText.displayName = "ButtonGroupText";

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ButtonGroupSeparatorProps) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative !m-0 self-stretch bg-input data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  );
}
ButtonGroupSeparator.displayName = "ButtonGroupSeparator";

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
