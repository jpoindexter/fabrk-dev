import type { Meta, StoryObj } from "@storybook/nextjs";
import { DateTimePicker } from "./datetime-picker";
import { useState } from "react";
import { addDays } from "date-fns";

const meta: Meta<typeof DateTimePicker> = {
  title: "UI/DateTimePicker",
  component: DateTimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

export const Default12Hour: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date>();
    return (
      <div className="w-[350px]">
        <DateTimePicker dateTime={dateTime} onDateTimeChange={setDateTime} />
      </div>
    );
  },
};

export const Default24Hour: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date>();
    return (
      <div className="w-[350px]">
        <DateTimePicker
          dateTime={dateTime}
          onDateTimeChange={setDateTime}
          use24Hour
        />
      </div>
    );
  },
};

export const WithPreselectedDateTime: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date>(
      new Date(2024, 11, 25, 14, 30)
    );
    return (
      <div className="w-[350px]">
        <DateTimePicker dateTime={dateTime} onDateTimeChange={setDateTime} />
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date>();
    return (
      <div className="w-[350px]">
        <DateTimePicker
          dateTime={dateTime}
          onDateTimeChange={setDateTime}
          placeholder="Schedule your appointment"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date>();
    return (
      <div className="w-[350px]">
        <DateTimePicker dateTime={dateTime} onDateTimeChange={setDateTime} disabled />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date>();
    return (
      <div className="w-[500px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Event Start Time
          </label>
          <DateTimePicker
            dateTime={dateTime}
            onDateTimeChange={setDateTime}
            placeholder="When does your event start?"
          />
        </div>
        {dateTime && (
          <div className="rounded-md border border-border bg-card p-4">
            <p className="text-sm font-semibold">Selected Date & Time:</p>
            <p className="text-sm text-muted-foreground">
              Date: {dateTime.toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Time: {dateTime.toLocaleTimeString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Full: {dateTime.toString()}
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const BookingScenario: Story = {
  render: () => {
    const [checkIn, setCheckIn] = useState<Date>();
    const [checkOut, setCheckOut] = useState<Date>();
    return (
      <div className="w-[600px] space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Check-in Date & Time
          </label>
          <DateTimePicker
            dateTime={checkIn}
            onDateTimeChange={setCheckIn}
            placeholder="Select check-in"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Check-out Date & Time
          </label>
          <DateTimePicker
            dateTime={checkOut}
            onDateTimeChange={setCheckOut}
            placeholder="Select check-out"
          />
        </div>
        {checkIn && checkOut && (
          <div className="rounded-md border border-border bg-primary/10 p-4">
            <p className="text-sm font-semibold">Booking Summary:</p>
            <p className="text-sm text-muted-foreground">
              Check-in: {checkIn.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Check-out: {checkOut.toLocaleString()}
            </p>
            {checkOut > checkIn ? (
              <p className="text-sm font-semibold mt-2 text-primary">
                Duration:{" "}
                {Math.ceil(
                  (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </p>
            ) : (
              <p className="text-sm font-semibold mt-2 text-destructive">
                Invalid: Check-out must be after check-in
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
};

export const ComparisonView: Story = {
  render: () => {
    const [dateTime12, setDateTime12] = useState<Date>();
    const [dateTime24, setDateTime24] = useState<Date>();
    return (
      <div className="w-[700px] space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            12-Hour Format
          </label>
          <DateTimePicker
            dateTime={dateTime12}
            onDateTimeChange={setDateTime12}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            24-Hour Format
          </label>
          <DateTimePicker
            dateTime={dateTime24}
            onDateTimeChange={setDateTime24}
            use24Hour
          />
        </div>
      </div>
    );
  },
};
