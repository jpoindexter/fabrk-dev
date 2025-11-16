import type { Meta, StoryObj } from "@storybook/nextjs";
import { DatePicker } from "./date-picker";
import { useState } from "react";

const meta: Meta<typeof DatePicker> = {
  title: "UI/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <div className="w-[300px]">
        <DatePicker date={date} onDateChange={setDate} />
      </div>
    );
  },
};

export const WithPreselectedDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date());
    return (
      <div className="w-[300px]">
        <DatePicker date={date} onDateChange={setDate} />
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <div className="w-[300px]">
        <DatePicker
          date={date}
          onDateChange={setDate}
          placeholder="Select your birthday"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <div className="w-[300px]">
        <DatePicker date={date} onDateChange={setDate} disabled />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <div className="w-[400px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">
            Event Date
          </label>
          <DatePicker
            date={date}
            onDateChange={setDate}
            placeholder="When is your event?"
          />
        </div>
        {date && (
          <p className="text-sm text-muted-foreground">
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};
