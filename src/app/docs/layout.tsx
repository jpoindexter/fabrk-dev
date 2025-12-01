"use client";

import { DocsLayout } from "@/components/docs/docs-layout";
import { NavSection } from "@/components/docs/docs-sidebar";
import {
  BookOpen,
  Rocket,
  Shield,
  CreditCard,
  Database,
  Mail,
  Users,
  Blocks,
  Cloud,
  Settings,
  Lock,
  Key,
  Bell,
  Webhook,
  BarChart3,
  Globe,
  Palette,
  TestTube,
  FileCode,
  Layout,
  MousePointer,
  FormInput,
  Table,
  LineChart,
  MessageSquare,
  Image,
  Upload,
  Zap,
  Flag,
  Clock,
  Bot,
  ScrollText,
  ShieldCheck,
  AlertTriangle,
  Cookie,
} from "lucide-react";

const navigation: NavSection[] = [
  {
    title: "[01] START",
    items: [
      { title: "QUICK_START", href: "/docs/tutorials/quick-start", icon: Rocket },
      { title: "GETTING_STARTED", href: "/docs/getting-started", icon: BookOpen },
      { title: "ARCHITECTURE", href: "/docs/architecture", icon: Blocks },
    ],
  },
  {
    title: "[02] SETUP",
    items: [
      { title: "ENV_VARIABLES", href: "/docs/deployment/environment", icon: Settings },
      { title: "DATABASE_SETUP", href: "/docs/deployment/database", icon: Database },
      { title: "DATABASE_PRISMA", href: "/docs/features/database", icon: Database },
    ],
  },
  {
    title: "[03] AUTHENTICATION",
    items: [
      { title: "AUTH_OVERVIEW", href: "/docs/tutorials/authentication", icon: Lock },
      { title: "GOOGLE_OAUTH", href: "/docs/features/google-oauth", icon: Key },
      { title: "MAGIC_LINKS", href: "/docs/features/magic-links", icon: Zap },
      { title: "MULTI_FACTOR_AUTH", href: "/docs/features/mfa", icon: ShieldCheck },
    ],
  },
  {
    title: "[04] PAYMENTS",
    items: [
      { title: "STRIPE_SETUP", href: "/docs/features/payments", icon: CreditCard },
      { title: "FREE_TRIALS", href: "/docs/features/trial", icon: Clock },
      { title: "SUBSCRIPTION_GUIDE", href: "/docs/tutorials/stripe-payments", icon: CreditCard },
    ],
  },
  {
    title: "[05] EMAILS",
    items: [
      { title: "RESEND_SETUP", href: "/docs/features/emails", icon: Mail },
      { title: "EMAIL_TEMPLATES", href: "/docs/tutorials/email-templates", icon: Mail },
      { title: "NOTIFICATIONS", href: "/docs/features/notifications", icon: Bell },
    ],
  },
  {
    title: "[06] CORE_FEATURES",
    items: [
      { title: "API_ROUTES", href: "/docs/tutorials/api-routes", icon: FileCode },
      { title: "PROTECTED_PAGES", href: "/docs/tutorials/protected-pages", icon: Shield },
      { title: "CLOUD_STORAGE", href: "/docs/features/cloud-storage", icon: Cloud },
      { title: "FILE_UPLOADS", href: "/docs/tutorials/file-uploads", icon: Upload },
      { title: "WEBHOOKS_SETUP", href: "/docs/tutorials/webhooks", icon: Webhook },
    ],
  },
  {
    title: "[07] COMPONENTS",
    items: [
      { title: "UI_LIBRARY_100+", href: "/docs/components/overview", icon: Blocks },
    ],
  },
  {
    title: "[07.1] FORM_INPUTS",
    items: [
      { title: "ACCORDION", href: "/docs/components/accordion", icon: FormInput },
      { title: "AUTOCOMPLETE", href: "/docs/components/autocomplete", icon: FormInput },
      { title: "CALENDAR", href: "/docs/components/calendar", icon: FormInput },
      { title: "CHECKBOX", href: "/docs/components/checkbox", icon: FormInput },
      { title: "COLOR_PICKER", href: "/docs/components/color-picker", icon: FormInput },
      { title: "COMBOBOX", href: "/docs/components/combobox", icon: FormInput },
      { title: "DATE_PICKER", href: "/docs/components/date-picker", icon: FormInput },
      { title: "DATE_RANGE_PICKER", href: "/docs/components/date-range-picker", icon: FormInput },
      { title: "DATETIME_PICKER", href: "/docs/components/datetime-picker", icon: FormInput },
      { title: "FIELD", href: "/docs/components/field", icon: FormInput },
      { title: "FORM", href: "/docs/components/form", icon: FormInput },
      { title: "FORM_ERROR", href: "/docs/components/form-error", icon: FormInput },
      { title: "INPUT", href: "/docs/components/input", icon: FormInput },
      { title: "INPUT_COLOR", href: "/docs/components/input-color", icon: FormInput },
      { title: "INPUT_GROUP", href: "/docs/components/input-group", icon: FormInput },
      { title: "INPUT_NUMBER", href: "/docs/components/input-number", icon: FormInput },
      { title: "INPUT_OTP", href: "/docs/components/input-otp", icon: FormInput },
      { title: "INPUT_PASSWORD", href: "/docs/components/input-password", icon: FormInput },
      { title: "INPUT_SEARCH", href: "/docs/components/input-search", icon: FormInput },
      { title: "LABEL", href: "/docs/components/label", icon: FormInput },
      { title: "MULTI_SELECT", href: "/docs/components/multi-select", icon: FormInput },
      { title: "MULTI_STEP_FORM", href: "/docs/components/multi-step-form", icon: FormInput },
      { title: "PASSWORD_STRENGTH", href: "/docs/components/password-strength", icon: FormInput },
      { title: "RADIO_GROUP", href: "/docs/components/radio-group", icon: FormInput },
      { title: "RATING", href: "/docs/components/rating", icon: FormInput },
      { title: "RICH_TEXT_EDITOR", href: "/docs/components/rich-text-editor", icon: FormInput },
      { title: "SELECT", href: "/docs/components/select", icon: FormInput },
      { title: "SLIDER", href: "/docs/components/slider", icon: FormInput },
      { title: "SWITCH", href: "/docs/components/switch", icon: FormInput },
      { title: "TEXTAREA", href: "/docs/components/textarea", icon: FormInput },
      { title: "TIME_PICKER", href: "/docs/components/time-picker", icon: FormInput },
    ],
  },
  {
    title: "[07.2] BUTTONS_ACTIONS",
    items: [
      { title: "BUTTON", href: "/docs/components/button", icon: MousePointer },
      { title: "COPY_BUTTON", href: "/docs/components/copy-button", icon: MousePointer },
    ],
  },
  {
    title: "[07.3] DATA_DISPLAY",
    items: [
      { title: "ACTIVITY_TIMELINE", href: "/docs/components/activity-timeline", icon: Table },
      { title: "AVATAR", href: "/docs/components/avatar", icon: Table },
      { title: "AVATAR_GROUP", href: "/docs/components/avatar-group", icon: Table },
      { title: "BADGE", href: "/docs/components/badge", icon: Table },
      { title: "BANNER", href: "/docs/components/banner", icon: Table },
      { title: "CARD", href: "/docs/components/card", icon: Table },
      { title: "CODE_BLOCK", href: "/docs/components/code-block", icon: Table },
      { title: "DATA_TABLE_HEADER", href: "/docs/components/data-table-header", icon: Table },
      { title: "EMPTY_STATE", href: "/docs/components/empty-state", icon: Table },
      { title: "KPI_CARD", href: "/docs/components/kpi-card", icon: Table },
      { title: "MEMBER_CARD", href: "/docs/components/member-card", icon: Table },
      { title: "SKELETON", href: "/docs/components/skeleton", icon: Table },
      { title: "STAT_CARD", href: "/docs/components/stat-card", icon: Table },
      { title: "STATUS_INDICATOR", href: "/docs/components/status-indicator", icon: Table },
      { title: "TABLE", href: "/docs/components/table", icon: Table },
      { title: "TYPOGRAPHY", href: "/docs/components/typography", icon: Table },
    ],
  },
  {
    title: "[07.4] CHARTS",
    items: [
      { title: "DONUT_CHART", href: "/docs/components/donut-chart", icon: LineChart },
      { title: "FUNNEL_CHART", href: "/docs/components/funnel-chart", icon: LineChart },
      { title: "GAUGE", href: "/docs/components/gauge", icon: LineChart },
      { title: "HEATMAP", href: "/docs/components/heatmap", icon: LineChart },
      { title: "PIE_CHART", href: "/docs/components/pie-chart", icon: LineChart },
      { title: "PROGRESS", href: "/docs/components/progress", icon: LineChart },
      { title: "SPARKLINE", href: "/docs/components/sparkline", icon: LineChart },
    ],
  },
  {
    title: "[07.5] OVERLAYS",
    items: [
      { title: "ALERT_DIALOG", href: "/docs/components/alert-dialog", icon: MessageSquare },
      { title: "CONTEXT_MENU", href: "/docs/components/context-menu", icon: MessageSquare },
      { title: "DIALOG", href: "/docs/components/dialog", icon: MessageSquare },
      { title: "HOVER_CARD", href: "/docs/components/hover-card", icon: MessageSquare },
      { title: "POPOVER", href: "/docs/components/popover", icon: MessageSquare },
      { title: "SHEET", href: "/docs/components/sheet", icon: MessageSquare },
      { title: "TOOLTIP", href: "/docs/components/tooltip", icon: MessageSquare },
    ],
  },
  {
    title: "[07.6] NAVIGATION",
    items: [
      { title: "BREADCRUMB", href: "/docs/components/breadcrumb", icon: Layout },
      { title: "COMMAND", href: "/docs/components/command", icon: Layout },
      { title: "DROPDOWN_MENU", href: "/docs/components/dropdown-menu", icon: Layout },
      { title: "MENUBAR", href: "/docs/components/menubar", icon: Layout },
      { title: "NAVIGATION", href: "/docs/components/navigation", icon: Layout },
      { title: "NAVIGATION_MENU", href: "/docs/components/navigation-menu", icon: Layout },
      { title: "PAGINATION", href: "/docs/components/pagination", icon: Layout },
      { title: "SIDEBAR", href: "/docs/components/sidebar", icon: Layout },
      { title: "TABS", href: "/docs/components/tabs", icon: Layout },
    ],
  },
  {
    title: "[07.7] LAYOUT",
    items: [
      { title: "ASPECT_RATIO", href: "/docs/components/aspect-ratio", icon: Blocks },
      { title: "COLLAPSIBLE", href: "/docs/components/collapsible", icon: Blocks },
      { title: "CONTAINER", href: "/docs/components/container", icon: Blocks },
      { title: "GRID", href: "/docs/components/grid", icon: Blocks },
      { title: "PAGE_WRAPPER", href: "/docs/components/page-wrapper", icon: Blocks },
      { title: "SCROLL_AREA", href: "/docs/components/scroll-area", icon: Blocks },
      { title: "SECTION", href: "/docs/components/section", icon: Blocks },
      { title: "SEPARATOR", href: "/docs/components/separator", icon: Blocks },
      { title: "STACK", href: "/docs/components/stack", icon: Blocks },
    ],
  },
  {
    title: "[07.8] FEEDBACK",
    items: [
      { title: "ALERT", href: "/docs/components/alert", icon: Bell },
      { title: "LOADING", href: "/docs/components/loading", icon: Bell },
      { title: "NOTIFICATION_BADGE", href: "/docs/components/notification-badge", icon: Bell },
      { title: "NOTIFICATION_CENTER", href: "/docs/components/notification-center", icon: Bell },
      { title: "NOTIFICATION_LIST", href: "/docs/components/notification-list", icon: Bell },
      { title: "TOAST", href: "/docs/components/toast", icon: Bell },
      { title: "TOASTER", href: "/docs/components/toaster", icon: Bell },
    ],
  },
  {
    title: "[07.9] MEDIA",
    items: [
      { title: "CROPPER", href: "/docs/components/cropper", icon: Image },
      { title: "CROPPER_CONTROLS", href: "/docs/components/cropper-controls", icon: Image },
      { title: "FILE_UPLOAD", href: "/docs/components/file-upload", icon: Image },
      { title: "IMAGE_DROPZONE", href: "/docs/components/image-dropzone", icon: Image },
      { title: "IMAGE_UPLOADER", href: "/docs/components/image-uploader", icon: Image },
      { title: "LIGHTBOX", href: "/docs/components/lightbox", icon: Image },
      { title: "MERMAID", href: "/docs/components/mermaid", icon: Image },
    ],
  },
  {
    title: "[07.10] LANDING",
    items: [
      { title: "FAQ", href: "/docs/components/faq", icon: Blocks },
      { title: "FEATURES", href: "/docs/components/features", icon: Blocks },
      { title: "FOOTER", href: "/docs/components/footer", icon: Blocks },
      { title: "HERO_SECTIONS", href: "/docs/components/hero", icon: Blocks },
      { title: "PRICING", href: "/docs/components/pricing", icon: CreditCard },
      { title: "TESTIMONIALS", href: "/docs/components/testimonials", icon: MessageSquare },
    ],
  },
  {
    title: "[07.11] SPECIALIZED",
    items: [
      { title: "CODE_GENERATOR", href: "/docs/components/code-generator", icon: FileCode },
      { title: "INVITE_FORM", href: "/docs/components/invite-form", icon: Users },
      { title: "MARKDOWN_EDITOR", href: "/docs/components/markdown-editor", icon: FileCode },
      { title: "MARKDOWN_VIEWER", href: "/docs/components/markdown-viewer", icon: FileCode },
      { title: "PROMPT_BUILDER", href: "/docs/components/prompt-builder", icon: FileCode },
      { title: "ROLE_SELECTOR", href: "/docs/components/role-selector", icon: Users },
      { title: "SIMPLE_ICON", href: "/docs/components/simple-icon", icon: Blocks },
    ],
  },
  {
    title: "[08] SECURITY",
    items: [
      { title: "COOKIE_CONSENT", href: "/docs/features/cookie-consent", icon: Cookie },
      { title: "RATE_LIMITING", href: "/docs/security/rate-limiting", icon: AlertTriangle },
      { title: "CSRF_PROTECTION", href: "/docs/security/csrf", icon: Shield },
      { title: "SECURITY_HEADERS", href: "/docs/security/headers", icon: ShieldCheck },
      { title: "VALIDATION", href: "/docs/security/validation", icon: ScrollText },
      { title: "BOT_PROTECTION", href: "/docs/security/bot-protection", icon: Bot },
      { title: "AUDIT_LOGGING", href: "/docs/security/audit-logging", icon: ScrollText },
    ],
  },
  {
    title: "[09] ADVANCED",
    items: [
      { title: "ORGANIZATIONS", href: "/docs/features/organizations", icon: Users },
      { title: "REALTIME", href: "/docs/features/realtime", icon: Bell },
      { title: "BACKGROUND_JOBS", href: "/docs/features/background-jobs", icon: Clock },
      { title: "ANALYTICS", href: "/docs/features/analytics", icon: BarChart3 },
      { title: "SEO", href: "/docs/features/seo", icon: Globe },
      { title: "API_KEYS", href: "/docs/features/api-keys", icon: Key },
      { title: "FEATURE_FLAGS", href: "/docs/features/feature-flags", icon: Flag },
      { title: "WEBHOOKS", href: "/docs/features/webhooks", icon: Webhook },
      { title: "THEMING", href: "/docs/extras/theming", icon: Palette },
    ],
  },
  {
    title: "[10] DEPLOY",
    items: [
      { title: "TESTING", href: "/docs/extras/testing", icon: TestTube },
      { title: "VERCEL", href: "/docs/deployment/vercel", icon: Cloud },
      { title: "LAUNCH_CHECKLIST", href: "/docs/launch/checklist", icon: Rocket },
    ],
  },
];

export default function DocsLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsLayout navigation={navigation} showToc={true}>
      {children}
    </DocsLayout>
  );
}
