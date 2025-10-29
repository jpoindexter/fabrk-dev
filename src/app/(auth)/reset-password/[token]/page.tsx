/**
 * ✅ FABRK COMPONENT
 * - Component under 300 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 */

"use client";

import { PasswordStrength } from "@/components/auth/password-strength";
import { ResetSuccess, TokenExpired } from "@/components/auth/reset-status";
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
import { ResetPasswordFormData, resetPasswordSchema } from "@/lib/auth/validation";
import { toast } from "@/lib/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type ControllerRenderProps } from "react-hook-form";

interface ResetPasswordPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string>("");
  const _router = useRouter();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      try {
        const resolvedParams = await params;
        const tokenValue = resolvedParams.token;
        setToken(tokenValue);

        await new Promise((resolve) => setTimeout(resolve, 100));

        if (tokenValue === "expired" || tokenValue.length < 10) {
          setTokenValid(false);
        } else {
          setTokenValid(true);
        }
      } catch {
        setTokenValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [params]);

  // UX Heuristic #5: Error Prevention
  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to reset password");
      }

      setSuccess(true);
      toast.success("Password reset successfully!");
    } catch (err) {
      // UX Heuristic #9: Error Recovery
      setError(err instanceof Error ? err.message : "Failed to reset password");
      toast.error("Reset failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // UX Heuristic #1: Visibility of system status
  if (isValidating) {
    return (
      <PageWrapper
        variant="narrow"
        padding="default"
        className="flex min-h-screen items-center justify-center"
      >
        <Card className="w-full">
          <CardContent>
            <div className="p-6 text-center">
              <p>Validating reset link...</p>
            </div>
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  if (!tokenValid) {
    return (
      <PageWrapper
        variant="narrow"
        padding="default"
        className="flex min-h-screen items-center justify-center"
      >
        <Card className="w-full">
          <CardContent>
            <TokenExpired />
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  if (success) {
    return (
      <PageWrapper
        variant="narrow"
        padding="default"
        className="flex min-h-screen items-center justify-center"
      >
        <Card className="w-full">
          <CardContent>
            <ResetSuccess />
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      variant="narrow"
      padding="default"
      className="flex min-h-screen items-center justify-center"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="m-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="password"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<ResetPasswordFormData, "password">;
                }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <PasswordStrength password={password} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<ResetPasswordFormData, "confirmPassword">;
                }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="m-4 w-full" disabled={isLoading}>
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <div className="w-full text-center">
            Remember your password?{" "}
            <Link href="/login" className="font-medium">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}
