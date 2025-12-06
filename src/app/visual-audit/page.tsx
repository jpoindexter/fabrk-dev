/**
 * Visual Audit Page
 * Lists all pages in the app for visual inspection
 */

import Link from "next/link";
import { ExternalLink } from "lucide-react";

const pages = {
  Marketing: [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/features", label: "Features" },
    { path: "/pricing", label: "Pricing" },
    { path: "/contact", label: "Contact" },
    { path: "/demo", label: "Demo" },
    { path: "/blog", label: "Blog" },
    { path: "/success", label: "Success" },
    { path: "/maintenance", label: "Maintenance" },
  ],
  Legal: [
    { path: "/cookies", label: "Cookies" },
    { path: "/privacy", label: "Privacy" },
    { path: "/terms", label: "Terms" },
    { path: "/refund", label: "Refund" },
  ],
  "Auth Templates": [
    { path: "/templates/authentication/sign-in", label: "Sign In" },
    { path: "/templates/authentication/sign-up", label: "Sign Up" },
    { path: "/templates/authentication/forgot-password", label: "Forgot Password" },
    { path: "/templates/authentication/two-factor", label: "Two Factor" },
  ],
  Dashboard: [
    { path: "/dashboard", label: "Dashboard Home" },
    { path: "/profile", label: "Profile" },
    { path: "/account", label: "Account" },
  ],
  "Dashboard - Admin": [
    { path: "/admin", label: "Admin Home" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/analytics", label: "Analytics" },
    { path: "/admin/audit-log", label: "Audit Log" },
    { path: "/admin/feature-flags-db", label: "Feature Flags" },
    { path: "/admin/monitoring", label: "Monitoring" },
    { path: "/admin/security", label: "Security" },
  ],
  "Dashboard - Billing": [
    { path: "/billing/invoices", label: "Invoices" },
    { path: "/billing/payment-methods", label: "Payment Methods" },
  ],
  "Dashboard - Developer": [{ path: "/developer/api-keys", label: "API Keys" }],
  "Dashboard - Organizations": [{ path: "/organizations/new", label: "New Organization" }],
  "Dashboard - Examples": [
    { path: "/examples/admin", label: "Admin Example" },
    { path: "/examples/analytics", label: "Analytics Example" },
    { path: "/examples/user-profile", label: "User Profile Example" },
  ],
  "Templates - Pages": [
    { path: "/templates", label: "Templates Index" },
    { path: "/templates/dashboards", label: "Dashboards" },
    { path: "/templates/analytics-dashboard", label: "Analytics Dashboard" },
    { path: "/templates/billing-dashboard", label: "Billing Dashboard" },
    { path: "/templates/team-dashboard", label: "Team Dashboard" },
    { path: "/templates/account-pages", label: "Account Pages" },
    { path: "/templates/admin-panels", label: "Admin Panels" },
    { path: "/templates/profile", label: "Profile" },
    { path: "/templates/settings-page", label: "Settings" },
    { path: "/templates/security-privacy", label: "Security & Privacy" },
  ],
  "Templates - Content": [
    { path: "/templates/blog", label: "Blog" },
    { path: "/templates/blog/post", label: "Blog Post" },
    { path: "/templates/documentation", label: "Documentation" },
    { path: "/templates/pricing-page", label: "Pricing Page" },
    { path: "/templates/landing-variations", label: "Landing Variations" },
    { path: "/templates/marketing", label: "Marketing" },
  ],
  "Templates - UI": [
    { path: "/templates/modals", label: "Modals" },
    { path: "/templates/notifications", label: "Notifications" },
    { path: "/templates/empty-states", label: "Empty States" },
    { path: "/templates/error-pages", label: "Error Pages" },
    { path: "/templates/onboarding", label: "Onboarding" },
    { path: "/templates/search-results", label: "Search Results" },
    { path: "/templates/user-management", label: "User Management" },
    { path: "/templates/chart-library", label: "Chart Library" },
    { path: "/templates/email-templates", label: "Email Templates" },
  ],
  "Docs - Getting Started": [
    { path: "/docs", label: "Docs Home" },
    { path: "/docs/getting-started", label: "Getting Started" },
    { path: "/docs/architecture", label: "Architecture" },
  ],
  "Docs - Components (A-C)": [
    { path: "/docs/components/overview", label: "Overview" },
    { path: "/docs/components/accordion", label: "Accordion" },
    { path: "/docs/components/activity-timeline", label: "Activity Timeline" },
    { path: "/docs/components/alert", label: "Alert" },
    { path: "/docs/components/alert-dialog", label: "Alert Dialog" },
    { path: "/docs/components/aspect-ratio", label: "Aspect Ratio" },
    { path: "/docs/components/autocomplete", label: "Autocomplete" },
    { path: "/docs/components/avatar", label: "Avatar" },
    { path: "/docs/components/avatar-group", label: "Avatar Group" },
    { path: "/docs/components/badge", label: "Badge" },
    { path: "/docs/components/banner", label: "Banner" },
    { path: "/docs/components/breadcrumb", label: "Breadcrumb" },
    { path: "/docs/components/button", label: "Button" },
    { path: "/docs/components/calendar", label: "Calendar" },
    { path: "/docs/components/card", label: "Card" },
    { path: "/docs/components/checkbox", label: "Checkbox" },
    { path: "/docs/components/code-block", label: "Code Block" },
    { path: "/docs/components/code-generator", label: "Code Generator" },
    { path: "/docs/components/collapsible", label: "Collapsible" },
    { path: "/docs/components/color-picker", label: "Color Picker" },
    { path: "/docs/components/combobox", label: "Combobox" },
    { path: "/docs/components/command", label: "Command" },
    { path: "/docs/components/container", label: "Container" },
    { path: "/docs/components/context-menu", label: "Context Menu" },
    { path: "/docs/components/copy-button", label: "Copy Button" },
    { path: "/docs/components/cropper", label: "Cropper" },
    { path: "/docs/components/cropper-controls", label: "Cropper Controls" },
  ],
  "Docs - Components (D-I)": [
    { path: "/docs/components/data-table-header", label: "Data Table Header" },
    { path: "/docs/components/date-picker", label: "Date Picker" },
    { path: "/docs/components/dialog", label: "Dialog" },
    { path: "/docs/components/donut-chart", label: "Donut Chart" },
    { path: "/docs/components/dropdown-menu", label: "Dropdown Menu" },
    { path: "/docs/components/empty-state", label: "Empty State" },
    { path: "/docs/components/faq", label: "FAQ" },
    { path: "/docs/components/features", label: "Features" },
    { path: "/docs/components/field", label: "Field" },
    { path: "/docs/components/file-upload", label: "File Upload" },
    { path: "/docs/components/footer", label: "Footer" },
    { path: "/docs/components/form", label: "Form" },
    { path: "/docs/components/form-error", label: "Form Error" },
    { path: "/docs/components/funnel-chart", label: "Funnel Chart" },
    { path: "/docs/components/gauge", label: "Gauge" },
    { path: "/docs/components/grid", label: "Grid" },
    { path: "/docs/components/heatmap", label: "Heatmap" },
    { path: "/docs/components/hero", label: "Hero" },
    { path: "/docs/components/hover-card", label: "Hover Card" },
    { path: "/docs/components/image-dropzone", label: "Image Dropzone" },
    { path: "/docs/components/image-uploader", label: "Image Uploader" },
    { path: "/docs/components/input", label: "Input" },
    { path: "/docs/components/input-group", label: "Input Group" },
    { path: "/docs/components/input-number", label: "Input Number" },
    { path: "/docs/components/input-otp", label: "Input OTP" },
    { path: "/docs/components/input-password", label: "Input Password" },
    { path: "/docs/components/input-search", label: "Input Search" },
    { path: "/docs/components/invite-form", label: "Invite Form" },
  ],
  "Docs - Components (K-P)": [
    { path: "/docs/components/kpi-card", label: "KPI Card" },
    { path: "/docs/components/label", label: "Label" },
    { path: "/docs/components/lightbox", label: "Lightbox" },
    { path: "/docs/components/loading", label: "Loading" },
    { path: "/docs/components/markdown-editor", label: "Markdown Editor" },
    { path: "/docs/components/markdown-viewer", label: "Markdown Viewer" },
    { path: "/docs/components/member-card", label: "Member Card" },
    { path: "/docs/components/menubar", label: "Menubar" },
    { path: "/docs/components/multi-select", label: "Multi Select" },
    { path: "/docs/components/multi-step-form", label: "Multi Step Form" },
    { path: "/docs/components/navigation", label: "Navigation" },
    { path: "/docs/components/navigation-menu", label: "Navigation Menu" },
    { path: "/docs/components/notification-badge", label: "Notification Badge" },
    { path: "/docs/components/notification-center", label: "Notification Center" },
    { path: "/docs/components/notification-list", label: "Notification List" },
    { path: "/docs/components/page-wrapper", label: "Page Wrapper" },
    { path: "/docs/components/pagination", label: "Pagination" },
    { path: "/docs/components/password-strength", label: "Password Strength" },
    { path: "/docs/components/pie-chart", label: "Pie Chart" },
    { path: "/docs/components/popover", label: "Popover" },
    { path: "/docs/components/pricing", label: "Pricing" },
    { path: "/docs/components/progress", label: "Progress" },
    { path: "/docs/components/prompt-builder", label: "Prompt Builder" },
  ],
  "Docs - Components (R-Z)": [
    { path: "/docs/components/radio-group", label: "Radio Group" },
    { path: "/docs/components/rating", label: "Rating" },
    { path: "/docs/components/rich-text-editor", label: "Rich Text Editor" },
    { path: "/docs/components/role-selector", label: "Role Selector" },
    { path: "/docs/components/scroll-area", label: "Scroll Area" },
    { path: "/docs/components/section", label: "Section" },
    { path: "/docs/components/select", label: "Select" },
    { path: "/docs/components/separator", label: "Separator" },
    { path: "/docs/components/sheet", label: "Sheet" },
    { path: "/docs/components/sidebar", label: "Sidebar" },
    { path: "/docs/components/simple-icon", label: "Simple Icon" },
    { path: "/docs/components/skeleton", label: "Skeleton" },
    { path: "/docs/components/slider", label: "Slider" },
    { path: "/docs/components/sparkline", label: "Sparkline" },
    { path: "/docs/components/stack", label: "Stack" },
    { path: "/docs/components/stat-card", label: "Stat Card" },
    { path: "/docs/components/status-indicator", label: "Status Indicator" },
    { path: "/docs/components/switch", label: "Switch" },
    { path: "/docs/components/table", label: "Table" },
    { path: "/docs/components/tabs", label: "Tabs" },
    { path: "/docs/components/testimonials", label: "Testimonials" },
    { path: "/docs/components/textarea", label: "Textarea" },
    { path: "/docs/components/time-picker", label: "Time Picker" },
    { path: "/docs/components/toast", label: "Toast" },
    { path: "/docs/components/toaster", label: "Toaster" },
    { path: "/docs/components/tooltip", label: "Tooltip" },
    { path: "/docs/components/typography", label: "Typography" },
  ],
  "Docs - Features": [
    { path: "/docs/features/analytics", label: "Analytics" },
    { path: "/docs/features/api-keys", label: "API Keys" },
    { path: "/docs/features/background-jobs", label: "Background Jobs" },
    { path: "/docs/features/blog", label: "Blog" },
    { path: "/docs/features/cloud-storage", label: "Cloud Storage" },
    { path: "/docs/features/cookie-consent", label: "Cookie Consent" },
    { path: "/docs/features/database", label: "Database" },
    { path: "/docs/features/emails", label: "Emails" },
    { path: "/docs/features/feature-flags", label: "Feature Flags" },
    { path: "/docs/features/google-oauth", label: "Google OAuth" },
    { path: "/docs/features/i18n", label: "i18n" },
    { path: "/docs/features/impersonation", label: "Impersonation" },
    { path: "/docs/features/lemonsqueezy", label: "LemonSqueezy" },
    { path: "/docs/features/magic-links", label: "Magic Links" },
    { path: "/docs/features/mfa", label: "MFA" },
    { path: "/docs/features/notifications", label: "Notifications" },
    { path: "/docs/features/organizations", label: "Organizations" },
    { path: "/docs/features/payments", label: "Payments" },
    { path: "/docs/features/polar", label: "Polar" },
    { path: "/docs/features/realtime", label: "Realtime" },
    { path: "/docs/features/seo", label: "SEO" },
    { path: "/docs/features/trial", label: "Trial" },
    { path: "/docs/features/webhooks", label: "Webhooks" },
  ],
  "Docs - Tutorials": [
    { path: "/docs/tutorials/quick-start", label: "Quick Start" },
    { path: "/docs/tutorials/authentication", label: "Authentication" },
    { path: "/docs/tutorials/api-routes", label: "API Routes" },
    { path: "/docs/tutorials/email-templates", label: "Email Templates" },
    { path: "/docs/tutorials/file-uploads", label: "File Uploads" },
    { path: "/docs/tutorials/protected-pages", label: "Protected Pages" },
    { path: "/docs/tutorials/stripe-payments", label: "Stripe Payments" },
    { path: "/docs/tutorials/webhooks", label: "Webhooks" },
  ],
  "Docs - Security": [
    { path: "/docs/security/csrf", label: "CSRF" },
    { path: "/docs/security/headers", label: "Headers" },
    { path: "/docs/security/bot-protection", label: "Bot Protection" },
    { path: "/docs/security/rate-limiting", label: "Rate Limiting" },
    { path: "/docs/security/audit-logging", label: "Audit Logging" },
    { path: "/docs/security/validation", label: "Validation" },
  ],
  "Docs - Deployment": [
    { path: "/docs/deployment/vercel", label: "Vercel" },
    { path: "/docs/deployment/database", label: "Database" },
    { path: "/docs/deployment/environment", label: "Environment" },
  ],
  "Docs - Extras": [
    { path: "/docs/extras/testing", label: "Testing" },
    { path: "/docs/extras/theming", label: "Theming" },
    { path: "/docs/launch/checklist", label: "Launch Checklist" },
  ],
  "Showcase & Test": [
    { path: "/component-showcase", label: "Component Showcase" },
    { path: "/components", label: "Components Index" },
    { path: "/visual-test", label: "Visual Test" },
  ],
};

export default function VisualAuditPage() {
  const totalPages = Object.values(pages).flat().length;

  return (
    <div className="bg-background min-h-screen p-8 font-mono">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="border-border bg-card mb-8 border p-6">
          <div className="border-border mb-4 border-b pb-4">
            <span className="text-muted-foreground text-xs">[ [0x00] VISUAL_AUDIT ]</span>
          </div>
          <h1 className="mb-2 text-3xl font-semibold">VISUAL_AUDIT_PAGE</h1>
          <p className="text-muted-foreground">
            All {totalPages} pages listed for visual inspection. Click to open in new tab.
          </p>
        </div>

        {/* Page Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(pages).map(([category, categoryPages]) => (
            <div key={category} className="border-border bg-card border">
              <div className="border-border border-b px-4 py-2">
                <span className="text-muted-foreground text-xs">
                  [ {category.toUpperCase().replace(/ /g, "_")} ]
                </span>
              </div>
              <div className="p-4">
                <ul className="space-y-1">
                  {categoryPages.map((page) => (
                    <li key={page.path}>
                      <Link
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group text-foreground hover:text-primary flex items-center justify-between py-1 text-sm"
                      >
                        <span className="truncate">&gt; {page.label}</span>
                        <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="border-border bg-card mt-8 border p-6">
          <div className="border-border mb-4 border-b pb-4">
            <span className="text-muted-foreground text-xs">[ QUICK_ACTIONS ]</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:border-primary hover:text-primary border px-4 py-2 text-sm"
            >
              &gt; OPEN_HOME
            </Link>
            <Link
              href="/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:border-primary hover:text-primary border px-4 py-2 text-sm"
            >
              &gt; OPEN_DOCS
            </Link>
            <Link
              href="/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:border-primary hover:text-primary border px-4 py-2 text-sm"
            >
              &gt; OPEN_DASHBOARD
            </Link>
            <Link
              href="/templates"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:border-primary hover:text-primary border px-4 py-2 text-sm"
            >
              &gt; OPEN_TEMPLATES
            </Link>
            <Link
              href="/component-showcase"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:border-primary hover:text-primary border px-4 py-2 text-sm"
            >
              &gt; OPEN_SHOWCASE
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-muted-foreground mt-8 text-center text-xs">
          <p>Total: {totalPages} pages | Generated for visual audit</p>
        </div>
      </div>
    </div>
  );
}
