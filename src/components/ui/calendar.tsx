"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayPickerProps, useDayPicker } from "react-day-picker";
import { format, addMonths, subMonths } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type CalendarProps = DayPickerProps & {
  showTodayButton?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
};

// Custom caption component with integrated nav buttons
function CustomMonthCaption({ calendarMonth }: { calendarMonth: { date: Date } }) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();

  return (
    <div className="flex items-center justify-between h-8 w-full mb-4">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 p-0 rounded-none"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(subMonths(calendarMonth.date, 1))}
        aria-label="Previous month"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </Button>
      <span className="font-mono text-sm font-semibold">
        {format(calendarMonth.date, "MMMM yyyy")}
      </span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 p-0 rounded-none"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(addMonths(calendarMonth.date, 1))}
        aria-label="Next month"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  showTodayButton = false,
  showClearButton = false,
  onClear,
  ...props
}: CalendarProps) {
  const handleTodayClick = () => {
    if (props.mode === "single" && "onSelect" in props) {
      const onSelect = props.onSelect as
        | ((date: Date | undefined) => void)
        | undefined;
      onSelect?.(new Date());
    }
  };

  const handleClearClick = () => {
    if (props.mode === "single" && "onSelect" in props) {
      const onSelect = props.onSelect as
        | ((date: Date | undefined) => void)
        | undefined;
      onSelect?.(undefined);
    }
    onClear?.();
  };

  return (
    <div className="flex flex-col">
      <DayPicker
        showOutsideDays={showOutsideDays}
        data-slot="calendar"
        className={cn("p-4", className)}
        classNames={{
          // Layout
          months: "flex flex-col sm:flex-row gap-4",
          month: "flex flex-col",

          // Hide default nav (we use custom caption with nav)
          nav: "hidden",
          button_previous: "hidden",
          button_next: "hidden",

          // Grid
          month_grid: "w-full border-collapse",
          weekdays: "flex",
          weekday:
            "text-muted-foreground w-9 font-mono text-xs font-semibold text-center",
          week: "flex w-full mt-2",

          // Day cells
          day: "h-9 w-9 text-center font-mono text-xs p-0 relative",
          day_button: cn(
            "h-9 w-9 p-0 font-mono text-xs font-normal rounded-none",
            "hover:bg-muted hover:text-foreground",
            "focus-visible:outline-2 focus-visible:outline-ring",
            "disabled:pointer-events-none disabled:opacity-50"
          ),

          // States
          selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
          today: "bg-muted text-foreground font-semibold",
          outside: "text-muted-foreground opacity-50",
          disabled: "text-muted-foreground opacity-50",
          hidden: "invisible",

          // Range selection
          range_middle: "bg-muted text-foreground",
          range_start: "bg-primary text-primary-foreground rounded-none",
          range_end: "bg-primary text-primary-foreground rounded-none",

          ...classNames,
        }}
        components={{
          MonthCaption: CustomMonthCaption,
        }}
        {...props}
      />
      {(showTodayButton || showClearButton) && (
        <div className="flex gap-2 border-t border-border p-4">
          {showTodayButton && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 rounded-none font-mono text-xs"
              onClick={handleTodayClick}
            >
              {"> TODAY"}
            </Button>
          )}
          {showClearButton && (
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 rounded-none font-mono text-xs"
              onClick={handleClearClick}
            >
              {"> CLEAR"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
