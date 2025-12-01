import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  FileText,
  Mail,
  CreditCard,
  Shield,
  Palette,
  Lock,
} from "lucide-react";

export interface Template {
  id: string;
  name: string;
  description: string;
  category: "dashboard" | "admin" | "account" | "marketing" | "auth";
  icon: React.ElementType;
  badge?: string;
  href: string;
  features: string[];
}

export const templates: Template[] = [
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "Complete dashboard with charts, metrics, and data visualization",
    category: "dashboard",
    icon: BarChart3,
    badge: "Popular",
    href: "/templates/analytics-dashboard",
    features: ["Charts & graphs", "Metric cards", "Data tables", "Filters"],
  },
  {
    id: "user-management",
    name: "User Management",
    description: "Admin panel for managing users, roles, and permissions",
    category: "admin",
    icon: Users,
    href: "/templates/user-management",
    features: ["User table", "Role management", "Search & filter", "Actions menu"],
  },
  {
    id: "settings-page",
    name: "Settings Page",
    description: "Comprehensive settings with tabs, forms, and toggles",
    category: "account",
    icon: Settings,
    badge: "Essential",
    href: "/templates/settings-page",
    features: ["Tab navigation", "Form sections", "Save states", "Validation"],
  },
  {
    id: "billing-dashboard",
    name: "Billing Dashboard",
    description: "Payment history, invoices, and subscription management",
    category: "account",
    icon: CreditCard,
    href: "/templates/billing-dashboard",
    features: ["Invoice list", "Payment methods", "Plans", "Usage tracking"],
  },
  {
    id: "email-templates",
    name: "Email Templates",
    description: "Transactional email layouts for notifications and updates",
    category: "marketing",
    icon: Mail,
    href: "/templates/email-templates",
    features: ["Welcome email", "Reset password", "Receipts", "Notifications"],
  },
  {
    id: "documentation",
    name: "Documentation Layout",
    description: "Docs page with sidebar navigation and content",
    category: "marketing",
    icon: FileText,
    href: "/templates/documentation",
    features: ["Sidebar nav", "Search", "Code blocks", "Mobile responsive"],
  },
  {
    id: "team-dashboard",
    name: "Team Dashboard",
    description: "Team overview with members, activity, and collaboration",
    category: "dashboard",
    icon: Users,
    href: "/templates/team-dashboard",
    features: ["Team roster", "Activity feed", "Invites", "Permissions"],
  },
  {
    id: "security-privacy",
    name: "Security & Privacy",
    description: "Security settings with 2FA, sessions, and audit logs",
    category: "account",
    icon: Shield,
    href: "/templates/security-privacy",
    features: ["2FA setup", "Active sessions", "Audit log", "GDPR controls"],
  },
  {
    id: "chart-library",
    name: "Chart Library",
    description: "Data visualization with Recharts (line, area, bar, pie charts)",
    category: "dashboard",
    icon: BarChart3,
    badge: "New",
    href: "/templates/chart-library",
    features: ["Line charts", "Area charts", "Bar charts", "Pie/Donut charts"],
  },
  {
    id: "sign-in",
    name: "Sign In",
    description: "Login page with social auth, email/password, and magic links",
    category: "auth",
    icon: Lock,
    badge: "Essential",
    href: "/templates/authentication/sign-in",
    features: ["Email/Password", "Social Auth", "Remember Me", "Validation"],
  },
  {
    id: "sign-up",
    name: "Sign Up",
    description: "Registration page with form validation and social providers",
    category: "auth",
    icon: Users,
    href: "/templates/authentication/sign-up",
    features: ["Form Validation", "Password Strength", "Social Auth", "Terms check"],
  },
  {
    id: "forgot-password",
    name: "Forgot Password",
    description: "Password recovery flow with email verification",
    category: "auth",
    icon: Shield,
    href: "/templates/authentication/forgot-password",
    features: ["Email input", "Success state", "Resend timer", "Secure flow"],
  },
  {
    id: "two-factor",
    name: "Two-Factor Auth",
    description: "2FA verification screen with code input",
    category: "auth",
    icon: Lock,
    href: "/templates/authentication/two-factor",
    features: ["Code input", "Auto-focus", "Resend code", "Fallback options"],
  },
];

export const categories = [
  { id: "dashboard", name: "Dashboards", icon: LayoutDashboard },
  { id: "auth", name: "Authentication", icon: Lock },
  { id: "admin", name: "Admin Panels", icon: Settings },
  { id: "account", name: "Account Pages", icon: Users },
  { id: "marketing", name: "Marketing", icon: FileText },
  { id: "components", name: "Components", icon: Palette, href: "/components" },
];

export function getTemplatesByCategory(categoryId: string): Template[] {
  return templates.filter((t) => t.category === categoryId);
}

export function getCategoryInfo(categoryId: string) {
  return categories.find((c) => c.id === categoryId);
}
