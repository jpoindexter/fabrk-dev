"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { TimePicker } from "@/components/ui/time-picker";
import { useState } from "react";

export default function TimePickerPage() {
  const [time, setTime] = useState<string>("");
  const [meeting, setMeeting] = useState<string>("02:30 PM");
  const [alarm, setAlarm] = useState<string>("14:30");

  return (
    <ComponentShowcaseTemplate
      code="[UI.09]"
      title="Time Picker"
      description="A time picker component with hour and minute controls, supporting both 12-hour and 24-hour formats."
      mainPreview={{
        code: `<TimePicker
  time={time}
  onTimeChange={setTime}
  placeholder="Pick a time"
/>`,
        preview: (
          <TimePicker time={time} onTimeChange={setTime} placeholder="Pick a time" />
        ),
      }}
      variants={[
        {
          title: "12-Hour Format (AM/PM)",
          description: "Default format with AM/PM selector",
          code: `const [meeting, setMeeting] = useState("02:30 PM");

<TimePicker
  time={meeting}
  onTimeChange={setMeeting}
  placeholder="Schedule meeting"
/>`,
          preview: (
            <TimePicker
              time={meeting}
              onTimeChange={setMeeting}
              placeholder="Schedule meeting"
            />
          ),
        },
        {
          title: "24-Hour Format",
          description: "Military time format without AM/PM",
          code: `const [alarm, setAlarm] = useState("14:30");

<TimePicker
  time={alarm}
  onTimeChange={setAlarm}
  use24Hour
  placeholder="Set alarm"
/>`,
          preview: (
            <TimePicker
              time={alarm}
              onTimeChange={setAlarm}
              use24Hour
              placeholder="Set alarm"
            />
          ),
        },
        {
          title: "Disabled State",
          description: "Disabled time picker",
          code: `<TimePicker
  time="09:00 AM"
  disabled
  placeholder="Disabled"
/>`,
          preview: <TimePicker time="09:00 AM" disabled placeholder="Disabled" />,
        },
        {
          title: "Custom Width",
          description: "Control width with className",
          code: `<TimePicker
  time={time}
  onTimeChange={setTime}
  placeholder="Pick a time"
  className="w-[250px]"
/>`,
          preview: (
            <TimePicker
              time={time}
              onTimeChange={setTime}
              placeholder="Pick a time"
              className="w-[250px]"
            />
          ),
        },
        {
          title: "Empty State",
          description: "Time picker without initial value",
          code: `<TimePicker
  time=""
  onTimeChange={setTime}
  placeholder="Select appointment time"
/>`,
          preview: (
            <TimePicker
              time=""
              onTimeChange={setTime}
              placeholder="Select appointment time"
            />
          ),
        },
      ]}
      props={[
        {
          name: "time",
          type: "string",
          description: "Selected time in 'HH:mm' (24-hour) or 'hh:mm AM/PM' (12-hour) format",
        },
        {
          name: "onTimeChange",
          type: "(time: string) => void",
          description: "Callback when time selection changes",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Pick a time"',
          description: "Placeholder text shown when no time is selected",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the time picker",
        },
        {
          name: "use24Hour",
          type: "boolean",
          default: "false",
          description: "Use 24-hour format instead of 12-hour with AM/PM",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the trigger button",
        },
      ]}
      accessibility={[
        "Clock icon provides visual indication of time picker",
        "Increment/decrement buttons for hours and minutes",
        "Direct input allows manual time entry",
        "Input fields constrain values to valid ranges (hours: 0-23 or 1-12, minutes: 0-59)",
        "AM/PM toggle button for 12-hour format",
        "Apply button confirms time selection",
        "Labels clearly identify hours, minutes, and period controls",
        "Keyboard accessible - Tab through controls, Enter to apply",
      ]}
      previous={{
        title: "Date Picker",
        href: "/docs/components/date-picker",
      }}
      next={{
        title: "Select",
        href: "/docs/components/select",
      }}
    />
  );
}
