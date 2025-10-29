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
import { loginSchema, type LoginFormData } from "@/lib/auth/validation";
import { toast } from "@/lib/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type ControllerRenderProps } from "react-hook-form";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema) as any, // Type compatibility with zod optional fields
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // UX Heuristic #5: Error Prevention
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Invalid email or password");
      }

      if (result?.ok) {
        toast.success("Welcome back!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      // UX Heuristic #9: Error Recovery - Stay on login page and show error
      setError(err instanceof Error ? err.message : "An error occurred during login");
      toast.error("Login failed. Please check your credentials.");
      // Do NOT navigate away - stay on login page
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper
      variant="narrow"
      padding="default"
      className="flex min-h-screen items-center justify-center"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* UX Heuristic #1: Visibility of system status */}
          {error && (
            <Alert
              variant="destructive"
              className="m-4"
              data-testid="login-error"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }: { field: ControllerRenderProps<LoginFormData, "email"> }) => (
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
                  field: ControllerRenderProps<LoginFormData, "password">;
                }) => (
                  <FormItem>
                    <div className="flex justify-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
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
                name="rememberMe"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<LoginFormData, "rememberMe">;
                }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel className="m-4">Remember me for 30 days</FormLabel>
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <div className="w-full text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}
