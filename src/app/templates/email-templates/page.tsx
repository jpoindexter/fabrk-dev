/**
 * ✅ FABRK COMPONENT
 * Email Templates Showcase - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DemoNav } from "@/components/demo/demo-nav";
import { Footer } from "@/components/landing/footer";
import {
  Mail,
  Eye,
  Code,
  Copy,
  CheckCircle2,
  Send,
  Key,
  Shield,
  CreditCard,
  Bell,
  Download,
} from "lucide-react";
import { generateWelcomeEmailHTML } from "@/emails/welcome-html";
import { generateVerifyEmailHTML } from "@/emails/verify-email";
import { CodeBlock } from "@/components/ui/code-block";

// Inject custom scrollbar styling into email HTML
function injectScrollbarStyles(html: string, primaryColor: string): string {
  const scrollbarStyles = `
    <style>
      /* Custom scrollbar styling - matches main site */
      * {
        scrollbar-width: thin;
        scrollbar-color: hsl(var(--border, 0 0% 90%)) transparent;
      }
      *:hover {
        scrollbar-color: hsl(${primaryColor} / 0.5) transparent;
      }
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: hsl(var(--border, 0 0% 90%));
        border-radius: 4px;
        transition: background 0.2s;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: hsl(${primaryColor} / 0.5);
      }
    </style>
  `;
  return html.replace('</head>', `${scrollbarStyles}</head>`);
}

// Mock email data
const emailTemplates = [
  {
    id: "welcome",
    name: "Welcome Email",
    description: "Sent after successful purchase with license key",
    icon: Mail,
    category: "ONBOARDING",
    triggers: ["Purchase completed", "Account created"],
    variables: ["name", "licenseKey", "downloadUrl"],
    preview: generateWelcomeEmailHTML({
      name: "John Doe",
      licenseKey: "FABRK-2024-ABC123DEF456",
      downloadUrl: "https://fabrk.ai/download/abc123",
    }),
  },
  {
    id: "verify",
    name: "Email Verification",
    description: "Confirm email address for new accounts",
    icon: Shield,
    category: "AUTH",
    triggers: ["User registration"],
    variables: ["name", "verificationUrl"],
    preview: generateVerifyEmailHTML({
      name: "John Doe",
      verificationUrl: "https://fabrk.ai/verify?token=abc123",
    }),
  },
  {
    id: "reset",
    name: "Password Reset",
    description: "Secure password reset link",
    icon: Key,
    category: "AUTH",
    triggers: ["Forgot password request"],
    variables: ["name", "resetUrl", "ipAddress"],
    preview: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px; text-align: center; background-color: #000000;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Fabrk</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; color: #171717; font-size: 24px; font-weight: 600;">Reset Your Password</h2>
              <p style="margin: 0 0 24px 0; color: #525252; font-size: 16px; line-height: 1.5;">
                We received a request to reset your password. Click the button below to create a new password.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 32px 0;">
                    <a href="https://fabrk.ai/reset?token=abc123" style="display: inline-block; background-color: #DC2626; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 6px; font-size: 16px; font-weight: 600;">Reset Password</a>
                  </td>
                </tr>
              </table>
              <div style="background-color: #FEE2E2; border: 1px solid: #DC2626; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0; color: #991B1B; font-size: 14px;"><strong>This link expires in 1 hour.</strong></p>
              </div>
              <p style="margin: 0; color: #737373; font-size: 13px; line-height: 1.5;">
                If you didn't request a password reset, please ignore this email or contact support if you have concerns.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #fafafa; text-align: center;">
              <p style="margin: 0; color: #737373; font-size: 13px; line-height: 1.5;">© 2025 Fabrk. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: "purchase",
    name: "Purchase Confirmation",
    description: "Order receipt and next steps",
    icon: CreditCard,
    category: "BILLING",
    triggers: ["Payment succeeded"],
    variables: ["name", "amount", "orderId", "date"],
    preview: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Purchase Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px; text-align: center; background-color: #000000;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Fabrk</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background-color: #10B981; border-radius: 50%;">
                  <span style="color: #ffffff; font-size: 40px; line-height: 1;">✓</span>
                </div>
              </div>
              <h2 style="margin: 0 0 16px 0; color: #171717; font-size: 24px; font-weight: 600; text-align: center;">Payment Confirmed!</h2>
              <p style="margin: 0 0 32px 0; color: #525252; font-size: 16px; line-height: 1.5; text-align: center;">
                Thank you for your purchase. Your order has been confirmed.
              </p>
              <div style="background-color: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #737373; font-size: 14px;">Order ID:</td>
                    <td style="color: #171717; font-size: 14px; font-weight: 600; text-align: right;">#ORD-2024-001</td>
                  </tr>
                  <tr>
                    <td style="color: #737373; font-size: 14px;">Date:</td>
                    <td style="color: #171717; font-size: 14px; font-weight: 600; text-align: right;">November 12, 2024</td>
                  </tr>
                  <tr>
                    <td style="color: #737373; font-size: 14px;">Amount:</td>
                    <td style="color: #171717; font-size: 18px; font-weight: 600; text-align: right;">$79.00</td>
                  </tr>
                </table>
              </div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://fabrk.ai/download" style="display: inline-block; background-color: #171717; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 600;">Download Fabrk</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #fafafa; text-align: center;">
              <p style="margin: 0; color: #737373; font-size: 13px; line-height: 1.5;">© 2025 Fabrk. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: "subscription",
    name: "Subscription Update",
    description: "Plan changes, renewals, and cancellations",
    icon: Bell,
    category: "BILLING",
    triggers: ["Subscription updated", "Payment renewed"],
    variables: ["name", "plan", "status", "nextBillingDate"],
    preview: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Updated</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px; text-align: center; background-color: #000000;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Fabrk</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; color: #171717; font-size: 24px; font-weight: 600;">Subscription Updated</h2>
              <p style="margin: 0 0 24px 0; color: #525252; font-size: 16px; line-height: 1.5;">
                Your subscription plan has been successfully updated.
              </p>
              <div style="background-color: #F0F9FF; border: 2px solid #0EA5E9; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #0C4A6E; font-size: 14px; font-weight: 600;">New Plan:</td>
                    <td style="color: #0C4A6E; font-size: 18px; font-weight: 700; text-align: right;">Professional</td>
                  </tr>
                  <tr>
                    <td style="color: #0C4A6E; font-size: 14px; font-weight: 600;">Status:</td>
                    <td style="color: #10B981; font-size: 14px; font-weight: 600; text-align: right;">Active</td>
                  </tr>
                  <tr>
                    <td style="color: #0C4A6E; font-size: 14px; font-weight: 600;">Next Billing:</td>
                    <td style="color: #0C4A6E; font-size: 14px; font-weight: 600; text-align: right;">December 12, 2024</td>
                  </tr>
                </table>
              </div>
              <h3 style="margin: 0 0 16px 0; color: #171717; font-size: 18px; font-weight: 600;">What's New</h3>
              <ul style="margin: 0 0 24px 0; padding-left: 20px; color: #525252; font-size: 15px; line-height: 1.8;">
                <li>Unlimited projects</li>
                <li>10 team members</li>
                <li>Priority support</li>
                <li>Advanced analytics</li>
              </ul>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://fabrk.ai/billing" style="display: inline-block; background-color: #171717; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 600;">Manage Subscription</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #fafafa; text-align: center;">
              <p style="margin: 0; color: #737373; font-size: 13px; line-height: 1.5;">© 2025 Fabrk. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
];

export default function EmailTemplatesShowcase() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0]);
  const [copied, setCopied] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('271.5 81.3% 55.9%');

  useEffect(() => {
    const updatePrimaryColor = () => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim();
      if (color) setPrimaryColor(color);
    };

    updatePrimaryColor();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          updatePrimaryColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedTemplate.preview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendTest = () => {
    toast.success(`Test email sent for: ${selectedTemplate.name}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Navigation */}
      <DemoNav backButtonText="Back" backButtonHref="/templates" />

      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-block border border-border px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">[TEMPLATE]: EMAIL_TEMPLATES</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Email Templates
            </h1>
            <p className="font-mono text-sm text-muted-foreground">
              5 production-ready transactional email templates with HTML and text versions
            </p>
          </div>
          <Button className="rounded-none font-mono text-xs">
            <Download className="mr-2 h-4 w-4" />
            &gt; DOWNLOAD_ALL
          </Button>
        </div>

        {/* Stats - Terminal Style */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[TOTAL_TEMPLATES]:</div>
            <div className="text-3xl font-bold">5</div>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[CATEGORIES]:</div>
            <div className="text-3xl font-bold">3</div>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[EMAIL_PROVIDER]:</div>
            <div className="text-3xl font-bold">Resend</div>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[COMPATIBILITY]:</div>
            <div className="text-3xl font-bold">100%</div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Template List - Terminal Style */}
          <div className="lg:col-span-1 border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-1.5">
                <div className="size-2 rounded-full bg-destructive/50" />
                <div className="size-2 rounded-full bg-warning/50" />
                <div className="size-2 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">templates.json</span>
            </div>
            <div className="p-4">
              <div className="font-mono text-xs text-muted-foreground mb-4">[AVAILABLE_TEMPLATES]:</div>
              <div className="space-y-2">
                {emailTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`w-full border p-3 text-left transition-all font-mono text-xs ${
                        selectedTemplate.id === template.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`mt-0.5 h-4 w-4 ${
                          selectedTemplate.id === template.id ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold">{template.name}</div>
                          <div className="text-muted-foreground truncate">{template.description}</div>
                          <div className="mt-1.5 inline-block border border-border px-1.5 py-0.5">
                            {template.category}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Preview Area - Terminal Style */}
          <div className="lg:col-span-2 border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-1.5">
                <div className="size-2 rounded-full bg-destructive/50" />
                <div className="size-2 rounded-full bg-warning/50" />
                <div className="size-2 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">{selectedTemplate.id}_email.html</span>
              <div className="ml-auto flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="font-mono text-xs h-7"
                >
                  {copied ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <Copy className="mr-1 h-3 w-3" />}
                  {copied ? "COPIED" : "&gt; COPY"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSendTest}
                  className="font-mono text-xs h-7"
                >
                  <Send className="mr-1 h-3 w-3" />
                  &gt; SEND_TEST
                </Button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-mono text-xs text-muted-foreground">[{selectedTemplate.name.toUpperCase().replace(/ /g, "_")}]:</div>
                  <div className="font-mono text-xs text-muted-foreground mt-1">{selectedTemplate.description}</div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border border-border mb-4 font-mono text-xs">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1 px-4 py-2 border-r border-border transition-colors ${
                    activeTab === "preview"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Eye className="h-3 w-3" />
                  [PREVIEW]
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-1 px-4 py-2 transition-colors ${
                    activeTab === "code"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Code className="h-3 w-3" />
                  [HTML_CODE]
                </button>
              </div>

              {activeTab === "preview" && (
                <div className="border border-border bg-muted p-4">
                  <iframe
                    srcDoc={injectScrollbarStyles(selectedTemplate.preview, primaryColor)}
                    title={selectedTemplate.name}
                    className="min-h-[600px] w-full mx-auto block border border-border bg-white"
                  />
                </div>
              )}

              {activeTab === "code" && (
                <div className="max-h-[600px] overflow-auto border border-border">
                  <CodeBlock code={selectedTemplate.preview} language="markup" />
                </div>
              )}

              {/* Template Details */}
              <div className="mt-4 pt-4 border-t border-border space-y-4 font-mono text-xs">
                <div>
                  <div className="text-muted-foreground mb-2">[TRIGGER_EVENTS]:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.triggers.map((trigger, idx) => (
                      <span key={idx} className="border border-border px-2 py-0.5">
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-muted-foreground mb-2">[VARIABLES]:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.variables.map((variable, idx) => (
                      <span key={idx} className="border border-primary/50 px-2 py-0.5 text-primary">
                        {`{${variable}}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Note */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">features.md</span>
          </div>
          <div className="p-4">
            <div className="mb-3 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
            <div className="space-y-1.5 font-mono text-xs">
              <div><span className="text-success">&gt;</span> 5 email templates (Welcome, Verification, Password Reset, Purchase, Subscription)</div>
              <div><span className="text-success">&gt;</span> Both HTML and plain text versions for all templates</div>
              <div><span className="text-success">&gt;</span> Mobile-responsive table-based layouts (works in all email clients)</div>
              <div><span className="text-success">&gt;</span> Consistent branding with Fabrk color scheme</div>
              <div><span className="text-success">&gt;</span> Dynamic variables for personalization</div>
              <div><span className="text-success">&gt;</span> CTA buttons with proper link tracking</div>
              <div><span className="text-success">&gt;</span> Security notices and expiry warnings</div>
              <div><span className="text-success">&gt;</span> Resend integration ready (src/lib/email.ts)</div>
              <div><span className="text-success">&gt;</span> Terminal console aesthetic</div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: All templates in src/emails/. Add your Resend API key to start sending emails.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
