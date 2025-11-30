"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";

export default function DatePickerPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [birthday, setBirthday] = useState<Date | undefined>(new Date(1990, 0, 1));
  const [appointment, setAppointment] = useState<Date | undefined>();

  return (
    <ComponentShowcaseTemplate
      title="Date Picker"
      description="A date picker component that combines a calendar popover with a formatted date display button."
      component="date-picker"
      mainPreview={{
        code: `<DatePicker
  date={date}
  onDateChange={setDate}
  placeholder="Pick a date"
/>`,
        preview: (
          <DatePicker date={date} onDateChange={setDate} placeholder="Pick a date" />
        ),
      }}
      variants={[
        {
          title: "With Pre-selected Date",
          description: "Initialize with a default date",
          code: `const [birthday, setBirthday] = useState(new Date(1990, 0, 1));

<DatePicker
  date={birthday}
  onDateChange={setBirthday}
  placeholder="Pick your birthday"
/>`,
          preview: (
            <DatePicker
              date={birthday}
              onDateChange={setBirthday}
              placeholder="Pick your birthday"
            />
          ),
        },
        {
          title: "Custom Placeholder",
          description: "Customize the placeholder text",
          code: `<DatePicker
  date={appointment}
  onDateChange={setAppointment}
  placeholder="Schedule appointment"
/>`,
          preview: (
            <DatePicker
              date={appointment}
              onDateChange={setAppointment}
              placeholder="Schedule appointment"
            />
          ),
        },
        {
          title: "Disabled State",
          description: "Disabled date picker",
          code: `<DatePicker
  date={new Date()}
  disabled
  placeholder="Disabled"
/>`,
          preview: <DatePicker date={new Date()} disabled placeholder="Disabled" />,
        },
        {
          title: "Custom Width",
          description: "Control width with className",
          code: `<DatePicker
  date={date}
  onDateChange={setDate}
  placeholder="Pick a date"
  className="w-[300px]"
/>`,
          preview: (
            <DatePicker
              date={date}
              onDateChange={setDate}
              placeholder="Pick a date"
              className="w-[300px]"
            />
          ),
        },
      ]}
      props={[
        {
          name: "date",
          type: "Date | undefined",
          description: "The selected date (controlled)",
        },
        {
          name: "onDateChange",
          type: "(date: Date | undefined) => void",
          description: "Callback when date selection changes",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Pick a date"',
          description: "Placeholder text shown when no date is selected",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the date picker",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the trigger button",
        },
      ]}
      accessibility={[
        "Calendar icon provides visual indication of date picker",
        "Selected date is formatted as human-readable text (e.g., 'January 1, 2024')",
        "Keyboard navigation within calendar (Arrow keys move between dates)",
        "Enter key selects the highlighted date",
        "Escape key closes the calendar popover",
        "Calendar auto-focuses on open for immediate keyboard interaction",
        "Screen readers announce selected date and calendar navigation",
      ]}
      previousComponent={{
        name: "Multi Select",
        href: "/docs/components/multi-select",
      }}
      nextComponent={{
        name: "Time Picker",
        href: "/docs/components/time-picker",
      }}
    />
  );
}
