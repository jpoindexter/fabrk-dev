/**
 * ✅ FABRK COMPONENT
 * - Component under 300 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 */

"use client";

import { PasswordStrength } from "@/components/auth/password-strength";
import { SignupSuccessMessage } from "@/components/auth/signup-success";
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
import { Checkbox } from "@/components/ui/checkbox";
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
import { signupSchema, type SignupFormData } from "@/lib/auth/validation";
import { toast } from "@/lib/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type ControllerRenderProps } from "react-hook-form";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema) as any, // Type compatibility with zod optional fields
    mode: "onChange", // Enable real-time validation for submit button state
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      subscribeNewsletter: false,
    },
  });

  const password = form.watch("password");

  // UX Heuristic #5: Error Prevention
  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Register user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.name,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create account");
      }

      // Auto-login after successful registration
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        throw new Error("Account created but login failed. Please try logging in.");
      }

      toast.success("Account created successfully!");
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      // UX Heuristic #9: Error Recovery
      setError(err instanceof Error ? err.message : "An error occurred during signup");
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <PageWrapper>
        <Card className="w-full">
          <CardContent>
            <SignupSuccessMessage email={form.getValues("email")} />
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your information to get started</CardDescription>
        </CardHeader>

        <CardContent>
          {/* UX Heuristic #1: Visibility of system status */}
          {error && (
            <Alert variant="destructive" className="m-4" data-testid="signup-error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }: { field: ControllerRenderProps<SignupFormData, "name"> }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }: { field: ControllerRenderProps<SignupFormData, "email"> }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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

              <FormField
                control={form.control}
                name="password"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<SignupFormData, "password">;
                }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a strong password"
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
                  field: ControllerRenderProps<SignupFormData, "confirmPassword">;
                }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<SignupFormData, "acceptTerms">;
                }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel className="m-4">
                      I accept the{" "}
                      <Link href="/terms" className="text-sm text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-sm text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={isLoading || !form.formState.isValid}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <div className="w-full text-center">
            Already have an account?{" "}
            <Link href="/login" className="font-medium">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
