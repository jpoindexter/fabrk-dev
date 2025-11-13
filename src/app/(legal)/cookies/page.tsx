/**
 * Cookie Policy Page
 * How we use cookies and similar tracking technologies
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cookie } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | Fabrk",
  description: "How Fabrk uses cookies and similar tracking technologies",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-3 border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Cookie Policy</h1>
                <p className="text-sm text-muted-foreground">How we use cookies</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-6 py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Last Updated: November 7, 2024</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              This Cookie Policy explains how Fabrk uses cookies and similar technologies
              to recognize you when you visit our website.
            </p>
          </CardContent>
        </Card>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device (computer, smartphone,
              or tablet) when you visit a website. They are widely used to make websites work
              more efficiently and provide information to website owners.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">1.1 Types of Cookies</h3>
            <ul>
              <li>
                <strong>Session Cookies:</strong> Temporary cookies that expire when you close
                your browser
              </li>
              <li>
                <strong>Persistent Cookies:</strong> Remain on your device until they expire or
                you delete them
              </li>
              <li>
                <strong>First-Party Cookies:</strong> Set by Fabrk directly
              </li>
              <li>
                <strong>Third-Party Cookies:</strong> Set by external services we use (analytics,
                payment processing)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. Cookies We Use</h2>
            <p>Fabrk uses the following categories of cookies:</p>

            <h3 className="text-xl font-bold mt-6 mb-4">2.1 Essential Cookies (Required)</h3>
            <p>
              These cookies are necessary for the website to function and cannot be disabled.
            </p>
          </section>
        </div>

        <Card className="my-6">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cookie Name</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">next-auth.session-token</TableCell>
                  <TableCell>User authentication and session management</TableCell>
                  <TableCell>30 days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">next-auth.csrf-token</TableCell>
                  <TableCell>Security - prevents CSRF attacks</TableCell>
                  <TableCell>Session</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">__Secure-next-auth.callback-url</TableCell>
                  <TableCell>OAuth callback handling</TableCell>
                  <TableCell>Session</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <h3 className="text-xl font-bold mt-6 mb-4">2.2 Functional Cookies (Optional)</h3>
          <p>
            These cookies enable enhanced functionality and personalization.
          </p>
        </div>

        <Card className="my-6">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cookie Name</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">theme</TableCell>
                  <TableCell>Remember your light/dark mode preference</TableCell>
                  <TableCell>1 year</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">color-scheme</TableCell>
                  <TableCell>Remember your chosen color scheme</TableCell>
                  <TableCell>1 year</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">locale</TableCell>
                  <TableCell>Remember your language preference</TableCell>
                  <TableCell>1 year</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <h3 className="text-xl font-bold mt-6 mb-4">2.3 Analytics Cookies (Optional)</h3>
          <p>
            These cookies help us understand how visitors use our website.
          </p>
        </div>

        <Card className="my-6">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Vercel Analytics</TableCell>
                  <TableCell>Page views, performance metrics (anonymized)</TableCell>
                  <TableCell>Session</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Custom Analytics</TableCell>
                  <TableCell>Feature usage tracking (anonymized)</TableCell>
                  <TableCell>90 days</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <h3 className="text-xl font-bold mt-6 mb-4">2.4 Third-Party Cookies</h3>
          <p>
            When you use certain features, third-party services may set their own cookies:
          </p>
        </div>

        <Card className="my-6">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Privacy Policy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Stripe</TableCell>
                  <TableCell>Payment processing, fraud detection</TableCell>
                  <TableCell>
                    <a href="https://stripe.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      View Policy
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Google OAuth</TableCell>
                  <TableCell>Third-party authentication (if enabled)</TableCell>
                  <TableCell>
                    <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      View Policy
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-4">3. How to Manage Cookies</h2>
            <h3 className="text-xl font-bold mt-4 mb-2">3.1 Browser Settings</h3>
            <p>
              Most browsers allow you to control cookies through their settings. You can:
            </p>
            <ul>
              <li>View what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block all cookies from specific websites</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>
            <p>
              <strong>Note:</strong> Blocking essential cookies will prevent you from logging
              in and using core features of Fabrk.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-2">3.2 Browser-Specific Instructions</h3>
            <ul>
              <li>
                <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
              </li>
              <li>
                <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data
              </li>
              <li>
                <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
              </li>
              <li>
                <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and data stored
              </li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-2">3.3 Opt-Out of Analytics</h3>
            <p>
              You can opt-out of analytics cookies through your account settings or by enabling
              "Do Not Track" in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Other Tracking Technologies</h2>
            <p>
              In addition to cookies, we may use other tracking technologies:
            </p>
            <ul>
              <li>
                <strong>Local Storage:</strong> Store preferences and app state in your browser
              </li>
              <li>
                <strong>Session Storage:</strong> Temporary storage cleared when you close the tab
              </li>
              <li>
                <strong>Web Beacons:</strong> Small transparent images used in emails to track opens
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">5. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We'll notify you of
              significant changes by updating the "Last Updated" date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">6. Questions?</h2>
            <p>
              If you have questions about our use of cookies, please contact us:
            </p>
            <ul>
              <li>Email: privacy@fabrk.dev</li>
              <li>Contact Form: <Link href="/contact" className="text-primary hover:underline">Contact Page</Link></li>
            </ul>
          </section>
        </div>

        {/* Cookie Consent Banner Info */}
        <Card className="mt-12 bg-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              Managing Your Cookie Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              When you first visit Fabrk, you'll see a cookie consent banner. You can change
              your preferences at any time through your account settings.
            </p>
            <div className="flex gap-3">
              <Link href="/settings">
                <Button variant="outline" size="sm">Cookie Settings</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Related Links */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Related Legal Documents:
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/legal/terms">
                <Button variant="outline" size="sm">Terms of Service</Button>
              </Link>
              <Link href="/legal/privacy">
                <Button variant="outline" size="sm">Privacy Policy</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
