import type { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker } from "./date-range-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

const meta: Meta<typeof DateRangePicker> = {
  title: "UI/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    return (
      <div className="w-[500px]">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>
    );
  },
};

export const WithPreselectedRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
    return (
      <div className="w-[500px]">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    return (
      <div className="w-[500px]">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          placeholder="Select your trip dates"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    return (
      <div className="w-[500px]">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          disabled
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    return (
      <div className="w-[600px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Booking Dates
          </label>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            placeholder="When would you like to book?"
          />
        </div>
        {dateRange?.from && dateRange?.to && (
          <div className="rounded-md border border-border bg-card p-4">
            <p className="text-sm font-semibold">Selected Range:</p>
            <p className="text-sm text-muted-foreground">
              From: {dateRange.from.toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground">
              To: {dateRange.to.toLocaleDateString()}
            </p>
            <p className="text-sm font-semibold mt-2">
              Total Days:{" "}
              {Math.ceil(
                (dateRange.to.getTime() - dateRange.from.getTime()) /
                  (1000 * 60 * 60 * 24)
              )}
            </p>
          </div>
        )}
      </div>
    );
  },
};
