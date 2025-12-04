"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "@/lib/utils";
import { mode } from "@/lib/design-system";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer bg-muted focus-visible:ring-primary data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted inline-flex h-7 w-14 shrink-0 cursor-pointer items-center border transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        mode.radius,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background pointer-events-none block h-5 w-5 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0.5",
          mode.radius
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
