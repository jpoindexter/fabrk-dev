"use client";

import { Monitor, Layers, Box, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import { useThemeContext } from "@/design-system/providers";

const modes = [
  { id: "terminal", name: "Terminal", icon: Monitor },
  { id: "modern", name: "Modern", icon: Layers },
  { id: "minimal", name: "Minimal", icon: Minus },
  { id: "linear", name: "Linear", icon: Box },
] as const;

export function VisualModeSwitcher() {
  const { visualMode, setVisualMode } = useThemeContext();

  const currentMode = modes.find((m) => m.id === visualMode) || modes[0];
  const Icon = currentMode.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={cn("gap-2", mode.radius, mode.font)}>
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{currentMode.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("w-40", mode.radius)}>
        {modes.map((m) => (
          <DropdownMenuItem
            key={m.id}
            onClick={() => setVisualMode(m.id as any)}
            className={cn(
              "gap-2 font-mono text-xs",
              visualMode === m.id && "bg-primary text-primary-foreground"
            )}
          >
            <m.icon className="h-3.5 w-3.5" />
            {m.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
