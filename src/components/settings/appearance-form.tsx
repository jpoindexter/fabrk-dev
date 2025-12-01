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
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const appearanceFormSchema = z.object({
  language: z.enum(["en", "es", "fr", "de", "ja"]),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export function AppearanceForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast, error } = useToast();

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      language: "en",
    },
  });

  async function onSubmit(data: AppearanceFormValues) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appearance: data }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to update appearance settings"
        );
      }

      toast({
        title: "Settings saved",
        description: "Your appearance settings have been updated.",
      });
    } catch (err: unknown) {
      error(
        "Error",
        err instanceof Error
          ? err.message
          : "Failed to update appearance settings. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle className="font-mono text-xs">[APPEARANCE]:</CardTitle>
        <CardDescription>
          Customize your language preference. Use the theme dropdown in the navigation bar to change color themes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-xs">[LANGUAGE]:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-none">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="en" className="rounded-none focus:bg-primary focus:text-primary-foreground">English</SelectItem>
                      <SelectItem value="es" className="rounded-none focus:bg-primary focus:text-primary-foreground">Spanish</SelectItem>
                      <SelectItem value="fr" className="rounded-none focus:bg-primary focus:text-primary-foreground">French</SelectItem>
                      <SelectItem value="de" className="rounded-none focus:bg-primary focus:text-primary-foreground">German</SelectItem>
                      <SelectItem value="ja" className="rounded-none focus:bg-primary focus:text-primary-foreground">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select your preferred language for the interface.
                  </FormDescription>
                  <FormMessage />
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
