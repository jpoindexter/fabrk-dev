"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const notificationsFormSchema = z.object({
  marketingEmails: z.boolean(),
  productUpdates: z.boolean(),
  securityAlerts: z.boolean(),
  weeklySummary: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

export function NotificationsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast, error } = useToast();

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      marketingEmails: false,
      productUpdates: true,
      securityAlerts: true,
      weeklySummary: false,
    },
  });

  async function onSubmit(data: NotificationsFormValues) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notifications: data }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to update notification settings"
        );
      }

      toast({
        title: "Settings saved",
        description: "Your notification preferences have been updated.",
      });
    } catch (err: unknown) {
      error(
        "Error",
        err instanceof Error
          ? err.message
          : "Failed to update notification settings. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle className="font-mono text-xs">[NOTIFICATIONS]:</CardTitle>
        <CardDescription className="font-mono text-xs">
          Manage how and when you receive email notifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="securityAlerts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="font-mono text-xs">[SECURITY_ALERTS]:</FormLabel>
                    <FormDescription className="font-mono text-xs">
                      Receive alerts for suspicious activity and security events.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="rounded-none [&>span]:rounded-none h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:translate-x-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productUpdates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="font-mono text-xs">[PRODUCT_UPDATES]:</FormLabel>
                    <FormDescription className="font-mono text-xs">
                      Get notified about new features and improvements.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="rounded-none [&>span]:rounded-none h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:translate-x-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketingEmails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="font-mono text-xs">[MARKETING_EMAILS]:</FormLabel>
                    <FormDescription className="font-mono text-xs">
                      Receive promotional emails and special offers.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="rounded-none [&>span]:rounded-none h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:translate-x-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weeklySummary"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="font-mono text-xs">[WEEKLY_SUMMARY]:</FormLabel>
                    <FormDescription className="font-mono text-xs">
                      Get a weekly digest of your account activity.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="rounded-none [&>span]:rounded-none h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:translate-x-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="rounded-none font-mono text-xs">
              {isLoading ? "> SAVING..." : "> SAVE_CHANGES"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
