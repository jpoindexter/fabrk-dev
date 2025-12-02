"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, MapPin, Link as LinkIcon } from "lucide-react";

export default function HoverCardPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.40]"
      category="Components"
      title="Hover Card"
      description="A card that displays additional content when hovering over an element."
      importCode={`import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"`}
      mainPreview={{
        preview: (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="font-mono text-sm">
                @nextjs
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 rounded-none">
              <div className="flex justify-between space-x-4">
                <Avatar className="rounded-none">
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback className="rounded-none">VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="font-mono text-sm font-semibold">@nextjs</h4>
                  <p className="text-sm text-muted-foreground">
                    The React Framework - created and maintained by @vercel.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-muted-foreground">
                      Joined December 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ),
        code: `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@nextjs</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm">
          The React Framework - created and maintained by @vercel.
        </p>
        <div className="flex items-center pt-2">
          <CalendarDays className="mr-2 h-4 w-4" />
          <span className="text-xs">Joined December 2021</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
      }}
      variants={[
        {
          title: "Simple Text Card",
          description: "Hover card with basic text content.",
          preview: (
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-pointer border-b border-dashed border-border font-mono text-sm">
                  Hover for details
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-64 rounded-none">
                <div className="space-y-2">
                  <h4 className="font-mono text-sm font-semibold">Information</h4>
                  <p className="text-sm text-muted-foreground">
                    This is additional information that appears when you hover over the trigger element.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          code: `<HoverCard>
  <HoverCardTrigger asChild>
    <span className="cursor-pointer border-b border-dashed">
      Hover for details
    </span>
  </HoverCardTrigger>
  <HoverCardContent className="w-64">
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">Information</h4>
      <p className="text-sm">
        This is additional information that appears on hover.
      </p>
    </div>
  </HoverCardContent>
</HoverCard>`,
        },
        {
          title: "With Icons",
          description: "Hover card with icon-based information.",
          preview: (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" className="rounded-none font-mono text-xs">
                  View Location
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 rounded-none">
                <div className="space-y-4">
                  <h4 className="font-mono text-sm font-semibold">San Francisco, CA</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        123 Market Street
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        www.example.com
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          code: `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="outline">View Location</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="space-y-4">
      <h4 className="text-sm font-semibold">San Francisco, CA</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">123 Market Street</span>
        </div>
        <div className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4" />
          <span className="text-sm">www.example.com</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
        },
        {
          title: "User Profile Card",
          description: "Hover card displaying user profile information.",
          preview: (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="h-8 w-8 rounded-none">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="rounded-none">SC</AvatarFallback>
                  </Avatar>
                  <span className="font-mono text-sm">@shadcn</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 rounded-none">
                <div className="flex gap-4">
                  <Avatar className="rounded-none">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="rounded-none">SC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-mono text-sm font-semibold">shadcn</h4>
                      <p className="text-xs text-muted-foreground">@shadcn</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Building beautiful UIs with React and Tailwind CSS.
                    </p>
                    <div className="flex gap-4 pt-2 text-xs text-muted-foreground">
                      <div>
                        <span className="font-semibold text-foreground">142</span> Following
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">2.4k</span> Followers
                      </div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          code: `<HoverCard>
  <HoverCardTrigger asChild>
    <div className="flex items-center gap-2 cursor-pointer">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <span>@shadcn</span>
    </div>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">shadcn</h4>
        <p className="text-sm">Building beautiful UIs.</p>
        <div className="flex gap-4 text-xs">
          <div><span className="font-semibold">142</span> Following</div>
          <div><span className="font-semibold">2.4k</span> Followers</div>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
        },
        {
          title: "Terminal Style Card",
          description: "Hover card with terminal-style design matching Fabrk theme.",
          preview: (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" className="rounded-none font-mono text-xs">
                  &gt; HOVER_INFO
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 rounded-none">
                <div className="space-y-4">
                  <div className="font-mono text-xs text-muted-foreground">
                    [SYSTEM_INFO]:
                  </div>
                  <div className="border border-border bg-muted/30 p-4">
                    <div className="mb-2 font-mono text-xs text-muted-foreground">
                      [ [0x00] STATUS ]
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      <div>
                        <span className="text-muted-foreground">Version:</span>{" "}
                        <span className="text-primary">2.0.1</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>{" "}
                        <span className="text-success">ACTIVE</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Uptime:</span>{" "}
                        <span className="text-foreground">99.9%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          code: `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="outline" className="rounded-none font-mono">
      &gt; HOVER_INFO
    </Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80 rounded-none">
    <div className="space-y-4">
      <div className="font-mono text-xs">[SYSTEM_INFO]:</div>
      <div className="border bg-muted/30 p-4">
        <div className="font-mono text-xs">
          <div>Version: <span className="text-primary">2.0.1</span></div>
          <div>Status: <span className="text-success">ACTIVE</span></div>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
        },
      ]}
      props={[
        {
          name: "openDelay",
          type: "number",
          default: "700",
          description: "Delay in ms before opening (set on HoverCard root).",
        },
        {
          name: "closeDelay",
          type: "number",
          default: "300",
          description: "Delay in ms before closing (set on HoverCard root).",
        },
        {
          name: "align",
          type: '"start" | "center" | "end"',
          default: '"center"',
          description: "For HoverCardContent - horizontal alignment relative to the trigger.",
        },
        {
          name: "sideOffset",
          type: "number",
          default: "4",
          description: "For HoverCardContent - distance in pixels between trigger and content.",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description: "For HoverCardTrigger - merge props with child element instead of wrapping.",
        },
      ]}
      accessibility={[
        "Built on Radix UI with full ARIA support",
        "Keyboard accessible with focus triggers",
        "Escape key to dismiss the card",
        "Screen reader compatible with proper ARIA attributes",
        "Focus returns to trigger when closed",
        "Respects user's motion preferences",
        "Configurable delays for better UX",
      ]}
      previous={{ title: "Hero", href: "/docs/components/hero" }}
      next={{ title: "Image Dropzone", href: "/docs/components/image-dropzone" }}
    />
  );
}
