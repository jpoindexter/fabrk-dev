import type { Meta, StoryObj } from "@storybook/nextjs";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => <Checkbox />,
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="font-mono text-xs">
        Accept terms and conditions
      </Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked" className="font-mono text-xs">
        Checked by default
      </Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="font-mono text-xs opacity-50">
          Disabled unchecked
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" className="font-mono text-xs opacity-50">
          Disabled checked
        </Label>
      </div>
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <Label className="font-mono text-xs">[SELECT_OPTIONS]:</Label>
      <div className="flex flex-col gap-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="email" defaultChecked />
          <Label htmlFor="email" className="font-mono text-xs">
            Email notifications
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="sms" />
          <Label htmlFor="sms" className="font-mono text-xs">
            SMS notifications
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="push" defaultChecked />
          <Label htmlFor="push" className="font-mono text-xs">
            Push notifications
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="marketing" />
          <Label htmlFor="marketing" className="font-mono text-xs">
            Marketing emails
          </Label>
        </div>
      </div>
    </div>
  ),
};
