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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

export function DangerZone() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteAccount = async () => {
    if (confirmText !== "delete my account") {
      toast({
        title: "Confirmation failed",
        description: 'Please type "delete my account" to confirm.',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Account deleted");

    toast({
      title: "Account deleted",
      description: "Your account and all associated data have been deleted.",
    });

    setIsLoading(false);
    setDeleteDialogOpen(false);
    setConfirmText("");

    // In a real app, redirect to home or login page
    // router.push("/");
  };

  const handleExportData = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockData = {
      exportDate: new Date().toISOString(),
      user: {
        id: "user_123",
        email: "user@example.com",
        name: "John Doe",
        createdAt: "2024-01-01T00:00:00Z",
      },
      settings: {
        theme: "system",
        language: "en",
        notifications: true,
      },
    };

    const dataStr = JSON.stringify(mockData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `user-data-${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Data exported",
      description: "Your data has been exported successfully.",
    });

    setIsLoading(false);
    setExportDialogOpen(false);
  };

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>
          Irreversible and destructive actions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Export Your Data</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Download a copy of your account data in JSON format.
          </p>
          <Button
            variant="outline"
            onClick={() => setExportDialogOpen(true)}
            disabled={isLoading}
          >
            Export Data
          </Button>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-destructive mb-2">Delete Account</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <Button
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
            disabled={isLoading}
          >
            Delete Account
          </Button>
        </div>
      </CardContent>

      <AlertDialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Export Your Data</AlertDialogTitle>
            <AlertDialogDescription>
              You will receive a download of all your account data in JSON format. This includes your profile, settings, and activity history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleExportData}
              disabled={isLoading}
            >
              {isLoading ? "Exporting..." : "Export"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your account and all data will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 my-4">
            <div>
              <p className="text-sm font-medium mb-2">
                Type <span className="font-mono bg-muted px-2 py-1 rounded">delete my account</span> to confirm:
              </p>
              <Input
                placeholder="delete my account"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isLoading || confirmText !== "delete my account"}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete Account"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
