"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Trash2, Edit, Save, Settings } from "lucide-react";

export default function TooltipPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.24]"
      category="Components"
      title="Tooltip"
      description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
      importCode={`import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"`}
      mainPreview={{
        preview: (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
        code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      }}
      variants={[
        {
          title: "Icon Button",
          description: "Tooltip on an icon button for accessibility.",
          preview: (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add new item</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add new item</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        },
        {
          title: "Destructive Action",
          description: "Tooltip explaining a destructive action.",
          preview: (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete permanently</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="destructive" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Delete permanently</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        },
        {
          title: "With Keyboard Shortcut",
          description: "Tooltip showing keyboard shortcut hint.",
          preview: (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Save className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Save <kbd className="ml-1 rounded bg-muted px-1 text-xs">⌘S</kbd>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Save className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>
        Save <kbd className="ml-1 rounded bg-muted px-1">⌘S</kbd>
      </p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        },
        {
          title: "Multiple Tooltips",
          description: "Multiple tooltips using a single provider.",
          preview: (
            <TooltipProvider>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          ),
          code: `<TooltipProvider>
  <div className="flex gap-2">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Edit</p>
      </TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete</p>
      </TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>`,
        },
        {
          title: "Custom Delay",
          description: "Tooltip with custom delay before showing.",
          preview: (
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Delayed Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This tooltip has a 300ms delay</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          code: `<TooltipProvider delayDuration={300}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary">Delayed Tooltip</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This tooltip has a 300ms delay</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        },
      ]}
      props={[
        {
          name: "delayDuration",
          type: "number",
          default: "700",
          description: "The duration from when the mouse enters a tooltip trigger until the tooltip opens (in ms). Set on TooltipProvider.",
        },
        {
          name: "skipDelayDuration",
          type: "number",
          default: "300",
          description: "How long a user has to enter another trigger without delay after closing a tooltip (in ms). Set on TooltipProvider.",
        },
        {
          name: "open",
          type: "boolean",
          default: "undefined",
          description: "Control the open state of the tooltip.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          default: "undefined",
          description: "Event handler called when the open state changes.",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          default: "false",
          description: "The initial open state in uncontrolled mode.",
        },
        {
          name: "sideOffset",
          type: "number",
          default: "4",
          description: "The distance in pixels from the trigger.",
        },
      ]}
      accessibility={[
        "Implements ARIA tooltip pattern with role='tooltip'",
        "TooltipTrigger has aria-describedby pointing to the tooltip content",
        "Tooltip appears on hover and keyboard focus",
        "Escape key dismisses the tooltip",
        "Automatically positions to stay in viewport",
        "Essential for icon-only buttons to provide accessible labels",
        "Respects prefers-reduced-motion for animations",
        "Should not contain interactive content (use Popover instead)",
      ]}
      previous={{ title: "Popover", href: "/docs/components/popover" }}
      next={{ title: "Dialog", href: "/docs/components/dialog" }}
    />
  );
}
