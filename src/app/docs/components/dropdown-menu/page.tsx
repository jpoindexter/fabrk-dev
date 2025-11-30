"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings, User, LogOut, Mail, MessageSquare, PlusCircle, UserPlus, Cloud, Github, Keyboard } from "lucide-react";
import { useState } from "react";

export default function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [position, setPosition] = useState("bottom");

  return (
    <ComponentShowcaseTemplate
      title="Dropdown Menu"
      description="Displays a menu to the user—such as a set of actions or functions—triggered by a button."
      mainPreview={{
        code: `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="font-semibold">
      <User className="mr-2 h-4 w-4" />
      Profile
    </DropdownMenuItem>
    <DropdownMenuItem className="font-semibold">
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive font-semibold">
      <LogOut className="mr-2 h-4 w-4" />
      Log out
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
        component: (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-semibold">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="font-semibold">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive font-semibold">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }}
      variants={[
        {
          title: "With Checkboxes",
          description: "Menu items that can be toggled on and off",
          code: `const [showStatusBar, setShowStatusBar] = useState(true);
const [showActivityBar, setShowActivityBar] = useState(false);

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">View Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem
      checked={showStatusBar}
      onCheckedChange={setShowStatusBar}
    >
      Status Bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem
      checked={showActivityBar}
      onCheckedChange={setShowActivityBar}
    >
      Activity Bar
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`,
          component: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">View Options</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={showStatusBar}
                  onCheckedChange={setShowStatusBar}
                >
                  Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showActivityBar}
                  onCheckedChange={setShowActivityBar}
                >
                  Activity Bar
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
        {
          title: "With Radio Group",
          description: "Menu items for selecting one option from a group",
          code: `const [position, setPosition] = useState("bottom");

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Position: {position}</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`,
          component: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Position: {position}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
        {
          title: "With Submenu",
          description: "Nested menu items for hierarchical navigation",
          code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuItem className="font-semibold">
      <Mail className="mr-2 h-4 w-4" />
      Email
    </DropdownMenuItem>
    <DropdownMenuItem className="font-semibold">
      <MessageSquare className="mr-2 h-4 w-4" />
      Message
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="font-semibold">
        <UserPlus className="mr-2 h-4 w-4" />
        Invite users
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem className="font-semibold">
          <Mail className="mr-2 h-4 w-4" />
          Email
        </DropdownMenuItem>
        <DropdownMenuItem className="font-semibold">
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-semibold">
          <PlusCircle className="mr-2 h-4 w-4" />
          More...
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>`,
          component: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem className="font-semibold">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem className="font-semibold">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="font-semibold">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite users
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem className="font-semibold">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-semibold">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-semibold">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      More...
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
        {
          title: "With Shortcuts",
          description: "Display keyboard shortcuts alongside menu items",
          code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Keyboard Shortcuts</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Commands</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="font-semibold">
      <User className="mr-2 h-4 w-4" />
      Profile
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem className="font-semibold">
      <Settings className="mr-2 h-4 w-4" />
      Settings
      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem className="font-semibold">
      <Keyboard className="mr-2 h-4 w-4" />
      Keyboard shortcuts
      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
          component: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Keyboard Shortcuts</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Commands</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="font-semibold">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-semibold">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-semibold">
                  <Keyboard className="mr-2 h-4 w-4" />
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ]}
      props={[
        {
          name: "align",
          type: '"start" | "center" | "end"',
          description: "Horizontal alignment of the dropdown menu relative to the trigger. Use 'end' for right-aligned (table actions, navbar), 'start' for left-aligned (sidebar menus).",
          default: '"center"',
        },
        {
          name: "sideOffset",
          type: "number",
          description: "Distance in pixels between the trigger and the dropdown content",
          default: "4",
        },
        {
          name: "inset",
          type: "boolean",
          description: "Adds left padding for alignment with items that have indicators (checkboxes, radio buttons)",
          default: "false",
        },
        {
          name: "checked",
          type: "boolean",
          description: "For DropdownMenuCheckboxItem - the controlled checked state",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean) => void",
          description: "For DropdownMenuCheckboxItem - callback when checked state changes",
        },
        {
          name: "value",
          type: "string",
          description: "For DropdownMenuRadioGroup - the value of the selected item",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "For DropdownMenuRadioGroup - callback when the selected value changes",
        },
      ]}
      accessibility={[
        "Supports keyboard navigation with arrow keys",
        "Can be opened and closed with Enter or Space when focused",
        "Escape key closes the menu",
        "Automatically manages focus when opening and closing",
        "Supports typeahead - type to focus menu items",
        "Screen readers announce menu state and selected items",
      ]}
      previousPage={{
        title: "Tabs",
        href: "/docs/components/tabs",
      }}
      nextPage={{
        title: "Breadcrumb",
        href: "/docs/components/breadcrumb",
      }}
    />
  );
}
