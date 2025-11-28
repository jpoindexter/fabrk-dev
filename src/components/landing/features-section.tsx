/**
 * ✅ FABRK COMPONENT
 * Feature Deep-Dives - Terminal console [DEEP_DIVE] style
 * Production-ready ✓
 */
"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [emailText, setEmailText] = useState("");
  const [passwordDots, setPasswordDots] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const fullEmail = "user@example.com";

  useEffect(() => {
    if (!isInView) return;

    // Typing animation for email
    let emailIndex = 0;
    const emailTimer = setInterval(() => {
      if (emailIndex <= fullEmail.length) {
        setEmailText(fullEmail.slice(0, emailIndex));
        emailIndex++;
      } else {
        clearInterval(emailTimer);
        // Start password animation after email is done
        let dotIndex = 0;
        const dotTimer = setInterval(() => {
          if (dotIndex <= 8) {
            setPasswordDots(dotIndex);
            dotIndex++;
          } else {
            clearInterval(dotTimer);
          }
        }, 100);
      }
    }, 80);

    // Blinking cursor
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(emailTimer);
      clearInterval(cursorTimer);
    };
  }, [isInView]);

  return (
    <div ref={ref} className="w-full max-w-sm border border-border bg-card">
      {/* Window Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <motion.div
            className="size-2.5 rounded-full bg-destructive/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="size-2.5 rounded-full bg-warning/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="size-2.5 rounded-full bg-success/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">auth_module.exe</span>
      </div>

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="mb-4 font-mono text-xs text-muted-foreground"
        >
          [AUTH_FORM]:
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="mb-1.5 block font-mono text-xs text-muted-foreground">EMAIL:</span>
            <div className="border border-border bg-background px-3 py-2">
              <span className="font-mono text-xs text-muted-foreground">
                {emailText}
                {emailText.length < fullEmail.length && showCursor && (
                  <span className="text-primary">|</span>
                )}
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <span className="mb-1.5 block font-mono text-xs text-muted-foreground">PASSWORD:</span>
            <div className="border border-border bg-background px-3 py-2">
              <span className="font-mono text-xs text-muted-foreground">
                {"•".repeat(passwordDots)}
                {passwordDots < 8 && passwordDots > 0 && showCursor && (
                  <span className="text-primary">|</span>
                )}
              </span>
              {passwordDots === 0 && emailText.length >= fullEmail.length && showCursor && (
                <span className="font-mono text-xs text-primary">|</span>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.8 }}
            whileHover={{ scale: 1.02 }}
            className="bg-primary px-4 py-2 text-center cursor-pointer"
          >
            <span className="font-mono text-xs text-primary-foreground">&gt; AUTHENTICATE</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2 }}
            className="relative py-2"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-2 font-mono text-xs text-muted-foreground">OR</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.2 }}
            className="grid grid-cols-2 gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary))" }}
              className="border border-border px-4 py-2 text-center cursor-pointer transition-colors"
            >
              <span className="font-mono text-xs">GOOGLE</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary))" }}
              className="border border-border px-4 py-2 text-center cursor-pointer transition-colors"
            >
              <span className="font-mono text-xs">MICROSOFT</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function OrganizationPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showStartup, setShowStartup] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    // After 2 seconds, animate the button click
    const clickTimer = setTimeout(() => {
      setButtonClicked(true);
      // After button animation, show startup
      setTimeout(() => {
        setShowStartup(true);
      }, 300);
    }, 2000);

    return () => clearTimeout(clickTimer);
  }, [isInView]);

  return (
    <div ref={ref} className="w-full max-w-md border border-border bg-card">
      {/* Window Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <motion.div
            className="size-2.5 rounded-full bg-destructive/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="size-2.5 rounded-full bg-warning/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="size-2.5 rounded-full bg-success/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">org_manager.exe</span>
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="font-mono text-xs text-muted-foreground"
          >
            [ORGANIZATIONS]:
          </motion.span>
          <motion.button
            className="border border-primary px-2 py-1 font-mono text-xs text-primary"
            animate={buttonClicked ? {
              scale: [1, 0.95, 1],
              backgroundColor: ["transparent", "hsl(var(--primary))", "transparent"],
              color: ["hsl(var(--primary))", "hsl(var(--primary-foreground))", "hsl(var(--primary))"]
            } : {}}
            transition={{ duration: 0.3 }}
          >
            + ADD_ORG
          </motion.button>
        </div>

        <div className="space-y-2">
          {/* ACME_INC - always visible */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between border border-border bg-background p-3"
          >
            <div className="flex items-center gap-3">
              <Building2 className="size-4 text-muted-foreground" />
              <div>
                <span className="block font-mono text-xs">ACME_INC</span>
                <span className="font-mono text-xs text-muted-foreground">12 members</span>
              </div>
            </div>
            <span className="font-mono text-xs text-success">OWNER</span>
          </motion.div>

          {/* STARTUP_CO - appears after button click */}
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={showStartup ? { opacity: 1, height: "auto", y: 0 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-between border border-border bg-background p-3 overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <Building2 className="size-4 text-muted-foreground" />
              <div>
                <span className="block font-mono text-xs">STARTUP_CO</span>
                <span className="font-mono text-xs text-muted-foreground">5 members</span>
              </div>
            </div>
            <span className="font-mono text-xs text-success">ADMIN</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-4 border-t border-border pt-4"
        >
          <span className="mb-2 block font-mono text-xs text-muted-foreground">[ROLES]:</span>
          <div className="flex flex-wrap gap-2">
            {["OWNER", "ADMIN", "MEMBER", "GUEST"].map((role, idx) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="border border-border bg-card px-2 py-1 font-mono text-xs"
              >
                {role}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Animated counter for billing
function BillingCounter({ value, prefix = "", suffix = "", delay = 0 }: { value: number; prefix?: string; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let current = 0;
      const increment = value / 20;
      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, 50);
      return () => clearInterval(counter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

function BillingPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="w-full max-w-md border border-border bg-card">
      {/* Window Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <motion.div
            className="size-2.5 rounded-full bg-destructive/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="size-2.5 rounded-full bg-warning/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="size-2.5 rounded-full bg-success/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">billing_portal.exe</span>
      </div>

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="mb-4 font-mono text-xs text-muted-foreground"
        >
          [BILLING]:
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-4 flex items-center justify-between border border-border bg-background p-3"
        >
          <div>
            <span className="block font-mono text-xs">PLAN: PRO</span>
            <motion.span
              className="font-mono text-xs text-muted-foreground"
              whileHover={{ color: "hsl(var(--primary))", x: 2 }}
            >
              &gt; change_plan
            </motion.span>
          </div>
          <div className="text-right">
            <span className="block font-mono text-lg font-bold">
              <BillingCounter value={29} prefix="$" delay={0.5} />
            </span>
            <span className="font-mono text-xs text-muted-foreground">/month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="border border-border bg-background p-3"
        >
          <div className="mb-2 flex justify-between font-mono text-xs">
            <span className="text-muted-foreground">CYCLE: Nov 1 - Nov 30</span>
            <span><BillingCounter value={15} delay={0.8} /> days remaining</span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="border-t border-border pt-2"
          >
            <div className="flex justify-between font-mono text-xs">
              <span className="text-muted-foreground">Pro Plan</span>
              <span>$<BillingCounter value={29} suffix=".00" delay={1} /></span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-2 flex justify-between border-t border-border pt-2 font-mono text-xs font-bold"
            >
              <span>TOTAL</span>
              <motion.span
                initial={{ scale: 1 }}
                animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                transition={{ delay: 1.5, duration: 0.3 }}
              >
                $<BillingCounter value={29} suffix=".00" delay={1.2} />
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function DesignSystemPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [componentCount, setComponentCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let count = 0;
      const counter = setInterval(() => {
        count += 3;
        if (count >= 50) {
          setComponentCount(50);
          clearInterval(counter);
        } else {
          setComponentCount(count);
        }
      }, 40);
      return () => clearInterval(counter);
    }, 800);

    return () => clearTimeout(timer);
  }, [isInView]);

  const items = [
    { icon: Moon, label: "THEMES", value: "LIGHT + DARK" },
    { icon: Layers, label: "COMPONENTS", value: `${componentCount}+ SHADCN` },
    { icon: Palette, label: "STYLING", value: "TAILWIND CSS" },
  ];

  const colors = [
    { name: "PRIMARY", class: "bg-primary" },
    { name: "SECONDARY", class: "bg-secondary" },
    { name: "ACCENT", class: "bg-accent" },
    { name: "MUTED", class: "bg-muted" },
  ];

  return (
    <div ref={ref} className="w-full max-w-md border border-border bg-card">
      {/* Window Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <motion.div
            className="size-2.5 rounded-full bg-destructive/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="size-2.5 rounded-full bg-warning/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="size-2.5 rounded-full bg-success/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">design_system.exe</span>
      </div>

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="mb-4 font-mono text-xs text-muted-foreground"
        >
          [DESIGN_SYSTEM]:
        </motion.div>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.15 }}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between border border-border bg-background p-3 cursor-pointer transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ delay: 0.5 + idx * 0.15, duration: 0.5 }}
                >
                  <item.icon className="size-4 text-primary" />
                </motion.div>
                <span className="font-mono text-xs">{item.label}</span>
              </div>
              <span className="font-mono text-xs text-success">{item.value}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {colors.map((color, idx) => (
            <motion.div
              key={color.name}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.8 + idx * 0.1, duration: 0.3, ease: "easeOut" }}
              style={{ originY: 1 }}
              className={`h-8 ${color.class}`}
            />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {colors.map((color, idx) => (
            <motion.span
              key={color.name}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 + idx * 0.1 }}
              className="font-mono text-xs text-muted-foreground text-center"
            >
              {color.name}
            </motion.span>
          ))}
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
