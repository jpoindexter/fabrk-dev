"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface TimePickerProps {
  time?: string; // Format: "HH:mm" (24-hour) or "hh:mm AM/PM" (12-hour)
  onTimeChange?: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  use24Hour?: boolean;
}

export function TimePicker({
  time,
  onTimeChange,
  placeholder = "Pick a time",
  disabled = false,
  className,
  use24Hour = false,
}: TimePickerProps) {
  const [hours, setHours] = React.useState<string>("12");
  const [minutes, setMinutes] = React.useState<string>("00");
  const [period, setPeriod] = React.useState<"AM" | "PM">("AM");

  // Parse initial time value
  React.useEffect(() => {
    if (time) {
      if (use24Hour) {
        const [h, m] = time.split(":");
        setHours(h || "12");
        setMinutes(m || "00");
      } else {
        const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (match) {
          setHours(match[1] || "12");
          setMinutes(match[2] || "00");
          setPeriod(match[3].toUpperCase() as "AM" | "PM");
        }
      }
    }
  }, [time, use24Hour]);

  const handleApply = () => {
    let formattedTime: string;
    if (use24Hour) {
      formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
    } else {
      formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")} ${period}`;
    }
    onTimeChange?.(formattedTime);
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
    setMinutes(newMinutes > 59 ? "0" : newMinutes.toString());
  };

  const decrementMinutes = () => {
    const newMinutes = parseInt(minutes) - 1;
    setMinutes(newMinutes < 0 ? "59" : newMinutes.toString());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !time && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time || <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
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

            <span className="text-2xl font-bold">:</span>

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
              <Label className="text-xs text-muted-foreground">Minutes</Label>
            </div>

            {/* AM/PM Toggle (only for 12-hour format) */}
            {!use24Hour && (
              <div className="flex flex-col items-center space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPeriod(period === "AM" ? "PM" : "AM")}
                  className="h-16 w-16 text-lg font-bold"
                >
                  {period}
                </Button>
                <Label className="text-xs text-muted-foreground">Period</Label>
              </div>
            )}
          </div>

          <Button onClick={handleApply} className="w-full">
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
