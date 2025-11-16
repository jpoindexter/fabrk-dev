import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { Button } from "./button";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border border-border px-4 py-3 font-mono text-sm shadow-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border border-border px-4 py-3 font-mono text-sm shadow-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border border-border px-4 py-3 font-mono text-sm shadow-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const FAQ: Story = {
  render: () => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    return (
      <div className="w-[400px] space-y-4">
        <Collapsible open={open1} onOpenChange={setOpen1}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              What is React?
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 rounded-md border border-border p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">
              React is a JavaScript library for building user interfaces. It
              lets you create reusable components and manage the state of your
              application efficiently.
            </p>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={open2} onOpenChange={setOpen2}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              How do I get started?
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 rounded-md border border-border p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">
              You can get started by installing React using npm or yarn, then
              creating your first component. Check out the official React
              documentation for detailed guides.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};
