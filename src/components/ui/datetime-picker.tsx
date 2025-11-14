"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DateTimePickerProps {
  dateTime?: Date;
  onDateTimeChange?: (dateTime: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  use24Hour?: boolean;
}

export function DateTimePicker({
  dateTime,
  onDateTimeChange,
  placeholder = "Pick date and time",
  disabled = false,
  className,
  use24Hour = false,
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    dateTime
  );
  const [hours, setHours] = React.useState<string>(
    dateTime ? format(dateTime, use24Hour ? "HH" : "hh") : "12"
  );
  const [minutes, setMinutes] = React.useState<string>(
    dateTime ? format(dateTime, "mm") : "00"
  );
  const [period, setPeriod] = React.useState<"AM" | "PM">(
    dateTime && !use24Hour ? (format(dateTime, "a") as "AM" | "PM") : "AM"
  );

  const handleApply = () => {
    if (!selectedDate) return;

    const newDateTime = new Date(selectedDate);
    let hoursValue = parseInt(hours);

    // Convert to 24-hour format if needed
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

    onDateTimeChange?.(newDateTime);
  };

  const incrementHours = () => {
    const maxHours = use24Hour ? 23 : 12;
    const minHours = use24Hour ? 0 : 1;
    const newHours = parseInt(hours) + 1;
    setHours(newHours > maxHours ? minHours.toString() : newHours.toString());
  };

  const decrementHours = () => {
    const maxHours = use24Hour ? 23 : 12;
    const minHours = use24Hour ? 0 : 1;
    const newHours = parseInt(hours) - 1;
    setHours(newHours < minHours ? maxHours.toString() : newHours.toString());
  };

  const incrementMinutes = () => {
    const newMinutes = parseInt(minutes) + 1;
    if (newMinutes > 59) {
      setMinutes("0");
      incrementHours();
    } else {
      setMinutes(newMinutes.toString());
    }
  };

  const decrementMinutes = () => {
    const newMinutes = parseInt(minutes) - 1;
    if (newMinutes < 0) {
      setMinutes("59");
      decrementHours();
    } else {
      setMinutes(newMinutes.toString());
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateTime && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateTime ? (
            format(dateTime, use24Hour ? "PPP HH:mm" : "PPP hh:mm a")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Tabs defaultValue="date" className="w-full">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="date" className="flex-1">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Date
            </TabsTrigger>
            <TabsTrigger value="time" className="flex-1">
              <Clock className="mr-2 h-4 w-4" />
              Time
            </TabsTrigger>
          </TabsList>

          <TabsContent value="date" className="p-0 m-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </TabsContent>

          <TabsContent value="time" className="p-4 m-0">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center space-x-2">
                {/* Hours */}
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementHours}
                    className="h-8 w-8 p-0"
                  >
                    +
                  </Button>
                  <Input
                    type="number"
                    value={hours}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      const max = use24Hour ? 23 : 12;
                      const min = use24Hour ? 0 : 1;
                      if (val >= min && val <= max) {
                        setHours(e.target.value);
                      }
                    }}
                    className="w-16 text-center font-semibold text-lg"
                    min={use24Hour ? "0" : "1"}
                    max={use24Hour ? "23" : "12"}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementHours}
                    className="h-8 w-8 p-0"
                  >
                    -
                  </Button>
                  <Label className="text-xs text-muted-foreground">Hours</Label>
                </div>

                <span className="text-2xl font-semibold">:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementMinutes}
                    className="h-8 w-8 p-0"
                  >
                    +
                  </Button>
                  <Input
                    type="number"
                    value={minutes}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 0 && val <= 59) {
                        setMinutes(e.target.value);
                      }
                    }}
                    className="w-16 text-center font-semibold text-lg"
                    min="0"
                    max="59"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementMinutes}
                    className="h-8 w-8 p-0"
                  >
                    -
                  </Button>
                  <Label className="text-xs text-muted-foreground">
                    Minutes
                  </Label>
                </div>

                {/* AM/PM Toggle */}
                {!use24Hour && (
                  <div className="flex flex-col items-center space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPeriod(period === "AM" ? "PM" : "AM")}
                      className="h-16 w-16 text-lg font-semibold"
                    >
                      {period}
                    </Button>
                    <Label className="text-xs text-muted-foreground">
                      Period
                    </Label>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-3 border-t">
          <Button onClick={handleApply} className="w-full" disabled={!selectedDate}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
