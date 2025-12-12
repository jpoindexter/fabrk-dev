"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  AuthLayoutHeader,
  AuthLayoutDivider,
  AuthLayoutFooterLinks,
} from "@/components/ui/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default function AuthLayoutPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.102]"
      category="Layout"
      title="Auth Layout"
      description="A centered or split-screen layout wrapper for authentication pages. Includes header, divider, and footer link components."
      importCode={`import {
  AuthLayout,
  AuthLayoutHeader,
  AuthLayoutDivider,
  AuthLayoutFooterLinks,
} from "@/components/ui/auth-layout"`}
      mainPreview={{
        preview: (
          <div className="bg-muted/50 flex min-h-[500px] items-center justify-center p-8">
            <div className="border-border bg-card w-full max-w-[380px] border p-6">
              <AuthLayoutHeader
                icon={<Lock className="text-primary h-5 w-5" />}
                title="Welcome back"
                description="Enter your email to sign in"
              />
              <form className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label className="font-mono text-xs">[EMAIL]:</Label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    className="rounded-none font-mono text-xs"
                  />
                </div>
                <Button className="w-full rounded-none font-mono text-xs">&gt; SIGN_IN</Button>
              </form>
              <AuthLayoutDivider text="Or continue with" className="my-6" />
              <Button variant="outline" className="w-full rounded-none font-mono text-xs">
                GitHub
              </Button>
              <AuthLayoutFooterLinks
                text="Don't have an account?"
                href="/sign-up"
                linkText="Sign up"
                className="mt-6"
              />
            </div>
          </div>
        ),
        code: `<AuthLayout
  logo={<Lock className="h-6 w-6" />}
  logoTitle="FABRK"
>
  <AuthLayoutHeader
    icon={<Lock className="h-5 w-5 text-primary" />}
    title="Welcome back"
    description="Enter your email to sign in"
  />
  <form className="mt-6 space-y-4">
    <div className="space-y-2">
      <Label>[EMAIL]:</Label>
      <Input type="email" placeholder="name@example.com" />
    </div>
    <Button className="w-full">> SIGN_IN</Button>
  </form>
  <AuthLayoutDivider text="Or continue with" className="my-6" />
  <AuthLayoutFooterLinks
    text="Don't have an account?"
    href="/sign-up"
    linkText="Sign up"
    className="mt-6"
  />
</AuthLayout>`,
      }}
      variants={[
        {
          title: "Split Screen",
          description: "Two-column layout with side content.",
          preview: (
            <div className="bg-muted/50 grid min-h-[400px] grid-cols-2 overflow-hidden">
              {/* Side Panel */}
              <div className="bg-primary relative flex items-end p-6">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                    linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="text-primary-foreground relative z-10">
                  <p className="font-mono text-sm">
                    &ldquo;The best SaaS boilerplate I&apos;ve ever used.&rdquo;
                  </p>
                  <p className="mt-4 font-mono text-xs font-semibold">Jane Smith</p>
                  <p className="font-mono text-xs opacity-80">CTO, TechCorp</p>
                </div>
              </div>
              {/* Form Panel */}
              <div className="flex items-center justify-center p-6">
                <div className="border-border bg-card w-full max-w-[280px] border p-6">
                  <AuthLayoutHeader title="Sign In" description="Welcome back" />
                  <div className="mt-6 space-y-4">
                    <Input
                      type="email"
                      placeholder="Email"
                      className="rounded-none font-mono text-xs"
                    />
                    <Button className="w-full rounded-none font-mono text-xs">&gt; SIGN_IN</Button>
                  </div>
                </div>
              </div>
            </div>
          ),
          code: `<AuthLayout
  sideContent={
    <AuthLayoutSideContent
      quote="The best SaaS boilerplate I've ever used."
      author="Jane Smith"
      authorTitle="CTO, TechCorp"
    />
  }
  sideBackground="bg-primary"
>
  <AuthLayoutHeader title="Sign In" />
  ...
</AuthLayout>`,
        },
      ]}
      props={[
        { name: "children", type: "ReactNode", required: true, description: "Auth form content." },
        { name: "logo", type: "ReactNode", description: "Logo element." },
        { name: "logoTitle", type: "string", description: "Title displayed below logo." },
        {
          name: "sideContent",
          type: "ReactNode",
          description: "Side panel content for split layout.",
        },
        {
          name: "sideBackground",
          type: "string",
          default: '"bg-primary"',
          description: "Side panel background class.",
        },
        { name: "footer", type: "ReactNode", description: "Footer content." },
        {
          name: "maxWidth",
          type: '"sm" | "md" | "lg"',
          default: '"sm"',
          description: "Max width of form container.",
        },
      ]}
      accessibility={[
        "Semantic form structure",
        "Proper label associations",
        "Keyboard navigable",
        "Responsive mobile layout",
      ]}
      previous={{ title: "Aspect Ratio", href: "/docs/components/aspect-ratio" }}
      next={{ title: "Collapsible", href: "/docs/components/collapsible" }}
    />
  );
}
