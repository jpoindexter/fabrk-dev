import type { Meta, StoryObj } from "@storybook/nextjs";
import { TimePicker } from "./time-picker";
import { useState } from "react";

const meta: Meta<typeof TimePicker> = {
  title: "UI/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default12Hour: Story = {
  render: () => {
    const [time, setTime] = useState<string>();
    return (
      <div className="w-[300px]">
        <TimePicker time={time} onTimeChange={setTime} />
      </div>
    );
  },
};

export const Default24Hour: Story = {
  render: () => {
    const [time, setTime] = useState<string>();
    return (
      <div className="w-[300px]">
        <TimePicker time={time} onTimeChange={setTime} use24Hour />
      </div>
    );
  },
};

export const WithPreselectedTime12Hour: Story = {
  render: () => {
    const [time, setTime] = useState<string>("02:30 PM");
    return (
      <div className="w-[300px]">
        <TimePicker time={time} onTimeChange={setTime} />
      </div>
    );
  },
};

export const WithPreselectedTime24Hour: Story = {
  render: () => {
    const [time, setTime] = useState<string>("14:30");
    return (
      <div className="w-[300px]">
        <TimePicker time={time} onTimeChange={setTime} use24Hour />
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [time, setTime] = useState<string>();
    return (
      <div className="w-[300px]">
        <TimePicker
          time={time}
          onTimeChange={setTime}
          placeholder="Select meeting time"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [time, setTime] = useState<string>();
    return (
      <div className="w-[300px]">
        <TimePicker time={time} onTimeChange={setTime} disabled />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [time, setTime] = useState<string>();
    return (
      <div className="w-[400px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Appointment Time
          </label>
          <TimePicker
            time={time}
            onTimeChange={setTime}
            placeholder="When should we schedule?"
          />
        </div>
        {time && (
          <div className="rounded-md border bg-card p-4">
            <p className="text-sm font-semibold">Selected Time:</p>
            <p className="text-sm text-muted-foreground">{time}</p>
          </div>
        )}
      </div>
    );
  },
};

export const ComparisonView: Story = {
  render: () => {
    const [time12, setTime12] = useState<string>();
    const [time24, setTime24] = useState<string>();
    return (
      <div className="w-[600px] space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            12-Hour Format
          </label>
          <TimePicker time={time12} onTimeChange={setTime12} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            24-Hour Format
          </label>
          <TimePicker time={time24} onTimeChange={setTime24} use24Hour />
        </div>
      </div>
    );
  },
};
