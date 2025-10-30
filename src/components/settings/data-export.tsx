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

  const generateMockData = () => {
    const data: Record<string, unknown> = {};

    if (options.includeProfile) {
      data.profile = {
        id: "user_123",
        email: "user@example.com",
        name: "John Doe",
        avatar: "https://api.example.com/avatars/user_123.jpg",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: new Date().toISOString(),
      };
    }

    if (options.includeSettings) {
      data.settings = {
        theme: "system",
        language: "en",
        notifications: {
          email: true,
          push: false,
          sms: false,
        },
        privacy: {
          profilePublic: false,
          showEmail: false,
        },
      };
    }

    if (options.includeActivity) {
      data.activity = {
        lastLogin: new Date().toISOString(),
        loginHistory: [
          {
            timestamp: new Date().toISOString(),
            device: "Chrome on MacOS",
            ip: "192.168.1.100",
          },
        ],
        actions: [
          {
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            action: "profile_updated",
            details: "Updated profile information",
          },
        ],
      };
    }

    if (options.includePreferences) {
      data.preferences = {
        defaultView: "grid",
        itemsPerPage: 20,
        autoSave: true,
        darkMode: false,
        compactMode: false,
      };
    }

    return data;
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const data = generateMockData();

    if (format === "json") {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `user-data-${new Date().getTime()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === "csv") {
      const csvContent = Object.entries(data)
        .map(([key, value]) => {
          return `"${key}","${JSON.stringify(value).replace(/"/g, '""')}"`;
        })
        .join("\n");

      const dataBlob = new Blob(
        ["key,value\n", csvContent],
        { type: "text/csv" }
      );
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `user-data-${new Date().getTime()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

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
            <SelectTrigger id="format-select" disabled={isLoading}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
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
          className="w-full"
        >
          {isLoading ? "Exporting..." : "Download Data"}
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
