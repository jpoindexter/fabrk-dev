"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { useState } from "react";

export default function DateTimePickerPage() {
  const [dateTime, setDateTime] = useState<Date | undefined>(new Date());

  return (
    <ComponentShowcaseTemplate
      code="[UI.58]"
      category="Components"
      title="DateTime Picker"
      description="A combined date and time picker with tabbed interface for selecting both date and time."
      importCode={`import { DateTimePicker } from "@/components/ui/datetime-picker"`}
      mainPreview={{
        preview: (
          <DateTimePicker
            dateTime={dateTime}
            onDateTimeChange={setDateTime}
            className="w-full max-w-sm"
          />
        ),
        code: `const [dateTime, setDateTime] = useState<Date>();

<DateTimePicker
  dateTime={dateTime}
  onDateTimeChange={setDateTime}
/>`,
      }}
      variants={[
        {
          title: "12-Hour Format",
          description: "Default 12-hour time format with AM/PM selector.",
          preview: (
            <DateTimePicker
              dateTime={dateTime}
              onDateTimeChange={setDateTime}
              className="w-full max-w-sm"
            />
          ),
          code: `const [dateTime, setDateTime] = useState<Date>();

<DateTimePicker
  dateTime={dateTime}
  onDateTimeChange={setDateTime}
/>`,
        },
        {
          title: "24-Hour Format",
          description: "Use 24-hour military time format.",
          preview: (
            <DateTimePicker
              dateTime={dateTime}
              onDateTimeChange={setDateTime}
              use24Hour
              className="w-full max-w-sm"
            />
          ),
          code: `<DateTimePicker
  dateTime={dateTime}
  onDateTimeChange={setDateTime}
  use24Hour
/>`,
        },
        {
          title: "Custom Placeholder",
          description: "Customize the placeholder text when empty.",
          preview: (
            <DateTimePicker
              placeholder="Schedule your meeting"
              className="w-full max-w-sm"
            />
          ),
          code: `<DateTimePicker
  placeholder="Schedule your meeting"
/>`,
        },
        {
          title: "Disabled",
          description: "Disabled state prevents interaction.",
          preview: (
            <DateTimePicker
              dateTime={new Date(2024, 0, 15, 14, 30)}
              disabled
              className="w-full max-w-sm"
            />
          ),
          code: `<DateTimePicker
  dateTime={new Date(2024, 0, 15, 14, 30)}
  disabled
/>`,
        },
        {
          title: "Controlled State",
          description: "Programmatically control the date and time.",
          preview: (
            <div className="space-y-4 w-full max-w-sm">
              <DateTimePicker
                dateTime={dateTime}
                onDateTimeChange={setDateTime}
              />
              <div className="space-y-1 text-muted-foreground font-mono text-xs">
                {dateTime ? (
                  <>
                    <div>
                      <span className="text-success">&gt;</span> Date:{" "}
                      {dateTime.toLocaleDateString()}
                    </div>
                    <div>
                      <span className="text-success">&gt;</span> Time:{" "}
                      {dateTime.toLocaleTimeString()}
                    </div>
                  </>
                ) : (
                  <div>
                    <span className="text-muted-foreground">&gt;</span> No
                    datetime selected
                  </div>
                )}
              </div>
            </div>
          ),
          code: `const [dateTime, setDateTime] = useState<Date>();

<DateTimePicker
  dateTime={dateTime}
  onDateTimeChange={setDateTime}
/>

{dateTime && (
  <p>
    Date: {dateTime.toLocaleDateString()}
    Time: {dateTime.toLocaleTimeString()}
  </p>
)}`,
        },
        {
          title: "Time Controls",
          description: "Increment/decrement buttons for precise time selection.",
          preview: (
            <div className="space-y-1 text-muted-foreground font-mono text-xs w-full max-w-sm">
              <div>
                <span className="text-success">&gt;</span> +/- buttons for hours
              </div>
              <div>
                <span className="text-success">&gt;</span> +/- buttons for
                minutes
              </div>
              <div>
                <span className="text-success">&gt;</span> Direct number input
              </div>
              <div>
                <span className="text-success">&gt;</span> AM/PM toggle (12h
                mode)
              </div>
            </div>
          ),
          code: `// Time picker includes:
// - +/- increment buttons
// - Direct number input fields
// - Hours/minutes validation
// - AM/PM toggle (12-hour mode)

<DateTimePicker use24Hour={false} />`,
        },
        {
          title: "Meeting Scheduler",
          description: "Common use case for scheduling meetings.",
          preview: (
            <div className="space-y-2 w-full max-w-sm">
              <div className="text-muted-foreground font-mono text-xs">
                <span className="text-primary">&gt;</span> SCHEDULE_MEETING
              </div>
              <DateTimePicker placeholder="Pick meeting time" />
            </div>
          ),
          code: `// Meeting scheduler example
<DateTimePicker
  dateTime={meetingTime}
  onDateTimeChange={setMeetingTime}
  placeholder="Pick meeting time"
/>`,
        },
        {
          title: "Event Creation",
          description: "Create events with specific date and time.",
          preview: (
            <div className="space-y-3 w-full max-w-sm">
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground">
                  [EVENT_START]:
                </label>
                <DateTimePicker
                  dateTime={new Date(2024, 6, 15, 10, 0)}
                  use24Hour
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground">
                  [EVENT_END]:
                </label>
                <DateTimePicker
                  dateTime={new Date(2024, 6, 15, 12, 0)}
                  use24Hour
                />
              </div>
            </div>
          ),
          code: `// Event with start and end times
<div>
  <label>Event Start</label>
  <DateTimePicker
    dateTime={eventStart}
    onDateTimeChange={setEventStart}
    use24Hour
  />
</div>
<div>
  <label>Event End</label>
  <DateTimePicker
    dateTime={eventEnd}
    onDateTimeChange={setEventEnd}
    use24Hour
  />
</div>`,
        },
        {
          title: "Deadline Picker",
          description: "Set deadlines with specific date and time.",
          preview: (
            <div className="space-y-2 w-full max-w-sm">
              <div className="text-muted-foreground font-mono text-xs">
                <span className="text-destructive">&gt;</span> DUE_BY
              </div>
              <DateTimePicker
                placeholder="Set task deadline"
                dateTime={new Date(2024, 6, 20, 17, 0)}
              />
            </div>
          ),
          code: `// Task deadline picker
<DateTimePicker
  dateTime={deadline}
  onDateTimeChange={setDeadline}
  placeholder="Set task deadline"
/>`,
        },
      ]}
      props={[
        {
          name: "dateTime",
          type: "Date",
          default: "undefined",
          description: "The selected date and time value.",
        },
        {
          name: "onDateTimeChange",
          type: "(dateTime: Date | undefined) => void",
          default: "undefined",
          description: "Callback when date/time changes.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Pick date and time"',
          description: "Placeholder text when no value is selected.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the datetime picker.",
        },
        {
          name: "use24Hour",
          type: "boolean",
          default: "false",
          description: "Use 24-hour time format instead of 12-hour with AM/PM.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the trigger button.",
        },
      ]}
      accessibility={[
        "Trigger button is fully keyboard accessible",
        "Tab navigation between date/time tabs",
        "Calendar supports arrow key navigation",
        "Time inputs are keyboard accessible with +/- buttons",
        "Number inputs validate min/max values",
        "Apply button requires date selection to enable",
        "Popover dismissible with Escape key",
        "Screen readers announce selected date and time",
      ]}
      previous={{ title: "Date Range Picker", href: "/docs/components/date-range-picker" }}
      next={{ title: "Dialog", href: "/docs/components/dialog" }}
    />
  );
}
