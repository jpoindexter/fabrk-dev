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

const languageFormSchema = z.object({
  language: z.enum(["en", "es", "fr", "de", "ja", "zh", "pt", "ko"]),
});

type LanguageFormValues = z.infer<typeof languageFormSchema>;

export function LanguageForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(languageFormSchema),
    defaultValues: {
      language: "en",
    },
  });

  async function onSubmit(data: LanguageFormValues) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: data.language }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update language settings");
      }

      toast({
        title: "Settings saved",
        description: "Your language preference has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update language settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Language</CardTitle>
        <CardDescription>
          Select your preferred language for the interface.
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
                  <FormLabel>Interface Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español (Spanish)</SelectItem>
                      <SelectItem value="fr">Français (French)</SelectItem>
                      <SelectItem value="de">Deutsch (German)</SelectItem>
                      <SelectItem value="ja">日本語 (Japanese)</SelectItem>
                      <SelectItem value="zh">中文 (Chinese)</SelectItem>
                      <SelectItem value="pt">Português (Portuguese)</SelectItem>
                      <SelectItem value="ko">한국어 (Korean)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This will change the language of all interface text.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
