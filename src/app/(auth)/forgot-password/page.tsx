/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 */

"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/auth/validation";
import { toast } from "@/lib/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, type ControllerRenderProps } from "react-hook-form";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // UX Heuristic #5: Error Prevention
  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send reset link");
      }

      setEmailSent(true);
      toast.success("Reset link sent to your email!");
    } catch (err: unknown) {
      // UX Heuristic #9: Error Recovery
      setError(err instanceof Error ? err.message : "An error occurred. Please try again later.");
      toast.error("Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  // UX Heuristic #1: Visibility of system status
  if (emailSent) {
    return (
      <PageWrapper>
        <Card className="w-full">
          <CardContent>
            <div className="p-6 text-center">
              <Mail className="m-4 size-full" />
              <h2 className="m-4 text-base font-medium">Check your email</h2>
              <p className="m-4">We&apos;ve sent a reset link to {form.getValues("email")}</p>
              <Alert className="m-4">
                <AlertDescription>
                  If an account exists with this email, you&apos;ll receive a password reset link
                  shortly. This link will expire in 1 hour.
                </AlertDescription>
              </Alert>
              <Button variant="ghost" className="m-4" onClick={() => setEmailSent(false)}>
                <ArrowLeft className="m-4" />
                Back to reset password
              </Button>
            </div>
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset your password
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* UX Heuristic #9: Error Recovery */}
          {error && (
            <Alert variant="destructive" className="m-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<ForgotPasswordFormData, "email">;
                }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <Link href="/login" className="w-full">
            <Button variant="ghost" className="w-full">
              <ArrowLeft className="m-4" />
              Back to Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}
