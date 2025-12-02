/**
 * ✅ FABRK COMPONENT
 * Feature Deep-Dives - Terminal console [DEEP_DIVE] style
 * Production-ready ✓
 *
 * Split into subcomponents:
 * - feature-item.tsx - Single feature display
 * - feature-section.tsx - Two-column layout
 * - terminal-header.tsx - Reusable window header
 * - preview-auth.tsx - Auth form animation
 * - preview-organization.tsx - Org manager animation
 * - preview-billing.tsx - Billing portal animation
 * - preview-design.tsx - Design system showcase
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
} from "lucide-react";

import { FeatureSectionLayout } from "./feature-section";
import { AuthPreview } from "./preview-auth";
import { OrganizationPreview } from "./preview-organization";
import { BillingPreview } from "./preview-billing";
import { DesignSystemPreview } from "./preview-design";

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
          <div className="mb-4 inline-block border border-border bg-card px-4 py-1">
            <span className="font-mono text-xs text-muted-foreground">[ [0x30] DEEP_DIVE ] FEATURE_ANALYSIS │ FIB[377,610]</span>
          </div>
          <h2 className="mb-4 font-mono text-3xl font-bold tracking-tight lg:text-4xl">
            BUILT_FOR_SERIOUS_SAAS_PRODUCTS
          </h2>
          <p className="max-w-2xl font-mono text-sm text-muted-foreground">
            Includes many foundational and advanced components that cover a wide range of
            use-cases without sacrificing flexibility and design.
          </p>
        </motion.div>

        {/* Feature Sections */}
        <div className="space-y-20 lg:space-y-28">
          {/* Authentication */}
          <FeatureSectionLayout
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
          </FeatureSectionLayout>

          {/* Multi-Tenancy */}
          <FeatureSectionLayout
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
          </FeatureSectionLayout>

          {/* Billing & Payments */}
          <FeatureSectionLayout
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
          </FeatureSectionLayout>

          {/* Design System */}
          <FeatureSectionLayout
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
          </FeatureSectionLayout>
        </div>
      </div>
    </section>
  );
}

// Re-export for backwards compatibility
export { FeatureSectionLayout as FeatureSection };
