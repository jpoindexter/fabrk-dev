import type { Meta, StoryObj } from "@storybook/nextjs";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <Info className="size-4" />
      <AlertTitle>[INFO]</AlertTitle>
      <AlertDescription>This is an informational alert message.</AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-4">
      <Alert variant="default">
        <Info className="size-4" />
        <AlertTitle>[INFO]</AlertTitle>
        <AlertDescription>Default alert for general information.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle className="size-4" />
        <AlertTitle>[SUCCESS]</AlertTitle>
        <AlertDescription>Success alert for positive confirmations.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <XCircle className="size-4" />
        <AlertTitle>[ERROR]</AlertTitle>
        <AlertDescription>Destructive alert for errors and warnings.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>[NOTICE]</AlertTitle>
      <AlertDescription>
        Alerts can also be used without icons for simpler messages.
      </AlertDescription>
    </Alert>
  ),
};

export const SystemStatus: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-4">
      <Alert variant="success">
        <CheckCircle className="size-4" />
        <AlertTitle>[SYS_STATUS]: OPERATIONAL</AlertTitle>
        <AlertDescription>All systems are running normally. No issues detected.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>[SYS_STATUS]: DEGRADED</AlertTitle>
        <AlertDescription>
          Some services are experiencing issues. Engineers are investigating.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
