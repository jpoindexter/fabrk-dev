import { NavSection } from '@/components/docs/docs-sidebar';
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
  CircleDollarSign,
  FileText,
  UserCog,
  Languages,
  Coins,
  Check,
} from 'lucide-react';

export const docsNavigation: NavSection[] = [
  {
    title: '[01] START',
    items: [
      {
        title: '[01.1] GETTING STARTED',
        href: '/docs/getting-started',
        icon: BookOpen,
      },
      {
        title: '[01.2] QUICK START',
        href: '/docs/tutorials/quick-start',
        icon: Rocket,
      },
      {
        title: '[01.3] ARCHITECTURE',
        href: '/docs/architecture',
        icon: Blocks,
      },
    ],
  },
  {
    title: '[02] SETUP',
    items: [
      {
        title: '[02.1] ENV VARIABLES',
        href: '/docs/deployment/environment',
        icon: Settings,
      },
      {
        title: '[02.2] DATABASE',
        href: '/docs/features/database',
        icon: Database,
      },
    ],
  },
  {
    title: '[03] AUTHENTICATION',
    items: [
      {
        title: '[03.1] AUTH OVERVIEW',
        href: '/docs/tutorials/authentication',
        icon: Lock,
      },
      {
        title: '[03.2] GOOGLE OAUTH',
        href: '/docs/features/google-oauth',
        icon: Key,
      },
      {
        title: '[03.3] MAGIC LINKS',
        href: '/docs/features/magic-links',
        icon: Zap,
      },
      {
        title: '[03.4] MULTI FACTOR AUTH',
        href: '/docs/features/mfa',
        icon: ShieldCheck,
      },
    ],
  },
  {
    title: '[04] PAYMENTS',
    items: [
      {
        title: '[04.1] STRIPE SETUP',
        href: '/docs/features/payments',
        icon: CreditCard,
      },
      {
        title: '[04.2] STRIPE GUIDE',
        href: '/docs/tutorials/stripe-payments',
        icon: CreditCard,
      },
      {
        title: '[04.3] POLAR.SH',
        href: '/docs/features/polar',
        icon: CircleDollarSign,
      },
      {
        title: '[04.4] LEMON SQUEEZY',
        href: '/docs/features/lemonsqueezy',
        icon: CircleDollarSign,
      },
      {
        title: '[04.5] FREE TRIALS',
        href: '/docs/features/trial',
        icon: Clock,
      },
    ],
  },
  {
    title: '[05] EMAILS',
    items: [
      {
        title: '[05.1] RESEND SETUP',
        href: '/docs/features/emails',
        icon: Mail,
      },
      {
        title: '[05.2] EMAIL TEMPLATES',
        href: '/docs/tutorials/email-templates',
        icon: Mail,
      },
      {
        title: '[05.3] NOTIFICATIONS',
        href: '/docs/features/notifications',
        icon: Bell,
      },
    ],
  },
  {
    title: '[06] CORE FEATURES',
    items: [
      {
        title: '[06.1] API ROUTES',
        href: '/docs/tutorials/api-routes',
        icon: FileCode,
      },
      {
        title: '[06.2] PROTECTED PAGES',
        href: '/docs/tutorials/protected-pages',
        icon: Shield,
      },
      {
        title: '[06.3] AI CREDITS',
        href: '/docs/features/ai-credits',
        icon: Coins,
      },
      {
        title: '[06.4] CLOUD STORAGE',
        href: '/docs/features/cloud-storage',
        icon: Cloud,
      },
      {
        title: '[06.5] FILE UPLOADS',
        href: '/docs/tutorials/file-uploads',
        icon: Upload,
      },
      {
        title: '[06.6] WEBHOOKS',
        href: '/docs/features/webhooks',
        icon: Webhook,
      },
    ],
  },
  {
    title: '[07] COMPONENTS',
    items: [
      {
        title: 'UI LIBRARY 100+',
        href: '/docs/components/overview',
        icon: Blocks,
      },
    ],
    subSections: [
      {
        title: '[07.1] FORM INPUTS',
        items: [
          {
            title: 'ACCORDION',
            href: '/docs/components/accordion',
            icon: FormInput,
          },
          {
            title: 'CALENDAR',
            href: '/docs/components/calendar',
            icon: FormInput,
          },
          {
            title: 'CHECKBOX',
            href: '/docs/components/checkbox',
            icon: FormInput,
          },
          {
            title: 'DATE PICKER',
            href: '/docs/components/date-picker',
            icon: FormInput,
          },
          { title: 'FORM', href: '/docs/components/form', icon: FormInput },
          {
            title: 'FORM ERROR',
            href: '/docs/components/form-error',
            icon: FormInput,
          },
          { title: 'INPUT', href: '/docs/components/input', icon: FormInput },
          {
            title: 'INPUT GROUP',
            href: '/docs/components/input-group',
            icon: FormInput,
          },
          {
            title: 'INPUT NUMBER',
            href: '/docs/components/input-number',
            icon: FormInput,
          },
          {
            title: 'INPUT OTP',
            href: '/docs/components/input-otp',
            icon: FormInput,
          },
          {
            title: 'INPUT PASSWORD',
            href: '/docs/components/input-password',
            icon: FormInput,
          },
          {
            title: 'INPUT SEARCH',
            href: '/docs/components/input-search',
            icon: FormInput,
          },
          { title: 'LABEL', href: '/docs/components/label', icon: FormInput },
          {
            title: 'RADIO GROUP',
            href: '/docs/components/radio-group',
            icon: FormInput,
          },
          { title: 'SELECT', href: '/docs/components/select', icon: FormInput },
          { title: 'SLIDER', href: '/docs/components/slider', icon: FormInput },
          { title: 'SWITCH', href: '/docs/components/switch', icon: FormInput },
          {
            title: 'TEXTAREA',
            href: '/docs/components/textarea',
            icon: FormInput,
          },
        ],
      },
      {
        title: '[07.2] BUTTONS ACTIONS',
        items: [
          {
            title: 'BUTTON',
            href: '/docs/components/button',
            icon: MousePointer,
          },
        ],
      },
      {
        title: '[07.3] DATA DISPLAY',
        items: [
          { title: 'AVATAR', href: '/docs/components/avatar', icon: Table },
          { title: 'BADGE', href: '/docs/components/badge', icon: Table },
          { title: 'CARD', href: '/docs/components/card', icon: Table },
          {
            title: 'CODE BLOCK',
            href: '/docs/components/code-block',
            icon: Table,
          },
          {
            title: 'DATA TABLE HEADER',
            href: '/docs/components/data-table-header',
            icon: Table,
          },
          {
            title: 'EMPTY STATE',
            href: '/docs/components/empty-state',
            icon: Table,
          },
          { title: 'KPI CARD', href: '/docs/components/kpi-card', icon: Table },
          {
            title: 'MEMBER CARD',
            href: '/docs/components/member-card',
            icon: Table,
          },
          { title: 'SKELETON', href: '/docs/components/skeleton', icon: Table },
          {
            title: 'STAT CARD',
            href: '/docs/components/stat-card',
            icon: Table,
          },
          { title: 'TABLE', href: '/docs/components/table', icon: Table },
        ],
      },
      {
        title: '[07.4] CHARTS',
        items: [
          {
            title: 'AREA CHART',
            href: '/docs/components/area-chart',
            icon: LineChart,
          },
          {
            title: 'BAR CHART',
            href: '/docs/components/bar-chart',
            icon: LineChart,
          },
          {
            title: 'DONUT CHART',
            href: '/docs/components/donut-chart',
            icon: LineChart,
          },
          {
            title: 'FUNNEL CHART',
            href: '/docs/components/funnel-chart',
            icon: LineChart,
          },
          { title: 'GAUGE', href: '/docs/components/gauge', icon: LineChart },
          {
            title: 'HEATMAP',
            href: '/docs/components/heatmap',
            icon: LineChart,
          },
          {
            title: 'LINE CHART',
            href: '/docs/components/line-chart',
            icon: LineChart,
          },
          {
            title: 'PIE CHART',
            href: '/docs/components/pie-chart',
            icon: LineChart,
          },
          {
            title: 'PROGRESS',
            href: '/docs/components/progress',
            icon: LineChart,
          },
          {
            title: 'SPARKLINE',
            href: '/docs/components/sparkline',
            icon: LineChart,
          },
        ],
      },
      {
        title: '[07.5] OVERLAYS',
        items: [
          {
            title: 'ALERT DIALOG',
            href: '/docs/components/alert-dialog',
            icon: MessageSquare,
          },
          {
            title: 'DIALOG',
            href: '/docs/components/dialog',
            icon: MessageSquare,
          },
          {
            title: 'POPOVER',
            href: '/docs/components/popover',
            icon: MessageSquare,
          },
          {
            title: 'SHEET',
            href: '/docs/components/sheet',
            icon: MessageSquare,
          },
          {
            title: 'TOOLTIP',
            href: '/docs/components/tooltip',
            icon: MessageSquare,
          },
        ],
      },
      {
        title: '[07.6] NAVIGATION',
        items: [
          {
            title: 'BREADCRUMB',
            href: '/docs/components/breadcrumb',
            icon: Layout,
          },
          { title: 'COMMAND', href: '/docs/components/command', icon: Layout },
          {
            title: 'DROPDOWN MENU',
            href: '/docs/components/dropdown-menu',
            icon: Layout,
          },
          {
            title: 'NAVIGATION',
            href: '/docs/components/navigation',
            icon: Layout,
          },
          {
            title: 'PAGINATION',
            href: '/docs/components/pagination',
            icon: Layout,
          },
          { title: 'SIDEBAR', href: '/docs/components/sidebar', icon: Layout },
          { title: 'TABS', href: '/docs/components/tabs', icon: Layout },
        ],
      },
      {
        title: '[07.7] LAYOUT',
        items: [
          {
            title: 'CONTAINER',
            href: '/docs/components/container',
            icon: Blocks,
          },
          {
            title: 'SCROLL AREA',
            href: '/docs/components/scroll-area',
            icon: Blocks,
          },
          {
            title: 'SEPARATOR',
            href: '/docs/components/separator',
            icon: Blocks,
          },
        ],
      },
      {
        title: '[07.8] FEEDBACK',
        items: [
          { title: 'ALERT', href: '/docs/components/alert', icon: Bell },
          { title: 'LOADING', href: '/docs/components/loading', icon: Bell },
          {
            title: 'NOTIFICATION BADGE',
            href: '/docs/components/notification-badge',
            icon: Bell,
          },
          {
            title: 'NOTIFICATION CENTER',
            href: '/docs/components/notification-center',
            icon: Bell,
          },
          {
            title: 'NOTIFICATION LIST',
            href: '/docs/components/notification-list',
            icon: Bell,
          },
          { title: 'TOAST', href: '/docs/components/toast', icon: Bell },
          { title: 'TOASTER', href: '/docs/components/toaster', icon: Bell },
        ],
      },
      {
        title: '[07.9] MEDIA',
        items: [],
      },
      {
        title: '[07.10] SPECIALIZED',
        items: [
          {
            title: 'API KEY MANAGER',
            href: '/docs/components/api-key-manager',
            icon: Key,
          },
          {
            title: 'AUDIT LOG',
            href: '/docs/components/audit-log',
            icon: ScrollText,
          },
          {
            title: 'BALANCE DISPLAY',
            href: '/docs/components/balance-display',
            icon: Coins,
          },
          {
            title: 'BILLING SUMMARY CARD',
            href: '/docs/components/billing-summary-card',
            icon: CreditCard,
          },
          {
            title: 'CREDIT TRANSACTION TABLE',
            href: '/docs/components/credit-transaction-table',
            icon: Coins,
          },
          {
            title: 'CREDIT USAGE CHART',
            href: '/docs/components/credit-usage-chart',
            icon: Coins,
          },
          {
            title: 'ONBOARDING CHECKLIST',
            href: '/docs/components/onboarding-checklist',
            icon: Check,
          },
          {
            title: 'PLAN SELECTOR',
            href: '/docs/components/plan-selector',
            icon: CreditCard,
          },
          {
            title: 'SIGN IN FORM',
            href: '/docs/components/sign-in-form',
            icon: Lock,
          },
          {
            title: 'SIGN UP FORM',
            href: '/docs/components/sign-up-form',
            icon: Users,
          },
          {
            title: 'SIMPLE ICON',
            href: '/docs/components/simple-icon',
            icon: Blocks,
          },
          {
            title: 'USAGE METER',
            href: '/docs/components/usage-meter',
            icon: BarChart3,
          },
          {
            title: 'WEBHOOK LOG',
            href: '/docs/components/webhook-log',
            icon: Webhook,
          },
        ],
      },
      {
        title: '[07.L] LANDING',
        items: [
          { title: 'HERO', href: '/docs/components/hero', icon: Rocket },
          {
            title: 'FEATURES',
            href: '/docs/components/features',
            icon: Blocks,
          },
          {
            title: 'PRICING',
            href: '/docs/components/pricing',
            icon: CreditCard,
          },
          {
            title: 'TESTIMONIALS',
            href: '/docs/components/testimonials',
            icon: Users,
          },
          { title: 'FAQ', href: '/docs/components/faq', icon: MessageSquare },
          { title: 'FOOTER', href: '/docs/components/footer', icon: Layout },
        ],
      },
    ],
  },
  {
    title: '[08] SECURITY',
    items: [
      {
        title: '[08.1] COOKIE CONSENT',
        href: '/docs/features/cookie-consent',
        icon: Cookie,
      },
      {
        title: '[08.2] RATE LIMITING',
        href: '/docs/security/rate-limiting',
        icon: AlertTriangle,
      },
      {
        title: '[08.3] CSRF PROTECTION',
        href: '/docs/security/csrf',
        icon: Shield,
      },
      {
        title: '[08.4] SECURITY HEADERS',
        href: '/docs/security/headers',
        icon: ShieldCheck,
      },
      {
        title: '[08.5] VALIDATION',
        href: '/docs/security/validation',
        icon: ScrollText,
      },
      {
        title: '[08.6] BOT PROTECTION',
        href: '/docs/security/bot-protection',
        icon: Bot,
      },
      {
        title: '[08.7] AUDIT LOGGING',
        href: '/docs/security/audit-logging',
        icon: ScrollText,
      },
    ],
  },
  {
    title: '[09] ADVANCED',
    items: [
      {
        title: '[09.1] ORGANIZATIONS',
        href: '/docs/features/organizations',
        icon: Users,
      },
      { title: '[09.2] REALTIME', href: '/docs/features/realtime', icon: Bell },
      {
        title: '[09.3] BACKGROUND JOBS',
        href: '/docs/features/background-jobs',
        icon: Clock,
      },
      {
        title: '[09.4] ANALYTICS',
        href: '/docs/features/analytics',
        icon: BarChart3,
      },
      { title: '[09.5] SEO', href: '/docs/features/seo', icon: Globe },
      { title: '[09.6] API KEYS', href: '/docs/features/api-keys', icon: Key },
      {
        title: '[09.7] FEATURE FLAGS',
        href: '/docs/features/feature-flags',
        icon: Flag,
      },
      {
        title: '[09.8] BLOG SYSTEM',
        href: '/docs/features/blog',
        icon: FileText,
      },
      { title: '[09.9] I18N', href: '/docs/features/i18n', icon: Languages },
      {
        title: '[09.10] USER IMPERSONATION',
        href: '/docs/features/impersonation',
        icon: UserCog,
      },
      { title: '[09.11] THEMING', href: '/docs/extras/theming', icon: Palette },
    ],
  },
  {
    title: '[10] DEPLOY',
    items: [
      { title: '[10.1] TESTING', href: '/docs/extras/testing', icon: TestTube },
      { title: '[10.2] VERCEL', href: '/docs/deployment/vercel', icon: Cloud },
      {
        title: '[10.3] LAUNCH CHECKLIST',
        href: '/docs/launch/checklist',
        icon: Rocket,
      },
    ],
  },
];
