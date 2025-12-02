"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function DateRangePickerPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 0, 31),
  });

  return (
    <ComponentShowcaseTemplate
      code="[UI.57]"
      category="Components"
      title="Date Range Picker"
      description="A date picker for selecting date ranges with a calendar popover."
      importCode={`import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";`}
      mainPreview={{
        preview: (
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            className="w-full max-w-sm"
          />
        ),
        code: `const [dateRange, setDateRange] = useState<DateRange>();

<DateRangePicker
  dateRange={dateRange}
  onDateRangeChange={setDateRange}
/>`,
      }}
      variants={[
        {
          title: "Default",
          description: "Basic date range picker with two-month view.",
          preview: (
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              className="w-full max-w-sm"
            />
          ),
          code: `const [dateRange, setDateRange] = useState<DateRange>();

<DateRangePicker
  dateRange={dateRange}
  onDateRangeChange={setDateRange}
/>`,
        },
        {
          title: "With Default Range",
          description: "Pre-populate with a default date range.",
          preview: (
            <DateRangePicker
              dateRange={{
                from: new Date(2024, 0, 1),
                to: new Date(2024, 0, 31),
              }}
              className="w-full max-w-sm"
            />
          ),
          code: `<DateRangePicker
  dateRange={{
    from: new Date(2024, 0, 1),
    to: new Date(2024, 0, 31),
  }}
/>`,
        },
        {
          title: "Custom Placeholder",
          description: "Customize the placeholder text when empty.",
          preview: (
            <DateRangePicker
              placeholder="Select date range for report"
              className="w-full max-w-sm"
            />
          ),
          code: `<DateRangePicker
  placeholder="Select date range for report"
/>`,
        },
        {
          title: "Disabled",
          description: "Disabled state prevents interaction.",
          preview: (
            <DateRangePicker
              dateRange={{
                from: new Date(2024, 0, 1),
                to: new Date(2024, 0, 31),
              }}
              disabled
              className="w-full max-w-sm"
            />
          ),
          code: `<DateRangePicker
  dateRange={{
    from: new Date(2024, 0, 1),
    to: new Date(2024, 0, 31),
  }}
  disabled
/>`,
        },
        {
          title: "Controlled State",
          description: "Programmatically control the selected range.",
          preview: (
            <div className="space-y-4 w-full max-w-sm">
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
              <div className="space-y-1 text-muted-foreground font-mono text-xs">
                {dateRange?.from && (
                  <div>
                    <span className="text-success">&gt;</span> From:{" "}
                    {dateRange.from.toLocaleDateString()}
                  </div>
                )}
                {dateRange?.to && (
                  <div>
                    <span className="text-success">&gt;</span> To:{" "}
                    {dateRange.to.toLocaleDateString()}
                  </div>
                )}
                {!dateRange?.from && !dateRange?.to && (
                  <div>
                    <span className="text-muted-foreground">&gt;</span> No range
                    selected
                  </div>
                )}
              </div>
            </div>
          ),
          code: `const [dateRange, setDateRange] = useState<DateRange>();

<DateRangePicker
  dateRange={dateRange}
  onDateRangeChange={setDateRange}
/>

{dateRange?.from && dateRange?.to && (
  <p>
    From: {dateRange.from.toLocaleDateString()}
    To: {dateRange.to.toLocaleDateString()}
  </p>
)}`,
        },
        {
          title: "Analytics Dashboard",
          description: "Common use case for filtering analytics data.",
          preview: (
            <div className="space-y-2 w-full max-w-sm">
              <div className="text-muted-foreground font-mono text-xs">
                <span className="text-primary">&gt;</span> FILTER_BY_RANGE
              </div>
              <DateRangePicker placeholder="Select date range..." />
            </div>
          ),
          code: `// Common use case: Analytics dashboard date filter
<DateRangePicker
  dateRange={analyticsRange}
  onDateRangeChange={setAnalyticsRange}
  placeholder="Select date range..."
/>`,
        },
        {
          title: "Booking System",
          description: "Use for hotel/flight booking date selection.",
          preview: (
            <div className="space-y-3 w-full max-w-sm">
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground">
                  [CHECK_IN] - [CHECK_OUT]:
                </label>
                <DateRangePicker placeholder="Select your stay dates" />
              </div>
            </div>
          ),
          code: `// Booking system example
<DateRangePicker
  dateRange={bookingDates}
  onDateRangeChange={setBookingDates}
  placeholder="Select your stay dates"
/>`,
        },
        {
          title: "Report Generator",
          description: "Select time period for generating reports.",
          preview: (
            <div className="space-y-2 w-full max-w-sm">
              <div className="text-muted-foreground font-mono text-xs">
                <span className="text-primary">&gt;</span> REPORT_PERIOD
              </div>
              <DateRangePicker
                placeholder="Select reporting period"
                dateRange={{
                  from: new Date(2024, 0, 1),
                  to: new Date(2024, 2, 31),
                }}
              />
            </div>
          ),
          code: `// Report generator with default Q1 range
<DateRangePicker
  dateRange={{
    from: new Date(2024, 0, 1),
    to: new Date(2024, 2, 31),
  }}
  placeholder="Select reporting period"
/>`,
        },
      ]}
      props={[
        {
          name: "dateRange",
          type: "DateRange",
          default: "undefined",
          description: "The selected date range ({ from: Date, to?: Date }).",
        },
        {
          name: "onDateRangeChange",
          type: "(dateRange: DateRange | undefined) => void",
          default: "undefined",
          description: "Callback when date range changes.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Pick a date range"',
          description: "Placeholder text when no range is selected.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the date range picker.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the container.",
        },
      ]}
      accessibility={[
        "Trigger button is fully keyboard accessible",
        "Calendar icon provides visual context",
        "Displays formatted date range (e.g., 'Jan 01, 2024 - Jan 31, 2024')",
        "Popover dismissible with Escape key",
        "Two-month view for easier range selection",
        "Visual feedback shows selected range with highlighting",
        "Screen readers announce selected date range",
      ]}
      previous={{ title: "Date Picker", href: "/docs/components/date-picker" }}
      next={{ title: "Dialog", href: "/docs/components/dialog" }}
    />
  );
}
