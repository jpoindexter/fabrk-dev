/**
 * ✅ FABRK COMPONENT
 * Sign Up Template - Terminal console style
 * Production-ready ✓
 */
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TerminalCard, TerminalCardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Github, UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign Up Template - Fabrk",
  description: "Production-ready registration page template with validation.",
};

export default function SignUpTemplate() {
  return (
    <div>
      {/* Page Content */}
      <main className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="border-border inline-block border px-4 py-1">
              <span className="text-muted-foreground font-mono text-xs">[TEMPLATE]: SIGN_UP</span>
            </div>
            <h1 className="font-mono text-4xl font-semibold tracking-tight">Sign Up</h1>
            <p className="text-muted-foreground font-mono text-sm">
              Registration page with form validation and social providers
            </p>
          </div>
        </div>

        {/* Template Preview */}
        <TerminalCard>
          <TerminalCardHeader code="0x00" title="PREVIEW" />

          <div className="bg-background/50 flex min-h-[700px] flex-col items-center justify-center p-4 sm:p-8">
            <div className="border-border bg-background w-full max-w-[380px] space-y-6 border p-6">
              {/* Header */}
              <div className="flex flex-col space-y-2 text-center">
                <div className="border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border">
                  <UserPlus className="text-primary h-5 w-5" />
                </div>
                <h1 className="font-mono text-2xl font-bold tracking-tight">Create an account</h1>
                <p className="text-muted-foreground text-sm">
                  Enter your information to get started with Fabrk
                </p>
              </div>

              {/* Signup Form */}
              <div className="grid gap-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="font-mono text-xs">
                        [FIRST_NAME]:
                      </Label>
                      <Input
                        id="first-name"
                        placeholder="John"
                        required
                        className="rounded-none font-mono text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="font-mono text-xs">
                        [LAST_NAME]:
                      </Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        required
                        className="rounded-none font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-mono text-xs">
                      [EMAIL]:
                    </Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      required
                      className="rounded-none font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-mono text-xs">
                      [PASSWORD]:
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      autoComplete="new-password"
                      required
                      className="rounded-none font-mono text-xs"
                    />
                    <p className="text-muted-foreground font-mono text-xs">
                      Must be at least 8 characters long
                    </p>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" className="mt-0.5 rounded-none" />
                    <Label
                      htmlFor="terms"
                      className="text-muted-foreground font-mono text-xs leading-normal font-normal"
                    >
                      I agree to the{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button className="w-full rounded-none font-mono text-xs" type="submit">
                    &gt; CREATE_ACCOUNT
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="border-border w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background text-muted-foreground px-2">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="rounded-none font-mono text-xs">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" className="rounded-none font-mono text-xs">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        className="fill-blue-600"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        className="fill-green-600"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        className="fill-yellow-500"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        className="fill-red-600"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Google
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground px-8 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/templates/authentication/sign-in"
                  className="hover:text-primary underline underline-offset-4"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </TerminalCard>

        {/* Template Features Card */}
        <TerminalCard>
          <TerminalCardHeader code="0x01" title="TEMPLATE_FEATURES" />
          <div className="p-4">
            <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> Multi-step registration form layout
              </div>
              <div>
                <span className="text-success">&gt;</span> Terms of Service checkbox validation
              </div>
              <div>
                <span className="text-success">&gt;</span> Password strength indicator support
              </div>
              <div>
                <span className="text-success">&gt;</span> Social sign-up integration
              </div>
              <div>
                <span className="text-success">&gt;</span> Mobile-responsive card design
              </div>
            </div>
          </div>
        </TerminalCard>
      </main>
    </div>
  );
}
