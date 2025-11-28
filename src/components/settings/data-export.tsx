"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type ExportFormat = "json" | "csv";

interface ExportOptions {
  includeProfile: boolean;
  includeSettings: boolean;
  includeActivity: boolean;
  includePreferences: boolean;
}

export function DataExport() {
  const [format, setFormat] = useState<ExportFormat>("json");
  const [options, setOptions] = useState<ExportOptions>({
    includeProfile: true,
    includeSettings: true,
    includeActivity: true,
    includePreferences: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleOptionChange = (key: keyof ExportOptions) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleExport = async () => {
    // Verify at least one option is selected
    const hasSelection = Object.values(options).some((value) => value);
    if (!hasSelection) {
      toast({
        title: "No data selected",
        description: "Please select at least one data type to export.",
      });
      return;
    }

    setIsLoading(true);

    // Simulate export delay for demo
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Data exported",
      description: `Your data has been exported as ${format.toUpperCase()}.`,
    });

    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Your Data</CardTitle>
        <CardDescription>
          Download a copy of your account data in your preferred format.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="format-select" className="text-base font-medium">
            Export Format
          </Label>
          <Select value={format} onValueChange={(value) => setFormat(value as ExportFormat)}>
            <SelectTrigger id="format-select" disabled={isLoading} className="rounded-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json" className="rounded-none focus:bg-primary focus:text-primary-foreground">JSON</SelectItem>
              <SelectItem value="csv" className="rounded-none focus:bg-primary focus:text-primary-foreground">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border-t pt-4 space-y-3">
          <Label className="text-base font-medium">Data to Include</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="profile"
                checked={options.includeProfile}
                onCheckedChange={() => handleOptionChange("includeProfile")}
                disabled={isLoading}
              />
              <Label
                htmlFor="profile"
                className="font-normal cursor-pointer flex-1"
              >
                Profile Information
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="settings"
                checked={options.includeSettings}
                onCheckedChange={() => handleOptionChange("includeSettings")}
                disabled={isLoading}
              />
              <Label
                htmlFor="settings"
                className="font-normal cursor-pointer flex-1"
              >
                Settings & Preferences
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="activity"
                checked={options.includeActivity}
                onCheckedChange={() => handleOptionChange("includeActivity")}
                disabled={isLoading}
              />
              <Label
                htmlFor="activity"
                className="font-normal cursor-pointer flex-1"
              >
                Activity History
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="preferences"
                checked={options.includePreferences}
                onCheckedChange={() => handleOptionChange("includePreferences")}
                disabled={isLoading}
              />
              <Label
                htmlFor="preferences"
                className="font-normal cursor-pointer flex-1"
              >
                User Preferences
              </Label>
            </div>
          </div>
        </div>

        <Button
          onClick={handleExport}
          disabled={isLoading || !Object.values(options).some((v) => v)}
          className="w-full rounded-none font-mono text-xs"
        >
          {isLoading ? "> EXPORTING..." : "> DOWNLOAD_DATA"}
        </Button>

        <p className="text-xs text-muted-foreground pt-2">
          Your data is encrypted and will be deleted from our servers after download.
        </p>
      </CardContent>
    </Card>
  );
}

// Alias for backward compatibility
export const DataExportSection = DataExport;
