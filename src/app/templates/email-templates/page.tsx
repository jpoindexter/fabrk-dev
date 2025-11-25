/**
 * Email Templates Showcase
 * Visual preview of all transactional email templates
 */

"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DemoNav } from "@/components/demo/demo-nav";
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
function injectScrollbarStyles(html: string): string {
  const scrollbarStyles = `
    <style>
      /* Custom scrollbar styling - matches main site */
      * {
        scrollbar-width: thin;
        scrollbar-color: #e5e5e5 transparent;
      }
      *:hover {
        scrollbar-color: #a855f7 transparent;
      }
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: #e5e5e5;
        border-radius: 4px;
        transition: background 0.2s;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #a855f7;
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
    category: "Onboarding",
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
    category: "Authentication",
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
    category: "Authentication",
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
                <p style="margin: 0; color: #991B1B; font-size: 14px;"><strong>⏱️ This link expires in 1 hour.</strong></p>
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
    category: "Billing",
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
    category: "Billing",
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
      <DemoNav backButtonText="Back" backButtonHref="/demo" />

      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Email Templates
            </h1>
            <p className="mt-2 text-muted-foreground">
              5 production-ready transactional email templates with HTML and text versions
            </p>
          </div>
          <Button className="font-semibold">
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-semibold">Total Templates</CardDescription>
              <CardTitle className="text-3xl font-semibold">5</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-semibold">Categories</CardDescription>
              <CardTitle className="text-3xl font-semibold">3</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-semibold">Email Provider</CardDescription>
              <CardTitle className="text-3xl font-semibold">Resend</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-semibold">Compatibility</CardDescription>
              <CardTitle className="text-3xl font-semibold">100%</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Template List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-semibold">Templates</CardTitle>
              <CardDescription>
                Click to preview each email template
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {emailTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`w-full rounded-lg border border-border p-4 text-left transition-all ${
                      selectedTemplate.id === template.id
                        ? "bg-primary text-primary-foreground shadow-sm-lg"
                        : "bg-background hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon
                        className={`mt-1 h-5 w-5 ${
                          selectedTemplate.id === template.id
                            ? "text-primary-foreground"
                            : "text-primary"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{template.name}</p>
                        <p
                          className={`text-sm ${
                            selectedTemplate.id === template.id
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {template.description}
                        </p>
                        <Badge
                          variant={
                            selectedTemplate.id === template.id
                              ? "secondary"
                              : "outline"
                          }
                          className="mt-2 font-semibold"
                        >
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Preview Area */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-semibold">
                    {selectedTemplate.name}
                  </CardTitle>
                  <CardDescription>
                    {selectedTemplate.description}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="font-semibold"
                  >
                    {copied ? (
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {copied ? "Copied!" : "Copy HTML"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSendTest}
                    className="font-semibold"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Test
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview" className="font-semibold">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="code" className="font-semibold">
                    <Code className="mr-2 h-4 w-4" />
                    HTML Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-6">
                  <div className="rounded-lg border border-border bg-muted p-4">
                    <iframe
                      srcDoc={injectScrollbarStyles(selectedTemplate.preview)}
                      title={selectedTemplate.name}
                      className="min-h-[1200px] w-[700px] mx-auto block rounded border border-border bg-white"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-6">
                  <div className="max-h-[600px] overflow-auto">
                    <CodeBlock code={selectedTemplate.preview} language="markup" />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Template Details */}
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Trigger Events</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.triggers.map((trigger, idx) => (
                      <Badge key={idx} variant="outline" className="font-semibold">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Variables</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.variables.map((variable, idx) => (
                      <Badge key={idx} className="font-mono font-semibold">
                        {`{${variable}}`}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Note */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <h4 className="mb-2 font-semibold">📧 Template Features</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="font-semibold">
                ✓ 5 email templates (Welcome, Verification, Password Reset, Purchase, Subscription)
              </li>
              <li className="font-semibold">
                ✓ Both HTML and plain text versions for all templates
              </li>
              <li className="font-semibold">
                ✓ Mobile-responsive table-based layouts (works in all email clients)
              </li>
              <li className="font-semibold">
                ✓ Consistent branding with Fabrk color scheme
              </li>
              <li className="font-semibold">
                ✓ Dynamic variables for personalization
              </li>
              <li className="font-semibold">
                ✓ CTA buttons with proper link tracking
              </li>
              <li className="font-semibold">
                ✓ Security notices and expiry warnings
              </li>
              <li className="font-semibold">
                ✓ Resend integration ready (configured in{" "}
                <code className="rounded bg-muted px-1 py-0.5">src/lib/email.ts</code>)
              </li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              All templates located in{" "}
              <code className="rounded bg-muted px-1 py-0.5">src/emails/</code>.
              Add your Resend API key to start sending emails.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
