"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <ComponentShowcaseTemplate
      code="[UI.55]"
      category="Components"
      title="Calendar"
      description="A date picker calendar component for selecting single dates or date ranges."
      importCode={`import { Calendar } from "@/components/ui/calendar"`}
      mainPreview={{
        preview: (
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        ),
        code: `const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`,
      }}
      variants={[
        {
          title: "Single Date",
          description: "Select a single date from the calendar.",
          preview: (
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          ),
          code: `const [date, setDate] = useState<Date>();

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`,
        },
        {
          title: "Date Range",
          description: "Select a range of dates (start and end).",
          preview: (
            <Calendar
              mode="range"
              numberOfMonths={2}
              className="rounded-md border"
            />
          ),
          code: `const [range, setRange] = useState<DateRange>();

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
  className="rounded-md border"
/>`,
        },
        {
          title: "Multiple Dates",
          description: "Select multiple individual dates.",
          preview: (
            <Calendar mode="multiple" className="rounded-md border" />
          ),
          code: `const [dates, setDates] = useState<Date[]>();

<Calendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
  className="rounded-md border"
/>`,
        },
        {
          title: "Without Outside Days",
          description: "Hide days from previous/next months.",
          preview: (
            <Calendar
              mode="single"
              showOutsideDays={false}
              className="rounded-md border"
            />
          ),
          code: `<Calendar
  mode="single"
  showOutsideDays={false}
  className="rounded-md border"
/>`,
        },
        {
          title: "Disabled Dates",
          description: "Disable specific dates or date ranges.",
          preview: (
            <Calendar
              mode="single"
              disabled={(date) =>
                date < new Date() || date < new Date("1900-01-01")
              }
              className="rounded-md border"
            />
          ),
          code: `<Calendar
  mode="single"
  disabled={(date) =>
    date < new Date() || date < new Date("1900-01-01")
  }
  className="rounded-md border"
/>`,
        },
        {
          title: "Multiple Months",
          description: "Show multiple months side by side.",
          preview: (
            <Calendar
              mode="single"
              numberOfMonths={2}
              className="rounded-md border"
            />
          ),
          code: `<Calendar
  mode="single"
  numberOfMonths={2}
  className="rounded-md border"
/>`,
        },
        {
          title: "With Default Month",
          description: "Set the initial month to display.",
          preview: (
            <Calendar
              mode="single"
              defaultMonth={new Date(2024, 0)}
              className="rounded-md border"
            />
          ),
          code: `<Calendar
  mode="single"
  defaultMonth={new Date(2024, 0)}
  className="rounded-md border"
/>`,
        },
        {
          title: "Footer Content",
          description: "Add custom footer content below the calendar.",
          preview: (
            <div className="rounded-none border border-border bg-card font-mono text-xs">
              <div className="border-b border-border px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="text-muted-foreground">calendar.tsx</span>
              </div>
              <div className="p-3">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  footer={
                    <div className="mt-2 pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        {date ? (
                          <>
                            <span className="text-primary">&gt;</span> Selected:{" "}
                            {date.toLocaleDateString()}
                          </>
                        ) : (
                          <>
                            <span className="text-muted-foreground">&gt;</span>{" "}
                            No date selected
                          </>
                        )}
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
          ),
          code: `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  footer={
    <p className="text-sm text-muted-foreground">
      {date ? \`Selected: \${date.toLocaleDateString()}\` : "Pick a date"}
    </p>
  }
/>`,
        },
      ]}
      props={[
        {
          name: "mode",
          type: '"single" | "multiple" | "range"',
          default: '"single"',
          description: "Selection mode for the calendar.",
        },
        {
          name: "selected",
          type: "Date | Date[] | DateRange",
          default: "undefined",
          description: "The selected date(s) based on mode.",
        },
        {
          name: "onSelect",
          type: "(date: Date | Date[] | DateRange) => void",
          default: "undefined",
          description: "Callback when date selection changes.",
        },
        {
          name: "defaultMonth",
          type: "Date",
          default: "new Date()",
          description: "The month to display initially.",
        },
        {
          name: "numberOfMonths",
          type: "number",
          default: "1",
          description: "Number of months to display.",
        },
        {
          name: "showOutsideDays",
          type: "boolean",
          default: "true",
          description: "Show days from previous/next months.",
        },
        {
          name: "disabled",
          type: "boolean | Date[] | ((date: Date) => boolean)",
          default: "false",
          description: "Disable specific dates or all dates.",
        },
        {
          name: "footer",
          type: "ReactNode",
          default: "undefined",
          description: "Custom content to render in the footer.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the calendar.",
        },
      ]}
      accessibility={[
        "Built on react-day-picker with full ARIA support",
        "Keyboard navigation with arrow keys (↓/↑/←/→)",
        "Tab key moves between calendar controls",
        "Space/Enter selects the focused date",
        "Screen readers announce selected dates and navigation",
        "Disabled dates are properly communicated to assistive tech",
        "Focus indicators for keyboard navigation",
      ]}
      previous={{ title: "Button", href: "/docs/components/button" }}
      next={{ title: "Card", href: "/docs/components/card" }}
    />
  );
}
