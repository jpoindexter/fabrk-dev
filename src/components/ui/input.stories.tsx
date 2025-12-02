import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./input";
import { Label } from "./label";
import { Search, Mail, Lock } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="email" className="font-mono text-xs">
        [EMAIL]:
      </Label>
      <Input id="email" type="email" placeholder="user@example.com" />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <div className="space-y-1">
        <Label className="font-mono text-xs">[TEXT]:</Label>
        <Input type="text" placeholder="Enter text..." />
      </div>
      <div className="space-y-1">
        <Label className="font-mono text-xs">[EMAIL]:</Label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div className="space-y-1">
        <Label className="font-mono text-xs">[PASSWORD]:</Label>
        <Input type="password" placeholder="********" />
      </div>
      <div className="space-y-1">
        <Label className="font-mono text-xs">[NUMBER]:</Label>
        <Input type="number" placeholder="0" />
      </div>
      <div className="space-y-1">
        <Label className="font-mono text-xs">[SEARCH]:</Label>
        <Input type="search" placeholder="Search..." />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input className="pl-8" placeholder="Search..." />
      </div>
      <div className="relative">
        <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input className="pl-8" type="email" placeholder="Email address" />
      </div>
      <div className="relative">
        <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input className="pl-8" type="password" placeholder="Password" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
    value: "Cannot edit this",
  },
};

export const WithError: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label className="font-mono text-xs">[EMAIL]:</Label>
      <Input
        type="email"
        placeholder="email@example.com"
        className="border-destructive focus-visible:ring-destructive"
        defaultValue="invalid-email"
      />
      <p className="text-destructive font-mono text-xs">[ERROR]: Invalid email format</p>
    </div>
  ),
};
