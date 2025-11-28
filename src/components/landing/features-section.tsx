/**
 * ✅ FABRK COMPONENT
 * Feature Deep-Dives - Terminal console [DEEP_DIVE] style
 * Production-ready ✓
 */
"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Key,
  Shield,
  UserPlus,
  Users,
  ArrowLeftRight,
  Receipt,
  Gauge,
  DollarSign,
  Moon,
  Palette,
  Layers,
  Building2,
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
        <Icon className="size-4 text-primary" />
      </div>
      <div>
        <span className="font-mono text-xs font-semibold text-foreground">├─ {title}</span>
        <span className="ml-2 font-mono text-xs text-muted-foreground">{description}</span>
      </div>
    </div>
  );
}

interface FeatureSectionProps {
  spec: string;
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

function FeatureSection({ spec, title, description, features, reversed, children }: FeatureSectionProps) {
  return (
    <div className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: reversed ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center"
      >
        {/* Spec Label */}
        <div className="mb-4 inline-block self-start border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ SPEC ] {spec}</span>
        </div>

        {/* Title */}
        <h3 className="mb-4 font-mono text-2xl font-bold">{title}</h3>

        {/* Description */}
        <div className="mb-6 border-l-2 border-border pl-4">
          <span className="font-mono text-xs text-muted-foreground">│ [DESC]: </span>
          <span className="font-mono text-xs text-muted-foreground">{description}</span>
        </div>

        {/* Feature List */}
        <div className="space-y-3">
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

// Terminal-style mock UI components
function AuthPreview() {
  return (
    <div className="w-full max-w-sm border border-border bg-card">
      {/* Window Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-destructive/50" />
          <div className="size-2.5 rounded-full bg-warning/50" />
          <div className="size-2.5 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">auth_module.exe</span>
      </div>

      <div className="p-6">
        <div className="mb-4 font-mono text-xs text-muted-foreground">[AUTH_FORM]:</div>

        <div className="space-y-4">
          <div>
            <span className="mb-1.5 block font-mono text-xs text-muted-foreground">EMAIL:</span>
            <div className="border border-border bg-background px-3 py-2">
              <span className="font-mono text-xs text-muted-foreground">user@example.com</span>
            </div>
          </div>
          <div>
            <span className="mb-1.5 block font-mono text-xs text-muted-foreground">PASSWORD:</span>
            <div className="border border-border bg-background px-3 py-2">
              <span className="font-mono text-xs text-muted-foreground">••••••••</span>
            </div>
          </div>
          <div className="bg-primary px-4 py-2 text-center">
            <span className="font-mono text-xs text-primary-foreground">&gt; AUTHENTICATE</span>
          </div>
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-2 font-mono text-xs text-muted-foreground">OR</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-border px-4 py-2 text-center">
              <span className="font-mono text-xs">GOOGLE</span>
            </div>
            <div className="border border-border px-4 py-2 text-center">
              <span className="font-mono text-xs">MICROSOFT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrganizationPreview() {
  return (
    <div className="w-full max-w-md border border-border bg-card">
      {/* Window Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-destructive/50" />
          <div className="size-2.5 rounded-full bg-warning/50" />
          <div className="size-2.5 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">org_manager.exe</span>
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">[ORGANIZATIONS]:</span>
          <button className="border border-primary px-2 py-1 font-mono text-xs text-primary">
            + ADD_ORG
          </button>
        </div>

        <div className="space-y-2">
          {[
            { name: "ACME_INC", role: "OWNER", members: 12 },
            { name: "STARTUP_CO", role: "ADMIN", members: 5 },
          ].map((org) => (
            <div key={org.name} className="flex items-center justify-between border border-border bg-background p-3">
              <div className="flex items-center gap-3">
                <Building2 className="size-4 text-muted-foreground" />
                <div>
                  <span className="block font-mono text-xs">{org.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{org.members} members</span>
                </div>
              </div>
              <span className="font-mono text-xs text-success">{org.role}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <span className="mb-2 block font-mono text-xs text-muted-foreground">[ROLES]:</span>
          <div className="flex flex-wrap gap-2">
            {["OWNER", "ADMIN", "MEMBER", "GUEST"].map((role) => (
              <span key={role} className="border border-border bg-card px-2 py-1 font-mono text-xs">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BillingPreview() {
  return (
    <div className="w-full max-w-md border border-border bg-card">
      {/* Window Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-destructive/50" />
          <div className="size-2.5 rounded-full bg-warning/50" />
          <div className="size-2.5 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">billing_portal.exe</span>
      </div>

      <div className="p-6">
        <div className="mb-4 font-mono text-xs text-muted-foreground">[BILLING]:</div>

        <div className="mb-4 flex items-center justify-between border border-border bg-background p-3">
          <div>
            <span className="block font-mono text-xs">PLAN: PRO</span>
            <span className="font-mono text-xs text-muted-foreground">&gt; change_plan</span>
          </div>
          <div className="text-right">
            <span className="block font-mono text-lg font-bold">$29</span>
            <span className="font-mono text-xs text-muted-foreground">/month</span>
          </div>
        </div>

        <div className="border border-border bg-background p-3">
          <div className="mb-2 flex justify-between font-mono text-xs">
            <span className="text-muted-foreground">CYCLE: Nov 1 - Nov 30</span>
            <span>15 days remaining</span>
          </div>
          <div className="border-t border-border pt-2">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-muted-foreground">Pro Plan</span>
              <span>$29.00</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-2 font-mono text-xs font-bold">
              <span>TOTAL</span>
              <span>$29.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesignSystemPreview() {
  return (
    <div className="w-full max-w-md border border-border bg-card">
      {/* Window Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-destructive/50" />
          <div className="size-2.5 rounded-full bg-warning/50" />
          <div className="size-2.5 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">design_system.exe</span>
      </div>

      <div className="p-6">
        <div className="mb-4 font-mono text-xs text-muted-foreground">[DESIGN_SYSTEM]:</div>

        <div className="space-y-3">
          {[
            { icon: Moon, label: "THEMES", value: "LIGHT + DARK" },
            { icon: Layers, label: "COMPONENTS", value: "50+ SHADCN" },
            { icon: Palette, label: "STYLING", value: "TAILWIND CSS" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between border border-border bg-background p-3">
              <div className="flex items-center gap-3">
                <item.icon className="size-4 text-primary" />
                <span className="font-mono text-xs">{item.label}</span>
              </div>
              <span className="font-mono text-xs text-success">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <div className="h-8 bg-primary" />
          <div className="h-8 bg-secondary" />
          <div className="h-8 bg-accent" />
          <div className="h-8 bg-muted" />
        </div>
        <div className="mt-2 flex justify-between font-mono text-xs text-muted-foreground">
          <span>PRIMARY</span>
          <span>SECONDARY</span>
          <span>ACCENT</span>
          <span>MUTED</span>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-16 border-t border-border px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
            <span className="font-mono text-xs text-muted-foreground">[ [0x30] DEEP_DIVE ] FEATURE_ANALYSIS │ FIB[377,610]</span>
          </div>
          <h2 className="mb-4 font-mono text-3xl font-bold tracking-tight lg:text-4xl">
            Built for serious SaaS products
          </h2>
          <p className="max-w-2xl font-mono text-sm text-muted-foreground">
            Includes many foundational and advanced components that cover a wide range of
            use-cases without sacrificing flexibility and design.
          </p>
        </motion.div>

        {/* Feature Sections */}
        <div className="space-y-20 lg:space-y-28">
          {/* Authentication */}
          <FeatureSection
            spec="AUTHENTICATION"
            title="Authentication"
            description="Full implementation including email/password, social sign-in, MFA, account linking and session management."
            features={[
              { icon: Mail, title: "Email/Password", description: "Verify email, change password, forgot password flows." },
              { icon: Key, title: "Social Sign-In", description: "Google, Microsoft, or configure additional providers." },
              { icon: Shield, title: "Multi-Factor", description: "MFA/2FA using TOTP with authenticator apps." },
            ]}
          >
            <AuthPreview />
          </FeatureSection>

          {/* Multi-Tenancy */}
          <FeatureSection
            spec="MULTI_TENANCY"
            title="Multi-Tenancy"
            description="Built-in support for organizations including member management, invitations and roles."
            reversed
            features={[
              { icon: UserPlus, title: "Invitations", description: "Invite members, assign roles and gate access." },
              { icon: Users, title: "Roles", description: "Predefined membership roles or add your own." },
              { icon: ArrowLeftRight, title: "Transfer Ownership", description: "Give ownership to another member." },
            ]}
          >
            <OrganizationPreview />
          </FeatureSection>

          {/* Billing & Payments */}
          <FeatureSection
            spec="BILLING_PAYMENTS"
            title="Billing & Payments"
            description="Securely accept payments on your site and start selling to customers in no time."
            features={[
              { icon: Receipt, title: "Billing Portal", description: "View transactions, invoices, manage plans." },
              { icon: Gauge, title: "Restricted Access", description: "Gate features until user upgrades." },
              { icon: DollarSign, title: "Billing Granularity", description: "Per org, per seat, or usage-based." },
            ]}
          >
            <BillingPreview />
          </FeatureSection>

          {/* Design System */}
          <FeatureSection
            spec="DESIGN_SYSTEM"
            title="Design System"
            description="Foundational and advanced components covering wide range of use-cases without sacrificing flexibility."
            reversed
            features={[
              { icon: Moon, title: "Responsive Design", description: "Works on all screen sizes out of the box." },
              { icon: Palette, title: "Light and Dark Themes", description: "Toggle with a switch button." },
              { icon: Layers, title: "Shadcn UI + Tailwind", description: "50+ accessible components included." },
            ]}
          >
            <DesignSystemPreview />
          </FeatureSection>
        </div>
      </div>
    </section>
  );
}
