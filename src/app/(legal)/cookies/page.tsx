/**
 * Cookie Policy Page
 * How we use cookies and similar tracking technologies
 */

"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  H1,
  H2,
  H3,
  Body,
  Small,
  List,
  ListItem,
  Link,
  Strong,
} from "@/components/ui/typography";

export default function CookiesPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="default" size="lg" className="mb-6 uppercase tracking-wide">
            Legal
          </Badge>
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <H1 className="mb-4">Cookie Policy</H1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Small>Last Updated: November 7, 2024</Small>
        </motion.div>
      </div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12 rounded-lg border border-border bg-card p-6 shadow-sm"
      >
        <Body className="text-lg">
          This Cookie Policy explains how Fabrk uses cookies and similar technologies to recognize you when you visit our website.
        </Body>
      </motion.div>

      <div className="space-y-12">
        <section>
          <H2 className="mb-4">1. What Are Cookies?</H2>
          <Body className="mb-4">
            Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
          </Body>

          <H3 className="mt-6 mb-3">1.1 Types of Cookies</H3>
          <List className="mb-4">
            <ListItem><Strong>Session Cookies:</Strong> Temporary cookies that expire when you close your browser</ListItem>
            <ListItem><Strong>Persistent Cookies:</Strong> Remain on your device until they expire or you delete them</ListItem>
            <ListItem><Strong>First-Party Cookies:</Strong> Set by Fabrk directly</ListItem>
            <ListItem><Strong>Third-Party Cookies:</Strong> Set by external services we use (analytics, payment processing)</ListItem>
          </List>
        </section>

        <section>
          <H2 className="mb-4">2. Cookies We Use</H2>
          <Body className="mb-4">Fabrk uses the following categories of cookies:</Body>

          <H3 className="mt-6 mb-3">2.1 Essential Cookies (Required)</H3>
          <Body className="mb-4">
            These cookies are necessary for the website to function and cannot be disabled.
          </Body>

          <div className="mb-6 rounded-lg border border-border bg-card p-6 shadow-sm">
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
          </div>

          <H3 className="mt-6 mb-3">2.2 Functional Cookies (Optional)</H3>
          <Body className="mb-4">
            These cookies enable enhanced functionality and personalization.
          </Body>

          <div className="mb-6 rounded-lg border border-border bg-card p-6 shadow-sm">
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
          </div>

          <H3 className="mt-6 mb-3">2.3 Analytics Cookies (Optional)</H3>
          <Body className="mb-4">
            These cookies help us understand how visitors use our website.
          </Body>

          <div className="mb-6 rounded-lg border border-border bg-card p-6 shadow-sm">
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
          </div>

          <H3 className="mt-6 mb-3">2.4 Third-Party Cookies</H3>
          <Body className="mb-4">
            When you use certain features, third-party services may set their own cookies:
          </Body>

          <div className="mb-6 rounded-lg border border-border bg-card p-6 shadow-sm">
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
                    <Link href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
                      View Policy
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Google OAuth</TableCell>
                  <TableCell>Third-party authentication (if enabled)</TableCell>
                  <TableCell>
                    <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                      View Policy
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        <section>
          <H2 className="mb-4">3. How to Manage Cookies</H2>

          <H3 className="mt-6 mb-3">3.1 Browser Settings</H3>
          <Body className="mb-4">
            Most browsers allow you to control cookies through their settings. You can:
          </Body>
          <List className="mb-4">
            <ListItem>View what cookies are stored and delete them individually</ListItem>
            <ListItem>Block third-party cookies</ListItem>
            <ListItem>Block all cookies from specific websites</ListItem>
            <ListItem>Delete all cookies when you close your browser</ListItem>
          </List>
          <Body className="mb-4">
            <Strong>Note:</Strong> Blocking essential cookies will prevent you from logging in and using core features of Fabrk.
          </Body>

          <H3 className="mt-6 mb-3">3.2 Browser-Specific Instructions</H3>
          <List className="mb-4">
            <ListItem><Strong>Chrome:</Strong> Settings → Privacy and security → Cookies and other site data</ListItem>
            <ListItem><Strong>Firefox:</Strong> Settings → Privacy & Security → Cookies and Site Data</ListItem>
            <ListItem><Strong>Safari:</Strong> Preferences → Privacy → Manage Website Data</ListItem>
            <ListItem><Strong>Edge:</Strong> Settings → Cookies and site permissions → Cookies and data stored</ListItem>
          </List>

          <H3 className="mt-6 mb-3">3.3 Opt-Out of Analytics</H3>
          <Body className="mb-4">
            You can opt-out of analytics cookies through your account settings or by enabling "Do Not Track" in your browser.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">4. Other Tracking Technologies</H2>
          <Body className="mb-4">
            In addition to cookies, we may use other tracking technologies:
          </Body>
          <List className="mb-4">
            <ListItem><Strong>Local Storage:</Strong> Store preferences and app state in your browser</ListItem>
            <ListItem><Strong>Session Storage:</Strong> Temporary storage cleared when you close the tab</ListItem>
            <ListItem><Strong>Web Beacons:</Strong> Small transparent images used in emails to track opens</ListItem>
          </List>
        </section>

        <section>
          <H2 className="mb-4">5. Updates to This Policy</H2>
          <Body className="mb-4">
            We may update this Cookie Policy from time to time. We'll notify you of significant changes by updating the "Last Updated" date at the top of this page.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">6. Questions?</H2>
          <Body className="mb-4">
            If you have questions about our use of cookies, please contact us:
          </Body>
          <List className="mb-4">
            <ListItem>Email: privacy@fabrk.dev</ListItem>
            <ListItem>Contact Form: <Link href="/contact">Contact Page</Link></ListItem>
          </List>
        </section>
      </div>

      {/* Cookie Management Info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12 rounded-lg border border-border bg-accent/30 p-6 shadow-sm"
      >
        <H3 className="mb-3">Managing Your Cookie Preferences</H3>
        <Body className="mb-4">
          When you first visit Fabrk, you'll see a cookie consent banner. You can change your preferences at any time through your account settings.
        </Body>
        <Link href="/settings" className="font-medium">
          Cookie Settings →
        </Link>
      </motion.div>

      {/* Related Links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm"
      >
        <Small className="block mb-4">
          Related Legal Documents:
        </Small>
        <div className="flex flex-wrap gap-3">
          <Link href="/terms" className="text-sm font-medium">
            Terms of Service
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/privacy" className="text-sm font-medium">
            Privacy Policy
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
