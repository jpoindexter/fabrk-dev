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

const privacyFormSchema = z.object({
  profileVisibility: z.boolean(),
  activityTracking: z.boolean(),
  analyticsSharing: z.boolean(),
  searchIndexing: z.boolean(),
  dataRetention: z.boolean(),
});

type PrivacyFormValues = z.infer<typeof privacyFormSchema>;

export function PrivacyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast, error } = useToast();

  const form = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      profileVisibility: true,
      activityTracking: false,
      analyticsSharing: false,
      searchIndexing: true,
      dataRetention: true,
    },
  });

  async function onSubmit(data: PrivacyFormValues) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ privacy: data }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update privacy settings");
      }

      toast({
        title: "Settings saved",
        description: "Your privacy preferences have been updated.",
      });
    } catch (err: unknown) {
      error(
        "Error",
        err instanceof Error
          ? err.message
          : "Failed to update privacy settings. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle className="font-mono text-xs">[PRIVACY]:</CardTitle>
        <CardDescription className="font-mono text-xs">
          Control your privacy settings and how your data is handled.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="profileVisibility"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="font-mono text-xs">[PROFILE_VISIBILITY]:</FormLabel>
                    <FormDescription className="font-mono text-xs">
                      Allow your profile to be visible to other users.
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
              name="activityTracking"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="font-mono text-xs">[ACTIVITY_TRACKING]:</FormLabel>
                    <FormDescription className="font-mono text-xs">
                      Allow us to track your activity to improve your experience.
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
              name="analyticsSharing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="font-mono text-xs">[ANALYTICS_SHARING]:</FormLabel>
                    <FormDescription className="font-mono text-xs">
                      Share anonymous usage data to help us improve the product.
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
              name="searchIndexing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="font-mono text-xs">[SEARCH_INDEXING]:</FormLabel>
                    <FormDescription className="font-mono text-xs">
                      Allow search engines to index your profile.
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
              name="dataRetention"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="font-mono text-xs">[DATA_RETENTION]:</FormLabel>
                    <FormDescription className="font-mono text-xs">
                      Keep my account data if I delete my account.
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
