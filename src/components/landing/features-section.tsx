/**
 * ✅ FABRK COMPONENT
 * Feature Deep-Dives - Achromatic-style alternating layout sections
 * Production-ready ✓
 */
"use client";

import { motion } from "framer-motion";
import { H2, H3, Body, Small } from "@/components/ui/typography";
import {
  Lock,
  Users,
  CreditCard,
  Palette,
  Mail,
  Key,
  Shield,
  UserPlus,
  Building2,
  ArrowLeftRight,
  Receipt,
  Gauge,
  DollarSign,
  AlertCircle,
  Moon,
  Smartphone,
  Code2,
  Layers,
} from "lucide-react";

interface FeatureItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0">
        <Icon className="size-5 text-primary" />
      </div>
      <div>
        <Small className="font-semibold text-foreground">{title}</Small>
        <Small className="block text-muted-foreground">{description}</Small>
      </div>
    </div>
  );
}

interface FeatureSectionProps {
  title: string;
  description: string;
  features: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }>;
  reversed?: boolean;
  children?: React.ReactNode;
}

function FeatureSection({ title, description, features, reversed, children }: FeatureSectionProps) {
  return (
    <div className={`grid gap-12 lg:grid-cols-2 lg:gap-16 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: reversed ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center"
      >
        <H3 className="mb-4 text-2xl">{title}</H3>
        <Body className="mb-6 text-muted-foreground">{description}</Body>
        <div className="space-y-4">
          {features.map((feature, i) => (
            <FeatureItem key={i} {...feature} />
          ))}
        </div>
      </motion.div>

      {/* Visual Content */}
      <motion.div
        initial={{ opacity: 0, x: reversed ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Mock UI components for visual representation
function AuthPreview() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-sm">
      <H3 className="mb-1 text-lg">Sign in to your account</H3>
      <Small className="mb-6 text-muted-foreground">Welcome back! Please sign in to continue.</Small>

      <div className="space-y-4">
        <div>
          <Small className="mb-1.5 block font-medium">Email</Small>
          <div className="rounded-md border border-border bg-background px-3 py-2">
            <Small className="text-muted-foreground">you@example.com</Small>
          </div>
        </div>
        <div>
          <div className="mb-1.5 flex justify-between">
            <Small className="font-medium">Password</Small>
            <Small className="text-primary">Forgot password?</Small>
          </div>
          <div className="rounded-md border border-border bg-background px-3 py-2">
            <Small className="text-muted-foreground">••••••••</Small>
          </div>
        </div>
        <div className="rounded-md bg-primary px-4 py-2 text-center">
          <Small className="font-medium text-primary-foreground">Sign in</Small>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <Small className="bg-card px-2 text-muted-foreground">Or continue with</Small>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md border border-border px-4 py-2 text-center">
            <Small className="font-medium">Google</Small>
          </div>
          <div className="rounded-md border border-border px-4 py-2 text-center">
            <Small className="font-medium">Microsoft</Small>
          </div>
        </div>
      </div>
      <Small className="mt-4 block text-center text-muted-foreground">
        Don't have an account? <span className="text-primary">Sign up</span>
      </Small>
    </div>
  );
}

function OrganizationPreview() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <H3 className="text-base">Organizations</H3>
          <div className="rounded-md bg-primary px-3 py-1">
            <Small className="font-medium text-primary-foreground">+ Add organization</Small>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { name: "Acme Inc", role: "Owner", members: 12 },
            { name: "Startup Co", role: "Admin", members: 5 },
          ].map((org) => (
            <div key={org.name} className="flex items-center justify-between rounded-md border border-border bg-background p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                  <Building2 className="size-4 text-primary" />
                </div>
                <div>
                  <Small className="font-medium">{org.name}</Small>
                  <Small className="block text-muted-foreground">{org.members} members</Small>
                </div>
              </div>
              <Small className="text-muted-foreground">{org.role}</Small>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <Small className="mb-3 block font-semibold">Roles</Small>
        <div className="flex flex-wrap gap-2">
          {["Owner", "Admin", "Member", "Guest"].map((role) => (
            <div key={role} className="rounded-full border border-border px-3 py-1">
              <Small>{role}</Small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BillingPreview() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <Small className="mb-1 block font-semibold">Billing</Small>
        <H3 className="mb-4 text-base">Subscription plan</H3>
        <div className="mb-4 flex items-baseline justify-between rounded-md border border-border bg-background p-3">
          <div>
            <Small className="font-semibold">Pro</Small>
            <Small className="block text-muted-foreground">Change subscription</Small>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">$29</div>
            <Small className="text-muted-foreground">/month</Small>
          </div>
        </div>
        <div className="rounded-md border border-border p-3">
          <div className="mb-2 flex justify-between">
            <Small className="text-muted-foreground">Current cycle (Nov 1 - Nov 30)</Small>
            <Small>15 days remaining</Small>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-2 text-left font-medium">Item</th>
                <th className="pb-2 text-right font-medium">Qty</th>
                <th className="pb-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1.5 text-muted-foreground">Pro Plan</td>
                <td className="py-1.5 text-right">1</td>
                <td className="py-1.5 text-right">$29.00</td>
              </tr>
              <tr className="border-t border-border font-medium">
                <td className="pt-2">Projected costs</td>
                <td></td>
                <td className="pt-2 text-right">$29.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DesignSystemPreview() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <Small className="mb-3 block font-semibold">Design System</Small>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Moon className="size-5 text-primary" />
            <div>
              <Small className="font-medium">Light and Dark Themes</Small>
              <Small className="block text-muted-foreground">Toggle with a switch button</Small>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Smartphone className="size-5 text-primary" />
            <div>
              <Small className="font-medium">Responsive Design</Small>
              <Small className="block text-muted-foreground">Works on all screen sizes</Small>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Layers className="size-5 text-primary" />
            <div>
              <Small className="font-medium">Shadcn UI Components</Small>
              <Small className="block text-muted-foreground">50+ accessible components</Small>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Code2 className="size-5 text-primary" />
            <div>
              <Small className="font-medium">Tailwind CSS</Small>
              <Small className="block text-muted-foreground">Utility-first styling</Small>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {["primary", "secondary", "accent", "muted"].map((color) => (
          <div key={color} className={`rounded-md bg-${color} p-4`}>
            <div className={`h-8 rounded bg-${color}`} style={{ backgroundColor: `var(--${color})` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-16 border-t border-border bg-background px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center lg:mb-24"
        >
          <H2 className="mb-4">Built for serious SaaS products</H2>
          <Body className="mx-auto max-w-2xl text-muted-foreground">
            Includes many foundational and advanced components that cover a wide range of
            use-cases without sacrificing flexibility and design.
          </Body>
        </motion.div>

        {/* Feature Sections */}
        <div className="space-y-20 lg:space-y-32">
          {/* Authentication */}
          <FeatureSection
            title="Authentication"
            description="Full implementation including email/password, social sign-in, MFA, account linking and session management."
            features={[
              { icon: Mail, title: "Email/Password", description: "Sign in using your email and password including verify email, change email, change password and forgot password flows." },
              { icon: Key, title: "Social Sign-In", description: "Use Google or Microsoft login or configure additional providers like Facebook or GitHub." },
              { icon: Shield, title: "Multi-Factor", description: "Add an extra layer of security with MFA/2FA using TOTP and your preferred authenticator app." },
            ]}
          >
            <AuthPreview />
          </FeatureSection>

          {/* Multi-Tenancy */}
          <FeatureSection
            title="Multi-Tenancy"
            description="Built-in support for organizations including member management, invitations and roles."
            reversed
            features={[
              { icon: UserPlus, title: "Invitations", description: "Invite new members, assign roles and gate access to certain features based on the users' role." },
              { icon: Users, title: "Roles", description: "Use the predefined membership roles or add your own and customize them as you wish." },
              { icon: ArrowLeftRight, title: "Transfer Ownership", description: "Give ownership of an organization to other another member." },
            ]}
          >
            <OrganizationPreview />
          </FeatureSection>

          {/* Billing & Payments */}
          <FeatureSection
            title="Billing & Payments"
            description="Securely accept payments on your site and start selling to customers in no time."
            features={[
              { icon: Receipt, title: "Billing Portal", description: "Give your users a billing portal where they can view their transactions and invoices, and manage their plans with ease." },
              { icon: Gauge, title: "Restricted Access", description: "Gate access to certain features or content on your site until a user has upgraded to a higher tier." },
              { icon: DollarSign, title: "Billing Granularity", description: "Choose if you want to charge per organization or per seat. Instead of subscriptions you can also charge based on usage." },
            ]}
          >
            <BillingPreview />
          </FeatureSection>

          {/* Design System */}
          <FeatureSection
            title="Design System"
            description="Includes many foundational and advanced components that cover a wide range of use-cases without sacrificing flexibility and design."
            reversed
            features={[
              { icon: Moon, title: "Responsive Design", description: "We understand how challenging responsive design and UI/UX can be, so we made it easy. Open the app with your mobile phone to see for yourself or inspect using the dev console." },
              { icon: Palette, title: "Light and Dark Themes", description: "Supports a beautiful dark theme that users can toggle with a switch button." },
              { icon: Layers, title: "Shadcn UI and Tailwind CSS", description: "Based on the Shadcn UI, Tailwind CSS and Lucide icons libraries. Almost all LLMs and AI coding tools are trained on these." },
            ]}
          >
            <DesignSystemPreview />
          </FeatureSection>
        </div>
      </div>
    </section>
  );
}
