import {
  BarChart3,
  Users,
  LineChart,
  Settings,
  CreditCard,
  Shield,
  FileText,
  Mail,
  LayoutDashboard,
  Lock,
} from "lucide-react";

export interface TemplateNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export interface TemplateNavSection {
  title: string;
  id: string;
  href: string;
  icon: React.ElementType;
  items: TemplateNavItem[];
}

export const templatesNavigation: TemplateNavSection[] = [
  {
    title: "Dashboards",
    id: "dashboards",
    href: "/templates/dashboards",
    icon: LayoutDashboard,
    items: [
      { title: "Analytics Dashboard", href: "/templates/analytics-dashboard", icon: BarChart3 },
      { title: "Team Dashboard", href: "/templates/team-dashboard", icon: Users },
      { title: "Chart Library", href: "/templates/chart-library", icon: LineChart },
    ],
  },
  {
    title: "Authentication",
    id: "authentication",
    href: "/templates/authentication",
    icon: Lock,
    items: [
      { title: "Sign In", href: "/templates/authentication/sign-in", icon: Lock },
      { title: "Sign Up", href: "/templates/authentication/sign-up", icon: Users },
      { title: "Forgot Password", href: "/templates/authentication/forgot-password", icon: Shield },
      { title: "Two-Factor Auth", href: "/templates/authentication/two-factor", icon: Lock },
    ],
  },
  {
    title: "Admin Panels",
    id: "admin-panels",
    href: "/templates/admin-panels",
    icon: Settings,
    items: [
      { title: "User Management", href: "/templates/user-management", icon: Users },
    ],
  },
  {
    title: "Account Pages",
    id: "account-pages",
    href: "/templates/account-pages",
    icon: CreditCard,
    items: [
      { title: "Settings Page", href: "/templates/settings-page", icon: Settings },
      { title: "Billing Dashboard", href: "/templates/billing-dashboard", icon: CreditCard },
      { title: "Security & Privacy", href: "/templates/security-privacy", icon: Shield },
    ],
  },
  {
    title: "Marketing",
    id: "marketing",
    href: "/templates/marketing",
    icon: FileText,
    items: [
      { title: "Documentation", href: "/templates/documentation", icon: FileText },
      { title: "Email Templates", href: "/templates/email-templates", icon: Mail },
    ],
  },
];

// Helper to find template info by href
export function findTemplateByHref(href: string): {
  template?: TemplateNavItem;
  section?: TemplateNavSection;
} {
  for (const section of templatesNavigation) {
    // Check if it's a category page
    if (section.href === href) {
      return { section };
    }
    // Check template items
    const template = section.items.find((item) => item.href === href);
    if (template) {
      return { template, section };
    }
  }
  return {};
}

// Convert title to terminal-style format (UPPER_SNAKE_CASE)
export function toTerminalCase(str: string): string {
  return str.toUpperCase().replace(/\s+/g, "_").replace(/&/g, "");
}
