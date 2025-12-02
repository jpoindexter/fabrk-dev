"use client";

import * as React from "react";
import {
  format,
  setMonth,
  setYear,
  subDays,
  subMonths,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Default presets for range mode
const DEFAULT_PRESETS = [
  {
    label: "Today",
    getValue: () => ({ from: new Date(), to: new Date() }),
  },
  {
    label: "Yesterday",
    getValue: () => ({
      from: subDays(new Date(), 1),
      to: subDays(new Date(), 1),
    }),
  },
  {
    label: "Last 7 days",
    getValue: () => ({ from: subDays(new Date(), 6), to: new Date() }),
  },
  {
    label: "Last 30 days",
    getValue: () => ({ from: subDays(new Date(), 29), to: new Date() }),
  },
  {
    label: "This month",
    getValue: () => ({ from: startOfMonth(new Date()), to: new Date() }),
  },
  {
    label: "Last month",
    getValue: () => ({
      from: startOfMonth(subMonths(new Date(), 1)),
      to: endOfMonth(subMonths(new Date(), 1)),
    }),
  },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type DatePickerMode = "single" | "range" | "multiple";

interface DatePickerProps {
  /** Selection mode */
  mode?: DatePickerMode;
  /** Selected date (single mode) */
  value?: Date;
  /** Selected date range (range mode) */
  rangeValue?: DateRange;
  /** Selected dates (multiple mode) */
  multipleValue?: Date[];
  /** Callback when date changes (single mode) */
  onChange?: (date: Date | undefined) => void;
  /** Callback when range changes (range mode) */
  onRangeChange?: (range: DateRange | undefined) => void;
  /** Callback when multiple dates change */
  onMultipleChange?: (dates: Date[] | undefined) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disable the picker */
  disabled?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Show time picker (single mode only) */
  showTime?: boolean;
  /** Use 24-hour format for time */
  use24Hour?: boolean;
  /** Show preset quick selects (range mode) */
  showPresets?: boolean;
  /** Custom presets */
  presets?: Array<{ label: string; getValue: () => DateRange }>;
  /** Show month/year dropdown pickers */
  showMonthYearPicker?: boolean;
  /** Month-only picker (no day grid) */
  monthOnly?: boolean;
  /** Number of months to display */
  numberOfMonths?: 1 | 2;
  /** Additional CSS classes */
  className?: string;
}

function DatePicker({
  mode = "single",
  value,
  rangeValue,
  multipleValue,
  onChange,
  onRangeChange,
  onMultipleChange,
  placeholder,
  disabled = false,
  minDate,
  maxDate,
  showTime = false,
  use24Hour = false,
  showPresets = false,
  presets = DEFAULT_PRESETS,
  showMonthYearPicker = false,
  monthOnly = false,
  numberOfMonths = 1,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonthState] = React.useState<Date>(
    value || rangeValue?.from || new Date()
  );

  // Time state (for showTime mode)
  const [hours, setHours] = React.useState<string>(
    value ? format(value, use24Hour ? "HH" : "hh") : "12"
  );
  const [minutes, setMinutes] = React.useState<string>(
    value ? format(value, "mm") : "00"
  );
  const [period, setPeriod] = React.useState<"AM" | "PM">(
    value && !use24Hour
      ? (format(value, "a").toUpperCase() as "AM" | "PM")
      : "AM"
  );

  // Generate year options
  const currentYear = new Date().getFullYear();
  const years = React.useMemo(() => {
    const minYear = minDate?.getFullYear() || currentYear - 50;
    const maxYear = maxDate?.getFullYear() || currentYear + 50;
    return Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
  }, [minDate, maxDate, currentYear]);

  // Get placeholder text
  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (monthOnly) return "Pick a month";
    if (mode === "range") return "Pick a date range";
    if (showTime) return "Pick date and time";
    return "Pick a date";
  };

  // Format display value
  const getDisplayValue = () => {
    if (monthOnly && value) {
      return format(value, "MMMM yyyy");
    }
    if (mode === "single" && value) {
      if (showTime) {
        return format(value, use24Hour ? "PPP HH:mm" : "PPP hh:mm a");
      }
      return format(value, "PPP");
    }
    if (mode === "range" && rangeValue?.from) {
      if (rangeValue.to) {
        return `${format(rangeValue.from, "LLL dd, y")} - ${format(rangeValue.to, "LLL dd, y")}`;
      }
      return format(rangeValue.from, "LLL dd, y");
    }
    if (mode === "multiple" && multipleValue?.length) {
      return `${multipleValue.length} dates selected`;
    }
    return null;
  };

  // Handle single date select
  const handleSingleSelect = (date: Date | undefined) => {
    if (showTime && date) {
      // Don't close, let user pick time
      setMonthState(date);
    } else {
      onChange?.(date);
      if (date) setOpen(false);
    }
  };

  // Handle time apply
  const handleTimeApply = () => {
    if (!month) return;

    const newDateTime = new Date(month);
    let hoursValue = parseInt(hours);

    if (!use24Hour) {
      if (period === "PM" && hoursValue !== 12) {
        hoursValue += 12;
      } else if (period === "AM" && hoursValue === 12) {
        hoursValue = 0;
      }
    }

    newDateTime.setHours(hoursValue);
    newDateTime.setMinutes(parseInt(minutes));
    newDateTime.setSeconds(0);

    onChange?.(newDateTime);
    setOpen(false);
  };

  // Handle range select
  const handleRangeSelect = (range: DateRange | undefined) => {
    onRangeChange?.(range);
  };

  // Handle preset select
  const handlePresetSelect = (presetLabel: string) => {
    const preset = presets.find((p) => p.label === presetLabel);
    if (preset) {
      onRangeChange?.(preset.getValue());
    }
  };

  // Handle month select (monthOnly mode)
  const handleMonthSelect = (monthIndex: number) => {
    const newDate = setMonth(setYear(new Date(), month.getFullYear()), monthIndex);
    onChange?.(newDate);
    setOpen(false);
  };

  // Handle month/year dropdown changes
  const handleMonthChange = (monthIndex: string) => {
    const newDate = new Date(month);
    newDate.setMonth(parseInt(monthIndex));
    setMonthState(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(month);
    newDate.setFullYear(parseInt(year));
    setMonthState(newDate);
  };

  // Time increment/decrement
  const incrementHours = () => {
    const maxHours = use24Hour ? 23 : 12;
    const minHours = use24Hour ? 0 : 1;
    const newHours = parseInt(hours) + 1;
    setHours(
      (newHours > maxHours ? minHours : newHours).toString().padStart(2, "0")
    );
  };

  const decrementHours = () => {
    const maxHours = use24Hour ? 23 : 12;
    const minHours = use24Hour ? 0 : 1;
    const newHours = parseInt(hours) - 1;
    setHours(
      (newHours < minHours ? maxHours : newHours).toString().padStart(2, "0")
    );
  };

  const incrementMinutes = () => {
    const newMinutes = parseInt(minutes) + 1;
    if (newMinutes > 59) {
      setMinutes("00");
      incrementHours();
    } else {
      setMinutes(newMinutes.toString().padStart(2, "0"));
    }
  };

  const decrementMinutes = () => {
    const newMinutes = parseInt(minutes) - 1;
    if (newMinutes < 0) {
      setMinutes("59");
      decrementHours();
    } else {
      setMinutes(newMinutes.toString().padStart(2, "0"));
    }
  };

  // Check if month is disabled (monthOnly mode)
  const isMonthDisabled = (monthIndex: number) => {
    const date = setMonth(setYear(new Date(), month.getFullYear()), monthIndex);
    if (minDate && date < setMonth(minDate, minDate.getMonth())) return true;
    if (maxDate && date > setMonth(maxDate, maxDate.getMonth())) return true;
    return false;
  };

  const isSelectedMonth = (monthIndex: number) => {
    if (!value) return false;
    return (
      value.getMonth() === monthIndex &&
      value.getFullYear() === month.getFullYear()
    );
  };

  const displayValue = getDisplayValue();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-mono text-xs rounded-none",
            !displayValue && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          {displayValue || <span>{getPlaceholder()}</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 rounded-none" align="start">
        {/* Month/Year Dropdowns */}
        {showMonthYearPicker && !monthOnly && (
          <div className="flex gap-2 p-4 border-b border-border">
            <Select
              value={month.getMonth().toString()}
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="flex-1 h-8 rounded-none font-mono text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {MONTHS.map((m, i) => (
                  <SelectItem
                    key={m}
                    value={i.toString()}
                    className="font-mono text-xs text-left"
                  >
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={month.getFullYear().toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-24 h-8 rounded-none font-mono text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none max-h-60">
                {years.map((y) => (
                  <SelectItem
                    key={y}
                    value={y.toString()}
                    className="font-mono text-xs text-left"
                  >
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Presets (range mode) */}
        {mode === "range" && showPresets && (
          <div className="p-4 border-b border-border">
            <Select onValueChange={handlePresetSelect}>
              <SelectTrigger className="w-full h-8 rounded-none font-mono text-xs">
                <SelectValue placeholder="Quick select..." />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {presets.map((preset) => (
                  <SelectItem
                    key={preset.label}
                    value={preset.label}
                    className="font-mono text-xs text-left"
                  >
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Month-Only Picker */}
        {monthOnly ? (
          <>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 rounded-none"
                onClick={() =>
                  setMonthState(
                    new Date(month.getFullYear() - 1, month.getMonth())
                  )
                }
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <span className="font-mono text-sm font-semibold">
                {month.getFullYear()}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 rounded-none"
                onClick={() =>
                  setMonthState(
                    new Date(month.getFullYear() + 1, month.getMonth())
                  )
                }
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4">
              {MONTHS_SHORT.map((m, index) => (
                <Button
                  key={m}
                  variant={isSelectedMonth(index) ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-9 rounded-none font-mono text-xs",
                    isSelectedMonth(index) &&
                      "bg-primary text-primary-foreground"
                  )}
                  disabled={isMonthDisabled(index)}
                  onClick={() => handleMonthSelect(index)}
                >
                  {m}
                </Button>
              ))}
            </div>
          </>
        ) : showTime && mode === "single" ? (
          /* Date + Time Picker */
          <Tabs defaultValue="date" className="w-full">
            <TabsList className="w-full rounded-none border-b border-border bg-muted/50">
              <TabsTrigger
                value="date"
                className="flex-1 rounded-none font-mono text-xs"
              >
                <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                DATE
              </TabsTrigger>
              <TabsTrigger
                value="time"
                className="flex-1 rounded-none font-mono text-xs"
              >
                <Clock className="mr-2 h-4 w-4" aria-hidden="true" />
                TIME
              </TabsTrigger>
            </TabsList>

            <TabsContent value="date" className="p-0 m-0">
              <Calendar
                mode="single"
                selected={value}
                onSelect={(date) => {
                  if (date) setMonthState(date);
                  onChange?.(date);
                }}
                month={month}
                onMonthChange={setMonthState}
                hideNavigation={showMonthYearPicker}
                disabled={(d) => {
                  if (minDate && d < minDate) return true;
                  if (maxDate && d > maxDate) return true;
                  return false;
                }}
                initialFocus
              />
            </TabsContent>

            <TabsContent value="time" className="p-4 m-0">
              <div className="flex items-start justify-center gap-2">
                {/* Hours */}
                <div className="flex flex-col items-center gap-1">
                  <span className="font-mono text-xs text-muted-foreground mb-1">
                    [HRS]
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementHours}
                    className="h-8 w-12 p-0 rounded-none font-mono text-xs"
                  >
                    +
                  </Button>
                  <Input
                    type="text"
                    value={hours}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      const max = use24Hour ? 23 : 12;
                      const min = use24Hour ? 0 : 1;
                      if (!isNaN(val) && val >= min && val <= max) {
                        setHours(val.toString().padStart(2, "0"));
                      }
                    }}
                    className="h-8 w-12 text-center font-mono text-xs rounded-none"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementHours}
                    className="h-8 w-12 p-0 rounded-none font-mono text-xs"
                  >
                    -
                  </Button>
                </div>

                {/* Separator */}
                <span className="font-mono text-xs font-semibold mt-6 pt-1">
                  :
                </span>

                {/* Minutes */}
                <div className="flex flex-col items-center gap-1">
                  <span className="font-mono text-xs text-muted-foreground mb-1">
                    [MIN]
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementMinutes}
                    className="h-8 w-12 p-0 rounded-none font-mono text-xs"
                  >
                    +
                  </Button>
                  <Input
                    type="text"
                    value={minutes}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 0 && val <= 59) {
                        setMinutes(val.toString().padStart(2, "0"));
                      }
                    }}
                    className="h-8 w-12 text-center font-mono text-xs rounded-none"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementMinutes}
                    className="h-8 w-12 p-0 rounded-none font-mono text-xs"
                  >
                    -
                  </Button>
                </div>

                {/* AM/PM Toggle */}
                {!use24Hour && (
                  <div className="flex flex-col items-center gap-1 ml-2">
                    <span className="font-mono text-xs text-muted-foreground mb-1">
                      [PERIOD]
                    </span>
                    <Button
                      variant={period === "AM" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPeriod("AM")}
                      className="h-8 w-12 rounded-none font-mono text-xs"
                    >
                      AM
                    </Button>
                    <Button
                      variant={period === "PM" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPeriod("PM")}
                      className="h-8 w-12 rounded-none font-mono text-xs"
                    >
                      PM
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        ) : mode === "range" ? (
          /* Range Calendar */
          <Calendar
            mode="range"
            selected={rangeValue}
            onSelect={handleRangeSelect}
            numberOfMonths={numberOfMonths}
            defaultMonth={rangeValue?.from}
            disabled={(d) => {
              if (minDate && d < minDate) return true;
              if (maxDate && d > maxDate) return true;
              return false;
            }}
            initialFocus
          />
        ) : mode === "multiple" ? (
          /* Multiple Calendar */
          <Calendar
            mode="multiple"
            selected={multipleValue}
            onSelect={(dates) => onMultipleChange?.(dates)}
            month={month}
            onMonthChange={setMonthState}
            hideNavigation={showMonthYearPicker}
            disabled={(d) => {
              if (minDate && d < minDate) return true;
              if (maxDate && d > maxDate) return true;
              return false;
            }}
            initialFocus
          />
        ) : (
          /* Single Calendar */
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSingleSelect}
            month={month}
            onMonthChange={setMonthState}
            hideNavigation={showMonthYearPicker}
            disabled={(d) => {
              if (minDate && d < minDate) return true;
              if (maxDate && d > maxDate) return true;
              return false;
            }}
            initialFocus
          />
        )}

        {/* Footer Actions */}
        {(showTime || mode === "range") && !monthOnly && (
          <div className="flex gap-2 p-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 rounded-none font-mono text-xs"
              onClick={() => {
                if (mode === "range") {
                  onRangeChange?.(undefined);
                } else {
                  onChange?.(undefined);
                }
              }}
            >
              {"> CLEAR"}
            </Button>
            <Button
              size="sm"
              className="flex-1 rounded-none font-mono text-xs"
              onClick={showTime ? handleTimeApply : () => setOpen(false)}
              disabled={showTime && !value}
            >
              {"> APPLY"}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

DatePicker.displayName = "DatePicker";

export { DatePicker };
export type { DatePickerProps, DatePickerMode };
